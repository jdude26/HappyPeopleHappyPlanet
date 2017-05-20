// JavaScript Document
"use strict";
"object" != typeof window.CP && (window.CP = {}), window.CP.PenTimer = {
	programNoLongerBeingMonitored: !1,
	timeOfFirstCallToShouldStopLoop: 0,
	_loopExits: {},
	_loopTimers: {},
	START_MONITORING_AFTER: 2e3,
	STOP_ALL_MONITORING_TIMEOUT: 5e3,
	MAX_TIME_IN_LOOP_WO_EXIT: 2200,
	exitedLoop: function (o) {
		this._loopExits[o] = !0
	},
	shouldStopLoop: function (o) {
		if (this.programKilledSoStopMonitoring) return !0;
		if (this.programNoLongerBeingMonitored) return !1;
		if (this._loopExits[o]) return !1;
		var t = this._getTime();
		if (0 === this.timeOfFirstCallToShouldStopLoop) return this.timeOfFirstCallToShouldStopLoop = t, !1;
		var i = t - this.timeOfFirstCallToShouldStopLoop;
		if (i < this.START_MONITORING_AFTER) return !1;
		if (i > this.STOP_ALL_MONITORING_TIMEOUT) return this.programNoLongerBeingMonitored = !0, !1;
		try {
			this._checkOnInfiniteLoop(o, t)
		} catch (o) {
			return this._sendErrorMessageToEditor(), this.programKilledSoStopMonitoring = !0, !0
		}
		return !1
	},
	_sendErrorMessageToEditor: function () {
		try {
			if (this._shouldPostMessage()) {
				var o = {
					action: "infinite-loop",
					line: this._findAroundLineNumber()
				};
				parent.postMessage(JSON.stringify(o), "*")
			} else this._throwAnErrorToStopPen()
		} catch (o) {
			this._throwAnErrorToStopPen()
		}
	},
	_shouldPostMessage: function () {
		return document.location.href.match(/boomerang/)
	},
	_throwAnErrorToStopPen: function () {
		throw "We found an infinite loop in your Pen. We've stopped the Pen from running. Please correct it or contact support@codepen.io."
	},
	_findAroundLineNumber: function () {
		var o = new Error,
			t = 0;
		if (o.stack) {
			var i = o.stack.match(/boomerang\S+:(\d+):\d+/);
			i && (t = i[1])
		}
		return t
	},
	_checkOnInfiniteLoop: function (o, t) {
		if (!this._loopTimers[o]) return this._loopTimers[o] = t, !1;
		var i = t - this._loopTimers[o];
		if (i > this.MAX_TIME_IN_LOOP_WO_EXIT) throw "Infinite Loop found on loop: " + o
	},
	_getTime: function () {
		return +new Date
	}
}, window.CP.shouldStopExecution = function (o) {
	var t = window.CP.PenTimer.shouldStopLoop(o);
	return t === !0 && console.warn("[CodePen]: An infinite loop (or a loop taking too long) was detected, so we stopped its execution. Sorry!"), t
}, window.CP.exitedLoop = function (o) {
	window.CP.PenTimer.exitedLoop(o)
};
(function () {
	window.addEventListener('scroll', function (event) {
		var depth, i, layer, layers, len, movement, topDistance, translate3d;
		topDistance = this.pageYOffset;
		layers = document.querySelectorAll("[data-type='parallax']");
		for (i = 0, len = layers.length; i < len; i++) {
			if (window.CP.shouldStopExecution(1)) {
				break;
			}
			layer = layers[i];
			depth = layer.getAttribute('data-depth');
			movement = -(topDistance * depth);
			translate3d = 'translate3d(0, ' + movement + 'px, 0)';
			layer.style['-webkit-transform'] = translate3d;
			layer.style['-moz-transform'] = translate3d;
			layer.style['-ms-transform'] = translate3d;
			layer.style['-o-transform'] = translate3d;
			layer.style.transform = translate3d;
		}
		window.CP.exitedLoop(1);

	});

}).call(this);

	$(window).on("load",(function() {
		// Animate loader off screen
		
		$(".se-pre-con").fadeOut("slow");
	}));

//# sourceURL=pen.js
