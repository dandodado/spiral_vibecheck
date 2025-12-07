class Particle {
  constructor() {
    this.reset(true);
  }

  reset(randomStart = false) {
    // Spawn particles in a circle outside the center
    let angle = random(TWO_PI);
    // Start either randomly scattered (at setup) or at the edges (during loop)
    let dist = randomStart ? random(centerRadius + 50, 400) : random(350, 450);
    
    this.pos = createVector(cos(angle) * dist, sin(angle) * dist);
    this.vel = createVector(0, 0);
    this.acc = createVector(0, 0);
    
    // Give initial tangential velocity to help the orbit look
    // This pushes them sideways relative to the center
    let orbitVel = p5.Vector.sub(createVector(0,0), this.pos).rotate(HALF_PI);
    orbitVel.setMag(random(0.5, 2)); 
    this.vel = orbitVel;

    this.alpha = 0;
    this.size = random(1.5, 3.5);
    // Varying shades of blue
    this.color = color(random(0, 100), random(100, 255), 255);
  }

  applyForces() {
    let center = createVector(0, 0);
    let dir = p5.Vector.sub(center, this.pos);
    let d = dir.mag();

    // 1. Attraction Force (Pull to center)
    // The closer they get, the stronger the pull
    let attractionStrength = 150 / (d * 0.5); 
    let attraction = dir.copy();
    attraction.setMag(attractionStrength);

    // 2. Tangential Force (Rotation)
    // Create a vector perpendicular to the direction to center
    // This creates the spiral/swirl effect
    let tangent = createVector(-dir.y, dir.x);
    tangent.setMag(attractionStrength * 0.8); // Adjust ratio to change spiral tightness

    this.acc.add(attraction);
    this.acc.add(tangent);
  }

  update() {
    this.vel.add(this.acc);
    // Limit speed so they don't shoot off instantly, but let them speed up near center
    this.vel.limit(10); 
    this.pos.add(this.vel);
    this.acc.mult(0);

    // Fade in effect
    if (this.alpha < 255) {
      this.alpha += 5;
    }

    // Check if particle hit the center ball
    if (this.pos.mag() < centerRadius * 0.5) {
      this.reset();
    }
  }

  display() {
    fill(red(this.color), green(this.color), blue(this.color), this.alpha);
    noStroke();
    ellipse(this.pos.x, this.pos.y, this.size);
  }
}