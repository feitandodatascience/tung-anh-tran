# Reading Tracker: log privately, publish the habit safely

**Summary:** A small personal data product in Python. A private Streamlit tracker writes validated reading sessions to SQLite, an export keeps notes and exact times on my machine, and a public dashboard shows habit, pace and a baseline finish-date estimate. 206 tests cover 94.75% of the code [reading-tracker].

**Headline metric:** 94.75% line coverage from 206 passing tests on v1.0.0 [reading-tracker]

**Tags:** data product · data validation · privacy · dashboard

**Approved:** 2026-10-24

---

## Problem

I read in English and Vietnamese, mostly paper books. I wanted to know how much I really read, at what pace, and when I will finish the current book. A habit tracker only works if logging is quick, so the first rule was that recording a session should take seconds. The second was that the dashboard could be public while the raw diary stays private.

The data is my own: one row per book and one per reading session, with start and end time and pages. Until my history is imported, the dashboard runs on a seeded demo history of 15 books and 180 sessions over 182 days, labelled as demo data [reading-tracker].

## Approach

<!-- figure:pipeline -->

- **Validate where the data is born.** Only one session can be open. Sessions cannot overlap or end in the future, and page positions must sit inside the book. Bad rows never reach the analysis. These rules carry 109 of the 206 tests [reading-tracker].
- **Store events, derive the rest.** SQLite holds only books and sessions. Pace, streaks and progress are computed in pandas each time, so fixing a rule changes every past number consistently.
- **Private by construction.** The export drops notes and end times and floors start times to the hour. It keeps each session's duration, because rounding both ends would turn a 20:10 to 20:40 session into zero minutes [reading-tracker].
- **A baseline before a model.** The finish date is two plain ratios: pages left over recent median pace, over recent minutes per day. The range comes from the slower and faster quartiles of pace, so anyone can check it by hand.

## Result

<!-- figure:quality -->

Version 1.0.0 works end to end: tracker, export, demo data and dashboard, with ruff and pytest running in CI on every push [reading-tracker]. 206 tests pass and cover 94.75% of the code. Line coverage is the share of code statements that the tests actually run. The rules that guard the data are fully covered, and click-through tests drive both apps the way I use them [reading-tracker].

The gap is the Windows double-click launcher, at 50.0%. The untested half starts the server in the background and opens the browser. The finish-date estimate has no accuracy figure yet: measuring it needs my real history and a backtest, which is the next step [reading-tracker].

## What I learned

- **Friction decides the data.** The tracker is built around one Start and one Stop button, prefilled with the last page. Everything else hides in expanders.
- **Privacy rules interact.** Hiding exact times by rounding both ends would have destroyed durations. Publishing the start hour plus the duration keeps pace honest while hiding the clock.

## Tools

Python, uv, SQLite, pandas, Streamlit, Plotly, pytest, ruff, GitHub Actions, Claude Code.

## Links

- Code repository: https://github.com/feitandodatascience/reading-tracker

## Sources

- reading-tracker
