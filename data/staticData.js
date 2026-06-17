export const staticRoles = [
  {
    id: 'ROLE_001',
    nameEnglish: 'System Administrator',
    nameMarathi: 'प्रणाली प्रशासक',
    description: 'Full access to all system settings, user management, audit logs, and security controls.',
    status: 'Active',
    createdBy: 'Super Admin',
    createdOn: '2026-05-01 10:30:15',
    updatedBy: 'Super Admin',
    updatedOn: '2026-06-01 14:25:00',
  },
  {
    id: 'ROLE_002',
    nameEnglish: 'Sub Registrar',
    nameMarathi: 'उपनिबंधक',
    description: 'Authority to register property documents and manage registration applications.',
    status: 'Active',
    createdBy: 'Super Admin',
    createdOn: '2026-05-10 09:15:00',
    updatedBy: 'Admin User',
    updatedOn: '2026-06-05 11:40:22',
  },
  {
    id: 'ROLE_003',
    nameEnglish: 'Data Entry Operator',
    nameMarathi: 'माहिती निविष्टी जालक',
    description: 'Authorized for data entry of registration applications, scanning and uploading document drafts.',
    status: 'Active',
    createdBy: 'Admin User',
    createdOn: '2026-05-12 11:20:00',
    updatedBy: 'Admin User',
    updatedOn: '2026-05-12 11:20:00',
  },
  {
    id: 'ROLE_004',
    nameEnglish: 'Verification Officer',
    nameMarathi: 'पडताळणी अधिकारी',
    description: 'Responsible for verification of stamp duties and document authenticity.',
    status: 'Inactive',
    createdBy: 'Super Admin',
    createdOn: '2026-05-15 16:45:30',
    updatedBy: 'Super Admin',
    updatedOn: '2026-06-02 09:30:10',
  },
  {
    id: 'ROLE_005',
    nameEnglish: 'Auditor',
    nameMarathi: 'लेखापरीक्षक',
    description: 'Read-only access to stamp records, audit reports, and compliance documentation.',
    status: 'Active',
    createdBy: 'Super Admin',
    createdOn: '2026-05-20 14:00:00',
    updatedBy: 'Super Admin',
    updatedOn: '2026-05-20 14:00:00',
  },
]

export const mockLoginCredentials = {
  username: 'admin@drs.maharashtra.gov.in',
  password: 'admin123',
  captchaAnswer: '4568954',
}

export const roleStatuses = ['Active', 'Inactive']

export const navMenuItems = [
  { id: 'role-management', label: 'Role Management', icon: '🔐' },
  { id: 'office-management', label: 'Office Management', icon: '🏢' },
  { id: 'employee-management', label: 'Employee Management', icon: '👥' },
  { id: 'zone-management', label: 'Zone Management', icon: '🗺️' },
]

export const adminPortalTabs = [
  { id: 'admin', label: 'ADMIN' },
  { id: 'igr', label: 'IGR' },
  { id: 'dig', label: 'DIG' },
  { id: 'jdr', label: 'JDR' },
  { id: 'sro', label: 'SRO' },
]

export const services = [
  { id: 'property-reg', label: 'Property Reg.', icon: '📄' },
  { id: 'stamp-duty', label: 'Stamp Duty', icon: '⚖️' },
  { id: 'doc-search', label: 'Doc Search', icon: '🔍' },
  { id: 'employee-reg', label: 'Employee Registration', icon: '👤' },
  { id: 'downloads', label: 'Downloads Doc', icon: '⬇️' },
]
