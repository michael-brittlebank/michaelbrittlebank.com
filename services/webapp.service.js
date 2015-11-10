var /* packages */
    handlebars = require('handlebars'),
    webapp = {
        app: {
            environment: String(process.env.NODE_ENV),
            isLiveConfig: function(){
                return webapp.app.environment === "default";
            },
            isDevConfig: function(){
                return webapp.app.environment === "development";
            }
        }
    };

webapp.status = {
    ok: 200,
    created: 201,
    accepted: 202,
    no_content: 204,
    moved_permanently: 301,
    temporary_redirect: 307,
    bad_request: 400,
    unauthorized: 401,
    forbidden: 403,
    not_found: 404,
    internal_server_error: 500,
    service_unavailable: 503
};

webapp.hbsHelpers = {
    compare: function(lvalue, rvalue, options) {
        //https://gist.github.com/doginthehat/1890659
        if (arguments.length !== 3) {
            throw new Error("Handlebars Helper 'compare' needs 3 parameters");
        }
        var operator = options.hash.operator || "==";
        var operators = {
            '==':		function(l,r) { return l == r; },
            '===':	function(l,r) { return l === r; },
            '!=':		function(l,r) { return l != r; },
            '<':		function(l,r) { return l < r; },
            '>':		function(l,r) { return l > r; },
            '<=':		function(l,r) { return l <= r; },
            '>=':		function(l,r) { return l >= r; },
            'typeof':	function(l,r) { return typeof l == r; }
        };
        if (!operators[operator]) {
            throw new Error("Handlebars Helper 'compare' doesn't know the operator " + operator);
        }
        var result = operators[operator](lvalue,rvalue);
        if(result) {
            return options.fn(this);
        } else {
            return options.inverse(this);
        }
    }
};

module.exports = webapp;