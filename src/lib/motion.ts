/** Strong ease-out for UI entrances. Shared so every reveal animation on the site uses the same curve. */
export const EASE_OUT = [0.16, 1, 0.3, 1] as const;

/** Shared spring for hover lift (cards, buttons) — physical settle instead of a timed ease. */
export const SPRING_HOVER = { type: "spring", stiffness: 400, damping: 28 } as const;

/** Shared spring for press/tap feedback — snappier and more damped than hover. */
export const SPRING_TAP = { type: "spring", stiffness: 500, damping: 30 } as const;
