//document.getElementById("shipping").innerHTML += '<div>' + document.getElementById(OrderNumber).innerHTML + '</div>';

function start(){
    var i = 1;
    while (i < 257) {
        document.getElementById("field").innerHTML += '<div  class=" cell " id=" '+ i +'">' + i +'</div>'
        i++;
    }

    document.getElementById('overStart').classList.add('startNone');
}

const Tank = {location: 1, mobility: 4, rank: 1, captured: false, moved: false}


document.getElementById(Tank.location).innerHTML = '<div>tank</div>';

