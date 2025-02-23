document.querySelectorAll('.faq-question').forEach(button => {
  button.addEventListener('click', () => {
    const answer = button.nextElementSibling;
    const icon = button.querySelector('.faq-icon');

    // Toggle visibility of the answer
    answer.classList.toggle('show');

    // Toggle the icon
    if (answer.classList.contains('show')) {
      icon.textContent = '−'; // Change icon to minus when open
    } else {
      icon.textContent = '+'; // Change icon back to plus when closed
    }
  });
});
