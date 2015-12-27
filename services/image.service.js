var /* packages */
    contentful = require('contentful'),
    request   = require('request'),
    Q         = require('q'),
    //fs        = require('fs'),
    //urlParser = require('url'),
    //glob      = require('glob'),
/* config */
    config = require('../config/config'),
/* services */
    errorService = require('./error.service'),
    logger = require('./logger.service'),
    webapp = require('./webapp.service'),
/* variables */
    imgurApiUrl = 'https://api.imgur.com/3/',
    imgurClientId = config.imgur.clientId,
    imgurUserName = config.imgur.userEmail,
    imgurPassword = config.imgur.userPassword,
    imgurAccessToken = null,
    imageService = {};

imageService.albums = {
    travel: '5mxt2'
};

/**
 * Send a request to imgur's public API
 *
 * @param   {string}  operation - operation to perform; 'info' or 'upload'
 * @param   {mixed}   payload - image data
 * @returns {promise}
 */
function _imgurRequest (operation, payload, extraFormParams) {
    var deferred = Q.defer(),
        form     = null,
        options  = {
            uri:      imgurApiUrl,
            method:   null,
            encoding: 'utf8',
            json:     true
        };
    if (!operation || typeof operation !== 'string' || (!payload && operation !== 'credits')) {
        deferred.reject(new Error('Invalid argument'));
        return deferred.promise;
    }
    switch(operation) {
        case 'upload':
            options.method = 'POST';
            options.uri += 'image';
            break;
        case 'credits':
            options.method = 'GET';
            options.uri += 'credits';
            break;
        case 'info':
            options.method = 'GET';
            options.uri += 'image/' + payload;
            break;
        case 'album':
            options.method = 'GET';
            options.uri += 'album/' + payload;
            break;
        case 'createAlbum':
            options.method = 'POST';
            options.uri += 'album';
            break;
        default:
            deferred.reject(new Error('Invalid operation'));
            return deferred.promise;
    }
    _getAuthorizationHeader()
        .then(function (authorizationHeader) {
            options.headers = {
                Authorization: authorizationHeader
            };
            var r = request(options, function (err, res, body) {
                if (err) {
                    deferred.reject(err);
                } else if (!body.success) {
                    deferred.reject({status: body.status, message: body.data.error});
                } else {
                    deferred.resolve(body);
                }
            });
            if (operation === 'upload') {
                form = r.form();
                form.append('image', payload);
                if (typeof extraFormParams === 'object') {
                    for (var param in extraFormParams) {
                        form.append(param, extraFormParams[param]);
                    }
                }
            }
        })
        .catch(function (err) {
            deferred.reject(err);
        });
    return deferred.promise;
}

/**
 * Make a request, handling potential errors
 *
 * @param {object} options
 * @returns {promise}
 */
function _request (options) {
    var deferred = Q.defer();
    request(options, function (err, res, body) {
        if (err) {
            deferred.reject(err);
        } else {
            deferred.resolve(res);
        }
    });
    return deferred.promise;
}

/**
 * Get imgur access token using credentials
 *
 * @returns {promise}
 */
function _getAuthorizationHeader () {
    var deferred = Q.defer();
    if (imgurAccessToken) {
        deferred.resolve('Bearer ' + imgurAccessToken);
    } else if (imgurUserName && imgurPassword) {
        var options = {
            uri: 'https://api.imgur.com/oauth2/authorize',
            method: 'GET',
            encoding: 'utf8',
            qs: {
                client_id: imgurClientId,
                response_type: 'token'
            }
        };
        _request(options).then(function (res) {
            var authorize_token = res.headers['set-cookie'][0].match('(^|;)[\s]*authorize_token=([^;]*)')[2];
            options.method = 'POST';
            options.json = true;
            options.form = {
                username: imgurUserName,
                password: imgurPassword,
                allow: authorize_token
            };
            options.headers = {
                Cookie: 'authorize_token=' + authorize_token
            };
            _request(options).then(function (res) {
                var location = res.headers.location;
                var token = JSON.parse('{"' + decodeURI(location.slice(location.indexOf('#') + 1)).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"') + '"}');
                imgurAccessToken = token.access_token;
                deferred.resolve('Bearer ' + imgurAccessToken);
            }).catch(function (err) {
                deferred.reject(err);
            });
        }).catch(function (err) {
            deferred.reject(err);
        });
    } else {
        deferred.resolve('Client-ID ' + imgurClientId);
    }

    return deferred.promise;
}

function getAlbumInfo (id) {
    var deferred = Q.defer();
    if (!id) {
        deferred.reject(new Error('Invalid album ID'));
        return deferred.promise;
    }
    _imgurRequest('album', id)
        .then(function (json) {
            deferred.resolve(json);
        })
        .catch(function (err) {
            deferred.reject(err);
        });
    return deferred.promise;
}

imageService.getAlbumImages = function(params){
    if (imageService.albums.hasOwnProperty(params.albumId)){
        return getAlbumInfo(imageService.albums[params.albumId])
            .then(function(json) {
                console.log(json);
                return [];
            })
            .catch(function (err) {
                console.error(err);
                return [];
            });
    } else {
        return [];
    }
};

module.exports = imageService;
