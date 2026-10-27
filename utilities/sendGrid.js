
name: Apex Dev Smoke Tests

on:
  workflow_dispatch:

permissions:
  contents: read

concurrency:
  group: e2e-smoke-dev
  cancel-in-progress: false

jobs:
  smoke-tests:
    runs-on: ubuntu-latest
    timeout-minutes: 45
    environment: YOUR_ENVIRONMENT_NAME

    steps:
      - name: Checkout code
        uses: actions/checkout@v6

      - name: Setup Node.js
        uses: actions/setup-node@v6
        with:
          node-version: 22
          cache: npm
          cache-dependency-path: package-lock.json

      - name: Install dependencies
        run: npm ci

      - name: Install Playwright browsers
        run: npx playwright install --with-deps chromium

      - name: Run smoke tests
        id: smoke
        run: npm run test:development -- --grep "@smoke" --trace=retain-on-failure

      - name: Zip HTML report
        if: always()
        run: |
          if [ -d playwright-report ]; then
            zip -qr playwright-report.zip playwright-report
          else
            echo "Playwright HTML report directory was not generated."
          fi

      - name: Upload HTML report
        if: always()
        uses: actions/upload-artifact@v7
        with:
          name: playwright-html-report
          path: |
            playwright-report/
            playwright-report.zip
          if-no-files-found: ignore
          retention-days: 14

      - name: Upload JSON report and traces
        if: always()
        uses: actions/upload-artifact@v7
        with:
          name: playwright-test-results
          path: |
            playwright-report.json
            test-results/
          if-no-files-found: ignore
          retention-days: 14

      - name: Email report via SendGrid
        if: always()
        env:
          SENDGRID_API_KEY: ${{ secrets.SENDGRIDAPIKEY }}
          SENDGRID_FROM_EMAIL: ${{ secrets.SENDGRID_FROM_EMAIL }}
          REPORT_EMAIL_TO: ${{ secrets.REPORT_EMAIL_TO }}
          TEST_OUTCOME: ${{ steps.smoke.outcome || 'not_run' }}
          GITHUB_RUN_URL: ${{ github.server_url }}/${{ github.repository }}/actions/runs/${{ github.run_id }}
          GITHUB_REPOSITORY: ${{ github.repository }}
          GITHUB_REF_NAME: ${{ github.ref_name }}
        run: |
          if [ -z "$SENDGRID_API_KEY" ] || \
             [ -z "$SENDGRID_FROM_EMAIL" ] || \
             [ -z "$REPORT_EMAIL_TO" ]; then
            echo "::error::One or more required email secrets are missing."
            exit 1
          fi

          node utilities/sendGrid.js
