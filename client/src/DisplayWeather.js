import React, { forwardRef} from 'react'
import SearchAppBar from './SearchAppBar'


import CloudIcon from '@material-ui/icons/FilterDrama';
import LightingIcon from '@material-ui/icons/FlashOn';
import SnowflakeIcon from '@material-ui/icons/AcUnit';
import SunnyIcon from '@material-ui/icons/WbSunny';
import UmbrellaIcon from '@material-ui/icons/BeachAccess';
import MoonIcon from '@material-ui/icons/Brightness3';
import Favorite from '@material-ui/icons/Star'
import UnFavorite from '@material-ui/icons/StarBorder'


const moment = require('moment-timezone');



function DisplayWeather({ 
    forcast, 
    currentForcast, 
    dailyForcast, 
    hourlyForcast, 
    geocodedLoc, 
    handleChange, 
    handleSubmit, 
    handleMenuLogin, 
    homeWeather, 
    searchText, 
    handleSetHomeWeather, 
    goToHomeWeather,
    handleClearHomeWeather,
 }, radar) {


    const iconPicker = (icon, fontSize) => {

        if (icon === "thunderstorm" || icon === "tornado") {
            return <LightingIcon style={{ fontSize: fontSize }} />
        } else if (icon === "fog" || icon === "cloudy" || icon === "partly-cloudy-day" || icon === "partly-cloudy-night") {
            return <CloudIcon style={{ fontSize: fontSize }} />
        } else if (icon === "snow" || icon === "sleet" || icon === "hail") {
            return <SnowflakeIcon style={{ fontSize: fontSize }} />
        } else if (icon === "rain") {
            return <UmbrellaIcon style={{ fontSize: fontSize }} />
        } else if (icon === "clear-night") {
            return <MoonIcon style={{ fontSize: fontSize }} />
        } else {
            return <SunnyIcon style={{ fontSize: fontSize }} />
        }
    }

    const weatherIconTempSummary = (icon, temp, summary) => {
        return (
            <div className="weather-icon-temp-summary">
                <div className="weather-icon">
                    {iconPicker(icon, 150)}
                </div>
                <div className="weather-temp-summary">
                    <div className="weather-temp">
                        {Math.floor(temp)}°
                    </div>
                    <div className="weather-summary">
                        {summary}
                    </div>
                </div>
            </div>
        )
    }

    const getTime = (time, formating) => {
        const timestamp = moment.tz((time * 1000), forcast.timezone).format()
        return moment.tz(timestamp, forcast.timezone).format(formating)
    }
    return (
            <div>
                <div className="front-page">
                    <SearchAppBar handleChange={handleChange} handleSubmit={handleSubmit} handleMenuLogin={handleMenuLogin} goToHomeWeather={goToHomeWeather}/>
                    <div className="location">
                        {geocodedLoc.Address.City}, {geocodedLoc.Address.State}<span>{homeWeather.toLowerCase() === searchText.toLowerCase() ? <Favorite onClick={handleClearHomeWeather}/> : <UnFavorite onClick={handleSetHomeWeather}/>}</span>
                    </div>
                    {weatherIconTempSummary(currentForcast.icon, currentForcast.temperature, currentForcast.summary)}
                    <hr />
                    <div className="weekly-forcast">
                        {dailyForcast.summary}
                    </div>
                    <hr />
                    <div className="title">HOURLY</div>
                    <div className="hourly-forcast">
                        <div>{getTime(hourlyForcast.data[0].time, "ha")}</div>
                        <div>{getTime(hourlyForcast.data[3].time, "ha")}</div>
                        <div>{getTime(hourlyForcast.data[6].time, "ha")}</div>
                        <div>{getTime(hourlyForcast.data[9].time, "ha")}</div>
                        <div>{getTime(hourlyForcast.data[12].time, "ha")}</div>
                        <div>{getTime(hourlyForcast.data[15].time, "ha")}</div>

                        <div>{iconPicker(hourlyForcast.data[0].icon, 30)}</div>
                        <div>{iconPicker(hourlyForcast.data[3].icon, 30)}</div>
                        <div>{iconPicker(hourlyForcast.data[6].icon, 30)}</div>
                        <div>{iconPicker(hourlyForcast.data[9].icon, 30)}</div>
                        <div>{iconPicker(hourlyForcast.data[12].icon, 30)}</div>
                        <div>{iconPicker(hourlyForcast.data[15].icon, 30)}</div>

                        <div>{Math.floor(hourlyForcast.data[0].temperature)}°</div>
                        <div>{Math.floor(hourlyForcast.data[3].temperature)}°</div>
                        <div>{Math.floor(hourlyForcast.data[6].temperature)}°</div>
                        <div>{Math.floor(hourlyForcast.data[9].temperature)}°</div>
                        <div>{Math.floor(hourlyForcast.data[12].temperature)}°</div>
                        <div>{Math.floor(hourlyForcast.data[15].temperature)}°</div>
                    </div>
                    <div className="title title2">WEEKLY</div>
                    <div className="daily-forcast">
                        <div>{getTime(dailyForcast.data[0].time, "dd")}</div>
                        <div>{getTime(dailyForcast.data[1].time, "dd")}</div>
                        <div>{getTime(dailyForcast.data[2].time, "dd")}</div>
                        <div>{getTime(dailyForcast.data[3].time, "dd")}</div>
                        <div>{getTime(dailyForcast.data[4].time, "dd")}</div>
                        <div>{getTime(dailyForcast.data[5].time, "dd")}</div>
                        <div>{getTime(dailyForcast.data[6].time, "dd")}</div>


                        <div>{iconPicker(dailyForcast.data[0].icon, 27)}</div>
                        <div>{iconPicker(dailyForcast.data[1].icon, 27)}</div>
                        <div>{iconPicker(dailyForcast.data[2].icon, 27)}</div>
                        <div>{iconPicker(dailyForcast.data[3].icon, 27)}</div>
                        <div>{iconPicker(dailyForcast.data[4].icon, 27)}</div>
                        <div>{iconPicker(dailyForcast.data[5].icon, 27)}</div>
                        <div>{iconPicker(dailyForcast.data[6].icon, 27)}</div>


                        <div className="daily-high-temp"><p>H: {Math.floor(dailyForcast.data[0].temperatureHigh)}°</p></div>
                        <div className="daily-high-temp"><p>H: {Math.floor(dailyForcast.data[1].temperatureHigh)}°</p></div>
                        <div className="daily-high-temp"><p>H: {Math.floor(dailyForcast.data[2].temperatureHigh)}°</p></div>
                        <div className="daily-high-temp"><p>H: {Math.floor(dailyForcast.data[3].temperatureHigh)}°</p></div>
                        <div className="daily-high-temp"><p>H: {Math.floor(dailyForcast.data[4].temperatureHigh)}°</p></div>
                        <div className="daily-high-temp"><p>H: {Math.floor(dailyForcast.data[5].temperatureHigh)}°</p></div>
                        <div className="daily-high-temp"><p>H: {Math.floor(dailyForcast.data[6].temperatureHigh)}°</p></div>

                        <div>L: {Math.floor(dailyForcast.data[0].temperatureLow)}°</div>
                        <div>L: {Math.floor(dailyForcast.data[1].temperatureLow)}°</div>
                        <div>L: {Math.floor(dailyForcast.data[2].temperatureLow)}°</div>
                        <div>L: {Math.floor(dailyForcast.data[3].temperatureLow)}°</div>
                        <div>L: {Math.floor(dailyForcast.data[4].temperatureLow)}°</div>
                        <div>L: {Math.floor(dailyForcast.data[5].temperatureLow)}°</div>
                        <div>L: {Math.floor(dailyForcast.data[6].temperatureLow)}°</div>

                    </div>
                </div>
                <div className="title title2">WEATHER MAP</div>
                <div id="radar" className="radar" ref={radar}></div>
                <a className="title" href="https://darksky.net/poweredby/">Powered by Dark Sky</a>
            </div>
            )
        };
        
export default forwardRef(DisplayWeather)