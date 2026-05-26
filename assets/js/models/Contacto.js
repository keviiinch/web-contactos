export default class Contacto {

    constructor(
        id_contacto,
        nombre,
        apellido,
        fecha_nacimiento,
        id_categoria
    ) {

        this.id_contacto = id_contacto;
        this.nombre = nombre;
        this.apellido = apellido;
        this.fecha_nacimiento = fecha_nacimiento;
        this.id_categoria = id_categoria;
    }
}