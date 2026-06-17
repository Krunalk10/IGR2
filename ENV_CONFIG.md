# Environment Variables Configuration

## Overview

This document describes all environment variables used in the Maharashtra DRS Portal application. Environment variables allow you to customize the application behavior without changing code.

## File Structure

```
.env.example          - Template with all available variables (commit this)
.env.local           - Local development settings (DO NOT commit)
.env.production      - Production settings template (DO NOT commit)
.gitignore           - Configured to exclude .env.local and .env.production.local
```

## Setup Instructions

### For Local Development

1. **Copy the example file:**
   ```bash
   cp .env.example .env.local
   ```

2. **Update values in `.env.local`:**
   - Edit values specific to your local setup
   - No credentials needed for local development
   - Keep default values for features you're not testing

3. **Never commit `.env.local`:**
   - This file contains local/sensitive settings
   - Git is configured to ignore it
   - Each developer should have their own `.env.local`

### For Production Deployment

1. **Create production configuration:**
   - Set all environment variables in your hosting platform
   - Vercel: Settings → Environment Variables
   - AWS: Secrets Manager or Parameter Store
   - Docker: Environment variables or secrets

2. **Required Production Variables:**
   ```
   SESSION_SECRET=<secure-random-value>
   DATABASE_URL=<production-db-url>
   SMTP_HOST=<production-email-host>
   SMTP_PASSWORD=<production-email-password>
   NEXT_PUBLIC_API_BASE_URL=<production-api-url>
   ```

3. **Generate SESSION_SECRET:**
   ```bash
   openssl rand -base64 32
   ```

## Environment Variables Reference

### Application Configuration

| Variable | Type | Default | Description |
|----------|------|---------|-------------|
| `NEXT_PUBLIC_APP_ENV` | string | `development` | Application environment (development/staging/production) |
| `NEXT_PUBLIC_APP_NAME` | string | `Maharashtra DRS Portal` | Application display name |
| `NEXT_PUBLIC_APP_VERSION` | string | `1.0.0` | Application version |

### API Configuration

| Variable | Type | Default | Description |
|----------|------|---------|-------------|
| `NEXT_PUBLIC_API_BASE_URL` | string | `http://localhost:3000/api` | Base URL for API requests |
| `NEXT_PUBLIC_API_TIMEOUT` | number | `30000` | API request timeout in milliseconds |

### Authentication Configuration

| Variable | Type | Default | Description |
|----------|------|---------|-------------|
| `NEXT_PUBLIC_AUTH_ENABLED` | boolean | `true` | Enable/disable authentication |
| `NEXT_PUBLIC_SESSION_TIMEOUT` | number | `3600000` | Session timeout in milliseconds (1 hour) |
| `NEXT_PUBLIC_TOKEN_EXPIRY` | number | `86400000` | Token expiry in milliseconds (24 hours) |
| `SESSION_SECRET` | string | - | Secret key for session encryption (server-side only) |

**⚠️ Important:** `SESSION_SECRET` is server-side only and must NEVER be exposed to the client.

### Database Configuration

| Variable | Type | Default | Description |
|----------|------|---------|-------------|
| `DATABASE_URL` | string | - | PostgreSQL database connection string |

**Format:** `postgresql://user:password@host:port/database`

### Email Configuration

| Variable | Type | Default | Description |
|----------|------|---------|-------------|
| `SMTP_HOST` | string | `smtp.gmail.com` | SMTP server hostname |
| `SMTP_PORT` | number | `587` | SMTP server port |
| `SMTP_USER` | string | - | SMTP authentication username |
| `SMTP_PASSWORD` | string | - | SMTP authentication password |
| `EMAIL_FROM` | string | `noreply@drs.maharashtra.gov.in` | Default sender email address |

### File Upload Configuration

| Variable | Type | Default | Description |
|----------|------|---------|-------------|
| `MAX_FILE_SIZE` | number | `10485760` | Maximum file size in bytes (10MB) |
| `ALLOWED_FILE_TYPES` | string | `pdf,doc,docx,jpg,jpeg,png` | Comma-separated list of allowed file types |

### Logging Configuration

| Variable | Type | Default | Description |
|----------|------|---------|-------------|
| `LOG_LEVEL` | string | `debug`/`info` | Logging level (debug/info/warn/error) |
| `NEXT_PUBLIC_ENABLE_DEBUG` | boolean | `false` | Enable debug mode in development |

### Feature Flags

| Variable | Type | Default | Description |
|----------|------|---------|-------------|
| `NEXT_PUBLIC_ENABLE_BIOMETRIC` | boolean | `false` | Enable biometric authentication |
| `NEXT_PUBLIC_ENABLE_MULTI_LANGUAGE` | boolean | `true` | Enable multi-language support |
| `NEXT_PUBLIC_ENABLE_DARK_MODE` | boolean | `false` | Enable dark mode UI |
| `NEXT_PUBLIC_ENABLE_ANALYTICS` | boolean | `false` | Enable analytics tracking |

## Variable Naming Convention

- **`NEXT_PUBLIC_`** - Publicly accessible in browser (client-side)
- **No prefix** - Server-side only, never exposed to client

