---
title: "Patch 2.4.1 — Ashes of the Fallen Keep"
date: 2026-03-12
category: Patch Notes
description: "Targeted class tuning, PvP adjustments, critical encounter fixes, and a significant performance pass across all Ashen Throne servers."
excerpt: "Shadowblade Execute tuned, Oathsinger Aegis extended, Forge Colossus exploit fixed. Full class breakdown for all 8 paths plus 43 bug fixes."
canonical: "https://www.ashenthrone.com/news/patch-2-4-1.html"
ogTitle: "Patch 2.4.1 — Ashes of the Fallen Keep | Ashen Throne"
ogDescription: "Shadowblade tuned, Oathsinger buffed, Forge Colossus exploit resolved. 43 bug fixes and a GPU memory optimization pass."
ogImage: "https://www.ashenthrone.com/assets/og-cover.jpg"
heroImage: true
changefreq: weekly
priority: "0.6"
ldJsonRaw: |
  {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    "headline": "Patch 2.4.1 — Ashes of the Fallen Keep",
    "datePublished": "2026-03-12",
    "dateModified":  "2026-03-12",
    "author": { "@type": "Organization", "name": "Ironveil Studios" },
    "publisher": { "@type": "Organization", "name": "Ironveil Studios", "url": "https://www.ashenthrone.com/" },
    "description": "Patch 2.4.1 for Ashen Throne — class tuning, PvP adjustments, encounter fixes, and performance improvements.",
    "url": "https://www.ashenthrone.com/news/patch-2-4-1.html",
    "image": "https://www.ashenthrone.com/assets/og-cover.jpg",
    "articleSection": "Patch Notes"
  }
---

<div class="callout info">
  <div class="callout-title">Deployment Status</div>
  <p>Patch 2.4.1 is live on all servers as of <strong>March 12, 2026 at 10:00 UTC</strong>. Server downtime lasted approximately 90 minutes. No character data was affected.</p>
</div>

## Overview

Patch 2.4.1 — designated internally as "Ashes of the Fallen Keep" — is a targeted maintenance release following the large Crimson Siege Chapter III expansion. Our primary goals with this patch were threefold: address the Shadowblade burst window that allowed players to delete targets before any meaningful counterplay was possible; deliver long-requested buffs to the Oathsinger, whose support role had fallen behind the current encounter tuning; and fix a critical exploit in the Pyremark Forge Colossus encounter that had been breaking the intended experience for thousands of players per week.

We have also shipped a significant GPU memory optimization that benefits all players on medium preset, and resolved the server crash that affected large-scale siege encounters with more than 500 simultaneous participants.

---

## Class Balance Changes

All balance changes are the result of combined analysis from internal playtesting data, community feedback from the war council forums, and anonymous telemetry from the past 28 days of live play.

<div class="patch-class-block">
  <div class="patch-class-name">Shadowblade <span class="patch-class-role">Assassin</span></div>
  <div class="patch-change"><span class="patch-badge nerf">Nerf</span><span><strong>Execute</strong> — Base damage reduced from 220% to 202% weapon power. Execute remains the highest single-target finisher in the game; this brings it in line with counterplay expectations.</span></div>
  <div class="patch-change"><span class="patch-badge buff">Buff</span><span><strong>Shadow Step</strong> — Cooldown reduced from 14s to 12s. This restores some mobility lost in the 2.3 pass without reverting the intent of that change.</span></div>
  <div class="patch-change"><span class="patch-badge buff">Buff</span><span><strong>Bleed</strong> — Maximum bleed stack cap increased from 5 to 6. Each additional stack now applies diminishing duration rather than full duration, rewarding sustained pressure.</span></div>
  <div class="patch-change"><span class="patch-badge fix">Fix</span><span><strong>Death Shroud</strong> — Fixed a visual desync that caused opponents to see the Shadowblade's position incorrectly during stealth entry.</span></div>
</div>

