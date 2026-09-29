// repositories/billerActivityReportRepository.js
const { runQuery } = require('../utilities/db_client');

const BALANCE_CONDITIONS = {
  openBalance: 't.Balance > 0',
  overpayment: 't.Balance < 0',
};

function toSafeIntList(ids) {
  const safe = ids.map(Number).filter(Number.isInteger);
  if (safe.length !== ids.length) throw new Error('All userIds must be integers.');
  return safe;
}

async function getOverdueTasksByUser(balanceType, userIds) {
  const condition = BALANCE_CONDITIONS[balanceType];
  if (!condition) throw new Error(`Unknown balanceType "${balanceType}"`);
  const safeIds = toSafeIntList(userIds);
  if (safeIds.length === 0) throw new Error('userIds must not be empty.');

  const query = `
    DECLARE @ef_filter__CurrentOrganizationId INT = 1;
    DECLARE @now_Date DATE = GETDATE();

    SELECT t.AssigneeId AS UserId, u0.FullName AS UserName, COUNT(*) AS OverdueTaskCount
    FROM dbo.Task AS t
    INNER JOIN dbo.[Case] AS c ON t.CaseId = c.Id
    INNER JOIN dbo.FacilityHierarchy AS f ON t.FacilityHierarchyId = f.Id
    INNER JOIN dbo.[User] AS u ON t.CreatedByUserId = u.Id
    INNER JOIN dbo.[User] AS u0 ON t.AssigneeId = u0.Id
    INNER JOIN dbo.Issue AS i ON t.IssueId = i.Id
    INNER JOIN dbo.Payer AS p ON t.PayerId = p.Id
    INNER JOIN dbo.TaskStatus AS t0 ON t.TaskStatusId = t0.Id
    INNER JOIN dbo.BalanceStatus AS b ON t.BalanceStatusId = b.Id
    WHERE t.IsDeleted = 0 AND b.IsDeleted = 0 AND f.IsActive = 1 AND ${condition}
      AND c.IsDeleted = 0 AND f.IsDeleted = 0 AND u.IsDeleted = 0 AND u0.IsDeleted = 0
      AND i.IsDeleted = 0 AND p.IsDeleted = 0 AND t0.IsDeleted = 0
      AND t.FollowUpDate < @now_Date AND t.TaskStatusId NOT IN (3, 4)
      AND (u0.IsSystem <> 1 OR u0.IsSystem IS NULL)
      AND u0.OrganizationId = @ef_filter__CurrentOrganizationId
      AND u0.id IN (${safeIds.join(',')})
    GROUP BY t.AssigneeId, u0.FullName
    ORDER BY OverdueTaskCount DESC;
  `;

  const rows = await runQuery(query);
  console.table(rows);
  return rows;
}

const getOverdueOpenBalanceTasksByUser = (userIds) => getOverdueTasksByUser('openBalance', userIds);
const getOverdueOverpaymentTasksByUser = (userIds) => getOverdueTasksByUser('overpayment', userIds);

module.exports = { getOverdueOpenBalanceTasksByUser, getOverdueOverpaymentTasksByUser };