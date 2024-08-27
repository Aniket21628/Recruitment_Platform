function showotpform(event) {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const enteredOtpElement = document.getElementById('enteredOtp');
    const enteredOtp = enteredOtpElement ? enteredOtpElement.value : '';

    if (!enteredOtp) {
        // Send OTP
        fetch('/send-otp', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                Swal.fire({
                    icon: 'success',
                    title: 'OTP Sent',
                    text: 'OTP has been sent to your email address.',
                });
                document.getElementById('otpform').style.display = 'flex';
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Failed to send OTP. Please try again.',
                });
            }
        })
        .catch(error => {
            console.error('Error:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'An unexpected error occurred while sending OTP. Please try again later.',
            });
        });
    } else {
        // Verify OTP
        verifyOtp(event);
    }
}

let otpFromServer = ''

function verifyOtp(event) {
    event.preventDefault(); // Prevent form from submitting and page from reloading

    const enteredOtp = document.getElementById('enteredOtp').value;
    const email = document.getElementById('email').value;
    
    fetch('/verify-otp', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ otp: enteredOtp, email })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            Swal.fire({
                icon: 'success',
                title: 'OTP Verified',
                text: 'OTP verified successfully! Redirecting...',
                timer: 2000,
                showConfirmButton: false,
                willClose: () => {
                    const email = encodeURIComponent(data.email); // Encode the email to ensure URL safety
                    window.location.href = `/reset-password?email=${email}`; // Redirect with email query parameter
                }
            });
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Invalid OTP',
                text: 'The OTP you entered is incorrect. Please try again.',
            });
        }
    })
    .catch(error => {
        console.error('Error:', error);
        Swal.fire({
            icon: 'error',
            title: 'Verification Failed',
            text: 'Failed to verify OTP. Please try again later.',
        });
    });
}