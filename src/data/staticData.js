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
    description: 'Authority to register property documents and issue registration certificates with signing authority.',
    status: 'Active',
    createdBy: 'Super Admin',
    createdOn: '2026-05-10 09:15:00',
    updatedBy: 'Admin User',
    updatedOn: '2026-06-05 11:40:22',
  },
  {
    id: 'ROLE_003',
    nameEnglish: 'Data Entry Operator',
    nameMarathi: 'माहिती नीवड़ी जालक',
    description: 'Authorized for data entry of registration applications, document scanning and uploading.',
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
    description: 'Responsible for verification of stamp records and authenticity of submitted documents.',
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
    description: 'Read-only access to stamp records, audit logs and financial reports with reporting capabilities.',
    status: 'Active',
    createdBy: 'Super Admin',
    createdOn: '2026-05-20 14:00:00',
    updatedBy: 'Super Admin',
    updatedOn: '2026-05-20 14:00:00',
  },
]

export const adminPortalTabs = [
  { id: 'admin', label: 'ADMIN' },
  { id: 'igr', label: 'IGR' },
  { id: 'dig', label: 'DIG' },
  { id: 'jdr', label: 'JDR' },
  { id: 'sro', label: 'SRO' },
]

export const services = [
  { id: 'propreg', label: 'Property Reg.', icon: '📋' },
  { id: 'stampdty', label: 'Stamp Duty', icon: '💳' },
  { id: 'docsearch', label: 'Doc Search', icon: '🔍' },
]

export const mockLoginCredentials = {
  email: 'admin@drs.maharashtra.gov.in',
  password: 'admin123',
  captchaAnswer: '4568954',
}
