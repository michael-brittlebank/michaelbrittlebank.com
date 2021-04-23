import React from 'react';
import { motion } from "framer-motion"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as faGithub from '@fortawesome/fontawesome-free-brands/faGithub'
import classNames from "classnames";
import UtilService from "../../services/util.service";

export default class Bubbles extends React.Component {

 smallBubbleType = "small-bubble";
 mediumBubbleType = "medium-bubble";
 largeBubbleType = "large-bubble";

 constructor(props) {
  super(props);
  this.state = {
   bubblesCreated: false,
   bubblesMoving: false,
   smallBubbleList: [],
   mediumBubbleList: [],
   largeBubbleList: [],
   smallBubbleCount: 30,
   mediumBubbleCount: 20,
   largeBubbleCount: 10,
   containerWidth: 0,
   containerHeight: 0
  };
  this.bubbleContainerRef = React.createRef();
 }

 componentDidMount () {
  this.setState({
   containerWidth: this.bubbleContainerRef.current.offsetWidth,
   containerHeight: this.bubbleContainerRef.current.offsetHeight
  })
 }

 createBubbles = (numberToCreate, bubbleList, bubbleType) => {
  const {containerWidth, containerHeight} = this.state;
  for(let i = 0; i < numberToCreate; i+=1) {
   let bubbleSize;
   switch(bubbleType){
    case this.smallBubbleType:
     bubbleSize = UtilService.getRandomIntInclusive(5, 25)
     break;
    case this.mediumBubbleType:
     bubbleSize = UtilService.getRandomIntInclusive(25, 50)
     break;
    case this.largeBubbleType:
     bubbleSize = UtilService.getRandomIntInclusive(50, 100)
     break;
   }
   const margin = containerWidth/5;
   const startingX = UtilService.getRandomIntInclusive(margin, containerWidth-margin);
   const amplitude = UtilService.getRandomIntInclusive(containerWidth/6, containerWidth/3);
   const bottomProgression = [containerHeight, 0-bubbleSize];
   const amplitudeModifier = amplitude/2; // do not exceed width of container
   const leftProgression = [startingX-amplitudeModifier,startingX+amplitudeModifier]
   const delayModifier = Math.round(i/UtilService.getRandomIntInclusive(1, 4))* 0.3;
   const arcDuration = UtilService.getRandomIntInclusive(2, 3);
   const waveDuration = UtilService.getRandomIntInclusive(6, 8)
   bubbleList.push(
     <motion.div key={`${bubbleType}-${bubbleList.length}`}
                 id={`${bubbleType}-${bubbleList.length}`}
                 className={classNames(bubbleType, 'bubble')}
                 style={{width:`${bubbleSize}px`, height:`${bubbleSize}px`}}
                 initial={{ x: startingX, y: 0-bubbleSize}}
                 animate={{
                  x: i%2 === 0 ? leftProgression : leftProgression.reverse(), // sin vs cosine
                  y: bottomProgression,
                 }}
                 transition={{
                  x: {duration: arcDuration, delay: delayModifier, repeatType: "mirror", repeat: Infinity },
                  y: {duration: waveDuration, delay: delayModifier, repeat: Infinity}
                 }}
     />
   )
  }
  return bubbleList;
 }

 destroyBubbles = (numberToDelete, bubbleList) => {
  let modifiedList;
  if (numberToDelete > bubbleList) {
   modifiedList = []
  } else {
   modifiedList = bubbleList.slice(0, bubbleList.length-numberToDelete);
  }
  return modifiedList
 }

 startBubbles = () => {
  const {bubblesCreated, bubblesMoving, smallBubbleCount, mediumBubbleCount,
   largeBubbleCount, smallBubbleList, mediumBubbleList, largeBubbleList} = this.state
  let modifiedSmallBubbleList = [...smallBubbleList]
  let modifiedMediumBubbleList = [...mediumBubbleList]
  let modifiedLargeBubbleList = [...largeBubbleList]
  if(!bubblesCreated){
   let smallDifference = smallBubbleCount-smallBubbleList.length,
     mediumDifference = mediumBubbleCount-mediumBubbleList.length,
     largeDifference = largeBubbleCount-largeBubbleList.length;
   if (smallDifference > 0) {
    modifiedSmallBubbleList = this.createBubbles(smallDifference, modifiedSmallBubbleList, this.smallBubbleType);
   } else {
    modifiedSmallBubbleList = this.destroyBubbles(Math.abs(smallDifference), modifiedSmallBubbleList);
   }
   if (mediumDifference > 0){
    modifiedMediumBubbleList = this.createBubbles(mediumDifference, modifiedMediumBubbleList, this.mediumBubbleType);
   } else {
    modifiedMediumBubbleList = this.destroyBubbles(Math.abs(mediumDifference), modifiedMediumBubbleList);
   }
   if (largeDifference > 0){
    modifiedLargeBubbleList = this.createBubbles(largeDifference, modifiedLargeBubbleList, this.largeBubbleType);
   } else {
    modifiedLargeBubbleList = this.destroyBubbles(Math.abs(largeDifference), modifiedLargeBubbleList);
   }
   this.setState({
    bubblesCreated:true,
    bubblesMoving:true,
    smallBubbleList: modifiedSmallBubbleList,
    mediumBubbleList: modifiedMediumBubbleList,
    largeBubbleList: modifiedLargeBubbleList
   })
  } else if (!bubblesMoving){
   // this.startBubbles(smallBubbleList);
   // this.startBubbles(mediumBubbleList);
   // this.startBubbles(largeBubbleList);
   this.setState({
    bubblesMoving:true
   })
  }
 }

