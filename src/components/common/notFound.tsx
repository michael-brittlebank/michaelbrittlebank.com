import * as React from 'react'
import '../../sass/components/common/notFound.css'
import { Helmet } from 'react-helmet'
import * as _ from 'lodash';
import {UtilsService} from '../../services/utils.service';
import * as classNames from 'classnames';

export default class NotFound extends React.Component<any, any> {

    private translations: string[] = [
        'I\'m sorry',
        'Me paenitet',
        'Lo siento',
        'Je m\'excuse',
        'Es tut mir Leid'
    ];

    constructor(props: any) {
        super(props);
        this.state = {
            translationIndex: 0
        };
    }

    componentDidMount() {
        this.setState({
            translationIndex: UtilsService.getRandomInt(0, this.translations.length - 1)
        });
        setInterval(
            () => {
                this.setState({
                    translationIndex: UtilsService.modulo(this.state.translationIndex + 1, this.translations.length)
                });
            },
            3500
        );
    }

    render() {
        return (
            <div className="error-page-container text-center grid-container row page-container">
                <Helmet>
                    <title>Mike Stumpf | Not Found</title>
                </Helmet>
                <section id="error-title-container" className="col-sm-12 col-md-4">
                    <h3>Error:</h3>
                    <h1 className="page-title error-title">404</h1>
                </section>
                <section className="col-sm-12 col-md-8">
                    <div id="error-translations-container">
                        {
                            _.map(this.translations, (translation: string, index: number) => {
                                return (
                                    <h3 key={index} className={classNames('error-translations', {'active': index === this.state.translationIndex})}>{translation}</h3>
                                );
                            })
                        }
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