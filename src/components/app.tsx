import * as React from 'react';
import { Switch, Route } from 'react-router-dom'
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

    onRouteChanged() {
        if (this.locationHref !== window.location.href) {
            this.locationHref = window.location.href;
            ReactGA.pageview(window.location.href);
        }
    }

    componentDidMount() {
        this.onRouteChanged();
    }

    componentDidUpdate() {
        this.onRouteChanged();
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
                                    <Route exact={true} path="/" component={Home}/>
                                    {/*portfolio*/}
                                    {/*<Redirect from="/chorus" to="/hauptstimme"/>*/}
                                    {/*<Redirect from="/portfolio/chorus" to="/hauptstimme"/>*/}
                                    {/*<Redirect from="/portfolio/hauptstimme" to="/hauptstimme"/>*/}
                                    {/*<Route path="/hauptstimme" component={Hauptstimme}/>*/}
                                    {/*<Route path="/portfolio/reading-list" component={ReadingList}/>*/}
                                    {/*<Route path="/portfolio/bubbles" component={Bubbles}/>*/}
                                    {/*pages*/}
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
}