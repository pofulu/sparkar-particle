// @ts-nocheck

const Ease = require('sparkar-pftween').Ease;
const Animation = require('Animation');
const Time = require('Time');
const Scene = require('Scene');
const Diagnostics = require('Diagnostics');
const Reactive = require('Reactive');

class ParticleHSVAModifier {
    constructor() {
        this.h = Animation.samplers.constant(1);
        this.s = Animation.samplers.constant(1);
        this.v = Animation.samplers.constant(1);
        this.a = Animation.samplers.constant(1);
    }

    static modifyHSVA(emitter, modifier) {
        emitter.hsvaColorModulationModifier = Animation.samplers.HSVA([modifier.h, modifier.s, modifier.v, modifier.a,]);
    }
}

class ParticleHSVA {
    constructor() {
        this.hue = 1;
        this.saturation = 1;
        this.value = 1;
        this.alpha = 1;

        this.hueDelta = 1;
        this.saturationDelta = 1;
        this.valueDelta = 1;
        this.alphaDelta = 1;
    }

    static setHSVA(emitter, color) {
        const colorSignal = Reactive.HSVA(color.hue, color.saturation, color.value, color.alpha);
        const colorSignalDelta = Reactive.HSVA(color.hueDelta, color.saturationDelta, color.valueDelta, color.alphaDelta);

        emitter.colorModulationHSVA = colorSignal;
        emitter.colorModulationHSVADelta = colorSignalDelta;
    }
}

export class Particle {
    /**
     * @param {SceneObjectBase} emitter 
     */
    constructor(emitter) {
        this.emitter = emitter;
        this.colorModifier = new ParticleHSVAModifier();
        this.color = new ParticleHSVA();
        this.burstSubscription = undefined;
    }

    /**
     * @param {number} begin 
     * @param {number} end 
     * @param {{(begin: number, end: number): ScalarSampler}} ease
     */
    modiyHue(begin, end, ease) {
        this.colorModifier.h = ease(begin, end);
        ParticleHSVAModifier.modifyHSVA(this.emitter, this.colorModifier);
        return this;
    }

    /**
     * @param {number} begin 
     * @param {number} end 
     * @param {{(begin: number, end: number): ScalarSampler}} ease
     */
    modiySaturation(begin, end, ease) {
        this.colorModifier.s = ease(begin, end);
        ParticleHSVAModifier.modifyHSVA(this.emitter, this.colorModifier);
        return this;
    }

    /**
     * @param {number} begin 
     * @param {number} end 
     * @param {{(begin: number, end: number): ScalarSampler}} ease
     */
    modiyValue(begin, end, ease) {
        this.colorModifier.v = ease(begin, end);
        ParticleHSVAModifier.modifyHSVA(this.emitter, this.colorModifier);
        return this;
    }

    /**
     * @param {number} begin 
     * @param {number} end 
     * @param {{(begin: number, end: number): ScalarSampler}} ease
     */
    modiyAlpha(begin, end, ease) {
        this.colorModifier.a = ease(begin, end);
        ParticleHSVAModifier.modifyHSVA(this.emitter, this.colorModifier);
        return this;
    }

    /**
     * @param {number} from 
     * @param {number} to 
     * @param {{(begin: number, end: number): ScalarSampler}} ease
     */
    modiyScale(from, to, ease) {
        this.emitter.sizeModifier = ease(from, to);;
        return this;
    }

    /**
     * @param {{(begin: number, end: number): ScalarSampler}} ease
     */
    setScaleout(ease = Ease.easeInCubic) {
        if (this.emitter.scaleDelta.pinLastValue() != 0) {
            Diagnostics.log(`The particle "${this.emitter.name}" will not scale out perfectly if its "scale delta" is not "0"`);
        }
        this.modiyScale(0, this.emitter.scale.mul(this.emitter.scaleDelta.add(1)).neg().pinLastValue(), ease);
        return this;
    }

    /**
     * @param {{(begin: number, end: number): ScalarSampler}} ease
     */
    setFadeout(ease = Ease.easeInCubic) {
        this.modiyAlpha(1, 0, ease);
        return this;
    }

    /**
     * @param {ScalarSignal | Number=} birthrate 
     * @param {number} duration 
     * @returns {Promise<void>}
     */
    burst(birthrate = 200, duration = 100) {
        if (this.burstSubscription) {
            this.burstSubscription.unsubscribe();
            if (this.cancellation)
                this.cancellation();
        }

        return new Promise((resolve, reject) => {
            this.start(birthrate);

            this.burstSubscription = Time.setTimeout(() => {
                this.stop();
                resolve();
            }, duration);

            this.cancellation = () => {
                reject('you called burst when bursting, it is fine, just a hint');
            }
        });
    }

    /**
     * @param {ScalarSignal | Number=} hue
     * @param {ScalarSignal | Number=} hueDelta
     */
    setHue(hue, hueDelta = 0) {
        this.color.hue = hue;
        this.color.hueDelta = hueDelta;
        ParticleHSVA.setHSVA(this.emitter, this.color);
        return this;
    }

    /**
     * @param {ScalarSignal | Number=} saturation 
     * @param {ScalarSignal | Number=} saturationDelta 
     */
    setSaturation(saturation, saturationDelta = 0) {
        this.color.saturation = saturation;
        this.color.saturationDelta = saturationDelta;
        ParticleHSVA.setHSVA(this.emitter, this.color);
        return this;
    }

    /**
     * @param {ScalarSignal | Number=} value
     * @param {ScalarSignal | Number=} value
     */
    setValue(value, valueDelta = 0) {
        this.color.value = value;
        this.color.valueDelta = valueDelta;
        ParticleHSVA.setHSVA(this.emitter, this.color);
        return this;
    }

    /**
     * @param {ScalarSignal | Number=} alpha
     * @param {ScalarSignal | Number=} alphaDelta
     */
    setAlpha(alpha, alphaDelta = 0) {
        this.color.alpha = alpha;
        this.color.alphaDelta = alphaDelta;
        ParticleHSVA.setHSVA(this.emitter, this.color);
        return this;
    }

    /**
    * @param {ScalarSignal | Number} birthrate
    */
    start(birthrate) {
        if (this.burstSubscription) {
            this.burstSubscription.unsubscribe();
        }

        this.emitter.birthrate = birthrate;
        return this;
    }

    stop() {
        if (this.burstSubscription) {
            this.burstSubscription.unsubscribe();
        }

        this.emitter.birthrate = 0;
        return this;
    }
}