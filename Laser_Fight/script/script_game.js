import {Nave} from "./objetos/Nave.js";
import {NaveEnum} from "./enums/NaveEnum.js";
import {EscenarioEnum} from "./enums/EscenarioEnum.js";

//Elemento para reproducir música
const musicaFondo = document.getElementById('musica-fondo');
musicaFondo.volume = 0.5;
musicaFondo.play();

// Referencia inicial al canvas y su respectivo contexto 2d
let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");
let juegoEnCurso = true;

//Código que carga la imagen de la nave
const naveImage = new Image();
naveImage.src = 'assets/Nave.jpg';

// Controles nave 1 (Izquierda)
let botonIzquierdoNav1 = false;
let botonDerechoNav1 = false;
let botonArribaNav1 = false;
let botonAbajoNav1 = false;

// Controles nave 2 (Derecha)
let botonIzquierdoNav2 = false;
let botonDerechoNav2 = false;
let botonArribaNav2 = false;
let botonAbajoNav2 = false;

// Estado de los disparos
let dispararIzquierda;
let dispararDerecha;

// Enfriamiento de los disparos
let ultimoDisparoIzquierda = Date.now();
let ultimoDisparoDerecha = Date.now();
const tiempoEntreDisparos = EscenarioEnum.TIEMPO_ESPERA;

// Coleccion de balas
let balas = [];

let naveLeft = new Nave(
    NaveEnum.POSICION_INICIAL_X_NAV_1,
    NaveEnum.POSICION_INICIAL_Y_NAV,
    NaveEnum.COLOR_NAV_1,
    NaveEnum.NOMBRE_NAV_1,
    NaveEnum.LARGO_NAV,
    NaveEnum.ALTO_NAV,)

let naveRight = new Nave(
    NaveEnum.POSICION_INICIAL_X_NAV_2,
    NaveEnum.POSICION_INICIAL_Y_NAV,
    NaveEnum.COLOR_NAV_2,
    NaveEnum.NOMBRE_NAV_2,
    NaveEnum.LARGO_NAV,
    NaveEnum.ALTO_NAV)


document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);


// keyUpHandler se activa cuando generas click y keyDownHandler cuando lo sueltas,
// por lo que está para limpiar cualquier activación
function keyUpHandler(e) {

    /*--|Manejo de disparos|---------------------------------------------------------------------------------------*/
    if (e.key === " ") {
        dispararIzquierda = false;
    } else if (e.key === "-") {
        dispararDerecha = false;
    }

    /*--|Jugabilidad izquierda|---------------------------------------------------------------------------------------*/
    if (e.key === "a") {
        botonIzquierdoNav1 = false;
    } else if (e.key === "d") {
        botonDerechoNav1 = false;
    }

    if (e.key === "w") {
        botonArribaNav1 = false;
    } else if (e.key === "s") {
        botonAbajoNav1 = false;
    }

    /*--|Jugabilidad derecha|-----------------------------------------------------------------------------------------*/
    if (e.key === "ArrowLeft") {
        botonIzquierdoNav2 = false;
    } else if (e.key === "ArrowRight") {
        botonDerechoNav2 = false;
    }

    if (e.key === "ArrowUp") {
        botonArribaNav2 = false;
    } else if (e.key === "ArrowDown") {
        botonAbajoNav2 = false;
    }

}

