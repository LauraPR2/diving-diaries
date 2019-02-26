# MERN Airbnb

## Introduction

Your goal is to recreate a very simple Airbnb clone. You can find an example here: https://mern-airbnb.herokuapp.com

To reproduce this lab, you have to use the MERN boilerplate. This repository only contains instructions and the solution.

![image](https://user-images.githubusercontent.com/5306791/53396450-bc6a1780-39a4-11e9-9266-6302e0ea6495.png)


## Lesson | How to add a Map with Mapbox?

### Initialisation to do the first time

```sh
cd client
npm install mapbox-gl
```

```js
// client/src/index.js
import 'mapbox-gl/dist/mapbox-gl.css' // Import of Mapbox CSS
import mapboxgl from 'mapbox-gl/dist/mapbox-gl'

// ...

// Inform your Mapbox token (https://www.mapbox.com/account/)
mapboxgl.accessToken = 'YourToken'
```

### Add a simple map in a component

```js
import React, { Component } from 'react';
import mapboxgl from 'mapbox-gl/dist/mapbox-gl'

class MapboxExample extends Component {
  constructor(props) {
    super(props)
    this.mapRef = React.createRef()
    this.map = null
    this.marker = null
  }
  initMap() {
    // Embed the map where "this.mapRef" is defined in the render
    this.map = new mapboxgl.Map({
      container: this.mapRef.current,
      style: 'mapbox://styles/mapbox/streets-v10',
      center: [13.37, 52.51], // Berlin lng,lat
      zoom: 5
    })

    // Add zoom control on the top right corner
    this.map.addControl(new mapboxgl.NavigationControl())

    // Create a marker on the map in Berlin ([13.37, 52.51])
    this.marker = new mapboxgl.Marker({ color: 'red' })
      .setLngLat([13.37, 52.51])
      .addTo(this.map)
  }
  render() {
    return (
      <div>
        {/* The map will be injected here. Don't forget to give a height! */}
        <div ref={this.mapRef} style={{height: 300, width: 400}}></div>
      </div>
    )
  }
  componentDidMount() {
    this.initMap()
  }
}

export default MapboxExample
```


## Instructions

### Setup

First, create a new project by using the MERN boilerplate: https://github.com/mc100s/mern-boilerplate

If you want to have the same design, you can use Bootstrap with Reactstrap:
```sh
cd client
npm i bootstrap reactstrap
```

```scss
// client/src/styles/index.scss
$primary: #df4545; // Red
@import 'bootstrap/scss/bootstrap';
```


### Create Home feature

![image](https://user-images.githubusercontent.com/5306791/53398328-a448c700-39a9-11e9-887d-6a17a9597548.png)


For this task (that comes from Trello), you will have to:
- Create a `Home` model (code below).
- Create a route `POST /api/homes` to add a home. You can for example send `title`, `description`, `pricePerNight`, `lng` and `lat`.
- Test it with Postman and make sure a document is created.
- Create a method `addHome` in `client/src/api.js`.
- Create a component `client/src/components/pages/AddHome.js` to let the user adding a home. It's okay at this stage to ask the user for the latitude and longitude of a place.


```js
// server/models/Home.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const homeSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  pricePerNight: { type: Number, required: true },
  location: {
    type: { type: String, required: true },
    coordinates: { type: [Number], required: true }
  },
  _owner: { type: Schema.Types.ObjectId, ref: 'User' }
}, {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  });

const Home = mongoose.model('Home', homeSchema);
module.exports = Home;
```

### Read Home feature

![image](https://user-images.githubusercontent.com/5306791/53398546-2df89480-39aa-11e9-924f-04b8a3fe52e2.png)


### Create Home feature with a map 

![image](https://user-images.githubusercontent.com/5306791/53398643-65674100-39aa-11e9-8b95-d6b9aacbf722.png)
