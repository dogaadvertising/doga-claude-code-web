// GENERADO por scripts/build-tokens.mjs desde tokens/tokens.json. No editar a mano.
// Uso: module.exports = { presets: [require('./tokens/tailwind.preset.js')], content: [...] }
// Requiere cargar tokens/tokens.css en la app (define las CSS custom properties).
/** @type {import('tailwindcss').Config} */
module.exports = {
  "theme": {
    "colors": {
      "transparent": "transparent",
      "current": "currentColor",
      "doga": {
        "blue": "var(--doga-blue)",
        "yellow": "var(--doga-yellow)",
        "grey": "var(--doga-grey)",
        "black": "var(--doga-black)",
        "white": "var(--doga-white)",
        "slate": "var(--doga-slate)",
        "gray": "var(--doga-gray)",
        "blue-700": "var(--doga-blue-700)",
        "blue-500": "var(--doga-blue-500)",
        "yellow-600": "var(--doga-yellow-600)",
        "grey-300": "var(--doga-grey-300)",
        "olive": "var(--doga-olive)"
      }
    },
    "screens": {
      "sm": "480px",
      "md": "768px",
      "lg": "1024px",
      "xl": "1280px"
    },
    "spacing": {
      "0": "0px",
      "1": "var(--space-1)",
      "2": "var(--space-2)",
      "3": "var(--space-3)",
      "4": "var(--space-4)",
      "5": "var(--space-5)",
      "6": "var(--space-6)",
      "7": "var(--space-7)",
      "8": "var(--space-8)",
      "9": "var(--space-9)",
      "px": "1px"
    },
    "borderRadius": {
      "none": "0px",
      "sm": "var(--radius-sm)",
      "md": "var(--radius-md)",
      "pill": "var(--radius-pill)",
      "btn": "var(--radius-btn)"
    },
    "borderWidth": {
      "0": "0px",
      "DEFAULT": "var(--border-width-default)",
      "$type": "var(--border-width-$type)",
      "default": "var(--border-width-default)",
      "accent": "var(--border-width-accent)",
      "motif": "var(--border-width-motif)",
      "rule": "var(--border-width-rule)"
    },
    "boxShadow": {
      "none": "none",
      "overlay": "var(--shadow-overlay)"
    },
    "fontFamily": {
      "display": "var(--font-display)",
      "body": "var(--font-body)",
      "expressive": "var(--font-expressive)",
      "email": "var(--font-email)"
    },
    "fontWeight": {
      "regular": "var(--weight-regular)",
      "medium": "var(--weight-medium)",
      "semibold": "var(--weight-semibold)",
      "bold": "var(--weight-bold)",
      "black": "var(--weight-black)"
    },
    "fontSize": {
      "hero": [
        "var(--type-hero)",
        {
          "lineHeight": "var(--type-hero-leading)",
          "letterSpacing": "var(--type-hero-tracking)",
          "fontWeight": "var(--type-hero-weight)"
        }
      ],
      "h1": [
        "var(--type-h1)",
        {
          "lineHeight": "var(--type-h1-leading)",
          "letterSpacing": "var(--type-h1-tracking)",
          "fontWeight": "var(--type-h1-weight)"
        }
      ],
      "h2": [
        "var(--type-h2)",
        {
          "lineHeight": "var(--type-h2-leading)",
          "letterSpacing": "var(--type-h2-tracking)",
          "fontWeight": "var(--type-h2-weight)"
        }
      ],
      "body-lg": [
        "var(--type-body-lg)",
        {
          "lineHeight": "var(--type-body-lg-leading)",
          "letterSpacing": "var(--type-body-lg-tracking)",
          "fontWeight": "var(--type-body-lg-weight)"
        }
      ],
      "body": [
        "var(--type-body)",
        {
          "lineHeight": "var(--type-body-leading)",
          "letterSpacing": "var(--type-body-tracking)",
          "fontWeight": "var(--type-body-weight)"
        }
      ],
      "label": [
        "var(--type-label)",
        {
          "lineHeight": "var(--type-label-leading)",
          "letterSpacing": "var(--type-label-tracking)",
          "fontWeight": "var(--type-label-weight)"
        }
      ],
      "eyebrow": [
        "var(--type-eyebrow)",
        {
          "lineHeight": "var(--type-eyebrow-leading)",
          "letterSpacing": "var(--type-eyebrow-tracking)",
          "fontWeight": "var(--type-eyebrow-weight)"
        }
      ]
    },
    "extend": {
      "backgroundColor": {
        "primary": "var(--bg-primary)",
        "secondary": "var(--bg-secondary)",
        "accent": "var(--bg-accent)",
        "cta": "var(--cta-bg)",
        "cta-hover": "var(--cta-bg-hover)"
      },
      "textColor": {
        "primary": "var(--text-primary)",
        "secondary": "var(--text-secondary)",
        "muted": "var(--text-muted)",
        "headline": "var(--text-headline)",
        "on-accent": "var(--text-on-accent)",
        "error": "var(--text-error)",
        "cta": "var(--cta-text)"
      },
      "borderColor": {
        "DEFAULT": "var(--border-default)",
        "default": "var(--border-default)",
        "accent": "var(--border-accent)",
        "error": "var(--border-error)"
      },
      "outlineColor": {
        "focus": "var(--focus-ring)"
      },
      "outlineWidth": {
        "focus": "var(--focus-width)"
      },
      "outlineOffset": {
        "focus": "var(--focus-offset)"
      },
      "maxWidth": {
        "container": "var(--layout-container)",
        "measure": "var(--layout-measure)",
        "email": "var(--size-email)"
      },
      "height": {
        "touch-min": "var(--size-touch-min)",
        "btn-lg": "var(--size-btn-lg)",
        "sticky-bar": "var(--size-sticky-bar)",
        "email": "var(--size-email)",
        "ad-width": "var(--size-ad-width)",
        "ad-height-square": "var(--size-ad-height-square)",
        "ad-height-story": "var(--size-ad-height-story)",
        "ad-safe-top": "var(--size-ad-safe-top)",
        "ad-safe-bottom": "var(--size-ad-safe-bottom)"
      },
      "minHeight": {
        "touch-min": "var(--size-touch-min)",
        "btn-lg": "var(--size-btn-lg)",
        "sticky-bar": "var(--size-sticky-bar)",
        "email": "var(--size-email)",
        "ad-width": "var(--size-ad-width)",
        "ad-height-square": "var(--size-ad-height-square)",
        "ad-height-story": "var(--size-ad-height-story)",
        "ad-safe-top": "var(--size-ad-safe-top)",
        "ad-safe-bottom": "var(--size-ad-safe-bottom)"
      },
      "width": {
        "touch-min": "var(--size-touch-min)",
        "btn-lg": "var(--size-btn-lg)",
        "sticky-bar": "var(--size-sticky-bar)",
        "email": "var(--size-email)",
        "ad-width": "var(--size-ad-width)",
        "ad-height-square": "var(--size-ad-height-square)",
        "ad-height-story": "var(--size-ad-height-story)",
        "ad-safe-top": "var(--size-ad-safe-top)",
        "ad-safe-bottom": "var(--size-ad-safe-bottom)"
      },
      "opacity": {
        "hero-overlay": "var(--opacity-hero-overlay)"
      }
    }
  }
};
