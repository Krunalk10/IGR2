# Environment Variables Documentation Index

## Start Here 👇

| Document | Time | Purpose | For Whom |
|----------|------|---------|----------|
| **[ENV_QUICK_START.md](ENV_QUICK_START.md)** | 1 min | Copy `.env.example`, run app | Everyone |
| **[ENV_CONFIG.md](ENV_CONFIG.md)** | 10 min | Complete reference guide | Developers |
| **[ENV_FILES_SUMMARY.md](ENV_FILES_SUMMARY.md)** | 5 min | File structure overview | Team leads |
| **[ENV_SETUP_CHECKLIST.md](ENV_SETUP_CHECKLIST.md)** | 5 min | Verification checklist | QA, Deployment |

---

## What Problem Does This Solve?

**Before:** Hardcoded values in code, secrets exposed, no flexibility  
**After:** Configurable environment, secure secrets, works everywhere

---

## The TL;DR (30 seconds)

```bash
# 1. Create local config
cp .env.example .env.local

# 2. Start app
pnpm dev

# 3. Done! ✓
# App runs on http://localhost:3000
```

---

## Files at a Glance

### Environment Config Files (In Project Root)

```
.env.example          ← Template (commit this)
.env.local           ← Your local settings (don't commit)
.env.production      ← Production reference (don't commit)
```

### Code File

```
utils/env.ts         ← Import configuration from here
```

### Documentation Files

```
ENV_INDEX.md                ← This file (navigation guide)
ENV_QUICK_START.md          ← Quick setup (1 minute)
ENV_CONFIG.md               ← Complete guide (10 minutes)
ENV_FILES_SUMMARY.md        ← File overview (5 minutes)
ENV_SETUP_CHECKLIST.md      ← Verification (5 minutes)
```

---

## Questions & Answers

**Q: Where do I start?**  
A: Read `ENV_QUICK_START.md` (1 minute)

**Q: I need complete details**  
A: Read `ENV_CONFIG.md` (comprehensive reference)

**Q: I'm deploying to production**  
A: Go to `ENV_CONFIG.md` → "Production Deployment"

**Q: How do I use variables in code?**  
A: See `ENV_CONFIG.md` → "Usage in Code"

**Q: What variables are available?**  
A: See `ENV_CONFIG.md` → "Environment Variables Reference"

**Q: How do I enable/disable features?**  
A: Edit `.env.local` and set `NEXT_PUBLIC_ENABLE_*` flags

**Q: What should I commit to Git?**  
A: Only `.env.example` and code files. Never commit `.env.local`

**Q: Why is `.env.local` important?**  
A: It keeps your local/development settings separate from others

**Q: How do I generate SESSION_SECRET?**  
A: Run: `openssl rand -base64 32`

**Q: I'm using Docker**  
A: See `ENV_CONFIG.md` → "Docker Deployment"

---

## Navigation by Role

### For New Developers
1. Read: `ENV_QUICK_START.md`
2. Run: `cp .env.example .env.local && pnpm dev`
3. Reference: `ENV_CONFIG.md` when needed

### For Team Leads
1. Review: `ENV_FILES_SUMMARY.md`
2. Check: What variables are defined
3. Document: Any custom variables your team uses

### For DevOps/Deployment
1. Read: `ENV_CONFIG.md` → "Production Deployment"
2. Check: Vercel/Docker/AWS sections
3. Set: Environment variables in your platform
4. Verify: Using `ENV_SETUP_CHECKLIST.md`

### For QA/Testing
1. Review: `ENV_SETUP_CHECKLIST.md`
2. Verify: All files created correctly
3. Test: Different environment configurations
4. Validate: Using variables work as expected

---

## Common Tasks

### Change API Endpoint
**File:** `.env.local`
```bash
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000/api
# Restart: pnpm dev
```

### Enable Debug Mode
**File:** `.env.local`
```bash
NEXT_PUBLIC_ENABLE_DEBUG=true
LOG_LEVEL=debug
# Restart: pnpm dev
```

### Deploy to Production
**Steps:**
1. Generate: `openssl rand -base64 32` → copy as SESSION_SECRET
2. Platform: Set environment variables (Vercel/AWS/etc)
3. Deploy: Your deployment command
4. Verify: Variables loaded in production

