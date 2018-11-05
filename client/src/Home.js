import React, { Component, createRef, createContext } from 'react'
import axios from "axios"
import postscribe from 'postscribe';

import Login from "./Login"
import DisplayWeather from './DisplayWeather'
import WeatherMounter from './WeatherMounter';

export const { Provider, Consumer } = createContext();


const geocodeURL = "https://vschool-cors.herokuapp.com?url=https://geocoder.api.here.com/6.2/geocode.json?app_id=HyOzagnhFcmnMR4TSyHe&app_code=Ez1LLz3vg-DWz7GYh-kfpw&searchtext="

const forcastURL = "https://vschool-cors.herokuapp.com?url=https://api.darksky.net/forecast/a728f9e049f1a642ba702d735ecc21d7/"

const setHomeWeatherURL = "/api/users/favorite-weather"

const loginURL = "/api/users/login"

const newUserURL = "/api/users/signup"

export default class Home extends Component {
    constructor() {
        super();
        this.initialState =
            {
                username: "",
                homeWeather: "",
                initialWeatherQuery:true,
                geocodedLoc: {},
                forcast: {},
                currentForcast: {},
                dailyForcast: {},
                hourlyForcast: {},
                searchText: "Los+Angeles",
                pendingSearchText: "",
                usernameFieldText: "",
                passwordFieldText: "",
                err: null,
                loading: true,
                authenticated: false
            }
        this.state = this.initialState;
        this.radar = createRef()

        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.formatSearchText = this.formatSearchText.bind(this)
        this.geocodeAddress = this.geocodeAddress.bind(this)
        this.handleGeocode = this.handleGeocode.bind(this)
        this.getWeather = this.getWeather.bind(this)
        this.handleWeather = this.handleWeather.bind(this)
        this.organizeWeather = this.organizeWeather.bind(this)
        this.weather = this.weather.bind(this)
        this.getWeatherData = this.getWeatherData.bind(this)
        this.removeRadar = this.removeRadar.bind(this)
        this.handleNewUser = this.handleNewUser.bind(this)
        this.handleLogin = this.handleLogin.bind(this)
        this.handleUsernameFieldChange = this.handleUsernameFieldChange.bind(this)
        this.handlePasswordFieldChange = this.handlePasswordFieldChange.bind(this)
        this.handleMenuLogin = this.handleMenuLogin.bind(this)
        this.goToHomeWeather = this.goToHomeWeather.bind(this)
        this.handleSetHomeWeather = this.handleSetHomeWeather.bind(this)
        this.handleClearHomeWeather = this.handleClearHomeWeather.bind(this)

    }

    goToHomeWeather() {
        this.setState(prevState => ({ searchText: prevState.homeWeather }), this.getWeatherData)
    }

    handleMenuLogin() {
        this.setState(this.initialState)
    }

    handleSetHomeWeather(e) {
        axios.put(setHomeWeatherURL, {
            username: this.state.username,
            homeWeather: this.state.searchText
        })
            .then(response => this.setState({ homeWeather: response.data })
            )
    }

    handleClearHomeWeather(e) {
        axios.put(setHomeWeatherURL, {
            username: this.state.username,
            homeWeather: ""
        })
            .then(response => this.setState({ homeWeather: response.data })
            )
    }


    handleNewUser(e) {
        axios.post(newUserURL, {
            username: this.state.usernameFieldText,
            password: this.state.passwordFieldText
        })
            .then(response => this.setState({ username: response.data.username, authenticated: true })
            )
    }

    handleLogin(e) {
        axios.post(loginURL, {
            username: this.state.usernameFieldText,
            password: this.state.passwordFieldText
        })
            .then(response => this.setState({ homeWeather: response.data.homeWeather, username: response.data.username, authenticated: true })
            )
    }

    handleUsernameFieldChange({ target: { value } }) {
        this.setState({ usernameFieldText: value })
    }

