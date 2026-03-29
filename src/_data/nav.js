/**
 * Global navigation items.
 * Used by src/_includes/partials/nav.njk for both desktop and mobile menus.
 * `slug` matches the `pageSlug` front matter key set on each page template.
 */
module.exports = [
  { label: "World",    href: "/world.html",    slug: "world"    },
  { label: "Lore",     href: "/lore.html",     slug: "lore"     },
  { label: "Classes",  href: "/classes.html",  slug: "classes"  },
  { label: "News",     href: "/news.html",     slug: "news"     },
  { label: "Download", href: "/download.html", slug: "download" },
  { label: "Shop",     href: "/shop.html",     slug: "shop"     },
  { label: "Account",  href: "/account.html",  slug: "account"  },
];
