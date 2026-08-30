// Tender Document, PDF & BOQ Exporter Service for TENDER GATE
import { jsPDF } from 'jspdf';

export function downloadTenderPDF(tender) {
  try {
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });

    const pageWidth = doc.internal.pageSize.getWidth(); // 210mm
    const pageHeight = doc.internal.pageSize.getHeight(); // 297mm
    const margin = 14;
    const contentWidth = pageWidth - (margin * 2);
    let y = margin;

    // Header Background Banner
    doc.setFillColor(15, 23, 42); // slate-900
    doc.rect(margin, y, contentWidth, 22, 'F');

    // Gold accent stripe
    doc.setFillColor(217, 119, 6); // amber-600
    doc.rect(margin, y + 22, contentWidth, 1.5, 'F');

    // Header Text
    doc.setTextColor(255, 255, 255);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(13);
    doc.text('TENDER GATE', margin + 5, y + 9);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(203, 213, 225); // slate-300
    doc.text('Pakistan Autonomous Construction Procurement & Tender Intelligence Platform', margin + 5, y + 15);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7.5);
    doc.setTextColor(245, 158, 11); // amber-400
    doc.text(`Ref: ${tender.refNo || 'N/A'}`, pageWidth - margin - 5, y + 9, { align: 'right' });
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(203, 213, 225);
    doc.text(`PPRA: ${tender.ppraRef || 'N/A'}`, pageWidth - margin - 5, y + 15, { align: 'right' });

    y += 29;

    // Procuring Entity & Title Box
    doc.setFillColor(248, 250, 252); // slate-50
    doc.setDrawColor(226, 232, 240); // slate-200
    doc.roundedRect(margin, y, contentWidth, 32, 2, 2, 'FD');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(30, 58, 138); // blue-900
    doc.text((tender.agency || 'GOVERNMENT PROCURING ENTITY').toUpperCase(), margin + 4, y + 6);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10.5);
    doc.setTextColor(15, 23, 42);
    const titleLines = doc.splitTextToSize(tender.title || 'Tender Notice', contentWidth - 8);
    doc.text(titleLines.slice(0, 2), margin + 4, y + 12);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(71, 85, 105);
    doc.text(`Location: ${tender.locationFull || 'Pakistan'}   |   Discipline: ${tender.category || 'Civil Infrastructure'}`, margin + 4, y + 27);

    y += 37;

    // Key Financial & Procurement Metrics Table (4 columns)
    const colW = contentWidth / 4;
    doc.setFillColor(241, 245, 249);
    doc.rect(margin, y, contentWidth, 18, 'F');
    doc.setDrawColor(203, 213, 225);
    doc.rect(margin, y, contentWidth, 18, 'S');

    // Dividers
    doc.line(margin + colW, y, margin + colW, y + 18);
    doc.line(margin + (colW * 2), y, margin + (colW * 2), y + 18);
    doc.line(margin + (colW * 3), y, margin + (colW * 3), y + 18);

    const metrics = [
      { label: 'ESTIMATED VALUE', val: tender.formattedValue || 'PKR N/A' },
      { label: '2% CDR / SECURITY', val: (tender.bidSecurityAmount || '2% of Bid Value').split('(')[0].trim() },
      { label: 'REQUIRED PEC', val: `Category ${tender.pecCategory || 'C-A'}` },
      { label: 'CLOSING DEADLINE', val: tender.closingDate ? new Date(tender.closingDate).toLocaleDateString('en-PK') : 'Refer Notice' }
    ];

    metrics.forEach((m, idx) => {
      const cx = margin + (colW * idx) + 3;
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(6.5);
      doc.setTextColor(100, 116, 139);
      doc.text(m.label, cx, y + 6);

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8);
      doc.setTextColor(15, 23, 42);
      const valText = doc.splitTextToSize(m.val, colW - 6);
      doc.text(valText[0] || '', cx, y + 12);
    });

    y += 23;

    // Mandatory Criteria
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.5);
    doc.setTextColor(15, 23, 42);
    doc.text('MANDATORY ELIGIBILITY & PEC LICENSING CRITERIA', margin, y);
    y += 4;

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(51, 65, 85);

    const criteria = tender.mandatoryCriteria || [
      `Valid PEC License in Category ${tender.pecCategory || 'C-A'}`,
      `Required Specialization Codes: ${(tender.pecCodesRequired || []).join(', ') || 'CE01/CE02'}`,
      'Active Taxpayer List (ATL) verification on FBR portal',
      'Bid Security (2% CDR) in favor of the Procuring Entity'
    ];

    criteria.slice(0, 5).forEach((crit, i) => {
      const lines = doc.splitTextToSize(`${i + 1}.  ${crit}`, contentWidth - 4);
      doc.text(lines, margin + 2, y);
      y += (lines.length * 4) + 1;
    });

    y += 3;

    // Technical Scope of Work / BOQ Highlights
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.5);
    doc.setTextColor(15, 23, 42);
    doc.text('TECHNICAL SCOPE OF WORK & BOQ SPECIFICATIONS', margin, y);
    y += 4;

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(51, 65, 85);

    const scopes = tender.scopeOfWork || [tender.shortDescription || 'Refer to detailed bidding documents and site survey drawings.'];
    scopes.slice(0, 5).forEach((scope, i) => {
      const lines = doc.splitTextToSize(`•  ${scope}`, contentWidth - 4);
      doc.text(lines, margin + 2, y);
      y += (lines.length * 4) + 1;
    });

    y += 3;

    // AI Intelligence & Viability Box
    doc.setFillColor(238, 242, 255); // indigo-50
    doc.setDrawColor(199, 210, 254); // indigo-200
    doc.roundedRect(margin, y, contentWidth, 18, 2, 2, 'FD');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(67, 56, 202); // indigo-700
    doc.text(`AI VIABILITY SCORE: ${tender.aiViabilityScore || 92}%   |   SPECIALIZATION: ${(tender.pecCodesRequired || []).join(', ') || 'CE01'}`, margin + 4, y + 6);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.2);
    doc.setTextColor(71, 85, 105);
    const aiText = doc.splitTextToSize(tender.aiSummary || 'High viability public sector tender verified through autonomous multi-portal crawler.', contentWidth - 8);
    doc.text(aiText.slice(0, 2), margin + 4, y + 11);

    // Footer Verification & Official Portal Link
    doc.setFillColor(248, 250, 252);
    doc.setDrawColor(226, 232, 240);
    doc.rect(margin, pageHeight - margin - 13, contentWidth, 13, 'FD');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7);
    doc.setTextColor(15, 23, 42);
    doc.text('OFFICIAL SOURCE PORTAL:', margin + 4, pageHeight - margin - 7.5);

    doc.setFont('helvetica', 'normal');
    doc.setTextColor(37, 99, 235);
    doc.text(tender.sourceUrl || 'https://ppra.org.pk', margin + 44, pageHeight - margin - 7.5);

    doc.setFontSize(6.2);
    doc.setTextColor(148, 163, 184);
    doc.text(`Generated by TENDER GATE (https://tender-gate.vercel.app) on ${new Date().toLocaleString('en-PK')}`, margin + 4, pageHeight - margin - 3);

    // Save PDF
    const filename = `TenderGate_${(tender.refNo || 'Tender').replace(/[^a-zA-Z0-9_-]/g, '_')}_Notice.pdf`;
    doc.save(filename);
  } catch (error) {
    console.error('Failed to generate PDF, falling back to TXT dossier:', error);
    downloadTenderDossier(tender);
  }
}

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
