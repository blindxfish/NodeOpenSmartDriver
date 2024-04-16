// File: NodeOpenSmartDriver.js
const { Gpio } = require('onoff');

/**
 * Controls an LED strip using the Open Smart RGB LED driver.
 */
class NodeOpenSmartDriver {
    /**
     * Constructor for the OpenSmartDriver.
     * @param {number} clockPin - The GPIO pin number used for the clock.
     * @param {number} dataPin - The GPIO pin number used for data.
     */
    constructor(clockPin, dataPin) {
        this.clock = new Gpio(clockPin, 'out');
        this.data = new Gpio(dataPin, 'out');
    }

    /**
     * Pulses the clock to send a signal.
     */
    pulseClock() {
        this.clock.writeSync(0);
        this.clock.writeSync(1);
    }

    /**
     * Sends an empty frame to the strip to signify the start/end of data transmission.
     */
    sendEmptyFrame() {
        this.data.writeSync(0);
        for (let i = 0; i < 32; i++) {
            this.pulseClock();
        }
    }

    /**
     * Calculates the anti-code for color bits.
     * @param {number} data - The color data.
     * @returns {number} The anti-coded bits.
     */
    antiCode(data) {
        let temp = 0;
        if ((data & 0x80) === 0) temp |= 0x02;
        if ((data & 0x40) === 0) temp |= 0x01;
        return temp;
    }

    /**
     * Sends a color packet to the LED strip.
     * @param {number} packet - The packet containing the color information.
     */
    sendPacket(packet) {
        for (let i = 0; i < 32; i++) {
            this.data.writeSync((packet & 0x80000000) !== 0 ? 1 : 0);
            this.pulseClock();
            packet <<= 1;
        }
    }

    /**
     * Sets the color of the LED strip.
     * @param {number} red - Red component (0-255).
     * @param {number} green - Green component (0-255).
     * @param {number} blue - Blue component (0-255).
     */
    setColor(red, green, blue) {
        this.sendEmptyFrame();
        let packet = 0x03 << 30; // Start flag
        packet |= this.antiCode(blue) << 28;
        packet |= this.antiCode(green) << 26;
        packet |= this.antiCode(red) << 24;
        packet |= blue << 16;
        packet |= green << 8;
        packet |= red;
        this.sendPacket(packet);
        this.sendEmptyFrame();
    }
}

module.exports = NodeOpenSmartDriver;
