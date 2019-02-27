import React, { Component } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

class Map extends Component {
  componentDidMount() {

    mapboxgl.accessToken = this.props.accessToken;

    this.map = new mapboxgl.Map({
      container: 'map', // html element id in render
      style: `mapbox://styles/mapbox/streets-v9`,
      center: [-74.50, 40], // note: lon comes before lat
      zoom: 9
    })

    this.map.on('click', function (e) {
      console.log(e.lngLat, e.lngLat.lng)
      this.props.onClick([e.lngLat.lng, e.lngLat.lat])
    }.bind(this));

  }

  render() {
    return <div id="map" />;
  }

}



export default Map;