(function(){

    var that = app.views.travel,
        $ = jQuery,
        helpers = app.helpers,
        animations = app.animations,
        map,
        places = data.places;

    this.initializeMap =  function() {
        //initialize map
        var place = _.sample(places),
            mapMarker,
            mapOptions = {
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
            };
        map = new google.maps.Map(document.getElementById('travel-map-container'), mapOptions);
        _.each(places, function(entry){
            mapMarker = new google.maps.Marker({
                position: entry,
                title: entry.title,
                map: map,
                animation: google.maps.Animation.DROP
            });
            //add event listener to display titles
            google.maps.event.addListener(mapMarker, 'click', function() {
                if (!this.getMap()._infoWindow) {
                    this.getMap()._infoWindow = new google.maps.InfoWindow();
                }
                this.getMap()._infoWindow.close();
                this.getMap()._infoWindow.setContent(entry.title);
                this.getMap()._infoWindow.open(this.getMap(), this);
            });
        });
        //show base map
        animations.fadeIn($('#travel-map-container'),{duration: 1000});
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
            animations.fadeIn($('#travel-images-container'),{duration: 500});
        }
    };

}).apply(app.views.travel);