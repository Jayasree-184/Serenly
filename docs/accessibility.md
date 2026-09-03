# Serenly Accessibility & Inclusivity (WCAG 2.1 AA)

## Accessibility Principles

### 1. Typography & Legibility
* Primary typefaces: `Plus Jakarta Sans` for headers and `Manrope` for body text.
* Fallback to `Noto Sans Tamil` for clean Tamil script rendering without ligature collision.
* Built-in user font scaler allowing 85% to 130% zoom dynamically using `--app-font-scale`.

### 2. High Contrast Vision Mode
* User-toggleable high-contrast mode removing low-contrast background blends, rendering pure contrast borders and black/white text hierarchy.

### 3. Reduced Motion Support
* All animations respect `prefers-reduced-motion`.
* The Box Breathing exercise automatically switches from the scaling orb to a calm, linear progress indicator for vestibular-sensitive users.

### 4. Non-Judgmental Sensory Ergonomics
* Color is never the sole communicator of state.
* Mood choices are accompanied by distinct organic icons, semantic labels, and descriptions.
* Touch targets exceed 44x44px across all interactive controls.
