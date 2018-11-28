// variables globales
var field = "";
var father = "";
var son = "";
var movement = "";
var playerTurn = "rojo";
var atak = false;
var move = true;
var redTanks = [
    '<img src="img/infanteriaR.png">',
    '<img src="img/infanteriaR.png">',
    '<img src="img/tanqueR.png">',
    '<img src="img/artilleriaR.png">',
    '<img src="img/infanteriaR.png">',
    '<img src="img/infanteriaR.png">',
    '<img src="img/tanqueR.png">',
    '<img src="img/artilleriaR.png">',
    '<img src="img/artilleriaR.png">',
    '<img src="img/tanqueR.png">',
    '<img src="img/infanteriaR.png">',
    '<img src="img/infanteriaR.png">',
    '<img src="img/artilleriaR.png">',
    '<img src="img/tanqueR.png">',
    '<img src="img/infanteriaR.png">',
    '<img src="img/infanteriaR.png">'
];
var blueTanks = [
    '<img src="img/infanteriaA.png">',
    '<img src="img/infanteriaA.png">',
    '<img src="img/tanqueA.png">',
    '<img src="img/artilleriaA.png">',
    '<img src="img/infanteriaA.png">',
    '<img src="img/infanteriaA.png">',
    '<img src="img/tanqueA.png">',
    '<img src="img/artilleriaA.png">',
    '<img src="img/artilleriaA.png">',
    '<img src="img/tanqueA.png">',
    '<img src="img/infanteriaA.png">',
    '<img src="img/infanteriaA.png">',
    '<img src="img/artilleriaA.png">',
    '<img src="img/tanqueA.png">',
    '<img src="img/infanteriaA.png">',
    '<img src="img/infanteriaA.png">'
];


// tipos de fichas
var tank = {
    name: "Tank",
    range: 3,
    movility: 3
};
var infantery = {
    name: "Infantery",
    range: 1,
    movility: 4
};
var artillery = {
    name: "Artillery",
    range: 4,
    movility: 1
};


// boton para cambiar de turno y cambiar el color de los botones


function changeTurn() {
    if (playerTurn == "rojo") {
        playerTurn = "azul";
        document.getElementById('button').classList.remove('rojo');
        document.getElementById('button').classList.add('azul');
        document.getElementById('atak').classList.remove('rojo');
        document.getElementById('atak').classList.add('azul');
        document.getElementById('move').classList.remove('rojo');
        document.getElementById('move').classList.add('azul');
        console.log("turno de las azules")
    } else {
        playerTurn = "rojo";
        document.getElementById('button').classList.remove('azul');
        document.getElementById('button').classList.add('rojo');
        document.getElementById('atak').classList.remove('azul');
        document.getElementById('atak').classList.add('rojo');
        document.getElementById('move').classList.remove('azul');
        document.getElementById('move').classList.add('rojo');
        console.log("turno de las rojas")
    }

    for (var p = 0; p < 256; p++) {
        paintedCells[p].classList.remove("stay");

    }
    document.getElementById('2-2').classList.add("capitalRed");
    document.getElementById('13-13').classList.add("capitalGreen");
}

// funcion para saber si mover las piezas o atacar

function atakFunction() {
    atak = true;
    move = false;
    console.log("atak is " + atak);
    console.log("move is " + move);
}

function moveFunction() {
    atak = false;
    move = true;
    console.log("atak is " + atak);
    console.log("move is " + move);
}
// recoger y desplegar los botones

function display1() {
    document.getElementById('button').classList.add('buttonDisplay');
    document.getElementById('button').classList.remove('button');
}

function displayNone1() {
    document.getElementById('button').classList.remove('buttonDisplay');
    document.getElementById('button').classList.add('button');
}


function display2() {
    document.getElementById('atak').classList.add('atakDisplay');
    document.getElementById('atak').classList.remove('atak');
}

function displayNone2() {
    document.getElementById('atak').classList.remove('atakDisplay');
    document.getElementById('atak').classList.add('atak');
}
// **************
function display3() {
    document.getElementById('move').classList.add('moveDisplay');
    document.getElementById('move').classList.remove('move');
}

