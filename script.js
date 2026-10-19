const storyData = window.storyData;

const storyGrid = document.getElementById('storyGrid');
const letterText = document.getElementById('letterText');
const dreamGrid = document.getElementById('dreamGrid');
const finalLetterText = document.getElementById('finalLetterText');
const loveNumberDisplay = document.getElementById('loveNumberDisplay');
const loveNumberPhrase = document.getElementById('loveNumberPhrase');
const loveNumberBtn = document.getElementById('loveNumberBtn');

function renderStory() {
  storyGrid.innerHTML = storyData.story
    .map(
      (item) => `
        <article class="story-card" aria-label="${item.title}">
          <span class="meta">${item.meta}</span>
          <h4>${item.title}</h4>
          <p>${item.text}</p>
        </article>
      `
    )
    .join('');
}

function renderLetter() {
  letterText.innerHTML = storyData.letter
    .map((paragraph) => `<p>${paragraph}</p>`)
    .join('');
}

function renderDreams() {
  dreamGrid.innerHTML = storyData.dreams
    .map(
      (item) => `
        <article class="dream-card" aria-label="${item.title}">
          <h4>${item.title}</h4>
          <p>${item.text}</p>
        </article>
      `
    )
    .join('');
}

function renderFinalLetter() {
  finalLetterText.innerHTML = storyData.finalLetter
    .map((paragraph) => `<p>${paragraph}</p>`)
    .join('');
}

function updateLoveNumber() {
  if (!storyData.loveNumberPhrases || !loveNumberDisplay || !loveNumberPhrase) {
    return;
  }

  const current = storyData.loveNumberPhrases[Math.floor(Math.random() * storyData.loveNumberPhrases.length)];
  loveNumberDisplay.textContent = current.value;
  loveNumberPhrase.textContent = current.phrase;
}

function openIntro() {
  const mainPage = document.getElementById('main-page');
  const introScreen = document.getElementById('intro-screen');

  introScreen.style.display = 'none';
  mainPage.classList.add('visible');
}

function toggleEnvelope(element, target, openClass = 'open') {
  const isOpen = element.classList.toggle(openClass);
  target.classList.toggle(openClass, isOpen);
  element.setAttribute('aria-expanded', String(isOpen));
}

function setupLetterEnvelope() {
  const envelope = document.getElementById('letterEnvelope');
  const content = document.getElementById('letterContent');

  if (!envelope || !content) {
    return;
  }

  envelope.addEventListener('click', () => {
    toggleEnvelope(envelope, content);
  });
}

function setupFinalEnvelope() {
  const envelope = document.getElementById('finalEnvelope');
  const content = document.getElementById('finalLetter');
  const reopenButton = document.getElementById('reopenFinalEnvelope');

  if (!envelope || !content || !reopenButton) {
    return;
  }

  const openFinalEnvelope = () => toggleEnvelope(envelope, content);
  envelope.addEventListener('click', openFinalEnvelope);
  reopenButton.addEventListener('click', openFinalEnvelope);
}

function setupIntroButton() {
  const button = document.getElementById('openGiftBtn');
  if (!button) {
    return;
  }

  button.addEventListener('click', openIntro);
}

function updateProgressDots() {
  const dots = [...document.querySelectorAll('.progress-dot')];
  const cards = [...document.querySelectorAll('.story-card')];

  if (!dots.length || !cards.length) {
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const index = cards.indexOf(entry.target);
          dots.forEach((dot, dotIndex) => {
            dot.classList.toggle('active', dotIndex === index || (index === 0 && dotIndex === 0));
          });
        }
      });
    },
    { threshold: 0.75 }
  );

  cards.forEach((card) => observer.observe(card));
}

renderStory();
renderLetter();
renderDreams();
renderFinalLetter();
updateLoveNumber();
setupIntroButton();
setupLetterEnvelope();
setupFinalEnvelope();
updateProgressDots();

if (loveNumberBtn) {
  loveNumberBtn.addEventListener('click', updateLoveNumber);
}

const initialIntroButton = document.getElementById('openGiftBtn');
if (initialIntroButton) {
  initialIntroButton.addEventListener('click', () => {
    document.getElementById('main-page').scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
}
