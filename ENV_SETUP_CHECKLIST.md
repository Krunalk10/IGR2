# Environment Configuration Setup Checklist

## What Was Set Up

Use this checklist to verify everything is configured correctly.

---

## Environment Files

### Core Files
- [x] `.env.example` - Template with all variables (COMMIT to Git)
- [x] `.env.local` - Development settings (DO NOT commit)
- [x] `.env.production` - Production template (DO NOT commit)
- [x] `utils/env.ts` - Configuration management utility (COMMIT to Git)

### Documentation Files
- [x] `ENV_CONFIG.md` - Complete documentation (COMMIT to Git)
- [x] `ENV_QUICK_START.md` - Quick reference guide (COMMIT to Git)
- [x] `ENV_FILES_SUMMARY.md` - Files overview (COMMIT to Git)
- [x] `ENV_SETUP_CHECKLIST.md` - This checklist (COMMIT to Git)

### Configuration Updates
- [x] `.gitignore` - Updated to ignore sensitive files
- [x] `README.md` - Updated with environment section

---

## Local Development Setup

### For First Time Setup
- [ ] Verify `.env.local` exists in project root
- [ ] Check `.env.local` contains development values
- [ ] Confirm `.env.local` is in `.gitignore` (never commit)
- [ ] Start dev server: `pnpm dev`
- [ ] App loads on http://localhost:3000 ✓

### Environment Variables Loaded
- [x] `NEXT_PUBLIC_APP_ENV=development`
- [x] `NEXT_PUBLIC_API_BASE_URL=http://localhost:3000/api`
- [x] `NEXT_PUBLIC_ENABLE_DEBUG=true`
- [x] `LOG_LEVEL=debug`
- [x] Feature flags configured

### Testing
- [x] Login page loads
- [x] Dashboard accessible after login
- [x] Role list displays correctly
- [x] Create role form works
- [x] Form validation active
- [x] No console errors

---

## Using Environment Variables in Code

### Client-Side Usage (Safe)
```typescript
import { APP_NAME, API_BASE_URL } from '@/utils/env'

// ✓ Safe - visible in browser
console.log(APP_NAME)      // "Maharashtra DRS Portal"
console.log(API_BASE_URL)  // "http://localhost:3000/api"
```

### Server-Side Usage (Secure)
```typescript
import { SESSION_SECRET } from '@/utils/env'

// ✓ Secure - server-side only
const secret = SESSION_SECRET  // Never exposed to client
```

### Feature Flags
```typescript
import { FEATURE_FLAGS } from '@/utils/env'

// ✓ Feature toggles
if (FEATURE_FLAGS.BIOMETRIC) {
  // Show biometric login
}
```

### Validation
```typescript
import { validateEnvironment } from '@/utils/env'

// ✓ Validate on startup
const { isValid, errors } = validateEnvironment()
```

---

## Production Deployment

### Before Deploying
- [ ] Generate secure SESSION_SECRET: `openssl rand -base64 32`
- [ ] Update production API URLs
- [ ] Verify DATABASE_URL (if using)
- [ ] Check email configuration (if needed)
- [ ] Review security settings

### Vercel Deployment
- [ ] Go to Project Settings → Environment Variables
- [ ] Add `NEXT_PUBLIC_APP_ENV=production`
- [ ] Add `SESSION_SECRET=<generated-value>`
- [ ] Add `NEXT_PUBLIC_API_BASE_URL=<production-url>`
- [ ] Redeploy: `vercel --prod`

### Docker Deployment
- [ ] Prepare `.env.production` with actual values
- [ ] Build image: `docker build -t drs-portal .`
- [ ] Run container: `docker run --env-file .env.production -p 3000:3000 drs-portal`

### AWS/Other Platforms
- [ ] Use platform's secret management
- [ ] Set environment variables via console/CLI
- [ ] Verify variables loaded on deployment
- [ ] Test in production environment

---

## File Organization

### Commit to Git (Include in Version Control)
```
✓ .env.example
✓ utils/env.ts
✓ ENV_CONFIG.md
✓ ENV_QUICK_START.md
✓ ENV_FILES_SUMMARY.md
✓ ENV_SETUP_CHECKLIST.md
✓ .gitignore (updated)
✓ README.md (updated)
```

### DO NOT Commit (Ignore in .gitignore)
```
✗ .env.local
✗ .env.production.local
✗ .env.*.local (any local overrides)
```

---

## Variable Categories

### Application (Public)
- [x] `NEXT_PUBLIC_APP_ENV`
- [x] `NEXT_PUBLIC_APP_NAME`
- [x] `NEXT_PUBLIC_APP_VERSION`

### API (Public)
- [x] `NEXT_PUBLIC_API_BASE_URL`
- [x] `NEXT_PUBLIC_API_TIMEOUT`

### Authentication (Mixed)
- [x] `NEXT_PUBLIC_AUTH_ENABLED`
- [x] `NEXT_PUBLIC_SESSION_TIMEOUT`
- [x] `NEXT_PUBLIC_TOKEN_EXPIRY`
- [x] `SESSION_SECRET` (server-side)

### Features (Public)
- [x] `NEXT_PUBLIC_ENABLE_BIOMETRIC`
- [x] `NEXT_PUBLIC_ENABLE_MULTI_LANGUAGE`
- [x] `NEXT_PUBLIC_ENABLE_DARK_MODE`
- [x] `NEXT_PUBLIC_ENABLE_ANALYTICS`

