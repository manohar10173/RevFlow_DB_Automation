
const fs = require('node:fs');
const path = require('node:path');

const MAX_ATTACHMENT_BYTES = 20 * 1024 * 1024;

function requireEnv(name) {
  const value = (process.env[name] || '').trim();
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

function parseRecipients(raw) {
  return raw
    .split(/[;,]/)
    .map((address) => address.trim())
    .filter(Boolean);
}

function readStats() {
  const reportPath = path.resolve('playwright-report.json');
  if (!fs.existsSync(reportPath)) {
    return null;
  }
  const { stats } = JSON.parse(fs.readFileSync(reportPath, 'utf8'));
  return stats ?? null;
}

function buildAttachment() {
  const zipPath = path.resolve(process.env.REPORT_ZIP_PATH || 'playwright-report.zip');
  if (!fs.existsSync(zipPath)) {
    return { attachment: null, note: 'No HTML report was generated.' };
  }
  const { size } = fs.statSync(zipPath);
  if (size > MAX_ATTACHMENT_BYTES) {
    return {
      attachment: null,
      note: `HTML report (${(size / 1048576).toFixed(1)} MB) is too large to attach; download it from the run artifacts.`,
    };
  }
  return {
    attachment: {
      content: fs.readFileSync(zipPath).toString('base64'),
      filename: 'playwright-html-report.zip',
      type: 'application/zip',
      disposition: 'attachment',
    },
    note: 'The HTML report is attached. Unzip it and open index.html.',
  };
}

async function main() {
  const apiKey = requireEnv('SENDGRIDAPIKEY');
  const from = requireEnv('SENDGRID_FROM_EMAIL');
  const to = parseRecipients(requireEnv('REPORT_EMAIL_TO'));
  if (to.length === 0) {
    throw new Error('REPORT_EMAIL_TO contains no valid recipients');
  }

  const outcome = process.env.TEST_OUTCOME || 'not_run';
  const passed = outcome === 'success';
  const runUrl = process.env.GITHUB_RUN_URL || '';
  const repo = process.env.GITHUB_REPOSITORY || '';
  const branch = process.env.GITHUB_REF_NAME || '';
  const stats = readStats();
  const { attachment, note } = buildAttachment();

  const label = passed ? 'PASSED' : outcome === 'not_run' ? 'NOT RUN' : 'FAILED';
  const summary = stats
    ? `Passed: ${stats.expected}, Failed: ${stats.unexpected}, Flaky: ${stats.flaky}, Skipped: ${stats.skipped}`
    : 'No JSON report was found.';

  const body = {
    personalizations: [{ to: to.map((email) => ({ email })) }],
    from: { email: from },
    subject: `[Dev] Smoke tests ${label} - ${repo} (${branch})`,
    content: [
      {
        type: 'text/html',
        value: `<h2>Development smoke tests: ${label}</h2>
<p>${summary}</p>
<p>${note}</p>
<p><a href="${runUrl}">View workflow run</a></p>`,
      },
    ],
    ...(attachment ? { attachments: [attachment] } : {}),
  };

  const response = await fetch('https://api.sendgrid.com/v3/mail/send', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    throw new Error(`SendGrid returned ${response.status}: ${await response.text()}`);
  }
  console.log(`Report email sent to ${to.length} recipient(s) (HTTP ${response.status}).`);
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
