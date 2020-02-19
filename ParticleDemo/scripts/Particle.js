// @ts-nocheck

import { Ease } from './PFTween';

const Animation = require('Animation');
const Time = require('Time');
const Scene = require('Scene');
const Diagnostics = require('Diagnostics');

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

export class Particle {
    /**
     * @param {SceneObjectBase} emitter 
     */
    constructor(emitter) {
        this.emitter = emitter;
        this.colorModifier = new ParticleHSVAModifier();
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
     */
    burst(birthrate = 200, duration = 100) {
        if (this.burstSubscription) {
            this.burstSubscription.unsubscribe();
        }

        this.start(birthrate);
        this.burstSubscription = Time.setTimeout(() => this.stop(), duration);
    }

    /**
     * @param {ScalarSignal | Number} birthrate 
     */
    start(birthrate) {
        if (this.burstSubscription) {
            this.burstSubscription.unsubscribe();
        }

        this.emitter.birthrate = birthrate;
    }

    stop() {
        if (this.burstSubscription) {
            this.burstSubscription.unsubscribe();
        }
        
        this.emitter.birthrate = 0;
    }
}