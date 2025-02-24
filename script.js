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

const sheetId = '1Pkpz44QOeNlKh7hx-hkjZddVJ2w1_hSlkfksfddfQ0M'; // Your Google Sheet ID
const apiKey = 'YOUR_API_KEY'; // Your API Key
const range = 'FAQ!A2:B'; // Range of cells to fetch

const url = `https://sheets.googleapis.com/v4/spreadsheets/1k4Z7_-ogV7sVc78DXI7g4fDqrk7Bs-2z8qHMfyKrYQo/values/FAQ!A2:B?key=AIzaSyDXwZTmri1pArjTts-SsoQFfwb55OK2kxo
`;

fetch(url)
  .then(response => response.json())
  .then(data => {
    console.log(data); // Log the API response to check if there's an error message or unexpected response

    if (!data.values) {
      console.error("No data found or invalid range.");
      return;
    }

    const faqData = data.values; // The FAQ data (array of rows)
    faqData.forEach(row => {
      const question = row[0]; // The question
      const answer = row[1];   // The answer

      // Create the FAQ item
      const faqItem = document.createElement('div');
      faqItem.classList.add('faq-item');
      
      const questionButton = document.createElement('button');
      questionButton.classList.add('faq-question');
      questionButton.innerHTML = `<span class="faq-icon">+</span><span class="faq-text">${question}</span>`;

      const answerDiv = document.createElement('div');
      answerDiv.classList.add('faq-answer');
      answerDiv.innerHTML = `<p>${answer}</p>`;

      faqItem.appendChild(questionButton);
      faqItem.appendChild(answerDiv);
      document.querySelector('.faq-section').appendChild(faqItem);

      // Event listener for FAQ question button
      questionButton.addEventListener('click', () => {
        answerDiv.classList.toggle('show');
        const icon = questionButton.querySelector('.faq-icon');
        icon.textContent = answerDiv.classList.contains('show') ? '−' : '+';
      });
    });
  })
  .catch(error => {
    console.error('Error fetching data from Google Sheets:', error);
  });
