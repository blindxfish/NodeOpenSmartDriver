# OpenSmartDriver Node Module

This Node.js module provides a convenient interface for controlling the OpenSmartDriver LED controller using Raspberry Pi GPIO pins.

![Alt text](https://github.com/blindxfish/NodeOpenSmartDriver/blob/master/OS-P9813LEDDRIVERSCREW_1-600x315w.jpg)

## Installation:

To use this module in your Node.js project, you can install it via npm:
```
npm i nodeopensmartdriver
```
## Usage:

First, import the NodeOpenSmartDriver class from the module:

const NodeOpenSmartDriver = require('NodeOpenSmartDriver');

Then, create an instance of the NodeOpenSmartDriver class, specifying the clock pin and data pin for your LED setup:

const driver = new NodeOpenSmartDriver(clockPin, dataPin);

### Methods:
```
setColor(red, green, blue):
```
Sets the color of the LED strip.

red: Intensity of the red component (0-255).
green: Intensity of the green component (0-255).
blue: Intensity of the blue component (0-255).
Example usage:
```
driver.setColor(255, 0, 0); // Sets the color to red
```
## Example:

Here's a simple example of how to use the OpenSmartDriver module to control an LED strip:
```
const NodeOpenSmartDriver = require('NodeOpenSmartDriver');

// GPIO pin numbers for clock and data
const CLOCK_PIN = 17;
const DATA_PIN = 18;

// Create an instance of NodeOpenSmartDriver
const driver = new NodeOpenSmartDriver(CLOCK_PIN, DATA_PIN);

// Set the color to blue
driver.setColor(0, 0, 255);
```
## Contributing:

Contributions are welcome! If you find any issues or have suggestions for improvements, feel free to open an issue or submit a pull request.

## License:

This project is licensed under the MIT License - see the LICENSE file for details.

This project is free and open-source software. You can use, modify, and distribute it under the terms of the MIT License.