### Logging (Mixed)
- [x] `LOG_LEVEL`
- [x] `NEXT_PUBLIC_ENABLE_DEBUG`

### Server-Side Secrets
- [x] `SESSION_SECRET`
- [x] `DATABASE_URL` (template)
- [x] `SMTP_*` variables (template)

---

## Security Verification

### Environment Variable Security
- [x] `.env.local` in `.gitignore`
- [x] `.env.production.local` in `.gitignore`
- [x] `SESSION_SECRET` not hardcoded
- [x] No credentials in code files
- [x] Server-side secrets use correct prefix

### Best Practices Applied
- [x] Template file for onboarding new developers
- [x] Clear documentation on variable usage
- [x] Validation function for startup
- [x] Logger utility for consistent logging
- [x] Feature flags for safe deployment
- [x] Separation of concerns (public vs private)

### Production Readiness
- [x] Configuration supports multiple environments
- [x] Easy integration with hosting platforms
- [x] Docker support included
- [x] Secrets management documented
- [x] Rotation strategy documented

---

## Testing Environment Variables

### Test Loading Variables
```bash
# Check variables are loaded
pnpm dev

# In browser console
console.log(process.env.NEXT_PUBLIC_APP_NAME)
// Output: "Maharashtra DRS Portal"
```

### Test Validation
```typescript
import { validateEnvironment } from '@/utils/env'

const { isValid, errors } = validateEnvironment()
console.log(isValid)   // true
console.log(errors)    // []
```

### Test Environment Summary
```typescript
import { getEnvironmentSummary } from '@/utils/env'

const summary = getEnvironmentSummary()
console.log(summary)
// Output: { environment: 'development', appName: '...', ... }
```

---

## Common Tasks

### Change API Endpoint
**File:** `.env.local`
```bash
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000/api
```
**Then:** Restart dev server

### Enable Debug Mode
**File:** `.env.local`
```bash
NEXT_PUBLIC_ENABLE_DEBUG=true
LOG_LEVEL=debug
```
**Then:** Restart dev server

### Enable Feature
**File:** `.env.local`
```bash
NEXT_PUBLIC_ENABLE_BIOMETRIC=true
```
**Then:** Restart dev server and check code

### Generate Session Secret
```bash
openssl rand -base64 32
# Copy output to SESSION_SECRET in production env vars
```

---

## Documentation Map

| Document | Purpose | Audience | Location |
|----------|---------|----------|----------|
| `.env.example` | Variable template | Developers | Root |
| `ENV_QUICK_START.md` | Quick setup | New developers | Root |
| `ENV_CONFIG.md` | Complete guide | All developers | Root |
| `ENV_FILES_SUMMARY.md` | File overview | Team leads | Root |
| `ENV_SETUP_CHECKLIST.md` | This checklist | QA/Checklist | Root |

---

## Troubleshooting

### Variables Not Loading
**Problem:** App uses default values, not from `.env.local`

**Solutions:**
1. Verify file name is `.env.local` (not `.env`)
2. Check file is in project root directory
3. Restart dev server: `pnpm dev`
4. Clear Next.js cache: `rm -rf .next`

### "SESSION_SECRET not set" Error
**Problem:** Production environment missing SESSION_SECRET

**Solution:**
```bash
# Generate secure value
openssl rand -base64 32

# Add to platform's environment variables
# (Vercel Settings, Docker env, etc.)
```

### API Endpoint Connection Failed
**Problem:** App can't connect to API

**Solution:**
1. Verify `NEXT_PUBLIC_API_BASE_URL` in `.env.local`
2. Check API server is running
3. Test URL in browser
4. Check network tab for CORS errors

### Feature Not Appearing
**Problem:** Feature flag disabled

**Solution:**
1. Set feature flag in `.env.local`:
   ```bash
   NEXT_PUBLIC_ENABLE_BIOMETRIC=true
   ```
2. Restart dev server
3. Clear browser cache
4. Verify component checks feature flag

---

## Final Verification

Run this checklist before considering environment setup complete:

### Setup Complete
- [x] `.env.local` created and configured
- [x] Development environment working
- [x] App loads on http://localhost:3000
- [x] Login form accessible
- [x] Dashboard accessible
- [x] No console errors
- [x] Environment variables loading

### Documentation Complete
- [x] `.env.example` created with all variables
- [x] `ENV_CONFIG.md` written and comprehensive
- [x] `ENV_QUICK_START.md` written for quick reference
- [x] `ENV_FILES_SUMMARY.md` created
- [x] `README.md` updated with env section
- [x] `.gitignore` configured for env files

### Security Complete
- [x] `.env.local` ignored by Git
- [x] No credentials in code
- [x] `SESSION_SECRET` management documented
- [x] Production deployment steps documented
- [x] Feature flags implemented
- [x] Validation function in place

### Ready for Development
- [x] New developers can clone and run
- [x] Documentation is comprehensive
- [x] Quick start guide available
- [x] Troubleshooting guide included
- [x] Production deployment documented

---

## Success! ✓

Environment configuration is:
- ✓ **Set up** - All files created and configured
- ✓ **Documented** - Complete and quick reference guides
- ✓ **Secure** - Secrets management in place
- ✓ **Flexible** - Supports dev, staging, production
- ✓ **Production-ready** - Can deploy to any platform

**Start with:** `ENV_QUICK_START.md`  
**For details:** `ENV_CONFIG.md`  
**For overview:** `ENV_FILES_SUMMARY.md`
