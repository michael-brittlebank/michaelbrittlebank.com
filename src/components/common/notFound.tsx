import * as React from 'react'
import '../../sass/components/common/notFound.css'

export default class NotFound extends React.Component {

    // private animateTranslation(element: any): void {
    //     currentTranslation++;
    //     if (currentTranslation%translations.length === 0){
    //         currentTranslation = 0;
    //     }
    //     $(element)
    //         .blast({delimiter: 'character'})
    //         .velocity('transition.fadeIn', {
    //             duration: 1000,
    //             stagger: 100,
    //             delay: 0,
    //             begin: function(){
    //                 $(element).css({opacity:'1'});
    //             },
    //             complete: function(){
    //                 $(element)
    //                     .blast({delimiter: 'character'})
    //                     .velocity('transition.fadeOut', {
    //                         duration: 1000,
    //                         stagger: 100,
    //                         delay: 1000,
    //                         complete: function(){
    //                             $(element).velocity('transition.fadeOut', {
    //                                 complete: function(){
    //                                     animateTranslation(translations[currentTranslation]);
    //                                 }
    //                             });
    //                         }
    //                     });
    //             }
    //         });
    // }

    componentDidMount() {
        // //variables
        // const translations = $('.error-translations');
        //
        // //animation
        // setTimeout(function () {
        //     this.animateTranslation(translations[0]);
        // }, 750);
    }

    render() {
        return (
            <div id="page-error-404" className="error-page text-center grid-container row page-container">
                <section id="error-title-container" className="col-sm-12 col-md-4">
                    <h3>Error:</h3>
                    <h1 className="page-title error-title">404</h1>
                </section>
                <section className="col-sm-12 col-md-8">
                    <div id="error-translations-container">
                        {/*{{#each translations}}*/}
                        {/*<h3 className="error-translations">{{this}}</h3>*/}
                        {/*{{/each}}*/}
                    </div>
                    <p>The page you requested could not be found.</p>
                </section>
                <div className="col-sm-12 col-md-8 col-md-offset-4">
                    <a className="button error-button" href="/">
                        <span>Go To Homepage</span>
                    </a>
                </div>
            </div>
        );
    }
}