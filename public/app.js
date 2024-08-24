document.addEventListener('DOMContentLoaded', () => {
    // const signupForm = document.querySelector('#signup-form-id');
    const loginForm = document.querySelector('#login-form-id');

    if (loginForm) {
        loginForm.addEventListener('submit', async (event) => {
            event.preventDefault();

            const email = document.querySelector('input[placeholder="Enter your Email"]').value;
            const password = document.querySelector('input[placeholder="Enter your Password"]').value;

            // Basic validation
            if (!email || !password) {
                alert('Please fill in all fields.');
                return;
            }

            // Prepare the data to send
            const loginData = {
                email: email,
                password: password
            };

            try {
                const response = await fetch('/login1', { // Updated endpoint
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(loginData)
                });

                const result = await response.json();

                if (response.ok) {
                    // localStorage.setItem('token', data.token);
                    alert('Login successful!');
                    window.location.href = `/stuhome?id=${result.id}`; 
                } else {
                    alert(`Login failed: ${result.message}`);
                }
            } catch (error) {
                console.error('Error:', error);
                alert('An error occurred during login. Please try again.');
            }
        });
    }
});



