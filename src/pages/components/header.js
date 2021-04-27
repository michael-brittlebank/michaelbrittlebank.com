import * as React from 'react';
import {
  Link as ScrollLink,
  scrollSpy,
  scroller as scroll,
} from "react-scroll";

export default class Header extends React.Component {
  headerOffset = -65;
  scrollDuration = 750;

  componentDidMount() {
    scrollSpy.update();
    if (window.location.hash.length > 0) {
      this._scrollTo(window.location.hash.substring(1));
    }
  }

  componentDidUpdate() {
    if (window.location.hash.length > 0) {
      this._scrollTo(window.location.hash.substring(1));
    }
  }

  render() {
    return (
      <header>
        <div className="grid-container row">
          <div className="col-md-12 text-center hide-for-small">
            <nav className="standard-menu">
              <ScrollLink
                activeClass="active"
                to="frontispiece-container"
                spy={true}
                smooth={true}
                offset={this.headerOffset}
                duration={this.scrollDuration}>
                Home
              </ScrollLink>
              <ScrollLink
                activeClass="active"
                to="resume-container"
                spy={true}
                smooth={true}
                offset={this.headerOffset}
                duration={this.scrollDuration}>
                Resume
              </ScrollLink>
              <ScrollLink
                activeClass="active"
                to="travel-container"
                spy={true}
                smooth={true}
                offset={this.headerOffset}
                duration={this.scrollDuration}>
                Travel
              </ScrollLink>
              <ScrollLink
                activeClass="active"
                to="portfolio-container"
                spy={true}
                smooth={true}
                offset={this.headerOffset}
                duration={this.scrollDuration}>
                Portfolio
              </ScrollLink>
            </nav>
          </div>
        </div>
      </header>
    );
  }

  _scrollTo(hash) {
    setTimeout(() => {
      switch (hash) {
        case 'resume':
          scroll.scrollTo('resume-container', {
            smooth: true,
            offset: this.headerOffset,
            duration: this.scrollDuration,
            end: this._clearHashFromUrl(),
          });
          break;
        case 'travel':
          scroll.scrollTo('travel-container', {
            smooth: true,
            offset: this.headerOffset,
            duration: this.scrollDuration,
            end: this._clearHashFromUrl(),
          });
          break;
        case 'portfolio':
          scroll.scrollTo('portfolio-container', {
            smooth: true,
            offset: this.headerOffset,
            duration: this.scrollDuration,
            end: this._clearHashFromUrl(),
          });
          break;
        case 'hauptstimme':
          scroll.scrollTo('hauptstimme-container', {
            smooth: true,
            offset: this.headerOffset,
            duration: this.scrollDuration,
            end: this._clearHashFromUrl(),
          });
          break;
        case 'reading-list':
          scroll.scrollTo('reading-list-container', {
            smooth: true,
            offset: this.headerOffset,
            duration: this.scrollDuration,
            end: this._clearHashFromUrl(),
          });
          break;
        case 'metronome':
          scroll.scrollTo('metronome-container', {
            smooth: true,
            offset: this.headerOffset,
            duration: this.scrollDuration,
            end: this._clearHashFromUrl(),
          });
          break;
        default:
          this._clearHashFromUrl();
          break;
      }
    }, 500);
  }

  _clearHashFromUrl() {
    history.pushState(
      '',
      document.title,
      window.location.pathname + window.location.search,
    );
  }
}
