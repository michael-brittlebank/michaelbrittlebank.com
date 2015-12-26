var travel = {},
    map;

travel.places = [
    {lat: 52.511, lng: 13.447},
    {lat: 52.549, lng: 13.422},
    {lat: 52.497, lng: 13.396},
    {lat: 52.517, lng: 13.394}
];

travel.markers = [];

travel.maps = {
    initMap: function() {
        map = new google.maps.Map(document.getElementById('map'), {
            zoom: 3,
            center: {lat: 52.520, lng: 13.410}
        });
        window.setTimeout(function() {
                travel.maps.dropMarkers();
            },
            2500);
//            var ctaLayer = new google.maps.KmlLayer({
//                url: 'https://assets.contentful.com/qiqlnlpznam2/4j92IVxgMU2ESKwYS0Sym0/1e072a1de9cf6b03769d137b43617a21/travel.kml',//todo move to contenful
//                map: map
//            });
    },
    dropMarkers: function() {
        travel.maps.clearMarkers();
        var places = site.helpers.shuffleArray(travel.places);
        for (var i = 0; i < places.length; i++) {
            travel.maps.addMarkerWithTimeout(places[i], i * 200);
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