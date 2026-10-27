
const fs = require('node:fs');
const path = require('node:path');

const MAX_ATTACHMENT_BYTES = 20 * 1024 * 1024;

/**
 * Read a required environment variable.
 */
function requireEnv(name) {
  const value = (process.env[name] || '').trim();

  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }

  return value;
}

/**
 * Parse one or more email recipients.
 * Supports comma-separated or semicolon-separated addresses.
 */
function parseRecipients(raw) {
  return raw
    .split(/[;,]/)
    .map((address) => address.trim())
    .filter(Boolean);
}

/**
 * Read the Playwright JSON report statistics, if available.
 */
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

/**
 * Prepare the HTML report ZIP attachment, if available and within size limits.
 */
function buildAttachment() {
  const zipPath = path.resolve(
    process.env.REPORT_ZIP_PATH || 'playwright-report.zip'
  );

  if (!fs.existsSync(zipPath)) {
    return {
      attachment: null,
      note: 'The HTML report ZIP was not generated. Check the workflow artifacts.',
    };
  }

  const { size } = fs.statSync(zipPath);

  if (size > MAX_ATTACHMENT_BYTES) {
    return {
      attachment: null,
      note: `The HTML report ZIP is ${(size / 1048576).toFixed(1)} MB and was not attached because it exceeds the configured 20 MB limit. Download it from GitHub Actions artifacts.`,
    };
  }

  return {
    attachment: {
      content: fs.readFileSync(zipPath).toString('base64'),
      filename: 'playwright-html-report.zip',
      type: 'application/zip',
      disposition: 'attachment',
    },
    note: 'The HTML report is attached. Download and unzip it, then open index.html.',
  };
}

/**
 * Escape dynamic text before including it in HTML email content.
 */
function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/**
 * Send the Playwright report using the SendGrid Mail Send API.
 */
async function main() {
  const apiKey = requireEnv('SENDGRID_API_KEY');
  const from = requireEnv('SENDGRID_FROM_EMAIL');
  const to = parseRecipients(requireEnv('REPORT_EMAIL_TO'));

  if (to.length === 0) {
    throw new Error('REPORT_EMAIL_TO contains no valid recipients.');
  }

  const outcome = process.env.TEST_OUTCOME || 'not_run';
  const passed = outcome === 'success';

  const runUrl = process.env.GITHUB_RUN_URL || '';
  const repository = process.env.GITHUB_REPOSITORY || '';
  const branch = process.env.GITHUB_REF_NAME || '';

  const stats = readStats();
  const { attachment, note } = buildAttachment();

  const status =
    outcome === 'success'
      ? 'PASSED'
      : outcome === 'failure'
        ? 'FAILED'
        : outcome === 'cancelled'
          ? 'CANCELLED'
          : 'NOT RUN';

  const summary = stats
    ? [
        `Passed: ${stats.expected ?? 0}`,
        `Failed: ${stats.unexpected ?? 0}`,
        `Flaky: ${stats.flaky ?? 0}`,
        `Skipped: ${stats.skipped ?? 0}`,
      ].join(' | ')
    : 'Playwright JSON report statistics are unavailable. Check the workflow run.';

  const safeStatus = escapeHtml(status);
  const safeRepository = escapeHtml(repository);
  const safeBranch = escapeHtml(branch);
  const safeSummary = escapeHtml(summary);
  const safeNote = escapeHtml(note);

  const safeRunUrl = /^https:\/\/github\.com\/[^"'<> ]+$/i.test(runUrl)
    ? runUrl
    : '';

  const emailHtml = `
    <!DOCTYPE html>
    <html>
      <body>
        <h2>Development Smoke Test Report: ${safeStatus}</h2>

        <p><strong>Repository:</strong> ${safeRepository}</p>
        <p><strong>Branch:</strong> ${safeBranch}</p>
        <p><strong>Test outcome:</strong> ${safeStatus}</p>

        <h3>Test Summary</h3>
        <p>${safeSummary}</p>

        <p>${safeNote}</p>

        ${
          safeRunUrl
            ? `<p><a href="${safeRunUrl}">View GitHub Actions workflow run</a></p>`
            : '<p>Open GitHub Actions to view the workflow run.</p>'
        }
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

  console.log(`Sending smoke-test report to ${to.length} recipient(s).`);
  console.log(`Test outcome: ${status}`);
  console.log(`HTML report attached: ${attachment ? 'Yes' : 'No'}`);

  const response = await fetch('https://api.sendgrid.com/v3/mail/send', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const responseText = await response.text();

    // Do not print the API key or request authorization headers.
    throw new Error(
      `SendGrid returned ${response.status}: ${responseText}`
    );
  }

  console.log(
    `SendGrid accepted the report email. HTTP ${response.status}.`
  );
}

main().catch((error) => {
  console.error(`Email report failed: ${error.message}`);
  process.exitCode = 1;
});
