import { clamp } from 'lodash';


// TODO: Have items interact with water
export default class WaterGrid {
    //Water properties
    private MAX_MASS = 1.0; //The normal, un-pressurized mass of a full water cell
    private MAX_COMPRESS = 0.02; //How much excess water a cell can store, compared to the cell above it
    private MIN_MASS = 0.0001;  //Ignore cells that are almost dry
    private MIN_DRAW = 0.01;
    private MAX_DRAW = 1.1;
    private MAX_SPEED = 1;   //max units of water moved out of one block to another, per timestep
    private MIN_FLOW = 0.01;

    private grid: WaterGridCell[][];
    constructor(config: WaterGridConfig) {
        const grid: WaterGridCell[][] = [];
        for (let x = 0; x < config.width; x++) {
            grid[x] = [];
            for (let y = 0; y < config.height; y++) {
                grid[x][y] = {
                    x,
                    y,
                    type: 'air',
                };
            }
        }
        this.grid = grid;
    }

    // 1. Take the mass of the current cell and the cell below it and
    // figure out how much water the bottom cell should contain. If it
    // has less than that, remove the corresponding amount
    // from the current cell and add it to the bottom cell.

    // 2. Check the cell to the left of this one. If it has less water,
    // move over enough water to make both cells contain the same amount.

    // 3. Do the same thing for the right neighbour.

    // 4. Do the same thing as in step 1., but for the cell above the current one.
    step() {
        for (let x = 0; x < this.grid.length; x++) {
            for (let y = this.grid[0].length - 1; y >= 0; y--) {
                const cell = this.grid[x][y];
                const cellBelow = this.grid[x][y + 1];
                const cellToTheLeft = this.grid[x - 1][y];
                const cellToTheRight = this.grid[x + 1][y];
                if (cell.type !== 'water') {
                    continue;
                }
                const shouldPropagateWaterDown = cellBelow && cell.mass < cellBelow.mass;
                if (shouldPropagateWaterDown) {
                    cellBelow
                    // DO it
                }

                const shouldPropagateWaterToTheLeft = cellToTheLeft && cell.mass < cellToTheLeft.mass;
                if (shouldPropagateWaterToTheLeft) {
                    // DO it
                }

                const shouldPropagateWaterToTheRight = cellToTheRight && cell.mass < cellToTheRight.mass;
                if (shouldPropagateWaterToTheRight) {
                    // DO it
                }

            }
        }
    }
}


interface WaterGridConfig {
    width: number;
    height: number;
}

interface WaterGridCell {
    x: number;
    y: number;
    type: 'water' | 'ground' | 'air';
    mass?: number; // volume?
}

