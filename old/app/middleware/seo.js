var seoMiddleware = {};

seoMiddleware.redirectHistoricalLinks = function(app){
    const resumePath = '/resume',
        portfolioPath = '/portfolio',
        chorusPath = '/chorus';
//resume
    app.redirect('/portfolio/university-of-wisconsin-madison', resumePath);
    app.redirect('/portfolio/portfolio/university-of-york', resumePath);
    app.redirect('/about', resumePath);
    app.redirect('/contact', resumePath);
    app.redirect('/search', resumePath);
    app.redirect('/professional', resumePath);
    app.redirect('/education', resumePath);
    app.redirect('/cv', resumePath);
    app.redirect('/files/Mike%20Stumpf%20Resume.pdf','/files/Mike_Stumpf_CV.pdf');

//portfolio
    app.redirect('/scales', chorusPath);
    app.redirect('/portfolio/chorus', chorusPath);
    app.redirect('/portfolio/wp-reading-list', portfolioPath);
    app.redirect('/portfolio/strange-bedfellows', portfolioPath);
    app.redirect('/portfolio/docuscope-project', portfolioPath);
    app.redirect('/portfolio/portfolio/open-oasis', portfolioPath);
    app.redirect('/portfolio/portfolio/the-humanities-research-center-blog-the-treehouse', portfolioPath);
    app.redirect('/portfolio/early-modern-sandbox', portfolioPath);
    app.redirect('/portfolio/all-is-true', portfolioPath);
    app.redirect('/portfolio/artls-database', portfolioPath);
    app.redirect('/portfolio/the-spaces-of-arts-conference-website', portfolioPath);
    app.redirect('/portfolio/student-wisconsin-education-association/', portfolioPath);
    app.redirect('/personal', portfolioPath);
    app.redirect('/reading-list', portfolioPath+'/reading-list');

//home
    app.redirect('/thank-you', '/');

//travel
    app.redirect('/places', '/travel');

//sitemap
    app.redirect('/sitemap', '/sitemap.xml');

    return app;
};

seoMiddleware.getGlobalVariables = function(req,res,next){
    res.locals.globals = {
        siteName: 'Mike Stumpf',
        requestedUrl: req.originalUrl  
    };
    next();
};

module.exports = seoMiddleware;