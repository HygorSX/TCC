document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('productModal');
    const openModalButton = document.querySelector('.icon-button');
    const closeModalButton = document.querySelector('.close-button');
    const fileInput = document.querySelector("#fileInput");
    const imagePlaceholder = document.querySelector(".imagePlaceholder");
    const defaultText = '<i class="fa-solid fa-image fa-2xl"></i>';

    imagePlaceholder.innerHTML = defaultText;

    openModalButton.addEventListener('click', () => {
        modal.style.display = 'flex';
    });

    closeModalButton.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });

    /*fileInput.addEventListener("change", function (e) {
        const target = e.target;
        const file = target.files[0];

        if (file) {
            const reader = new FileReader();

            reader.addEventListener("load", function (e) {
                const result = e.target.result;

                const img = document.createElement("img");
                img.src = result;
                img.classList.add("displayedImage");

                imagePlaceholder.innerHTML = "";
                imagePlaceholder.appendChild(img);
            });

            reader.readAsDataURL(file);
        } else {
            imagePlaceholder.innerHTML = defaultText;
        }
    });*/
});



const fileInput = document.querySelector("#fileInput");
    const imagePlaceholder = document.querySelector(".imagePlaceholder");
    const defaultText = '<i class="fa-solid fa-image fa-2xl"></i>';
    imagePlaceholder.innerHTML = defaultText;

    fileInput.addEventListener("change", function (e) {
      const target = e.target;
      const file = target.files[0];

      if (file) {
        const reader = new FileReader();

        reader.addEventListener("load", function (e) {
          const result = e.target.result;

          const img = document.createElement("img");
          img.src = result;
          img.classList.add("displayedImage");
          img.id = "imgProduto";

          imagePlaceholder.innerHTML = "";
          imagePlaceholder.appendChild(img);
        });

        reader.readAsDataURL(file);
      } else {
        imagePlaceholder.innerHTML = defaultText;
      }
    });