---
id: reading-tracker
type: project
title: 'Reading Tracker: private session logger and public reading dashboard'
date: '2026-10-17'
status: active
visibility: public
tags:
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
  value: 206 passed, 2 skipped
  context: 'uv run pytest on v1.0.0 (commit 3dc05c9), Windows, Python 3.12.3, run 2026-10-24. The 2 skips are the notebook guards, which have no notebooks to check yet. CI (ruff + pytest on GitHub Actions) passed on the same commit on 2026-10-17. Source: tests/, .github/workflows/ci.yml'
- name: Line coverage, all code
  value: 94.75% (849 / 896 statements)
  context: pytest-cov over src/reading_tracker and app/ on v1.0.0, measured 2026-10-24 with `uv run --with pytest-cov pytest --cov=src/reading_tracker --cov=app`; the terminal report rounds it to 95%. Coverage is not part of the repo or its CI.
- name: Line coverage by module
  value: log 100 / db 100 / features 100 / brand 100 / synthetic 99.02 / tracker app 96.71 / eta 95.12 / dashboard app 94.87 / export 94.12 / launcher 50.0
  context: 'Same run as the total. Statements: log 173, db 35, features 56, brand 27, synthetic 102 (1 missed), app/tracker.py 213 (7 missed), eta 41 (2 missed), app/dashboard.py 156 (8 missed), export 34 (2 missed), app/launcher.py 50 (25 missed). The two 4-statement .pyw shims are at 75.0 each.'
- name: Tests by file
  value: log 109 / tracker app 22 / db 24 / features 19 / synthetic + export 11 / brand 6 / eta 6 / dashboard app 5 / launcher 4 / notebooks 2
  context: pytest --collect-only per test file on v1.0.0, 2026-10-24. The tracker and dashboard app tests are click-through tests with Streamlit AppTest.
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
