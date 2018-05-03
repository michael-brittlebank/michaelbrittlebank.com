import * as React from 'react'
import { Link as ScrollLink, scrollSpy } from 'react-scroll'
import '../../sass/components/common/header.css'

export default class Header extends React.Component {
    private headerOffset: number = -65;
    private scrollDuration: number = 750;

    componentDidMount() {
        scrollSpy.update();
    }

    render () {
        return (window.location.pathname === '/') ? (
            <header>
                <div className="grid-container row">
                    <div className="col-md-12 text-center hide-for-small">
                        <nav className="standard-menu">
                            <ScrollLink activeClass="active" to="home-container" spy={true} smooth={true} offset={this.headerOffset} duration={this.scrollDuration}>
                                Home
                            </ScrollLink>
                            <ScrollLink activeClass="active" to="resume-container" spy={true} smooth={true} offset={this.headerOffset} duration={this.scrollDuration}>
                                Resume
                            </ScrollLink>
                            <ScrollLink activeClass="active" to="travel-container" spy={true} smooth={true} offset={this.headerOffset} duration={this.scrollDuration}>
                                Travel
                            </ScrollLink>
                            <ScrollLink activeClass="active" to="portfolio-container" spy={true} smooth={true} offset={this.headerOffset} duration={this.scrollDuration}>
                                Portfolio
                            </ScrollLink>
                        </nav>
                    </div>
                </div>
            </header>
        ) : (
            null
        );
    }
};
