const button = document.querySelector('.menu-button');
const nav = document.querySelector('#site-nav');
button.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('open');
  button.setAttribute('aria-expanded', String(isOpen));
});
nav.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
  nav.classList.remove('open');
  button.setAttribute('aria-expanded', 'false');
}));
document.querySelector('#year').textContent = new Date().getFullYear();

const contactForm = document.querySelector('[data-contact-form]');
contactForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  const button = contactForm.querySelector('button[type="submit"]');
  const status = contactForm.querySelector('.form-status');
  const originalLabel = button.innerHTML;

  button.disabled = true;
  button.textContent = 'Sending…';
  status.textContent = '';
  status.className = 'form-status wide';

  try {
    const response = await fetch(contactForm.action, {
      method: 'POST',
      body: new FormData(contactForm),
      headers: { Accept: 'application/json' }
    });
    const result = await response.json();
    if (!response.ok || result.success === false) throw new Error('Submission failed');

    contactForm.reset();
    status.textContent = 'Thank you. Your inquiry has been sent.';
    status.classList.add('success');
  } catch (error) {
    status.textContent = 'We could not send your inquiry. Please try again.';
    status.classList.add('error');
  } finally {
    button.disabled = false;
    button.innerHTML = originalLabel;
  }
});
