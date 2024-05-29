let menu = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');
let user = document.querySelector('.user')

menu.onclick = () => {
    menu.classList.toggle('bx-x');
    navbar.classList.toggle('open');
    user.classList.toggle('open')
    
}
