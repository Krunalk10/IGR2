# Setup & Installation Guide

## Project Overview

This is a **Maharashtra Government Admin Portal** built with React and Next.js for managing roles, permissions, and access control. It includes a professional login system, role management dashboard, and comprehensive form validation.

## Folder Structure

```
project/
├── app/
│   ├── layout.tsx                    # Root layout
│   ├── page.tsx                      # Login page (home)
│   ├── globals.css                   # Global styles
│   └── dashboard/
│       ├── layout.tsx                # Dashboard layout with sidebar
│       ├── page.tsx                  # Role management dashboard
│       └── create-role/
│           └── page.tsx              # Create role page
├── components/
│   ├── LoginForm.tsx                 # Login form with validation
│   ├── RoleList.tsx                  # Role listing component
│   ├── RoleDetailsModal.tsx          # Role details modal
│   ├── CreateRoleForm.tsx            # Create role form
│   ├── Sidebar.tsx                   # Navigation sidebar
│   └── Header.tsx                    # Dashboard header
├── types/
│   └── index.ts                      # TypeScript interfaces
├── utils/
│   └── validation.ts                 # Form validation utilities
├── data/
│   └── staticData.ts                 # Static data for demo
├── package.json                      # Dependencies
├── tsconfig.json                     # TypeScript config
├── next.config.mjs                   # Next.js config
└── tailwind.config.ts                # Tailwind CSS config
```

## Quick Start

### 1. **Install Dependencies**
```bash
npm install
```

### 2. **Start Development Server**
```bash
npm run dev
```

The app will be available at: **http://localhost:3000**

### 3. **Test Login**
Use these demo credentials:
- **Login ID**: `admin@drs.maharashtra.gov.in`
- **Password**: `admin123`
- **CAPTCHA**: `4568954` (shown on screen)

### 4. **Build for Production**
```bash
npm run build
npm run preview
```

## Key Features

✅ **Multi-tab Login** - ADMIN, IGR, DIG, JDR, SRO user types
✅ **Form Validation** - Login and role creation with error messages
✅ **Role Management** - List, search, filter, and view role details
✅ **Create Role** - Add new roles with English/Marathi names
✅ **Dashboard** - Professional admin interface with sidebar navigation
✅ **Responsive Design** - Works on desktop and tablet
✅ **Static Data** - 5 pre-loaded roles for demonstration

## Testing Flows

### 1. **Login Flow**
1. Visit http://localhost:3000
2. Try clicking LOGIN without filling fields (shows validation errors)
3. Use demo credentials above
4. Click "➕ Add Role" button to create a new role

### 2. **Role Management**
1. After login, view the role list on the dashboard
2. Use search box to find roles by name, description, or ID
3. Filter by status (Active/Inactive) using dropdown
4. Click 👁️ icon to view role details in modal
5. Click ➕ Add Role to create new role

### 3. **Form Validation**
1. Try creating a role with invalid data (too short names)
2. Leave required fields empty
3. Exceed character limits in description
4. See error messages appear in real-time

## Data Management

### Pre-loaded Roles
The app includes 5 static roles:
1. **System Administrator** - Full system access
2. **Sub Registrar** - Property registration authority
3. **Data Entry Operator** - Data entry permissions
4. **Verification Officer** - Verification responsibilities
5. **Auditor** - Read-only audit access

### Where to Find Data
- Roles data: `data/staticData.ts`
- Validation rules: `utils/validation.ts`
- Types/Interfaces: `types/index.ts`

## Customization

### Change Header Logo
Edit `app/page.tsx` and `components/Header.tsx`:
```tsx
<div className="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center text-xl font-bold text-white">
  🏛️  {/* Replace this emoji with your logo */}
</div>
```

### Add More Roles
Edit `data/staticData.ts`:
```ts
export const staticRoles: Role[] = [
  // Add new role objects here
]
```

### Change Color Scheme
Edit `app/globals.css` for color tokens, or update tailwind classes in components. Current colors:
- Primary: Blue (#0066CC)
- Secondary: Gray
- Success: Green
- Warning: Red

### Add New Pages/Routes
1. Create new folder in `app/dashboard/`
2. Add `page.tsx` inside
3. Update sidebar in `components/Sidebar.tsx`

## Environment Setup

This project uses:
- **Node.js** 18+
- **npm** (or yarn)
- **Next.js** 16
- **React** 19
- **TypeScript** 5
- **Tailwind CSS** 4

## Troubleshooting

### Dev server won't start
```bash
# Clear cache and reinstall
rm -rf .next node_modules
npm install
npm run dev
```

### Port 3000 already in use
```bash
npm run dev -- --port 3001  # Use different port
```

### TypeScript errors
```bash
# Check for errors
npx tsc --noEmit
```

### Styling not applied
- Make sure `globals.css` is imported in `app/layout.tsx`
- Clear browser cache (Ctrl+Shift+Delete)
- Restart dev server

## Production Deployment

### Using Vercel (Recommended)
```bash
npm i -g vercel
vercel login
vercel
```

### Using Docker
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY . .
RUN npm ci
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

## File Sizes & Performance

- **Components**: ~50KB total (minified)
- **Types**: ~1KB
- **Utils**: ~3KB
- **Static Data**: ~3KB
- **CSS**: Tailwind CSS (optimized, ~50KB)

## Next Steps

1. **Connect to Database** - Replace static data with API calls
2. **Add Authentication** - Implement real login with JWT/sessions
3. **Add Edit/Delete** - Complete CRUD operations
4. **Add More Features** - Office, Employee, Zone management
5. **Deploy** - Push to production

## Support & Help

For issues or questions:
1. Check `README.md` for feature details
2. Review component code with TypeScript hints
3. Check browser console for errors
4. Verify static data in `data/staticData.ts`

---

**Built for**: Department of Registration and Stamps, Government of Maharashtra
**Version**: 1.0.0
**License**: Government of India
