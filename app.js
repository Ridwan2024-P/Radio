// Import necessary functions from Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";

// Firebase configuration object
const firebaseConfig = {
    apiKey: "AIzaSyDck5nVJ8VV332IjphMXUjmwBJ748Xiifo",
    authDomain: "tryphone-a5535.firebaseapp.com",
    projectId: "tryphone-a5535",
    storageBucket: "tryphone-a5535.firebasestorage.app",
    messagingSenderId: "105944906013",
    appId: "1:105944906013:web:b980d42140bea933e589f4",
    measurementId: "G-G524XXH8MW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Initialize reCAPTCHA verifier
const recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {
    size: 'invisible',  // Invisible reCAPTCHA, change to 'normal' to make it visible
    callback: (response) => {
        console.log("reCAPTCHA resolved", response);
    }
}, auth);

// Render reCAPTCHA widget
recaptchaVerifier.render();

// Function to send the verification code to the phone number
function sendVerificationCode() {
    const phoneNumber = document.getElementById('phoneNumber').value;
    const appVerifier = recaptchaVerifier;

    // Send verification code to phone number using Firebase
    signInWithPhoneNumber(auth, phoneNumber, appVerifier)
        .then((confirmationResult) => {
            // Store the confirmation result for code verification
            window.confirmationResult = confirmationResult;
            alert('Verification code sent! Please check your phone.');
        })
        .catch((error) => {
            console.error('Error sending verification code:', error);
            alert('Error sending verification code. Please try again.');
        });
}

// Function to verify the entered code
function verifyCode() {
    const code = document.getElementById('verificationCode').value;

    // Confirm the verification code entered by the user
    window.confirmationResult.confirm(code)
        .then((result) => {
            const user = result.user; // The authenticated user object
            alert('Phone number verified and user signed in successfully!');
            console.log('User:', user);
        })
        .catch((error) => {
            console.error('Error verifying code:', error);
            alert('Error verifying the code. Please try again.');
        });
}

// Link the button clicks to the functions
document.getElementById('sendCodeBtn').addEventListener('click', sendVerificationCode);
document.getElementById('verifyCodeBtn').addEventListener('click', verifyCode);
