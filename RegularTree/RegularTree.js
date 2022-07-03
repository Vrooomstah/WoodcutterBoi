// Import of the robotjs library
    //var robot = require('robotjs');
    import robot from 'robotjs';
    import { path } from "ghost-cursor";

    // Log color for each empty inventory space
    var inventory_empty_space_color = ["3e3529"];
// Two common drop patterns that are used and randomized when the dropLogs() function is called
    var dropPattern1 = [1,2,5,6,9,10,13,14,17,18,21,22,25,26,3,4,7,8,11,12,15,16,19,20,23,24,27,28];
    var dropPattern2 = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28];
// Coordinates for all inventory spaces (x and y) with space property for easier reading when using the spaces
    var inventory_spaces = [{x:1755, y:760, space: 1},{x:1797, y:760, space: 2},{x:1839, y:760, space: 3},{x:1881, y:760, space: 4},
                            {x:1755, y:796, space: 5},{x:1797, y:796, space: 6},{x:1839, y:796, space: 7},{x:1881, y:796, space: 8},
                            {x:1755, y:832, space: 9},{x:1797, y:832, space: 10},{x:1839, y:832, space: 11},{x:1881, y:832, space: 12},
                            {x:1755, y:868, space: 13},{x:1797, y:868, space: 14},{x:1839, y:868, space: 15},{x:1881, y:868, space: 16},
                            {x:1755, y:904, space: 17},{x:1797, y:904, space: 18},{x:1839, y:904, space: 19},{x:1881, y:904, space: 20},
                            {x:1755, y:940, space: 21},{x:1797, y:940, space: 22},{x:1839, y:940, space: 23},{x:1881, y:940, space: 24},
                            {x:1755, y:976, space: 25},{x:1797, y:976, space: 26},{x:1839, y:976, space: 27},{x:1881, y:976, space: 28}]
    
    var treesClosestToUser = [];
    var character_x = 940, character_y = 513;

function main(){
    console.log("Starting woodcutter for regular trees...");
    sleep(5000);
    
    // Loop to keep the bot going
    while (true){
        // Continue looping as long as no item is in 28th space (index 27)
        while (robot.getPixelColor(inventory_spaces[27].x, inventory_spaces[27].y) == inventory_empty_space_color){
            //let currentLogs = countLogsInInventory();
            var tree = findRegularTree();
            if (!tree){
                break;
            }
            
            moveMouseHuman(tree.x, tree.y);
            sleepRandom(183, 245);
            robot.mouseClick();
            sleepRandom(9283, 18732);
            while (!characterIdle()){
                sleepRandom(1879, 2311);
            }
        }
        dropLogs();
        //bankLogs();
        let randomInt = getRandomInt(1,50);
        if (randomInt >= 1 && randomInt <= 15){
            sleepRandom(1233, 1965);
        }else if(randomInt >= 16 && randomInt <= 42){
            sleepRandom(896, 1533);
        }else if(randomInt >= 43 && randomInt <= 48){
            sleepRandom(7643, 8493);
        }else if (randomInt >= 49){
            sleepRandom(59876, 126493);
        }
    }
}

function moveMouseHuman(to_x, to_y){
    let from = {x: robot.getMousePos().x, y: robot.getMousePos().y};
    let to = {x: to_x, y: to_y}
    const route = path(from, to)
    for (const coordinate of route) {
        robot.moveMouse(coordinate.x, coordinate.y);
    }
}

// Use inventory_spaces and drop only those items at those coordinates
    // Uses different dropPatterns
