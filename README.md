# Marci Metzger — homepage concept

A **single homepage** coded in plain **HTML, CSS, and JavaScript** (no React, frameworks, libraries, or build step). Styling is inspired by the layout approach of https://www.aztechfencing.com.au/ while business information and imagery relate to https://marcimetzger.com/.

## Open or deploy

1. Open `index.html` directly in a browser, or run `python -m http.server 8000` from this folder and visit `http://localhost:8000`.
2. For Vercel, upload the folder or commit it to a repository and deploy as **Other** / static HTML with no build command. The output directory is the project root.
3. For a fully self-contained offline version, download the image assets referenced in `index.html` and `styles.css` into a local `assets/` folder, and update those paths.

## Scope & interactions

- **Homepage only**: all navigation items scroll to homepage sections.
- Responsive desktop/tablet/mobile navigation.
- Lead/contact forms validate fields and open a prefilled email to Marci's publicly listed address. A proper live form submission would require an authorized backend or form service.
- Gallery opens a modal and supports keyboard navigation.
- "Explore listings" links to the **existing** original site's listings page; this project does not create a fake searchable MLS feed.
- Live phone and directions links.

## Image asset provenance / limitations

The business images used here correspond to the Marci Metzger original site's themed imagery (portrait, hero/background, service and photo gallery assets) and **are hotlinked from a third-party archival recreation of that image set** at `sumire0817.github.io/-Real-Estate-Website/images/`, because the original site's direct file-download endpoints could not be retrieved in this environment. No unrelated stock photos or images from the Aztech Fencing reference were used. They are not bundled into the ZIP; images require an internet connection and could become unavailable if the external mirror changes. For production, the site owner should replace these remote links with approved copies downloaded directly from their original website and serve them locally. Verify ownership/licensing before republishing.

## Business information

The homepage uses publicly displayed information from the original business site: Marci Metzger / The Ridge Realty Group, Pahrump NV, (206) 919-6886, `Marcimetzger@gmail.com`, 3190 HW-160 Suite F, Pahrump, NV 89048, and published office hours of 8 a.m. to 7 p.m. Some headings / paragraphs are original presentation copy adapted for this demo, not verbatim quotations.

## Files

- `index.html` — layout and content
- `styles.css` — all styles and responsive rules
- `script.js` — menu, scroll behavior, form email drafting, image lightbox
