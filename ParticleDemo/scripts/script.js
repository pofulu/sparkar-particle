import { Particle } from './Particle';
import { Ease } from './PFTween';

const Scene = require('Scene');
const TouchGestures = require('TouchGestures');

const emitter0 = Scene.root.find('emitter0');

const ps = new Particle(emitter0)
    .setFadeout(Ease.easeInExpo)
    .setScaleout(Ease.easeInExpo);

ps.stop();

TouchGestures.onTap().subscribe(() => ps.burst());