function simulateSompression() {
    // DUMMY
    const mapWidth = 1234;
    const mapHeight = 1234;
    const blocks = [];
    const GROUND = 'fake';
    const WATER = 'fake';
    const AIR = 'fake';
    const mass = [];
    const newMass = [];
    const MIN_FLOW = 0.01;
    const MAX_SPEED = 1;   //max units of water moved out of one block to another, per timestep
    // DUMMY

    let flow = 0;
    let remainingMass;

    // Calculate and apply flow for each block
    for (let x = 0; x < mapWidth; x++){
       for (let y = 0; y < mapHeight; y++){

        // Skip inert ground blocks
         if (blocks[x][y] == GROUND) {
             continue;
         }

         //Custom push-only flow
         flow = 0;
         remainingMass = mass[x][y];
         if (remainingMass <= 0) {
             continue;
         }

         const blockBelow = blocks[x][y-1];
         const massBelow = mass[x][y-1];
         if (blockBelow != GROUND){
           flow = getStableStateB(remainingMass + massBelow) - massBelow;
           if (flow > MIN_FLOW) {
             flow *= 0.5; //leads to smoother flow
           }
           flow = clamp(flow, 0, Math.min(MAX_SPEED, remainingMass));

           newMass[x][y] -= flow;
           newMass[x][y-1] += flow;
           remainingMass -= flow;
         }

         if (remainingMass <= 0) {
            continue;
         }

         const blockLeft = blocks[x-1][y];
         if (blockLeft != GROUND) {
           //Equalize the amount of water in this block and it's neighbour
           flow = (mass[x][y] - mass[x-1][y])/4;
           if ( flow > MIN_FLOW ){ flow *= 0.5; }
           flow = clamp(flow, 0, remainingMass);

           newMass[x][y] -= flow;
           newMass[x-1][y] += flow;
           remainingMass -= flow;
         }

         if ( remainingMass <= 0 ) continue;

         //Right
         if ( blocks[x+1][y] != GROUND ){
           //Equalize the amount of water in this block and it's neighbour
           flow = (mass[x][y] - mass[x+1][y])/4;
           if ( flow > MIN_FLOW ){ flow *= 0.5; }
           flow = clamp(flow, 0, remainingMass);

           newMass[x][y] -= flow;
           newMass[x+1][y] += flow;
           remainingMass -= flow;
         }

         if ( remainingMass <= 0 ) continue;

         //Up. Only compressed water flows upwards.
         if ( blocks[x][y+1] != GROUND ){
            flow = remainingMass - getStableStateB( remainingMass + mass[x][y+1] );
           if ( flow > MIN_FLOW ){ flow *= 0.5; }
           flow = clamp( flow, 0, Math.min(MAX_SPEED, remainingMass) );

           newMass[x][y] -= flow;
           newMass[x][y+1] += flow;
           remainingMass -= flow;
         }


       }
    }

    //Copy the new mass values to the mass array
    for (int x = 0; x < mapWidth + 2; x++){
      for (int y = 0; y < mapHeight + 2; y++){
        mass[x][y] = newMass[x][y];
      }
    }

    for (int x = 1; x <= mapWidth; x++){
       for(int y = 1; y <= mapHeight; y++){
         //Skip ground blocks
         if(blocks[x][y] == GROUND) continue;
         //Flag/unflag water blocks
         if (mass[x][y] > MinMass){
           blocks[x][y] = WATER;
         } else {
           blocks[x][y] = AIR;
         }
       }
    }

    //Remove any water that has left the map
    for (int x =0; x < mapWidth+2; x++){
      mass[x][0] = 0;
      mass[x][mapHeight+1] = 0;
    }
    for (int y = 1; y < mapHeight+1; y++){
      mass[0][y] = 0;
      mass[mapWidth+1][y] = 0;
    }
}




//Take an amount of water and calculate how it should be split among two
//vertically adjacent cells. Returns the amount of water that should be in
//the bottom cell.
function getStableStateB(totalMass){
    if (totalMass <= 1) {
      return 1;
    }
    else if (totalMass < MaxMass*2 + MaxCompress) {
        return (MaxMass**2 + totalMass*MaxCompress)/(MaxMass + MaxCompress);
    }
    else {
      return (totalMass + MaxCompress)/2;
    }
  }

  /*
  Explanation of getStableStateB (well, kind-of) :

  if x <= 1, all water goes to the lower cell
      * a = 0
      * b = 1

  if x > 1 & x < 2*MaxMass + MaxCompress, the lower cell should have MaxMass + (upper_cell/MaxMass) * MaxCompress
      b = MaxMass + (a/MaxMass)*MaxCompress
      a = x - b

      ->

      b = MaxMass + ((x - b)/MaxMass)*MaxCompress ->
          b = MaxMass + (x*MaxCompress - b*MaxCompress)/MaxMass
          b*MaxMass = MaxMass^2 + (x*MaxCompress - b*MaxCompress)
          b*(MaxMass + MaxCompress) = MaxMass*MaxMass + x*MaxCompress

          * b = (MaxMass*MaxMass + x*MaxCompress)/(MaxMass + MaxCompress)
      * a = x - b;

  if x >= 2 * MaxMass + MaxCompress, the lower cell should have upper+MaxCompress

      b = a + MaxCompress
      a = x - b

      ->

      b = x - b + MaxCompress ->
      2b = x + MaxCompress ->

      * b = (x + MaxCompress)/2
      * a = x - b
    */
