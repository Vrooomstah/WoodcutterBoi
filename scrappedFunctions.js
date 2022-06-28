
///////////////////// - THINGS NEEDED IF YOU DON'T WANT TO DROP WHOLE INVENTORY WHEN ITS FULL - /////////////////////////////

        // A temporary list that saves all inventory spaces that contain logs and are to be dropped
        var tempListWithLogs = [0];

        // Call checkLogsForDrop() when inventory is full
        checkLogsForDrop();

        // Control that inventory space contains log and then add to tempListWithLogs
        function checkLogsForDrop(){

            let x_coordinate;
            let y_coordinate;
            let logsToDrop = false;
            
            // For every inventory space, see if space is empty (inventory_empty_space_color != color)
            // and then add the space to tempListWithLogs if it is not empty and set logsToDrop to true
            for(var i = 0; i < inventory_spaces.length; i++){
                if (inventory_spaces[i]?.x && inventory_spaces[i]?.y){
                    x_coordinate = inventory_spaces[i]?.x;
                    y_coordinate = inventory_spaces[i]?.y;
                    var pixelColor = robot.getPixelColor(x_coordinate, y_coordinate);
                    if (inventory_empty_space_color != pixelColor){
                        logsToDrop = true;
                        tempListWithLogs.push({x: inventory_spaces[i].x, y: inventory_spaces[i].y});
                    }else{
                        console.log(x_coordinate, ", " + y_coordinate + ", HEX: " + pixelColor);
                    }
                }else{
                    console.log("Undefined Error: checkLogsForDrop()");
                }    
            }

            if(logsToDrop){
                dropLogs(tempListWithLogs);
                tempListWithLogs = [0];
            }
        }

        // Use tempListWithLogs and drop only those items at those coordinates
        //      Uses different dropPatterns (randomized)
        function dropLogs(tempListWithLogs){

            let x_coordinate = 0;
            let y_coordinate = 0;
            let randomDropPattern = [0];

            // Randomize this one
            if (getRandomInt(1,2) == 1){
                randomDropPattern = dropPattern1;
            }else{
                randomDropPattern = dropPattern2;
            }
            robot.keyToggle("shift", "down");
            for (var i = 0; i < tempListWithLogs.length; i++){
                sleep(getRandomInt(28, 37));
                if (tempListWithLogs[randomDropPattern[i]-1]?.x && tempListWithLogs[randomDropPattern[i]-1]?.y){
                    x_coordinate = tempListWithLogs[randomDropPattern[i]-1]?.x;
                    y_coordinate = tempListWithLogs[randomDropPattern[i]-1]?.y;
                    sleep(getRandomInt(28, 37));
                    robot.moveMouse(x_coordinate, y_coordinate);
                    sleep(getRandomInt(28, 37));
                    robot.mouseClick();
                }else{
                    console.log("Undefined Error: dropLogs()");
                }
                console.log("X: " + x_coordinate + ". Y: " + y_coordinate);
            }
            robot.keyToggle("shift", "up");
        }

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

///////////////////// - ROTATE CAMERA - ///////////////////////////////////////////////////////////////////////////////////

        function rotateCamera(){
            console.log("Rotating camera");
            robot.keyToggle("left", "down");
            sleep(1000); // ZZZ: RANDOMIZE THIS
            robot.keyToggle("left", "up");
        }

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

///////////////////// - 