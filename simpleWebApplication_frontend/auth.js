let loginForm = document.getElementById('login-form');
let registerForm = document.getElementById('register-form');
let tabs = document.querySelectorAll('.tab');
let messageDiv = document.getElementById('message');

function logout() {
  localStorage.removeItem('token');
  localStorage.removeItem('username');
  window.location.href = 'login.html';
}

function showMessage(text, type) {
  messageDiv.textContent = text;
  messageDiv.className = `message ${type}`;
  messageDiv.style.display = 'block';
}


document.addEventListener('DOMContentLoaded', () => {
  const authSection = document.getElementById('auth-section');
  if (!authSection) return;

  const token = localStorage.getItem('token');
  const username = localStorage.getItem('username');

  //user logged in currently, so show logout button
  if (token && username) {
    authSection.innerHTML = `
      <span style="color: white; margin-right: 15px; font-weight: 500;">Hi, ${username}!</span>
      <button onclick="logout()" style="background:#e74c3c;color:white;border:none;padding:8px 16px;border-radius:6px;cursor:pointer;">Logout</button>
    `;
  } else {
    authSection.innerHTML = `<a href="login.html" style="background:#3498db;color:white;padding:8px 16px;border-radius:6px;text-decoration:none;">Login</a>`;
  }
});

//swap between the login and register tabs
tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    tabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');

    if (tab.dataset.form === 'login') {
      loginForm.style.display = 'block';
      registerForm.style.display = 'none';
    } else {
      loginForm.style.display = 'none';
      registerForm.style.display = 'block';
    }
    messageDiv.style.display = 'none';
  });
});


registerForm.addEventListener('submit', async (evt) => {
  evt.preventDefault();
  const username = document.getElementById('reg-username').value.trim();
  const password = document.getElementById('reg-password').value;

  try {
    const registerObj={"username":username,"password":password};
    const res = await fetch('http://localhost:8081/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(registerObj)
    });

    const data = await res.json();
    console.log(" register response ", res)
    console.log(" json data register ",data)

    if (res.ok) {
      showMessage('Registration successful! Please login.', 'success');
      document.querySelector('.tab[data-form="login"]').click();
    } else {
      showMessage(data.message || 'Registration failed', 'error');
    }
  } catch (err) {
    showMessage('Network error. Is backend running?', 'error');
  }
});


loginForm.addEventListener('submit', async (evt) => {
  evt.preventDefault();
  const username = document.getElementById('login-username').value.trim();
  const password = document.getElementById('login-password').value;

    const loginObj={"username":username,"password":password}
    const res = await fetch('http://localhost:8081/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(loginObj)
    });


    if (res.ok) {
      const token=await res.text();
      console.log(`login token ${token}`)
      localStorage.setItem('token', token);
      localStorage.setItem('username', username);

      showMessage('Login successful! Redirecting...', 'success');

      setTimeout(() => {
        window.location.href = 'index.html';  
      }, 2000);
    } 
    else {
      showMessage('Invalid credentials', 'error');
    }
});




