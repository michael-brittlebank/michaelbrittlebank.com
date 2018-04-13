import * as React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom'
import Header from './common/header/header'
import Footer from './common/footer/footer'
import Home from './pages/home/home'
import Portfolio from './pages/portfolio/portfolio'
import Hauptstimme from './pages/hauptstimme/hauptstimme';
import Travel from './pages/travel/travel';
import Head from './common/head/head';

const App = () => (
    <div>
        <Head />
        <Header />
        <main>
            <Switch>
                <Route exact={true} path="/" component={Home}/>
                <Redirect from="/chorus" to="/hauptstimme-js" />
                <Redirect from="/portfolio/chorus" to="/hauptstimme-js" />
                <Route path="/hauptstimme-js" component={Hauptstimme}/>
                <Route path="/portfolio" component={Portfolio}/>
                <Route path="/travel" component={Travel}/>
            </Switch>
        </main>
        <Footer />
    </div>
);

export default App
