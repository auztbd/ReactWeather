var React = require('react');

var About = (props) => {
    return (
        <div>
            <h1 className="text-center">About</h1>
            <p>
                This is a wether application built on React (v0.14).
            </p>
            <p>
                I have followed the tutorial from The Complete React Web App Developer Course.
            </p>
            <p>
                Here are some of the tools I used:
                <ul>
                    <li>
                        <a href="https://facebook.github.io/react">React</a> - This was the
                        JavaScript framework used.
                    </li>
                    <li>
                        <a href="http://openweathermap.org">Open Weather Map</a> - I used Open
                        Weather Map to search for weather data by city name.
                    </li>
                </ul>
            </p>
        </div>

    )
}

module.exports = About;