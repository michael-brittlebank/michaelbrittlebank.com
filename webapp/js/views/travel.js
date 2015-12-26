var travel = {},
    map;

travel.places = [
    {
        title:'',
        lat: 52.517,
        lng: 13.394
    },
/**
 * americas
 */
    //america
    {
        title:'Isle Royale National Park, Michigan, USA',
        lat: 47.976258,
        lng: -88.931261
    },
    {
        title:'Orlando, Florida, USA',
        lat:28.538336,
        lng:-81.379236
    },
    {
        title:'Birchwood, Wisconsin, USA',
        lat:45.658044,
        lng:-91.5559
    },
    {
        title:'Madison, Wisconsin, USA',
        lat:43.0667,
        lng:-89.4000
    },
    {
        title:'Chicago, Illinois, USA',
        lat:41.8369,
        lng:-87.6847
    },
    {
        title:'Charlotte, North Carolina, USA',
        lat:35.2269,
        lng:-80.8433
    },
    {
        title:'Indianapolis, Indiana, USA',
        lat:39.7910,
        lng:-86.1480
    },
    {
        title:'Baltimore, Maryland, USA',
        lat:39.2833,
        lng:-76.6167
    },
    {
        title:'Washington D.C., USA',
        lat: 38.9047,
        lng:-77.0164
    },
    {
        title:'St. Louis, Missouri, USA',
        lat: 38.6272,
        lng: -90.1978
    },
    {
        title:'San Francisco, California, USA',
        lat: 37.7833,
        lng: -122.4167
    },
    {
        title:'San Louis Obispo, California, USA',
        lat: 35.2742,
        lng: -120.6631
    },
    {
        title:'Muir Woods National Monument, California, USA',
        lat: 37.8919,
        lng: -122.5708
    },
    {
        title:'Portland, Oregon, USA',
        lat: 45.5200,
        lng: -122.6819
    },
    {
        title:'Los Angeles, California, USA',
        lat: 34.0500,
        lng: 118.2500
    },
    {
        title:'Milwaukee, Wisconsin, USA',
        lat: 43.0500,
        lng: 87.9500
    },
    {
        title:'',
        lat: 52.517,
        lng: 13.394
    },
    {
        title:'',
        lat: 52.517,
        lng: 13.394
    },
    //canada
    {
        title:'Toronto, Canada',
        lat: 43.653226,
        lng: -79.383184
    },
    {
        title:'Niagara Falls, Canada',
        lat: 43.1167,
        lng: -79.0667
    },
    //mexico
    {
        title:'Costa Maya, Mexico',
        lat: 18.7140,
        lng: -87.7090
    },
    {
        title:'',
        lat: 52.517,
        lng: 13.394
    },
    {
        title:'',
        lat: 52.517,
        lng: 13.394
    },
/**
 * asia
 */
    //japan
    {
        title:'',
        lat: 52.517,
        lng: 13.394
    },
    {
        title:'',
        lat: 52.497,
        lng: 13.396
    },
    {
        title:'',
        lat:52.511,
        lng:13.447
    },
    {
        title:'',
        lat:52.511,
        lng:13.447
    },
/**
 * europe
 */
    //austria
    {
        title:'',
        lat: 52.517,
        lng: 13.394
    },
    {
        title:'',
        lat: 52.517,
        lng: 13.394
    },
    {
        title:'',
        lat: 52.517,
        lng: 13.394
    },
    //england
    {
        title:'London, England',
        lat: 51.507351,
        lng: -0.127758
    },
    {
        title:'York, England',
        lat: 53.959965,
        lng: -1.087298
    },
    {
        title:'Stratford-upon-Avon, England',
        lat: 52.19173,
        lng: -1.708298
    },
    {
        title:'Thirsk, England',
        lat: 54.233849,
        lng: -1.341377
    },
    //france
    {
        title:'Paris, France',
        lat: 51.507351,
        lng: -0.127758
    },
    {
        title:'Colmar, France',
        lat: 48.0817,
        lng: 7.3556
    },
    {
        title:'',
        lat: 52.517,
        lng: 13.394
    },
    //germany
    {
        title:'',
        lat: 52.517,
        lng: 13.394
    },
    {
        title:'',
        lat: 52.517,
        lng: 13.394
    },
    //hungary
    {
        title:'',
        lat: 52.517,
        lng: 13.394
    },
    {
        title:'',
        lat: 52.517,
        lng: 13.394
    },
    //iceland
    {
        title:'Reykjavik, Iceland',
        lat: 64.1333,
        lng: 21.9333
    },
    {
        title:'Thingvellir, Iceland',
        lat: 64.2581,
        lng: -21.1250
    },
    {
        title:'Gullfoss, Iceland',
        lat: 64.3261,
        lng: -20.1211
    },
    {
        title:'Geysir, Iceland',
        lat: 64.3109,
        lng: -20.3038
    },
    {
        title:'Langjökull Glacier, Iceland',
        lat: 64.7500,
        lng: -19.9831
    },
    //italy
    {
        title:'',
        lat: 52.517,
        lng: 13.394
    },
    {
        title:'',
        lat: 52.517,
        lng: 13.394
    },
    //ireland
    {
        title:'',
        lat: 52.517,
        lng: 13.394
    },
    {
        title:'',
        lat: 52.517,
        lng: 13.394
    },
    {
        title:'',
        lat: 52.517,
        lng: 13.394
    },
    {
        title:'',
        lat: 52.517,
        lng: 13.394
    },
    {
        title:'',
        lat: 52.517,
        lng: 13.394
    },
    //luxembourg
    {
        title:'',
        lat: 52.517,
        lng: 13.394
    },
    //monaco
    {
        title:'',
        lat: 52.517,
        lng: 13.394
    },
    //netherlands
    {
        title:'',
        lat: 52.517,
        lng: 13.394
    },
    //norway
    {
        title:'Stavanger, Norway',
        lat: 58.969976,
        lng: 5.733107
    },
    {
        title:'Lysebotn, Norway',
        lat: 59.055407,
        lng: 6.64853
    },
    {
        title:'Preikestolen, Norway',
        lat: 58.9861,
        lng: 6.1886
    },
    //portugal
    {
        title:'',
        lat: 52.517,
        lng: 13.394
    },
    {
        title:'',
        lat: 52.517,
        lng: 13.394
    },
    {
        title:'',
        lat: 52.517,
        lng: 13.394
    },
    //slovakia
    {
        title:'',
        lat: 52.517,
        lng: 13.394
    },
    {
        title:'',
        lat: 52.517,
        lng: 13.394
    },
    //slovenia
    {
        title:'',
        lat: 52.517,
        lng: 13.394
    },
    {
        title:'',
        lat: 52.517,
        lng: 13.394
    },
    {
        title:'',
        lat: 52.517,
        lng: 13.394
    },
    //sweden
    {
        title:'Stockholm, Sweden',
        lat: 59.3294,
        lng: 18.0686
    },
    //switzerland
    {
        title:'',
        lat: 52.517,
        lng: 13.394
    },
    {
        title:'',
        lat: 52.517,
        lng: 13.394
    },
];

