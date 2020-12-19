const axios = require('axios')
const URI = "https://maps.googleapis.com/maps/api/geocode/json"
const API_KEY = "AIzaSyAbTlPQ807yehAPnonhjLKv6nV673glMVs"
module.exports = {
  getLocationName: function(lat, long) {
    return new Promise((resolve, reject) => {
      const url = `${URI}?latlng=${lat},${long}&key=${API_KEY}`
      axios
        .get(url)
        .then((response) => {
          let name = null
          if(response.status === 200 && response.data.status === 'OK') {
            let results = response.data.results;
            // console.log(results);
            for(let i=0; i<results.length; i++) {
              if(name) break;
              let temp = results[i].address_components || [];
              for(let j=0; j<temp.length; j++) {
                if(temp[j].types.indexOf('route') !== -1) {
                  name = temp[j].long_name  || temp[j].short_name
                  break;
                }
              }
            }
          }

          return resolve(name || "Unnamed Road")
        })
        .catch((err) => {
          reject(err);
        })
    })
  },
  getDistance: function(origin, destination) {
    return new Promise((resolve, reject) => {
      const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${origin.lat},${origin.lng}&destinations=${destination.lat},${destination.lng}&key=${API_KEY}`;
      axios
        .get(url)
        .then((response) => {
          if(response.status === 200 && response.data.status === 'OK') {
            const total = 0;
            response.data.rows.forEach((row) => {
              total += row.distance.value;
            });

            return resolve(total/response.data.rows.length/1000);
          }

          return reject(response)
        })
        .catch((err) => {
          reject(err);
        })
    });
  },
  getRoad: function(origin, destination) {
    return new Promise((resolve, reject) => {
      const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${origin.lat},${origin.lng}&destinations=${destination.lat},${destination.lng}&key=${API_KEY}`;
      axios
        .get(url)
        .then((response) => {
          if(response.status === 200 && response.data.status === 'OK') {
            const total = 0;
            response.data.rows.forEach((row) => {
              total += row.distance.value;
            });

            return resolve(total/response.data.rows.length/1000);
          }

          return reject(response)
        })
        .catch((err) => {
          reject(err);
        })
    });
  }
}
