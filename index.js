var colorsys = require( 'colorsys' );
var Service, Characteristic;

module.exports = function( homebridge ) {
  Service = homebridge.hap.Service;
  Characteristic = homebridge.hap.Characteristic;
  homebridge.registerAccessory( "homebridge-fake-rgb", "Fake-RGB", RgbAccessory );
};

function RgbAccessory( log, config ) {
  this.log = log;
  this.config = config;
  this.name = config.name;
  this.power = 0;
  this.brightness = 100;
  this.saturation = 0;
  this.hue = 0;

  this.log( "Initialized '" + this.name + "'" );
}

RgbAccessory.prototype.setColor = function() {
  var color = colorsys.hsv_to_rgb( {
    h: this.hue,
    s: this.saturation,
    v: this.brightness
  } );

  if ( !this.power ) {
    color.r = 0;
    color.g = 0;
    color.b = 0;
  }

  this.log( "set color to", color.r, color.g, color.b );
};

RgbAccessory.prototype.getServices = function() {
  var lightbulbService = new Service.Lightbulb( this.name );
  var bulb = this;

  lightbulbService
    .getCharacteristic( Characteristic.On )
    .on( 'get', function( callback ) {
      callback( null, bulb.power );
    } )
    .on( 'set', function( value, callback ) {
      bulb.power = value;
      bulb.log( "power to " + value );
      bulb.setColor();
      callback();
    } );

  lightbulbService
    .addCharacteristic( Characteristic.Brightness )
    .on( 'get', function( callback ) {
      callback( null, bulb.brightness );
    } )
    .on( 'set', function( value, callback ) {
      bulb.brightness = value;
      bulb.log( "brightness to " + value );
      bulb.setColor();
      callback();
    } );

  lightbulbService
    .addCharacteristic( Characteristic.Hue )
    .on( 'get', function( callback ) {
      callback( null, bulb.hue );
    } )
    .on( 'set', function( value, callback ) {
      bulb.hue = value;
      bulb.log( "hue to " + value );
      bulb.setColor();
      callback();
    } );

  lightbulbService
    .addCharacteristic( Characteristic.Saturation )
    .on( 'get', function( callback ) {
      callback( null, bulb.saturation );
    } )
    .on( 'set', function( value, callback ) {
      bulb.saturation = value;
      bulb.log( "saturation to " + value );
      bulb.setColor();
      callback();
    } );

  return [ lightbulbService ];
};
