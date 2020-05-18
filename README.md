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

1. Import `Particle` module

    ```javascript
    import { Particle } from 'sparkar-particle';
    // Your script...
    ```



## Usage

```javascript
import { Particle } from './Particle';

const TouchGestures = require('TouchGestures');

const ps = Particle.findFirst('emitter0').setFadeout().stop();
//or
//const ps = Particle.findAll('emitter0').setFadeout().stop();
//or
//const ps = Particle.findByPath('**/emitter0').setFadeout().stop();
    
TouchGestures.onTap().subscribe(() => ps.burst())
```

## Donations
If this is useful for you, please consider a donation🙏🏼. One-time donations can be made with PayPal.

[![](https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=HW99ESSALJZ36)
