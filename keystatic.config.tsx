/**
 * Keystatic schema — the single source of truth for all editable content.
 *
 * Storage strategy
 * ----------------
 * The mode is decided at build time by env, with a safe local-first
 * default so a clean clone always builds and runs:
 *
 *   • Dev (NODE_ENV=development)               → `local` (filesystem)
 *   • Prod without KEYSTATIC_STORAGE=github    → `local` (read-only;
 *     admin UI works for browsing but saves no-op until cloud is set up)
 *   • Prod with KEYSTATIC_STORAGE=github AND
 *     NEXT_PUBLIC_KEYSTATIC_PROJECT set        → `github` + Keystatic
 *     Cloud OAuth (each save = commit, Vercel auto-deploys)
 *
 * Going live with the editor:
 *   1. Sign up at https://keystatic.cloud and create a project linked
 *      to this repo. You'll get a slug like "team-name/project-name".
 *   2. In Vercel, set:
 *        NEXT_PUBLIC_KEYSTATIC_PROJECT=team-name/project-name
 *        KEYSTATIC_STORAGE=github
 *   3. Redeploy. The studio owner can now sign in at
 *      majormovementstudio.com/keystatic via GitHub.
 */

import { collection, config, fields, singleton } from "@keystatic/core";

const REPO = { owner: "Draidel", name: "majormovementstudio.com" } as const;

const cloudProject = process.env.NEXT_PUBLIC_KEYSTATIC_PROJECT;
const wantsGithubStorage =
  process.env.NODE_ENV !== "development" && process.env.KEYSTATIC_STORAGE === "github";

const storage = wantsGithubStorage
  ? ({ kind: "github", repo: REPO } as const)
  : ({ kind: "local" } as const);

// --- Reusable field factories ------------------------------------------
// Defining these once keeps validation, labels, and descriptions in sync
// across collections (DRY) and means a future tweak (e.g. enforcing
// non-empty prices) only needs to be made in one place.

const orderField = fields.integer({
  label: "Order",
  description: "Lower numbers appear first on the page.",
  defaultValue: 1,
  validation: { min: 1 },
});

const priceField = fields.text({
  label: "Price",
  description:
    'Free-form display value (e.g. "$195", "From $99", "Free"). Shown as-is on the page.',
  validation: { length: { min: 1 } },
});

const longText = (label: string, description?: string) =>
  fields.text({ label, description, multiline: true, validation: { length: { min: 1 } } });

// --- Config ------------------------------------------------------------

export default config({
  storage,
  ...(cloudProject ? { cloud: { project: cloudProject } } : {}),

  ui: {
    brand: { name: "Major Movement Studio" },
    navigation: {
      "Page content": ["hero", "studio", "unlimitedCta"],
      Classes: ["classes"],
      Pricing: ["founderPlans", "classPacks", "tryItPacks"],
      FAQ: ["faqs"],
    },
  },

  // ---------------------------------------------------------------------
  // Singletons — exactly one of each (top-of-page hero, studio info, CTA)
  // ---------------------------------------------------------------------
  singletons: {
    hero: singleton({
      label: "Hero",
      path: "content/hero",
      format: { data: "yaml" },
      schema: {
        bannerLead: fields.text({
          label: "Banner — left text",
          defaultValue: "Class Schedule",
        }),
        bannerBold: fields.text({
          label: "Banner — bold text",
          defaultValue: "Coming Soon",
        }),
        pitch: longText(
          "Mission statement",
          "The big paragraph below the brand mark. One or two sentences works best.",
        ),
        ctaLabel: fields.text({
          label: "CTA label",
          description: 'Text for the link that scrolls to the pricing section.',
          defaultValue: "Get to know our plans",
        }),
      },
    }),

    studio: singleton({
      label: "Studio info",
      path: "content/studio",
      format: { data: "yaml" },
      schema: {
        name: fields.text({ label: "Studio name", defaultValue: "Major Movement Studio" }),
        phone: fields.text({
          label: "Phone — digits only",
          description: 'Used for the "tel:" link. Digits only, no spaces or punctuation.',
        }),
        phoneDisplay: fields.text({
          label: "Phone — display format",
          description: "How the phone number reads on the page.",
        }),
        email: fields.text({ label: "Email" }),
        address: fields.text({ label: "Street address" }),
        hours: fields.array(fields.text({ label: "Line" }), {
          label: "Hours",
          description: "One line per row (e.g. 'Monday-Friday 8am-7pm').",
          itemLabel: (props) => props.value || "New entry",
        }),
        social: fields.object(
          {
            facebook: fields.url({ label: "Facebook URL" }),
            instagram: fields.url({ label: "Instagram URL" }),
          },
          { label: "Social links" },
        ),
      },
    }),

    unlimitedCta: singleton({
      label: "Unlimited Membership CTA",
      path: "content/unlimited-cta",
      format: { data: "yaml" },
      schema: {
        headlineLead: fields.text({
          label: "Headline — first line",
          defaultValue: "Join Our",
        }),
        headlineScript: fields.text({
          label: "Headline — script word",
          description: "Renders in the cursive display font.",
          defaultValue: "Unlimited",
        }),
        headlineTrail: fields.text({
          label: "Headline — trailing line",
          defaultValue: "Monthly Pilates Membership",
        }),
        subhead: longText("Subhead"),
        buttonBold: fields.text({
          label: "Button — bold text",
          defaultValue: "Sign Up Now",
        }),
        buttonLight: fields.text({
          label: "Button — light text",
          defaultValue: "$195/mo unlimited",
        }),
        buttonHref: fields.text({
          label: "Button — link",
          description: 'A "mailto:", "tel:", or full URL.',
        }),
      },
    }),
  },

  // ---------------------------------------------------------------------
  // Collections — ordered lists. The page sorts by the `order` field,
  // so editors reorder by adjusting numbers (1, 2, 3 …).
  // ---------------------------------------------------------------------
  collections: {
    classes: collection({
      label: "Classes",
      slugField: "name",
      path: "content/classes/*",
      format: { data: "yaml" },
      columns: ["name", "order"],
      schema: {
        name: fields.slug({ name: { label: "Class name" } }),
        order: orderField,
        description: longText("Description"),
      },
    }),

    founderPlans: collection({
      label: "Founder pricing plans",
      slugField: "name",
      path: "content/founder-plans/*",
      format: { data: "yaml" },
      columns: ["name", "price", "order"],
      schema: {
        name: fields.slug({ name: { label: "Plan name" } }),
        order: orderField,
        price: priceField,
        note: fields.text({
          label: "Subnote",
          description: 'Small text under the plan (e.g. "Registration fee not included*").',
        }),
      },
    }),

    classPacks: collection({
      label: "Class packs",
      slugField: "name",
      path: "content/class-packs/*",
      format: { data: "yaml" },
      columns: ["name", "price", "order"],
      schema: {
        name: fields.slug({ name: { label: "Pack name" } }),
        order: orderField,
        price: priceField,
      },
    }),

    tryItPacks: collection({
      label: "Trial / drop-in",
      slugField: "name",
      path: "content/try-it-packs/*",
      format: { data: "yaml" },
      columns: ["name", "price", "order"],
      schema: {
        name: fields.slug({ name: { label: "Item name" } }),
        order: orderField,
        price: priceField,
      },
    }),

    faqs: collection({
      label: "FAQ",
      slugField: "question",
      path: "content/faqs/*",
      format: { data: "yaml" },
      columns: ["question", "order"],
      schema: {
        question: fields.slug({ name: { label: "Question" } }),
        order: orderField,
        answer: longText("Answer"),
      },
    }),
  },
});
