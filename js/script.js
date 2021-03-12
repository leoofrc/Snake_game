let canvas = document.getElementById("snake"); //pega o canvas do html para editar aqui
let context = canvas.getContext("2d"); //'cria' o canvas 2d
let box = 32; //pixel de cada quadradinho
let snake = []; 
//criar a snake como array para poder manipulá-la usando as propriedades de array
snake[0] = {
    x: 8 * box,
    y: 8 * box
}
let direction = "";
let food = {
    x: Math.floor(Math.random() * 15 + 1) * box,
    y: Math.floor(Math.random() * 15 + 1) * box
    //math.floor tira a parte float do numero
}
let vel = 50;

function createBG() {
    //criar o background
    context.fillStyle = "black"; //cor
    context.fillRect(0, 0, 16 * box, 16 * box); //x,y,altura,largura
}

function createSnake() {
    //criar a cobra
    for(i = 0; i < snake.length; i++){
        context.fillStyle = "grey";
        context.fillRect(snake[i].x, snake[i].y, box, box);
    }
}

function getFood() {
    //criar a comida
    context.fillStyle = "red";
    context.fillRect(food.x, food.y, box, box)
}

document.addEventListener('keydown', moving);
/*
Caso o evento keydown (tecla pressionada) esteja ocorrendo,
este responderá a função moving
*/

function moving(event) {
    if ((event.keyCode == 37 || event.keyCode == 65) && direction !="right") direction = "left";
    if ((event.keyCode == 38 || event.keyCode == 87) && direction !="down") direction = "up";
    if ((event.keyCode == 39 || event.keyCode == 68) && direction !="left") direction = "right"; 
    if ((event.keyCode == 40 || event.keyCode == 83) && direction !="up") direction = "down";
    /*
    cada tecla possui uma keycode especifica. Aqui foi implementado para se mover com 
    WASD e com as arrow keys. Outra condição imposta é de que a cobra não pode se mover
    na direção oposta a qual ela ja está se movendo. Por exemplo: caso direction seja up
    ela não pode se mover para down.
    */
}

function start () {
    
    if (snake[0].x > 15 * box && direction == "right") snake[0].x = 0;
    if (snake[0].x < 0 && direction == "left") snake[0].x = 16 * box;
    if (snake[0].y > 15 * box && direction == "down") snake[0].y = 0;
    if (snake[0].y < 0 && direction == "up") snake[0].y = 16 * box;
    /*
    logo acima é feito para a cobra atravessar as bordas da tela
    criando um laço condicional de que caso ela atinja o extremo
    sua coordenada automaticamente será o extremo oposto do display    
    */

    for(i = 1; i < snake.length; i++) {
        if(snake[0].x == snake[i].x && snake[0].y == snake[i].y){
            clearInterval(game); //pausa o método game
            alert("Game Over :(") //mensagem de alerta
        }
    }

    createBG();
    createSnake();
    getFood();

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if (direction == "right") snakeX += box;
    if (direction == "left") snakeX -= box;
    if (direction == "up") snakeY -= box;
    if (direction == "down") snakeY += box;
    //é somado logo acima as coordenadas que realizam o movimento frame por frame

    if(snakeX != food.x || snakeY != food.y) {
        snake.pop();
    }
    else {
        food.x = Math.floor(Math.random() * 15 + 1) * box;
        food.y = Math.floor(Math.random() * 15 + 1) * box;
    }

    let newSnake = {
        x: snakeX,
        y: snakeY
        //aqui é atualizada as novas coordenadas da cobra
    }

    snake.unshift(newSnake);
}

let game = setInterval(() => {
    start();
}, vel);
//start();
