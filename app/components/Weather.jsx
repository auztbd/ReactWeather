var React = require('react');
var WeatherForm = require('WeatherForm');
var WeatherMessage = require('WeatherMessage');
var ErrorModal = require('ErrorModal');
var openWeatherMap = require('openWeatherMap');


var Weather = React.createClass({
  getInitialState: function () {
    return {
      isLoading: false,
    }
  },

  handleSearch: function (locationName) {
    var that = this;

    this.setState({
      isLoading: true,
      errorMessage: undefined,
      location: undefined,
      temp: undefined
    });

    openWeatherMap.getTempByName(locationName).then(function (responseObject) {
      if (responseObject.name.toUpperCase() === locationName.toUpperCase()) {
        that.setState({
          location: responseObject.name,
          temp: responseObject.main.temp,
          isLoading: false
        });
      } else {
        that.setState({
          isLoading: false,
          errorMessage: 'WTF did u search for??'
        });
        console.log('WTF did u search for??');
        alert('WTF did u search for??');
      }
    }, function (errmsg) {
      that.setState({
        isLoading: false,
        errorMessage: errmsg
      });
      console.log(errmsg + " - HTTP 404");
      alert(errmsg);
    });

  },
  componentDidMount: function () {
    var location = this.props.location.query.location;
    //var locationId= this.props.location.query.location; for search by id

    if (location && location.length > 0) {
      this.handleSearch(location);
      window.location.hash = '#/';
    }
  },
  componentWillReceiveProps: function (newProps) {
    var location = newProps.location.query.location;

    if (location && location.length > 0) {
      this.handleSearch(location);
      window.location.hash = '#/';
    }
  },

  render: function () {
    var { isLoading, temp, location, errorMessage } = this.state;

    function renderMessage() {
      if (isLoading) {
        return <h4 className="text-center">Fetching weather ...</h4>;
      } else if (temp && location) {
        return <WeatherMessage temp={temp} location={location} />;
      }
    }

    function renderError() {
      if (typeof errormessage === 'string') {
        return (
          <ErrorModal message={errorMessage} />
        )
      }
    }

    return (
      <div>
        <h1 className="text-center page-title">Get Weather</h1>
        <WeatherForm onSearch={this.handleSearch} />
        {renderMessage()}
        {renderError()}
      </div>
    )
  }
});

module.exports = Weather;