### Generate Secure Secret
```bash
openssl rand -base64 32
# Use output for SESSION_SECRET
```

---

## Key Concepts

### Public vs Server-Side Variables

**Public (visible in browser):**
- Start with `NEXT_PUBLIC_`
- Example: `NEXT_PUBLIC_APP_NAME`
- Used for: Configuration that users should see

**Server-Side (hidden from browser):**
- No prefix
- Example: `SESSION_SECRET`
- Used for: Credentials and secrets

### Feature Flags

Toggle features without redeploying:
```bash
NEXT_PUBLIC_ENABLE_BIOMETRIC=false        # Disabled
NEXT_PUBLIC_ENABLE_MULTI_LANGUAGE=true    # Enabled
```

### Environment-Specific Config

```bash
# Development
NEXT_PUBLIC_APP_ENV=development
NEXT_PUBLIC_API_BASE_URL=http://localhost:3000/api

# Production
NEXT_PUBLIC_APP_ENV=production
NEXT_PUBLIC_API_BASE_URL=https://api.drs.maharashtra.gov.in
```

---

## Importing in Code

### Safe (Client-Side)
```typescript
import { APP_NAME, API_BASE_URL } from '@/utils/env'
// These are visible in browser - that's OK
```

### Secure (Server-Side Only)
```typescript
import { SESSION_SECRET } from '@/utils/env'
// Use only in server-side code - NEVER expose to client
```

### Feature Checking
```typescript
import { FEATURE_FLAGS } from '@/utils/env'

if (FEATURE_FLAGS.BIOMETRIC) {
  // Show biometric login
}
```

### Validation
```typescript
import { validateEnvironment } from '@/utils/env'

const { isValid, errors } = validateEnvironment()
if (!isValid) {
  console.error('Configuration errors:', errors)
}
```

---

## File Structure

```
Project Root/
├── .env.example              (COMMIT to Git)
├── .env.local               (Ignore - never commit)
├── .env.production          (Don't commit - reference only)
├── utils/
│   └── env.ts              (COMMIT - contains imports)
├── ENV_INDEX.md             (COMMIT - this file)
├── ENV_QUICK_START.md       (COMMIT - 1 min guide)
├── ENV_CONFIG.md            (COMMIT - complete ref)
├── ENV_FILES_SUMMARY.md     (COMMIT - overview)
└── ENV_SETUP_CHECKLIST.md  (COMMIT - verification)
```

---

## Security Checklist

- [ ] `.env.local` is in `.gitignore`
- [ ] Never commit `.env.local`
- [ ] Never hardcode secrets in code
- [ ] Use strong `SESSION_SECRET` in production
- [ ] Only expose `NEXT_PUBLIC_*` variables
- [ ] Validate environment on startup
- [ ] Rotate secrets periodically

---

## Troubleshooting

### App uses default values instead of `.env.local`
**Fix:**
1. Check file name is `.env.local` (not `.env`)
2. Verify it's in project root
3. Restart: `pnpm dev`
4. Clear cache: `rm -rf .next`

### Variables not updating
**Fix:**
1. Edit `.env.local`
2. Restart dev server: `pnpm dev`
3. Clear browser cache
4. Check console for errors

### Can't connect to API
**Fix:**
1. Verify `NEXT_PUBLIC_API_BASE_URL` in `.env.local`
2. Check API server is running
3. Test URL in browser
4. Check CORS headers

---

## Next Steps

✓ **Step 1:** Copy `.env.example` to `.env.local`  
✓ **Step 2:** Run `pnpm dev`  
✓ **Step 3:** Open http://localhost:3000  
✓ **Step 4:** Refer to documentation as needed  

---

## Quick Links

- **Setup:** `ENV_QUICK_START.md`
- **Reference:** `ENV_CONFIG.md`
- **Overview:** `ENV_FILES_SUMMARY.md`
- **Checklist:** `ENV_SETUP_CHECKLIST.md`
- **Code:** `utils/env.ts`

---

## Summary

✓ **Configuration** is externalized and secure  
✓ **Documentation** is comprehensive and accessible  
✓ **Setup** is simple (copy .env.example → run app)  
✓ **Security** is built-in (no secrets in code)  
✓ **Flexibility** works for dev, staging, production  

**Ready to start?** → Read `ENV_QUICK_START.md` (1 minute)
