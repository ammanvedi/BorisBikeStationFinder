

module.exports = (function () {
    
    var stations = require('./stations-pretty.js');
    
    var calcDist = function (lat1, lon1, lat2, lon2) 
    {
        var R = 6371;
        var a = 
        0.5 - Math.cos((lat2 - lat1) * Math.PI / 180)/2 + 
        Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
        (1 - Math.cos((lon2 - lon1) * Math.PI / 180))/2;

        return R * 2 * Math.asin(Math.sqrt(a));
    }
    
    var ClosestTo = function (lat, lng, kt)
    {
        var lowest = 90000;
        var dist;
        var lowestobj;
        var count = 0;
        var Distances = new Array();
        var k = kt;
        
        //find distances
        
        stations.station.forEach( function(o)
        {
            dist = calcDist(lat, lng, o.lat, o.long);
                
            if(dist < lowest)
            {
                lowest = dist;
                lowestobj = o;
            }  
            Distances.push({distance:dist, stationobj: o});
            count++;
        });
        
        //distances now contains station and distance from 
        //the lat/lng point
        
        var smallestArray = new Array();
        
        //init with first k elements of array
        
        for(var x = 0; x < k; x++)
        {
            smallestArray.push(Distances[x]);
        }
        
        smallestArray.push({distance:9000, stationobj: {}});
        
        //remainder of list starts at position k in Distances array
        
        for(var y = k; y < Distances.length; y++ )
        {
            
            var biggestidx = 0;
            var biggestval = 0;
            
            for(var t = 0; t < (k+1); t++)
            {
                if(smallestArray[t].distance > biggestval)
                {
                    biggestidx = t;
                    biggestval = smallestArray[t].distance;
                }
            }
            
            //add next val from distances overwriting largest
            //element
            
            smallestArray[biggestidx] = Distances[y];
        }
        
        smallestArray = smallestArray.slice(0,biggestidx).concat(smallestArray.slice(biggestidx + 1));
        
        return smallestArray;
    }
    
    return {
        // A public variable
        clientid: 0,
        // A public function utilizing privates
        findNearest: function (la, ln, kn) {
        return ClosestTo(la, ln, kn);
        }
        
    } //end return 

})();