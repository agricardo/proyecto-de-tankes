// variables globales
var field = "";
var father = "";
var son = "";
var movement = "";
var playerTurn = "rojo";
var atak = false;
var move = false;

// tipos de fichas
var tank = {
    name: "tank",
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


// cartel de start
function start() {
    document.getElementById('overStart').classList.add('startNone');
}

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
            if (e == 0) cell.innerHTML = "<span class = rojo id = rojo>" + tank.name + "</span>";
            else if (e == 15) cell.innerHTML = "<span class = azul id = azul>" + tank.name + "</span>";
        }
    }
}

function play(T) {
    console.log("click en la celda = " + T.id)
    elements = document.querySelectorAll("table, table span ");
    paintedCells = document.querySelectorAll("table, table td");

    // condiciones de movimiento
    if (!movement && T.firstElementChild) {
        if (T.firstElementChild.id == playerTurn) {
            if (move == true) {
                father = T;
                son = T.innerHTML;
                for (i = 0; elements[i]; i++) elements[i].classList.add("hand");
                T.querySelector("span").style.opacity = ".4";
                movement = true;
                console.log("class = " + T.classList.value)
                console.log("id = " + T.id)

                // pasando los atributos de id y alcance
                var cells = getRange(T.id, tank.movility);
                console.log(cells);
                for (var w = 0; w < cells.length; w++) {
                    document.getElementById(cells[w]).classList.add("green");
                }
            }
        }

    } else if (movement) {
        if (T.classList.value == "green") {
            if (T.innerHTML[0] != "<") {
                father.innerHTML = "";
                T.innerHTML = son;

                // document.getElementById(T.id).classList.add("")
                for (i = 0; elements[i]; i++) elements[i].classList.remove("hand");
                movement = false;
            }
        }
    }
    // funcion para destruir un tanque enemigo
    if (!movement && T.firstElementChild) {
        if (T.firstElementChild.id == playerTurn) {
            if (atak == true) {
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
            }
        }

    } else if (movement) {
        if (T.classList.value == "red") {

            T.innerHTML = "";

            // document.getElementById(T.id).classList.add("")
            for (i = 0; elements[i]; i++) elements[i].classList.remove("hand");
            movement = false;

        }
    }

    // limpiando todas las celdas coloreadas de verde
    if (!movement) {
        for (var z = 0; z < 255; z++) {
            paintedCells[z].classList.remove("green");
            paintedCells[z].classList.remove("red");
        }
    }


}

// receives a cord and returns you all cells within that range
function getRange(id, range) {
    // split id and get cords
    var cords = id.split('-');
    var x = cords[0] * 1;
    var y = cords[1] * 1;

    var area = [];



    return area;
}

// llamando la funcion onload
onload = createField;