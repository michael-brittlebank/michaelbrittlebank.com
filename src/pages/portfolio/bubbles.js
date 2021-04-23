import React from 'react';
import {VelocityComponent} from 'velocity-react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as faGithub from '@fortawesome/fontawesome-free-brands/faGithub'
import classNames from "classnames";

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
   largeBubbleCount: 10
  };
  this.myRef = React.createRef();
 }

 componentDidMount() {
  require('velocity-animate');
  require('velocity-animate/velocity.ui');
 }

 startBubbles = () => {
  const {bubblesCreated, bubblesMoving, smallBubbleCount,
   mediumBubbleCount,
   largeBubbleCount} = this.state
  if(!bubblesCreated){
   // let smallDifference = numberSmallBubbles-smallBubbleList.length,
   //   mediumDifference = numberMediumBubbles-mediumBubbleList.length,
   //   largeDifference = numberLargeBubbles-largeBubbleList.length;
   // if (smallDifference > 0){
   //  this.createBubbles(smallDifference, this.smallBubbleType);
   // } else {
   //  this.destroyBubbles(Math.abs(smallDifference), this.smallBubbleType);
   // }
   // if (mediumDifference > 0){
   //  this.createBubbles(mediumDifference, this.mediumBubbleType);
   // } else {
   //  this.destroyBubbles(Math.abs(mediumDifference), this.mediumBubbleType);
   // }
   // if (largeDifference > 0){
   //  this.createBubbles(largeDifference, this.largeBubbleType);
   // } else {
   //  this.destroyBubbles(Math.abs(largeDifference), this.largeBubbleType);
   // }
   console.log('count', smallBubbleCount,
     mediumBubbleCount,
     largeBubbleCount)
   Velocity(this.myRef,{ scale: 2 },500)
     .then(e=>console.log('animation complete'))
   this.setState({
    bubblesCreated:true,
    bubblesMoving:true
   })
  } else if (!bubblesMoving){
// move lists
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
  // let totalLength = smallBubbleList.length+mediumBubbleList.length+largeBubbleList.length;
  // this.destroyBubbles(smallBubbleList.length, this.smallBubble);
  // this.destroyBubbles(mediumBubbleList.length, this.mediumBubble);
  // this.destroyBubbles(largeBubbleList.length, this.largeBubble);
  // setTimeout(function(){
  //  if (smallBubbleList.length === 0 && mediumBubbleList.length === 0 && largeBubbleList.length === 0 && $(bubbleContainer).children().length > 0){
  //   $($(bubbleContainer).children()).each(function(index, entry){
  //    site.animation.fadeOutAndRemove($(entry),msInOneSecond,50*index);
  //   });
  //  }
  // }, (totalLength)*55);
  this.setState({
   bubblesCreated: false,
   bubblesMoving: false
  })
 }

 changeBubbleCount = (typeOfBubble) => {
  const {bubblesMoving, smallBubbleList, mediumBubbleList, largeBubbleList} = this.state;
  let difference;
  if (bubblesMoving) {
   //otherwise caught by start function
   switch (typeOfBubble) {
    case this.smallBubbleType:
     difference = $(smallBubbles).val() - smallBubbleList.length;
     break;
    case this.mediumBubbleType:
     difference = $(mediumBubbles).val() - mediumBubbleList.length;
     break;
    case this.largeBubbleType:
     difference = $(largeBubbles).val() - largeBubbleList.length;
     break;
   }
   if (difference !== 0) {
    if (difference > 0) {
     this.createBubbles(difference, typeOfBubble);
    } else {
     this.destroyBubbles(Math.abs(difference), typeOfBubble);
    }
   }
  }
 }

 setBubbleCount = (e, type) => {
  let bubbleCount = e.target.value;
  if (bubbleCount.length > 0) {
   bubbleCount = parseInt(bubbleCount, 10)
   let modifiedState = {};
   switch(type){
    case this.smallBubbleType:
     modifiedState = {
      smallBubbleCount: bubbleCount
     }
     break;
    case this.mediumBubbleType:
     modifiedState = {
      mediumBubbleCount: bubbleCount
     }
     break;
    case this.largeBubbleType:
     modifiedState = {
      largeBubbleCount: bubbleCount
     }
     break;
   }
   this.setState(modifiedState)
  }
 }

 render() {
  const {bubblesCreated,
   bubblesMoving,
   smallBubbleCount,
   mediumBubbleCount,
   largeBubbleCount} = this.state
  return (
    <section id="reading-list-container" className="col-sm-12 portfolio-item">
     <h2 id="reading-list-title" className="section-header">Bubbles</h2>
     <p>
      This animation is derived from an exhibit created for the <a href="https://www.ontariosciencecentre.ca/"
                                                                   target="_blank">Ontario Science
      Centre</a> implementing <a href="https://aprilage.com/" target="_blank">AprilAge's</a> face aging kiosk.
     </p>
     <div id="bubbles-container">
      <VelocityComponent animation={{ opacity: bubblesMoving ? 1 : 0 }} duration={500}>
       <div>
        bubbles here
       </div>
      </VelocityComponent>
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