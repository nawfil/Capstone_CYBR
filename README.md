# CYBR Training Library (prototype)

Clickable prototype for the Training Material Management and Recommendation System (UG-S2-31A).
It lets staff register training materials (as Google Drive links), tag them against the CYBR taxonomy,
search and filter them, and get a ranked shortlist for an upcoming session.

**Sample data only.** The 18 materials are made up. Changes are saved in the viewer's browser (localStorage), not on a server.

## Run it
Open `index.html` in a browser. No build step or install.

## Screens
- Login page
- Training Materials: tag filters, search, cards, pagination, add/edit material
- Find for a Session: ranked shortlist from session details
- Tags & Categories: add, rename and remove categories and tags (administrator only)
- Dashboard: counts and tag coverage gaps
- Settings: role note and reset to sample data

The "Signed in as" dropdown stands in for login (Administrator or Trainer).

## Not included yet
a shared database, live Google Drive integration.
