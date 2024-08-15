const inputFile = document.querySelector("#picture__input");
const pictureImage = document.querySelector(".picture__image");
const pictureImageTxt = '<i class="fa-solid fa-image fa-2xl"></i>';
pictureImage.innerHTML = pictureImageTxt;

inputFile.addEventListener("change", function (e) {
  const inputTarget = e.target;
  const file = inputTarget.files[0];

  if (file) {
    const reader = new FileReader();

    reader.addEventListener("load", function (e) {
      const readerTarget = e.target;

      const img = document.createElement("img");
      img.src = readerTarget.result;
      img.classList.add("picture__img");

      pictureImage.innerHTML = "";
      pictureImage.appendChild(img);
    });

    reader.readAsDataURL(file);
  } else {
    pictureImage.innerHTML = pictureImageTxt;
  }
});

const apiUrl = 'http://localhost:3000/api/products';

function fetchProducts() {
    fetch(`${apiUrl}`)
        .then(response => response.json())
        .then(data => {
            products = data;
            renderProducts();
        });
}

function addProduct(product) {
    fetch(`${apiUrl}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(product)
    })
    .then(response => response.json())
    .then(data => {
        products.push(data);
        renderProducts();
    });
}

function updateProduct(product, index) {
    fetch(`${apiUrl}/${product.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(product)
    })
    .then(response => response.json())
    .then(data => {
        products[index] = data;
        renderProducts();
    });
}

function deleteProduct(id, index) {
    fetch(`${apiUrl}/${id}`, {
        method: 'DELETE'
    })
    .then(() => {
        products.splice(index, 1);
        renderProducts();
    });
}

document.querySelector('.icon-button').addEventListener('click', () => {
    openModal();
});

function openModal(product = {}) {
    document.getElementById('productName').value = product.name || '';
    document.getElementById('productSize').value = product.size || '';
    document.getElementById('productBrand').value = product.brand || '';
    document.getElementById('productValue').value = product.value || '';
    document.getElementById('productDescription').value = product.description || '';
    document.getElementById('fileInput').value = '';
    document.querySelector('.btnSalvar-modal').onclick = () => saveProduct(product.index);
    document.getElementById('productModal').style.display = 'block';
}

function saveProduct(index) {
    const product = {
        name: document.getElementById('productName').value,
        size: document.getElementById('productSize').value,
        brand: document.getElementById('productBrand').value,
        value: document.getElementById('productValue').value,
        description: document.getElementById('productDescription').value,
        image: document.getElementById('fileInput').files[0] ? URL.createObjectURL(document.getElementById('fileInput').files[0]) : ''
    };
    
    if (index >= 0) {
        product.id = products[index].id;
        updateProduct(product, index);
    } else {
        addProduct(product);
    }
    
    closeModal();
}

function closeModal() {
    document.getElementById('productModal').style.display = 'none';
}

function editProduct(index) {
    const product = products[index];
    product.index = index;
    openModal(product);
}

function removeProduct(index) {
    const id = products[index].id;
    deleteProduct(id, index);
} 

document.querySelector('.close-button').addEventListener('click', closeModal);

window.onclick = function(event) {
    if (event.target == document.getElementById('productModal')) {
        closeModal();
    }
}

fetchProducts();
