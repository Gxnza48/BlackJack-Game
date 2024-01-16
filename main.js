document.addEventListener("DOMContentLoaded", function () {
    // Comprueba si el usuario ha aceptado las cookies
    const cookiesAccepted = localStorage.getItem("cookiesAccepted");

    if (!cookiesAccepted) {
        // Si no se han aceptado las cookies, muestra el aviso con animación
        const cookiePopup = document.getElementById("cookie-popup");
        cookiePopup.style.display = "block";
        setTimeout(function () {
            cookiePopup.style.opacity = "1";
        }, 100);
    }
});

function acceptCookies() {
    // Al hacer clic en "Aceptar", guarda el estado en localStorage y oculta con animación
    localStorage.setItem("cookiesAccepted", true);

    const cookiePopup = document.getElementById("cookie-popup");
    cookiePopup.style.opacity = "0";

    setTimeout(function () {
        cookiePopup.style.display = "none";
    }, 500);
}
