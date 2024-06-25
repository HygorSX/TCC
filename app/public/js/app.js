const sign_in_btn = document.querySelector("#sign-in-btn");
const sign_up_btn = document.querySelector("#sign-up-btn");
const container = document.querySelector(".container");

sign_up_btn.addEventListener("click", () => {
  container.classList.add("sign-up-mode");
});

sign_in_btn.addEventListener("click", () => {
  container.classList.remove("sign-up-mode");
});
function logar() {
    const login = document.getElementById('login').value;
    const senha = document.getElementById('senha').value;

    fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nome: login, password: senha }),
    })
    .then(response => response.json())
    .then(data => {
        console.log("retorno login", data)
        if (data.success) {
            localStorage.setItem('userName', data.info_usuario.NOME_CLIENTE);
            localStorage.setItem('token', data.token)
            localStorage.setItem('usuario', JSON.stringify(data.info_usuario))
            window.location.href = '/'; // Redirecione para a página inicial
        } else {
            new Notify({
                status: 'error',
                title: 'Erro ao fazer login!',
                text: 'Verifique seus dados e tente novamente!',
                effect: 'fade',
                speed: 300,
                customClass: '',
                customIcon: '',
                showIcon: true,
                showCloseButton: true,
                autoclose: true,
                autotimeout: 3000,
                notificationsGap: null,
                notificationsPadding: null,
                type: 'outline',
                position: 'x-center',
                customWrapper: '',
            });
        }
    })
    .catch((error) => {
        console.error('Error:', error);
        new Notify({
            status: 'error',
            title: 'Erro ao fazer login!',
            text: 'Ocorreu um erro ao tentar fazer login. Por favor, tente novamente mais tarde.',
            effect: 'fade',
            speed: 300,
            customClass: '',
            customIcon: '',
            showIcon: true,
            showCloseButton: true,
            autoclose: true,
            autotimeout: 3000,
            notificationsGap: null,
            notificationsPadding: null,
            type: 'outline',
            position: 'x-center',
            customWrapper: '',
        });
    });
}


const form = document.getElementById('container');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const passwordtwo = document.getElementById('password-two');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    checkInputs();
});

function checkInputs() {
    const usernameValue = username.value.trim();
    const emailValue = email.value.trim();
    const passwordValue = password.value.trim();
    const passwordtwoValue = passwordtwo.value.trim();

    let valid = true;

    if (usernameValue === '') {
        setErrorFor(username, 'Preencha esse campo');
        valid = false;
    } else {
        setSuccessFor(username);
    }

    if (emailValue === '') {
        setErrorFor(email, 'Preencha esse campo');
        valid = false;
    } else if (!isEmail(emailValue)) {
        setErrorFor(email, 'Email inválido');
        valid = false;
    } else {
        setSuccessFor(email);
    }

    if (passwordValue === '' || passwordValue.length < 8) {
        setErrorFor(password, 'Senha deve ter mais que 8 caracteres');
        valid = false;
    } else {
        setSuccessFor(password);
    }

    if (passwordtwoValue === '') {
        setErrorFor(passwordtwo, 'Preencha esse campo');
        valid = false;
    } else if (passwordValue !== passwordtwoValue) {
        setErrorFor(passwordtwo, 'Senhas não são iguais');
        valid = false;
    } else {
        setSuccessFor(passwordtwo);
    }

    if (valid) {
        // Se todas as validações passarem, faça a requisição ao backend
        fetch('http://localhost:3000/criar_usuario', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                nome: usernameValue,
                email: emailValue,
                password: passwordValue,
                confirmPassword: passwordtwoValue
            }),
        })
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                alert(data.error);
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }
}

function setErrorFor(input, message) {
    const formControl = input.parentElement;
    const small = formControl.querySelector('small');

    small.innerText = message;

    formControl.className = 'input-field error';
}

function setSuccessFor(input) {
    const formControl = input.parentElement;
    formControl.className = 'input-field success';
}

function isEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

