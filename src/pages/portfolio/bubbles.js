import React from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as faGithub from '@fortawesome/fontawesome-free-brands/faGithub';
import classNames from 'classnames';
import UtilService from '../../services/util.service';

export default class Bubbles extends React.PureComponent {
  smallBubbleType = 'small-bubble';
  mediumBubbleType = 'medium-bubble';
  largeBubbleType = 'large-bubble';

  constructor(props) {
    super(props);
    this.state = {
      bubblesCreated: false,
      bubblesMoving: false,
      smallBubbleList: [],
      mediumBubbleList: [],
      largeBubbleList: [],
      smallBubbleCount: 45,
      mediumBubbleCount: 30,
      largeBubbleCount: 15,
      containerWidth: 0,
      containerHeight: 0,
    };
    this.bubbleContainerRef = React.createRef();
  }

  componentDidMount() {
    this.setState({
      containerWidth: this.bubbleContainerRef.current.offsetWidth,
      containerHeight: this.bubbleContainerRef.current.offsetHeight,
    });
  }

  createBubbles = (numberToCreate, bubbleType) => {
    const bubbleList = [];
    const { containerWidth, containerHeight } = this.state;
    for (let i = 0; i < numberToCreate; i += 1) {
      let bubbleSize;
      switch (bubbleType) {
        case this.smallBubbleType:
          bubbleSize = UtilService.getRandomIntInclusive(5, 25);
          break;
        case this.mediumBubbleType:
          bubbleSize = UtilService.getRandomIntInclusive(25, 50);
          break;
        case this.largeBubbleType:
          bubbleSize = UtilService.getRandomIntInclusive(50, 125);
          break;
      }
      const margin = containerWidth / 5;
      const startingX = UtilService.getRandomIntInclusive(
        margin,
        containerWidth - margin,
      );
      const amplitude = UtilService.getRandomIntInclusive(
        containerWidth / 6,
        containerWidth / 3,
      );
      const bottomProgression = [containerHeight, 0 - bubbleSize];
      const amplitudeModifier = amplitude / 2; // do not exceed width of container
      const leftProgression = [
        startingX - amplitudeModifier,
        startingX + amplitudeModifier,
      ];
      const delayModifier =
        Math.round(i / UtilService.getRandomIntInclusive(1, 4)) * 0.3;
      const arcDuration = UtilService.getRandomIntInclusive(3, 5);
      const waveDuration = UtilService.getRandomIntInclusive(9, 11);
      bubbleList.push(
        <motion.div
          key={`${bubbleType}-${bubbleList.length}`}
          id={`${bubbleType}-${bubbleList.length}`}
          className={classNames(bubbleType, 'bubble')}
          style={{ width: `${bubbleSize}px`, height: `${bubbleSize}px` }}
          initial={{ x: startingX, y: 0 - bubbleSize }}
          animate={{
            x: i % 2 === 0 ? leftProgression : leftProgression.reverse(), // sin vs cosine
            y: bottomProgression,
          }}
          transition={{
            x: {
              duration: arcDuration,
              delay: delayModifier,
              repeatType: 'mirror',
              repeat: Infinity,
            },
            y: {
              duration: waveDuration,
              delay: delayModifier,
              repeat: Infinity,
            },
          }}
        />,
      );
    }
    return bubbleList;
  };

  startBubbles = () => {
    const {
      smallBubbleCount,
      mediumBubbleCount,
      largeBubbleCount,
    } = this.state;
    this.setState({
      bubblesCreated: true,
      bubblesMoving: true,
      smallBubbleList: this.createBubbles(
        smallBubbleCount,
        this.smallBubbleType,
      ),
      mediumBubbleList: this.createBubbles(
        mediumBubbleCount,
        this.mediumBubbleType,
      ),
      largeBubbleList: this.createBubbles(
        largeBubbleCount,
        this.largeBubbleType,
      ),
    });
  };

  clearBubbles = () => {
    this.setState({
      bubblesCreated: false,
    });
    setTimeout(() => {
      this.setState({
        bubblesMoving: false,
        smallBubbleList: [],
        mediumBubbleList: [],
        largeBubbleList: [],
      });
    }, 300);
  };

  render() {
    const {
      bubblesCreated,
      smallBubbleList,
      mediumBubbleList,
      largeBubbleList,
      bubblesMoving,
    } = this.state;
    return (
      <section id="reading-list-container" className="col-sm-12 portfolio-item">
        <h2 id="reading-list-title" className="section-header">
          Bubbles
        </h2>
        <p>
          This animation is derived from an exhibit created for the{' '}
          <a href="https://www.ontariosciencecentre.ca/" target="_blank" rel="noreferrer">
            Ontario Science Centre
          </a>{' '}
          implementing{' '}
          <a href="https://aprilage.com/" target="_blank" rel="noreferrer">
            AprilAge's
          </a>{' '}
          face aging kiosk. Originally built in{' '}
          <a href="http://velocityjs.org/" target="_blank" rel="noreferrer">
            Velocity.js
          </a>{' '}
          and ported over to{' '}
          <a href="https://www.framer.com/api/motion/" target="_blank" rel="noreferrer">
            Framer Motion
          </a>
          .
        </p>
        <div id="bubbles-container" ref={this.bubbleContainerRef}>
          <div
            id="bubbles-inner-container"
            className={classNames({
              opaque: !bubblesCreated,
            })}>
            {smallBubbleList}
            {mediumBubbleList}
            {largeBubbleList}
          </div>
        </div>
        <div className="row">
          <div className="col-sm-6">
            <button
              onClick={this.startBubbles}
              className={classNames('button', {
                disabled: bubblesCreated || bubblesMoving,
              })}>
              Start Bubbles
            </button>
          </div>
          <div className="col-sm-6">
            <button
              onClick={this.clearBubbles}
              className={classNames('button', {
                disabled: !bubblesCreated,
              })}>
              Stop Bubbles
            </button>
          </div>
        </div>
        <a
          href="https://github.com/mike-stumpf/mikestumpf.com/blob/master/src/pages/portfolio/bubbles.js"
          className="button"
          target="_blank"
          rel="noreferrer">
          View Code&nbsp;&nbsp;&nbsp;
          <FontAwesomeIcon icon={faGithub} className="fa" />
        </a>
      </section>
    );
  }
}
