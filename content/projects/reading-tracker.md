---
id: reading-tracker
type: project
title: 'Reading Tracker: private session logger and public reading dashboard'
date: '2026-10-17'
status: active
visibility: public
tags:
- hobby
- personal-data
- data-product
- data-validation
- privacy
- dashboard
- data-visualisation
skills:
- event data modelling
- data validation at the source
- feature engineering with pandas
- privacy-safe data publishing
- synthetic data generation
- baseline forecasting
- dashboard design
- unit and app testing
- continuous integration
tools:
- Python
- uv
- SQLite
- pandas
- Streamlit
- Plotly
- pytest
- ruff
- GitHub Actions
- Claude Code
links:
  repo: https://github.com/feitandodatascience/reading-tracker
  kaggle: null
  demo: https://tung-anh-reading.streamlit.app
metrics:
- name: Test suite
  value: 209 passed, 2 skipped
  context: 'uv run pytest on v1.1.1 (commit 06f35d9), Windows, Python 3.12.3, run 2026-10-25. The 2 skips are the notebook guards, which have no notebooks to check yet. CI (ruff + pytest on GitHub Actions) passed on v1.1.1 on 2026-10-25. v1.0.0 had 206 passing. Source: tests/, .github/workflows/ci.yml'
- name: Line coverage, all code
  value: 94.75% (849 / 896 statements)
  context: pytest-cov over src/reading_tracker and app/ on v1.1.1, measured 2026-10-25 with `uv run --with pytest-cov pytest --cov=src/reading_tracker --cov=app`; the terminal report rounds it to 95%. v1.0.0, measured 2026-10-24, gave the same total. Coverage is not part of the repo or its CI.
- name: Line coverage by module
  value: log 100 / db 100 / features 100 / brand 100 / synthetic 99.02 / tracker app 96.71 / eta 95.12 / dashboard app 94.9 / export 94.12 / launcher 50.0
  context: 'Same run as the total. Statements: log 173, db 35, features 56, brand 26, synthetic 102 (1 missed), app/tracker.py 213 (7 missed), eta 41 (2 missed), app/dashboard.py 157 (8 missed), export 34 (2 missed), app/launcher.py 50 (25 missed). The two 4-statement .pyw shims are at 75.0 each.'
- name: Tests by file
  value: log 109 / tracker app 22 / db 24 / features 19 / synthetic + export 11 / brand 7 / dashboard app 7 / eta 6 / launcher 4 / notebooks 2
  context: pytest --collect-only per test file on v1.1.1, 2026-10-25. The tracker and dashboard app tests are click-through tests with Streamlit AppTest.
- name: Time to v1.0.0
  value: 1 day (29 commits)
  context: 'First commit 2026-10-17 00:21 (+07:00): the repo''s CLAUDE.md (goals, stack limits, data model, privacy rules) and brand guide. v1.0.0 released the same day. Every commit is co-authored with Claude Code. Source: git log'
- name: Releases
  value: 3 (v1.0.0, v1.1.0, v1.1.1)
  context: 'v1.0.0 on 2026-10-17, the first complete version; v1.1.0 on 2026-10-25, the portfolio site''s Regent brand (green, pearl and one gold accent; Libre Bodoni and Jost); v1.1.1 on 2026-10-25, charts that no longer zoom on a drag or swipe. Each is tagged on GitHub and passed CI. Source: CHANGELOG.md'
- name: Public time resolution
  value: 1 hour
  context: 'export.py floors every start time to the hour, drops notes and end times, keeps each session''s duration in whole seconds and leaves out active sessions. Source: src/reading_tracker/export.py'
- name: Demo history
  value: 15 books, 180 sessions, 182 days
  context: data/demo/demo.db from synthetic.py, seed 10, 182 days ending 2026-10-15; sessions from 2026-04-17 to 2026-10-13. 11 finished, 2 abandoned, 2 in progress; 9 English, 6 Vietnamese. Synthetic, labelled 'Demo data' on the dashboard.
- name: Baseline ETA window
  value: 28 days
  context: 'eta.py: pages left / median pace of the last 28 days / average minutes per day over the same window; the date range uses the 25th and 75th percentile pace. No accuracy measured yet. Source: src/reading_tracker/eta.py'
related: []
---
