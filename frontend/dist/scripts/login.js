"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const form = document.getElementById('dbForm');
const errorDiv = document.getElementById('errorMessage');
const buttonText = document.getElementById('buttonText');
const buttonSpinner = document.getElementById('buttonSpinner');
form === null || form === void 0 ? void 0 : form.addEventListener('submit', (e) => __awaiter(void 0, void 0, void 0, function* () {
    e.preventDefault();
    // Show loading state
    buttonText.style.display = 'none';
    buttonSpinner.style.display = 'inline';
    // Clear previous errors
    errorDiv.style.display = 'none';
    errorDiv.textContent = '';
    const data = {
        host: document.getElementById('host').value,
        port: document.getElementById('port').value,
        database: document.getElementById('database').value,
        user: document.getElementById('user').value,
        password: document.getElementById('password').value
    };
    try {
        const response = yield fetch('/connect', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        const result = yield response.json();
        if (result.success) {
            // Add success visual feedback
            form.style.boxShadow = '0 0 20px rgba(72, 219, 131, 0.8)';
            setTimeout(() => {
                sessionStorage.setItem('dbConnected', 'true');
                window.location.href = '/index.html';
            }, 1000);
        }
        else {
            throw new Error(result.message || 'Error de conexión');
        }
    }
    catch (err) {
        // Show error with animation
        errorDiv.textContent = err.message;
        errorDiv.style.display = 'block';
        form.style.animation = 'shake 0.5s';
        setTimeout(() => form.style.animation = '', 500);
    }
    finally {
        // Reset button state
        buttonText.style.display = 'inline';
        buttonSpinner.style.display = 'none';
    }
}));
// Add shake animation for errors
const style = document.createElement('style');
style.textContent = `
  @keyframes shake {
    0%, 100% { transform: translateX(0); }
    20%, 60% { transform: translateX(-5px); }
    40%, 80% { transform: translateX(5px); }
  }
`;
document.head.appendChild(style);