function displayNone3() {
    document.getElementById('move').classList.remove('moveDisplay');
    document.getElementById('move').classList.add('move');
}



// creacion del terreno
function createField() {
    field = document.getElementById("field");

    for (e = 0; e < 16; e++) {
        var row = field.insertRow();
        for (c = 0; c < 16; c++) {
            // inclucion de las fichas dentro de las celdas
            var cell = row.insertCell();
            cell.setAttribute("onclick", "play(this)");
            cell.setAttribute("id", e + '-' + c)
            if (e == 0) cell.innerHTML = '<span class = rojo id = rojo>' + redTanks[c] + '</span>';
            else if (e == 15) cell.innerHTML = '<span class = azul id = azul>' + blueTanks[c] + '</span>';
        }
    }
}

function play(T) {
    console.log("click en la celda = " + T.id)
    elements = document.querySelectorAll("table, table span ");
    paintedCells = document.querySelectorAll("table, table td");

    // condiciones de movimiento del tanque
    if (!movement && T.firstElementChild) {
        if (T.firstElementChild.id == playerTurn) {
            if (move == true) {
                if (!T.classList.contains("stay")) {
                    if (T.innerHTML[43] == "t") {
                        console.log(T.innerHTML[43])
                        father = T;
                        son = T.innerHTML;
                        for (i = 0; elements[i]; i++) elements[i].classList.add("hand");
                        T.querySelector("span").style.opacity = ".4";
                        movement = true;

                        // pasando los atributos de id y alcance
                        var cells = getRange(T.id, tank.movility);
                        console.log(cells);
                        for (var w = 0; w < cells.length; w++) {
                            document.getElementById(cells[w]).classList.add("green");
                        }
                    }

                }

            }
        }

    } else if (movement) {
        if (T.classList.value == "green" || T.classList.value == "capitalRed green" || T.classList.value == "capitalGreen green") {
            if (T.innerHTML[1] != "s") {
                father.innerHTML = "";
                T.innerHTML = son;

                document.getElementById(T.id).classList.add("stay")
                for (i = 0; elements[i]; i++) elements[i].classList.remove("hand");
                movement = false;
                T.classList.remove("capital");
                cleaning();
            }
        }
    }
    // funcion para destruir un tanque enemigo
    if (!movement && T.firstElementChild) {
        if (T.firstElementChild.id == playerTurn) {
            if (atak == true) {
                if (!T.classList.contains("stay")) {
                    if (T.innerHTML[43] == "t") {
                        father = T;
                        son = T.innerHTML;
                        for (i = 0; elements[i]; i++) elements[i].classList.add("hand");
                        movement = true;

                        // pasando los atributos de id y alcance
                        var cells = getRange(T.id, tank.range);
                        console.log("rango de ataque = " + cells);
                        for (var w = 0; w < cells.length; w++) {
                            document.getElementById(cells[w]).classList.add("red");
                        }
                        // marcando el lugar desde donde ataco
                        document.getElementById(T.id).classList.add("stay");
                    }

                }
            }
        }

    } else if (movement) {
        if (T.classList.value == "red" || T.classList.value == "capitalRed red" || T.classList.value == "capitalGreen red") {

            T.innerHTML = "";
            for (i = 0; elements[i]; i++) elements[i].classList.remove("hand");
            movement = false;
            cleaning()
            document.getElementById(T.id).classList.add("explosion");
        }
    }

    // condiciones de movimiento de la infanteria

    if (!movement && T.firstElementChild) {
        if (T.firstElementChild.id == playerTurn) {
            if (move == true) {
                if (!T.classList.contains("stay")) {
                    if (T.innerHTML[43] == "i") {
                        console.log(T.innerHTML[43])
                        father = T;
                        son = T.innerHTML;
                        for (i = 0; elements[i]; i++) elements[i].classList.add("hand");
                        T.querySelector("span").style.opacity = ".4";
                        console.log("se declara movimiento verdadero");
                        movement = true;

                        // pasando los atributos de id y alcance
                        var cells = getRange(T.id, infantery.movility);
                        console.log(cells);
                        for (var w = 0; w < cells.length; w++) {
                            document.getElementById(cells[w]).classList.add("green");
                        }
                    }

                }

            }
        }

    } else if (movement) {
        if (T.classList.value == "green" || T.classList.value == "capitalRed green" || T.classList.value == "capitalGreen green"  || T.classList.value == "capitalGreen stay green" || T.classList.value == "capitalRed stay green") {
            if (T.innerHTML[1] != "s") {
                father.innerHTML = "";
                T.innerHTML = son;
                document.getElementById(T.id).classList.add("stay")
                for (i = 0; elements[i]; i++) elements[i].classList.remove("hand");
                movement = false;
                cleaning()
            }
        }
    }
    // funcion para destruir una infanteria enemiga
    if (!movement && T.firstElementChild) {
        if (T.firstElementChild.id == playerTurn) {
            if (atak == true) {
                if (!T.classList.contains("stay")) {
                    if (T.innerHTML[43] == "i") {
                        father = T;
                        son = T.innerHTML;
                        for (i = 0; elements[i]; i++) elements[i].classList.add("hand");
                        movement = true;

                        // pasando los atributos de id y alcance
                        var cells = getRange(T.id, infantery.range);
                        console.log("rango de ataque = " + cells);
                        for (var w = 0; w < cells.length; w++) {
                            document.getElementById(cells[w]).classList.add("red");
                        }
                        // marcando el lugar desde donde ataco
                        document.getElementById(T.id).classList.add("stay")
                    }

                }
            }
        }

    } else if (movement) {
        if (T.classList.value == "red" || T.classList.value == "capitalRed red" || T.classList.value == "capitalGreen red") {

            T.innerHTML = "";
            for (i = 0; elements[i]; i++) elements[i].classList.remove("hand");
            movement = false;
            cleaning()
            document.getElementById(T.id).classList.add("explosion");
        }
    }

    // condiciones de movimiento de la artilleria

    if (!movement && T.firstElementChild) {
        if (T.firstElementChild.id == playerTurn) {
            if (move == true) {
                if (!T.classList.contains("stay")) {
                    if (T.innerHTML[43] == "a") {
                        console.log(T.innerHTML[43])
                        father = T;
                        son = T.innerHTML;
                        for (i = 0; elements[i]; i++) elements[i].classList.add("hand");
                        T.querySelector("span").style.opacity = ".4";
                        movement = true;

                        // pasando los atributos de id y alcance
                        var cells = getRange(T.id, artillery.movility);
                        console.log(cells);
                        for (var w = 0; w < cells.length; w++) {
                            document.getElementById(cells[w]).classList.add("green");
                        }
                    }

                }

            }
        }
        console.log("el contenido es "+T.classList)
    } else if (movement) {
        if (T.classList.value == "green" || T.classList.value == "capitalRed green" || T.classList.value == "capitalGreen green" || T.classList.value == "capitalGreen stay green" || T.classList.value == "capitalRed stay green") {
            if (T.innerHTML[1] != "s") {
                father.innerHTML = "";
                T.innerHTML = son;
                
                document.getElementById(T.id).classList.add("stay")
                for (i = 0; elements[i]; i++) elements[i].classList.remove("hand");
                movement = false;
                cleaning()
            }
        }
    }
    // funcion para destruir una artilleria enemiga
    if (!movement && T.firstElementChild) {
        if (T.firstElementChild.id == playerTurn) {
            if (atak == true) {
                if (!T.classList.contains("stay")) {
                    if (T.innerHTML[43] == "a") {
                        father = T;
                        son = T.innerHTML;
                        for (i = 0; elements[i]; i++) elements[i].classList.add("hand");
                        movement = true;

                        // pasando los atributos de id y alcance
                        var cells = getRange(T.id, artillery.range);
                        console.log("rango de ataque = " + cells);
                        for (var w = 0; w < cells.length; w++) {
                            document.getElementById(cells[w]).classList.add("red");
                        }
                        // marcando el lugar desde donde ataco
                        document.getElementById(T.id).classList.add("stay")
                    }

                }
            }
        }

    } else if (movement) {
        if (T.classList.value == "red" || T.classList.value == "capitalRed red" || T.classList.value == "capitalGreen red") {

            T.innerHTML = "";
            for (i = 0; elements[i]; i++) elements[i].classList.remove("hand");
            movement = false;
            cleaning()
            document.getElementById(T.id).classList.add("explosion");
        }
    }
    // limpiando todas las celdas coloreadas de verde
    function cleaning() {
        for (var z = 0; z < 257; z++) {
            paintedCells[z].classList.remove("green");
            paintedCells[z].classList.remove("red");
            paintedCells[z].classList.remove("explosion");
        }
    }
    // funcion para ganar
    //*************************************************************************** */
    // esta funcion debe cambiarce cuando se agreguen las imagenes de los tanques


    function wining() {
        // var redCapital = document.getElementById('2-2');
        // var blueCapital = document.getElementById('13-13');

        if (document.getElementById('2-2').innerHTML == '<span class="azul" id="azul"><img src="img/tanqueA.png"></span>') {
            Alert.render('Blue Wins.');
        } else if (document.getElementById('13-13').innerHTML == '<span class="rojo" id="rojo"><img src="img/tanqueR.png"></span>') {
            Alert.render('Red Wins.');
        }else if (document.getElementById('13-13').innerHTML == '<span class="rojo" id="rojo"><img src="img/artilleriaR.png"></span>') {
            Alert.render('Red Wins.');
        }else if (document.getElementById('2-2').innerHTML == '<span class="azul" id="azul"><img src="img/artilleriaA.png"></span>') {
            Alert.render('Blue Wins.');
        }else if (document.getElementById('13-13').innerHTML == '<span class="rojo" id="rojo"><img src="img/infanteriaR.png"></span>') {
            Alert.render('Red Wins.');
        }else if (document.getElementById('2-2').innerHTML == '<span class="azul" id="azul"><img src="img/infanteriaA.png"></span>') {
            Alert.render('Blue Wins.');
        }
    }

    wining();
}

