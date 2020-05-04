# Particle

A wrapped tool for controlling emitters in SparkAR.



## Install

### Import

0. [Download Particle.js](https://raw.githubusercontent.com/pofulu/sparkar-particle/master/ParticleDemo/scripts/Particle.js) (Right click and Save as)

1. [Download PFTween.js](https://github.com/pofulu/sparkar-pftween/raw/master/PFTween.js) (Right click and Save as)

2. Drag/Drop or import them to Spark AR

3. Import `Particle` module

    ```javascript
    import { Particle } from './Particle';
    // Your script...
    ```

4. You can also [Click Here to Download a Sample Project](https://yehonal.github.io/DownGit/#home?url=https://github.com/pofulu/sparkar-particle/tree/master/ParticleDemo).

### npm

0. Add package with `yarn` or `npm`

    ```shell
    yarn add sparkar-particle
    ```
    or
    ```shell
    npm i sparkar-particle
    ```

1. Load in the required module

    ```javascript
    const Particle = require('sparkar-particle').Particle;
    // Your script...
    ```



## Usage

```javascript
import { Particle } from './Particle';

const Scene = require('Scene');
const TouchGestures = require('TouchGestures');

Scene.root.findFirst('emitter0').then(em => {
    const ps = new Particle(em)
        .setFadeout()
        .stop();
    
    TouchGestures.onTap().subscribe(() => ps.burst())
});
```

