var React = require('react');
var WeatherForm = require('WeatherForm');
var WeatherMessage = require('WeatherMessage');
var openWeatherMap = require('openWeatherMap');

var Weather = React.createClass({
  getInitialState: function () {
    return {
      isLoading: false
    }
  },

  handleSearch: function (locationName) {
    var that = this;

    this.setState({
      isLoading: true
    });

    openWeatherMap.getTempByName(locationName).then(function (responseObject) {
      if (responseObject.name.toUpperCase() === locationName.toUpperCase()) {
        that.setState({
          location: locationName,
          temp: responseObject.main.temp,
          isLoading: false
        });
      } else {
        alert('WTF did u search for??');
      }
    }, function (errorMessage) {
      that.setState({ isLoading: false });
      alert(errorMessage);
    });

  },

  render: function () {
    var { isLoading, temp, location } = this.state;

    function renderMessage() {
      if (isLoading) {
        return <h4 className="text-center">Fetching weather ...</h4>;
      } else if (temp && location) {
        return <WeatherMessage temp={temp} location={location} />;
      }
    }

    return (
      <div>
        <h1 className="text-center">Get Weather</h1>
        <WeatherForm onSearch={this.handleSearch} />
        {renderMessage()}
      </div>
    )
  }
});

module.exports = Weather;
