/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(typeof self !== 'undefined' ? self : this)["webpackHotUpdate_N_E"]("pages/index",{

/***/ "./src/pages/sections/frontispiece.js":
/*!********************************************!*\
  !*** ./src/pages/sections/frontispiece.js ***!
  \********************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": function() { return /* binding */ Frontispiece; }\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"./node_modules/react/jsx-dev-runtime.js\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* module decorator */ module = __webpack_require__.hmd(module);\n\nvar _jsxFileName = \"/Users/mstumpf/Work/mikestumpf.com/src/pages/sections/frontispiece.js\";\nfunction Frontispiece() {\n  var desktopImageUrl = \"/images/face_desktop.jpg\";\n  var tabletImageUrl = \"/images/face_tablet.jpg\";\n  var mobileImageUrl = \"/images/face_mobile.jpg\";\n  return /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n    id: \"frontispiece-container\",\n    children: /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n      id: \"frontispiece-image-container\",\n      className: \"full-screen-grid-container row section-container\",\n      children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"img\", {\n        id: \"frontispiece-image\",\n        src: \"\".concat(desktopImageUrl, \"?q=70\"),\n        alt: \"Logo\",\n        width: 1280,\n        height: 960,\n        srcSet: \"\".concat(desktopImageUrl, \"?q=70 1280w, \\n    \").concat(mobileImageUrl, \"?w=414&q=70 400w, \\n    \").concat(tabletImageUrl, \"?w=800&q=70 800w, \\n    \").concat(desktopImageUrl, \"?w=1024&q=70 1024w\"),\n        sizes: \"(max-width: 600px) 480px, 800px\"\n      }, void 0, false, {\n        fileName: _jsxFileName,\n        lineNumber: 11,\n        columnNumber: 9\n      }, this), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n        id: \"frontispiece-logo\",\n        className: \"animated fadeInRight\",\n        children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"p\", {\n          children: \"Mike\"\n        }, void 0, false, {\n          fileName: _jsxFileName,\n          lineNumber: 26,\n          columnNumber: 11\n        }, this), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"p\", {\n          children: \"Stumpf\"\n        }, void 0, false, {\n          fileName: _jsxFileName,\n          lineNumber: 27,\n          columnNumber: 11\n        }, this)]\n      }, void 0, true, {\n        fileName: _jsxFileName,\n        lineNumber: 25,\n        columnNumber: 9\n      }, this)]\n    }, void 0, true, {\n      fileName: _jsxFileName,\n      lineNumber: 8,\n      columnNumber: 7\n    }, this)\n  }, void 0, false, {\n    fileName: _jsxFileName,\n    lineNumber: 7,\n    columnNumber: 5\n  }, this);\n}\n_c = Frontispiece;\n\nvar _c;\n\n$RefreshReg$(_c, \"Frontispiece\");\n\n;\n    var _a, _b;\n    // Legacy CSS implementations will `eval` browser code in a Node.js context\n    // to extract CSS. For backwards compatibility, we need to check we're in a\n    // browser context before continuing.\n    if (typeof self !== 'undefined' &&\n        // AMP / No-JS mode does not inject these helpers:\n        '$RefreshHelpers$' in self) {\n        var currentExports = module.__proto__.exports;\n        var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;\n        // This cannot happen in MainTemplate because the exports mismatch between\n        // templating and execution.\n        self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n        // A module can be accepted automatically based on its exports, e.g. when\n        // it is a Refresh Boundary.\n        if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n            // Save the previous exports on update so we can compare the boundary\n            // signatures.\n            module.hot.dispose(function (data) {\n                data.prevExports = currentExports;\n            });\n            // Unconditionally accept an update to this module, we'll check if it's\n            // still a Refresh Boundary later.\n            module.hot.accept();\n            // This field is set when the previous version of this module was a\n            // Refresh Boundary, letting us know we need to check for invalidation or\n            // enqueue an update.\n            if (prevExports !== null) {\n                // A boundary can become ineligible if its exports are incompatible\n                // with the previous exports.\n                //\n                // For example, if you add/remove/change exports, we'll want to\n                // re-execute the importing modules, and force those components to\n                // re-render. Similarly, if you convert a class component to a\n                // function, we want to invalidate the boundary.\n                if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)) {\n                    module.hot.invalidate();\n                }\n                else {\n                    self.$RefreshHelpers$.scheduleUpdate();\n                }\n            }\n        }\n        else {\n            // Since we just executed the code for the module, it's possible that the\n            // new exports made it ineligible for being a boundary.\n            // We only care about the case when we were _previously_ a boundary,\n            // because we already accepted this update (accidental side effect).\n            var isNoLongerABoundary = prevExports !== null;\n            if (isNoLongerABoundary) {\n                module.hot.invalidate();\n            }\n        }\n    }\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4vc3JjL3BhZ2VzL3NlY3Rpb25zL2Zyb250aXNwaWVjZS5qcz8wNWNkIl0sIm5hbWVzIjpbIkZyb250aXNwaWVjZSIsImRlc2t0b3BJbWFnZVVybCIsInRhYmxldEltYWdlVXJsIiwibW9iaWxlSW1hZ2VVcmwiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFlLFNBQVNBLFlBQVQsR0FBd0I7QUFDckMsTUFBTUMsZUFBZSxHQUFHLDBCQUF4QjtBQUNBLE1BQU1DLGNBQWMsR0FBRyx5QkFBdkI7QUFDQSxNQUFNQyxjQUFjLEdBQUcseUJBQXZCO0FBRUEsc0JBQ0U7QUFBSyxNQUFFLEVBQUMsd0JBQVI7QUFBQSwyQkFDRTtBQUNFLFFBQUUsRUFBQyw4QkFETDtBQUVFLGVBQVMsRUFBQyxrREFGWjtBQUFBLDhCQUdFO0FBQ0UsVUFBRSxFQUFDLG9CQURMO0FBRUUsV0FBRyxZQUFLRixlQUFMLFVBRkw7QUFHRSxXQUFHLEVBQUMsTUFITjtBQUlFLGFBQUssRUFBRSxJQUpUO0FBS0UsY0FBTSxFQUFFLEdBTFY7QUFNRSxjQUFNLFlBQ0RBLGVBREMsZ0NBRVZFLGNBRlUscUNBR1ZELGNBSFUscUNBSVZELGVBSlUsdUJBTlI7QUFXRSxhQUFLLEVBQUM7QUFYUjtBQUFBO0FBQUE7QUFBQTtBQUFBLGNBSEYsZUFpQkU7QUFBSyxVQUFFLEVBQUMsbUJBQVI7QUFBNEIsaUJBQVMsRUFBQyxzQkFBdEM7QUFBQSxnQ0FDRTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxnQkFERixlQUVFO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLGdCQUZGO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxjQWpCRjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFERjtBQUFBO0FBQUE7QUFBQTtBQUFBLFVBREY7QUEwQkQ7S0EvQnVCRCxZIiwiZmlsZSI6Ii4vc3JjL3BhZ2VzL3NlY3Rpb25zL2Zyb250aXNwaWVjZS5qcy5qcyIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIEZyb250aXNwaWVjZSgpIHtcbiAgY29uc3QgZGVza3RvcEltYWdlVXJsID0gXCIvaW1hZ2VzL2ZhY2VfZGVza3RvcC5qcGdcIjtcbiAgY29uc3QgdGFibGV0SW1hZ2VVcmwgPSBcIi9pbWFnZXMvZmFjZV90YWJsZXQuanBnXCI7XG4gIGNvbnN0IG1vYmlsZUltYWdlVXJsID0gXCIvaW1hZ2VzL2ZhY2VfbW9iaWxlLmpwZ1wiO1xuXG4gIHJldHVybiAoXG4gICAgPGRpdiBpZD1cImZyb250aXNwaWVjZS1jb250YWluZXJcIj5cbiAgICAgIDxkaXZcbiAgICAgICAgaWQ9XCJmcm9udGlzcGllY2UtaW1hZ2UtY29udGFpbmVyXCJcbiAgICAgICAgY2xhc3NOYW1lPVwiZnVsbC1zY3JlZW4tZ3JpZC1jb250YWluZXIgcm93IHNlY3Rpb24tY29udGFpbmVyXCI+XG4gICAgICAgIDxpbWdcbiAgICAgICAgICBpZD1cImZyb250aXNwaWVjZS1pbWFnZVwiXG4gICAgICAgICAgc3JjPXtgJHtkZXNrdG9wSW1hZ2VVcmx9P3E9NzBgfVxuICAgICAgICAgIGFsdD1cIkxvZ29cIlxuICAgICAgICAgIHdpZHRoPXsxMjgwfVxuICAgICAgICAgIGhlaWdodD17OTYwfVxuICAgICAgICAgIHNyY1NldD17XG4gICAgICAgICAgICBgJHtkZXNrdG9wSW1hZ2VVcmx9P3E9NzAgMTI4MHcsIFxuICAgICR7bW9iaWxlSW1hZ2VVcmx9P3c9NDE0JnE9NzAgNDAwdywgXG4gICAgJHt0YWJsZXRJbWFnZVVybH0/dz04MDAmcT03MCA4MDB3LCBcbiAgICAke2Rlc2t0b3BJbWFnZVVybH0/dz0xMDI0JnE9NzAgMTAyNHdgfVxuICAgICAgICAgIHNpemVzPVwiKG1heC13aWR0aDogNjAwcHgpIDQ4MHB4LFxuICAgICAgICAgICAgODAwcHhcIlxuICAgICAgICAvPlxuICAgICAgICA8ZGl2IGlkPVwiZnJvbnRpc3BpZWNlLWxvZ29cIiBjbGFzc05hbWU9XCJhbmltYXRlZCBmYWRlSW5SaWdodFwiPlxuICAgICAgICAgIDxwPk1pa2U8L3A+XG4gICAgICAgICAgPHA+U3R1bXBmPC9wPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICApO1xufVxuIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/pages/sections/frontispiece.js\n");

/***/ })

});