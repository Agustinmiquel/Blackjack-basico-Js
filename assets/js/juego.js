let deck = [];
const shuffleDeck = () => {
    deck.sort(() => Math.random() - 0.5);
};

const cartas= ['C','D','H','S'];
const especiales= ['K','A','J','Q'];

let puntosJugador = 0; 
let puntosComputadora = 0;

//REFERENCIAS AL HTML 
const pedir = document.querySelector('#btnPedir'); 
//traigo el id de pedir del html y con addeventListener 

const divJugadorCartas = document.querySelector('#jugador-cartas'); 
//arriba hago referencia al ID en el html de las img de cartas del jugador que saldrian. 
const divCartasComputadora = document.querySelector ('#computadora-cartas');

const puntosHTML = document.querySelectorAll('small');
//traigo el small al lado de la clase del jugador, pero traigo todas las referencias, por eso el ALL.  

const nuevo = document.querySelector('#btnNuevo'); 
const detener = document.querySelector('#btnDetener'); 
//creo unas constantes porque estos botones van a ser muy usados en el juego 

const creardeck = () => {

    for (let i=2; i<=10; i++){
    for (let carta of cartas)
    deck.push(i+ carta)
}

for (let carta of cartas) {
    for (let esp of especiales){
    deck.push(esp + carta)
    }
}

    console.log (deck);
    return deck;
};

//FUNCION PEDIR CARTA 

const Pedircarta = () => {
    if (deck.length===0) {
        throw 'ya no hay mas cartas'
    }

    const carta= deck.pop();

    console.log(deck.length);
    console.log(carta); //de la baraja
    return carta;
};

const Valorcarta = (carta) => { //entre parentesis la carta como parametro que envio

const valor = carta.substring(0, carta.length -1); //me quita la ultima letra a todos los valores de la  variable 

return (isNaN (valor) ) ?
       (valor ==='A')  ? 11 : 10
       :(valor * 1);

};

//TURNO DE LA COMPUTADORA: detenerse cuando le indiquemos y dejar de pedir cartas cuando ganamos. 

const turnoComputadora = (puntosminimos) => {
 do {
    const carta= Pedircarta(); 
    //El valor de la carta lo tengo arriba. La constante de la carta q valdra su funcion respectiva. 
    puntosComputadora = puntosComputadora + Valorcarta(carta);

    puntosHTML[1].innerText = puntosComputadora; 

    // <img class="carta" src="assets/cartas/10C.png"/>
    const imgCarta = document.createElement('img'); 
    imgCarta.src= `assets/cartas/${carta}.png`;
    imgCarta.classList.add('carta'); 
    
    divCartasComputadora.append(imgCarta);
    if (puntosminimos > 21){
        break;
    }

 } while ( (puntosComputadora > puntosminimos) && (puntosminimos<=21))

 setTimeout(() => {
    
 //El SETTIMEOUT es una funcion de javascript que ejecuta un callback en una cantidad de milisegundos. Luego del do while, se ejecuta esto en 10 mil

    //Alertas que aparecen luego de finalizar el juego segun condiciones: 
    if (puntosminimos > 21){
        alert('computadora gana');
    } else if (puntosminimos === 21){
        alert('Ganaste');
    } else if (puntosComputadora > 21) {
        alert('Jugador gano');
    }
}, 10);
};


//EVENTOS PEDIR CARTA: 
pedir.addEventListener('click', () => {
    const carta= Pedircarta(); 
    //El valor de la carta lo tengo arriba. La constante de la carta q valdra su funcion respectiva. 
    puntosJugador = puntosJugador + Valorcarta(carta);

    puntosHTML[0].innerText = puntosJugador; 

    // <img class="carta" src="assets/cartas/10C.png"/>
    const imgCarta = document.createElement('img'); 
    imgCarta.src= `assets/cartas/${carta}.png`;
    imgCarta.classList.add('carta'); 
    
    divJugadorCartas.append(imgCarta);

    if ( puntosJugador > 21){
        console.warn('Lo siento, perdiste')
        pedir.disabled = true; 
        detener.disabled = true; 
        turnoComputadora(puntosJugador)
    } else if (puntosJugador === 21){
        pedir.disabled = true; 
        detener.disabled = true; 
        console.warn ('21, Ganaste!')
        turnoComputadora(puntosJugador)
    }

});

detener.addEventListener('click', () => {
pedir.disabled = true;
detener.disabled = true;

turnoComputadora (puntosJugador)

}); 

nuevo.addEventListener('click', () => {
    console.clear();
    //para limpiar la consola
    deck=[];
    //para que el deck se resetee a su valor original 
    deck= creardeck();
    puntosComputadora=0;
    puntosJugador=0; 
    
    puntosHTML[0].innerText= 0; 
    puntosHTML[1].innerText= 0;
    
    //innerText es para q se reinicie el valor en html de los puntajes. 

    divCartasComputadora.innerHTML= ''; 
    divJugadorCartas.innerHTML= '';
    //va el innerHtml asi se borran las cartas de la vista 

    pedir.disabled = false;
    detener.disabled = false;
    
});


creardeck();
shuffleDeck();
console.log(deck);
//Pedircarta();
const valor = Valorcarta ( Pedircarta ());
console.log ({valor});
