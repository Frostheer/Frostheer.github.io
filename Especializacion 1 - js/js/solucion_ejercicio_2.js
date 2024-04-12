// Objeto base para los personajes
class Character {
  constructor(name, health, damage, idVida, idImagen) {
    this.name = name;
    this.health = health;
    this.maxhealth = health;
    this.damage = damage;
    this.idVida = idVida;
    this.idImagen = idImagen;
  }

  // Verifica si el personaje está vivo
  isAlive() {
    return this.health > 0;
  }

  // Ataca a otro personaje seleccionado
  async attack(target) {
    heroeHit(this.idImagen);
    console.log(`${this.name} deals ${this.damage} DMG to ${target.name}`);
    modificarBarraProgueso(target.idVida,target.health,target.damage);
    target.health -= this.damage;

  }

  // Retorna la información actual del personaje
  status() {
    return `${this.name} - HP ${this.health}/${this.maxhealth}`;
  }
}



var vidaHeroe = getRandomBetween(1,100)
var vidaEnemigo = getRandomBetween(1,100)

setVidaBarraProgreso(vidaHeroe,"vida-heroe1");
setVidaBarraProgreso(vidaEnemigo, "vida-heroe2");

alert(" vida heroe = " + vidaHeroe + " Vida enemigo ="+ vidaEnemigo);

const hero = new Character("Heroe", vidaHeroe, getRandomBetween(5,10), "vida-heroe1", "imagen-heroe1");
const enemy = new Character("Limo", vidaEnemigo, getRandomBetween(5,10), "vida-heroe2", "imagen-heroe2");

document.addEventListener('keydown', function (event){
  if(event.key === 'x'){

    if(enemy.health > 0 && hero.health > 0){
      hero.attack(enemy);

      if(enemy.health <= 0){
        heroeMuerto(enemy.idImagen)
      }
    }

  }
  if(event.key === 'y'){
    if(hero.health > 0 && enemy.health > 0){
      enemy.attack(hero);

      if(hero.health <= 0){
        heroeMuerto(hero.idImagen)
      }
    }
  }

});

function setVidaBarraProgreso(vida,idVida){
  var barraDeVida = document.getElementById(idVida);

  barraDeVida.max = vida;
}

// Función para combatir
async function fight(firstCharacter, secondCharacter) {
  console.log("Empieza el combate!");
  console.log(firstCharacter.status());
  console.log(secondCharacter.status());

  while (true) {
    if (firstCharacter.isAlive()) {

    } else {
      await new Promise(resolve => setTimeout(resolve, 1500));
      heroeMuerto(firstCharacter.idImagen);
      console.log(`${firstCharacter.name} died!`);
      break;
    }

    if (secondCharacter.isAlive()) {
      await new Promise(resolve => setTimeout(resolve, 1500));
      secondCharacter.attack(firstCharacter).then(() => {
        console.log(firstCharacter.status());
        console.log(secondCharacter.status());
      });
    } else {
      heroeMuerto(secondCharacter.idImagen);
      console.log(`${secondCharacter.name} died!`);
      break;
    }
  }
}

async function heroeMuerto(id) {
  var imagen = document.getElementById(id);
  imagen.src = 'assets/palito-muerto.png';
}

async function heroeHit(id) {
  var imagen = document.getElementById(id);
  imagen.src = 'assets/palito-atacando.png';

  await new Promise(resolve => setTimeout(resolve, 500));

  heroeEstatic(id);
}
async function heroeEstatic(id) {
  var imagen = document.getElementById(id);
  imagen.src = 'assets/palito-estatico.png';
}

function modificarBarraProgueso(idVida,vidaActual,daño){
  var vida = document.getElementById(idVida);

  vida.value = vidaActual - daño;
}

function getRandomBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function startFight() {
  fight(hero, enemy);
}

