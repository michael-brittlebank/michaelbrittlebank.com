(("undefined"!==typeof self?self:this).webpackChunk_N_E=("undefined"!==typeof self?self:this).webpackChunk_N_E||[]).push([[575],{3349:function(t,e,o){"use strict";function r(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}o.d(e,{Z:function(){return r}})},6610:function(t,e,o){"use strict";function r(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}o.d(e,{Z:function(){return r}})},5991:function(t,e,o){"use strict";function r(t,e){for(var o=0;o<e.length;o++){var r=e[o];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function n(t,e,o){return e&&r(t.prototype,e),o&&r(t,o),t}o.d(e,{Z:function(){return n}})},6156:function(t,e,o){"use strict";function r(t,e,o){return e in t?Object.defineProperty(t,e,{value:o,enumerable:!0,configurable:!0,writable:!0}):t[e]=o,t}o.d(e,{Z:function(){return r}})},7608:function(t,e,o){"use strict";function r(t){return(r=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}o.d(e,{Z:function(){return r}})},5255:function(t,e,o){"use strict";function r(t,e){return(r=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}function n(t,e){if("function"!==typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&r(t,e)}o.d(e,{Z:function(){return n}})},6089:function(t,e,o){"use strict";function r(t){return(r="function"===typeof Symbol&&"symbol"===typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"===typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}o.d(e,{Z:function(){return i}});var n=o(3349);function i(t,e){return!e||"object"!==r(e)&&"function"!==typeof e?(0,n.Z)(t):e}},6086:function(t){"use strict";var e=Object.assign.bind(Object);t.exports=e,t.exports.default=t.exports},5890:function(t,e,o){"use strict";o.r(e),o.d(e,{default:function(){return p}});var r=o(5893),n=o(6610),i=o(5991),s=o(3349),c=o(5255),a=o(6089),u=o(7608),f=o(6156),l=o(7294),h=o(6261);function d(t){var e=function(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(t){return!1}}();return function(){var o,r=(0,u.Z)(t);if(e){var n=(0,u.Z)(this).constructor;o=Reflect.construct(r,arguments,n)}else o=r.apply(this,arguments);return(0,a.Z)(this,o)}}var p=function(t){(0,c.Z)(o,t);var e=d(o);function o(){var t;(0,n.Z)(this,o);for(var r=arguments.length,i=new Array(r),c=0;c<r;c++)i[c]=arguments[c];return t=e.call.apply(e,[this].concat(i)),(0,f.Z)((0,s.Z)(t),"headerOffset",-65),(0,f.Z)((0,s.Z)(t),"scrollDuration",750),t}return(0,i.Z)(o,[{key:"componentDidMount",value:function(){h.c5.update(),window.location.hash.length>0&&this._scrollTo(window.location.hash.substring(1))}},{key:"componentDidUpdate",value:function(){window.location.hash.length>0&&this._scrollTo(window.location.hash.substring(1))}},{key:"render",value:function(){return(0,r.jsx)("header",{children:(0,r.jsx)("div",{className:"grid-container row",children:(0,r.jsx)("div",{className:"col-md-12 text-center hide-for-small",children:(0,r.jsxs)("nav",{className:"standard-menu",children:[(0,r.jsx)(h.rU,{activeClass:"active",to:"frontispiece-container",spy:!0,smooth:!0,offset:this.headerOffset,duration:this.scrollDuration,children:"Home"}),(0,r.jsx)(h.rU,{activeClass:"active",to:"resume-container",spy:!0,smooth:!0,offset:this.headerOffset,duration:this.scrollDuration,children:"Resume"}),(0,r.jsx)(h.rU,{activeClass:"active",to:"travel-container",spy:!0,smooth:!0,offset:this.headerOffset,duration:this.scrollDuration,children:"Travel"}),(0,r.jsx)(h.rU,{activeClass:"active",to:"portfolio-container",spy:!0,smooth:!0,offset:this.headerOffset,duration:this.scrollDuration,children:"Portfolio"})]})})})})}},{key:"_scrollTo",value:function(t){var e=this;setTimeout((function(){switch(t){case"resume":h.OK.scrollTo("resume-container",{smooth:!0,offset:e.headerOffset,duration:e.scrollDuration,end:e._clearHashFromUrl()});break;case"travel":h.OK.scrollTo("travel-container",{smooth:!0,offset:e.headerOffset,duration:e.scrollDuration,end:e._clearHashFromUrl()});break;case"portfolio":h.OK.scrollTo("portfolio-container",{smooth:!0,offset:e.headerOffset,duration:e.scrollDuration,end:e._clearHashFromUrl()});break;case"hauptstimme":h.OK.scrollTo("hauptstimme-container",{smooth:!0,offset:e.headerOffset,duration:e.scrollDuration,end:e._clearHashFromUrl()});break;case"reading-list":h.OK.scrollTo("reading-list-container",{smooth:!0,offset:e.headerOffset,duration:e.scrollDuration,end:e._clearHashFromUrl()});break;case"metronome":h.OK.scrollTo("metronome-container",{smooth:!0,offset:e.headerOffset,duration:e.scrollDuration,end:e._clearHashFromUrl()});break;default:e._clearHashFromUrl()}}),500)}},{key:"_clearHashFromUrl",value:function(){history.pushState("",document.title,window.location.pathname+window.location.search)}}]),o}(l.Component)},9813:function(t,e,o){(window.__NEXT_P=window.__NEXT_P||[]).push(["/components/header",function(){return o(5890)}])}},function(t){t.O(0,[774,261],(function(){return e=9813,t(t.s=e);var e}));var e=t.O();_N_E=e}]);