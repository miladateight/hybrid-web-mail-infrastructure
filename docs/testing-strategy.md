# Testing Strategy

## Safe Local Checks

- Validate locale key consistency.
- Check JavaScript syntax.
- Run privacy scanners.
- Check local links.
- Manually preview the static site through a local HTTP server.

## Browser Checks

Use common widths such as 360, 390, 768, 1024 and 1440 pixels when practical.

## Required Behaviors

- English is the default language.
- Manual language selection persists in localStorage.
- Invalid stored language falls back to English.
- Persian and Arabic use RTL.
- English and German use LTR.
- Mobile navigation is keyboard accessible.
- Reduced motion preference is respected.
