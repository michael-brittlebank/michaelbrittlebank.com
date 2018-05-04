import * as React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom'
import Header from './common/header'
import Footer from './common/footer'
import Home from './pages/home'
import Head from './common/head';
import NotFound from './pages/notFound'
import * as ReactGA from 'react-ga';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

ReactGA.initialize(process.env.REACT_APP_GOOGLE_ANALYTICS || '');

export default class App extends React.Component {

    private locationHref: string = '';

    componentDidMount() {
        this._onRouteChanged();
    }

    componentDidUpdate() {
        this._onRouteChanged();
    }

    render() {
        return (
            <div>
                <Head/>
                <Header/>
                <Route
                    render={({ location }) => (
                        <TransitionGroup>
                            <CSSTransition key={location.key} classNames="fade" timeout={300}>
                                <Switch location={location}>
                                    {/*home*/}
                                    <Route exact={true} path="/" component={Home}/>
                                    {/*redirects*/}
                                    <Redirect from="/resume" to="/#resume"/>
                                    <Redirect from="/travel" to="/#travel"/>
                                    <Redirect from="/portfolio" to="/#portfolio"/>
                                    <Redirect from="/chorus" to="/#hauptstimme"/>
                                    <Redirect from="/music" to="/#hauptstimme"/>
                                    <Redirect from="/reading-list" to="/#reading-list"/>
                                    {/*404*/}
                                    <Route component={NotFound}/>
                                </Switch>
                            </CSSTransition>
                        </TransitionGroup>
                    )}
                />
                <Footer/>
            </div>
        );
    }

    private _onRouteChanged() {
        if (this.locationHref !== window.location.href) {
            this.locationHref = window.location.href;
            ReactGA.pageview(window.location.href);
        }
    }
}