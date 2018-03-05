!function(e){function t(i){if(n[i])return n[i].exports;var o=n[i]={i:i,l:!1,exports:{}};return e[i].call(o.exports,o,o.exports,t),o.l=!0,o.exports}var n={};t.m=e,t.c=n,t.d=function(e,n,i){t.o(e,n)||Object.defineProperty(e,n,{configurable:!1,enumerable:!0,get:i})},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="",t(t.s=3)}([function(e,t,n){"use strict"},function(e,t,n){"use strict";function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0}),t.Canvas=void 0;var o=function(){function e(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(t,n,i){return n&&e(t.prototype,n),i&&e(t,i),t}}();n(0);t.Canvas=function(){function e(t,n,o){i(this,e),this.canvas=t,this.canvasSize=n,this.cellSize=o,this.context=t.getContext("2d"),this.scaleCanvas()}return o(e,[{key:"drawBackground",value:function(){this.context.fillStyle="black",this.context.fillRect(0,0,this.canvasSize,this.canvasSize)}},{key:"isOutOfBounds",value:function(e){var t=e.x,n=e.y,i=this.canvasSize,o=this.cellSize;return t<0||n<0||t>=i/o||n>=i/o}},{key:"paintCell",value:function(e,t){var n=t.x,i=t.y,o=this.cellSize,r=this.context;r.fillStyle=e,r.strokeStyle=e,r.fillRect(n*o,i*o,o,o),r.strokeRect(n*o,i*o,o,o)}},{key:"randomPoint",value:function(){var e=this.canvasSize,t=this.cellSize;return{x:Math.round(Math.random()*(e-t)/t),y:Math.round(Math.random()*(e-t)/t)}}},{key:"scaleCanvas",value:function(){var e=this.canvas,t=this.context,n=this.canvasSize,i=window.devicePixelRatio||1,o=t.webkitBackingStorePixelRatio||t.mozBackingStorePixelRatio||t.msBackingStorePixelRatio||t.oBackingStorePixelRatio||t.backingStorePixelRatio||1,r=i/o;i!==o?(e.width=n*r,e.height=n*r,e.style.width=n+"px",e.style.height=n+"px"):(e.width=n,e.height=n,e.style.width="",e.style.height=""),t.scale(r,r)}}]),e}()},function(e,t,n){"use strict";function i(e){if(null==e)throw new Error("Argument was null");return e}function o(e){for(var t=Array(e),n=0;n<e;++n)t[n]=n;return t}function r(e,t,n){return e*(1-n)+t*n}Object.defineProperty(t,"__esModule",{value:!0}),t.nullThrows=i,t.seq=o,t.interp=r},function(e,t,n){"use strict";n(0);var i=n(1),o=n(4),r=n(2),a=(0,r.nullThrows)(document.body),s=a.clientHeight,u=a.clientWidth,c=Math.round(.75*Math.min(s,u)),h=Math.round(c/25),l=Math.ceil(c/h+1)*h,d=new i.Canvas(document.getElementById("canvas"),l,h),f=new o.Game(d);document.addEventListener("keydown",f.onEvent),(0,r.nullThrows)(document.getElementById("left")).addEventListener("click",function(){return f.queueMove("left")}),(0,r.nullThrows)(document.getElementById("right")).addEventListener("click",function(){return f.queueMove("right")}),(0,r.nullThrows)(document.getElementById("up")).addEventListener("click",function(){return f.queueMove("up")}),(0,r.nullThrows)(document.getElementById("down")).addEventListener("click",function(){return f.queueMove("down")})},function(e,t,n){"use strict";function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function o(e){switch(e){case 37:return"left";case 38:return"up";case 39:return"right";case 40:return"down";default:return null}}Object.defineProperty(t,"__esModule",{value:!0}),t.Game=void 0;var r=function(){function e(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(t,n,i){return n&&e(t.prototype,n),i&&e(t,i),t}}();n(0);var a=n(2),s=n(5),u=n(6);n(1),t.Game=function(){function e(t){var n=this;i(this,e),this.steps=6,this.stepSize=1,this.t=0,this.onEvent=function(e){if(n.gameOver)return void n.startNewGame();if(e instanceof KeyboardEvent&&!e.repeat){var t=o(e.keyCode);t&&n.queueMove(t)}},this.canvas=t,this.highScore=parseInt(localStorage.getItem("highScore"))||0,this.highScoreElement=(0,a.nullThrows)(document.getElementById("high-score")),this.scoreElement=(0,a.nullThrows)(document.getElementById("score")),this.highScoreElement.innerHTML=""+this.highScore,this.startNewGame()}return r(e,[{key:"draw",value:function(){this.canvas.drawBackground(),this.food.draw(this.canvas),this.snake.draw(this.canvas)}},{key:"getNextFoodPos",value:function(){var e=this.canvas.randomPoint(),t=!0,n=!1,i=void 0;try{for(var o,r=this.snake.body[Symbol.iterator]();!(t=(o=r.next()).done);t=!0){var a=o.value;if(a.x===e.x&&a.y===e.y)return null}}catch(e){n=!0,i=e}finally{try{!t&&r.return&&r.return()}finally{if(n)throw i}}return e}},{key:"gameLoop",value:function(){var e=this;this.gameOver||(this.draw(),this.update(),requestAnimationFrame(function(){return e.gameLoop()}))}},{key:"queueMove",value:function(e){this.snake.queueMove(e)}},{key:"setScore",value:function(e){this.score=e,this.scoreElement.innerHTML=""+this.score,this.score>this.highScore&&(this.highScore=this.score,this.highScoreElement.innerHTML=""+this.highScore,localStorage.setItem("highScore",""+this.highScore))}},{key:"startNewGame",value:function(){var e=this;this.food=new s.Food(this.canvas.randomPoint()),this.gameOver=!1,this.setScore(0),this.snake=new u.Snake(this.canvas.canvasSize/this.canvas.cellSize),requestAnimationFrame(function(){return e.gameLoop()})}},{key:"update",value:function(){if(this.snake.update(this.t/this.steps),this.snake.isCollidingWithSelf())return void(this.gameOver=!0);var e=this.snake.body[0];if(e.x===this.food.x&&e.y===this.food.y){for(this.setScore(this.score+1);;){var t=this.getNextFoodPos();if(null!==t){this.food=new s.Food(t);break}}this.snake.grow()}this.t+=this.stepSize,this.t>this.steps&&(this.t=0)}}]),e}()},function(e,t,n){"use strict";function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0}),t.Food=void 0;var o=function(){function e(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(t,n,i){return n&&e(t.prototype,n),i&&e(t,i),t}}();n(0);n(1),t.Food=function(){function e(t){i(this,e),this.x=t.x,this.y=t.y}return o(e,[{key:"draw",value:function(e){e.paintCell("#fff",this)}}]),e}()},function(e,t,n){"use strict";function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0}),t.Segment=t.Snake=void 0;var o=function(){function e(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(t,n,i){return n&&e(t.prototype,n),i&&e(t,i),t}}();n(1);n(0);var r=n(2),a=(t.Snake=function(){function e(t){i(this,e),this.body=(0,r.seq)(5).reverse().map(function(e){return new a(e,0,"right")}),this.moveQueue=[],this.boardSize=t}return o(e,[{key:"draw",value:function(e){var t=!0,n=!1,i=void 0;try{for(var o,r=this.body[Symbol.iterator]();!(t=(o=r.next()).done);t=!0){var a=o.value;e.paintCell("#fff",a)}}catch(e){n=!0,i=e}finally{try{!t&&r.return&&r.return()}finally{if(n)throw i}}}},{key:"isCollidingWithSelf",value:function(){var e=this.body[0],t=!0,n=!1,i=void 0;try{for(var o,r=this.body.slice(1)[Symbol.iterator]();!(t=(o=r.next()).done);t=!0){var a=o.value;if(e.x===a.x&&e.y===a.y)return!0}}catch(e){n=!0,i=e}finally{try{!t&&r.return&&r.return()}finally{if(n)throw i}}return!1}},{key:"grow",value:function(){var e=this.body[this.body.length-1],t=e.direction,n=e.x,i=e.y;"right"===t?n-=1:"left"===t?n+=1:"up"===t?i+=1:"down"===t&&(i-=1),this.body.push(new a(n,i,t))}},{key:"update",value:function(e){if(0===e){for(var t=this.body.length-1;t>0;--t)this.body[t-1].didPivot&&(this.body[t].didPivot=!0,this.body[t].direction=this.body[t-1].direction,this.body[t-1].didPivot=!1),this.body[t].updatePosition=this.body[t].positionUpdater();this.moveQueue.length>0&&this.body[0].x<this.boardSize&&this.body[0].x>=0&&this.body[0].y<this.boardSize&&this.body[0].y>=0&&(this.body[0].direction=this.moveQueue.shift(),this.body[0].didPivot=!0),this.body[0].updatePosition=this.body[0].positionUpdater()}else{var n=!0,i=!1,o=void 0;try{for(var r,a=this.body[Symbol.iterator]();!(n=(r=a.next()).done);n=!0){var s=r.value;s.updatePosition(e),(s.x>this.boardSize+1||s.x<-1)&&(s.x=this.boardSize-s.x),(s.y>this.boardSize+1||s.y<-1)&&(s.y=this.boardSize-s.y)}}catch(e){i=!0,o=e}finally{try{!n&&a.return&&a.return()}finally{if(i)throw o}}}}},{key:"queueMove",value:function(t){if(!(this.moveQueue.length>=3)){var n=this.moveQueue.length>0?this.moveQueue[this.moveQueue.length-1]:this.body[0].direction;e.validMove(n,t)&&this.moveQueue.push(t)}}}],[{key:"validMove",value:function(e,t){return!("right"===e&&"left"===t||"left"===e&&"right"===t||"up"===e&&"down"===t||"down"===e&&"up"===t)}}]),e}(),t.Segment=function(){function e(t,n,o){i(this,e),this.x=t,this.y=n,this.didPivot=!1,this.direction=o,this.updatePosition=this.positionUpdater()}return o(e,[{key:"positionUpdater",value:function(){var e=this,t=this.x,n=this.y;switch(this.direction){case"left":return function(n){e.x=(0,r.interp)(t,t-1,n)};case"right":return function(n){e.x=(0,r.interp)(t,t+1,n)};case"up":return function(t){e.y=(0,r.interp)(n,n-1,t)};case"down":return function(t){e.y=(0,r.interp)(n,n+1,t)};default:throw new Error("Switch case should have been exhausted")}}}]),e}())}]);