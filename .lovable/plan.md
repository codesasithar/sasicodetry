# Speed up the portfolio

- Keep the hero visible immediately while delaying the desktop-only 3D drone until the browser is idle.
- Shorten the animated startup overlay and defer below-the-fold sections until they are closer to view.
- Reduce the showreel thumbnail size and streamline font loading without removing fonts the site uses.
- Verify desktop and mobile loading behavior and check the latest build status.

## Technical details

- Use `requestIdleCallback` with a timeout and a `setTimeout` fallback for the drone.
- Convert the static showreel poster to WebP and update its reference.
- Preserve existing content and visual styling; do not remove unrelated assets or findings.
