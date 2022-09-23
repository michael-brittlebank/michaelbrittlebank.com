import React, { PureComponent } from 'react';
import {
  Link as ScrollLink,
  scroller as scroll,
  scrollSpy,
} from 'react-scroll';

type HashType =
  | 'resume'
  | 'travel'
  | 'personal'
  | 'haupstimme'
  | 'reading-list'
  | 'metronome';

type ContainerType =
  | 'frontispiece-container'
  | 'resume-container'
  | 'travel-container'
  | 'personal-container'
  | 'hauptstimme-container'
  | 'reading-list-container'
  | 'metronome-container';

type HeaderLink = {
  label: string;
  container: ContainerType;
};

const headerOffset = -65;
const scrollDuration = 750;

const hashLinkMap: Record<HashType, ContainerType> = {
  resume: 'resume-container',
  travel: 'travel-container',
  personal: 'personal-container',
  haupstimme: 'hauptstimme-container',
  'reading-list': 'reading-list-container',
  metronome: 'metronome-container',
};

const headerLinkMap: HeaderLink[] = [
  {
    label: 'Mike Stumpf',
    container: 'frontispiece-container',
  },
  {
    label: 'Professional',
    container: 'resume-container',
  },
  {
    label: 'Travel',
    container: 'travel-container',
  },
  {
    label: 'Personal',
    container: 'personal-container',
  },
];

export class Header extends PureComponent {
  scrollTimeout: NodeJS.Timeout | undefined;

  componentDidMount() {
    scrollSpy.update();
    this.scrollToContainer();
  }

  componentDidUpdate() {
    this.scrollToContainer();
  }

  componentWillUnmount() {
    this.scrollTimeout && clearTimeout(this.scrollTimeout);
  }

  scrollToContainer() {
    if (window.location.hash.length > 0) {
      // get hash before setting timeout
      const hash = window.location.hash.substring(1);
      this.scrollTimeout = setTimeout(() => {
        scroll.scrollTo(hashLinkMap[hash as HashType], {
          smooth: true,
          offset: headerOffset,
          duration: scrollDuration,
          end: this.clearHashFromUrl(),
        });
      }, 500);
    }
  }

  clearHashFromUrl(): boolean {
    window.history.pushState(
      '',
      document.title,
      window.location.pathname + window.location.search,
    );
    return true;
  }

  render() {
    return (
      <header>
        <div className="grid-container row">
          <div className="col-md-12 text-center hide-for-small">
            <nav className="standard-menu">
              {headerLinkMap.map((headerLink) => (
                <ScrollLink
                  key={headerLink.label}
                  activeClass="active"
                  to={headerLink.container}
                  spy={true}
                  smooth={true}
                  offset={headerOffset}
                  duration={scrollDuration}>
                  {headerLink.label}
                </ScrollLink>
              ))}
            </nav>
          </div>
        </div>
      </header>
    );
  }
}
