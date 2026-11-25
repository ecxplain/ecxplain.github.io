# EcXplain Workshop Website

Reusable static, responsive website for **EcXplain**. The current edition is the GECCO 2027 workshop titled **Search Dynamics to Testable Explanations in Evolutionary Computation**.

The submission section links directly to the [official GECCO 2027 website](https://gecco-2027.sigevo.org/HomePage), where authors should follow the workshop submission instructions and portal.

GECCO 2027 is scheduled for **July 12–16, 2027, in Kraków, Poland**. The specific day and time for EcXplain's 110-minute workshop session have not yet been announced.

## Preview locally

Open `index.html` in a browser, or run a local static server from this folder:

```bash
python3 -m http.server 8000
```

Then visit `http://localhost:8000`.

## Publish with GitHub Pages

1. Create a GitHub repository for the site and upload the contents of this folder to its `main` branch.
2. In the repository, open **Settings → Pages**.
3. Under **Build and deployment**, select **GitHub Actions**.
4. The included `.github/workflows/pages.yml` workflow will publish the site after the first push to `main`. The workflow run will show the public Pages URL.

This site uses plain HTML, CSS, and JavaScript. It does not require a build step, package installation, or server-side hosting. GitHub Pages supports public repositories on GitHub Free; publishing from a private repository depends on the GitHub plan. See [GitHub Pages documentation](https://docs.github.com/en/pages/getting-started-with-github-pages) for current availability and limits.

## Content to update when confirmed

- GECCO 2027 workshop date, venue, and conference link
- Submission deadline, review notification, and camera-ready dates
- Submission portal URL and final publication/APC instructions
- Invited speaker and presentation title
- Final programme and any GECCO-required wording

Search `forthcoming`, `to be announced`, and `Speaker to be announced` in `index.html` to find the current placeholders.

## Preparing a new edition

The EcXplain identity is edition-independent. Before each workshop, update the conference name, dates, location, and links in `edition-data.js`. After decisions, add objects to `acceptedPapers` and `acceptedAbstracts` (each object can contain `title`, `authors`, and links such as `paperUrl`, `abstractUrl`, `doi`, `slidesUrl`, and `videoUrl`); add the YouTube video ID or URL to `youtubeVideoId` when a recording is ready. Move the completed edition into `pastEditions` to keep an archive link on the site. The video section remains hidden until a valid YouTube ID is supplied.