travel.markers = [];

travel.maps = {
    initMap: function() {
        map = new google.maps.Map(document.getElementById('map'), {
            zoom: 4,
            center: {
                lat: 43.653226,
                lng: -79.383184//toronto
            },
            streetViewControl: false,
            mapTypeControl: false,
            mapTypeControlOptions: {
                mapTypeIds: [
                    google.maps.MapTypeId.TERRAIN
                ]
            }
        });
        window.setTimeout(function() {
                travel.maps.dropMarkers();
            },
            2500);
    },
    dropMarkers: function() {
        travel.maps.clearMarkers();
        var places = site.helpers.shuffleArray(travel.places);
        for (var i = 0; i < places.length; i++) {
            travel.maps.addMarkerWithTimeout(places[i], i * 100);
        }
    },
    addMarkerWithTimeout: function(place, timeout) {
        window.setTimeout(function() {
            travel.markers.push(new google.maps.Marker({
                position: place,
                title: place.title,
                map: map,
                animation: google.maps.Animation.DROP
            }));
        }, timeout);
    },
    clearMarkers: function() {
        for (var i = 0; i < travel.markers.length; i++) {
            travel.markers[i].setMap(null);
        }
        travel.markers = [];
    }
};

travel.init = function(){
    travel.maps.initMap();
};