function keyDownHandler(e) {

    /*--|Manejo de disparos|---------------------------------------------------------------------------------------*/
    const tiempoActual = Date.now();

    // Disparo para la nave izquierda con la tecla "espacio"
    if (e.key === " " && tiempoActual - ultimoDisparoIzquierda > tiempoEntreDisparos) {
        let bala = drawBall(naveLeft);
        balas.push(bala);
        ultimoDisparoIzquierda = tiempoActual;
    }

    // Disparo para la nave derecha con la tecla "-"
    if (e.key === "-" && tiempoActual - ultimoDisparoDerecha > tiempoEntreDisparos) {
        let bala = drawBall(naveRight);
        balas.push(bala);
        ultimoDisparoDerecha = tiempoActual;
    }

    /*--|Jugabilidad izquierda|---------------------------------------------------------------------------------------*/
    if (e.key === "a") {
        botonIzquierdoNav1 = true;
    } else if (e.key === "d") {
        botonDerechoNav1 = true;
    }

    if (e.key === "w") {
        botonArribaNav1 = true;
    } else if (e.key === "s") {
        botonAbajoNav1 = true;
    }

    /*--|Jugabilidad derecha|-----------------------------------------------------------------------------------------*/
    if (e.key === "ArrowLeft") {
        botonIzquierdoNav2 = true;
    } else if (e.key === "ArrowRight") {
        botonDerechoNav2 = true;
    }

    if (e.key === "ArrowUp") {
        botonArribaNav2 = true;
    } else if (e.key === "ArrowDown") {
        botonAbajoNav2 = true;
    }

}

function drawPlayer(nave, rotation) {
    //Le pasas la nave y el angulo de rotacion de la imagen

    ctx.save();
    ctx.translate(nave.posicion_X + nave.ancho / 2, nave.posicion_Y + nave.alto / 2);
    ctx.rotate(rotation);
    ctx.drawImage(naveImage, -nave.ancho / 2, -nave.alto / 2, nave.ancho, nave.alto);
    ctx.restore();
}

