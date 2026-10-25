# Reading Tracker: a hobby project, built like a product

**Summary:** Two small Streamlit apps for my own reading: a private tracker with one Start and one Stop button, and a public dashboard of the habit, live on labelled demo data. I started with a written spec, built the first release with Claude Code in a day, and have shipped 3 releases, each passing CI [reading-tracker].

**Headline metric:** 1 day from the spec to v1.0.0, in 29 commits co-authored with Claude Code [reading-tracker]

**Tags:** hobby · data product · privacy · data validation · testing

**Approved:** 2026-10-25

---

## Two apps, two audiences

Reading Tracker is a hobby project for my own reading. I read in English and Vietnamese, mostly paper books, and wanted three answers: how much I really read, at what pace, and when I will finish the current book. The tracker is for me: a private Streamlit app on localhost only. One big Start and one big Stop button log a session, with the page where I stopped already filled in [reading-tracker].

The dashboard is for visitors, with a finish-date range for the current book. It is live, but on a seeded demo history of 15 books and 180 sessions over 182 days, labelled "Demo data", because my real history is not imported yet. It is a hobby, but it covers the whole path of a data product, from a written spec to a live deployment [reading-tracker].

## Design decisions

- **Friction decides the data.** The spec's first goal is logging a session in under 10 seconds, because friction kills the habit and the data. So two big buttons come first, and everything else hides in expanders. It is a target; I have not timed it [reading-tracker].
- **Private by construction.** The export drops notes and end times, floors start times to the hour and keeps each duration in whole seconds. Rounding both ends would turn a 20:10 to 20:40 session into 20:00 to 20:00: zero minutes. This way pace survives, and the clock shows only the hour [reading-tracker].
- **Raw events, checked at the door.** SQLite stores only books and sessions, and rules refuse bad rows before saving. Everything else is derived in pandas, so a fixed rule changes every past number consistently [reading-tracker].
- **A baseline before a model.** The finish date is two plain ratios over the last 28 days, with nothing learned. It has no accuracy figure yet: measuring one needs my real history and a backtest [reading-tracker].
- **One brand, defined once.** The palette and fonts live in `brand.py`, mirrored in the Streamlit theme, and a test forbids hex codes anywhere else. Since v1.1.0 the dashboard wears my site's Regent brand, matching the page that embeds it [reading-tracker].

## Under the hood

<!-- figure:pipeline -->

The stack is small on purpose: my spec ruled out an ORM, a web framework and Docker. Text is stored in Unicode NFC, so Vietnamese diacritics typed on different keyboards group together. The demo history goes through the same validation as real data, so both sources on the public side pass the same rules [reading-tracker].

## Built, tested and shipped

I started with the spec, not the code. The repo's first commit is its `CLAUDE.md`, with my goals, the stack limits, the data model and the privacy rules, plus the brand guide. Then I built the product with Claude Code, which co-authored every commit, and released v1.0.0 the same day, after 29 commits [reading-tracker].

<!-- figure:quality -->

On v1.1.1, 209 tests pass, and GitHub Actions runs them with ruff on every push. Click-through tests with Streamlit AppTest drive both apps. Each of the 3 releases is tagged and passed CI: v1.0.0, then v1.1.0 in the site's brand, then v1.1.1, whose charts no longer zoom on a drag or swipe. The dashboard has been live on Streamlit Community Cloud since 2026-10-25; this page shows a still of it and loads the live app only when you ask [reading-tracker].

## Roadmap

Importing my reading history from Toggl comes first; until then, the dashboard stays on demo data. Then comes the spec's third goal: a Bayesian time-to-finish model with a backtest, which I will mostly write myself. That backtest is also what the baseline needs before its accuracy can be measured [reading-tracker].

## Tools

Python, uv, SQLite, pandas, Streamlit, Plotly, pytest, ruff, GitHub Actions, Claude Code.

## Links

- Live dashboard, on demo data: https://tung-anh-reading.streamlit.app
- Code repository: https://github.com/feitandodatascience/reading-tracker

## Sources

- reading-tracker
