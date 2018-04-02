import * as React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom'
import Header from './header/header'
import Footer from './footer/footer'
import Home from './home/home'
import Portfolio from './portfolio/portfolio'
import Hauptstimme from './portfolio/hauptstimme/hauptstimme';
import Travel from './travel/travel';

const App = () => (
    <div>
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
