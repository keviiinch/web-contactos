import ContactoService from "./services/ContactoService.js";

import UI from "./ui/UI.js";

const service = new ContactoService();




// ==============================
// CARGAR CATEGORÍAS
// ==============================

async function cargarCategorias() {

    try {

        const response =
            await service.categorias();

        console.log("Categorías:", response);

        if (!response.ok) {

            console.error(
                "No se pudieron cargar categorías"
            );

            return;
        }

        const categorias = response.data;

        const selectAgregar =
            document.getElementById("idCategoria");

        const selectEditar =
            document.getElementById("editarCategoria");



        // LIMPIAR

        selectAgregar.innerHTML = `
            <option value="">
                Seleccione una categoría
            </option>
        `;

        selectEditar.innerHTML = `
            <option value="">
                Seleccione una categoría
            </option>
        `;



        // AGREGAR OPCIONES

        categorias.forEach(cat => {

            selectAgregar.innerHTML += `

                <option value="${cat.id_categoria}">

                    ${cat.nombre_categoria}

                </option>
            `;

            selectEditar.innerHTML += `

                <option value="${cat.id_categoria}">

                    ${cat.nombre_categoria}

                </option>
            `;
        });

    } catch(error) {

        console.error(
            "Error categorías:",
            error
        );
    }
}





// ==============================
// CARGAR CONTACTOS
// ==============================

async function cargarContactos() {

    try {

        const response =
            await service.listar();

        console.log("Contactos:", response);

        if (!response.ok) {

            console.error(
                "No se pudieron cargar contactos"
            );

            return;
        }

        UI.mostrarContactos(response.data);

        eventosTabla();

    } catch(error) {

        console.error(
            "Error contactos:",
            error
        );
    }
}





// ==============================
// INICIAR
// ==============================

document.addEventListener("DOMContentLoaded", () => {

    cargarCategorias();

    cargarContactos();
});






// ==============================
// AGREGAR CONTACTO
// ==============================

const formAgregar =
    document.getElementById("formAgregar");


formAgregar.addEventListener("submit", async (e) => {

    e.preventDefault();

    try {

        const contacto = {

            nombre:
                document.getElementById("nombre").value,

            apellido:
                document.getElementById("apellido").value,

            fecha_nacimiento:
                document.getElementById("fechaNacimiento").value,

            id_categoria:
                document.getElementById("idCategoria").value
        };

        console.log("Enviando:", contacto);

        const response =
            await service.agregar(contacto);

        console.log("Respuesta:", response);

        if(response.ok){

            bootstrap.Modal.getInstance(
                document.getElementById("modalAgregar")
            ).hide();

            formAgregar.reset();

            cargarContactos();

            alert(
                "Contacto agregado correctamente"
            );

        }else{

            alert(
                "Error al agregar contacto"
            );
        }

    } catch(error) {

        console.error(
            "Error agregar:",
            error
        );
    }
});






// ==============================
// EVENTOS TABLA
// ==============================

function eventosTabla() {




    // ==========================
    // ELIMINAR
    // ==========================

    const botonesEliminar =
        document.querySelectorAll(".btnEliminar");


    botonesEliminar.forEach(btn => {

        btn.addEventListener("click", async () => {

            const confirmar = confirm(
                "¿Deseas eliminar este contacto?"
            );

            if(!confirmar) return;

            try {

                const response =
                    await service.eliminar(
                        btn.dataset.id
                    );

                console.log(response);

                if(response.ok){

                    cargarContactos();

                    alert(
                        "Contacto eliminado"
                    );

                }else{

                    alert(
                        "Error al eliminar"
                    );
                }

            } catch(error){

                console.error(
                    "Error eliminar:",
                    error
                );
            }
        });
    });





    // ==========================
    // EDITAR
    // ==========================

    const botonesEditar =
        document.querySelectorAll(".btnEditar");


    botonesEditar.forEach(btn => {

        btn.addEventListener("click", () => {

            document.getElementById("editarId").value =
                btn.dataset.id;

            document.getElementById("editarNombre").value =
                btn.dataset.nombre;

            document.getElementById("editarApellido").value =
                btn.dataset.apellido;

            document.getElementById("editarFechaNacimiento").value =
                btn.dataset.fecha;

            document.getElementById("editarCategoria").value =
                btn.dataset.categoria;


            const modal = new bootstrap.Modal(
                document.getElementById("modalEditar")
            );

            modal.show();
        });
    });
}






// ==============================
// ACTUALIZAR CONTACTO
// ==============================

const formEditar =
    document.getElementById("formEditar");


formEditar.addEventListener("submit", async (e) => {

    e.preventDefault();

    try {

        const contacto = {

            id_contacto:
                document.getElementById("editarId").value,

            nombre:
                document.getElementById("editarNombre").value,

            apellido:
                document.getElementById("editarApellido").value,

            fecha_nacimiento:
                document.getElementById("editarFechaNacimiento").value,

            id_categoria:
                document.getElementById("editarCategoria").value
        };

        console.log("Actualizando:", contacto);

        const response =
            await service.actualizar(contacto);

        console.log(response);

        if(response.ok){

            bootstrap.Modal.getInstance(
                document.getElementById("modalEditar")
            ).hide();

            cargarContactos();

            alert(
                "Contacto actualizado"
            );

        }else{

            alert(
                "Error al actualizar"
            );
        }

    } catch(error){

        console.error(
            "Error actualizar:",
            error
        );
    }
});