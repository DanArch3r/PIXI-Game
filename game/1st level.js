 //Aliasess
 let Application = PIXI.Application,
     Container = PIXI.Container,
     loader = PIXI.loader,
     resources = PIXI.loader.resources,
     Graphics = PIXI.Graphics,
     TextureCache = PIXI.utils.TextureCache,
     Sprite = PIXI.Sprite,
     Text = PIXI.Text,
     TextStyle = PIXI.TextStyle;


 PIXI.SCALE_MODES.DEFAULT = PIXI.SCALE_MODES.NEAREST;

 //Create a Pixi Application
 let app = new Application({
     width: 1920,
     height: 1001,
     antialiasing: true,
     transparent: false,
     resolution: 1
 });

 app.renderer.view.style.position = "absolute";
 app.renderer.view.style.display = "block";
 app.renderer.autoResize = true;
 app.renderer.resize(window.innerWidth, window.innerHeight);


 //Add the canvas that Pixi automatically created for you to the HTML document
 document.body.appendChild(app.view);

 loader
     .add("images/treasureHunter.json")
     .add("images/bossRoom.json")
     .load(setup);

 //Capture the keyboard arrow keys
 let left = keyboard(65),
     up = keyboard(87),
     right = keyboard(68),
     down = keyboard(83);

 //Define variables that might be used in more 
 //than one function
 let state, explorer, treasure, chimes, exit, player, dungeon,
     door, healthBar, message, gameScene, gameOverScene, enemies,
     id, blobs, sanic, sans, nyanCat, cavemanSpongebob,
     ugandanKnuckles, theDrowned, kakashi, healthPickup, shaggy, walls = [],
     ladder;

 function setup() {

     //Make the game scene and add it to the stage
     gameScene = new Container();
     app.stage.addChild(gameScene);

     //Make the sprites and add them to the `gameScene`
     //Create an alias for the texture atlas frame ids
     id = resources["images/treasureHunter.json"].textures;

     //Dungeon
     dungeon = new Sprite(id["dungeon.png"]);
     gameScene.addChild(dungeon);

     //Doors
     door = new Sprite(id["door.png"]);
     door.position.set(38, 0);
     door.scale.x = 1.5;
     door.scale.y = 1.25;
     gameScene.addChild(door);

     //Trap Door
     trapDoor = new Sprite(id["trapDoor.png"]);
     trapDoor.position.set(808, 352);
     trapDoor.scale.x = 1;
     trapDoor.scale.y = 1;
     gameScene.addChild(trapDoor);

     //Explorer
     explorer = new Sprite(id["explorer.png"]);
     explorer.scale.x = 1.5;
     explorer.scale.y = 1.5;
     explorer.x = 38;
     explorer.y = 10;
     explorer.vx = 0;
     explorer.vy = 0;
     gameScene.addChild(explorer);

     //Treasure
     /*treasure = new Sprite(id["treasure.png"]);
     treasure.x = gameScene.width - treasure.width - 48;
     treasure.y = gameScene.height / 2 - treasure.height / 2;
     gameScene.addChild(treasure);*/

     //Make the blobs
     let numberOfBlobs = 15,
         blobSpacing = 20,
         blobXOffset = 432,
         blobSpeed = 2,
         blobDirection = 1;

     //An array to store all the blob monsters
     blobs = [];

     //Make as many blobs as there are `numberOfBlobs`
     for (let i = 0; i < numberOfBlobs; i++) {

         //Make a blob
         let blob = new Sprite(id["blob.png"]);

         //increase size of blob
         blob.scale.x = 1;
         blob.scale.y = 1;

         //Space each blob horizontally according to the `spacing` value.
         //`xOffset` determines the point from the left of the screen
         //at which the first blob should be added
         let x = blobSpacing * i + blobXOffset;

         //Give the blob a random y position
         let y = randomInt(0, 280);

         //Set the blob's position
         blob.x = x;
         blob.y = y;

         //Set the blob's vertical velocity. `direction` will be either `1` or
         //`-1`. `1` means the enemy will move down and `-1` means the blob will
         //move up. Multiplying `direction` by `speed` determines the blob's
         //vertical direction

         blob.vy = blobSpeed * blobDirection;

         //Reverse the direction for the next blob
         blobDirection *= -1;

         //Push the blob into the `blobs` array
         blobs.push(blob);

         //Add the blob to the `gameScene`
         gameScene.addChild(blob);
     }
     //Make the sanics
     let numberOfSanics = 1,
         sanicSpacing = 25,
         sanicXOffset = 150,
         sanicSpeed = 32,
         sanicDirection = 1;

     //An array to store all the sanic monsters
     sanics = [];

     //Make as many sanics as there are `numberOfsanics`
     for (let i = 0; i < numberOfSanics; i++) {

         //Make a sanic
         let sanic = new Sprite(id["sanic.png"]);


         //increase size of blob
         sanic.scale.x = 1;
         sanic.scale.y = 1;

         //Space each blob horizontally according to the `spacing` value.
         //`xOffset` determines the point from the left of the screen
         //at which the first blob should be added
         let x = sanicSpacing * i + sanicXOffset;

         //Give the blob a random y position
         let y = 440;

         //Set the blob's position
         sanic.x = x;
         sanic.y = y;

         //Set the blob's vertical velocity. `direction` will be either `1` or
         //`-1`. `1` means the enemy will move down and `-1` means the blob will
         //move up. Multiplying `direction` by `speed` determines the blob's
         //vertical direction
         sanic.vx = sanicSpeed * sanicDirection;

         //Reverse the direction for the next sanic
         sanicDirection *= -1;

         //Push the blob into the `sanics` array
         sanics.push(sanic);

         //Add the blob to the `gameScene`
         gameScene.addChild(sanic);
     }

     //Make the nyanCat
     let numberOfNyanCats = 1,
         nyanCatSpacing = 25,
         nyanCatXOffset = 50,
         nyanCatSpeed = 25,
         nyanCatDirection = 1;

     //An array to store all the nyanCat monsters
     nyanCats = [];

     //Make as many sanics as there are `numberOfNyanCats`
     for (let i = 0; i < numberOfNyanCats; i++) {

         //Make a sanic
         let nyanCat = new Sprite(id["nyanCat.png"]);


         //increase size of blob
         nyanCat.scale.x = 1;
         nyanCat.scale.y = 1;

         //Space each blob horizontally according to the `spacing` value.
         //`xOffset` determines the point from the left of the screen
         //at which the first blob should be added
         let x = randomInt(100, 200) //nyanCatSpacing * i + nyanCatXOffset;

         //Give the blob a random y position
         let y = randomInt(700, 850);

         //Set the blob's position
         nyanCat.x = x;
         nyanCat.y = y;

         //Set the blob's vertical velocity. `direction` will be either `1` or
         //`-1`. `1` means the enemy will move down and `-1` means the blob will
         //move up. Multiplying `direction` by `speed` determines the blob's
         //vertical direction
         nyanCat.vx = nyanCatSpeed * nyanCatDirection;

         //Reverse the direction for the next sanic
         nyanCatDirection *= -1;

         //Push the blob into the `sanics` array
         nyanCats.push(nyanCat);

         //Add the blob to the `gameScene`
         gameScene.addChild(nyanCat);
     }

     //Make the sans
     let numberOfSans = 1,
         sansSpacing = 25,
         sansXOffset = 50,
         sansSpeed = 10,
         sansDirection = 1;

     //An array to store all the sans monsters
     sanss = [];

     //Make as many sanics as there are `numberOfNyanCats`
     for (let i = 0; i < numberOfSans; i++) {

         //Make a sanic
         let sans = new Sprite(id["sans.png"]);


         //increase size of blob
         sans.scale.x = 1;
         sans.scale.y = 1;

         //Space each blob horizontally according to the `spacing` value.
         //`xOffset` determines the point from the left of the screen
         //at which the first blob should be added
         let x = 1810 //nyanCatSpacing * i + nyanCatXOffset;

         //Give the blob a random y position
         let y = 64;

         //Set the blob's position
         sans.x = x;
         sans.y = y;

         //Set the blob's vertical velocity. `direction` will be either `1` or
         //`-1`. `1` means the enemy will move down and `-1` means the blob will
         //move up. Multiplying `direction` by `speed` determines the blob's
         //vertical direction
         sans.vy = sansSpeed * sansDirection;

         //Reverse the direction for the next sanic
         sansDirection *= -1;

         //Push the blob into the `sanics` array
         sanss.push(sans);

         //Add the blob to the `gameScene`
         gameScene.addChild(sans);
     }

     //Make the cavemanSpongebob
     let numberOfCavemanSpongebobs = 14,
         cavemanSpongebobSpacing = 20,
         cavemanSpongebobXOffset = 832,
         cavemanSpongebobSpeed = 2,
         cavemanSpongebobDirection = 1;

     //An array to store all the blob monsters
     cavemanSpongebobs = [];

     //Make as many blobs as there are `numberOfBlobs`
     for (let i = 0; i < numberOfCavemanSpongebobs; i++) {

         //Make a blob
         let cavemanSpongebob = new Sprite(id["cavemanSpongebob.png"]);

         //increase size of blob
         cavemanSpongebob.scale.x = 0.25;
         cavemanSpongebob.scale.y = 0.25;

         //Space each blob horizontally according to the `spacing` value.
         //`xOffset` determines the point from the left of the screen
         //at which the first blob should be added
         let x = cavemanSpongebobSpacing * i + cavemanSpongebobXOffset;

         //Give the blob a random y position
         let y = randomInt(0, 280);

         //Set the blob's position
         cavemanSpongebob.x = x;
         cavemanSpongebob.y = y;

         //Set the blob's vertical velocity. `direction` will be either `1` or
         //`-1`. `1` means the enemy will move down and `-1` means the blob will
         //move up. Multiplying `direction` by `speed` determines the blob's
         //vertical direction

         cavemanSpongebob.vy = cavemanSpongebobSpeed * cavemanSpongebobDirection;

         //Reverse the direction for the next blob
         cavemanSpongebobDirection *= -1;

         //Push the blob into the `blobs` array
         cavemanSpongebobs.push(cavemanSpongebob);

         //Add the blob to the `gameScene`
         gameScene.addChild(cavemanSpongebob);
     }

     //Make the ugandanKnuckles
     let numberOfUgandanKnuckles = 30,
         ugandanKnucklesSpacing = 10,
         ugandanKnucklesXOffset = 1580,
         ugandanKnucklesSpeed = 2,
         ugandanKnucklesDirection = 1;

     //An array to store all the blob monsters
     ugandanKnuckless = [];

     //Make as many blobs as there are `numberOfBlobs`
     for (let i = 0; i < numberOfUgandanKnuckles; i++) {

         //Make a blob
         let ugandanKnuckles = new Sprite(id["ugandanKnuckles.png"]);

         //increase size of blob
         ugandanKnuckles.scale.x = 0.2;
         ugandanKnuckles.scale.y = 0.2;

         //Space each blob horizontally according to the `spacing` value.
         //`xOffset` determines the point from the left of the screen
         //at which the first blob should be added
         let x = ugandanKnucklesSpacing * i + ugandanKnucklesXOffset;

         //Give the blob a random y position
         let y = randomInt(636, 888);

         //Set the blob's position
         ugandanKnuckles.x = x;
         ugandanKnuckles.y = y;

         //Set the blob's vertical velocity. `direction` will be either `1` or
         //`-1`. `1` means the enemy will move down and `-1` means the blob will
         //move up. Multiplying `direction` by `speed` determines the blob's
         //vertical direction

         ugandanKnuckles.vy = ugandanKnucklesSpeed * ugandanKnucklesDirection;

         //Reverse the direction for the next blob
         ugandanKnucklesDirection *= -1;

         //Push the blob into the `blobs` arrayw
         ugandanKnuckless.push(ugandanKnuckles);

         //Add the blob to the `gameScene`
         gameScene.addChild(ugandanKnuckles);
     }

     //Make the theDrowned
     let numberOfTheDrowned = 12,
         theDrownedSpacing = 20,
         theDrownedXOffset = 632,
         theDrownedSpeed = 2,
         theDrownedDirection = 1;

     //An array to store all the blob monsters
     theDrowneds = [];

     //Make as many blobs as there are `numberOfBlobs`
     for (let i = 0; i < numberOfTheDrowned; i++) {

         //Make a blob
         let theDrowned = new Sprite(id["theDrowned.png"]);

         //increase size of blob
         theDrowned.scale.x = 1;
         theDrowned.scale.y = 1;

         //Space each blob horizontally according to the `spacing` value.
         //`xOffset` determines the point from the left of the screen
         //at which the first blob should be added
         let y = theDrownedSpacing * i + theDrownedXOffset;

         //Give the blob a random y position
         let x = randomInt(420, 714);

         //Set the blob's position
         theDrowned.x = x;
         theDrowned.y = y;

         //Set the blob's vertical velocity. `direction` will be either `1` or
         //`-1`. `1` means the enemy will move down and `-1` means the blob will
         //move up. Multiplying `direction` by `speed` determines the blob's
         //vertical direction

         theDrowned.vx = theDrownedSpeed * theDrownedDirection;

         //Reverse the direction for the next blob
         theDrownedDirection *= -1;

         //Push the blob into the `blobs` arrayw
         theDrowneds.push(theDrowned);

         //Add the blob to the `gameScene`
         gameScene.addChild(theDrowned);
     }

     //Make the kakashi
     let numberOfKakashis = 1,
         kakashiSpacing = 0,
         kakashiXOffset = 1780,
         kakashiSpeed = -100,
         kakashiDirection = 1;

     //An array to store all the sanic monsters
     kakashis = [];

     //Make as many sanics as there are `numberOfsanics`
     for (let i = 0; i < numberOfKakashis; i++) {

         //Make a sanic
         let kakashi = new Sprite(id["kakashi.png"]);


         //increase size of blob
         kakashi.scale.x = 1.5;
         kakashi.scale.y = 1.5;

         //Space each blob horizontally according to the `spacing` value.
         //`xOffset` determines the point from the left of the screen
         //at which the first blob should be added
         let x = kakashiSpacing * i + kakashiXOffset;

         //Give the blob a random y position
         let y = 415;

         //Set the blob's position
         kakashi.x = x;
         kakashi.y = y;

         //Set the blob's vertical velocity. `direction` will be either `1` or
         //`-1`. `1` means the enemy will move down and `-1` means the blob will
         //move up. Multiplying `direction` by `speed` determines the blob's
         //vertical direction
         kakashi.vx = kakashiSpeed * kakashiDirection;

         //Reverse the direction for the next sanic
         kakashiDirection *= -1;

         //Push the blob into the `sanics` array
         kakashis.push(kakashi);

         //Add the blob to the `gameScene`
         gameScene.addChild(kakashi);
     }

     //Make the healthPickup
     let numberOfHealthPickups = 3,
         healthPickupSpacing = 0,
         healthPickupXOffset = 1780,
         healthPickupSpeed = 0,
         healthPickupDirection = 1;

     //An array to store all the sanic monsters
     healthPickups = [];

     //Make as many sanics as there are `numberOfsanics`
     for (let i = 0; i < numberOfHealthPickups; i++) {

         //Make a sanic
         let healthPickup = new Sprite(id["healthPickup.png"]);

         //increase size of blob
         healthPickup.scale.x = 1;
         healthPickup.scale.y = 1;

         healthPickup.vx = healthPickupSpeed * healthPickupDirection;

         //Push the blob into the `sanics` array
         healthPickups.push(healthPickup);

         //Add the blob to the `gameScene`
         gameScene.addChild(healthPickup);
     }

     healthPickups[0].x = 320;
     healthPickups[0].y = 140;
     healthPickups[1].x = 1420;
     healthPickups[1].y = 140;
     healthPickups[2].x = 1054;
     healthPickups[2].y = 854;

     //Make the shaggy
     let numberOfShaggys = 1,
         shaggySpacing = 0,
         shaggyXOffset = 1780,
         shaggySpeed = 0,
         shaggyDirection = 1;

     //An array to store all the sanic monsters
     shaggys = [];

     //Make as many sanics as there are `numberOfsanics`
     for (let i = 0; i < numberOfShaggys; i++) {

         //Make a sanic
         let shaggy = new Sprite(id["shaggy.png"]);


         //increase size of blob
         shaggy.scale.x = 1;
         shaggy.scale.y = 1;

         //Set the blob's position
         shaggy.x = 1200;
         shaggy.y = 636;

         //Set the blob's vertical velocity. `direction` will be either `1` or
         //`-1`. `1` means the enemy will move down and `-1` means the blob will
         //move up. Multiplying `direction` by `speed` determines the blob's
         //vertical direction
         shaggy.vx = sanicSpeed * sanicDirection;

         //Reverse the direction for the next sanic
         shaggyDirection *= -1;

         //Push the blob into the `sanics` array
         shaggys.push(shaggy);

         //Add the blob to the `gameScene`
         gameScene.addChild(shaggy);
     }

     //left side horizontal
     walls[0] = new PIXI.Rectangle(23, 301, 142, 20);
     walls[1] = new PIXI.Rectangle(212, 301, 329, 20);
     walls[2] = new PIXI.Rectangle(588, 301, 181, 20);
     walls[3] = new PIXI.Rectangle(23, 577, 141, 20);
     walls[4] = new PIXI.Rectangle(211, 577, 329, 20);
     walls[5] = new PIXI.Rectangle(587, 577, 182, 20);

     //left side vertical
     walls[6] = new PIXI.Rectangle(361, 7, 46, 105);
     walls[7] = new PIXI.Rectangle(361, 173, 46, 128);
     walls[8] = new PIXI.Rectangle(361, 596, 46, 108);
     walls[9] = new PIXI.Rectangle(361, 766, 46, 128);

     //middle horizontal
     walls[10] = new PIXI.Rectangle(745, 300, 430, 1);
     walls[11] = new PIXI.Rectangle(745, 591, 430, 1);

     //middle vertical
     walls[12] = new PIXI.Rectangle(745, 8, 47, 105);
     walls[13] = new PIXI.Rectangle(745, 174, 47, 126);
     walls[14] = new PIXI.Rectangle(1128, 8, 47, 105);
     walls[15] = new PIXI.Rectangle(1128, 174, 47, 126);
     walls[16] = new PIXI.Rectangle(748, 320, 21, 258);
     walls[17] = new PIXI.Rectangle(1152, 300, 23, 108);
     walls[18] = new PIXI.Rectangle(1152, 469, 23, 128);
     walls[19] = new PIXI.Rectangle(745, 591, 47, 117);
     walls[20] = new PIXI.Rectangle(745, 766, 47, 130);
     walls[21] = new PIXI.Rectangle(1128, 591, 47, 117);
     walls[22] = new PIXI.Rectangle(1128, 766, 47, 130);

     //right side horizontal
     walls[23] = new PIXI.Rectangle(1174, 301, 141, 20);
     walls[24] = new PIXI.Rectangle(1362, 301, 343, 20);
     walls[25] = new PIXI.Rectangle(1752, 301, 171, 20);
     walls[26] = new PIXI.Rectangle(1174, 577, 142, 20);
     walls[27] = new PIXI.Rectangle(1363, 577, 343, 20);
     walls[28] = new PIXI.Rectangle(1753, 577, 172, 20);

     //right side vertical
     walls[29] = new PIXI.Rectangle(1513, 7, 46, 105);
     walls[30] = new PIXI.Rectangle(1513, 173, 46, 128);
     walls[31] = new PIXI.Rectangle(1513, 596, 46, 108);
     walls[32] = new PIXI.Rectangle(1513, 766, 46, 128);

     ladder = new PIXI.Rectangle(808, 352, 48, 32);



     //Create the health bar
     healthBar = new Container();
     healthBar.position.set(app.stage.width - 170, 4)
     gameScene.addChild(healthBar);

     //Create the black background rectangle
     let innerBar = new Graphics();
     innerBar.beginFill(0x000000);
     innerBar.drawRect(0, 0, 128, 8);
     innerBar.endFill();
     healthBar.addChild(innerBar);

     //Create the front red rectangle
     let outerBar = new Graphics();
     outerBar.beginFill(0xFF3300);
     outerBar.drawRect(0, 0, 128, 8);
     outerBar.endFill();
     healthBar.addChild(outerBar);

     healthBar.outer = outerBar;

     //Create the `gameOver` scene
     gameOverScene = new Container();
     app.stage.addChild(gameOverScene);

     //Make the `gameOver` scene invisible when the game first starts
     gameOverScene.visible = false;

     //Create the text sprite and add it to the `gameOver` scene
     let style = new TextStyle({
         fontFamily: "Futura",
         fontSize: 64,
         fill: "white"
     });
     message = new Text("The End!", style);
     message.x = 120;
     message.y = app.stage.height / 2 - 32;
     gameOverScene.addChild(message);

     //Set the game state
     state = play;

     //Start the game loop 
     app.ticker.add(delta => gameLoop(delta));


 }


 function gameLoop(delta) {

     //Update the current game state:
     state(delta);
 }

 function play(delta) {

     explorer.vx = 0;
     explorer.vy = 0;
     let movementSpeed = 2.5;





     if (up.isDown && down.isUp) {
         explorer.vy -= movementSpeed;
     }
     if (down.isDown && up.isUp) {
         explorer.vy += movementSpeed;
     }
     if (right.isDown && left.isUp) {
         explorer.vx += movementSpeed;
     }
     if (left.isDown && right.isUp) {
         explorer.vx -= movementSpeed;
     }

     let futureX = new PIXI.Rectangle(explorer.x + explorer.vx, explorer.y, 24, 24);
     let futureY = new PIXI.Rectangle(explorer.x, explorer.y + explorer.vy, 24, 24);
     let futureXY = new PIXI.Rectangle(explorer.x + explorer.vx, explorer.y + explorer.vy, 24, 24);
     let hitX = false;
     let hitY = false;

     walls.map(wall => {
         if (hitTestRectangle(futureX, wall)) {
             hitX = true;
         }
         if (hitTestRectangle(futureY, wall)) {
             hitY = true;
         }
     });

     if (hitTestRectangle(explorer, ladder)) {
         app.stage.removeChild(gameScene);
         app.stage.addChild(bossRoom);

     }

     //use the explorer's velocity to make it moves
     if (!hitX) {
         explorer.x += explorer.vx;
     }
     if (!hitY) {
         explorer.y += explorer.vy;
     }

     //Contain the explorer inside the area of the dungeon
     contain(explorer, {
         x: 18,
         y: 4,
         width: 1902,
         height: 893,

     });


     //contain(explorer, stage);

     //Set `explorerHit` to `false` before checking for a collision
     let explorerHit = false;

     let explorerHeal = false;

     //Loop through all the sprites in the `enemies` array
     blobs.forEach(function(blob) {

         //Move the blob
         blob.y += blob.vy;

         //Check the blob's screen boundaries
         //If the blob hits the top or bottom of the stage, reverse
         //its direction
         if (blob.y >= 284) blob.vy = -Math.abs(blob.vy);
         else if (blob.y <= 10) blob.vy = Math.abs(blob.vy);

         //Test for a collision. If any of the enemies are touching
         //the explorer, set `explorerHit` to `true`
         if (hitTestRectangle(explorer, blob)) {
             explorerHit = true;
         }
     });

     //Loop through all the sprites in the `enemies` array
     sanics.forEach(function(sanic) {

         //Move the blob
         sanic.x += sanic.vx;

         //Check the blob's screen boundaries
         //If the blob hits the top or bottom of the stage, reverse
         //its direction
         if (sanic.x >= 662) sanic.vx = -Math.abs(sanic.vx);
         else if (sanic.x <= 48) sanic.vx = Math.abs(sanic.vx);

         //Test for a collision. If any of the enemies are touching
         //the explorer, set `explorerHit` to `true`
         if (hitTestRectangle(explorer, sanic)) {
             explorerHit = true;
         }
     });

     //Loop through all the sprites in the `enemies` array
     nyanCats.forEach(function(nyanCat) {

         //Move the blob
         nyanCat.x += nyanCat.vx;

         //Check the blob's screen boundaries
         //If the blob hits the top or bottom of the stage, reverse
         //its direction
         if (nyanCat.x >= 100) nyanCat.vx = -Math.abs(nyanCat.vx);
         else if (nyanCat.x <= 35) nyanCat.vx = Math.abs(nyanCat.vx);

         //Test for a collision. If any of the enemies are touching
         //the explorer, set `explorerHit` to `true`
         if (hitTestRectangle(explorer, nyanCat)) {
             explorerHit = true;
         }
     });

     //Loop through all the sprites in the `enemies` array
     sanss.forEach(function(sans) {

         //Move the blob
         sans.y += sans.vy;

         //Check the blob's screen boundaries
         //If the blob hits the top or bottom of the stage, reverse
         //its direction
         if (sans.y >= 96) sans.vy = -Math.abs(sans.vy);
         else if (sans.y <= 48) sans.vy = Math.abs(sans.vy);

         //Test for a collision. If any of the enemies are touching
         //the explorer, set `explorerHit` to `true`
         if (hitTestRectangle(explorer, sans)) {
             explorerHit = true;
         }
     });

     //Loop through all the sprites in the `enemies` array
     cavemanSpongebobs.forEach(function(cavemanSpongebob) {

         //Move the blob
         cavemanSpongebob.y += cavemanSpongebob.vy;

         //Check the blob's screen boundaries
         //If the blob hits the top or bottom of the stage, reverse
         //its direction
         if (cavemanSpongebob.y >= 286) cavemanSpongebob.vy = -Math.abs(cavemanSpongebob.vy);
         else if (cavemanSpongebob.y <= 10) cavemanSpongebob.vy = Math.abs(cavemanSpongebob.vy);

         //Test for a collision. If any of the enemies are touching
         //the explorer, set `explorerHit` to `true`
         if (hitTestRectangle(explorer, cavemanSpongebob)) {
             explorerHit = true;
         }
     });

     //Loop through all the sprites in the `enemies` array
     ugandanKnuckless.forEach(function(ugandanKnuckles) {

         //Move the blob
         ugandanKnuckles.y += ugandanKnuckles.vy;

         //Check the blob's screen boundaries
         //If the blob hits the top or bottom of the stage, reverse
         //its direction
         if (ugandanKnuckles.y >= 878) ugandanKnuckles.vy = -Math.abs(ugandanKnuckles.vy);
         else if (ugandanKnuckles.y <= 636) ugandanKnuckles.vy = Math.abs(ugandanKnuckles.vy);

         //Test for a collision. If any of the enemies are touching
         //the explorer, set `explorerHit` to `true`
         if (hitTestRectangle(explorer, ugandanKnuckles)) {
             explorerHit = true;
         }
     });

     //Loop through all the sprites in the `enemies` array
     theDrowneds.forEach(function(theDrowned) {

         //Move the blob 
         theDrowned.x += theDrowned.vx;

         //Check the blob's screen boundaries
         //If the blob hits the top or bottom of the stage, reverse
         //its direction
         if (theDrowned.x >= 728) theDrowned.vx = -Math.abs(theDrowned.vx);
         else if (theDrowned.x <= 412) theDrowned.vx = Math.abs(theDrowned.vx);

         //Test for a collision. If any of the enemies are touching
         //the explorer, set `explorerHit` to `true`
         if (hitTestRectangle(explorer, theDrowned)) {
             explorerHit = true;
         }
     });

     //Loop through all the sprites in the `enemies` array
     kakashis.forEach(function(kakashi) {

         if (explorer.x >= 1700 && explorer.x <= 1760 && explorer.y >= 370 && explorer.y <= 515) {
             kakashi.x += kakashi.vx;
         }

         if (kakashi.x === 1124) {
             visible(kakashi) = false
         }


         //Check the blob's screen boundaries
         //If the blob hits the top or bottom of the stage, reverse
         //its direction
         // if (kakashi.x >= 662) kakashi.vx = -Math.abs(kakashi.vx);
         // else if (kakashi.x <= 48) kakashi.vx = Math.abs(kakashi.vx);

         //Test for a collision. If any of the enemies are touching
         //the explorer, set `explorerHit` to `true`
         // if (hitTestRectangle(explorer, kakashi)) {
         //     explorerHit = true;
         // }
     });

     //Loop through all the sprites in the `enemies` array
     healthPickups.forEach(function(healthPickup) {

         //Move the blob
         healthPickup.x += healthPickup.vx;

         //Check the blob's screen boundaries
         //If the blob hits the top or bottom of the stage, reverse


         //Test for a collision. If any of the enemies are touching
         //the explorer, set `explorerHit` to `true`
         if (hitTestRectangle(explorer, healthPickup)) {
             healthBar.outer.width += 5;
             gameScene.removeChild(healthPickup);
         }
     });

     //Loop through all the sprites in the `enemies` array
     shaggys.forEach(function(shaggy) {

         //Move the blob 
         shaggy.x += shaggy.vx;

         //Check the blob's screen boundaries
         //If the blob hits the top or bottom of the stage, reverse
         //its direction
         if (shaggy.x >= 1230) shaggy.vx = -Math.abs(shaggy.vx);
         else if (shaggy.x <= 1194) shaggy.vx = Math.abs(shaggy.vx);

         //Test for a collision. If any of the enemies are touching
         //the explorer, set `explorerHit` to `true`
         if (hitTestRectangle(explorer, shaggy)) {
             healthBar.outer.width -= 100;
         }
     });

     //If the explorer is hit...
     if (explorerHit) {

         //Make the explorer semi-transparent
         explorer.alpha = 0.5;

         //Reduce the width of the health bar's inner rectangle by 1 pixel
         healthBar.outer.width -= 5;

     } else {

         //Make the explorer fully opaque (non-transparent) if it hasn't been hit
         explorer.alpha = 1;
     }

     //Check for a collision between the explorer and the treasure
     /*if (hitTestRectangle(explorer, treasure)) {

         //If the treasure is touching the explorer, center it over the explorer
         treasure.scale.x = 0.5;
         treasure.scale.y = 0.5;
         treasure.x = explorer.x + 15;
         treasure.y = explorer.y + 15;

     }*/

     //Does the explorer have enough health? If the width of the `innerBar`
     //is less than zero, end the game and display "You lost!"
     if (healthBar.outer.width < 0) {
         state = end;
         message.text = "You lost!";
     }

     //If the explorer has brought the treasure to the exit,
     //end the game and display "You won!"
     /*if (hitTestRectangle(treasure, door)) {
         state = end;
         message.text = "You won!";
     }*/
     app.stage.pivot.x = clamp(explorer.position.x - innerWidth / 2 * 0.2 + 16, 0, 1920 - innerWidth / (1 / 0.2))
     app.stage.pivot.y = clamp(explorer.position.y - innerHeight / 2 * 0.2 + 16, 0, 912 - innerHeight / (1 / 0.2))
     app.stage.scale.set(1 / 0.2)
 }

 function end() {
     gameScene.visible = false;
     gameOverScene.visible = true;
 }


 /* Helper functions */

 function contain(sprite, container) {

     let collision = undefined;

     //Left
     if (sprite.x < container.x) {
         sprite.x = container.x;
         collision = "left";
     }

     //Top
     if (sprite.y < container.y) {
         sprite.y = container.y;
         collision = "top";
     }

     //Right
     if (sprite.x + sprite.width > container.width) {
         sprite.x = container.width - sprite.width;
         collision = "right";
     }

     //Bottom
     if (sprite.y + sprite.height > container.height) {
         sprite.y = container.height - sprite.height;
         collision = "bottom";
     }

     //Return the `collision` value
     return collision;
 }

 //The `hitTestRectangle` function
 function hitTestRectangle(r1, r2) {

     //Define the variables we'll need to calculate
     let hit, combinedHalfWidths, combinedHalfHeights, vx, vy;

     //hit will determine whether there's a collision
     hit = false;

     //Find the center points of each sprite
     r1.centerX = r1.x + r1.width / 2;
     r1.centerY = r1.y + r1.height / 2;
     r2.centerX = r2.x + r2.width / 2;
     r2.centerY = r2.y + r2.height / 2;

     //Find the half-widths and half-heights of each sprite
     r1.halfWidth = r1.width / 2;
     r1.halfHeight = r1.height / 2;
     r2.halfWidth = r2.width / 2;
     r2.halfHeight = r2.height / 2;

     //Calculate the distance vector between the sprites
     vx = r1.centerX - r2.centerX;
     vy = r1.centerY - r2.centerY;

     //Figure out the combined half-widths and half-heights
     combinedHalfWidths = r1.halfWidth + r2.halfWidth;
     combinedHalfHeights = r1.halfHeight + r2.halfHeight;

     //Check for a collision on the x axis
     if (Math.abs(vx) < combinedHalfWidths) {

         //A collision might be occuring. Check for a collision on the y axis
         if (Math.abs(vy) < combinedHalfHeights) {

             //There's definitely a collision happening
             hit = true;
         } else {

             //There's no collision on the y axis
             hit = false;
         }
     } else {

         //There's no collision on the x axis
         hit = false;
     }

     //`hit` will be either `true` or `false`
     return hit;

 };


 //The `randomInt` helper function
 function randomInt(min, max) {
     return Math.floor(Math.random() * (max - min + 1)) + min;
 }

 //The `keyboard` helper function
 function keyboard(keyCode) {
     var key = {};
     key.code = keyCode;
     key.isDown = false;
     key.isUp = true;
     key.press = undefined;
     key.release = undefined;
     //The `downHandler`
     key.downHandler = function(event) {
         if (event.keyCode === key.code) {
             if (key.isUp && key.press) key.press();
             key.isDown = true;
             key.isUp = false;
         }
         event.preventDefault();
     };

     //The `upHandler`
     key.upHandler = function(event) {
         if (event.keyCode === key.code) {
             if (key.isDown && key.release) key.release();
             key.isDown = false;
             key.isUp = true;
         }
         event.preventDefault();
     };

     //Attach event listeners
     window.addEventListener(
         "keydown", key.downHandler.bind(key), false
     );
     window.addEventListener(
         "keyup", key.upHandler.bind(key), false
     );
     return key;
 }

 function clamp(num, min, max) {
     return num <= min ? min : num >= max ? max : num;
 }