// receives a cord and returns you all cells within that range
function getRange(id, range) {
    // split id and get cords
    var cords = id.split('-');
    var x = cords[0] * 1;
    var y = cords[1] * 1;

    var area = [];
    // ***********************
    var chadow = document.querySelectorAll("td");
    for (var r = 0; r < chadow.length; r++) {
        var c = chadow[r].id;
        var cSplit = c.split('-');
        var x1 = cSplit[0] * 1;
        var y1 = cSplit[1] * 1;

        if (Math.abs(x1 - x) <= range && Math.abs(y1 - y) <= range) {
            area.push(c);
        }
    }



    return area;
}

// cartel de start
function start() {
    document.getElementById("field").innerHTML = "";
    createField();
    document.getElementById('overStart').classList.add('startNone');
    document.getElementById('2-2').classList.add("capitalRed");
    document.getElementById('13-13').classList.add("capitalGreen");

}

// mejorando el cartel de ganador
function CustomAlert(){
    this.render = function(dialog){
        var winW = window.innerWidth;
        var winH = window.innerHeight;
        var dialogoverlay = document.getElementById('dialogoverlay');
        var dialogbox = document.getElementById('dialogbox');
        dialogoverlay.style.display = "block";
        dialogoverlay.style.height = winH+"px";
        dialogbox.style.left = (winW/2) - (550 * .5)+"px";
        dialogbox.style.top = "100px";
        dialogbox.style.display = "block";
        document.getElementById('dialogboxhead').innerHTML = "Congratulations";
        document.getElementById('dialogboxbody').innerHTML = dialog;
        document.getElementById('dialogboxfoot').innerHTML = '<button onclick="Alert.ok()">OK</button>';
    }
	this.ok = function(){
		document.getElementById('dialogbox').style.display = "none";
        document.getElementById('dialogoverlay').style.display = "none";
        start();
	}
}
var Alert = new CustomAlert();

