console.log(document.getElementById("formulario"));

document.getElementById("formulario").addEventListener("submit", function (event) {
    event.preventDefault();
}, false);

// cada item desta array é um jogador, playerList[0] é o jogador 1, playerList[1] é o jogador 2...
let playersList = [];

class objetoPlayer {

    constructor(dados, nome) { // dados = número de dados, pego pela função pegar info, o mesmo para o nome

        this.nome = nome; // nome do jogador

        let d = [];  // número de dados

        for (let i = 0; i < dados; i++) {
            d.push(1);
        }
        // console.log(d);

        // this.elemento = <div class="player"> modificada com o nome e número de dados adequados
        this.elemento = criarElementoPlayer(playersList.length, {
            nome: nome,
            dados: d,
        });

        this.dados = d;

        // console.log(d);
    }

    soma() {
        return somarArray(this.dados);
    }

    rolar() {
        this.dados = rolarArray(this.dados);

        let pai = this.elemento;

        let elementos = pai.childNodes;

        // console.log(elementos);

        let faces = [];

        for (let i = 0; i < elementos.length; i++) {

            if (elementos[i].className === "dadoDentro") {

                let dadoDentro = elementos[i];

                for (let j = 0; j < dadoDentro.childNodes.length; j++) {

                    if (dadoDentro.childNodes[j].className === "face") {

                        faces.push(dadoDentro.childNodes[j]);
                    }
                }
            }
        }

        for (let i = 0; i < this.dados.length; i++) {
            faces[i].src = `face${this.dados[i]}.png`;
        }

        console.log(this.soma());

        return this.dados;
    }
}

function mostrarVencedor() {

    let numPlayers = playersList.length;
    let maiorNum = 0;

    for (let i = 0; i < numPlayers; i++) {
        if (playersList[maiorNum].soma() < playersList[i].soma()) {
            maiorNum = i;
        }
    }

    alert(playersList[maiorNum].nome);
}

// cria um novo player
function criarElementoPlayer(i, player) {

    // console.log(player);
    let players = document.getElementsByClassName("num_players")[0];  // pega a <div class="num_players"> lá do html

    // console.log(players);

    let example = document.createElement("div");  // cria <div>
    example.classList.add("player");  // <div class="player">

    // console.log(i);

    let id = `player_${i}`;  // cria um id="player[X]">

    let title = document.createElement("h1");  // cria <h1>
    title.innerHTML = `${player.nome}`;  // escreve o que ta dentro do h1
    example.appendChild(title); // adiciona o title como filho do example

    let input = document.createElement("input");  // cria <input>
    input.type = "button";  // <input type="button">
    input.value = "rolar dados";  // <input type="value">
    input.id = `${id}_button`;  // <input id="player_X_button">

    input.onclick = function () {  // quando clicar no input roda essa função
        playersList[i].rolar();
    }

    for (let x = 0; x < player.dados.length; x++) {
        example.appendChild(criarDado(x));  //cria o primeiro dado
    }

    example.appendChild(input);  // adiciona o input como filho do example

    players.appendChild(example); // adiciona o example como filho do players

    return example; // retorna a <div class="player">
}

// cria o html do dado
function criarDado(n) {

    let dado = document.createElement("div");  // cria <div>
    dado.classList.add("dadoDentro"); // <div class="dadoDentro">

    let imagemDado = document.createElement("img"); // cria <img>
    imagemDado.src = "face1.png"; // <img src="face1.png">
    imagemDado.classList.add("face"); // <img class="face">

    dado.appendChild(imagemDado); // bota a <img class="face"> dentro da <div class="dadoDentro"> 
    return dado;
}

// pega os dados e atribui um valor aleatório à cada dado
function rolarArray(ar) {

    for (let i = 0; i < ar.length; i++) {
        let sorteio = Math.floor(Math.random() * 6 + 1);

        ar[i] = sorteio;
    }

    return ar;
}

// soma os valores aleatórios da funçao rolarArray e retorna esta soma
function somarArray(ar) {

    let x = 0;

    for (let i = 0; i < ar.length; i++) {

        x = x + ar[i];
    }
    return x;

}

/* toda vez que clicar no "Ok" é adicionado mais um ítem no array playerList[], sendo este ítem 
   um "objetoPlayer" */
function pegarInfo() {
    let nomeElemento = document.getElementById("inputNome");
    let dadoElemento = document.getElementById("inputDados");

    // console.log(nomeElemento);
    // console.log(dadoElemento);

    playersList.push(new objetoPlayer(dadoElemento.value, nomeElemento.value));

    // console.log(playersList);
}