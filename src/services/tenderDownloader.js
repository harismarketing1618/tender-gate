// Tender Document & BOQ Exporter Service for TENDER GATE

export function downloadTenderDossier(tender) {
  const content = `================================================================================
TENDER GATE — OFFICIAL PROCUREMENT DOSSIER & TENDER SPECIFICATION
Platform: https://tender-gate.vercel.app
Generated on: ${new Date().toLocaleString('en-PK')}
================================================================================

TENDER INFORMATION
--------------------------------------------------------------------------------
Title:                 ${tender.title}
Reference Number:      ${tender.refNo}
PPRA Reference ID:     ${tender.ppraRef}
Procuring Agency:      ${tender.agency} (${tender.agencyCode || 'GOVT'})
Category / Discipline: ${tender.category}
Location:              ${tender.locationFull} (${tender.city}, ${tender.province})
Official Portal Link:  ${tender.sourceUrl || 'https://ppra.org.pk'}

FINANCIAL & BID SECURITY
--------------------------------------------------------------------------------
Estimated Value:       ${tender.formattedValue} (PKR ${tender.estimatedValuePKR ? tender.estimatedValuePKR.toLocaleString() : 'N/A'})
2% CDR / Bid Security: ${tender.bidSecurityAmount}
Bidding Method:        ${tender.biddingMethod || 'Single Stage Two Envelope (PPRA 36-b)'}
Tender Document Fee:   ${tender.tenderDocFee || 'PKR 10,000'}

CRITICAL DEADLINES
--------------------------------------------------------------------------------
Publication Date:      ${tender.postedDate || new Date().toISOString().split('T')[0]}
Submission Deadline:   ${tender.closingDate ? new Date(tender.closingDate).toLocaleString('en-PK') : 'Refer to Notice'}
Pre-Bid Meeting:       ${tender.preBidMeetingDate || 'Not specified'}

PEC LICENSING & MANDATORY ELIGIBILITY
--------------------------------------------------------------------------------
Required PEC Category: ${tender.pecCategory}
Required PEC Codes:    ${tender.pecCodesRequired ? tender.pecCodesRequired.join(', ') : 'Civil/General'}

MANDATORY CRITERIA:
${tender.mandatoryCriteria ? tender.mandatoryCriteria.map((c, i) => `  ${i + 1}. ${c}`).join('\n') : '  - Valid PEC License in required category'}

SCOPE OF WORK & TECHNICAL BILL OF QUANTITIES (BOQ):
${tender.scopeOfWork ? tender.scopeOfWork.map((s, i) => `  ${i + 1}. ${s}`).join('\n') : '  - Refer to detailed tender drawings'}

AI PROCUREMENT VIABILITY ANALYSIS
--------------------------------------------------------------------------------
Viability Score:       ${tender.aiViabilityScore || 90}%
Viability Summary:     ${tender.aiSummary || 'Standard public sector procurement scheme.'}

================================================================================
TENDER GATE | Pakistan's Premier Autonomous Construction Procurement Platform
Official Portal Reference: ${tender.sourceUrl || 'https://ppra.org.pk'}
================================================================================`;

  const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `TenderGate_${(tender.refNo || 'Tender').replace(/[^a-zA-Z0-9_-]/g, '_')}_Dossier.txt`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export function downloadTenderBOQ(tender) {
  const headers = ['Item No', 'Scope / Specification Item', 'Category', 'Procuring Agency', 'Estimated Tender Value', 'PEC Code', 'Official Portal Link'];
  const rows = (tender.scopeOfWork || [tender.shortDescription]).map((scope, idx) => [
    `"${idx + 1}"`,
    `"${scope.replace(/"/g, '""')}"`,
    `"${tender.category}"`,
    `"${tender.agency}"`,
    `"${tender.formattedValue}"`,
    `"${tender.pecCodesRequired ? tender.pecCodesRequired.join('; ') : tender.pecCategory}"`,
    `"${tender.sourceUrl || 'https://ppra.org.pk'}"`
  ]);

  const csv = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `TenderGate_${(tender.refNo || 'Tender').replace(/[^a-zA-Z0-9_-]/g, '_')}_BOQ_Scope.csv`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
