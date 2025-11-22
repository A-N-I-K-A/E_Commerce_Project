document.addEventListener('DOMContentLoaded', () => {
  const authSection = document.getElementById('auth-section');
  const token = localStorage.getItem('token');
  const username = localStorage.getItem('username');

  if (token && username && authSection) {
    authSection.innerHTML = `
      <span style="color:white;margin-right:10px">Hi, ${username}!</span>
      <button onclick="logout()" style="background:#e74c3c;color:white;border:none;padding:8px 16px;border-radius:6px;cursor:pointer;">Logout</button>
    `;
  }
  else{
    window.location.href='login.html';
  }
});

function logout() {
  localStorage.clear();
  window.location.href = 'login.html';
}