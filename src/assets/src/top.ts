import * as PIXI from 'pixi.js';

interface Particle extends PIXI.Graphics {
  vx: number;
  vy: number;
  life: number;
}

export async function createPixi() {
  const canvasArea = document.getElementById('PIXI') as HTMLCanvasElement;
  const app = new PIXI.Application();

  await app.init({
    width: canvasArea.offsetWidth,
    height: canvasArea.offsetHeight,
    backgroundAlpha: 0,
    antialias: false,
    preference: 'webgpu',
  });

  // --- Particle Effects ---
  const particleContainer = new PIXI.Container();
  app.stage.addChild(particleContainer);

  const particles: Particle[] = [];

  function spawnParticle(): Particle {
    const p = new PIXI.Graphics()
      .circle(0, 0, Math.random() * 8 + 4)
      .fill({ color: 0xff00ff, alpha: Math.random() * 0.4 + 0.2 }) as Particle;

    p.x = Math.random() * app.renderer.width;
    p.y = app.renderer.height + 20; // Start from bottom
    p.vy = Math.random() * 2 + 1; // Faster upward movement
    p.vx = (Math.random() - 0.5) * 1; // Wider horizontal movement
    p.life = Math.random() * 400 + 120;
    
    particles.push(p);
    particleContainer.addChild(p);
    return p;   
  }
  for (let i = 0; i < 200; i++) spawnParticle();

  app.ticker.add((delta) => {
    // Animate particles
    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i];
      p.x += p.vx * delta.deltaTime;
      p.y -= p.vy * delta.deltaTime;
      p.life -= delta.deltaTime;
      p.alpha = Math.max(0, p.life / 200);
      if (p.y < -20 || p.life < 0) {
        app.stage.removeChild(p);
        particles.splice(i, 1);
        spawnParticle();
      }
    }
  });

  canvasArea.appendChild(app.canvas);
  // Handle window resize
  window.addEventListener('resize', () => {
    app.renderer.resize(canvasArea.offsetWidth, canvasArea.offsetHeight);
  });
}
