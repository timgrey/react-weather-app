import React, { Component } from 'react'
import Loading from './Loading';

class WeatherMounter extends Component {
    componentDidMount() {
        this.props.getWeatherData();
    }
    render() {
        const { children, loading, err } = this.props;
        return (
            loading ?
                <Loading />
                :
                err ?
                    <p>{err.message}</p>
                    :
                    children
        )
    }
}

export default WeatherMounter