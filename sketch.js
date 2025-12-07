function setup() {
  createCanvas(800, 600);
  background(0);
  noStroke();
  
  // Initialize particles
  for (let i = 0; i < 600; i++) {
    particles.push(new Particle());
  }
}

let particles = [];
let centerRadius = 40;

function draw() {
  // Use a semi-transparent background for trail effect
  background(0, 30);
  
  translate(width / 2, height / 2);

  // Draw the central large ball (Attractor)
  // Glow effect
  for (let i = 5; i > 0; i--) {
    fill(255, 255, 255, 20);
    ellipse(0, 0, centerRadius + i * 10);
  }
  // Core
  fill(240, 245, 255);
  ellipse(0, 0, centerRadius);

  // Update and display particles
  blendMode(ADD); // Makes particles glow when they overlap
  for (let p of particles) {
    p.applyForces();
    p.update();
    p.display();
  }
  blendMode(BLEND); // Reset blend mode for the next frame's background
}

