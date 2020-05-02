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
    const { targetGameLogicFrameRate, onStart, update, render, } = config;
    const MS_PER_UPDATE = 1000 / targetGameLogicFrameRate;
    return {
        start,
    };
    function start() {
        let previousTime = Date.now();
        let timeBehindRealWorld = 0;
        onStart();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFPQSx1Q0FBdUM7QUFFdkMsT0FBTztBQUNQLHNEQUFzRDtBQUN0RCw2Q0FBNkM7QUFDN0MsT0FBTztBQUVQLHlCQUF5QjtBQUN6Qiw2REFBNkQ7QUFDN0QsNENBQTRDO0FBRTVDLGtCQUFlLFVBQVUsQ0FBQztBQUUxQixTQUFTLFVBQVUsQ0FBQyxNQUFrQjtJQUVsQyxNQUFNLEVBQ0Ysd0JBQXdCLEVBQ3hCLE9BQU8sRUFDUCxNQUFNLEVBQ04sTUFBTSxHQUNULEdBQUcsTUFBTSxDQUFDO0lBRVgsTUFBTSxhQUFhLEdBQUcsSUFBSSxHQUFHLHdCQUF3QixDQUFDO0lBR3RELE9BQU87UUFDSCxLQUFLO0tBQ1IsQ0FBQztJQUVGLFNBQVMsS0FBSztRQUNWLElBQUksWUFBWSxHQUFHLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQztRQUM5QixJQUFJLG1CQUFtQixHQUFHLENBQUMsQ0FBQztRQUU1QixPQUFPLEVBQUUsQ0FBQztRQUNWLFFBQVEsRUFBRSxDQUFDO1FBRVgsU0FBUyxRQUFRO1lBQ2IsTUFBTSxDQUFDLHFCQUFxQixDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBRXZDLE1BQU0sV0FBVyxHQUFHLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQztZQUMvQixNQUFNLFdBQVcsR0FBRyxXQUFXLEdBQUcsWUFBWSxDQUFDO1lBQy9DLG1CQUFtQixJQUFJLFdBQVcsQ0FBQztZQUVuQyxzQkFBc0I7WUFFdEIsOERBQThEO1lBQzlELE9BQU8sbUJBQW1CLElBQUksYUFBYSxFQUFFO2dCQUN6QyxNQUFNLEVBQUUsQ0FBQztnQkFDVCxtQkFBbUIsSUFBSSxhQUFhLENBQUM7YUFDeEM7WUFFRCxNQUFNLDhCQUE4QixHQUFHLG1CQUFtQixHQUFHLGFBQWEsQ0FBQztZQUUzRSwyQkFBMkI7WUFDM0IsTUFBTSxDQUFDLDhCQUE4QixDQUFDLENBQUM7WUFDdkMsWUFBWSxHQUFHLFdBQVcsQ0FBQztRQUMvQixDQUFDO0lBQ0wsQ0FBQztBQUVMLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbnRlcmZhY2UgR2FtZUNvbmZpZyB7XG4gICAgdGFyZ2V0R2FtZUxvZ2ljRnJhbWVSYXRlOiBudW1iZXI7XG4gICAgb25TdGFydDogKCkgPT4gYW55O1xuICAgIHVwZGF0ZTogKCkgPT4gYW55O1xuICAgIHJlbmRlcjogKGRpc3RhbmNlQmV0d2VlbkdhbWVMb2dpY0ZyYW1lczogbnVtYmVyKSA9PiBhbnk7XG59XG5cbi8vIFRPRE86IEV4dHJhY3QgcGl4aSB0byBhIHBsdWdpbiAoU09DKVxuXG4vLyBQSVhJXG4vLyBjb25zdCByZW5kZXJPYmplY3RDb250YWluZXIgPSBuZXcgUElYSS5Db250YWluZXIoKTtcbi8vIGFwcC5zdGFnZS5hZGRDaGlsZChyZW5kZXJPYmplY3RDb250YWluZXIpO1xuLy8gUElYSVxuXG4vLyBUT0RPOiBTdGFnZSwgY29udGFpbmVyXG4vLyBodHRwczovL2dpdGh1Yi5jb20vQ29kZXIyMDEyL3BpeGkvdHJlZS9tYXN0ZXIvc3BhY2VzaG9vdGVyXG4vLyBodHRwczovL2NvZGVwZW4uaW8vY2Vsc293aGl0ZS9wZW4vWFdiRXpweFxuXG5leHBvcnQgZGVmYXVsdCBjcmVhdGVHYW1lO1xuXG5mdW5jdGlvbiBjcmVhdGVHYW1lKGNvbmZpZzogR2FtZUNvbmZpZykge1xuXG4gICAgY29uc3Qge1xuICAgICAgICB0YXJnZXRHYW1lTG9naWNGcmFtZVJhdGUsXG4gICAgICAgIG9uU3RhcnQsXG4gICAgICAgIHVwZGF0ZSxcbiAgICAgICAgcmVuZGVyLFxuICAgIH0gPSBjb25maWc7XG5cbiAgICBjb25zdCBNU19QRVJfVVBEQVRFID0gMTAwMCAvIHRhcmdldEdhbWVMb2dpY0ZyYW1lUmF0ZTtcblxuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgc3RhcnQsXG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIHN0YXJ0KCkge1xuICAgICAgICBsZXQgcHJldmlvdXNUaW1lID0gRGF0ZS5ub3coKTtcbiAgICAgICAgbGV0IHRpbWVCZWhpbmRSZWFsV29ybGQgPSAwO1xuXG4gICAgICAgIG9uU3RhcnQoKTtcbiAgICAgICAgbmV4dFRpY2soKTtcblxuICAgICAgICBmdW5jdGlvbiBuZXh0VGljaygpIHtcbiAgICAgICAgICAgIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUobmV4dFRpY2spO1xuXG4gICAgICAgICAgICBjb25zdCBjdXJyZW50VGltZSA9IERhdGUubm93KCk7XG4gICAgICAgICAgICBjb25zdCBlbGFwc2VkVGltZSA9IGN1cnJlbnRUaW1lIC0gcHJldmlvdXNUaW1lO1xuICAgICAgICAgICAgdGltZUJlaGluZFJlYWxXb3JsZCArPSBlbGFwc2VkVGltZTtcblxuICAgICAgICAgICAgLy8gVE9ETzogcHJvY2VzcyBpbnB1dFxuXG4gICAgICAgICAgICAvLyBGaXhlZCBHYW1lIExvZ2ljIHRpbWVzdGVwIC0gVE9ETzogYmFpbCBhZnRlciBudW0gaXRlcmF0aW9uc1xuICAgICAgICAgICAgd2hpbGUgKHRpbWVCZWhpbmRSZWFsV29ybGQgPj0gTVNfUEVSX1VQREFURSkge1xuICAgICAgICAgICAgICAgIHVwZGF0ZSgpO1xuICAgICAgICAgICAgICAgIHRpbWVCZWhpbmRSZWFsV29ybGQgLT0gTVNfUEVSX1VQREFURTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY29uc3QgZGlzdGFuY2VCZXR3ZWVuR2FtZUxvZ2ljRnJhbWVzID0gdGltZUJlaGluZFJlYWxXb3JsZCAvIE1TX1BFUl9VUERBVEU7XG5cbiAgICAgICAgICAgIC8vIFZhcmlhYmxlIHJlbmRlciB0aW1lc3RlcFxuICAgICAgICAgICAgcmVuZGVyKGRpc3RhbmNlQmV0d2VlbkdhbWVMb2dpY0ZyYW1lcyk7XG4gICAgICAgICAgICBwcmV2aW91c1RpbWUgPSBjdXJyZW50VGltZTtcbiAgICAgICAgfVxuICAgIH1cblxufVxuIl19

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7UUFBQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTs7O1FBR0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDBDQUEwQyxnQ0FBZ0M7UUFDMUU7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSx3REFBd0Qsa0JBQWtCO1FBQzFFO1FBQ0EsaURBQWlELGNBQWM7UUFDL0Q7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLHlDQUF5QyxpQ0FBaUM7UUFDMUUsZ0hBQWdILG1CQUFtQixFQUFFO1FBQ3JJO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMkJBQTJCLDBCQUEwQixFQUFFO1FBQ3ZELGlDQUFpQyxlQUFlO1FBQ2hEO1FBQ0E7UUFDQTs7UUFFQTtRQUNBLHNEQUFzRCwrREFBK0Q7O1FBRXJIO1FBQ0E7OztRQUdBO1FBQ0E7Ozs7Ozs7Ozs7Ozs7QUNsRmE7QUFDYiw4Q0FBOEMsY0FBYztBQUM1RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcscURBQXFEO0FBQ2hFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJDQUEyQywrL0ciLCJmaWxlIjoiZ2FtZUVuZ2luZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL2luZGV4LnRzXCIpO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxuLy8gVE9ETzogRXh0cmFjdCBwaXhpIHRvIGEgcGx1Z2luIChTT0MpXHJcbi8vIFBJWElcclxuLy8gY29uc3QgcmVuZGVyT2JqZWN0Q29udGFpbmVyID0gbmV3IFBJWEkuQ29udGFpbmVyKCk7XHJcbi8vIGFwcC5zdGFnZS5hZGRDaGlsZChyZW5kZXJPYmplY3RDb250YWluZXIpO1xyXG4vLyBQSVhJXHJcbi8vIFRPRE86IFN0YWdlLCBjb250YWluZXJcclxuLy8gaHR0cHM6Ly9naXRodWIuY29tL0NvZGVyMjAxMi9waXhpL3RyZWUvbWFzdGVyL3NwYWNlc2hvb3RlclxyXG4vLyBodHRwczovL2NvZGVwZW4uaW8vY2Vsc293aGl0ZS9wZW4vWFdiRXpweFxyXG5leHBvcnRzLmRlZmF1bHQgPSBjcmVhdGVHYW1lO1xyXG5mdW5jdGlvbiBjcmVhdGVHYW1lKGNvbmZpZykge1xyXG4gICAgY29uc3QgeyB0YXJnZXRHYW1lTG9naWNGcmFtZVJhdGUsIG9uU3RhcnQsIHVwZGF0ZSwgcmVuZGVyLCB9ID0gY29uZmlnO1xyXG4gICAgY29uc3QgTVNfUEVSX1VQREFURSA9IDEwMDAgLyB0YXJnZXRHYW1lTG9naWNGcmFtZVJhdGU7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIHN0YXJ0LFxyXG4gICAgfTtcclxuICAgIGZ1bmN0aW9uIHN0YXJ0KCkge1xyXG4gICAgICAgIGxldCBwcmV2aW91c1RpbWUgPSBEYXRlLm5vdygpO1xyXG4gICAgICAgIGxldCB0aW1lQmVoaW5kUmVhbFdvcmxkID0gMDtcclxuICAgICAgICBvblN0YXJ0KCk7XHJcbiAgICAgICAgbmV4dFRpY2soKTtcclxuICAgICAgICBmdW5jdGlvbiBuZXh0VGljaygpIHtcclxuICAgICAgICAgICAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZShuZXh0VGljayk7XHJcbiAgICAgICAgICAgIGNvbnN0IGN1cnJlbnRUaW1lID0gRGF0ZS5ub3coKTtcclxuICAgICAgICAgICAgY29uc3QgZWxhcHNlZFRpbWUgPSBjdXJyZW50VGltZSAtIHByZXZpb3VzVGltZTtcclxuICAgICAgICAgICAgdGltZUJlaGluZFJlYWxXb3JsZCArPSBlbGFwc2VkVGltZTtcclxuICAgICAgICAgICAgLy8gVE9ETzogcHJvY2VzcyBpbnB1dFxyXG4gICAgICAgICAgICAvLyBGaXhlZCBHYW1lIExvZ2ljIHRpbWVzdGVwIC0gVE9ETzogYmFpbCBhZnRlciBudW0gaXRlcmF0aW9uc1xyXG4gICAgICAgICAgICB3aGlsZSAodGltZUJlaGluZFJlYWxXb3JsZCA+PSBNU19QRVJfVVBEQVRFKSB7XHJcbiAgICAgICAgICAgICAgICB1cGRhdGUoKTtcclxuICAgICAgICAgICAgICAgIHRpbWVCZWhpbmRSZWFsV29ybGQgLT0gTVNfUEVSX1VQREFURTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjb25zdCBkaXN0YW5jZUJldHdlZW5HYW1lTG9naWNGcmFtZXMgPSB0aW1lQmVoaW5kUmVhbFdvcmxkIC8gTVNfUEVSX1VQREFURTtcclxuICAgICAgICAgICAgLy8gVmFyaWFibGUgcmVuZGVyIHRpbWVzdGVwXHJcbiAgICAgICAgICAgIHJlbmRlcihkaXN0YW5jZUJldHdlZW5HYW1lTG9naWNGcmFtZXMpO1xyXG4gICAgICAgICAgICBwcmV2aW91c1RpbWUgPSBjdXJyZW50VGltZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxleUoyWlhKemFXOXVJam96TENKbWFXeGxJam9pYVc1a1pYZ3Vhbk1pTENKemIzVnlZMlZTYjI5MElqb2lJaXdpYzI5MWNtTmxjeUk2V3lJdUxpOHVMaTl6Y21NdmFXNWtaWGd1ZEhNaVhTd2libUZ0WlhNaU9sdGRMQ0p0WVhCd2FXNW5jeUk2SWpzN1FVRlBRU3gxUTBGQmRVTTdRVUZGZGtNc1QwRkJUenRCUVVOUUxITkVRVUZ6UkR0QlFVTjBSQ3cyUTBGQk5rTTdRVUZETjBNc1QwRkJUenRCUVVWUUxIbENRVUY1UWp0QlFVTjZRaXcyUkVGQk5rUTdRVUZETjBRc05FTkJRVFJETzBGQlJUVkRMR3RDUVVGbExGVkJRVlVzUTBGQlF6dEJRVVV4UWl4VFFVRlRMRlZCUVZVc1EwRkJReXhOUVVGclFqdEpRVVZzUXl4TlFVRk5MRVZCUTBZc2QwSkJRWGRDTEVWQlEzaENMRTlCUVU4c1JVRkRVQ3hOUVVGTkxFVkJRMDRzVFVGQlRTeEhRVU5VTEVkQlFVY3NUVUZCVFN4RFFVRkRPMGxCUlZnc1RVRkJUU3hoUVVGaExFZEJRVWNzU1VGQlNTeEhRVUZITEhkQ1FVRjNRaXhEUVVGRE8wbEJSM1JFTEU5QlFVODdVVUZEU0N4TFFVRkxPMHRCUTFJc1EwRkJRenRKUVVWR0xGTkJRVk1zUzBGQlN6dFJRVU5XTEVsQlFVa3NXVUZCV1N4SFFVRkhMRWxCUVVrc1EwRkJReXhIUVVGSExFVkJRVVVzUTBGQlF6dFJRVU01UWl4SlFVRkpMRzFDUVVGdFFpeEhRVUZITEVOQlFVTXNRMEZCUXp0UlFVVTFRaXhQUVVGUExFVkJRVVVzUTBGQlF6dFJRVU5XTEZGQlFWRXNSVUZCUlN4RFFVRkRPMUZCUlZnc1UwRkJVeXhSUVVGUk8xbEJRMklzVFVGQlRTeERRVUZETEhGQ1FVRnhRaXhEUVVGRExGRkJRVkVzUTBGQlF5eERRVUZETzFsQlJYWkRMRTFCUVUwc1YwRkJWeXhIUVVGSExFbEJRVWtzUTBGQlF5eEhRVUZITEVWQlFVVXNRMEZCUXp0WlFVTXZRaXhOUVVGTkxGZEJRVmNzUjBGQlJ5eFhRVUZYTEVkQlFVY3NXVUZCV1N4RFFVRkRPMWxCUXk5RExHMUNRVUZ0UWl4SlFVRkpMRmRCUVZjc1EwRkJRenRaUVVWdVF5eHpRa0ZCYzBJN1dVRkZkRUlzT0VSQlFUaEVPMWxCUXpsRUxFOUJRVThzYlVKQlFXMUNMRWxCUVVrc1lVRkJZU3hGUVVGRk8yZENRVU42UXl4TlFVRk5MRVZCUVVVc1EwRkJRenRuUWtGRFZDeHRRa0ZCYlVJc1NVRkJTU3hoUVVGaExFTkJRVU03WVVGRGVFTTdXVUZGUkN4TlFVRk5MRGhDUVVFNFFpeEhRVUZITEcxQ1FVRnRRaXhIUVVGSExHRkJRV0VzUTBGQlF6dFpRVVV6UlN3eVFrRkJNa0k3V1VGRE0wSXNUVUZCVFN4RFFVRkRMRGhDUVVFNFFpeERRVUZETEVOQlFVTTdXVUZEZGtNc1dVRkJXU3hIUVVGSExGZEJRVmNzUTBGQlF6dFJRVU12UWl4RFFVRkRPMGxCUTB3c1EwRkJRenRCUVVWTUxFTkJRVU1pTENKemIzVnlZMlZ6UTI5dWRHVnVkQ0k2V3lKcGJuUmxjbVpoWTJVZ1IyRnRaVU52Ym1acFp5QjdYRzRnSUNBZ2RHRnlaMlYwUjJGdFpVeHZaMmxqUm5KaGJXVlNZWFJsT2lCdWRXMWlaWEk3WEc0Z0lDQWdiMjVUZEdGeWREb2dLQ2tnUFQ0Z1lXNTVPMXh1SUNBZ0lIVndaR0YwWlRvZ0tDa2dQVDRnWVc1NU8xeHVJQ0FnSUhKbGJtUmxjam9nS0dScGMzUmhibU5sUW1WMGQyVmxia2RoYldWTWIyZHBZMFp5WVcxbGN6b2diblZ0WW1WeUtTQTlQaUJoYm5rN1hHNTlYRzVjYmk4dklGUlBSRTg2SUVWNGRISmhZM1FnY0dsNGFTQjBieUJoSUhCc2RXZHBiaUFvVTA5REtWeHVYRzR2THlCUVNWaEpYRzR2THlCamIyNXpkQ0J5Wlc1a1pYSlBZbXBsWTNSRGIyNTBZV2x1WlhJZ1BTQnVaWGNnVUVsWVNTNURiMjUwWVdsdVpYSW9LVHRjYmk4dklHRndjQzV6ZEdGblpTNWhaR1JEYUdsc1pDaHlaVzVrWlhKUFltcGxZM1JEYjI1MFlXbHVaWElwTzF4dUx5OGdVRWxZU1Z4dVhHNHZMeUJVVDBSUE9pQlRkR0ZuWlN3Z1kyOXVkR0ZwYm1WeVhHNHZMeUJvZEhSd2N6b3ZMMmRwZEdoMVlpNWpiMjB2UTI5a1pYSXlNREV5TDNCcGVHa3ZkSEpsWlM5dFlYTjBaWEl2YzNCaFkyVnphRzl2ZEdWeVhHNHZMeUJvZEhSd2N6b3ZMMk52WkdWd1pXNHVhVzh2WTJWc2MyOTNhR2wwWlM5d1pXNHZXRmRpUlhwd2VGeHVYRzVsZUhCdmNuUWdaR1ZtWVhWc2RDQmpjbVZoZEdWSFlXMWxPMXh1WEc1bWRXNWpkR2x2YmlCamNtVmhkR1ZIWVcxbEtHTnZibVpwWnpvZ1IyRnRaVU52Ym1acFp5a2dlMXh1WEc0Z0lDQWdZMjl1YzNRZ2UxeHVJQ0FnSUNBZ0lDQjBZWEpuWlhSSFlXMWxURzluYVdOR2NtRnRaVkpoZEdVc1hHNGdJQ0FnSUNBZ0lHOXVVM1JoY25Rc1hHNGdJQ0FnSUNBZ0lIVndaR0YwWlN4Y2JpQWdJQ0FnSUNBZ2NtVnVaR1Z5TEZ4dUlDQWdJSDBnUFNCamIyNW1hV2M3WEc1Y2JpQWdJQ0JqYjI1emRDQk5VMTlRUlZKZlZWQkVRVlJGSUQwZ01UQXdNQ0F2SUhSaGNtZGxkRWRoYldWTWIyZHBZMFp5WVcxbFVtRjBaVHRjYmx4dVhHNGdJQ0FnY21WMGRYSnVJSHRjYmlBZ0lDQWdJQ0FnYzNSaGNuUXNYRzRnSUNBZ2ZUdGNibHh1SUNBZ0lHWjFibU4wYVc5dUlITjBZWEowS0NrZ2UxeHVJQ0FnSUNBZ0lDQnNaWFFnY0hKbGRtbHZkWE5VYVcxbElEMGdSR0YwWlM1dWIzY29LVHRjYmlBZ0lDQWdJQ0FnYkdWMElIUnBiV1ZDWldocGJtUlNaV0ZzVjI5eWJHUWdQU0F3TzF4dVhHNGdJQ0FnSUNBZ0lHOXVVM1JoY25Rb0tUdGNiaUFnSUNBZ0lDQWdibVY0ZEZScFkyc29LVHRjYmx4dUlDQWdJQ0FnSUNCbWRXNWpkR2x2YmlCdVpYaDBWR2xqYXlncElIdGNiaUFnSUNBZ0lDQWdJQ0FnSUhkcGJtUnZkeTV5WlhGMVpYTjBRVzVwYldGMGFXOXVSbkpoYldVb2JtVjRkRlJwWTJzcE8xeHVYRzRnSUNBZ0lDQWdJQ0FnSUNCamIyNXpkQ0JqZFhKeVpXNTBWR2x0WlNBOUlFUmhkR1V1Ym05M0tDazdYRzRnSUNBZ0lDQWdJQ0FnSUNCamIyNXpkQ0JsYkdGd2MyVmtWR2x0WlNBOUlHTjFjbkpsYm5SVWFXMWxJQzBnY0hKbGRtbHZkWE5VYVcxbE8xeHVJQ0FnSUNBZ0lDQWdJQ0FnZEdsdFpVSmxhR2x1WkZKbFlXeFhiM0pzWkNBclBTQmxiR0Z3YzJWa1ZHbHRaVHRjYmx4dUlDQWdJQ0FnSUNBZ0lDQWdMeThnVkU5RVR6b2djSEp2WTJWemN5QnBibkIxZEZ4dVhHNGdJQ0FnSUNBZ0lDQWdJQ0F2THlCR2FYaGxaQ0JIWVcxbElFeHZaMmxqSUhScGJXVnpkR1Z3SUMwZ1ZFOUVUem9nWW1GcGJDQmhablJsY2lCdWRXMGdhWFJsY21GMGFXOXVjMXh1SUNBZ0lDQWdJQ0FnSUNBZ2QyaHBiR1VnS0hScGJXVkNaV2hwYm1SU1pXRnNWMjl5YkdRZ1BqMGdUVk5mVUVWU1gxVlFSRUZVUlNrZ2UxeHVJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lIVndaR0YwWlNncE8xeHVJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lIUnBiV1ZDWldocGJtUlNaV0ZzVjI5eWJHUWdMVDBnVFZOZlVFVlNYMVZRUkVGVVJUdGNiaUFnSUNBZ0lDQWdJQ0FnSUgxY2JseHVJQ0FnSUNBZ0lDQWdJQ0FnWTI5dWMzUWdaR2x6ZEdGdVkyVkNaWFIzWldWdVIyRnRaVXh2WjJsalJuSmhiV1Z6SUQwZ2RHbHRaVUpsYUdsdVpGSmxZV3hYYjNKc1pDQXZJRTFUWDFCRlVsOVZVRVJCVkVVN1hHNWNiaUFnSUNBZ0lDQWdJQ0FnSUM4dklGWmhjbWxoWW14bElISmxibVJsY2lCMGFXMWxjM1JsY0Z4dUlDQWdJQ0FnSUNBZ0lDQWdjbVZ1WkdWeUtHUnBjM1JoYm1ObFFtVjBkMlZsYmtkaGJXVk1iMmRwWTBaeVlXMWxjeWs3WEc0Z0lDQWdJQ0FnSUNBZ0lDQndjbVYyYVc5MWMxUnBiV1VnUFNCamRYSnlaVzUwVkdsdFpUdGNiaUFnSUNBZ0lDQWdmVnh1SUNBZ0lIMWNibHh1ZlZ4dUlsMTkiXSwic291cmNlUm9vdCI6IiJ9