const mongoose = require('mongoose');
const CitySchema = mongoose.Schema({
    Name:String,
    CountryCode:String,
    Population:Number
});
module.exports = mongoose.model('City', CitySchema);