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
        title:'',
        lat:52.511,
        lng:13.447
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
    //canada
    {
        title:'Toronto, Canada',
        lat: 43.653226,
        lng: -79.383184
    },
    {
        title:'Niagara Falls, Canada',
        lat: 69.922567,
        lng: 22.092578
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
        lat: 69.922567,
        lng: 22.092578
    },
    //sweden
    {
        title:'Stockholm, Sweden',
        lat: 69.922567,
        lng: 22.092578
    }
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
    addMarkerWithTimeout: function(position, timeout) {
        window.setTimeout(function() {
            travel.markers.push(new google.maps.Marker({
                position: position,
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