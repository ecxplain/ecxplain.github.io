const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#main-nav');
const edition = window.ECXPLAIN_EDITION || {};

if (menuButton && navigation) {
  menuButton.addEventListener('click', () => {
    const expanded = menuButton.getAttribute('aria-expanded') === 'true';
    menuButton.setAttribute('aria-expanded', String(!expanded));
    navigation.classList.toggle('open', !expanded);
  });

  navigation.addEventListener('click', (event) => {
    if (event.target.closest('a')) {
      navigation.classList.remove('open');
      menuButton.setAttribute('aria-expanded', 'false');
    }
  });
}

for (const node of document.querySelectorAll('[data-edition]')) {
  const value = edition[node.dataset.edition];
  if (value) node.textContent = value;
}

for (const link of document.querySelectorAll('[data-edition-link]')) {
  const value = edition[link.dataset.editionLink];
  if (isWebUrl(value)) link.href = value;
}

if (edition.conferenceName) {
  document.title = `${edition.name || 'EcXplain'} — ${edition.conferenceName}: Search Dynamics to Testable Explanations`;
  const description = document.querySelector('meta[name="description"]');
  if (description) description.content = `${edition.name || 'EcXplain'} is a workshop at ${edition.conferenceName} on evolutionary search dynamics and testable scientific explanations.`;
}

function isWebUrl(value) {
  try {
    const url = new URL(value);
    return url.protocol === 'https:' || url.protocol === 'http:';
  } catch {
    return false;
  }
}

function addActionLink(container, label, href) {
  if (!isWebUrl(href)) return;
  const link = document.createElement('a');
  link.href = href;
  link.textContent = label;
  link.target = '_blank';
  link.rel = 'noopener noreferrer';
  container.append(link);
}

function renderAcceptedWork(kind, entries) {
  const container = document.querySelector(`[data-accepted-list="${kind}"]`);
  if (!container) return;
  container.replaceChildren();

  if (!Array.isArray(entries) || entries.length === 0) {
    const empty = document.createElement('p');
    empty.className = 'accepted-empty';
    empty.textContent = kind === 'papers'
      ? 'Accepted papers will be listed here after decisions are announced.'
      : 'Accepted abstracts will be listed here after decisions are announced.';
    container.append(empty);
    return;
  }

  for (const entry of entries) {
    if (!entry || !entry.title) continue;
    const card = document.createElement('article');
    card.className = 'accepted-card';
    const title = document.createElement('h4');
    title.textContent = entry.title;
    card.append(title);
    if (entry.authors) {
      const authors = document.createElement('p');
      authors.className = 'accepted-authors';
      authors.textContent = entry.authors;
      card.append(authors);
    }
    const actions = document.createElement('div');
    actions.className = 'accepted-actions';
    addActionLink(actions, 'Paper PDF ↗', entry.paperUrl);
    addActionLink(actions, 'Abstract ↗', entry.abstractUrl);
    addActionLink(actions, 'DOI ↗', entry.doi);
    addActionLink(actions, 'Slides ↗', entry.slidesUrl);
    addActionLink(actions, 'Presentation video ↗', entry.videoUrl);
    if (actions.childElementCount) card.append(actions);
    container.append(card);
  }
}

renderAcceptedWork('papers', edition.acceptedPapers);
renderAcceptedWork('abstracts', edition.acceptedAbstracts);

const videoSection = document.querySelector('#video');
const videoLink = document.querySelector('.video-fallback');
const videoFrame = document.querySelector('.video-frame iframe');
const videoNav = document.querySelector('.video-nav-link');
const videoIdOrUrl = edition.youtubeVideoId || '';
const youtubeMatch = videoIdOrUrl.match(/(?:youtu\.be\/|youtube(?:-nocookie)?\.com\/(?:watch\?v=|embed\/|shorts\/))([A-Za-z0-9_-]{11})/);
const videoId = youtubeMatch ? youtubeMatch[1] : (/^[A-Za-z0-9_-]{11}$/.test(videoIdOrUrl) ? videoIdOrUrl : '');
if (videoId && videoSection && videoFrame) {
  const youtubeUrl = `https://www.youtube.com/watch?v=${videoId}`;
  videoSection.hidden = false;
  videoFrame.src = `https://www.youtube-nocookie.com/embed/${videoId}`;
  if (videoLink) videoLink.href = youtubeUrl;
  if (videoNav) videoNav.hidden = false;
}

const pastEditions = Array.isArray(edition.pastEditions) ? edition.pastEditions : [];
const editionSection = document.querySelector('#editions');
const editionNav = document.querySelector('.edition-nav-link');
const editionList = document.querySelector('[data-edition-list]');
if (pastEditions.length && editionSection && editionList) {
  editionSection.hidden = false;
  if (editionNav) editionNav.hidden = false;
  for (const item of pastEditions) {
    if (!item || !item.year) continue;
    const card = document.createElement('article');
    card.className = 'edition-card';
    const heading = document.createElement('h3');
    heading.textContent = `${item.conferenceName || 'EcXplain'} · ${item.year}`;
    card.append(heading);
    if (isWebUrl(item.url)) addActionLink(card, 'Visit archived edition ↗', item.url);
    if (isWebUrl(item.acceptedWorkUrl)) addActionLink(card, 'Accepted work ↗', item.acceptedWorkUrl);
    editionList.append(card);
  }
}
