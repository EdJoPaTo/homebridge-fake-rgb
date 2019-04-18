const colorsys = require('colorsys');

let Service;
let Characteristic;

module.exports = homebridge => {
  Service = homebridge.hap.Service;
  Characteristic = homebridge.hap.Characteristic;
  homebridge.registerAccessory('homebridge-fake-rgb', 'Fake-RGB', RgbAccessory);
};

function RgbAccessory(log, config) {
  this.log = log;
  this.config = config;
  this.name = config.name;
  this.power = 0;
  this.brightness = 100;
  this.saturation = 0;
  this.hue = 0;

  this.log(`Initialized '${this.name}'`);
}

RgbAccessory.prototype.setColor = () => {
  const color = colorsys.hsv_to_rgb({
    h: this.hue,
    s: this.saturation,
    v: this.brightness
  });

  if (!this.power) {
    color.r = 0;
    color.g = 0;
    color.b = 0;
  }

  this.log('set color to', color.r, color.g, color.b);
};

RgbAccessory.prototype.getServices = () => {
  const lightbulbService = new Service.Lightbulb(this.name);
  const bulb = this;

  lightbulbService
    .getCharacteristic(Characteristic.On)
    .on('get', callback => {
      callback(null, bulb.power);
    })
    .on('set', (value, callback) => {
      bulb.power = value;
      bulb.log(`power to ${value}`);
      bulb.setColor();
      callback();
    });

  lightbulbService
    .addCharacteristic(Characteristic.Brightness)
    .on('get', callback => {
      callback(null, bulb.brightness);
    })
    .on('set', (value, callback) => {
      bulb.brightness = value;
      bulb.log(`brightness to ${value}`);
      bulb.setColor();
      callback();
    });

  lightbulbService
    .addCharacteristic(Characteristic.Hue)
    .on('get', callback => {
      callback(null, bulb.hue);
    })
    .on('set', (value, callback) => {
      bulb.hue = value;
      bulb.log(`hue to ${value}`);
      bulb.setColor();
      callback();
    });

  lightbulbService
    .addCharacteristic(Characteristic.Saturation)
    .on('get', callback => {
      callback(null, bulb.saturation);
    })
    .on('set', (value, callback) => {
      bulb.saturation = value;
      bulb.log(`saturation to ${value}`);
      bulb.setColor();
      callback();
    });

  return [lightbulbService];
};
