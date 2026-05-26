import {

    obtenerContactos,

    obtenerCategorias,

    agregarContacto,

    actualizarContacto,

    eliminarContacto

} from "../api/contactosApi.js";



export default class ContactoService {

    async listar() {

        return await obtenerContactos();
    }


    async categorias() {

        return await obtenerCategorias();
    }


    async agregar(contacto) {

        return await agregarContacto(contacto);
    }


    async actualizar(contacto) {

        return await actualizarContacto(contacto);
    }


    async eliminar(id) {

        return await eliminarContacto(id);
    }
}