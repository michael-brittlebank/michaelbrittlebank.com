import * as React from 'react'
import { Link, scrollSpy } from 'react-scroll'
import '../../sass/components/common/header.css'

export default class Header extends React.Component {
    private headerOffset: number = -65;

    componentDidMount() {
        scrollSpy.update();
    }

    render () {
        return (
            <header>
                <div className="grid-container row">
                    <div className="col-md-12 text-center hide-for-small">
                        <nav className="standard-menu">
                            <Link activeClass="active" to="home-container" spy={true} smooth={true} offset={this.headerOffset} duration={500}>
                                Home
                            </Link>
                            <Link activeClass="active" to="resume-container" spy={true} smooth={true} offset={this.headerOffset} duration={500}>
                                Resume
                            </Link>
                            <Link activeClass="active" to="travel-container" spy={true} smooth={true} offset={this.headerOffset} duration={500}>
                                Travel
                            </Link>
                            <Link activeClass="active" to="hauptstimme-container" spy={true} smooth={true} offset={this.headerOffset} duration={500}>
                                Hauptstimme.js
                            </Link>
                            <Link activeClass="active" to="reading-list-container" spy={true} smooth={true} offset={this.headerOffset} duration={500}>
                                WP Reading List
                            </Link>
                        </nav>
                    </div>
                </div>
            </header>
        );
    }
};
