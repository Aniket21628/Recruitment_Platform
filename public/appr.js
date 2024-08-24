document.addEventListener('DOMContentLoaded', () => {
    const recloginForm = document.querySelector('#rec-login');
    if (recloginForm) {
        recloginForm.addEventListener('submit', async (event) => {
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
                const response = await fetch('/rlogin', { // Updated endpoint
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(loginData)
                });

                const result = await response.json();

                if (response.ok) {
                    alert('Login successful!');
                    // Redirect to another page if needed
                    window.location.href = `/rechome?id=${result.id}`;
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
// document.addEventListener('DOMContentLoaded', async () => {
//     try {
//         const response = await fetch('/check-session', { method: 'GET' });

//         if (response.ok) {
//             // If session is active, redirect to rechome
//             const result = await response.json();
//             window.location.href = `/rechome?id=${result.id}`;
//         }
//     } catch (error) {
//         console.error('Error checking session:', error);
//         // If there's an error, you can choose to do nothing or handle it
//     }
// });
