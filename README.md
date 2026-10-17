# Wayve

Wayve is a mobile-first, responsive progressive web app for discovering places
to eat, meet, and spend time in Abuja. It helps people choose a spot by area,
category, budget, and vibe.

## Progress so far

The project has moved from a basic app shell to a usable discovery prototype:

- A curated Abuja places catalogue powers discovery, search, filters, category
  browsing, and place details.
- Discover supports area selection, quick-vibe filtering, detailed filters,
  and Surprise Me.
- Category-specific image illustrations provide a graceful fallback when a
  venue photo is unavailable.
- Place details show available location and venue information and link out to
  Google Maps search.
- People can save places and keep their selected area and optional display name
  in the current browser.
- Onboarding, profile, saved places, empty states, and responsive navigation
  support the main discovery journey.
- The interface has been refined around a warm ivory, olive, and muted ochre
  and clay visual direction, with responsive layouts for phone, tablet, and
  desktop widths.
- The app includes a PWA manifest, install icon, service-worker registration,
  and an offline fallback.
- Community and other unfinished destinations are kept out of the primary
  navigation while their code remains in the project.

This is a meaningful product and design milestone, but it is not yet a
production-ready service. The catalogue is bundled with the app, and several
flows still need a backend before information or submissions can be shared
between people or devices.

## MVP work remaining

### Make the information dependable

- Verify the venue catalogue against current, reliable sources: names,
  addresses, neighbourhoods, opening hours, price ranges, and active status.
- Review entries marked unverified and clearly resolve incomplete or unknown
  details.
- Confirm that location links lead to the correct venue. The current Maps action
  performs a search; it is not guaranteed turn-by-turn navigation to a verified
  pin.
- Agree on a sustainable process for venue updates and corrections.

### Complete the real-user journey

- Decide whether MVP users need accounts. Login and signup screens are not
  currently connected to an authentication service.
- Saved places, area, and display name are stored in browser storage. They do
  not sync across browsers or devices.
- Reviews currently show a local thank-you flow; they are not submitted to a
  service or visible to other users.
- Creating lists and group plans is not persisted or shareable yet. Either
  complete these flows with storage/backend support or keep them out of the MVP
  entry points.
- Provide clear privacy, contact, and feedback information before inviting
  public users.

### Test and release

- Test the full first-visit and returning-visitor journeys on real phones,
  tablets, and desktop browsers.
- Verify search, every advertised filter, area changes, place details, save and
  refresh, Maps links, empty states, and broken-image behavior.
- Test PWA installation, refresh persistence, and offline behavior on supported
  browsers and devices.
- Confirm production hosting, HTTPS, domain, monitoring, backups, and a way to
  respond to user reports.
- Run a small pilot with Abuja users, collect feedback, and fix issues before a
  wider release.

## Later idea, not part of this MVP

A separate dashboard to track usage and product health could be useful after
the user-facing MVP is ready. It is only an idea for now; no dashboard or
analytics implementation is included in this work.

## Run locally

Requirements: Node.js and npm.

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Validation

```bash
npm run lint
npx tsc --noEmit
npm run build
```
