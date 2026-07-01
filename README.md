# Maharashtra Government - Department of Registration and Stamps Admin Portal

A professional React/Next.js application for managing roles and access control in the Maharashtra Government's Department of Registration and Stamps.

## Features

- **Secure Login System** - Multi-user portal with validation (ADMIN, IGR, DIG, JDR, SRO tabs)
- **Role Management Dashboard** - Complete role CRUD operations with search and filtering
- **Form Validation** - Comprehensive validation on login and role creation forms
- **Responsive Design** - Clean, professional UI following government standards
- **Role Details Modal** - View complete role information in a modal dialog
- **Bilingual Support** - English and Marathi interface elements

## Environment Variables

Environment variables allow you to configure the application without changing code. 

**Quick Start:**
```bash
cp .env.example .env.local
npm run dev
```

See `ENV_QUICK_START.md` for quick reference and `ENV_CONFIG.md` for complete documentation.

### Key Variables
- `NEXT_PUBLIC_APP_ENV` - Environment (development/production)
- `NEXT_PUBLIC_API_BASE_URL` - API endpoint
- `SESSION_SECRET` - Session encryption key (production only)
- `NEXT_PUBLIC_ENABLE_DEBUG` - Debug mode toggle

## Project Structure

```
app/
├── layout.tsx              # Root layout with metadata
├── page.tsx                # Login page
├── globals.css             # Global styles with Tailwind
└── dashboard/
    ├── layout.tsx          # Dashboard layout with sidebar
    ├── page.tsx            # Role management dashboard
    └── create-role/
        └── page.tsx        # Create new role page

components/
├── LoginForm.tsx           # Login form with validation
├── RoleList.tsx            # Role listing with search/filter
├── RoleDetailsModal.tsx    # Role details modal
├── CreateRoleForm.tsx      # Role creation form with validation
├── Sidebar.tsx             # Navigation sidebar
└── Header.tsx              # Dashboard header

types/
└── index.ts                # TypeScript interfaces

utils/
├── validation.ts           # Form validation functions
└── env.ts                  # Environment variables management

data/
└── staticData.ts           # Static data for demo

.env.example               # Environment template (commit this)
.env.local                 # Local development settings (DO NOT commit)
.env.production            # Production settings template
ENV_CONFIG.md              # Complete environment documentation
ENV_QUICK_START.md         # Quick reference guide
```

## Technology Stack

- **Framework**: Next.js 16 with React 19
- **Styling**: Tailwind CSS v4
- **Language**: TypeScript
- **State Management**: React Hooks (useState)
- **Forms**: React controlled components with validation
- **Navigation**: Next.js App Router

## Key Components

### Login Page (`app/page.tsx`)
- Multi-tab interface for different user types
- Login ID, Password, and CAPTCHA validation
- Service shortcuts (Property Reg, Stamp Duty, etc.)
- Responsive layout with sidebar services

### Login Form (`components/LoginForm.tsx`)
- Real-time field validation
- Password visibility toggle
- CAPTCHA verification
- Error message display
- Loading state feedback

### Role Management (`components/RoleList.tsx`)
- Display 5 pre-loaded roles with static data
- Search functionality (Name, Description, ID)
- Status filter (All Roles, Active, Inactive)
- Table with sort indicators
- View/Edit/Delete action buttons
- Pagination controls

### Create Role Form (`components/CreateRoleForm.tsx`)
- English and Marathi role name fields
- Read-only "Created By" field (Super Admin)
- Status toggle (Active/Inactive)
- Description textarea with character limit (500)
- Full field validation
- Success feedback messages

### Role Details Modal (`components/RoleDetailsModal.tsx`)
- View complete role information
- Display creation/update metadata
- Full description with formatting
- Bilingual role names

## Validation Rules

### Login Form
- **Login ID**: 3-50 characters required
- **Password**: Minimum 6 characters
- **CAPTCHA**: Must match displayed number (4568954 for demo)

### Role Creation
- **English Name**: 3-100 characters required
- **Marathi Name**: 3-100 characters required
- **Description**: Maximum 500 characters (optional)

## Static Data

The application includes pre-loaded data for 5 roles:
1. System Administrator (ROLE_001) - Active
2. Sub Registrar (ROLE_002) - Active
3. Data Entry Operator (ROLE_003) - Active
4. Verification Officer (ROLE_004) - Inactive
5. Auditor (ROLE_005) - Active

### Demo Login Credentials
- **Login ID**: `admin@drs.maharashtra.gov.in`
- **Password**: `admin123`
- **CAPTCHA**: `4568954`

## Design Guidelines

- **Color Scheme**: Blue (#0066CC) and white with gray neutrals
- **Typography**: Clean sans-serif (Geist font)
- **Icons**: Unicode emoji for visual clarity
- **Spacing**: Consistent Tailwind spacing scale
- **Responsiveness**: Mobile-first design with grid breakpoints

## Features Implemented

✅ Login form with validation
✅ CAPTCHA verification
✅ Multi-tab user selection (ADMIN, IGR, DIG, JDR, SRO)
✅ Dashboard with sidebar navigation
✅ Role listing with static data
✅ Role search and filtering
✅ Role details modal
✅ Create role form with validation
✅ Back navigation
✅ Logout button in sidebar
✅ Bilingual support (English/Marathi)
✅ Government branding and styling

## Not Implemented (As Per Requirements)

❌ Biometric login section
❌ API integration (using static data)
❌ Database persistence
❌ User authentication backend

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Start development server:
```bash
npm run dev
```

3. Open http://localhost:3000 in your browser

4. Login with demo credentials (see above)

## Navigation Flow

1. **Login Page** → Username + Password + CAPTCHA
2. **Dashboard** → Role Management list
3. **Create Role** → Form to add new roles
4. **Role Details** → Modal with complete information
5. **Logout** → Returns to login

## Browser Compatibility

- Chrome/Edge (Latest)
- Firefox (Latest)
- Safari (Latest)
- Mobile browsers

## Notes

- All form submissions are simulated with mock success messages
- Data persists only during the session (no backend storage)
- CAPTCHA is pre-set for demo purposes
- Sidebar navigation is functional but all sections link to the same dashboard

---

**Department**: Department of Registration and Stamps, Government of Maharashtra
**Version**: 1.0.0
