const urlBase = "http:" + window.location.origin.split(':')[1];
const urlApi = urlBase + ":3000";
//const url = "http" + window.location.origin;


let menu = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');
let user = document.querySelector('.user')

menu.onclick = () => {
    menu.classList.toggle('bx-x');
    navbar.classList.toggle('open');
    user.classList.toggle('open')
    
}
var radio = document.querySelector('.manual-btn')
var cont = 1

document.getElementById('radio1').checked = true

setInterval(() =>{
    proximaImg()
}, 5000)

function proximaImg(){
    cont++
    if(cont > 4){
        cont = 1
    }
    document.getElementById('radio'+cont).checked = true
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
        localStorage.removeItem('token');
        localStorage.removeItem('usuario');
        location.href = "/"; // Recarrega a página para refletir as mudanças
    }

    document.getElementById('logout').addEventListener('click', function() {
        logoutUser();
    });


    // Chame updateUserUI ao carregar a página para verificar se o usuário já está logado
    window.onload = function() {
        updateUserUI();
    }

    var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("openModalBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal 
btn.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}
