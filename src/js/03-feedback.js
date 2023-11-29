import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');
const emailInput = form.querySelector('[name="email"]');
const messageInput = form.querySelector('[name="message"]');

const saveFormState = () => {
  const formState = {
    email: emailInput.value,
    message: messageInput.value,
  };
  localStorage.setItem('feedback-form-state', JSON.stringify(formState));
};

const restoreFormState = () => {
  const savedState = localStorage.getItem('feedback-form-state');
  if (savedState) {
    const { email, message } = JSON.parse(savedState);
    emailInput.value = email;
    messageInput.value = message;
  }
};

window.addEventListener('DOMContentLoaded', () => {
  restoreFormState();
});

form.addEventListener(
  'input',
  throttle(() => {
    saveFormState();
  }, 500)
);

form.addEventListener('submit', event => {
  event.preventDefault();
  console.log({ email: emailInput.value, message: messageInput.value });
  emailInput.value = '';
  messageInput.value = '';
  localStorage.removeItem('feedback-form-state');
});
