 document.addEventListener("DOMContentLoaded", function () {
            const nombre = document.getElementById("nombreUsuario");
            const rol = document.getElementById("rolUsuario");
            const boton = document.getElementById("botonCompra");

            function validarCampos() {
                boton.disabled = !(nombre.value.trim() && rol.value.trim());
            }
            nombre.addEventListener("input", validarCampos);
            rol.addEventListener("input", validarCampos);
            validarCampos();
        });