export default class UI {

    static mostrarContactos(contactos) {

        const tabla =
            document.getElementById("tablaContactos");

        tabla.innerHTML = "";

        contactos.forEach(contacto => {

            tabla.innerHTML += `

                <tr>

                    <td>${contacto.id_contacto}</td>

                    <td>${contacto.nombre}</td>

                    <td>${contacto.apellido}</td>

                    <td>${contacto.nombre_categoria}</td>

                    <td>

                        <button
                            class="btn btn-warning btn-sm btnEditar"

                            data-id="${contacto.id_contacto}"

                            data-nombre="${contacto.nombre}"

                            data-apellido="${contacto.apellido}"

                            data-fecha="${contacto.fecha_nacimiento}"

                            data-categoria="${contacto.id_categoria}"
                        >

                            <i class="bi bi-pencil-square"></i>

                        </button>

                        <button
                            class="btn btn-danger btn-sm btnEliminar"

                            data-id="${contacto.id_contacto}"
                        >

                            <i class="bi bi-trash"></i>

                        </button>

                    </td>

                </tr>
            `;
        });
    }
}