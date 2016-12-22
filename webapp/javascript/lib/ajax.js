(function() {
    var that = app.ajax,
        helpers = app.helpers,
        $ = jQuery;

    this.ajax = function(method,url,data,contentType, headers) {
        var parameters =  {
            method: method,
            url: url,
            data: data,
            xhrFields: {
                withCredentials: true
            },
            headers: headers
        };
        if(data && helpers.sizeOfObject(data) > 0) {
            if (contentType === 'json') {
                parameters.data = JSON.stringify(data);
                parameters.contentType= 'application/json';
                parameters.dataType = contentType;
            } else if (contentType === 'json-text') {
                parameters.data = JSON.stringify(data);
                parameters.contentType= 'application/json';
                parameters.dataType = 'text';
            } else {
                parameters.data = data;
            }
        }
        return that.ajaxCall(parameters);
    };

    this.ajaxCall = function(parameters) {
        return new Promise(function(resolve,reject) {
            $.ajax(parameters)
                .then(function(data) {
                    resolve(data);
                })
                .fail(function(jqXHR,textStatus,errorThrown) {
                    reject({
                        jqXHR:jqXHR,
                        textStatus:textStatus,
                        errorThrown:errorThrown
                    });
                });
        });
    };

    this.ajaxCatch = function(jqXHR,textStatus,errorThrown){
        console.log(jqXHR,textStatus,errorThrown);
        if(textStatus === 'parsererror'){
            window.location.href = '/login';
        }
    };
     


}).apply(app.ajax);
