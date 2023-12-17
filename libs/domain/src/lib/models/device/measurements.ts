import { Measurement } from './device.entity';

const longitudeUnits: Array<{ key: string, name: string, symbol: string; }> = [
  { "key": "cm", "name": "Centimeter", "symbol": "cm" },
  { "key": "mm", "name": "Millimeter", "symbol": "mm" },
  { "key": "mile", "name": "Mile", "symbol": "mi" },
  { "key": "km", "name": "Kilometer", "symbol": "km" },
  { "key": "m", "name": "Meter", "symbol": "m" },
  { "key": "feet", "name": "Foot", "symbol": "ft" },
  { "key": "inch", "name": "Inch", "symbol": "in" },
  { "key": "yard", "name": "Yard", "symbol": "yd" },
];
const timeUnits: Array<{ key: string, name: string, symbol: string; }> = [
  { "key": "second", "name": "Second", "symbol": "s" },
  { "key": "minute", "name": "Minute", "symbol": "min" },
  { "key": "hour", "name": "Hour", "symbol": "h" },
  { "key": "day", "name": "Day", "symbol": "d" },
  { "key": "week", "name": "Week", "symbol": "w" },
  { "key": "month", "name": "Month", "symbol": "m" },
  { "key": "year", "name": "Year", "symbol": "y" }
];
const temperatureUnits: Array<{ key: string, name: string, symbol: string; }> = [
  { "key": "celsius", "name": "Celsius", "symbol": "°C" },
  { "key": "fahrenheit", "name": "Fahrenheit", "symbol": "°F" },
  { "key": "kelvin", "name": "Kelvin", "symbol": "K" }
];

const humidityUnits: Array<{ key: string, name: string, symbol: string; }> = [
  { "key": "percent", "name": "Percent", "symbol": "%" }
];

