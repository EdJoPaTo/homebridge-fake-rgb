# homebridge-fake-rgb

An homebridge plugin that create an Fake RGB Bulb HomeKit accessory

# Installation

Follow the instruction in [homebridge](https://www.npmjs.com/package/homebridge) for the homebridge server installation. The plugin is published through [NPM](https://www.npmjs.com/package/homebridge-fake-rgb) and should be installed "globally" by typing:

```bash
npm install -g homebridge-fake-rgb
```

# Configuration

Remember to configure the plugin in config.json in your home directory inside the .homebridge directory.

```json
"accessories": [{
    "accessory": "Fake-RGB",
    "name": "RGB Bulb"
}]
```

Configuration parameters:

- "accessory": "Fake-RGB",
- "name": "PUT THE NAME OF YOUR TEST BULB HERE",

Look for a sample config in [config.json example](https://github.com/edjopato/homebridge-fake-rgb/blob/master/config-sample.json)
