var cityList = require('cityListJson');

var LocationFinder = {
  findFromCityList: function (loc) {
    var locationObject = cityList.find(item => {
      return item.name.toUpperCase() == loc.toUpperCase()
    });

    return locationObject;
  }
};

module.exports = LocationFinder;
