document.getElementById("verFactura").addEventListener("click", function() {
    document.getElementById("modalFactura").style.display = "block";
});

document.querySelector(".cerrar").addEventListener("click", function() {
    document.getElementById("modalFactura").style.display = "none";
});

window.onclick = function(event) {
    let modal = document.getElementById("modalFactura");
    if (event.target === modal) {
        modal.style.display = "none";
    }
};