function dropLogs(){
    let x_coordinate = 0;
    let y_coordinate = 0;
    let randomDropPattern = [0];

    if (getRandomInt(1,3) == 1){
        randomDropPattern = dropPattern2;
    }else{
        randomDropPattern = dropPattern1;
    }
    robot.keyToggle("shift", "down");
    sleepRandom(438, 2137);
    for (var i = 1; i < inventory_spaces.length; i++){
        // TODO:
            // IMPLEMENT MISSCLICKS FOR REALISM
        if (inventory_spaces[randomDropPattern[i]-1]?.x && inventory_spaces[randomDropPattern[i]-1]?.y){
            x_coordinate = inventory_spaces[randomDropPattern[i]-1]?.x;
            y_coordinate = inventory_spaces[randomDropPattern[i]-1]?.y; 
            //sleepRandom(46, 63);
            let randomInt = getRandomInt(1,4);
            if (randomInt == 1){
                robot.moveMouseSmooth((getRandomInt(x_coordinate, x_coordinate + 10)), getRandomInt(y_coordinate, y_coordinate + 10));
            }else if (randomInt == 2){
                robot.moveMouseSmooth((getRandomInt(x_coordinate, x_coordinate + 10)), getRandomInt(y_coordinate - 10, y_coordinate));
            }else if (randomInt == 3){
                robot.moveMouseSmooth((getRandomInt(x_coordinate - 10, x_coordinate)), getRandomInt(y_coordinate, y_coordinate + 10));
            }else{
                robot.moveMouseSmooth((getRandomInt(x_coordinate - 10, x_coordinate)), getRandomInt(y_coordinate - 10, y_coordinate));
            }
            //sleepRandom(23, 35);
            robot.mouseClick();
        }else{
            console.log("Undefined Error: dropLogs()");
        }
        sleepRandom(23, 35);
    }
    sleepRandom(240, 439);
    robot.keyToggle("shift", "up");
}

function findRegularTree(){
    var x = 655, y = 218, width = 622, height = 651;
    let img = robot.screen.capture(x,y,width,height);
    let zone_colors = ["ff00fa"];

    for (var i = 0; i < 5000; i++){
        var random_x = getRandomInt(0, width - 1);
        var random_y = getRandomInt(0, height - 1);
        var sample_color = img.colorAt(random_x, random_y);
        if (zone_colors.includes(sample_color)){
            var screen_x = random_x + x;
            var screen_y = random_y + y;
            treesClosestToUser.push({x: screen_x, y: screen_y});
            //console.log("Found tree at X: " + screen_x + ", Y: " + screen_y);
        }
    }
    return treeClosestToUser();
}

function treeClosestToUser(){
    let sumSort = (a, b) => (a.x + a.y) - (b.x + b.y);
    treesClosestToUser.sort(sumSort);
    let targetNumber = 1453;
    let bestMatch = 6969;
    let bestTree;
    for (let i = 0; i < treesClosestToUser.length; i++){
        if (Math.abs(targetNumber - (treesClosestToUser[i].x + treesClosestToUser[i].y)) < bestMatch){
            bestMatch = Math.abs(targetNumber - (treesClosestToUser[i].x + treesClosestToUser[i].y));
            bestTree = {x: treesClosestToUser[i].x, y: treesClosestToUser[i].y};
        }
    }
    treesClosestToUser = [];
    return bestTree;
}

function characterIdle(){
    let x = character_x, y = character_y, width = 42, height = 37;
    let img = robot.screen.capture(x,y,width,height);
    let zone_colors = ["f4f3f3","f3f2f2","f0eeed","f1efef","f5f4f4","f3f1f1","edeaea","efecec","e9e5e5","ebe8e8","ece9e9","eae7e7","eeebeb","f2f0f0"];

    for (let x_axis = 0; x_axis < width; x_axis++){
        for (let y_axis = 0; y_axis < height; y_axis++){
            let sample_color = img.colorAt(x_axis, y_axis);
            if (zone_colors.includes(sample_color)){
                return true;
            }
        }
    }
    return false;
}

function getRandomInt(min, max){
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function sleep(ms){
    Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, ms);
}

function sleepRandom(min, max){
    min = Math.ceil(min);
    max = Math.floor(max);
    let time = Math.floor(Math.random() * (max - min + 1)) + min;
    Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, time);
}

main();