export class Nave {
    color;
    ancho;
    nombre;
    alto;
    posicion_X;
    posicion_Y;

    constructor(posicion_X, posicion_Y, color, nombre, ancho, alto) {
        this.posicion_X = posicion_X;
        this.posicion_Y = posicion_Y;
        this.color = color;
        this.nombre = nombre;
        this.ancho = ancho;
        this.alto = alto;
    }
}
