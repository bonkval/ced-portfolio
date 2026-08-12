# Cedrick Vales — Cybersecurity Portfolio

A static, mobile-first portfolio for Cedrick Rafael Vales. The site is intentionally local-first, uses no analytics or backend, and is ready for Vercel.

## Local preview

```powershell
npm install
npm run dev
```

Open `http://localhost:3000`.

## Validate

```powershell
npm run build
```

The validation checks required pages, internal links, referenced local assets, external-link safety, missing alt text, and forbidden inline scripts.

## Updating content

- Portraits live in `public/assets/profile/`.
- Hobby placeholders live in `public/assets/hobbies/`.
- Add a certification image to `public/assets/certifications/`, then add its title, issuer, image path, and issued or expiry date to `public/content/certifications.js`.
- Add the CV at `public/Cedrick-Vales-CV.pdf`.

Missing profile and CV files have visible, accessible fallback states.

## Vercel deployment

Import the repository into Vercel as a static project. No build output directory is needed. Set the build command to `npm run build` if Vercel does not detect it automatically.

`vercel.json` provides a strict Content Security Policy, HTTPS enforcement, anti-framing controls, a restricted Permissions Policy, and long-lived caching for local media.

## Content safeguards

- Project descriptions are based on public repository documentation.
- No runtime GitHub API, secrets, analytics, or paid services are used.
- Repository language percentages describe code composition, not proficiency.
- Certificate dates and verification details remain placeholders until confirmed.
- Screenshots use project documentation assets and synthetic demonstration data where stated.

## Accessibility

- Semantic landmarks and heading structure
- Skip links and visible focus states
- Keyboard-accessible navigation and theme control
- Reduced-motion behavior
- Touch-friendly project and collage interactions
- Descriptive image alternatives
- Light and dark palettes designed for legible contrast
