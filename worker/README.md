# Cloudflare Worker Deployment

This worker acts as a proxy to handle CORS and call Cloudflare Workers AI API.

## Prerequisites

1. Install Wrangler CLI:
```bash
npm install -g wrangler
```

2. Login to Cloudflare:
```bash
wrangler login
```

## Deployment

1. Navigate to the worker directory:
```bash
cd worker
```

2. Deploy the worker:
```bash
wrangler deploy
```

3. After deployment, you'll get a URL like:
```
https://legalconsult-ai-proxy.<your-subdomain>.workers.dev
```

4. Copy that URL and update it in `src/services/api.js`:
```javascript
const WORKER_URL = 'https://legalconsult-ai-proxy.<your-subdomain>.workers.dev';
```

## Testing

Test the worker with:
```bash
curl -X POST https://legalconsult-ai-proxy.<your-subdomain>.workers.dev \
  -H "Content-Type: application/json" \
  -d '{"messages": [{"role": "user", "content": "Hello"}]}'
```

## Local Development

Run locally:
```bash
wrangler dev
```

This will start a local server at `http://localhost:8787`