<div class="patch-class-block">
  <div class="patch-class-name">Oathsinger <span class="patch-class-role">Support</span></div>
  <div class="patch-change"><span class="patch-badge buff">Buff</span><span><strong>Aegis</strong> — Duration increased from 6s to 8s. The barrier absorb value is unchanged.</span></div>
  <div class="patch-change"><span class="patch-badge buff">Buff</span><span><strong>Resurrect</strong> — Mana cost reduced by 30%. Cast time unchanged at 2.5s. This makes battlefield resurrection viable in sustained encounters rather than a desperation ability.</span></div>
  <div class="patch-change"><span class="patch-badge buff">Buff</span><span><strong>Hymn of the Fallen</strong> — Effective radius increased from 20m to 25m. This corrects an unintentional reduction that occurred during the 2.2 movement pass.</span></div>
  <div class="patch-change"><span class="patch-badge fix">Fix</span><span><strong>Aegis</strong> — Fixed an issue where Aegis would silently fail to apply when cast on targets affected by Voidcaller's Entropy debuff.</span></div>
</div>

<div class="patch-class-block">
  <div class="patch-class-name">Arcanist <span class="patch-class-role">Mage</span></div>
  <div class="patch-change"><span class="patch-badge buff">Buff</span><span><strong>Frost Nova</strong> — Base radius increased from 8m to 10m.</span></div>
  <div class="patch-change"><span class="patch-badge nerf">Nerf</span><span><strong>Firestorm</strong> — Base damage per tick reduced by 5%. Duration extended by 1 second. Total damage output is nearly identical; the intent is to reduce spike windows.</span></div>
  <div class="patch-change"><span class="patch-badge buff">Buff</span><span><strong>Chain Lightning</strong> — Maximum bounce count increased from 4 to 5.</span></div>
</div>

<div class="patch-class-block">
  <div class="patch-class-name">Warden <span class="patch-class-role">Tank</span></div>
  <div class="patch-change"><span class="patch-badge buff">Buff</span><span><strong>Iron Will</strong> (Passive) — Passive physical resistance increased by 3 percentage points at all gear tiers.</span></div>
  <div class="patch-change"><span class="patch-badge nerf">Nerf</span><span><strong>Shield Wall</strong> — Reflected melee damage reduced from 25% to 15%.</span></div>
</div>

<div class="patch-class-block">
  <div class="patch-class-name">Dreadknight <span class="patch-class-role">Berserker</span></div>
  <div class="patch-change"><span class="patch-badge buff">Buff</span><span><strong>Blood Rage</strong> — Ramp-up time reduced from 20s to 16s.</span></div>
  <div class="patch-change"><span class="patch-badge buff">Buff</span><span><strong>Undying</strong> — Activation threshold increased from 20% to 25% max HP.</span></div>
</div>

<div class="patch-class-block">
  <div class="patch-class-name">Ironclad <span class="patch-class-role">Vanguard</span></div>
  <div class="patch-change"><span class="patch-badge buff">Buff</span><span><strong>Juggernaut</strong> — Movement speed penalty during charge reduced from 35% to 25%.</span></div>
  <div class="patch-change"><span class="patch-badge buff">Buff</span><span><strong>War Cry</strong> — Area of effect radius increased from 6m to 8m.</span></div>
</div>

<div class="patch-class-block">
  <div class="patch-class-name">Voidcaller <span class="patch-class-role">Summoner</span></div>
  <div class="patch-change"><span class="patch-badge nerf">Nerf</span><span><strong>Rift</strong> — Cooldown increased from 24s to 28s. Rift portals were enabling strategies that bypassed intended geographic chokepoints.</span></div>
  <div class="patch-change"><span class="patch-badge fix">Fix</span><span><strong>Demonbind</strong> — Summoned demons now correctly display health bars to allied players.</span></div>
</div>

<div class="patch-class-block">
  <div class="patch-class-name">Ashwalker <span class="patch-class-role">Ranger</span></div>
  <div class="patch-change"><span class="patch-badge nerf">Nerf</span><span><strong>Hunter's Eye</strong> — Detection radius reduced from 40m to 35m.</span></div>
  <div class="patch-change"><span class="patch-badge fix">Fix</span><span><strong>Marksman Piercing</strong> — Arrow penetration no longer applies through full siege wall thickness.</span></div>
