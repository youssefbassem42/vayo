import { initGlobal } from '../main.js';

document.addEventListener('DOMContentLoaded', () => {
    initGlobal();
    initAuth();
});

function initAuth() {
    // 1. REGISTER LOGIC
    const regForm = document.getElementById('register-form');
    if (regForm) {
        regForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const username = document.getElementById('reg-username').value.trim();
            const email = document.getElementById('reg-email').value.trim();
            const pass = document.getElementById('reg-password').value;
            const confirm = document.getElementById('reg-confirm').value;

            if (pass !== confirm) {
                alert("Passwords do not match!");
                return;
            }

            // Get existing users
            const users = JSON.parse(localStorage.getItem('vayo_users')) || [];

            // Check duplicate
            if (users.find(u => u.email === email)) {
                alert("Email already registered!");
                return;
            }

            // Create user
            const newUser = {
                id: Date.now(),
                username,
                email,
                password: pass // In a real app, hash this!
            };

            users.push(newUser);
            localStorage.setItem('vayo_users', JSON.stringify(users));

            alert("Registration successful! Please login.");
            window.location.href = 'login.html';
        });
    }

    // 2. LOGIN LOGIC
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const email = document.getElementById('login-email').value.trim();
            const pass = document.getElementById('login-password').value;

            const users = JSON.parse(localStorage.getItem('vayo_users')) || [];

            const user = users.find(u => u.email === email && u.password === pass);

            if (user) {
                // Login Success
                // Store minimal user info session
                const sessionUser = {
                    id: user.id,
                    username: user.username,
                    email: user.email
                };
                localStorage.setItem('vayo_user', JSON.stringify(sessionUser));

                alert(`Welcome back, ${user.username}!`);
                window.location.href = 'index.html';
            } else {
                alert("Invalid email or password.");
            }
        });
    }
}