const pressureUnits: Array<{ key: string, name: string, symbol: string; }> = [
  { "key": "pascal", "name": "Pascal", "symbol": "Pa" },
  { "key": "bar", "name": "Bar", "symbol": "bar" },
  { "key": "atmosphere", "name": "Atmosphere", "symbol": "atm" },
  { "key": "torr", "name": "Torr", "symbol": "Torr" },
  { "key": "psi", "name": "Psi", "symbol": "psi" }
];
const densityUnits: Array<{ key: string, name: string, symbol: string; }> = [
  { "key": "kg/m3", "name": "Kilograms per Cubic Meter", "symbol": "kg/m³" },
  { "key": "g/cm3", "name": "Grams per Cubic Centimeter", "symbol": "g/cm³" },
  { "key": "g/l", "name": "Grams per Liter", "symbol": "g/L" },
  { "key": "g/ml", "name": "Grams per Milliliter", "symbol": "g/mL" },
  { "key": "lb/ft3", "name": "Pounds per Cubic Foot", "symbol": "lb/ft³" },
  { "key": "lb/in3", "name": "Pounds per Cubic Inch", "symbol": "lb/in³" },
  { "key": "oz/in3", "name": "Ounces per Cubic Inch", "symbol": "oz/in³" },
];
const speedUnits: Array<{ key: string, name: string, symbol: string; }> = [
  { "key": "m/s", "name": "Meters per second", "symbol": "m/s" },
  { "key": "km/h", "name": "Kilometers per hour", "symbol": "km/h" },
  { "key": "mile/h", "name": "Miles per hour", "symbol": "mi/h" },
  { "key": "knot", "name": "Knots", "symbol": "kn" },
  { "key": "ft/s", "name": "Feet per second", "symbol": "ft/s" }
];
const accelerationUnits: Array<{ key: string, name: string, symbol: string; }> = [
  { "key": "m/s2", "name": "Meters per second squared", "symbol": "m/s²" },
  { "key": "km/h2", "name": "Kilometers per hour squared", "symbol": "km/h²" },
  { "key": "mile/h2", "name": "Miles per hour squared", "symbol": "mi/h²" },
  { "key": "g", "name": "Standard gravity", "symbol": "g" },
  { "key": "ft/s2", "name": "Feet per second squared", "symbol": "ft/s²" }
];
const massUnits: Array<{ key: string, name: string, symbol: string; }> = [
  { "key": "kg", "name": "Kilograms", "symbol": "kg" },
  { "key": "g", "name": "Grams", "symbol": "g" },
  { "key": "lb", "name": "Pounds", "symbol": "lb" },
  { "key": "oz", "name": "Ounces", "symbol": "oz" }
];
const volumeUnits: Array<{ key: string, name: string, symbol: string; }> = [
  { "key": "m3", "name": "Cubic meters", "symbol": "m³" },
  { "key": "cm3", "name": "Cubic centimeters", "symbol": "cm³" },
  { "key": "l", "name": "Liters", "symbol": "L" },
  { "key": "ml", "name": "Milliliters", "symbol": "mL" },
  { "key": "ft3", "name": "Cubic feet", "symbol": "ft³" },
  { "key": "in3", "name": "Cubic inches", "symbol": "in³" },
];
const areaUnits = [
  { "key": "m2", "name": "Square meters", "symbol": "m²" },
  { "key": "cm2", "name": "Square centimeters", "symbol": "cm²" },
  { "key": "ft2", "name": "Square feet", "symbol": "ft²" },
  { "key": "in2", "name": "Square inches", "symbol": "in²" },
];
const forceUnits: Array<{ key: string, name: string, symbol: string; }> = [
  { "key": "newton", "name": "Newton", "symbol": "N" },
  { "key": "kgf", "name": "Kilogram-force", "symbol": "kgf" },
  { "key": "lbf", "name": "Pound-force", "symbol": "lbf" }
];
const energyUnits = [
  { "key": "joule", "symbol": "J", "name": "Joules" },
  { "key": "kj", "symbol": "kJ", "name": "Kilojoules" },
  { "key": "cal", "symbol": "cal", "name": "Calories" },
  { "key": "kcal", "symbol": "kcal", "name": "Kilocalories" },
  { "key": "btu", "symbol": "BTU", "name": "British Thermal Units" },
  { "key": "wh", "symbol": "Wh", "name": "Watt-hours" },
  { "key": "kwh", "symbol": "kWh", "name": "Kilowatt-hours" }
];
export const MeasurementsList: Measurement[] = [
  { "key": "longitude", "name": "Longitude", units: longitudeUnits },
  { "key": "time", "name": "Time", units: timeUnits },
  { "key": "temperature", "name": "Temperature", units: temperatureUnits },
  { "key": "humidity", "name": "Humidity", units: humidityUnits },
  { "key": "pressure", "name": "Pressure", units: pressureUnits },
  { "key": "density", "name": "Density", units: densityUnits },
  { "key": "speed", "name": "Speed", units: speedUnits },
  { "key": "acceleration", "name": "Acceleration", units: accelerationUnits },
  { "key": "mass", "name": "Mass", units: massUnits },
  { "key": "volume", "name": "Volume", units: volumeUnits },
  { "key": "area", "name": "Area", units: areaUnits },
  { "key": "force", "name": "Force", units: forceUnits },
  { "key": "energy", "name": "Energy", units: energyUnits }
];

const totalUnits = longitudeUnits.concat(
  [
    ...timeUnits, 
    ...accelerationUnits,
    ...areaUnits,
    ...densityUnits,
    ...energyUnits,
    ...forceUnits,
    ...humidityUnits,
    ...massUnits,
    ...pressureUnits,
    ...speedUnits,
    ...temperatureUnits,
    ...volumeUnits    
  ]);
export const getUnitByKey = (name: any) => {
  return totalUnits.find(u => u.name === name);
};

const featherIcons = [  
  {name: "temperature", icon: "thermometer"},  
  {name: "r_hummer", icon: "droplet"},
  {name: "wind-speed", icon: "wind"},
  {name: "rain", icon: "cloud-rain"},
];

export const getIconFeather = (name: string) => {
  return featherIcons.find(u => u.name === name);
};
