import * as React from 'react'
import '../../sass/components/common/notFound.css'
import { Helmet } from 'react-helmet'
import { CSSTransition } from 'react-transition-group';

export default class NotFound extends React.Component {

    private translations: string[] = [
        'Me paenitet',
        'Lo siento',
        'I\'m sorry',
        'Je m\'excuse',
        'Es tut mir Leid'
    ];

    private visible: boolean = false;

    componentDidMount() {
        console.log('mounting');
        this.visible = true;
    }

    render() {
        return (
            <div id="page-error-404" className="error-page text-center grid-container row page-container">
                <Helmet>
                    <title>Mike Stumpf | Not Found</title>
                </Helmet>
                <section id="error-title-container" className="col-sm-12 col-md-4">
                    <h3>Error:</h3>
                    <h1 className="page-title error-title">404</h1>
                </section>
                <section className="col-sm-12 col-md-8">
                    <div id="error-translations-container">
                        <CSSTransition
                            in={this.visible}
                            timeout={300}
                            classNames="error-translations"
                            onExited={() => {
                                console.log('existed');
                            }}
                        >
                            <h3 className="error-translations">{this.translations[0]}</h3>
                        </CSSTransition>
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