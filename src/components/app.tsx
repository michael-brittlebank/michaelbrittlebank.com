import * as React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom'
import Header from './header/header'
import Footer from './footer/footer'
import Home from './home/home'
import Portfolio from './portfolio/portfolio'
import Hauptstimme from './portfolio/hauptstimme/hauptstimme';

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
            </Switch>
        </main>
        <Footer />
    </div>
);

export default App
