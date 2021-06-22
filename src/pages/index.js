import { Component } from 'react';

import Frontispiece from '../sections/frontispiece';
import Resume from '../sections/resume';
import Travel from '../sections/travel';
import Portfolio from '../sections/portfolio';

export default class Home extends Component {
  render() {
    return (
      <>
        <Frontispiece />
        <Resume />
        <Travel />
        <Portfolio />
      </>
    );
  }
}
