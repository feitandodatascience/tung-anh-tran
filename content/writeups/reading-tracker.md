# Reading Tracker: two buttons and a dashboard for my reading habit

**Summary:** A hobby app for my own reading. Two buttons log each reading session, and a public dashboard turns the sessions into streaks, pace and an estimate of when I will finish my current book [reading-tracker].

**Headline metric:** First version built in 1 day, with Claude Code [reading-tracker]

**Tags:** hobby · reading · dashboard

**Approved:** 2026-10-25

---

## Why I made it

I read in English and Vietnamese, mostly paper books. I wanted to know how much I really read, how fast, and when I will finish the book I am holding. A habit tracker only works if logging is quick, so the whole tracker is built around one Start button and one Stop button [reading-tracker].

## What it does

- **A private tracker.** It runs only on my computer. I press Start when I open a book and Stop when I close it, and it remembers the page where I stopped.
- **A public dashboard.** It shows the current book with an estimated finish range, reading streaks, weekly reading time against a goal, and how pace changes from one kind of book to another. You can try it on this page. For now it shows made-up demo data, clearly labelled [reading-tracker].
- **My diary stays private.** My notes and exact clock times never leave my computer. For each session, the public side sees only the hour it started and how long it lasted [reading-tracker].

## How I built it

It started from a written plan: what the app must do, what data it keeps, and what must stay private. From that plan I built it with Claude Code and had the first version working in a day. Since then I have released two updates: one gave the dashboard the same look as this site, and one stopped its charts from zooming by accident when you drag or swipe. Automated tests run on every change I push, and each update passed them [reading-tracker].

## What's next

Next I will import my real reading history, so the dashboard shows my own habit instead of demo data. After that, I want to write my own way of predicting when I will finish a book, and test it on my past reading [reading-tracker].

## Links

- Live dashboard, on demo data: https://tung-anh-reading.streamlit.app
- Code on GitHub: https://github.com/feitandodatascience/reading-tracker

## Sources

- reading-tracker