 stopBubbles = () => {
  const {bubblesMoving} = this.state;
  if(bubblesMoving){
   // this.stopBubbles(smallBubbleList);
   // this.stopBubbles(mediumBubbleList);
   // this.stopBubbles(largeBubbleList);
   this.setState({
    bubblesMoving: false
   })
  }
 }

 clearBubbles = () => {
  this.setState({
   bubblesCreated: false,
   bubblesMoving: false,
   smallBubbleList: [],
   mediumBubbleList: [],
   largeBubbleList: [],
  })
 }

 changeBubbleCount = (difference, bubbleList, bubbleType) => {
  const {bubblesMoving} = this.state;
  console.log('ichangin countg', difference, bubbleType)
  if (bubblesMoving && difference !== 0) {
   if (difference > 0) {
    bubbleList = this.createBubbles(difference,bubbleList, bubbleType);
   } else {
    bubbleList = this.destroyBubbles(Math.abs(difference),bubbleList, bubbleType);
   }
  }
  return bubbleList
 }

 setBubbleCount = (e, type) => {
  const {smallBubbleList, mediumBubbleList, largeBubbleList} = this.state;
  let bubbleCount = e.target.value;
  if (bubbleCount.length > 0) {
   bubbleCount = parseInt(bubbleCount, 10)
  } else {
   bubbleCount = null
  }
  let modifiedState = {};
  let difference;
  const parsedBubbleCount = bubbleCount || 0
  switch(type){
   case this.smallBubbleType:
    difference = parsedBubbleCount - smallBubbleList.length;
    modifiedState = {
     smallBubbleCount: bubbleCount,
     smallBubbleList: this.changeBubbleCount(difference, smallBubbleList, this.smallBubbleType)
    }
    break;
   case this.mediumBubbleType:
    difference = parsedBubbleCount - mediumBubbleList.length;
    modifiedState = {
     mediumBubbleCount: bubbleCount,
     mediumBubbleList: this.changeBubbleCount(difference, smallBubbleList, this.mediumBubbleType)
    }
    break;
   case this.largeBubbleType:
    difference = parsedBubbleCount - largeBubbleList.length;
    modifiedState = {
     largeBubbleCount: bubbleCount,
     largeBubbleList: this.changeBubbleCount(difference, largeBubbleList, this.largeBubbleType)
    }
    break;
  }
  this.setState(modifiedState)
 }

 render() {
  const {bubblesCreated,
   bubblesMoving,
   smallBubbleCount,
   mediumBubbleCount,
   largeBubbleCount,
   smallBubbleList,
   mediumBubbleList,
   largeBubbleList} = this.state
  return (
    <section id="reading-list-container" className="col-sm-12 portfolio-item">
     <h2 id="reading-list-title" className="section-header">Bubbles</h2>
     <p>
      This animation is derived from an exhibit created for the <a href="https://www.ontariosciencecentre.ca/"
                                                                   target="_blank">Ontario Science
      Centre</a> implementing <a href="https://aprilage.com/" target="_blank">AprilAge's</a> face aging kiosk. Originally built in <a href="http://velocityjs.org/" target="_blank">Velocity.js</a>.
     </p>
     <div id="bubbles-container" ref={this.bubbleContainerRef}>
      {smallBubbleList}
      {mediumBubbleList}
      {largeBubbleList}
     </div>
     <div className="col-sm-12 col-md-6">
      <input
        type="number"
        value={smallBubbleCount}
        onChange={(e) => this.setBubbleCount(e, this.smallBubbleType)}
        className={classNames('input')}
      />
      <input
        type="number"
        value={mediumBubbleCount}
        onChange={(e) => this.setBubbleCount(e, this.mediumBubbleType)}
        className={classNames('input')}
      />
      <input
        type="number"
        value={largeBubbleCount}
        onChange={(e) => this.setBubbleCount(e, this.largeBubbleType)}
        className={classNames('input')}
      />
     </div>
     <div className="col-sm-12 col-md-6 bubble-controls-container">
      <button
        onClick={this.startBubbles}
        className={classNames('button', {
         disabled: bubblesMoving && bubblesCreated
        })}
      >
       Start Bubbles
      </button>
      <button
        onClick={this.stopBubbles}
        className={classNames('button', {
         disabled: !bubblesMoving || !bubblesCreated
        })}
      >
       Stop Bubbles
      </button>
      <button
        onClick={this.clearBubbles}
        className={classNames('button',{
         disabled: !bubblesCreated
        })}
      >
       Clear Bubbles
      </button>
     </div>
     <a href="https://github.com/mike-stumpf/mikestumpf.com/blob/master/src/pages/portfolio/bubbles.js"
        className="button" target="_blank">
      View Code&nbsp;&nbsp;&nbsp;<FontAwesomeIcon icon={faGithub} className="fa"/>
     </a>
    </section>
  );
 }
}