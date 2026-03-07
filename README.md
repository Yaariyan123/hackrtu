# Disrupt Dev Hackathon 2077

Modern, futuristic hackathon website with dark gray + golden yellow glassmorphism theme.

## Setup

```bash
npm install
npm run dev
```

Visit `http://localhost:3000`

## Backend (Contact Form)

The contact form submits to `POST /api/contact`. Configure your FastAPI backend to handle:

```json
{
  "name": "string",
  "email": "string",
  "message": "string"
}
```

Vite proxies `/api` to `http://localhost:8000` by default. Update `vite.config.js` if your API runs elsewhere.

## Devfolio URL

Set the registration URL in `src/components/Hero/Hero.jsx`:

```js
const DEVFOLIO_URL = 'https://your-hackathon.devfolio.co'
```

## Design Guidelines

See [DESIGN_GUIDELINES.md](./DESIGN_GUIDELINES.md) for full UI/UX specs.
