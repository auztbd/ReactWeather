var axios = require('axios');

const OPEN_WEATHER_MAP_URL = 'http://api.openweathermap.org/data/2.5/weather?appid=38fd1fbfbe413b27c3f6d4f8f6d13dc0&units=metric';

module.exports = {
  getTempById: function (locationId) {
    var requestUrl = `${OPEN_WEATHER_MAP_URL}&id=${locationId}`;

    return axios.get(requestUrl).then(function (res) {
      return res.data.main.temp;
    }, function (res) {
      throw new Error(res.data.message);
    });
  },

  getTempByName: function (location) {
    // to review and fix, currently unused
    var encodedLocation = encodeURIComponent(location);
    var requestUrl = `${OPEN_WEATHER_MAP_URL}&q=${encodedLocation}`;

    return axios.get(requestUrl).then(function (res) {
      if (res.data.cod && res.data.message) {
        throw new Error(res.data.message);
      } else {
        return res.data.main.temp;
      }
    }, function (res) {
      throw new Error(res.data.message);
    });
  }

}
