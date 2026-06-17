# Environment Variables - Quick Start Guide

## One-Minute Setup

### 1. Create Local Environment File
```bash
cp .env.example .env.local
```

### 2. Start Development
```bash
pnpm dev
```

That's it! The app uses default values from `.env.example` automatically.

---

## File Structure

```
.env.example          ← Template (commit this to Git)
.env.local           ← Your local development (DO NOT commit)
.env.production      ← Production template (reference only)
utils/env.ts         ← Environment config management
```

---

## What Each File Does

| File | Purpose | Commit? |
|------|---------|---------|
| `.env.example` | Template with all variables | ✅ YES |
| `.env.local` | Your local development settings | ❌ NO |
| `.env.production` | Production settings template | ❌ NO |

---

## Common Variables to Change

### For Local Development
```bash
# .env.local

# Change API endpoint if using local backend
NEXT_PUBLIC_API_BASE_URL=http://localhost:3000/api

# Enable debug mode
NEXT_PUBLIC_ENABLE_DEBUG=true
```

### For Production
```bash
# Use in Vercel/hosting platform settings

NEXT_PUBLIC_APP_ENV=production
NEXT_PUBLIC_API_BASE_URL=https://api.drs.maharashtra.gov.in
SESSION_SECRET=<generate-with: openssl rand -base64 32>
```

---

## Using Env Variables in Code

### Client-Side (Browser Safe)
```typescript
import { APP_NAME, API_BASE_URL } from '@/utils/env'

// These are safe - exposed to browser
const name = APP_NAME
const api = API_BASE_URL
```

### Server-Side (Keep Secret)
```typescript
import { SESSION_SECRET } from '@/utils/env'

// Server-only - NEVER exposed to browser
const secret = SESSION_SECRET
```

---

## Generating SESSION_SECRET for Production

```bash
# Generate 32-character base64 secret
openssl rand -base64 32
# Output: abc123def456ghi789jkl012mno345pq==

# Use this value in production environment
```

---

## Troubleshooting

### Variables not loading?
```bash
# 1. Ensure file is named .env.local (not .env)
# 2. Check file is in project root directory
# 3. Restart dev server: pnpm dev
```

### API endpoint errors?
```bash
# Update NEXT_PUBLIC_API_BASE_URL in .env.local
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000/api
# Restart: pnpm dev
```

### Feature not working?
```bash
# Check feature flags in .env.local
NEXT_PUBLIC_ENABLE_BIOMETRIC=true
# Restart: pnpm dev
```

---

## Environment-Specific Configuration

### Development
- Use `localhost` URLs
- Enable debug mode
- Use test credentials
- File: `.env.local`

### Staging
- Use staging server URLs
- Disable debug mode
- Use staging credentials
- File: Hosting platform env vars

### Production
- Use production server URLs
- Disable debug mode
- Use real credentials
- File: Hosting platform env vars

---

## All Available Variables

```bash
# Application
NEXT_PUBLIC_APP_ENV=development
NEXT_PUBLIC_APP_NAME=Maharashtra DRS Portal
NEXT_PUBLIC_APP_VERSION=1.0.0

# API
NEXT_PUBLIC_API_BASE_URL=http://localhost:3000/api
NEXT_PUBLIC_API_TIMEOUT=30000

# Authentication
NEXT_PUBLIC_AUTH_ENABLED=true
NEXT_PUBLIC_SESSION_TIMEOUT=3600000
SESSION_SECRET=dev-secret-123

# Features
NEXT_PUBLIC_ENABLE_BIOMETRIC=false
NEXT_PUBLIC_ENABLE_MULTI_LANGUAGE=true
NEXT_PUBLIC_ENABLE_DARK_MODE=false
NEXT_PUBLIC_ENABLE_ANALYTICS=false

# Logging
LOG_LEVEL=debug
NEXT_PUBLIC_ENABLE_DEBUG=true

# Files
MAX_FILE_SIZE=10485760
ALLOWED_FILE_TYPES=pdf,doc,docx,jpg,jpeg,png

# Email (Production only)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@example.com
SMTP_PASSWORD=your-password

# Database (Future)
DATABASE_URL=postgresql://localhost:5432/db
```

---

## For Vercel Deployment

1. Go to **Project Settings** → **Environment Variables**
2. Add each production variable
3. Redeploy: `vercel --prod`

Example:
```
NEXT_PUBLIC_APP_ENV = production
SESSION_SECRET = (generated value)
NEXT_PUBLIC_API_BASE_URL = https://api.drs.maharashtra.gov.in
```

---

## For Docker Deployment

```bash
# Run with .env file
docker run --env-file .env.production -p 3000:3000 drs-portal

# Or pass individual variables
docker run \
  -e NEXT_PUBLIC_APP_ENV=production \
  -e SESSION_SECRET=your-secret \
  -p 3000:3000 drs-portal
```

---

## Remember

✅ **Do:**
- Copy `.env.example` to `.env.local`
- Keep `.env.local` out of Git
- Use strong `SESSION_SECRET` in production
- Validate environment on startup

❌ **Don't:**
- Commit `.env.local` to Git
- Expose `SESSION_SECRET` in code
- Use default secrets in production
- Hardcode API URLs

---

**Need more details?** See `ENV_CONFIG.md` for complete documentation.
