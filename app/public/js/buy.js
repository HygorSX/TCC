let menu = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');
let user = document.querySelector('.user')

menu.onclick = () => {
    menu.classList.toggle('bx-x');
    navbar.classList.toggle('open');
    user.classList.toggle('open')
    
}

function updateUserUI() {
    const userName = localStorage.getItem('userName');
    const userElement = document.getElementById('user');
    const userDropdown = document.getElementById('user-dropdown');
    
    if (userName) {
        userElement.innerHTML = `<i class="ri-user-3-fill"></i> Olá ${userName}`;
        userElement.href = "#"; // Opcional: você pode alterar o link de redirecionamento
        userElement.addEventListener('click', function() {
            userDropdown.classList.toggle('hidden');
        });
    } else {
        userElement.innerHTML = `<i class="ri-user-3-fill"></i> Faça seu login <br>ou registre-se`;
        userElement.href = "/login";
    }
}

function logoutUser() {
    localStorage.removeItem('userName');
    location.reload(); // Recarrega a página para refletir as mudanças
}

document.getElementById('logout').addEventListener('click', function() {
    logoutUser();
});

// Chame updateUserUI ao carregar a página para verificar se o usuário já está logado
window.onload = function() {
    updateUserUI();
}
