
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

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function readStats() {
  const reportPath = path.resolve(
    process.env.REPORT_JSON_PATH || 'playwright-report.json'
  );

  if (!fs.existsSync(reportPath)) {
    console.warn(`JSON report not found: ${reportPath}`);
    return null;
  }

  try {
    const report = JSON.parse(fs.readFileSync(reportPath, 'utf8'));
    return report.stats ?? null;
  } catch (error) {
    console.warn(`Could not read JSON report: ${error.message}`);
    return null;
  }
}

function buildAttachment() {
  const zipPath = path.resolve(
    process.env.REPORT_ZIP_PATH || 'playwright-report.zip'
  );

  if (!fs.existsSync(zipPath)) {
    return {
      attachment: null,
      note: 'HTML report ZIP is unavailable. Use the hosted report link or GitHub Actions artifacts.',
    };
  }

  const { size } = fs.statSync(zipPath);

  if (size > MAX_ATTACHMENT_BYTES) {
    return {
      attachment: null,
      note: `HTML report ZIP is ${(size / 1048576).toFixed(1)} MB and exceeds the 20 MB attachment limit. Download it from GitHub Actions artifacts.`,
    };
  }

  return {
    attachment: {
      content: fs.readFileSync(zipPath).toString('base64'),
      filename: 'playwright-html-report.zip',
      type: 'application/zip',
      disposition: 'attachment',
    },
    note: 'The HTML report ZIP is attached. Extract it and open index.html.',
  };
}

function getSafeReportUrl() {
  const rawUrl = (process.env.PLAYWRIGHT_REPORT_URL || '').trim();

  if (!rawUrl) {
    return '';
  }

  try {
    const url = new URL(rawUrl);

    // Only allow HTTPS URLs hosted on GitHub Pages.
    if (
      url.protocol === 'https:' &&
      (url.hostname === 'github.io' || url.hostname.endsWith('.github.io'))
    ) {
      return url.href;
    }
  } catch {
    // Ignore invalid URLs.
  }

  console.warn(
    'PLAYWRIGHT_REPORT_URL is missing or is not a valid HTTPS GitHub Pages URL.'
  );

  return '';
}

async function main() {
  const apiKey = requireEnv('SENDGRID_API_KEY');
  const from = requireEnv('SENDGRID_FROM_EMAIL');
  const to = parseRecipients(requireEnv('REPORT_EMAIL_TO'));

  if (to.length === 0) {
    throw new Error('REPORT_EMAIL_TO contains no valid recipients.');
  }

  const outcome = process.env.TEST_OUTCOME || 'not_run';
  const runUrl = process.env.GITHUB_RUN_URL || '';
  const repository = process.env.GITHUB_REPOSITORY || '';
  const branch = process.env.GITHUB_REF_NAME || '';

  const stats = readStats();
  const { attachment, note } = buildAttachment();
  const reportUrl = getSafeReportUrl();

  let status;

  switch (outcome) {
    case 'success':
      status = 'PASSED';
      break;
    case 'failure':
      status = 'FAILED';
      break;
    case 'cancelled':
      status = 'CANCELLED';
      break;
    default:
      status = 'NOT RUN';
  }

  const summary = stats
    ? [
        `Passed: ${stats.expected ?? 0}`,
        `Failed: ${stats.unexpected ?? 0}`,
        `Flaky: ${stats.flaky ?? 0}`,
        `Skipped: ${stats.skipped ?? 0}`,
      ].join(' | ')
    : 'Test statistics are unavailable. Check the workflow run for details.';

  const safeStatus = escapeHtml(status);
  const safeRepository = escapeHtml(repository);
  const safeBranch = escapeHtml(branch);
  const safeSummary = escapeHtml(summary);
  const safeNote = escapeHtml(note);

  let reportLinkHtml = '';

  if (reportUrl) {
    reportLinkHtml = `
      <p>
        <a href="${escapeHtml(reportUrl)}"
           style="display:inline-block;padding:12px 18px;
                  background-color:#2563eb;color:#ffffff;
                  text-decoration:none;border-radius:5px;">
          Open Playwright HTML Report
        </a>
      </p>
    `;
  } else {
    reportLinkHtml = `
      <p>
        <strong>HTML report link is not available.</strong>
        The report must be published to GitHub Pages and
        PLAYWRIGHT_REPORT_URL must be configured in the workflow.
      </p>
    `;
  }

  let runLinkHtml = '';

  try {
    const url = new URL(runUrl);

    if (
      url.protocol === 'https:' &&
      url.hostname === 'github.com'
    ) {
      runLinkHtml = `
        <p>
          <a href="${escapeHtml(url.href)}">
            View GitHub Actions Run
          </a>
        </p>
      `;
    }
  } catch {
    console.warn('GitHub Actions run URL is missing or invalid.');
  }

  const emailHtml = `
    <!DOCTYPE html>
    <html>
      <body style="font-family:Arial,sans-serif;line-height:1.6;">
        <h2>Development Smoke Test Report: ${safeStatus}</h2>

        <p><strong>Repository:</strong> ${safeRepository}</p>
        <p><strong>Branch:</strong> ${safeBranch}</p>
        <p><strong>Test Outcome:</strong> ${safeStatus}</p>

        <h3>Test Summary</h3>
        <p>${safeSummary}</p>

        <h3>Report Links</h3>
        ${reportLinkHtml}
        ${runLinkHtml}

        <hr />
        <p>${safeNote}</p>
      </body>
    </html>
  `;

  const payload = {
    personalizations: [
      {
        to: to.map((email) => ({ email })),
      },
    ],
    from: {
      email: from,
    },
    subject: `[Dev] Smoke Tests ${status} - ${repository} (${branch})`,
    content: [
      {
        type: 'text/html',
        value: emailHtml,
      },
    ],
    ...(attachment ? { attachments: [attachment] } : {}),
  };

  console.log(`Sending report to ${to.length} recipient(s).`);
  console.log(`Test outcome: ${status}`);
  console.log(`HTML ZIP attached: ${attachment ? 'Yes' : 'No'}`);
  console.log(`Hosted report URL configured: ${reportUrl ? 'Yes' : 'No'}`);

  const response = await fetch(
    'https://api.sendgrid.com/v3/mail/send',
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    }
  );

  if (!response.ok) {
    const details = await response.text();

    throw new Error(
      `SendGrid returned ${response.status}: ${details}`
    );
  }

  console.log(
    `SendGrid accepted the email request. HTTP ${response.status}.`
  );
}

main().catch((error) => {
  console.error(`Email report failed: ${error.message}`);
  process.exitCode = 1;
});
