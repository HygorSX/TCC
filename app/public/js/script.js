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
        localStorage.clear(); // Limpa todos os itens do localStorage
        location.href = "/"; // Redireciona para a página inicial
    }
    
    document.getElementById('logout').addEventListener('click', function() {
        logoutUser();
    });
    


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

async function carregarProdutos() {
    console.log('Carregando produtos...');
    try {
        const response = await fetch('http://localhost:3000/products');
        if (!response.ok) {
            throw new Error('Erro ao buscar os produtos, status: ' + response.status);
        }

        const data = await response.json();
        console.log('Dados recebidos:', data);

        const produtos = data.produtos;
        if (!Array.isArray(produtos)) {
            throw new Error('Produtos não encontrados ou formato incorreto');
        }

        const produtosContainer = document.getElementById('produtos');
        produtosContainer.innerHTML = '';

        produtos.forEach(produto => {
            const imagemUrl = produto.IMAGEM ? `/imagens_produto/${produto.IMAGEM}` : '/imagens/default.jpg';
            console.log('Imagem URL:', imagemUrl);  // Log do caminho da imagem
            const produtoCard = `
                <section class="produto-card">
                    <img src="${imagemUrl}" alt="${produto.NOME}">
                    <h2><a href="#">${produto.NOME}</a></h2>
                    <p>Marca: ${produto.MARCA}</p>
                    <p class="preco">Preço: R$ ${produto.VALOR}</p>
                    <br>
                    <a href="/buypage?nome=${produto.NOME}&preco=${produto.VALOR}&descricao=${produto.DESCRICAO}&tamanho=${produto.TAMANHO}&imagem=/imagens_produto/${produto.IMAGEM}&link=${produto.URL_PRODUTO}" class="buy">Compre Agora</a>
                </section>
            `;
            produtosContainer.innerHTML += produtoCard;
        });
    } catch (error) {
        console.error('Erro ao carregar os produtos:', error);
    }
}

function verificarUsuarioOuEmpresa() {
    const empresa = localStorage.getItem('empresa');
    const usuario = localStorage.getItem('usuario');

    if (empresa) {
        window.location.href = '/editar_empresa'; // Redireciona para a página de edição da empresa
    } else if (usuario) {
        new Notify({
            status: 'error',
            title: 'Você não tem acesso a essa área!',
            text: 'Apenas empresas podem acessar essa página!',
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
    } else {
        window.location.href = '/login_empresa'; // Redireciona para a página de login de empresa
    }
}



window.onload = () => {
    console.log('window.onload chamado');
    updateUserUI();
    carregarProdutos();
};
