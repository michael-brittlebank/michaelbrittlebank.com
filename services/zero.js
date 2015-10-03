var zero = {
    app: {
        environment: String(process.env.NODE_ENV),
        isLiveConfig: function(){
            return zero.app.environment === "default";
        },
        isDevConfig: function(){
            return zero.app.environment === "development";
        }
    }
};

zero.status = {
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

module.exports = zero;