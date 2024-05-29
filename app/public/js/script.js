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

