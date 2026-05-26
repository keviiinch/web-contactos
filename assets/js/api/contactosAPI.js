const API =
    "https://kevincer.io/api-contactos/index.php";




// CONTACTOS

export async function obtenerContactos() {

    const response =
        await fetch(
            `${API}?accion=contactos-completos`
        );

    return await response.json();
}




// CATEGORÍAS

export async function obtenerCategorias() {

    const response =
        await fetch(
            `${API}?accion=categorias`
        );

    return await response.json();
}




// AGREGAR

export async function agregarContacto(contacto) {

    const response =
        await fetch(
            `${API}?accion=agregar-contacto`,
            {
                method: "POST",

                headers: {
                    "Content-Type":
                        "application/json"
                },

                body: JSON.stringify(contacto)
            }
        );

    const text =
        await response.text();

    console.log("RESPUESTA RAW:", text);

    return JSON.parse(text);
}




// ACTUALIZAR

export async function actualizarContacto(contacto) {

    const response =
        await fetch(
            `${API}?accion=actualizar-contacto`,
            {
                method: "PUT",

                headers: {
                    "Content-Type":
                        "application/json"
                },

                body: JSON.stringify(contacto)
            }
        );

    return await response.json();
}




// ELIMINAR

export async function eliminarContacto(id_contacto) {

    const response =
        await fetch(
            `${API}?accion=eliminar-contacto`,
            {
                method: "DELETE",

                headers: {
                    "Content-Type":
                        "application/json"
                },

                body: JSON.stringify({
                    id_contacto
                })
            }
        );

    return await response.json();
}