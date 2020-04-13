# Particle

A wrapped tool for controlling emitters in SparkAR.



## Install

### Import

0. [Download Particle.js](https://raw.githubusercontent.com/pofulu/sparkar-particle/master/Particle.js) (Right click and Save as)

1. Drag/Drop or import to Spark AR

2. Import `Particle` module

    ```javascript
    import { Particle } from './Particle';
    // Your script...
    ```

3. You can also [Click Here to Download a Sample Project](https://yehonal.github.io/DownGit/#home?url=https://github.com/pofulu/sparkar-particle/tree/master/ParticleDemo).

### npm

0. Add package with `yarn` or `nmp`

    ```shell
    yarn add sparkar-particle
    ```
    or
    ```shell
    npm -i sparkar-particle
    ```

1. Load in the required module

    ```javascript
    const Particle = require('sparkar-particle').Particle;
    // Your script...
    ```



## Usage

```javascript
const Scene = require('Scene');
const TouchGestures = require('TouchGestures');

Scene.root.findFrist('emitter0').then(em => {
    const ps = new Particle(emitter0)
        .setFadeout()
        .stop();
    
    TouchGestures.onTap().subscribe(() => ps.burst())
});
```

