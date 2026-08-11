# Velvet Music Player

## Production setup

1. Use Node.js 20.19+ or 22.12+ and run `npm ci`.
2. Copy `.env.example` to `.env.local` and supply the required values. Never commit `.env.local`.
3. Restrict the YouTube Data API key to your production and preview domains in Google Cloud Console. A `VITE_` value is bundled into browser code, so it must never be an unrestricted key.
4. In Firebase Authentication, enable **Anonymous** sign-in. Deploy the rules in `database.rules.json` to Realtime Database before publishing. They limit each visitor to writing only their own presence record.
5. Run `npm run build` and deploy the generated `dist/` directory with an SPA fallback to `index.html`.

## Checks

Run `npm run build` before every release. It performs the production bundle check.
