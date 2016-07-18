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

function rgbFromHsv( h, s, v ) {
  var h_ = h / 60;
  var c = v * s;
  var x = c * ( 1 - Math.abs( ( h_ % 2 ) - 1 ) );

  var r = v - c;
  var g = v - c;
  var b = v - c;

  if ( h_ >= 5 ) {
    r += c;
    b += x;
  } else if ( h_ >= 4 ) {
    r += x;
    b += c;
  } else if ( h_ >= 3 ) {
    g += x;
    b += c;
  } else if ( h_ >= 2 ) {
    g += c;
    b += x;
  } else if ( h_ >= 1 ) {
    r += x;
    g += c;
  } else {
    r += c;
    g += x;
  }

  return {
    r: r,
    g: g,
    b: b
  };
}

RgbAccessory.prototype.setColor = function() {
  var color = rgbFromHsv( this.hue, this.saturation / 100, this.brightness / 100 );

  if ( !this.power ) {
    color.r = 0;
    color.g = 0;
    color.b = 0;
  }

  this.log( "set color to", Math.round( color.r * 255 ), Math.round( color.g * 255 ), Math.round( color.b * 255 ) );
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
