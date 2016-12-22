(function(){

    var that = app.views.travel,
        $ = jQuery,
        helpers = app.helpers,
        animations = app.animations,
        map,
        places = data.places,
        markers = [];

    this.initMap =  function() {
        console.log('init');
        animations.fadeIn($('#container-rule'),1000,0,0);
        animations.fadeIn($('#container-google'),1000,500,0);
        var place = helpers.getRandomElement(places);
        map = new google.maps.Map(document.getElementById('container-google'), {
            zoom: 4,
            center: {
                lat: place.lat,
                lng: place.lng
            },
            minZoom: 3,
            maxZoom: 7,
            streetViewControl: false,
            mapTypeControl: false,
            mapTypeControlOptions: {
                mapTypeIds: [
                    google.maps.MapTypeId.TERRAIN
                ]
            }
        });
        for (var i = 0; i < places.length; i++) {
            markers.push(new google.maps.Marker({
                position: places[i],
                title: places[i].title,
                map: map,
                animation: google.maps.Animation.DROP
            }));
        }
    };

    this.init = function(){
        if ($('#page-travel').length > 0) {
            animations.fadeIn($('#container-images'), 1000, 1000, 0);
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
        }
    };

}).apply(app.views.travel);