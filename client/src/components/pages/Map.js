import React, { Component } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

class Map extends Component {

  componentDidMount() {

    mapboxgl.accessToken = this.props.accessToken;

    let location = this.props.location
    if (!location || location.length == 0 || location[0] == null) location = [0, 0]

    console.log("we're using the location", location, location.length)

    this.map = new mapboxgl.Map({
      container: `map${this.props.id}`, // html element id in render
      style: `mapbox://styles/mapbox/streets-v9`,
      center: location, // note: lon comes before lat
      zoom: 3
    })

    var coordinates = document.getElementById('coordinates');
    var marker = new mapboxgl.Marker({
      draggable: this.props.allowMovement
    })
      .setLngLat(location)
      .addTo(this.map);
    function onDragEnd() {
      var lngLat = marker.getLngLat();
      coordinates.style.display = 'block';
      coordinates.innerHTML = 'Longitude: ' + lngLat.lng + '<br />Latitude: ' + lngLat.lat;
      if (this.props.onClick) {
        this.props.onClick([lngLat.lng, lngLat.lat])
      }
    }
    marker.on('dragend', onDragEnd.bind(this));

  }

  render() {
    return (
      <div>
        <div style={{ width: "300px", height: "300px" }} id={`map${this.props.id}`} />
        <pre id='coordinates' className='coordinates'>stuff</pre>
      </div>
    );
  }

}

export default Map;