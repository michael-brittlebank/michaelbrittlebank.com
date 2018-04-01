import * as React from 'react';
import { Switch, Route } from 'react-router-dom'
import Header from './header/header'
import Footer from './footer/footer'
import Home from './home/home'
import Portfolio from './portfolio/portfolio'

const App = () => (
    <div>
        <Header />
        <main>
            <Switch>
                <Route exact={true} path="/" component={Home}/>
                <Route path="/portfolio" component={Portfolio}/>
            </Switch>
        </main>
        <Footer />
    </div>
);

export default App
