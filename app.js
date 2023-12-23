'use strict';

// canvas
var canvas = document.getElementById('canves'); // DOM elementi id orqali tutib oldim

//2d o'lchamga o'tkazdim
var context = canvas.getContext('2d')

// o'yin maydonidagi kataklar o'lchami
var grid = 16; // o'yin kataklar soni
var count = 0; // o'yinni tezligi
var score = 0; // o'yinni ochqo'sini xisoblablaydi
var max = 0; // maximal natijani chiqaradi

var snake = {
    x: 160,
    y: 160,

    // ilonni xarakatini Ox o'qi bo'yicha boshlaydi
    dx : grid,
    dy: 0,

    // ilonni uzinligi
    maxCells: 1,

    // ilon ovqat yesa oshib boradi
    cells: []
}

// ilonni ovqati uchun bitta obekt xosil qilamiz
var food = {
    x: 320,
    y: 320,
}

// ovqatni random xolatida chiqarish
function getRandomInt(min, max){
    return Math.floor(Math.random() * (max - min)) + min;  //minimal xamda maximal sonlar o'rtasidagi tasodifiy sonni chiqaramiz
}

function loop(){
    requestAnimationFrame(loop);
    if (++count < 5){  //60fps / 15fps = 4 ilonni tezligi
        return;
    }

    count = 0;
    context.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight) // maydonni tozalaydi

    snake.x += snake.dx; // ilonni boshlang'ich xolatda boshlaymiz
    snake.y += snake.dy;

    // ilon chetga chiqsa o'yinni davom ettirsin
    if (snake.x < 0){  // bu xolat garizantal xolat uchun
        snake.x = canvas.clientWidth - grid;
    } else if (snake.x >= canvas.clientWidth){
        snake.x = 0
    }

    if (snake.y < 0){  // bu xolat vertikal xolat uchun
        snake.y = canvas.clientHeight - grid;
    } else if (snake.y >= canvas.clientHeight){
        snake.y = 0
    }

    // ilon qachon ovqat yesa uzunligi oshsin
    snake.cells.unshift({x: snake.x, y: snake.y})

    // dastur yangilansa o'yin boshidan boshlasin
    if (snake.cells.length > snake.maxCells){
        snake.cells.pop() // pop metodi orqali ilonni katakchalarini olib defoul xolatiga tushiramiz
    }

    // ovqat rangi
    context.fillStyle = '#fff'; // ovqat rangi oq
    context.fillRect(food.x, food.y, grid - 1, grid - 1); // ovqat kordinatalari

    // ilonni rangi
    context.fillStyle = '#000';

    // yeyilgan ovqar random tarzda boshqa yerdan chiqishi kerak
    snake.cells.forEach(function (cell, index){
        context.fillRect(cell.x, cell.y, grid - 1, grid - 1)
        if (cell.x === food.x && cell.y === food.y){
            snake.maxCells++; // ilonni uzunligi oshib boradi

            score += 1;  // ovqat yesa ilon bittaga oshadi
            document.getElementById('score').innerHTML = score;

            food.x = getRandomInt(0, 25) * grid;
            food.y = getRandomInt(0, 25) * grid;
        }
        for (var i = index + 1; i < snake.cells.length; i++){
            if (cell.x === snake.cells[i].x && cell.y === snake.cells[i].y ){
                if (score > max){
                    max = score;
                }
                snake.x = 160;
                snake.y = 160;
                snake.cells = [];
                snake.maxCells = 1;
                snake.dx = grid;
                snake.dy = 0;
                score = 0;
                food.x = getRandomInt(0, 25) * grid;
                food.y = getRandomInt(0, 25) * grid;
                document.getElementById('score').innerHTML = max;
            }
        }
    })
}

document.addEventListener('keydown', function (e){

    if (e.keyCode === 37 && snake.dx === 0){  // chap tugmani bossak ilon chapga
        snake.dx = -grid;
        snake.dy = 0;
    } else if (e.keyCode === 38 && snake.dy === 0){ // tepa tugmani bossak ilon tepaga
        snake.dy = -grid;
        snake.dx = 0;
    }else if (e.keyCode === 39 && snake.dx === 0){ // o'ng tugmani bossak ilon o'nga
        snake.dx = grid;
        snake.dy = 0;
    }else if (e.keyCode === 40 && snake.dy === 0){ // pastgi tugmani bossak ilon pastga
        snake.dy = grid;
        snake.dx = 0;
    }
})

requestAnimationFrame(loop)



