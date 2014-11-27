Node module to find the N nearest Barclays Cycle Hire London stations to the given Latitude and Longitude.

#Installation 


```javascript
$ > npm install tfl-boris-station-finder

```

or 

```javascript
$ > git clone https://github.com/ammanvedi/BorisBikeStationFinder.git/

```

#Usage 

```javascript
var L = require('tfl-boris-station-finder');

var nearest = L.findNearest(51.503902, -0.143859, 3);

```

| Method  |  Parameters |Description  |
|---|---|---|---|---|
| findNearest  |  latitude, longitude, N |  Find the N nearest stations to the given latitude and longitude co-ordinates |   |   

#####Return Value

returns a js object array containing the distance and other relavent station information.

```javascript
[
   {
      "distance":0.3795541150359513,
      "stationobj":{
         "id":"49",
         "name":"Curzon Street, Mayfair",
         "lat":"51.50706909",
         "long":"-0.145904427"
      }
   },
   {
      "distance":0.4043628804093961,
      "stationobj":{
         "id":"528",
         "name":"Clarges Street, West End",
         "lat":"51.507326",
         "long":"-0.145827"
      }
   },
   {
      "distance":0.3095269336368173,
      "stationobj":{
         "id":"541",
         "name":"Green Park Station, West End",
         "lat":"51.506613",
         "long":"-0.142844"
      }
   }
]

```


#Implementation

First computes an array of distances to each available station. Then uses a single pass partial heap sort to gather the N smallest items. 


