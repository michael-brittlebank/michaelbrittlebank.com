import Head from 'next/head';
import { Fragment, Component } from 'react';

import Footer from './components/footer';
import Header from './components/header';

import Frontispiece from './sections/frontispiece';
import Resume from './sections/resume';
import Travel from './sections/travel';
import Portfolio from './sections/portfolio';
import classNames from 'classnames';

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasMounted: false,
    };
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        hasMounted: true,
      });
    }, 350);
  }

  render() {
    const { hasMounted } = this.state;
    return (
      <Fragment>
        <Head>
          <title>Mike Stumpf</title>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, shrink-to-fit=no"
          />
        </Head>
        <Header />
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
        <Footer />
      </Fragment>
    );
  }
}
