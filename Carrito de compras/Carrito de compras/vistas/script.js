let carrito = [];
let cuerpo = document.querySelector(".bolsa table tbody");
let precio = 0;
let botones = document.querySelectorAll(".productos .producto button");
let cuenta = document.querySelector(".bolsa .cuenta");
let total = document.getElementById("precio5");

 // Obtén el botón y el menú
const toggleButton = document.getElementById('bolsa_bi-bag');
const menu = document.getElementById('carrito');

// Añadir un event listener para el clic en el botón
toggleButton.addEventListener('click', () => {
  // Alterna la clase 'oculto' para ocultar o mostrar el menú
  menu.classList.toggle('oculto');
});

    function anadir(){

        let name = this.parentNode.querySelector("h3").textContent;
        let price = this.parentNode.querySelector("p").textContent;
        let url = this.parentNode.querySelector(".imagen img").getAttribute("src");

        carrito.push({name: name, price: price, url: url});

        localStorage.setItem("articulos", JSON.stringify(carrito));

        cuenta.textContent = carrito.length;

        let newprice = parseFloat(price.slice(1));
        precio += newprice;
        total.textContent = precio.toFixed(2);

        localStorage.setItem("precio", precio.toFixed(2));

        actualizar();
    }

        function actualizar(){

            cuerpo.innerHTML = "";

            carrito.forEach(function(item, index){

                let fila = document.createElement("tr");

                let imagen = document.createElement("img");
                imagen.src = item.url;

                fila.appendChild(document.createElement("td").appendChild(imagen));

                fila.innerHTML += `
                    <td>${item.name}</td>
                    <td>${item.price}</td>
                    <td><a href="#" OnClick="eliminar(${index});">X</a></td>
                `;

                cuerpo.appendChild(fila);

            });

        }


        function eliminar(index){

            let position = carrito[index];

            carrito.splice(position, 1);

            let delprecio = parseFloat(position.price.slice(1));
            precio -= delprecio;
            total.textContent = precio.toFixed(2);

            cuenta.textContent = carrito.length;

            localStorage.setItem("articulos", JSON.stringify(carrito));
            localStorage.setItem("precio", precio.toFixed(2));
            actualizar();
        }



        window.addEventListener("load", cargar);


        function cargar(){

            let itemlocal = localStorage.getItem("articulos");
            let preciolocal = localStorage.getItem("precio");
            
            if(itemlocal){

                carrito = JSON.parse(itemlocal);
                precio = parseFloat(preciolocal);
                total.textContent = precio.toFixed(2);

                actualizar();

            }
        }




        function vaciar2(){
           cuerpo.innerHTML = "";
           cuenta.innerHTML = "";
           precio = 0;
           carrito = [];
          localStorage.removeItem("articulos");
          localStorage.removeItem("precio");
          total.innerHTML = "";

        }

botones.forEach(function(btn){

    btn.addEventListener("click", anadir);

});


botones.forEach(function(btn){

    btn.addEventListener("click", anadir);

});

 // Obtener elementos
 let modal = document.getElementById("myModal");
 let btn = document.getElementById("openModal");
 let close = document.querySelector(".close");

 // Mostrar el modal al hacer clic en el botón
 btn.addEventListener("click", function() {
     modal.style.display = "flex";


anadir();


 });

 // Cerrar el modal al hacer clic en la "X"
 close.addEventListener("click", function() {
     modal.style.display = "none";
 });
 
 
        // Cerrar el modal si se hace clic fuera del contenido
        window.addEventListener("click", function(event) {
            if (event.target === modal) {
                modal.style.display = "none";
            }
        });