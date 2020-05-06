import { Particle } from './Particle';
import { Ease } from './PFTween';

const TouchGestures = require('TouchGestures');

//–––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––– Method 1
// const Scene = require('Scene');

// Scene.root.findFirst('emitter0').then(emitter0 => {
//     const particle = new Particle(emitter0)
//         .setFadeout(Ease.easeOutSine)
//         .setScaleout(Ease.easeInCubic)
//         .stop()

//     TouchGestures.onTap().subscribe(() =>
//         particle
//             .setHue(Math.random(), 0.1)
//             .setValue(1.5)
//             .burst()
//     );
// });

//–––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––– Method 2
// const particles = new Particle.findFirst('emitter0')
// const particles = new Particle.findAll('emitter0')
const particles = new Particle.findByPath('**/emitter*')
// const particles = new Particle.findByPath('**/div0/emitter*')
    .setFadeout(Ease.easeOutSine)
    .setScaleout(Ease.easeInCubic)
    .stop()

TouchGestures.onTap().subscribe(() =>
    particles
        .setHue(Math.random(), 0.1)
        .setValue(1.5)
        .burst()
);