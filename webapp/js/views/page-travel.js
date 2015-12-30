var travel = {},
    map;

travel.places = data.places;

travel.markers = [];

travel.maps = {
    initMap: function() {
        site.animation.fadeIn('#container-rule',1000,0,0);
        site.animation.fadeIn('#container-google',1000,500,0);
        var place = site.helpers.getRandomElement(travel.places);
        map = new google.maps.Map(document.getElementById('container-google'), {
            zoom: 4,
            center: {
                lat: place.lat,
                lng: place.lng
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
            travel.maps.addMarkerWithTimeout(places[i], i * 50);
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
    site.animation.fadeIn('#container-images',1000,1000,0);
    $('.travel-images').slick({
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        centerMode: true,
        autoplay: true,
        autoplaySpeed: 5000,
        speed: 500,
        fade: true,
        cssEase: 'linear',
        dots: true,
        pauseOnDotsHover: true
    });
};