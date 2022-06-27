// import the robotjs library
var robot = require('robotjs');
var inventory_log_color = ["77603d"];
    var inventory_spaces = [{x:1755, y:760},{x:1797, y:760},{x:1839, y:760},{x:1881, y:760},
                            {x:1755, y:796},{x:1797, y:796},{x:1839, y:796},{x:1881, y:796},
                            {x:1755, y:832},{x:1797, y:832},{x:1839, y:832},{x:1881, y:832},
                            {x:1755, y:868},{x:1797, y:868},{x:1839, y:868},{x:1881, y:868},
                            {x:1755, y:904},{x:1797, y:904},{x:1839, y:904},{x:1881, y:904},
                            {x:1755, y:940},{x:1797, y:940},{x:1839, y:940},{x:1881, y:940},
                            {x:1755, y:976},{x:1797, y:976},{x:1839, y:976},{x:1881, y:976}]

function main(){
    
    console.log("Starting...");
    sleep(4000);

    while (true){
        while (robot.getPixelColor(inventory_spaces[27].x, inventory_spaces[27].y) != inventory_log_color){

            var tree = findTree();
            if (!tree){
                rotateCamera();
                continue;
            }

            robot.moveMouse(tree.x, tree.y);
            sleep(200);
            robot.mouseClick();
            sleep(12000);
        }
        
        dropLogs();
        //break;
    }
    
    
    function dropLogs(){

        //var inventory_log_colors = ["8f724a","8e724a","8e714a","8d7149","7c6440","7b633f","7b6340","7a623f","78613e","79613e","77603d"];
        

        for(var i = 0; i < inventory_spaces.length; i++){
            var pixelColor = robot.getPixelColor(inventory_spaces[i].x, inventory_spaces[i].y);
            robot.keyToggle("shift", "down");
            //if (inventory_log_colors.includes(pixelColor)){
            if (inventory_log_color == pixelColor){
                robot.moveMouse(inventory_spaces[i].x, inventory_spaces[i].y);
                var sleepRandom = getRandomInt(28, 37);
                sleep(sleepRandom);
                console.log("Sleep: " + sleepRandom);
                robot.mouseClick();
            }else{
                console.log("Slot " + inventory_spaces[i].x + ", " + inventory_spaces[i].y + " with color: " + pixelColor);
            }
        }
        robot.keyToggle("shift", "up");
    }
}

function findTree(){
    var x = 300, y = 300, width = 1300, height = 400;
    var img = robot.screen.capture(x,y,width,height);

    var tree_colors = ["9d7f53","78603f","816844","8a6f49"];

    for (var i = 0; i < 1000; i++){
        var random_x = getRandomInt(0, width - 1);
        var random_y = getRandomInt(0, height - 1);
        var sample_color = img.colorAt(random_x, random_y);

        if (tree_colors.includes(sample_color)){
            var screen_x = random_x + x;
            var screen_y = random_y + y;

            if (confirmTree(screen_x, screen_y)){
                console.log("Found a tree at: " + screen_x + ", " + screen_y + " color: " + sample_color);
                return {x: screen_x, y: screen_y};
            }else{
                console.log("Unconfirmed tree at: " + screen_x + ", " + screen_y);
            }
        }
    }
    return false;
}

function confirmTree(x, y){
    robot.moveMouse(x, y);
    sleep(3000);
    var blueCounter = 0;
    var boxSizeX = 40;
    var boxSizeY = 20;
    var check_x = x + 50;
    var check_y = y + 20;
    var img = robot.screen.capture(check_x,check_y,boxSizeX,boxSizeY);

    for (var x = 0; x < boxSizeX; x++){
        for (var y = 0; y < boxSizeY; y++){
            if (img.colorAt(x, y) == "00ffff"){
                blueCounter++;
            }
        }
    }
    console.log("Blue Pixels: " + blueCounter);
    
    return (blueCounter == 41);
    
}
 
function rotateCamera(){
    console.log("Rotating camera");
    robot.keyToggle("left", "down");
    sleep(1000);
    robot.keyToggle("left", "up");
}

function getRandomInt(min, max){
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function sleep(ms){
    Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, ms);
}

//testScreenCapture();

main();
