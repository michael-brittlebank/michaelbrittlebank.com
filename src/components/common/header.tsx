import * as React from 'react'
import { Link } from 'react-router-dom'

const Header = () => (
    <header>
        <nav>
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/portfolio">Portfolio</Link></li>
                <li><Link to="/travel">Travel</Link></li>
            </ul>
        </nav>
        <div className="grid-container row">
            <div className="col-sm-12 show-for-small text-right position-relative">
                <a id="header-mobile-menu" href="#modal-mobile-menu">
                    <i className="fa fa-bars" aria-hidden="true"/>
                </a>
            </div>
            <nav className="col-sm-12 text-right hide-for-small">
                <ul className="standard-menu">
                    {/*{{#each menuItems}}*/}
                    {/*<li className="{{class}}">*/}
                        {/*<a href="{{url}}" className="{{#if isActive}}active{{/if}}">{{title}}</a>*/}
                        {/*{{#if children}}*/}
                        {/*<ul className="sub-menu">*/}
                            {/*{{#each children}}*/}
                            {/*<li className="{{class}}">*/}
                                {/*<a href="{{url}}">{{title}}</a>*/}
                            {/*</li>*/}
                            {/*{{/each}}*/}
                        {/*</ul>*/}
                        {/*{{/if}}*/}
                    {/*</li>*/}
                    {/*{{/each}}*/}
                </ul>
            </nav>
        </div>
    </header>
);

export default Header
