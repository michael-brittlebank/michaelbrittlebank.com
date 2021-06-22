import { Component } from 'react';

import Frontispiece from '../sections/frontispiece';
import Resume from '../sections/resume';
import Travel from '../sections/travel';
import Portfolio from '../sections/portfolio';
import classNames from 'classnames';

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasMounted: false,
    };
  }

  componentDidMount() {
    this.setState({
      hasMounted: true,
    });
  }

  render() {
    const { hasMounted } = this.state;
    return (
      <main
        id="home-page"
        className={classNames({
          opaque: !hasMounted,
        })}>
        <Frontispiece />
        <Resume />
        <Travel />
        <Portfolio />
      </main>
    );
  }
}
