export default {
    setup,
    draw,
};

function setup() {
    createCanvas(windowWidth, windowHeight)
    frameRate(1)
    noiseSeed(3)
    noiseDetail(4, .5)
    randomSeed(3)
    noLoop()
}

function draw() {
    clear()
    // TODO: Allow placing tunnel between two end points
    // TODO: Allow spawning smaller tunnels off ends
    // console.log('hi')
    const { tunnelPoints, branches } = getTunnel({ startIdx: 0, endIdx: width });

    drawTunnel({ tunnelPoints });


    for (const { start, end } of branches) {
        push()
        // TODO: Pick random endpoint, draw line between
        // https://stackoverflow.com/questions/5837572/generate-a-random-point-within-a-circle-uniformly

        stroke('red');
        ellipse(start.x, start.y, 15, 15)
        stroke('green');
        ellipse(end.x, end.y, 15, 15)


        const { tunnelPoints } = getTunnel({ startIdx: start.x, endIdx: end.x })
        // translate((tunnelPoints[0] || { x: 0 }).x, (tunnelPoints[0] || { y: 0 }).y)
        // rotate(rotation)
        // drawTunnel({ tunnelPoints, color: 'orange' })
        pop()
    }
}

function getY(x) {
  const smoothness = 185
  return yNoise(x/smoothness);

  function yNoise(value) {
    const SEED = 0;
    return map(noise(value, SEED), 0, 1, 0, height);
  }

}

function getWidth(x) {
  const consistency = 200;
  return widthNoise(x/consistency);


  function widthNoise(value) {
    const SEED = 100;
    return map(noise(value, SEED), 0, 1, 0, 100);
  }
}

function shouldCreateBranch(x) {
  const threshold = 0.86;
  const consistency = .01;
  // noiseSeed(Math.random().toFixed(5))
  return branchingNoise(x/consistency) >= threshold;


  function branchingNoise(value) {
    const SEED = 1000;
    return noise(value, SEED);
  }
}

function getRandomPointInCircle({ center, radius }) {
  const r = radius * Math.sqrt(random());
  const theta = random() * 2 * PI;
  const x = center.x + r * cos(theta);
  const y = center.y + r * sin(theta);
  return { x, y };
}

function getTunnel({ startIdx, endIdx }) {
    const branches = [];
    const tunnelPoints = []
    for (let x = startIdx; x < endIdx; x++) {
        tunnelPoints.push({
            x,
            y: getY(x),
            width: getWidth(x),
        });

        if (shouldCreateBranch(x)) {
          branches.push({
            start: { x, y: getY(x) },
            end: getRandomPointInCircle({
              center: { x, y: getY(x) },
              radius: 100,
            })
          })
        }
    }
    return {
      tunnelPoints,
      branches,
    }
}


function drawTunnel({ tunnelPoints, color = 'black' }) {
    push();
    stroke(color);
    for (let x = 1; x < tunnelPoints.length; x++) {
        const prevPoint = tunnelPoints[x - 1];
        const point = tunnelPoints[x];
        strokeWeight(point.width);
        line(prevPoint.x, prevPoint.y, point.x, point.y);
    }
    pop();
}
