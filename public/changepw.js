document.addEventListener('DOMContentLoaded', function () {
    const changePasswordForm = document.querySelector('#changepw-form');
    const urlParams = new URLSearchParams(window.location.search);
    const email = urlParams.get('email'); // Get the email from the query parameters

    changePasswordForm.addEventListener('submit', async function (event) {
        event.preventDefault();

        const newPassword = document.querySelector('input[placeholder="Enter your Password"]').value;
        const confirmPassword = document.querySelector('input[placeholder="Confirm your Password"]').value;

        // Example: Fetch POST request to your backend endpoint
        try {
            const response = await fetch('/change-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email, // Include the email in the request body
                    newPassword,
                    confirmPassword
                })
            });

            const data = await response.json();
            alert(data.message); // Display success or error message
        } catch (error) {
            console.error('Error:', error);
            alert('Failed to change password');
        }
    });
});