import React, { PureComponent, ReactNode } from 'react';
import { motion } from 'framer-motion';
import classNames from 'classnames';
import { AnalyticsService, UtilService } from '@mikestumpf/services';
import { AnalyticsButton } from '../shared';
import { PortfolioQuote } from '../shared/portfolio-quote';

type BubbleType = 'small-bubble' | 'medium-bubble' | 'large-bubble';

interface State {
  bubblesCreated: boolean;
  bubblesMoving: boolean;
  smallBubbleList: ReactNode[];
  mediumBubbleList: ReactNode[];
  largeBubbleList: ReactNode[];
  smallBubbleCount: number;
  mediumBubbleCount: number;
  largeBubbleCount: number;
  containerWidth: number;
  containerHeight: number;
}

export class Bubbles extends PureComponent<unknown, State> {
  bubbleContainerRef: React.RefObject<HTMLDivElement>;

  constructor(props: unknown) {
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

  override componentDidMount() {
    const { containerWidth, containerHeight } = this.state;
    this.setState({
      containerWidth:
        this.bubbleContainerRef?.current?.offsetWidth || containerWidth,
      containerHeight:
        this.bubbleContainerRef?.current?.offsetHeight || containerHeight,
    });
  }

  createBubbles = (numberToCreate: number, bubbleType: BubbleType) => {
    const bubbleList = [];
    const { containerWidth, containerHeight } = this.state;
    for (let i = 0; i < numberToCreate; i += 1) {
      let bubbleSize;
      switch (bubbleType) {
        case 'small-bubble':
          bubbleSize = UtilService.getRandomIntInclusive(5, 25);
          break;
        case 'medium-bubble':
          bubbleSize = UtilService.getRandomIntInclusive(25, 50);
          break;
        case 'large-bubble':
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
    const { smallBubbleCount, mediumBubbleCount, largeBubbleCount } =
      this.state;
    AnalyticsService.event({
      action: 'bubblesStartButtonClick',
    });
    this.setState({
      bubblesCreated: true,
      bubblesMoving: true,
      smallBubbleList: this.createBubbles(smallBubbleCount, 'small-bubble'),
      mediumBubbleList: this.createBubbles(mediumBubbleCount, 'medium-bubble'),
      largeBubbleList: this.createBubbles(largeBubbleCount, 'large-bubble'),
    });
  };

  clearBubbles = () => {
    AnalyticsService.event({
      action: 'bubblesStopButtonClick',
    });
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
      <section id="bubbles-container" className="col-sm-12">
        <h2 id="bubbles-title" className="section-header">
          Bubbles
        </h2>
        <p className="section-description">
          <PortfolioQuote>
            This animation is derived from an exhibit created for the{' '}
            <a
              href="libs/components/src/portfolio/bubbles"
              target="_blank"
              rel="noreferrer">
              Ontario Science Centre
            </a>{' '}
            implementing{' '}
            <a
              href="libs/components/src/portfolio/bubbles"
              target="_blank"
              rel="noreferrer">
              AprilAge's
            </a>{' '}
            face aging kiosk. Originally built in{' '}
            <a
              href="libs/components/src/portfolio/bubbles"
              target="_blank"
              rel="noreferrer">
              Velocity.js
            </a>{' '}
            and ported over to{' '}
            <a
              href="libs/components/src/portfolio/bubbles"
              target="_blank"
              rel="noreferrer">
              Framer Motion
            </a>
            .
          </PortfolioQuote>
        </p>
        <div
          id="bubbles-container"
          ref={this.bubbleContainerRef}
          className="border-frame">
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
        <AnalyticsButton
          href="https://github.com/mike-stumpf/mikestumpf.com/blob/master/src/portfolio/bubbles.js"
          action="bubblesButtonClick"
        />
      </section>
    );
  }
}
