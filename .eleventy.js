module.exports = function (eleventyConfig) {

  /* ── Passthrough copies ─────────────────────────────────────── */
  // assets/ lives at project root — copy verbatim to _site/assets/
  eleventyConfig.addPassthroughCopy({ "assets": "assets" });
  // Root-level static files (object key = source from CWD, value = dest in _site/)
  eleventyConfig.addPassthroughCopy({ "robots.txt":          "robots.txt"          });
  eleventyConfig.addPassthroughCopy({ "favicon.ico":         "favicon.ico"         });
  eleventyConfig.addPassthroughCopy({ "favicon.svg":         "favicon.svg"         });
  eleventyConfig.addPassthroughCopy({ "apple-touch-icon.png":"apple-touch-icon.png"});
  eleventyConfig.addPassthroughCopy({ "site.webmanifest":    "site.webmanifest"    });

  /* ── Watch targets (rebuild on CSS/JS changes) ──────────────── */
  eleventyConfig.addWatchTarget("assets/css/style.css");
  eleventyConfig.addWatchTarget("assets/js/main.js");
  eleventyConfig.addWatchTarget("assets/js/particles.js");

  /* ── Collections ────────────────────────────────────────────── */
  eleventyConfig.addCollection("news", function (collectionApi) {
    return collectionApi
      .getFilteredByGlob("src/news/*.md")
      .sort((a, b) => b.date - a.date);
  });

  /* ── Filters ────────────────────────────────────────────────── */

  // Human-readable date  e.g. "Mar 15, 2026"
  eleventyConfig.addFilter("dateDisplay", function (date) {
    const d = date instanceof Date ? date : new Date(date);
    return d.toLocaleDateString("en-US", {
      year:  "numeric",
      month: "short",
      day:   "numeric",
    });
  });

  // ISO date for <time datetime=""> and sitemap <lastmod>
  eleventyConfig.addFilter("dateISO", function (date) {
    const d = date instanceof Date ? date : new Date(date);
    return d.toISOString().split("T")[0];
  });

  // Truncate arrays  — usage: collection | limit(3)
  eleventyConfig.addFilter("limit", function (arr, n) {
    return (arr || []).slice(0, n);
  });

  // Exclude current page from related posts
  eleventyConfig.addFilter("excludeUrl", function (arr, currentUrl) {
    return (arr || []).filter((item) => item.url !== currentUrl);
  });

  /* ── Shortcodes ─────────────────────────────────────────────── */

  // {% year %} → current year (for footer copyright)
  eleventyConfig.addShortcode("year", () => String(new Date().getFullYear()));

  /* ── Eleventy configuration ─────────────────────────────────── */
  return {
    dir: {
      input:    "src",
      output:   "_site",
      includes: "_includes",
      layouts:  "_includes/layouts",
      data:     "_data",
    },
    templateFormats:        ["njk", "md", "html"],
    markdownTemplateEngine: "njk",
    htmlTemplateEngine:     "njk",
    dataTemplateEngine:     "njk",
  };
};
