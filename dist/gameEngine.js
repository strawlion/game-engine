/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
// TODO: Extract pixi to a plugin (SOC)
// PIXI
// const renderObjectContainer = new PIXI.Container();
// app.stage.addChild(renderObjectContainer);
// PIXI
// TODO: Stage, container
// https://github.com/Coder2012/pixi/tree/master/spaceshooter
// https://codepen.io/celsowhite/pen/XWbEzpx
exports.default = createGame;
function createGame(config) {
    const { targetGameLogicFrameRate, update, render, } = config;
    const MS_PER_UPDATE = 1000 / targetGameLogicFrameRate;
    return {
        start,
    };
    function start() {
        let previousTime = Date.now();
        let timeBehindRealWorld = 0;
        nextTick();
        function nextTick() {
            window.requestAnimationFrame(nextTick);
            const currentTime = Date.now();
            const elapsedTime = currentTime - previousTime;
            timeBehindRealWorld += elapsedTime;
            // TODO: process input
            // Fixed Game Logic timestep - TODO: bail after num iterations
            while (timeBehindRealWorld >= MS_PER_UPDATE) {
                update();
                timeBehindRealWorld -= MS_PER_UPDATE;
            }
            const distanceBetweenGameLogicFrames = timeBehindRealWorld / MS_PER_UPDATE;
            // Variable render timestep
            render(distanceBetweenGameLogicFrames);
            previousTime = currentTime;
        }
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFNQSx1Q0FBdUM7QUFFdkMsT0FBTztBQUNQLHNEQUFzRDtBQUN0RCw2Q0FBNkM7QUFDN0MsT0FBTztBQUVQLHlCQUF5QjtBQUN6Qiw2REFBNkQ7QUFDN0QsNENBQTRDO0FBRTVDLGtCQUFlLFVBQVUsQ0FBQztBQUUxQixTQUFTLFVBQVUsQ0FBQyxNQUFrQjtJQUVsQyxNQUFNLEVBQ0Ysd0JBQXdCLEVBQ3hCLE1BQU0sRUFDTixNQUFNLEdBQ1QsR0FBRyxNQUFNLENBQUM7SUFFWCxNQUFNLGFBQWEsR0FBRyxJQUFJLEdBQUcsd0JBQXdCLENBQUM7SUFHdEQsT0FBTztRQUNILEtBQUs7S0FDUixDQUFDO0lBRUYsU0FBUyxLQUFLO1FBQ1YsSUFBSSxZQUFZLEdBQUcsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDO1FBQzlCLElBQUksbUJBQW1CLEdBQUcsQ0FBQyxDQUFDO1FBRTVCLFFBQVEsRUFBRSxDQUFDO1FBRVgsU0FBUyxRQUFRO1lBQ2IsTUFBTSxDQUFDLHFCQUFxQixDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBRXZDLE1BQU0sV0FBVyxHQUFHLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQztZQUMvQixNQUFNLFdBQVcsR0FBRyxXQUFXLEdBQUcsWUFBWSxDQUFDO1lBQy9DLG1CQUFtQixJQUFJLFdBQVcsQ0FBQztZQUVuQyxzQkFBc0I7WUFFdEIsOERBQThEO1lBQzlELE9BQU8sbUJBQW1CLElBQUksYUFBYSxFQUFFO2dCQUN6QyxNQUFNLEVBQUUsQ0FBQztnQkFDVCxtQkFBbUIsSUFBSSxhQUFhLENBQUM7YUFDeEM7WUFFRCxNQUFNLDhCQUE4QixHQUFHLG1CQUFtQixHQUFHLGFBQWEsQ0FBQztZQUUzRSwyQkFBMkI7WUFDM0IsTUFBTSxDQUFDLDhCQUE4QixDQUFDLENBQUM7WUFDdkMsWUFBWSxHQUFHLFdBQVcsQ0FBQztRQUMvQixDQUFDO0lBQ0wsQ0FBQztBQUVMLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbnRlcmZhY2UgR2FtZUNvbmZpZyB7XG4gICAgdGFyZ2V0R2FtZUxvZ2ljRnJhbWVSYXRlOiBudW1iZXI7XG4gICAgdXBkYXRlOiAoKSA9PiBhbnk7XG4gICAgcmVuZGVyOiAoZGlzdGFuY2VCZXR3ZWVuR2FtZUxvZ2ljRnJhbWVzOiBudW1iZXIpID0+IGFueTtcbn1cblxuLy8gVE9ETzogRXh0cmFjdCBwaXhpIHRvIGEgcGx1Z2luIChTT0MpXG5cbi8vIFBJWElcbi8vIGNvbnN0IHJlbmRlck9iamVjdENvbnRhaW5lciA9IG5ldyBQSVhJLkNvbnRhaW5lcigpO1xuLy8gYXBwLnN0YWdlLmFkZENoaWxkKHJlbmRlck9iamVjdENvbnRhaW5lcik7XG4vLyBQSVhJXG5cbi8vIFRPRE86IFN0YWdlLCBjb250YWluZXJcbi8vIGh0dHBzOi8vZ2l0aHViLmNvbS9Db2RlcjIwMTIvcGl4aS90cmVlL21hc3Rlci9zcGFjZXNob290ZXJcbi8vIGh0dHBzOi8vY29kZXBlbi5pby9jZWxzb3doaXRlL3Blbi9YV2JFenB4XG5cbmV4cG9ydCBkZWZhdWx0IGNyZWF0ZUdhbWU7XG5cbmZ1bmN0aW9uIGNyZWF0ZUdhbWUoY29uZmlnOiBHYW1lQ29uZmlnKSB7XG5cbiAgICBjb25zdCB7XG4gICAgICAgIHRhcmdldEdhbWVMb2dpY0ZyYW1lUmF0ZSxcbiAgICAgICAgdXBkYXRlLFxuICAgICAgICByZW5kZXIsXG4gICAgfSA9IGNvbmZpZztcblxuICAgIGNvbnN0IE1TX1BFUl9VUERBVEUgPSAxMDAwIC8gdGFyZ2V0R2FtZUxvZ2ljRnJhbWVSYXRlO1xuXG5cbiAgICByZXR1cm4ge1xuICAgICAgICBzdGFydCxcbiAgICB9O1xuXG4gICAgZnVuY3Rpb24gc3RhcnQoKSB7XG4gICAgICAgIGxldCBwcmV2aW91c1RpbWUgPSBEYXRlLm5vdygpO1xuICAgICAgICBsZXQgdGltZUJlaGluZFJlYWxXb3JsZCA9IDA7XG5cbiAgICAgICAgbmV4dFRpY2soKTtcblxuICAgICAgICBmdW5jdGlvbiBuZXh0VGljaygpIHtcbiAgICAgICAgICAgIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUobmV4dFRpY2spO1xuXG4gICAgICAgICAgICBjb25zdCBjdXJyZW50VGltZSA9IERhdGUubm93KCk7XG4gICAgICAgICAgICBjb25zdCBlbGFwc2VkVGltZSA9IGN1cnJlbnRUaW1lIC0gcHJldmlvdXNUaW1lO1xuICAgICAgICAgICAgdGltZUJlaGluZFJlYWxXb3JsZCArPSBlbGFwc2VkVGltZTtcblxuICAgICAgICAgICAgLy8gVE9ETzogcHJvY2VzcyBpbnB1dFxuXG4gICAgICAgICAgICAvLyBGaXhlZCBHYW1lIExvZ2ljIHRpbWVzdGVwIC0gVE9ETzogYmFpbCBhZnRlciBudW0gaXRlcmF0aW9uc1xuICAgICAgICAgICAgd2hpbGUgKHRpbWVCZWhpbmRSZWFsV29ybGQgPj0gTVNfUEVSX1VQREFURSkge1xuICAgICAgICAgICAgICAgIHVwZGF0ZSgpO1xuICAgICAgICAgICAgICAgIHRpbWVCZWhpbmRSZWFsV29ybGQgLT0gTVNfUEVSX1VQREFURTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY29uc3QgZGlzdGFuY2VCZXR3ZWVuR2FtZUxvZ2ljRnJhbWVzID0gdGltZUJlaGluZFJlYWxXb3JsZCAvIE1TX1BFUl9VUERBVEU7XG5cbiAgICAgICAgICAgIC8vIFZhcmlhYmxlIHJlbmRlciB0aW1lc3RlcFxuICAgICAgICAgICAgcmVuZGVyKGRpc3RhbmNlQmV0d2VlbkdhbWVMb2dpY0ZyYW1lcyk7XG4gICAgICAgICAgICBwcmV2aW91c1RpbWUgPSBjdXJyZW50VGltZTtcbiAgICAgICAgfVxuICAgIH1cblxufVxuIl19

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7UUFBQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTs7O1FBR0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDBDQUEwQyxnQ0FBZ0M7UUFDMUU7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSx3REFBd0Qsa0JBQWtCO1FBQzFFO1FBQ0EsaURBQWlELGNBQWM7UUFDL0Q7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLHlDQUF5QyxpQ0FBaUM7UUFDMUUsZ0hBQWdILG1CQUFtQixFQUFFO1FBQ3JJO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMkJBQTJCLDBCQUEwQixFQUFFO1FBQ3ZELGlDQUFpQyxlQUFlO1FBQ2hEO1FBQ0E7UUFDQTs7UUFFQTtRQUNBLHNEQUFzRCwrREFBK0Q7O1FBRXJIO1FBQ0E7OztRQUdBO1FBQ0E7Ozs7Ozs7Ozs7Ozs7QUNsRmE7QUFDYiw4Q0FBOEMsY0FBYztBQUM1RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsNENBQTRDO0FBQ3ZEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyQ0FBMkMsbTRHIiwiZmlsZSI6ImdhbWVFbmdpbmUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9pbmRleC50c1wiKTtcbiIsIlwidXNlIHN0cmljdFwiO1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbi8vIFRPRE86IEV4dHJhY3QgcGl4aSB0byBhIHBsdWdpbiAoU09DKVxyXG4vLyBQSVhJXHJcbi8vIGNvbnN0IHJlbmRlck9iamVjdENvbnRhaW5lciA9IG5ldyBQSVhJLkNvbnRhaW5lcigpO1xyXG4vLyBhcHAuc3RhZ2UuYWRkQ2hpbGQocmVuZGVyT2JqZWN0Q29udGFpbmVyKTtcclxuLy8gUElYSVxyXG4vLyBUT0RPOiBTdGFnZSwgY29udGFpbmVyXHJcbi8vIGh0dHBzOi8vZ2l0aHViLmNvbS9Db2RlcjIwMTIvcGl4aS90cmVlL21hc3Rlci9zcGFjZXNob290ZXJcclxuLy8gaHR0cHM6Ly9jb2RlcGVuLmlvL2NlbHNvd2hpdGUvcGVuL1hXYkV6cHhcclxuZXhwb3J0cy5kZWZhdWx0ID0gY3JlYXRlR2FtZTtcclxuZnVuY3Rpb24gY3JlYXRlR2FtZShjb25maWcpIHtcclxuICAgIGNvbnN0IHsgdGFyZ2V0R2FtZUxvZ2ljRnJhbWVSYXRlLCB1cGRhdGUsIHJlbmRlciwgfSA9IGNvbmZpZztcclxuICAgIGNvbnN0IE1TX1BFUl9VUERBVEUgPSAxMDAwIC8gdGFyZ2V0R2FtZUxvZ2ljRnJhbWVSYXRlO1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBzdGFydCxcclxuICAgIH07XHJcbiAgICBmdW5jdGlvbiBzdGFydCgpIHtcclxuICAgICAgICBsZXQgcHJldmlvdXNUaW1lID0gRGF0ZS5ub3coKTtcclxuICAgICAgICBsZXQgdGltZUJlaGluZFJlYWxXb3JsZCA9IDA7XHJcbiAgICAgICAgbmV4dFRpY2soKTtcclxuICAgICAgICBmdW5jdGlvbiBuZXh0VGljaygpIHtcclxuICAgICAgICAgICAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZShuZXh0VGljayk7XHJcbiAgICAgICAgICAgIGNvbnN0IGN1cnJlbnRUaW1lID0gRGF0ZS5ub3coKTtcclxuICAgICAgICAgICAgY29uc3QgZWxhcHNlZFRpbWUgPSBjdXJyZW50VGltZSAtIHByZXZpb3VzVGltZTtcclxuICAgICAgICAgICAgdGltZUJlaGluZFJlYWxXb3JsZCArPSBlbGFwc2VkVGltZTtcclxuICAgICAgICAgICAgLy8gVE9ETzogcHJvY2VzcyBpbnB1dFxyXG4gICAgICAgICAgICAvLyBGaXhlZCBHYW1lIExvZ2ljIHRpbWVzdGVwIC0gVE9ETzogYmFpbCBhZnRlciBudW0gaXRlcmF0aW9uc1xyXG4gICAgICAgICAgICB3aGlsZSAodGltZUJlaGluZFJlYWxXb3JsZCA+PSBNU19QRVJfVVBEQVRFKSB7XHJcbiAgICAgICAgICAgICAgICB1cGRhdGUoKTtcclxuICAgICAgICAgICAgICAgIHRpbWVCZWhpbmRSZWFsV29ybGQgLT0gTVNfUEVSX1VQREFURTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjb25zdCBkaXN0YW5jZUJldHdlZW5HYW1lTG9naWNGcmFtZXMgPSB0aW1lQmVoaW5kUmVhbFdvcmxkIC8gTVNfUEVSX1VQREFURTtcclxuICAgICAgICAgICAgLy8gVmFyaWFibGUgcmVuZGVyIHRpbWVzdGVwXHJcbiAgICAgICAgICAgIHJlbmRlcihkaXN0YW5jZUJldHdlZW5HYW1lTG9naWNGcmFtZXMpO1xyXG4gICAgICAgICAgICBwcmV2aW91c1RpbWUgPSBjdXJyZW50VGltZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxleUoyWlhKemFXOXVJam96TENKbWFXeGxJam9pYVc1a1pYZ3Vhbk1pTENKemIzVnlZMlZTYjI5MElqb2lJaXdpYzI5MWNtTmxjeUk2V3lJdUxpOHVMaTl6Y21NdmFXNWtaWGd1ZEhNaVhTd2libUZ0WlhNaU9sdGRMQ0p0WVhCd2FXNW5jeUk2SWpzN1FVRk5RU3gxUTBGQmRVTTdRVUZGZGtNc1QwRkJUenRCUVVOUUxITkVRVUZ6UkR0QlFVTjBSQ3cyUTBGQk5rTTdRVUZETjBNc1QwRkJUenRCUVVWUUxIbENRVUY1UWp0QlFVTjZRaXcyUkVGQk5rUTdRVUZETjBRc05FTkJRVFJETzBGQlJUVkRMR3RDUVVGbExGVkJRVlVzUTBGQlF6dEJRVVV4UWl4VFFVRlRMRlZCUVZVc1EwRkJReXhOUVVGclFqdEpRVVZzUXl4TlFVRk5MRVZCUTBZc2QwSkJRWGRDTEVWQlEzaENMRTFCUVUwc1JVRkRUaXhOUVVGTkxFZEJRMVFzUjBGQlJ5eE5RVUZOTEVOQlFVTTdTVUZGV0N4TlFVRk5MR0ZCUVdFc1IwRkJSeXhKUVVGSkxFZEJRVWNzZDBKQlFYZENMRU5CUVVNN1NVRkhkRVFzVDBGQlR6dFJRVU5JTEV0QlFVczdTMEZEVWl4RFFVRkRPMGxCUlVZc1UwRkJVeXhMUVVGTE8xRkJRMVlzU1VGQlNTeFpRVUZaTEVkQlFVY3NTVUZCU1N4RFFVRkRMRWRCUVVjc1JVRkJSU3hEUVVGRE8xRkJRemxDTEVsQlFVa3NiVUpCUVcxQ0xFZEJRVWNzUTBGQlF5eERRVUZETzFGQlJUVkNMRkZCUVZFc1JVRkJSU3hEUVVGRE8xRkJSVmdzVTBGQlV5eFJRVUZSTzFsQlEySXNUVUZCVFN4RFFVRkRMSEZDUVVGeFFpeERRVUZETEZGQlFWRXNRMEZCUXl4RFFVRkRPMWxCUlhaRExFMUJRVTBzVjBGQlZ5eEhRVUZITEVsQlFVa3NRMEZCUXl4SFFVRkhMRVZCUVVVc1EwRkJRenRaUVVNdlFpeE5RVUZOTEZkQlFWY3NSMEZCUnl4WFFVRlhMRWRCUVVjc1dVRkJXU3hEUVVGRE8xbEJReTlETEcxQ1FVRnRRaXhKUVVGSkxGZEJRVmNzUTBGQlF6dFpRVVZ1UXl4elFrRkJjMEk3V1VGRmRFSXNPRVJCUVRoRU8xbEJRemxFTEU5QlFVOHNiVUpCUVcxQ0xFbEJRVWtzWVVGQllTeEZRVUZGTzJkQ1FVTjZReXhOUVVGTkxFVkJRVVVzUTBGQlF6dG5Ra0ZEVkN4dFFrRkJiVUlzU1VGQlNTeGhRVUZoTEVOQlFVTTdZVUZEZUVNN1dVRkZSQ3hOUVVGTkxEaENRVUU0UWl4SFFVRkhMRzFDUVVGdFFpeEhRVUZITEdGQlFXRXNRMEZCUXp0WlFVVXpSU3d5UWtGQk1rSTdXVUZETTBJc1RVRkJUU3hEUVVGRExEaENRVUU0UWl4RFFVRkRMRU5CUVVNN1dVRkRka01zV1VGQldTeEhRVUZITEZkQlFWY3NRMEZCUXp0UlFVTXZRaXhEUVVGRE8wbEJRMHdzUTBGQlF6dEJRVVZNTEVOQlFVTWlMQ0p6YjNWeVkyVnpRMjl1ZEdWdWRDSTZXeUpwYm5SbGNtWmhZMlVnUjJGdFpVTnZibVpwWnlCN1hHNGdJQ0FnZEdGeVoyVjBSMkZ0WlV4dloybGpSbkpoYldWU1lYUmxPaUJ1ZFcxaVpYSTdYRzRnSUNBZ2RYQmtZWFJsT2lBb0tTQTlQaUJoYm5rN1hHNGdJQ0FnY21WdVpHVnlPaUFvWkdsemRHRnVZMlZDWlhSM1pXVnVSMkZ0WlV4dloybGpSbkpoYldWek9pQnVkVzFpWlhJcElEMCtJR0Z1ZVR0Y2JuMWNibHh1THk4Z1ZFOUVUem9nUlhoMGNtRmpkQ0J3YVhocElIUnZJR0VnY0d4MVoybHVJQ2hUVDBNcFhHNWNiaTh2SUZCSldFbGNiaTh2SUdOdmJuTjBJSEpsYm1SbGNrOWlhbVZqZEVOdmJuUmhhVzVsY2lBOUlHNWxkeUJRU1ZoSkxrTnZiblJoYVc1bGNpZ3BPMXh1THk4Z1lYQndMbk4wWVdkbExtRmtaRU5vYVd4a0tISmxibVJsY2s5aWFtVmpkRU52Ym5SaGFXNWxjaWs3WEc0dkx5QlFTVmhKWEc1Y2JpOHZJRlJQUkU4NklGTjBZV2RsTENCamIyNTBZV2x1WlhKY2JpOHZJR2gwZEhCek9pOHZaMmwwYUhWaUxtTnZiUzlEYjJSbGNqSXdNVEl2Y0dsNGFTOTBjbVZsTDIxaGMzUmxjaTl6Y0dGalpYTm9iMjkwWlhKY2JpOHZJR2gwZEhCek9pOHZZMjlrWlhCbGJpNXBieTlqWld4emIzZG9hWFJsTDNCbGJpOVlWMkpGZW5CNFhHNWNibVY0Y0c5eWRDQmtaV1poZFd4MElHTnlaV0YwWlVkaGJXVTdYRzVjYm1aMWJtTjBhVzl1SUdOeVpXRjBaVWRoYldVb1kyOXVabWxuT2lCSFlXMWxRMjl1Wm1sbktTQjdYRzVjYmlBZ0lDQmpiMjV6ZENCN1hHNGdJQ0FnSUNBZ0lIUmhjbWRsZEVkaGJXVk1iMmRwWTBaeVlXMWxVbUYwWlN4Y2JpQWdJQ0FnSUNBZ2RYQmtZWFJsTEZ4dUlDQWdJQ0FnSUNCeVpXNWtaWElzWEc0Z0lDQWdmU0E5SUdOdmJtWnBaenRjYmx4dUlDQWdJR052Ym5OMElFMVRYMUJGVWw5VlVFUkJWRVVnUFNBeE1EQXdJQzhnZEdGeVoyVjBSMkZ0WlV4dloybGpSbkpoYldWU1lYUmxPMXh1WEc1Y2JpQWdJQ0J5WlhSMWNtNGdlMXh1SUNBZ0lDQWdJQ0J6ZEdGeWRDeGNiaUFnSUNCOU8xeHVYRzRnSUNBZ1puVnVZM1JwYjI0Z2MzUmhjblFvS1NCN1hHNGdJQ0FnSUNBZ0lHeGxkQ0J3Y21WMmFXOTFjMVJwYldVZ1BTQkVZWFJsTG01dmR5Z3BPMXh1SUNBZ0lDQWdJQ0JzWlhRZ2RHbHRaVUpsYUdsdVpGSmxZV3hYYjNKc1pDQTlJREE3WEc1Y2JpQWdJQ0FnSUNBZ2JtVjRkRlJwWTJzb0tUdGNibHh1SUNBZ0lDQWdJQ0JtZFc1amRHbHZiaUJ1WlhoMFZHbGpheWdwSUh0Y2JpQWdJQ0FnSUNBZ0lDQWdJSGRwYm1SdmR5NXlaWEYxWlhOMFFXNXBiV0YwYVc5dVJuSmhiV1VvYm1WNGRGUnBZMnNwTzF4dVhHNGdJQ0FnSUNBZ0lDQWdJQ0JqYjI1emRDQmpkWEp5Wlc1MFZHbHRaU0E5SUVSaGRHVXVibTkzS0NrN1hHNGdJQ0FnSUNBZ0lDQWdJQ0JqYjI1emRDQmxiR0Z3YzJWa1ZHbHRaU0E5SUdOMWNuSmxiblJVYVcxbElDMGdjSEpsZG1sdmRYTlVhVzFsTzF4dUlDQWdJQ0FnSUNBZ0lDQWdkR2x0WlVKbGFHbHVaRkpsWVd4WGIzSnNaQ0FyUFNCbGJHRndjMlZrVkdsdFpUdGNibHh1SUNBZ0lDQWdJQ0FnSUNBZ0x5OGdWRTlFVHpvZ2NISnZZMlZ6Y3lCcGJuQjFkRnh1WEc0Z0lDQWdJQ0FnSUNBZ0lDQXZMeUJHYVhobFpDQkhZVzFsSUV4dloybGpJSFJwYldWemRHVndJQzBnVkU5RVR6b2dZbUZwYkNCaFpuUmxjaUJ1ZFcwZ2FYUmxjbUYwYVc5dWMxeHVJQ0FnSUNBZ0lDQWdJQ0FnZDJocGJHVWdLSFJwYldWQ1pXaHBibVJTWldGc1YyOXliR1FnUGowZ1RWTmZVRVZTWDFWUVJFRlVSU2tnZTF4dUlDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUhWd1pHRjBaU2dwTzF4dUlDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUhScGJXVkNaV2hwYm1SU1pXRnNWMjl5YkdRZ0xUMGdUVk5mVUVWU1gxVlFSRUZVUlR0Y2JpQWdJQ0FnSUNBZ0lDQWdJSDFjYmx4dUlDQWdJQ0FnSUNBZ0lDQWdZMjl1YzNRZ1pHbHpkR0Z1WTJWQ1pYUjNaV1Z1UjJGdFpVeHZaMmxqUm5KaGJXVnpJRDBnZEdsdFpVSmxhR2x1WkZKbFlXeFhiM0pzWkNBdklFMVRYMUJGVWw5VlVFUkJWRVU3WEc1Y2JpQWdJQ0FnSUNBZ0lDQWdJQzh2SUZaaGNtbGhZbXhsSUhKbGJtUmxjaUIwYVcxbGMzUmxjRnh1SUNBZ0lDQWdJQ0FnSUNBZ2NtVnVaR1Z5S0dScGMzUmhibU5sUW1WMGQyVmxia2RoYldWTWIyZHBZMFp5WVcxbGN5azdYRzRnSUNBZ0lDQWdJQ0FnSUNCd2NtVjJhVzkxYzFScGJXVWdQU0JqZFhKeVpXNTBWR2x0WlR0Y2JpQWdJQ0FnSUNBZ2ZWeHVJQ0FnSUgxY2JseHVmVnh1SWwxOSJdLCJzb3VyY2VSb290IjoiIn0=