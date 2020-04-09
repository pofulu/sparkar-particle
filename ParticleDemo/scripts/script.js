import { Particle } from './Particle';
import { Ease } from './PFTween';

const Scene = require('Scene');
const TouchGestures = require('TouchGestures');
const Diagnostics = require('Diagnostics');

Scene.root.findFirst('emitter0').then(emitter0 => {

    const particle = new Particle(emitter0)
        .setFadeout(Ease.easeInExpo)
        .setScaleout(Ease.easeInExpo)
        .stop()

    TouchGestures.onTap().subscribe(() =>
        particle
            .setHue(Math.random(), 0.1)
            .setValue(1.5)
            .burst()
    );

}).catch(Diagnostics.log);