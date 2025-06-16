const form = document.getElementById('dbForm') as HTMLFormElement;
const errorDiv = document.getElementById('errorMessage') as HTMLDivElement;
const buttonText = document.getElementById('buttonText') as HTMLSpanElement;
const buttonSpinner = document.getElementById('buttonSpinner') as HTMLSpanElement;

form?.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  // Show loading state
  buttonText.style.display = 'none';
  buttonSpinner.style.display = 'inline';
  
  // Clear previous errors
  errorDiv.style.display = 'none';
  errorDiv.textContent = '';

  const data = {
    host: (document.getElementById('host') as HTMLInputElement).value,
    port: (document.getElementById('port') as HTMLInputElement).value,
    database: (document.getElementById('database') as HTMLInputElement).value,
    user: (document.getElementById('user') as HTMLInputElement).value,
    password: (document.getElementById('password') as HTMLInputElement).value
  };

  try {
    const response = await fetch('/connect', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });

    const result = await response.json();

    if (result.success) {
      // Add success visual feedback
      form.style.boxShadow = '0 0 20px rgba(72, 219, 131, 0.8)';
      setTimeout(() => {
        sessionStorage.setItem('dbConnected', 'true');
        window.location.href = '/index.html';
      }, 1000);
    } else {
      throw new Error(result.message || 'Error de conexión');
    }
  } catch (err: any) {
    // Show error with animation
    errorDiv.textContent = err.message;
    errorDiv.style.display = 'block';
    form.style.animation = 'shake 0.5s';
    setTimeout(() => form.style.animation = '', 500);
  } finally {
    // Reset button state
    buttonText.style.display = 'inline';
    buttonSpinner.style.display = 'none';
  }
});

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