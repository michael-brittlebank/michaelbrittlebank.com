import React, { ReactNode, useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import classNames from 'classnames';
import { AnalyticsService, UtilService } from '@/services';
import { AnalyticsButton } from '../shared';
import { PortfolioQuote } from '../shared/portfolio-quote';

type BubbleType = 'small-bubble' | 'medium-bubble' | 'large-bubble';

export function Bubbles() {
  const bubbleContainerRef = useRef<HTMLInputElement | null>(null);
  const [containerWidth, setContainerWidth] = useState(0);
  const [containerHeight, setContainerHeight] = useState(0);
  const [bubblesCreated, setBubblesCreated] = useState(false);
  const [bubblesMoving, setBubblesMoving] = useState(false);
  const [smallBubbleList, setSmallBubbleList] = useState<ReactNode[]>([]);
  const [mediumBubbleList, setMediumBubbleList] = useState<ReactNode[]>([]);
  const [largeBubbleList, setLargeBubbleList] = useState<ReactNode[]>([]);
  const [smallBubbleCount, setSmallBubbleCount] = useState(45);
  const [mediumBubbleCount, setMediumBubbleCount] = useState(30);
  const [largeBubbleCount, setLargeBubbleCount] = useState(15);


  useEffect(() => {
    setContainerWidth(bubbleContainerRef?.current?.offsetWidth || containerWidth);
    setContainerHeight(bubbleContainerRef?.current?.offsetHeight || containerWidth);
  }, [bubbleContainerRef, setContainerWidth, setContainerHeight]);

  const createBubbles = (numberToCreate: number, bubbleType: BubbleType): ReactNode[] => {
    const bubbleList: ReactNode[] = [];
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
              ease: 'easeInOut',
              bounce: 1,
            },
            y: {
              duration: waveDuration,
              delay: delayModifier,
              repeat: Infinity,
              ease: 'easeInOut',
              bounce: 1,
            },
          }}
        />,
      );
    }
    return bubbleList;
  };

  const startBubbles = () => {
    AnalyticsService.event({
      action: 'bubblesStartButtonClick',
    });
    setBubblesCreated(true);
    setBubblesMoving(true);
    setSmallBubbleList(createBubbles(smallBubbleCount, 'small-bubble'));
    setMediumBubbleList(createBubbles(mediumBubbleCount, 'medium-bubble'));
    setLargeBubbleList(createBubbles(largeBubbleCount, 'large-bubble'));
  };

  const clearBubbles = () => {
    AnalyticsService.event({
      action: 'bubblesStopButtonClick',
    });
    setBubblesCreated(false);
    setTimeout(() => {
      setBubblesMoving(false);
      setSmallBubbleList([]);
      setMediumBubbleList([]);
      setLargeBubbleList([]);
    }, 300);
  };

  return (
    <section id='bubbles-container' className='col-sm-12'>
      <h2 id='bubbles-title' className='section-header'>
        Bubbles
      </h2>
      <p className='section-description'>
        <PortfolioQuote>
          This animation is derived from an exhibit created for the{' '}
          <a
            href='libs/components/src/portfolio/bubbles'
            target='_blank'
            rel='noreferrer'>
            Ontario Science Centre
          </a>{' '}
          implementing{' '}
          <a
            href='libs/components/src/portfolio/bubbles'
            target='_blank'
            rel='noreferrer'>
            AprilAge's
          </a>{' '}
          face aging kiosk. Originally built in{' '}
          <a
            href='libs/components/src/portfolio/bubbles'
            target='_blank'
            rel='noreferrer'>
            Velocity.js
          </a>{' '}
          and ported over to{' '}
          <a
            href='libs/components/src/portfolio/bubbles'
            target='_blank'
            rel='noreferrer'>
            Framer Motion
          </a>
          .
        </PortfolioQuote>
      </p>
      <div
        id='bubbles-frame'
        ref={bubbleContainerRef}
        className='border-frame'>
        <div
          id='bubbles-inner-frame'
          className={classNames({
            opaque: !bubblesCreated,
          })}>
          {smallBubbleList}
          {mediumBubbleList}
          {largeBubbleList}
        </div>
      </div>
      <div className='row'>
        <div className='col-sm-6'>
          <button
            onClick={startBubbles}
            className={classNames('button', {
              disabled: bubblesCreated || bubblesMoving,
            })}>
            Start Bubbles
          </button>
        </div>
        <div className='col-sm-6'>
          <button
            onClick={clearBubbles}
            className={classNames('button', {
              disabled: !bubblesCreated,
            })}>
            Stop Bubbles
          </button>
        </div>
      </div>
      <AnalyticsButton
        href='https://github.com/michael-brittlebank/michaelbrittlebank.com/blob/main/src/components/portfolio/bubbles.tsx'
        action='bubblesButtonClick'
      />
    </section>
  );
}