function drawBall(nave) {
    ctx.beginPath();
    if (nave.nombre === "Nave izquierda") {
        return {
            eje_x: nave.posicion_X + 50,
            eje_y: nave.posicion_Y + 20,
            speed: EscenarioEnum.VELOCIDAD,
            radius: EscenarioEnum.RADIO,
            color: nave.color
        }

    } else if (nave.nombre === "Nave derecha") {
        return {
            eje_x: nave.posicion_X + 10,
            eje_y: nave.posicion_Y + 20,
            speed: EscenarioEnum.VELOCIDAD,
            radius: EscenarioEnum.RADIO,
            color: nave.color
        }
    }

    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

// Esto fue ChatGPT, no se me ocurrió con hacerlo con círculos y cuadrados.
// Cuando son iguales no estaba complicado pero diferentes figuras de va a roma
function detectCollision(square, circle) {
    // Calcula la distancia entre el centro del círculo y el borde del cuadrado más cercano en cada eje
    let distX = Math.abs(circle.eje_x - square.posicion_X - square.ancho / 2);
    let distY = Math.abs(circle.eje_y - square.posicion_Y - square.alto / 2);

    // Si la distancia en ambos ejes es mayor que el radio del círculo, no hay colisión
    if (distX > (square.ancho / 2 + circle.radius) || distY > (square.alto / 2 + circle.radius)) {
        return false;
    }

    // Si la distancia en ambos ejes es menor o igual al radio del círculo, hay colisión
    if (distX <= (square.ancho / 2) || distY <= (square.alto / 2)) {
        return true;
    }

    // Comprueba la colisión en las esquinas del cuadrado
    let dx = distX - square.ancho / 2;
    let dy = distY - square.alto / 2;
    return (dx * dx + dy * dy <= (circle.radius * circle.radius));
}

function takeLifePlayer(idNave, nave) {
    console.log("Se le ha dado a la nave");
    let vida = document.getElementById(idNave)
    vida.value = vida.value - NaveEnum.DANNO_BALA;

    if (nave.nombre === NaveEnum.NOMBRE_NAV_1 && vida.value <= 0) {
        return declareWinner(NaveEnum.NOMBRE_NAV_2);

    } else if (nave.nombre === NaveEnum.NOMBRE_NAV_2 && vida.value <= 0) {
        return declareWinner(NaveEnum.NOMBRE_NAV_1);
    }

}

function declareWinner(nave) {
    alert("Juego terminado, Ah ganado " + nave)
    window.location.reload();
    return true;
}

function draw() {

    ctx.clearRect(0, 0, canvas.width, canvas.height);


    /*--|Jugabilidad izquierda|---------------------------------------------------------------------------------------*/
    drawPlayer(naveLeft, Math.PI / 2)
    if (dispararIzquierda) {
        let bala = drawBall(naveLeft);
        balas.push(bala);
    }

    if (botonIzquierdoNav1 && naveLeft.posicion_X > 0) {
        naveLeft.posicion_X -= NaveEnum.MOVIMIENTO_NAV_X;
    }

    if (botonDerechoNav1 && naveLeft.posicion_X < EscenarioEnum.LIMITE_MAPA_MITAD_X - NaveEnum.LARGO_NAV) {
        naveLeft.posicion_X += NaveEnum.MOVIMIENTO_NAV_X;
    }

    if (botonArribaNav1 && naveLeft.posicion_Y > 0) {
        naveLeft.posicion_Y -= NaveEnum.MOVIMIENTO_NAV_Y;
    }

    if (botonAbajoNav1 && naveLeft.posicion_Y < EscenarioEnum.LIMITE_MAPA_Y - NaveEnum.ALTO_NAV) {
        naveLeft.posicion_Y += NaveEnum.MOVIMIENTO_NAV_Y;
    }

    /*--|Jugabilidad derecha|-----------------------------------------------------------------------------------------*/
    drawPlayer(naveRight, -Math.PI / 2)
    if (dispararDerecha) {
        let bala = drawBall(naveRight);
        balas.push(bala);
    }

    if (botonIzquierdoNav2 && naveRight.posicion_X > EscenarioEnum.LIMITE_MAPA_MITAD_X) {
        naveRight.posicion_X -= NaveEnum.MOVIMIENTO_NAV_X;
    }

    if (botonDerechoNav2 && naveRight.posicion_X < EscenarioEnum.LIMITE_MAPA_X - NaveEnum.LARGO_NAV) {
        naveRight.posicion_X += NaveEnum.MOVIMIENTO_NAV_X;
    }

    if (botonArribaNav2 && naveRight.posicion_Y > 0) {
        naveRight.posicion_Y -= NaveEnum.MOVIMIENTO_NAV_Y;
    }

    if (botonAbajoNav2 && naveRight.posicion_Y < EscenarioEnum.LIMITE_MAPA_Y - NaveEnum.ALTO_NAV) {
        naveRight.posicion_Y += NaveEnum.MOVIMIENTO_NAV_Y;
    }

    if (!juegoEnCurso) {
        return;
    }

    // Actualiza y dibuja las balas, y verifica colisiones
    for (let i = balas.length - 1; i >= 0; i--) {
        let bala = balas[i];

        if (bala.color === "blue") {
            bala.eje_x += bala.speed;
        } else {
            bala.eje_x -= bala.speed;
        }

        // Verifica si la bala sale de la pantalla
        if (bala.eje_x < 0 || bala.eje_x > canvas.width) {
            balas.splice(i, 1);
            continue;
        }

        ctx.beginPath();
        ctx.arc(bala.eje_x, bala.eje_y, bala.radius, 0, Math.PI * 2);
        ctx.fillStyle = bala.color;
        ctx.fill();
        ctx.closePath();

        // Verifica las colisiones
        if (bala.color === "blue" && detectCollision(naveRight, bala)) {
            balas.splice(i, 1); // Elimina la bala
            if (takeLifePlayer("derecha-vida", naveRight)) {
                juegoEnCurso = false;
                return;
            }
        } else if (bala.color === "red" && detectCollision(naveLeft, bala)) {
            balas.splice(i, 1); // Elimina la bala
            if (takeLifePlayer("izquierda-vida", naveLeft)) {
                juegoEnCurso = false;
                return;
            }
        }
    }

    requestAnimationFrame(draw);
}

requestAnimationFrame(draw);