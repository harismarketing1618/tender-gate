// Pakistan Engineering Council (PEC) & Public Procurement Regulatory Authority (PPRA) Metadata

export const PEC_CATEGORIES = [
  { code: 'C-A', title: 'Category C-A', limit: 'No Limit (Unlimited)', limitValue: 9999999999, description: 'Mega Infrastructure, Motorways & Massive Dams' },
  { code: 'C-B', title: 'Category C-B', limit: 'Up to PKR 3,000 Million (3.0 Billion)', limitValue: 3000000000, description: 'Major Highways, High-Rise Complexes & Power Stations' },
  { code: 'C-1', title: 'Category C-1', limit: 'Up to PKR 2,500 Million (2.5 Billion)', limitValue: 2500000000, description: 'National Highways, Hospitals, Large Bridges & Substations' },
  { code: 'C-2', title: 'Category C-2', limit: 'Up to PKR 1,000 Million (1.0 Billion)', limitValue: 1000000000, description: 'Intercity Roads, University Campuses, Water Treatment' },
  { code: 'C-3', title: 'Category C-3', limit: 'Up to PKR 500 Million (50 Crore)', limitValue: 500000000, description: 'Commercial Buildings, Flyovers, Medium Drainage Works' },
  { code: 'C-4', title: 'Category C-4', limit: 'Up to PKR 200 Million (20 Crore)', limitValue: 200000000, description: 'District Roads, Colleges, Town Sewerage & MEP Works' },
  { code: 'C-5', title: 'Category C-5', limit: 'Up to PKR 65 Million (6.5 Crore)', limitValue: 65000000, description: 'Municipal Roads, Clinics, Local Water Supply & Renovation' },
  { code: 'C-6', title: 'Category C-6', limit: 'Up to PKR 25 Million (2.5 Crore)', limitValue: 25000000, description: 'Small Civil Repairs, PCC Streets, Minor Maintenance' },
];

export const PROVINCES_AND_REGIONS = [
  { id: 'all', name: 'All Pakistan' },
  { id: 'Federal', name: 'Federal Capital (Islamabad ICT)' },
  { id: 'Punjab', name: 'Punjab' },
  { id: 'Sindh', name: 'Sindh' },
  { id: 'KPK', name: 'Khyber Pakhtunkhwa (KPK)' },
  { id: 'Balochistan', name: 'Balochistan' },
  { id: 'AJK', name: 'Azad Jammu & Kashmir (AJK)' },
  { id: 'GB', name: 'Gilgit-Baltistan (GB)' },
];

export const MAJOR_PROCURING_AGENCIES = [
  { id: 'all', name: 'All Procuring Authorities' },
  { id: 'NHA', name: 'National Highway Authority (NHA)' },
  { id: 'MES', name: 'Military Engineer Services (MES / GHQ)' },
  { id: 'WAPDA', name: 'Water & Power Development Authority (WAPDA)' },
  { id: 'IDAP', name: 'Infrastructure Development Authority of Punjab (IDAP)' },
  { id: 'C&W', name: 'Communication & Works (C&W Dept)' },
  { id: 'CDA', name: 'Capital Development Authority (CDA Islamabad)' },
  { id: 'DHA', name: 'Defense Housing Authority (DHA PK)' },
  { id: 'SNGPL', name: 'Sui Northern Gas Pipelines Limited (SNGPL)' },
  { id: 'WASA', name: 'Water and Sanitation Agency (WASA)' },
  { id: 'LDA', name: 'Lahore Development Authority (LDA)' },
  { id: 'NTDC', name: 'National Transmission & Despatch Co (NTDC)' },
  { id: 'CAA', name: 'Pakistan Civil Aviation Authority (PCAA)' },
  { id: 'OGDCL', name: 'Oil & Gas Development Company (OGDCL)' },
  { id: 'FWO', name: 'Frontier Works Organization (FWO Subcontracts)' },
];

export const PEC_SPECIALIZATION_CODES = {
  CE01: 'Road and Graded Pavements, Highways & Expressways',
  CE02: 'Airports and Runways',
  CE04: 'Dams, Reservoirs & Water Retaining Structures',
  CE09: 'Irrigation, Canals, Drainage & Flood Control',
  CE10: 'Water Supply, Sewerage & Public Health Engineering',
  BC01: 'Building Construction, Multi-Storey Commercial & Residential',
  BC02: 'Prefabricated & Industrial Buildings',
  BC03: 'Interior Fit-Out, Decoration & Restoration',
  EE01: 'Electrical Power Generation, Transmission & Distribution',
  EE04: 'Low Voltage Installations, Building Management Systems (BMS)',
  EE06: 'Renewable Energy Systems (Solar & Wind)',
  ME01: 'HVAC (Heating, Ventilation & Air Conditioning)',
  ME02: 'Lifts, Escalators & Travellators',
  ME06: 'Petroleum & Gas Pipeline Transmission Networks',
};
