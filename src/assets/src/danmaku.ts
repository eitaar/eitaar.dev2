import * as PIXI from 'pixi.js';

class Util {
  static readonly FPS = 60;
  static readonly frameTime = 1000 / Util.FPS;

  static round(target: number, digit: number): number {
    return Math.round(target * digit) / digit;
  }

  static toFrames(ms: number): number {
    return Math.floor(ms / Util.frameTime);
  }

  static toMilliseconds(frames: number): number {
    return frames * Util.frameTime;
  }

  static sleep(frames: number): Promise<boolean> {
    return new Promise((resolve) => {
      setTimeout(() => resolve(true), Util.toMilliseconds(frames));
    });
  }
}

interface Particle extends PIXI.Graphics {
  distance: number;
  duration: number;
  cosCounter: number;
  radians: number;
  startX: number;
  startY: number;
  comesBack: boolean;
}

export async function createPixi() {
  const canvasArea = document.getElementById('PIXI') as HTMLCanvasElement;
  const app = new PIXI.Application();
  await app.init({
    backgroundAlpha: 0,
    antialias: true,
    hello: true,
    preference: 'webgpu',
    width: canvasArea.offsetWidth,
    height: canvasArea.offsetHeight,
    resolution: window.devicePixelRatio || 1,
    autoDensity: true,
    powerPreference: 'high-performance'
  });
  app.stage.eventMode = 'static';
  app.stage.hitArea = app.screen;  
  canvasArea.appendChild(app.canvas);
  const particles: Particle[] = [];

  function createParticle(x: number, y: number, angle: number, distance: number, duration: number, comesBack: boolean): Particle {    
    const size = comesBack ? 12 : 8;
    const color = comesBack ? 0xffdddd : 0xff9999;
    const particle = new PIXI.Graphics()
      .circle(0, 0, size)
      .fill({ color: color, alpha: comesBack ? 1 : 0.8 }) as Particle;
    particle.position.set(x, y);
    particle.startX = x;
    particle.startY = y;
    particle.distance = distance;
    particle.radians = (angle * Math.PI) / 180;
    particle.duration = duration;
    particle.cosCounter = 0;
    particle.comesBack = comesBack;
    particles.push(particle);
    app.stage.addChild(particle);
    return particle;
  }
  async function spawnDanmakuPattern(x: number, y: number, waveNumber: number = 5) { 
    const angles = Array.from({ length: 36 }, (_, i) => i * 10);
    // for (const angle of angles) {
    //   createParticle(x, y, angle, 150, 60, true);
    // }
    //await Util.sleep(30);
    for (let wave = 0; wave < waveNumber; wave++) {
      for (const angle of angles) {
        createParticle(x, y, angle, 1500, 160, false);
      }
      await Util.sleep(20);
    }
  }

  app.stage.on('pointerdown', (e: PIXI.FederatedPointerEvent) => {
    void spawnDanmakuPattern(e.global.x, e.global.y);
  });
  let lastSpawnTime = 3000;
  const spawnInterval = 3000;

  app.ticker.maxFPS = Util.FPS;
  app.ticker.add((delta) => {
    const currentTime = performance.now();
    if (currentTime - lastSpawnTime > spawnInterval) {
      const randomX = Math.random() * app.screen.width;
      const randomY = Math.random() * app.screen.height;
      void spawnDanmakuPattern(randomX, randomY);
      lastSpawnTime = currentTime;
    }

    for (let i = particles.length - 1; i >= 0; i--) {
      const particle = particles[i];
      if (particle.cosCounter <= particle.duration) {
        const progress = particle.cosCounter / particle.duration;
        const theta = particle.comesBack 
          ? progress * Math.PI 
          : Math.pow(progress, 0.8) * Math.PI / 2;
        
        const displacement = particle.comesBack 
          ? Math.sin(theta) * particle.distance
          : (1 - Math.cos(theta * 0.9)) * particle.distance;
        
        particle.x = particle.startX + Math.cos(particle.radians) * displacement;
        particle.y = particle.startY + Math.sin(particle.radians) * displacement;
        
        if (!particle.comesBack) {
          const currentDistance = Math.sqrt(
            Math.pow(particle.x - particle.startX, 2) + 
            Math.pow(particle.y - particle.startY, 2)
          );
          const distanceRatio = currentDistance / particle.distance;
          particle.alpha = Math.max(0.1, 1 - Math.pow(distanceRatio, 1.2));
        }
        particle.cosCounter += 1;
      }

      if (isOutOfBounds(particle, app.screen) || particle.cosCounter > particle.duration) {
        particles.splice(i, 1);
        particle.destroy();
      }
    }
  });

  window.addEventListener('resize', () => {
    //test
    //test 2
    app.renderer.resize(canvasArea.offsetWidth, canvasArea.offsetHeight);
  });
}

function isOutOfBounds(sprite: PIXI.Sprite | PIXI.Graphics, screen: PIXI.Rectangle): boolean {
  return (
    sprite.y > screen.height + 20 ||
    sprite.y < -20 ||
    sprite.x > screen.width + 20 ||
    sprite.x < -20
  );
}