# Particle

A wrapped emitter function to replace `ParticleTool`. This module depends on [`PFTween`](https://bitbucket.org/rumu-inno/sparkar-pftween/src/master/).



## Usage

```javascript
import { Particle } from './Particle';
import { Ease } from './PFTween';

const Scene = require('Scene');
const emitter0 = Scene.root.find('emitter0');

const ps = new Particle(emitter0)
    .setFadeout(Ease.easeInExpo)
    .setScaleout(Ease.easeInExpo);

ps.stop();
// ps.burst();
// ps.start(100);
```

