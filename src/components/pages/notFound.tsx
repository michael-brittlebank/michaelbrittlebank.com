import * as React from 'react'
import '../../sass/components/pages/notFound.css'
import { Helmet } from 'react-helmet'
import map = require('lodash/map')
import {UtilsService} from '../../services/utils.service';
import * as classNames from 'classnames';

interface State {
    translationIndex: number;
}

interface Props {}

export default class NotFound extends React.Component<Props, State> {

    private translationInterval: any;
    private translations: string[] = [
        'I\'m sorry',
        'Me paenitet',
        'Lo siento',
        'Je m\'excuse',
        'Es tut mir Leid'
    ];

    constructor(props: Props) {
        super(props);
        this.state = {
            translationIndex: 0
        };
    }

    componentDidMount() {
        this.setState({
            translationIndex: UtilsService.getRandomInt(0, this.translations.length - 1)
        });
        this.translationInterval = setInterval(
            () => {
                this.setState({
                    translationIndex: UtilsService.modulo(this.state.translationIndex + 1, this.translations.length)
                });
            },
            3500
        );
    }

    componentWillUnmount() {
        clearInterval(this.translationInterval);
    }

    render() {
        return (
            <div id="error-page-container" className="grid-container row">
                <Helmet>
                    <title>Mike Stumpf | Not Found</title>
                </Helmet>
                <section id="error-title-container" className="col-sm-12 col-md-4">
                    <h3>Error:</h3>
                    <h1 id="error-title" className="page-title">404</h1>
                </section>
                <section className="col-sm-12 col-md-8">
                    <div id="error-translations-container">
                        {
                            map(this.translations, (translation: string, index: number) => {
                                return (
                                    <h3 key={index} className={classNames('error-translations', {'active': index === this.state.translationIndex})}>{translation}</h3>
                                );
                            })
                        }
                    </div>
                    <p>The page you requested could not be found.</p>
                </section>
                <div className="col-sm-12 col-md-8 col-md-offset-4">
                    <a className="button" href="/">
                        <span>Go To Homepage</span>
                    </a>
                </div>
            </div>
        );
    }
}