// JavaScript to handle navigation and form submissions

// Handle navigation between sections
document.querySelectorAll('.navbar-nav a').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const sectionId = e.target.getAttribute('href');

        // Hide all sections
        document.querySelectorAll('section').forEach(section => {
            section.style.display = 'none';
        });

        // Show the selected section
        document.querySelector(sectionId).style.display = 'block';
    });
});

// Function to start voice assistant (placeholder)
function startVoiceAssistant() {
    fetch('/start-voice', { method: 'POST' })
        .then(response => response.json())
        .then(data => alert(data.message))
        .catch(error => console.error('Error:', error));
}
function toggleSpinner(show) {
    const spinner = document.getElementById('loading-spinner');
    spinner.style.display = show ? 'block' : 'none';
}


// Optional: Show the home section by default
document.getElementById('home').style.display = 'flex';

document.querySelectorAll('.dropdown-content a').forEach(link => {
    link.addEventListener('click', function(event) {
        event.preventDefault();
        const targetId = this.getAttribute('href'); // Get the href attribute of the clicked link
        const targetSection = document.querySelector(targetId); // Find the corresponding section

        // Hide all form sections first
        document.querySelectorAll('.form-section').forEach(section => {
            section.style.display = 'none';
        });

        // Show the targeted section
        targetSection.style.display = 'block';
    });
});

// Close form when clicking outside of the form-card
document.querySelectorAll('.form-section').forEach(section => {
    section.addEventListener('click', (e) => {
        if (e.target === section) {
            section.style.display = 'none'; // Hide the section when clicked outside the form
        }
    });
});

function sendEmail() {
    const emailData = {
        subject: 'Test Subject',
        body: 'This is a test email.',
        to_emails: ['example1@gmail.com', 'example2@gmail.com']
    };

    fetch('/send-email', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(emailData)
    })
    .then(response => response.json())
    .then(data => alert(data.message))
    .catch(error => console.error('Error:', error));
}

// const themeToggle = document.getElementById('theme-toggle');
// themeToggle.addEventListener('click', () => {
//     document.body.classList.toggle('dark-mode');
//     if (document.body.classList.contains('dark-mode')) {
//         themeToggle.textContent = '🌜'; // Night mode icon
//     } else {
//         themeToggle.textContent = '🌞'; // Day mode icon
//     }
// });