</div>

---

## PvP & Territory Control

- **Siege windows extended** from 30 minutes to 45 minutes per zone.
- **Flag capture time in Ashfeld** adjusted from 15s to 20s per player present.
- **Guild territory HP scaling** normalized for guilds with fewer than 40 active members.
- **Respawn suppression timer** in active siege zones reduced from 12s to 9s.
- **Faction balance bonus** — Servers with a population imbalance exceeding 40:60 will apply a minor damage and XP bonus to the minority factions until balance is restored.

<div class="callout">
  <div class="callout-title">Designer Note — Territory Tuning</div>
  <p>We want siege warfare to reward preparation, coordination, and tactical execution — not raw numbers or burst windows. The changes in this patch are the first step in a broader rebalancing pass that will continue in 2.5 with significant guild war system improvements.</p>
</div>

---

## World & Encounter Fixes

### Pyremark — Forge Colossus

A well-documented grapple technique allowed players to pull the Forge Colossus off its patrol path, bypassing the environmental hazards that define Phase 2. The encounter boundary has been reinforced and the patrol path now correctly constrains to its intended zone. The Phase 2 ability rotation timer was also reset to its original tuning — a previous hotfix had accidentally accelerated it by 8%.

### Veilhaven — Merchant Quarter Pathfinding

NPC merchant pathing in the Merchant Quarter district has been completely rerouted. The original pathing grid was generating navigation deadlocks during peak server population, causing stalls that visually appeared as NPC freezes.

### Northern Moor Dungeon — Dreadmoors

Floating terrain geometry at the dungeon entrance has been corrected. Several edge cases allowed players to clip through the floor geometry near the second gate.

---

## Performance & Stability

- **GPU memory footprint reduced by approximately 12%** on the medium graphics preset.
- **Server stability fix** for large-scale siege encounters — the crash condition at 500+ simultaneous participants has been identified and patched.
- **Ashfeld map loading time reduced by approximately 18%** for players on HDD storage.
- **Shadow rendering pipeline** updated to reduce GPU stutter during rapid scene transitions in the Pyremark volcanic zones.
- **Network interpolation** improved for players with connections above 150ms.

---

## UI & Quality of Life

- New **compact damage numbers** option added to Display Settings.
- Class ability icons updated across all 8 classes with improved visual clarity at 1080p and 1440p.
- Guild roster now supports sorting by **last active date**, **guild contribution rank**, and **class type**.
- The in-game map now correctly displays guild-controlled territories with updated border colours.
- Tooltip delay reduced from 800ms to 600ms globally.

---

## Bug Fixes

<ul class="bugfix-list">
  <li>Shadowblade Death Shroud position desync on stealth entry</li>
  <li>Oathsinger Aegis fail-state vs Entropy debuff</li>
  <li>Arcanist Frost Nova applying double freeze in certain lag conditions</li>
  <li>Voidcaller demon health bars not visible to allies</li>
  <li>Ashwalker piercing applying through siege walls</li>
  <li>Forge Colossus Phase 2 timer accelerated by 8%</li>
  <li>NPC merchant pathfinding deadlocks in Veilhaven</li>
  <li>Floor geometry clip at Northern Moor dungeon gate 2</li>
  <li>Guild territory map borders not updating post-siege</li>
  <li>Tooltip appearing behind full-screen ability UI</li>
  <li>Server crash on 500+ participant siege encounters</li>
  <li>Camera clip through Pyremark volcanic terrain near boss arena</li>
  <li>Auction House search filter clearing on pagination</li>
  <li>Zone transition screen sometimes looping on ultra-wide monitors</li>
  <li>Wrong faction colour applied to zone indicators on minimap</li>
  <li>Guild name missing from kill feed under certain conditions</li>
  <li>Mount auto-dismiss failing in narrow dungeon corridors</li>
  <li>PvP bracket rating not updating until re-login after match</li>
  <li>Missing ambient audio in Dreadmoors northern region</li>
  <li>Chat colour settings resetting on launcher restart</li>
  <li>43 total bug fixes across all systems</li>
</ul>
