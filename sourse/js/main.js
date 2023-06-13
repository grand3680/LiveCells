let canvas = document.getElementById('main_canvas');
let ctx = canvas.getContext('2d');
ctx.fillStyle =  "#15FA00";

var mas = [];
var count = 0;
var timer;
var width = 300;	
var n = 100;
var size = width / n;
var second = 30;


canvas.onmousedown = function(event) {
    canvas.onmousemove = function(event) {
        var x = event.offsetX;
        var y = event.offsetY; 
        x = Math.floor(x / size);
        y = Math.floor(y / size);

        mas[y][x] = 1;

        drawField();
    }

    canvas.onmouseup = function() {
        canvas.onmousemove = null;
    }
}

function goLive() {
	// size place
    for (let i = 0; i < n; i++) {
        mas[i] = [];
        for (let j = 0; j < n; j++) {
            mas[i][j] = 0;
        }
    }
}
goLive();


function drawField() {
	ctx.clearRect(0, 0, 300, 300);
	for (var i=0; i<n; i++){
		for (var j=0; j<n; j++){
			if (mas[i][j]==1){
                ctx.fillRect(j*size, i*size, size, size);
			}
		}
	}
}


function startLife(){
    var mas2 = [];    
	for (var i=0; i<n; i++){
		mas2[i]=[];
		for (var j=0; j<n; j++){
			var neighbors = 0;
            if (mas[fpm(i)-1][j]==1) neighbors++; // up
            if (mas[i][fpp(j)+1]==1) neighbors++; // right
            if (mas[fpp(i)+1][j]==1) neighbors++; // down
            if (mas[i][fpm(j)-1]==1) neighbors++; // left
            if (mas[fpm(i)-1][fpp(j)+1]==1) neighbors++;
            if (mas[fpp(i)+1][fpp(j)+1]==1) neighbors++;
            if (mas[fpp(i)+1][fpm(j)-1]==1) neighbors++;
            if (mas[fpm(i)-1][fpm(j)-1]==1) neighbors++;
			
			
            (neighbors == 2 || neighbors == 3) ? mas2[i][j] = 1 : mas2[i][j] == 0;
		}
	}
    mas = mas2; 
	drawField();
	count++;
	document.getElementById('count').innerHTML = count;
	timer = setTimeout(startLife, second);
}

function fpm(i) {
    if(i==0) return n;
    else return i;
}

function fpp(i) {
    if(i==n-1) return -1;
    else return i;
}


document.getElementById('buttonLife').onclick = startLife;

setTimeout(() => {
	second = 300
}, 5500);
