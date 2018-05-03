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
                                    {/*home*/}
                                    <Route exact={true} path="/" component={Home}/>
                                    {/*redirects*/}
                                    <Redirect from="/chorus" to="/" key="r-chorus"/>
                                    <Redirect from="/travel" to="/" key="r-travel"/>
                                    <Redirect from="/music" to="/" key="r-music"/>
                                    <Redirect from="/resume" to="/" key="r-resume"/>
                                    <Redirect from="/portfolio" to="/" key="r-portfolio"/>
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
}