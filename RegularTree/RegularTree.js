// Import of the robotjs library
    var robot = require('robotjs');
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

function main(){
    console.log("Starting woodcutter for regular trees...");
    sleep(4000);
    // Loop to keep the bot going
    while (true){
        // Continue looping as long as no item is in 28th space (index 27)
        while (robot.getPixelColor(inventory_spaces[27].x, inventory_spaces[27].y) == inventory_empty_space_color){
            var tree = findRegularTree();
            if (!tree){
                console.log("No trees");
                continue;
            }
            robot.moveMouse(tree.x, tree.y);
            sleep(200); // ZZZ: RANDOMIZE THIS
            robot.mouseClick();
            sleep(9000); // ZZZ: RANDOMIZE THIS
        }
        // Call checkLogsForDrop() when inventory is full
        dropLogs();
        console.log("Checked for logs! Sleeping for 5 secs");
        sleep(5000); // ZZZ: RANDOMIZE THIS
    }
}

// Use inventory_spaces and drop only those items at those coordinates
    // Uses different dropPatterns
function dropLogs(){
    let x_coordinate = 0;
    let y_coordinate = 0;
    let randomDropPattern = [0];

    if (getRandomInt(1,2) == 1){
        randomDropPattern = dropPattern1;
    }else{
        randomDropPattern = dropPattern2;
    }
    robot.keyToggle("shift", "down");
    sleep(getRandomInt(438, 2137));
    for (var i = 0; i < inventory_spaces.length; i++){
        // Use the randomDropPattern, retrieve coordinates
        // TODO:
            // RANDOMIZE THE ACCURACY OF MOUSE CLICKS
            // MORE VARIATION BETWEEN CLICKS (perhaps looking through human recording?)
            // IMPLEMENT MISSCLICKS FOR REALISM
        if (inventory_spaces[randomDropPattern[i]-1]?.x && inventory_spaces[randomDropPattern[i]-1]?.y){
            x_coordinate = inventory_spaces[randomDropPattern[i]-1]?.x;
            y_coordinate = inventory_spaces[randomDropPattern[i]-1]?.y;
            sleep(getRandomInt(28, 37));
            robot.moveMouse(x_coordinate, y_coordinate);
            sleep(getRandomInt(28, 37));
            robot.mouseClick();
        }else{
            console.log("Undefined Error: dropLogs()");
        }
        sleep(getRandomInt(28, 37));
    }
    sleep(getRandomInt(240, 439));
    robot.keyToggle("shift", "up");
}

function findRegularTree(){
    var x = 300, y = 300, width = 1300, height = 400;
    let img = robot.screen.capture(x,y,width,height);
    let zone_colors = ["ff00fa","fe00f9"];

    for (var i = 0; i < 500; i++){
        var random_x = getRandomInt(0, width - 1);
        var random_y = getRandomInt(0, height - 1);
        var sample_color = img.colorAt(random_x, random_y);
        if (zone_colors.includes(sample_color)){
            var screen_x = random_x + x;
            var screen_y = random_y + y;
            if (confirmRegularTree(screen_x, screen_y)){
                return {x: screen_x, y: screen_y};
            }
        }
    }
    return false;
}

function confirmRegularTree(x, y){
    robot.moveMouse(x, y);
    sleep(50); 
    var blueCounter = 0;
    var boxSizeWidth = 40;
    var boxSizeHeight = 20;
    // Check x and y are starting points (top-left corner) for the box that overlays the "Tree" text
    var check_x = x + 50;
    var check_y = y + 20;
    let img = robot.screen.capture(check_x, check_y, boxSizeWidth, boxSizeHeight);
    

    for (var x = 0; x < boxSizeWidth; x++){
        for (var y = 0; y < boxSizeHeight; y++){
            if (img.colorAt(x, y) == "00ffff"){
                blueCounter++;
            }
        }
    }
    console.log("Bluecounter: " + blueCounter);
    return (blueCounter == 41);
}

function getRandomInt(min, max){
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function sleep(ms){
    Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, ms);
}

main();