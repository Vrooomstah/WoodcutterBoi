/* For the oak-script to work the best in F2P-worlds please be sure to check everything below:
    1. Equip Training Shield that you can get in Lumbridge.
    2. Head over to north of Draynor Village where there are some oak trees. 
      The default config uses 3 of them for the script. But if you'd want to use other ones, just put a new ground marker below the tree.
    3. Set your camera to vertical and zoom position to 70 (I recommend you to set CTRL to reset zoom position to 70)
    4. Ground markers
        4.1 Set ground marker 'Border Width' to 4
        4.2 Set 'Fill Opacity' to 255
        4.3 Set 'Tile color' to #FFF00FA
        4.4 Add ONE ground marker below the base of each tree in the middle of its hitbox
    5. Be sure that your resolution is 1920x1080
    6. In OSRS-settings, set Game client layout: Resizable - Modern layout
    7. Open your backpack
*/

// Import of the robotjs library
    var robot = require('robotjs');
// Color for each empty inventory space
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
    console.log("Starting woodcutter for oak trees...");
    sleep(4000);
    // Loop to keep the bot going
    while (true){
        // Continue looping as long as no item is in 28th space (index 27)
        while (robot.getPixelColor(inventory_spaces[27].x, inventory_spaces[27].y) == inventory_empty_space_color){
            var tree = findOakTree();
            if (!tree){
                continue;
            }
            robot.moveMouse(tree.x, tree.y);
            sleep(200); // ZZZ: RANDOMIZE THIS
            robot.mouseClick();
            // This sleep is needed for the while-loop to work correctly
            sleep(2000); // ZZZ: RANDOMIZE THIS
            // While character is chopping tree, sleep for 2 seconds
            while (!characterIdle()){
                sleep(2000);
                console.log("Sleeping for 1 second as tree is not chopped down");
            }
        }
        // Call checkLogsForDrop() when inventory is full
        dropLogs();
        console.log("Dropped logs! Sleeping for 5 secs");
        sleep(2000); // ZZZ: RANDOMIZE THIS
    }
}

// Drops all logs in inventory
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

function findOakTree(){
    let x = 770, y = 385, width = 380, height = 310;
    let img = robot.screen.capture(x,y,width,height);
    let zone_colors = ["ff00fa","fe00f9"];

    for (var i = 0; i < 500; i++){
        var random_x = getRandomInt(0, width - 1);
        var random_y = getRandomInt(0, height - 1);
        var sample_color = img.colorAt(random_x, random_y);
        if (zone_colors.includes(sample_color)){
            var screen_x = random_x + x;
            var screen_y = random_y + y;
            return {x: screen_x, y:screen_y};
        }
    }
    return false;
}

function characterIdle(){
    let x = 940, y = 513, width = 42, height = 37;
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
    console.log("Should only get here if IDLE");
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

main();