    handlePasswordFieldChange({ target: { value } }) {
        this.setState({ passwordFieldText: value })
    }

    removeRadar() {
        const radar = this.radar.current;
        while (radar.firstChild) {
            radar.removeChild(radar.firstChild);
        }
    }

    handleChange({ target: { value } }) {
        this.setState({ pendingSearchText: value })
    }
    handleSubmit(e) {
        if (e.keyCode === 13) {

            this.removeRadar()
            this.setState(prevState => ({ searchText: prevState.pendingSearchText }), this.getWeatherData)
        }
    }

    formatSearchText(searchText) {
        while (searchText[0] === " ") {
            searchText = searchText.slice(1)
        }
        searchText = searchText.replace(/\s\s+/g, '+')
        return searchText
    }

 

    geocodeAddress() {
        if (this.state.homeWeather === "") {
            return axios.get(`${geocodeURL}${this.formatSearchText(this.state.searchText)}`).then(response => response.data.Response.View[0].Result[0].Location)
        } else if (this.state.initialWeatherQuery){
            this.setState(prevState => ({ searchText: prevState.homeWeather, initialWeatherQuery: false }))
            return axios.get(`${geocodeURL}${this.formatSearchText(this.state.homeWeather)}`).then(response => response.data.Response.View[0].Result[0].Location)
        } else {
            return axios.get(`${geocodeURL}${this.formatSearchText(this.state.searchText)}`).then(response => response.data.Response.View[0].Result[0].Location)
        }
    }

    handleGeocode() {
        return this.geocodeAddress().then(geocodedLoc => {
            this.setState({ geocodedLoc })
            return geocodedLoc
        })
    }


    getWeather() {
        return this.handleGeocode().then((response) => {
            return axios.get(`${forcastURL}${response.NavigationPosition[0].Latitude},${response.NavigationPosition[0].Longitude}`)
                .then(response => response.data)
        })
    }


    handleWeather() {
        return this.getWeather().then(forcast => this.setState({ forcast }))
    }

    organizeWeather(prevState) {
        prevState.currentForcast = prevState.forcast.currently
        prevState.dailyForcast = prevState.forcast.daily
        prevState.hourlyForcast = prevState.forcast.hourly
        return prevState;
    }

    weather() {
        return this.handleWeather().then(() => this.setState(prevState => this.organizeWeather({ ...prevState })))

    }

    getWeatherData() {
        return this.weather()
            .then(response => {
                this.setState({ loading: false, err: null }, () => {
                    const weatherScript = `<script class="radar-map" type="text/javascript"src="https://darksky.net/map-embed/@radar,${this.state.geocodedLoc.NavigationPosition[0].Latitude},${this.state.geocodedLoc.NavigationPosition[0].Longitude},8.js?embed=true&timeControl=false&fieldControl=true&defaultField=radar" async></script>`;
                    postscribe(this.radar.current, weatherScript)
                })
            })
            .catch(err => this.setState({ loading: false, err: { message: "Error 404" } }))
    }

    render() {
        const { loading, err, authenticated } = this.state;
        return (
            <div className="home-wrapper">
                {
                    authenticated ?
                        <WeatherMounter loading={loading} err={err} getWeatherData={this.getWeatherData}>
                            <DisplayWeather
                                ref={this.radar}{...this.state}
                                handleChange={this.handleChange}
                                handleSubmit={this.handleSubmit}
                                handleMenuLogin={this.handleMenuLogin}
                                handleSetHomeWeather={this.handleSetHomeWeather}
                                handleClearHomeWeather={this.handleClearHomeWeather}
                                goToHomeWeather={this.goToHomeWeather}
                            />
                        </WeatherMounter>
                        :
                        <Login
                            handleLogin={this.handleLogin}
                            handlePasswordFieldChange={this.handlePasswordFieldChange}
                            handleUsernameFieldChange={this.handleUsernameFieldChange}
                            handleNewUser={this.handleNewUser}
                        />
                }
            </div>
        )
    }
}