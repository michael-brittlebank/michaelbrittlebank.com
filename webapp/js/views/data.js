var data = {};

data.places = [
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
        lng: -118.2500
    },
    {
        title:'Milwaukee, Wisconsin, USA',
        lat: 43.0500,
        lng: -87.9500
    },
    {
        title:'Rochester, Minnesota, USA',
        lat: 44.0234,
        lng: -92.4630
    },
    {
        title:'Kauai, Hawaii, USA',
        lat: 22.0833,
        lng: -159.5000
    },
    {
        title:'Maui, Hawaii, USA',
        lat: 20.8000,
        lng: -156.3333
    },
    {
        title:'Platteville, Wisconsin, USA',
        lat: 42.7371,
        lng: -90.4775
    },
    {
        title:'Rockford, Illinois, USA',
        lat: 42.2594,
        lng: -89.0644
    },
    {
        title:'Eau Claire, Wisconsin, USA',
        lat: 44.8167,
        lng: -91.5000
    },
    {
        title:'Appleton, Wisconsin, USA',
        lat: 44.2667,
        lng: -88.4000
    },
    {
        title:'Duluth, Minnesota, USA',
        lat: 46.8000,
        lng: -92.1000
    },
    {
        title:'Superior, Wisconsin, USA',
        lat: 46.7069,
        lng: -92.0853
    },
    {
        title:'Albert Lea, Minnesota, USA',
        lat: 43.6479,
        lng: -93.3688
    },
    {
        title:'La Crosse, Wisconsin, USA',
        lat: 43.8133,
        lng: -91.2331
    },
    {
        title:'Bella Vista, Arkansas, USA',
        lat: 36.4689,
        lng: -94.2686
    },
    {
        title:'Kansas City, Missouri, USA',
        lat: 39.0997,
        lng: -94.5783
    },
    {
        title:'Dubuque, Iowa, USA',
        lat: 42.5043,
        lng: -90.6869
    },
    {
        title:'Minocqua, Wisconsin, USA',
        lat: 45.8714,
        lng: -89.7111
    },
    {
        title:'Grand Canyon, Arizona, USA',
        lat: 36.1000,
        lng: -112.1000
    },
    {
        title:'Sedona, Arizona, USA',
        lat: 34.8600,
        lng: -111.7892
    },
    {
        title:'Erie, Pennsylvania, USA',
        lat: 42.1296,
        lng: -80.0852
    },
    {
        title:'Minneapolis, Minnesota, USA',
        lat: 44.9778,
        lng: -93.2650
    },
    {
        title:'Bentonville, Arkansas, USA',
        lat: 36.3667,
        lng: -94.2133
    },
    {
        title:'Grinnell, Iowa, USA',
        lat: 41.7436,
        lng: -92.7247
    },
    {
        title:'Vero Beach, Florida, USA',
        lat: 27.6500,
        lng: -80.3833
    },
    {
        title:'Lawrence, Kansas, USA',
        lat: 38.9717,
        lng: -95.2353
    },
    {
        title: 'Bowling Green, Kentucky, USA',
        lat: 36.9817,
        lng: -86.4444
    },
    //canada
    {
        title:'Toronto, Ontario, Canada',
        lat: 43.7000,
        lng: -79.4000
    },
    {
        title:'Niagara Falls, Ontario, Canada',
        lat: 43.1167,
        lng: -79.0667
    },
    {
        title:'Warblers Roost, Ontario, Canada',
        lat: 45.815722,
        lng: -79.562559
    },
    {
        title:'Montreal, Quebec, Canada',
        lat: 45.5017,
        lng: -73.5673
    },
    //mexico
    {
        title:'Costa Maya, Mexico',
        lat: 18.7140,
        lng: -87.7090
    },
    {
        title:'Cozumel, Mexico',
        lat: 20.4167,
        lng: -86.9167
    },
/**
 * asia
 */
    //japan
    {
        title:'Tokyo, Japan',
        lat: 35.6833,
        lng: 139.6833
    },
    {
        title:'Kyoto, Japan',
        lat: 35.0117,
        lng: 135.7683
    },
    {
        title:'Mount Fuji, Japan',
        lat: 35.3580,
        lng: 138.7310
    },
    {
        title:'Hakone, Japan',
        lat: 35.1833,
        lng: 139.0333
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
    {
        title:'Sheffield, England',
        lat: 53.3836,
        lng: -1.4669
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
        title:'Versailles, France',
        lat: 48.8044,
        lng: 2.1232
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
    {
        title:'Berlin, Germany',
        lat: 52.5167,
        lng: 13.3833
    },
    //hungary
    {
        title:'Budapest, Hungary',
        lat: 47.4925,
        lng: 19.0514
    },
    //iceland
    {
        title:'Reykjavik, Iceland',
        lat: 64.1333,
        lng: -21.9333
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
        title:'Glenveagh National Park, Ireland',
        lat: 55.0167,
        lng: -8.0500
    },
    {
        title:'Cliffs of Moher, Ireland',
        lat: 52.9361,
        lng: -9.4708
    },
    {
        title:'Connemara, Ireland',
        lat: 53.5000,
        lng: -9.7500
    },
    {
        title:'Giant\'s Causeway, Ireland',
        lat: 55.2408,
        lng: -6.5117
    },
    {
        title:'Carrick-a-Rede Rope Bridge, Ireland',
        lat: 55.2400,
        lng: -6.3310
    },
    {
        title:'Galway, Ireland',
        lat: 53.2719,
        lng: -9.0489
    },
    {
        title:'Dublin, Ireland',
        lat: 53.3478,
        lng: -6.2597
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
        title:'Lisbon, Portugal',
        lat: 38.7139,
        lng: -9.1394
    },
    {
        title:'Sintra, Portugal',
        lat: 38.7992,
        lng: -9.3883
    },
    //slovakia
    {
        title:'Bratislava, Slovakia',
        lat: 48.1439,
        lng: 17.1097
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
    }
];