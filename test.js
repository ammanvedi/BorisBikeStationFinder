var L = require('./index');

var nearest = L.findNearest(51.503902, -0.143859);

//console.log('nearest ' + nearest.stationobj.name + " " + nearest.distance);

    for(var l = 0; l < nearest.length; l++)
    {
        console.log(nearest[l].stationobj.name + " " + nearest[l].distance);
    }