document.addEventListener('DOMContentLoaded', function() {
    const categoryDropdown = document.getElementById('categoryDropdown');
    const faqContent = document.getElementById('faqContent');

    // Category dropdown functionality
    categoryDropdown.addEventListener('change', function() {
        const selectedCategory = this.value;
        const categorySection = document.getElementById(selectedCategory);
        if (categorySection) {
            categorySection.scrollIntoView({ behavior: 'smooth' });
        }
    });

    // Fetch and display FAQ data
    fetch('faq-data.json')
        .then(response => response.json())
        .then(data => {
            displayFAQ(data);
        })
        .catch(error => console.error('Error loading FAQ data:', error));

    function displayFAQ(data) {
        let html = '';
        for (const category in data) {
            html += `<section id="${category}">
                        <h2>${category.charAt(0).toUpperCase() + category.slice(1)}</h2>`;
            data[category].forEach(item => {
                html += `
                    <div class="faq-item">
                        <div class="faq-question">
                            ${item.question}
                            <span class="faq-toggle">+</span>
                        </div>
                        <div class="faq-answer">${item.answer}</div>
                    </div>`;
            });
            html += '</section>';
        }
        faqContent.innerHTML = html;

        // Add click event listeners to questions
        document.querySelectorAll('.faq-question').forEach(question => {
            question.addEventListener('click', function() {
                this.classList.toggle('active');
                const answer = this.nextElementSibling;
                const toggle = this.querySelector('.faq-toggle');
                if (answer.style.display === 'block') {
                    answer.style.display = 'none';
                    toggle.textContent = '+';
                } else {
                    answer.style.display = 'block';
                    toggle.textContent = '-';
                }
            });
        });
    }
});
