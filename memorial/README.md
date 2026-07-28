# Memorial for Naveed Ahmad Anjum

A private, Wikipedia-style memorial webpage for Naveed Ahmad Anjum — "a kind
man, a loving husband, an obedient son, a caring brother and the best dad."

## Viewing the page

Open `index.html` in a browser, or enable GitHub Pages for this repo
(Settings → Pages → Deploy from branch) to get a hosted link.

## Structure

- `index.html` — the memorial page itself.
- `assets/style.css` — styling (Wikipedia-inspired layout).
- `assets/images/` — photos referenced by the page.
- `notes/INBOX.md` — where new information is jotted down over time.
- `notes/ARCHIVE.md` — past notes that have already been folded into the page.

## How to extend this page over time

The goal is minimal effort when a memory, fact, or photo comes to mind. There
are two ways to capture notes:

### Option A — the "Add a Note" form on the page (recommended)

The **Add a Note** section on `index.html` has a form: pick a category, write
the note, optionally add your name, and click "Save Note". Notes are saved
entirely client-side in the browser's `localStorage` — nothing is sent
anywhere, so this works fine even on a private/unlisted page URL with no
backend or login required.

When you're ready to update the page:
1. Click **Copy All** (copies a Markdown list to your clipboard) or
   **Download (.md)** (saves a file) in the Add a Note section.
2. Paste or send that to Claude and ask it to incorporate the notes.
3. Once incorporated, click **Clear All** to empty the saved notes for next time.

Note: saved notes live only in the browser/device you used to add them — they
aren't synced anywhere until you copy/download and hand them off.

### Option B — edit `notes/INBOX.md` directly

Open `notes/INBOX.md` in the repo and add a bullet under "Unsorted notes" —
a date, a story, a relative's name, anything. Add photo files to
`assets/images/` and note them under "Photos to add".

### Incorporating notes into the page

Whenever you're ready (one note or twenty), ask Claude Code (in a session on
this repo) to **"incorporate the notes into the memorial page"** and paste in
the notes you copied/downloaded (or point it at `notes/INBOX.md`). Claude will:

- Weave the material into the right section of `index.html` (Early Life,
  Education & Training, Career, Personal Life, Legacy, Gallery, Relations,
  or a new section if needed), placing any photos and updating the infobox
  if new facts like birth/death dates or family names are given.
- Move used entries from `notes/INBOX.md` into `notes/ARCHIVE.md` if that
  route was used.
- Commit and push the result.

No coding needed on your end — just capture notes as they come, in whatever
form is easiest.
