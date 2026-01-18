
// Switch between login and register forms
function showLogin() {
    document.getElementById('loginForm').style.display = 'block';
    document.getElementById('registerForm').style.display = 'none';
}

function showRegister() {
    document.getElementById('registerForm').style.display = 'block';
    document.getElementById('loginForm').style.display = 'none';
}

// Validation functions
function validateUsername(username) {
  if (username.length < 2) return false;

  for (let ch of username) {
    if (
      !(
        (ch >= "a" && ch <= "z") ||
        (ch >= "A" && ch <= "Z") ||
        (ch >= "א" && ch <= "ת")
      )
    ) {
      return false;
    }
  }
  return true;
}

function validatePassword(password) {
  if (password.length < 3 || password.length > 8) return false;

  let hasLetter = false;
  let hasNumber = false;

  for (let ch of password) {
    if ((ch >= "a" && ch <= "z") || (ch >= "A" && ch <= "Z")) {
      hasLetter = true;
    } else if (ch >= "0" && ch <= "9") {
      hasNumber = true;
    }
  }

  return hasLetter && hasNumber;
}


// Login form validation
document.querySelector('#loginForm form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById("loginPassword").value;
    const isValid = true;
    
    // Clear previous errors
    document.getElementById('loginUsernameError').textContent = '';
    document.getElementById('loginPasswordError').textContent = '';
    
    // Validate username
    if (!validateUsername(username)) {
        document.getElementById('loginUsernameError').textContent ='שם משתמש חייב להכיל לפחות 2 אותיות';
        isValid = false;
    }
    
    // Validate password
    if (!validatePassword(password)) {
        document.getElementById('loginPasswordError').textContent = 'סיסמה חייבת להיות 3-8 תווים עם לפחות אות אחת וספרה אחת';
        isValid = false;
    }
    
    if (isValid) {
        // Send data to server
        console.log('Login:', { username: username, password: password });
        alert('הנתונים תקינים!');
        // Here we will send to server using fetch
    }
});

// Register form validation
document.querySelector('#registerForm form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const username = document.getElementById('regUsername').value;
    const password = document.getElementById("regPassword").value;
    const email = document.getElementById("regEmail").value;
    const userType = document.querySelector(
      'input[name="userType"]:checked'
    ).value;
    const isValid = true;
    
    // Clear previous errors
    document.getElementById('regUsernameError').textContent = '';
    document.getElementById('regPasswordError').textContent = '';
    document.getElementById('regEmailError').textContent = '';
    
    // Validate username
    if (!validateUsername(username)) {
        document.getElementById('regUsernameError').textContent = 'שם משתמש חייב להכיל לפחות 2 אותיות בלבד';
        isValid = false;
    }
    
    // Validate password
    if (!validatePassword(password)) {
        document.getElementById('regPasswordError').textContent = 'סיסמה חייבת להיות 3-8 תווים עם לפחות אות אחת וספרה אחת';
        isValid = false;
    }
    
    // Validate email
    if (!email || !email.includes('@')) {
        document.getElementById('regEmailError').textContent = 'נא להזין כתובת אימייל תקינה';
        isValid = false;
    }
    
    if (isValid) {
        // Send data to server
        console.log('Register:', { 
            username: username, 
            password: password, 
            email: email,
            userType: userType
        });
        alert('ההרשמה בוצעה בהצלחה!');
        // Here we will send to server using fetch
    }
});