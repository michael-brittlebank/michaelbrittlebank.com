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
        lat: 48.1000,
        lng: -88.5500
    },
    {
        title:'Orlando, Florida, USA',
        lat:28.4158,
        lng:-81.2989
    },
    {
        title:'Birchwood, Wisconsin, USA',
        lat:45.7258,
        lng:-91.6089
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
        lat: 43.7000,
        lng: -79.4000
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
        title:'Innsbruck, Austria',
        lat: 47.2667,
        lng: 11.3833
    },
    {
        title:'Bludenz, Austria',
        lat: 47.1333,
        lng: 9.8167
    },
    {
        title:'',
        lat: 52.517,
        lng: 13.394
    },
    //czech republic
    {
        title:'Prague, Czech Republic',
        lat: 50.0833,
        lng: 14.4167
    },
    //denmark
    {
        title:'Copenhagen, Denmark',
        lat:55.6761,
        lng:12.5683
    },
    //england
    {
        title:'London, England',
        lat: 51.5072,
        lng: -0.1275
    },
    {
        title:'York, England',
        lat: 53.9583,
        lng: -1.0803
    },
    {
        title:'Stratford-upon-Avon, England',
        lat: 52.1900,
        lng: -1.7100
    },
    {
        title:'Thirsk, England',
        lat: 54.2327,
        lng: -1.3420
    },
    //france
    {
        title:'Paris, France',
        lat: 48.8567,
        lng: 2.3508
    },
    {
        title:'Colmar, France',
        lat: 48.0817,
        lng: 7.3556
    },
    {
        title:'Menton, France',
        lat: 43.7750,
        lng: 7.5000
    },
    {
        title:'Èze, France',
        lat: 43.7286,
        lng: 7.3617
    },
    {
        title:'Nice, France',
        lat: 43.7034,
        lng: 7.2663
    },
    {
        title:'',
        lat: 52.517,
        lng: 13.394
    },
    //germany
    {
        title:'Trier, Germany',
        lat: 49.7500,
        lng: 6.6333
    },
    {
        title:'Cologne, Germany',
        lat: 50.9364,
        lng: 6.9528
    },
    //hungary
    {
        title:'Budapest, Hungary',
        lat: 47.4925,
        lng: 19.0514
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
        title:'Domodossola, Italy',
        lat: 46.1167,
        lng: 8.2833
    },
    {
        title:'Milan, Italy',
        lat: 45.4667,
        lng: 9.1833
    },
    {
        title:'Ventimiglia, Italy',
        lat: 43.7903,
        lng: 7.6083
    },
    {
        title:'Apricale, Italy',
        lat: 43.8833,
        lng: 7.6667
    },
    {
        title:'Isolabona, Italy',
        lat: 43.8833,
        lng: 7.6333
    },
    {
        title:'Cervo, Italy',
        lat: 43.9167,
        lng: 8.1167
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
        title:'Luxembourg City, Luxembourg',
        lat: 49.6000,
        lng: 6.1167
    },
    //monaco
    {
        title:'Monaco',
        lat: 43.7328,
        lng: 7.4197
    },
    //netherlands
    {
        title:'Amsterdam, Netherlands',
        lat: 52.3667,
        lng: 4.9000
    },
    //norway
    {
        title:'Stavanger, Norway',
        lat: 58.9633,
        lng: 5.7189
    },
    {
        title:'Lysebotn, Norway',
        lat: 59.0550,
        lng: 6.6494
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
        title:'Ljubljana, Slovenia',
        lat: 46.0556,
        lng: 14.5083
    },
    {
        title:'Postojna, Slovenia',
        lat: 45.7759,
        lng: 14.2137
    },
    {
        title:'Škocjan Caves, Slovenia',
        lat: 45.6622,
        lng: 13.9883
    },
    {
        title:'Piran, Slovenia',
        lat: 45.5284,
        lng: 13.5684
    },
    {
        title:'Triglav National Park, Slovenia',
        lat: 46.3333,
        lng: 13.7667
    },
    {
        title:'Bled, Slovenia',
        lat: 46.3688,
        lng: 14.1140
    },
    //sweden
    {
        title:'Stockholm, Sweden',
        lat: 59.3294,
        lng: 18.0686
    },
    //switzerland
    {
        title:'Chur, Switzerland',
        lat: 46.8500,
        lng: 9.5333
    },
    {
        title:'Locarno, Switzerland',
        lat: 46.1667,
        lng: 8.8000
    },
    {
        title:'Bellinzona, Switzerland',
        lat: 46.2000,
        lng: 9.0167
    },
];

travel.markers = [];

travel.maps = {
    initMap: function() {
        map = new google.maps.Map(document.getElementById('map'), {
            zoom: 4,
            center: {
                lat: 43.653226,//todo, get random marker
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