# Rivet Bench teaching example: turn the asset into a booked walkthrough

Unofficial teaching mockup. Not affiliated with Acquisition.com or Alex Hormozi.

This is a static example of the page you send after a positive reply. The prospect already said yes to a free asset. The page delivers that asset with no email gate, then offers a short walkthrough of a lookalike case-study outcome for their business.

Demo prospect: Jordan at Northline Manufacturing. Sender brand: Rivet Bench (fictional). Every number, review, and case-study outcome is an illustrative teaching example. Do not present these figures as real proof on a live client page.

## Quick start

Open `index.html` in a browser. No build step.

Useful URL helpers:

- `?first=Sam&company=Halden%20Fabrication` personalizes the page
- `?teardown=1` shows the why-notes behind each section
- `#exit` opens the exit-intent popup
- `#side` forces a right-side proof popup

## What each section does

1. **Disclaimer banner**  
   Makes it clear this is an unofficial teaching mockup.

2. **Top offer banner**  
   Offers a walkthrough of a case-study outcome for the visitor's company. Copy shape: "See how a shop like {lookalike} {outcome}. Walkthrough for {company}."

3. **Hero + personalization pill**  
   Puts their name and company on the page so it feels made for them.

4. **VSL stub**  
   Short video placeholder before the asset. Replace with a real embed when you ship.

5. **Upper social proof strip**  
   A little proof near the top. Every chip is labeled illustrative.

6. **Ungated asset**  
   The thing they asked for, with no form in front of it.

7. **Walkthrough CTA under the asset**  
   Frames the call as help with the thing they already have.

8. **Mid-page case studies + testimonials**  
   More illustrative proof after the gift.

9. **Outcomes + FAQ**  
   Results they can feel, plus objections mined from replies like theirs.

10. **Heavy bottom social proof**  
    Case studies, reviews, and outcome chips before the last ask.

11. **Closer CTA**  
    Last walkthrough ask, still personalized to their company.

12. **Right-side slide-in popups**  
    Rotate case-study outcomes and reviews. Dismissible. Stay clear of CTAs. Desktop docks on the right; mobile uses a compact bottom-right chip.

13. **Exit-intent popup**  
    Same case-study walkthrough offer as the top banner. Calendar block is a stub.

14. **Teardown toggle**  
    Reveals why-notes for classroom review.

## How to adapt it

1. Replace Rivet Bench with your brand.
2. Swap the fictional lookalike, outcome, and asset for ones you can stand behind.
3. Keep every teaching example labeled until you have real permissioned proof.
4. Drop in your real calendar embed where the demo stub sits.
5. Optional: paste a PostHog snippet where the comment in `index.html` says.
6. Personalize from your CRM or outbound tool with the query params in `prospect.json`.

## Files

| File | Role |
|---|---|
| `index.html` | Resource page |
| `thanks.html` | Post-booking page |
| `styles.css` | Visual system |
| `app.js` | Personalization, exit intent, side popups, teardown |
| `prospect.json` | Default tokens |
| `screenshots/` | Desktop, mobile, exit, side, teardown captures |

## Rules for classroom use

- Do not use real Acquisition.com or Hormozi logos or likeness.
- Do not invent conversion benchmarks.
- Do not ship illustrative numbers as if they were audited client results.
- Keep the disclaimer visible while this stays a teaching mockup.
