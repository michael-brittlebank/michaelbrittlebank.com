import * as React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom'
import Header from './common/header'
import Footer from './common/footer'
import Home from './pages/home'
import Portfolio from './pages/portfolio'
import Hauptstimme from './pages/hauptstimme';
import Travel from './travel/travel';
import Head from './common/head';
import NotFound from './common/notFound'
import * as ReactGA from 'react-ga';

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
                <main>
                    <Switch>
                        <Route exact={true} path="/" component={Home}/>
                        <Redirect from="/chorus" to="/hauptstimme-js"/>
                        <Redirect from="/portfolio/chorus" to="/hauptstimme-js"/>
                        <Route path="/hauptstimme-js" component={Hauptstimme}/>
                        <Route path="/portfolio" component={Portfolio}/>
                        <Route path="/travel" component={Travel}/>
                        <Route component={NotFound}/>
                    </Switch>
                </main>
                <Footer/>
            </div>
        );
    }
}