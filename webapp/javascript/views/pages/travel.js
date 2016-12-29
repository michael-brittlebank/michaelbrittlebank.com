(function(){

    var that = app.views.travel,
        $ = jQuery,
        helpers = app.helpers,
        animations = app.animations,
        map,
        places = data.places,
        markers = [];

    this.initMap =  function() {
        animations.animateElement($('#travel-map-container'),{
            properties: {
                opacity: 1
            },
            duration: 1000
        });
        var place = helpers.getRandomElement(places);
        map = new google.maps.Map(document.getElementById('travel-map-container'), {
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
            //slider init
            $('#travel-images').slick({
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
            animations.animateElement($('#travel-images-container'),{
                properties: {
                    opacity: 1
                },
                duration: 1000
            });
        }
    };

}).apply(app.views.travel);