### Examples:
```javascript
// ✅ Client-side (safe to expose)
process.env.NEXT_PUBLIC_APP_NAME  // "Maharashtra DRS Portal"
process.env.NEXT_PUBLIC_API_BASE_URL  // "https://api.example.com"

// ❌ Never expose to client
process.env.SESSION_SECRET  // Use only in server-side code
process.env.DATABASE_URL    // Use only in server-side code
```

## Usage in Code

### Using Environment Variables

```typescript
// Client-side (safe)
import { APP_NAME, API_BASE_URL } from '@/utils/env'

export function Header() {
  return <h1>{APP_NAME}</h1>
}

// Server-side (secure)
import { SESSION_SECRET } from '@/utils/env'

export async function createSession() {
  const secret = SESSION_SECRET // Server-side only
  // ... secure operations
}
```

### Validation

```typescript
import { validateEnvironment } from '@/utils/env'

// On application startup
const validation = validateEnvironment()
if (!validation.isValid) {
  console.error('Environment validation failed:', validation.errors)
  process.exit(1)
}
```

### Feature Flags

```typescript
import { FEATURE_FLAGS } from '@/utils/env'

export function BiometricLogin() {
  if (!FEATURE_FLAGS.BIOMETRIC) {
    return null // Feature disabled
  }
  // Render biometric login
}
```

## Development vs Production

### Development Environment
```bash
NEXT_PUBLIC_APP_ENV=development
NEXT_PUBLIC_API_BASE_URL=http://localhost:3000/api
NEXT_PUBLIC_ENABLE_DEBUG=true
LOG_LEVEL=debug
SESSION_SECRET=dev-secret-123
```

### Production Environment
```bash
NEXT_PUBLIC_APP_ENV=production
NEXT_PUBLIC_API_BASE_URL=https://api.drs.maharashtra.gov.in
NEXT_PUBLIC_ENABLE_DEBUG=false
LOG_LEVEL=info
SESSION_SECRET=<secure-random-value>
```

## Security Best Practices

1. **Never commit sensitive files:**
   - `.env.local` contains local development credentials
   - `.env.production.local` contains production secrets
   - Both are git-ignored automatically

2. **Protect server-side variables:**
   - Variables without `NEXT_PUBLIC_` prefix are server-side only
   - Never log or expose `SESSION_SECRET`, `DATABASE_URL`, passwords

3. **Use strong secrets in production:**
   ```bash
   # Generate secure SESSION_SECRET
   openssl rand -base64 32
   ```

4. **Rotate secrets regularly:**
   - Change `SESSION_SECRET` periodically
   - Update database passwords quarterly
   - Audit email credentials monthly

5. **Use environment-specific values:**
   - Development: localhost and test credentials
   - Staging: staging server and staging credentials
   - Production: production servers and real credentials

6. **Validate on startup:**
   - Call `validateEnvironment()` when app starts
   - Fail fast if critical variables are missing
   - Log clear error messages for debugging

## Troubleshooting

### "API_BASE_URL is not configured"
```
Solution: Set NEXT_PUBLIC_API_BASE_URL in .env.local
```

### "SESSION_SECRET is not set"
```
Solution: Add SESSION_SECRET to .env.local for local development
For production: Set in hosting platform's environment variables
```

### Environment variables not loading
```
Solution: Ensure file is named .env.local (not .env)
Restart dev server: pnpm dev
```

### Different values per developer
```
Solution: Each developer has their own .env.local
Don't commit .env.local to Git
Document required variables in .env.example
```

## Vercel Deployment

### Setting Environment Variables on Vercel

1. Go to **Project Settings** → **Environment Variables**
2. Add production variables:
   ```
   Name: NEXT_PUBLIC_APP_ENV
   Value: production
   Environment: Production
   
   Name: SESSION_SECRET
   Value: <generated-secret>
   Environment: Production
   ```

3. Or use CLI:
   ```bash
   vercel env add NEXT_PUBLIC_APP_ENV
   # Follow prompts to add value
   ```

4. Redeploy for changes to take effect:
   ```bash
   vercel --prod
   ```

## Docker Deployment

### Using Environment Variables in Docker

**Dockerfile:**
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY . .
RUN pnpm install && pnpm build
EXPOSE 3000
CMD ["pnpm", "start"]
```

**Run with env vars:**
```bash
docker run \
  -e NEXT_PUBLIC_APP_ENV=production \
  -e SESSION_SECRET=your-secret \
  -e DATABASE_URL=your-db-url \
  -p 3000:3000 \
  drs-portal:latest
```

**Or use .env file:**
```bash
docker run --env-file .env.production -p 3000:3000 drs-portal:latest
```

## Summary

Environment variables provide flexible configuration without code changes. Follow these key points:

- Use `.env.example` as a template
- Create `.env.local` for local development
- Never commit `.env.local` or `.env.production.local`
- Validate environment on startup
- Use `NEXT_PUBLIC_` prefix only for client-safe variables
- Generate strong `SESSION_SECRET` for production
- Document all required variables in `.env.example`
