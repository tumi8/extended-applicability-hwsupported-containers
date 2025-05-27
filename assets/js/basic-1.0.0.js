function removeParam(e, t) {
  "use strict";
  var i, s = t.split("?")[0], n = [], o = t.indexOf("?") !== -1 ? t.split("?")[1] : "";
  if ("" !== o) {
    n = o.split("&");
    for (var a = n.length - 1; a >= 0; a -= 1) i = n[a].split("=")[0], i === e && n.splice(a, 1);
    s = s + "?" + n.join("&")
  }
  return s
}

function changeRoyalSlidesToBackgroundImages() {
  $(".royal-slider-element").each(function () {
    var e = $(this).find(".js-royal-slider-element-img");
    if (e) {
      var t = $(this).find("img"), i = t.attr("src");
      e.css("background-image", "url(" + i + ")"), e.removeClass("js-royal-slider-element-img"), t.remove()
    }
  })
}

!function (e) {
  e.flexslider = function (t, i) {
    var s = e(t);
    s.vars = e.extend({}, e.flexslider.defaults, i);
    var n, o = s.vars.namespace, a = window.navigator && window.navigator.msPointerEnabled && window.MSGesture,
      r = ("ontouchstart" in window || a || window.DocumentTouch && document instanceof DocumentTouch) && s.vars.touch,
      l = "click touchend MSPointerUp keyup", c = "", d = "vertical" === s.vars.direction, u = s.vars.reverse,
      h = s.vars.itemWidth > 0, f = "fade" === s.vars.animation, p = "" !== s.vars.asNavFor, m = {}, _ = !0;
    e.data(t, "flexslider", s), m = {
      init: function () {
        s.animating = !1, s.currentSlide = parseInt(s.vars.startAt ? s.vars.startAt : 0, 10), isNaN(s.currentSlide) && (s.currentSlide = 0), s.animatingTo = s.currentSlide, s.atEnd = 0 === s.currentSlide || s.currentSlide === s.last, s.containerSelector = s.vars.selector.substr(0, s.vars.selector.search(" ")), s.slides = e(s.vars.selector, s), s.container = e(s.containerSelector, s), s.count = s.slides.length, s.syncExists = e(s.vars.sync).length > 0, "slide" === s.vars.animation && (s.vars.animation = "swing"), s.prop = d ? "top" : "marginLeft", s.args = {}, s.manualPause = !1, s.stopped = !1, s.started = !1, s.startTimeout = null, s.transitions = !s.vars.video && !f && s.vars.useCSS && function () {
          var e = document.createElement("div"),
            t = ["perspectiveProperty", "WebkitPerspective", "MozPerspective", "OPerspective", "msPerspective"];
          for (var i in t) if (void 0 !== e.style[t[i]]) return s.pfx = t[i].replace("Perspective", "").toLowerCase(), s.prop = "-" + s.pfx + "-transform", !0;
          return !1
        }(), s.ensureAnimationEnd = "", "" !== s.vars.controlsContainer && (s.controlsContainer = e(s.vars.controlsContainer).length > 0 && e(s.vars.controlsContainer)), "" !== s.vars.manualControls && (s.manualControls = e(s.vars.manualControls).length > 0 && e(s.vars.manualControls)), s.vars.randomize && (s.slides.sort(function () {
          return Math.round(Math.random()) - .5
        }), s.container.empty().append(s.slides)), s.doMath(), s.setup("init"), s.vars.controlNav && m.controlNav.setup(), s.vars.directionNav && m.directionNav.setup(), s.vars.keyboard && (1 === e(s.containerSelector).length || s.vars.multipleKeyboard) && e(document).bind("keyup", function (e) {
          var t = e.keyCode;
          if (!s.animating && (39 === t || 37 === t)) {
            var i = 39 === t ? s.getTarget("next") : 37 === t && s.getTarget("prev");
            s.flexAnimate(i, s.vars.pauseOnAction)
          }
        }), s.vars.mousewheel && s.bind("mousewheel", function (e, t, i, n) {
          e.preventDefault();
          var o = s.getTarget(0 > t ? "next" : "prev");
          s.flexAnimate(o, s.vars.pauseOnAction)
        }), s.vars.pausePlay && m.pausePlay.setup(), s.vars.slideshow && s.vars.pauseInvisible && m.pauseInvisible.init(), s.vars.slideshow && (s.vars.pauseOnHover && s.hover(function () {
          s.manualPlay || s.manualPause || s.pause()
        }, function () {
          s.manualPause || s.manualPlay || s.stopped || s.play()
        }), s.vars.pauseInvisible && m.pauseInvisible.isHidden() || (s.vars.initDelay > 0 ? s.startTimeout = setTimeout(s.play, s.vars.initDelay) : s.play())), p && m.asNav.setup(), r && s.vars.touch && m.touch(), (!f || f && s.vars.smoothHeight) && e(window).bind("resize orientationchange focus", m.resize), s.find("img").attr("draggable", "false"), setTimeout(function () {
          s.vars.start(s)
        }, 200)
      }, asNav: {
        setup: function () {
          s.asNav = !0, s.animatingTo = Math.floor(s.currentSlide / s.move), s.currentItem = s.currentSlide, s.slides.removeClass(o + "active-slide").eq(s.currentItem).addClass(o + "active-slide"), a ? (t._slider = s, s.slides.each(function () {
            var t = this;
            t._gesture = new MSGesture, t._gesture.target = t, t.addEventListener("MSPointerDown", function (e) {
              e.preventDefault(), e.currentTarget._gesture && e.currentTarget._gesture.addPointer(e.pointerId)
            }, !1), t.addEventListener("MSGestureTap", function (t) {
              t.preventDefault();
              var i = e(this), n = i.index();
              e(s.vars.asNavFor).data("flexslider").animating || i.hasClass("active") || (s.direction = s.currentItem < n ? "next" : "prev", s.flexAnimate(n, s.vars.pauseOnAction, !1, !0, !0))
            })
          })) : s.slides.on(l, function (t) {
            t.preventDefault();
            var i = e(this), n = i.index(), a = i.offset().left - e(s).scrollLeft();
            0 >= a && i.hasClass(o + "active-slide") ? s.flexAnimate(s.getTarget("prev"), !0) : e(s.vars.asNavFor).data("flexslider").animating || i.hasClass(o + "active-slide") || (s.direction = s.currentItem < n ? "next" : "prev", s.flexAnimate(n, s.vars.pauseOnAction, !1, !0, !0))
          })
        }
      }, controlNav: {
        setup: function () {
          s.manualControls ? m.controlNav.setupManual() : m.controlNav.setupPaging()
        }, setupPaging: function () {
          var t, i, n = "thumbnails" === s.vars.controlNav ? "control-thumbs" : "control-paging", a = 1;
          if (s.controlNavScaffold = e('<ol class="' + o + "control-nav " + o + n + '"></ol>'), s.pagingCount > 1) for (var r = 0; r < s.pagingCount; r++) {
            if (i = s.slides.eq(r), t = "thumbnails" === s.vars.controlNav ? '<img src="' + i.attr("data-thumb") + '"/>' : "<a>" + a + "</a>", "thumbnails" === s.vars.controlNav && !0 === s.vars.thumbCaptions) {
              var d = i.attr("data-thumbcaption");
              "" != d && void 0 != d && (t += '<span class="' + o + 'caption">' + d + "</span>")
            }
            s.controlNavScaffold.append("<li>" + t + "</li>"), a++
          }
          s.controlsContainer ? e(s.controlsContainer).append(s.controlNavScaffold) : s.append(s.controlNavScaffold), m.controlNav.set(), m.controlNav.active(), s.controlNavScaffold.delegate("a, img", l, function (t) {
            if (t.preventDefault(), "" === c || c === t.type) {
              var i = e(this), n = s.controlNav.index(i);
              i.hasClass(o + "active") || (s.direction = n > s.currentSlide ? "next" : "prev", s.flexAnimate(n, s.vars.pauseOnAction))
            }
            "" === c && (c = t.type), m.setToClearWatchedEvent()
          })
        }, setupManual: function () {
          s.controlNav = s.manualControls, m.controlNav.active(), s.controlNav.bind(l, function (t) {
            if (t.preventDefault(), "" === c || c === t.type) {
              var i = e(this), n = s.controlNav.index(i);
              i.hasClass(o + "active") || (s.direction = n > s.currentSlide ? "next" : "prev", s.flexAnimate(n, s.vars.pauseOnAction))
            }
            "" === c && (c = t.type), m.setToClearWatchedEvent()
          })
        }, set: function () {
          var t = "thumbnails" === s.vars.controlNav ? "img" : "a";
          s.controlNav = e("." + o + "control-nav li " + t, s.controlsContainer ? s.controlsContainer : s)
        }, active: function () {
          s.controlNav.removeClass(o + "active").eq(s.animatingTo).addClass(o + "active")
        }, update: function (t, i) {
          s.pagingCount > 1 && "add" === t ? s.controlNavScaffold.append(e("<li><a>" + s.count + "</a></li>")) : 1 === s.pagingCount ? s.controlNavScaffold.find("li").remove() : s.controlNav.eq(i).closest("li").remove(), m.controlNav.set(), s.pagingCount > 1 && s.pagingCount !== s.controlNav.length ? s.update(i, t) : m.controlNav.active()
        }
      }, directionNav: {
        setup: function () {
          var t = e('<ul class="' + o + 'direction-nav"><li class="' + o + 'nav-prev"><a class="' + o + 'prev" href="#">' + s.vars.prevText + '</a></li><li class="' + o + 'nav-next"><a class="' + o + 'next" href="#">' + s.vars.nextText + "</a></li></ul>");
          s.controlsContainer ? (e(s.controlsContainer).append(t), s.directionNav = e("." + o + "direction-nav li a", s.controlsContainer)) : (s.append(t), s.directionNav = e("." + o + "direction-nav li a", s)), m.directionNav.update(), s.directionNav.bind(l, function (t) {
            t.preventDefault();
            var i;
            ("" === c || c === t.type) && (i = s.getTarget(e(this).hasClass(o + "next") ? "next" : "prev"), s.flexAnimate(i, s.vars.pauseOnAction)), "" === c && (c = t.type), m.setToClearWatchedEvent()
          })
        }, update: function () {
          var e = o + "disabled";
          1 === s.pagingCount ? s.directionNav.addClass(e).attr("tabindex", "-1") : s.vars.animationLoop ? s.directionNav.removeClass(e).removeAttr("tabindex") : 0 === s.animatingTo ? s.directionNav.removeClass(e).filter("." + o + "prev").addClass(e).attr("tabindex", "-1") : s.animatingTo === s.last ? s.directionNav.removeClass(e).filter("." + o + "next").addClass(e).attr("tabindex", "-1") : s.directionNav.removeClass(e).removeAttr("tabindex")
        }
      }, pausePlay: {
        setup: function () {
          var t = e('<div class="' + o + 'pauseplay"><a></a></div>');
          s.controlsContainer ? (s.controlsContainer.append(t), s.pausePlay = e("." + o + "pauseplay a", s.controlsContainer)) : (s.append(t), s.pausePlay = e("." + o + "pauseplay a", s)), m.pausePlay.update(s.vars.slideshow ? o + "pause" : o + "play"), s.pausePlay.bind(l, function (t) {
            t.preventDefault(), ("" === c || c === t.type) && (e(this).hasClass(o + "pause") ? (s.manualPause = !0, s.manualPlay = !1, s.pause()) : (s.manualPause = !1, s.manualPlay = !0, s.play())), "" === c && (c = t.type), m.setToClearWatchedEvent()
          })
        }, update: function (e) {
          "play" === e ? s.pausePlay.removeClass(o + "pause").addClass(o + "play").html(s.vars.playText) : s.pausePlay.removeClass(o + "play").addClass(o + "pause").html(s.vars.pauseText)
        }
      }, touch: function () {
        function e(e) {
          s.animating ? e.preventDefault() : (window.navigator.msPointerEnabled || 1 === e.touches.length) && (s.pause(), _ = d ? s.h : s.w, v = Number(new Date), y = e.touches[0].pageX, w = e.touches[0].pageY, m = h && u && s.animatingTo === s.last ? 0 : h && u ? s.limit - (s.itemW + s.vars.itemMargin) * s.move * s.animatingTo : h && s.currentSlide === s.last ? s.limit : h ? (s.itemW + s.vars.itemMargin) * s.move * s.currentSlide : u ? (s.last - s.currentSlide + s.cloneOffset) * _ : (s.currentSlide + s.cloneOffset) * _, c = d ? w : y, p = d ? y : w, t.addEventListener("touchmove", i, !1), t.addEventListener("touchend", n, !1))
        }

        function i(e) {
          y = e.touches[0].pageX, w = e.touches[0].pageY, g = d ? c - w : c - y, b = d ? Math.abs(g) < Math.abs(y - p) : Math.abs(g) < Math.abs(w - p);
          var t = 500;
          (!b || Number(new Date) - v > t) && (e.preventDefault(), !f && s.transitions && (s.vars.animationLoop || (g /= 0 === s.currentSlide && 0 > g || s.currentSlide === s.last && g > 0 ? Math.abs(g) / _ + 2 : 1), s.setProps(m + g, "setTouch")))
        }

        function n(e) {
          if (t.removeEventListener("touchmove", i, !1), s.animatingTo === s.currentSlide && !b && null !== g) {
            var o = u ? -g : g, a = s.getTarget(o > 0 ? "next" : "prev");
            s.canAdvance(a) && (Number(new Date) - v < 550 && Math.abs(o) > 50 || Math.abs(o) > _ / 2) ? s.flexAnimate(a, s.vars.pauseOnAction) : f || s.flexAnimate(s.currentSlide, s.vars.pauseOnAction, !0)
          }
          t.removeEventListener("touchend", n, !1), c = null, p = null, g = null, m = null
        }

        function o(e) {
          e.stopPropagation(), s.animating ? e.preventDefault() : (s.pause(), t._gesture.addPointer(e.pointerId), x = 0, _ = d ? s.h : s.w, v = Number(new Date), m = h && u && s.animatingTo === s.last ? 0 : h && u ? s.limit - (s.itemW + s.vars.itemMargin) * s.move * s.animatingTo : h && s.currentSlide === s.last ? s.limit : h ? (s.itemW + s.vars.itemMargin) * s.move * s.currentSlide : u ? (s.last - s.currentSlide + s.cloneOffset) * _ : (s.currentSlide + s.cloneOffset) * _)
        }

        function r(e) {
          e.stopPropagation();
          var i = e.target._slider;
          if (i) {
            var s = -e.translationX, n = -e.translationY;
            return x += d ? n : s, g = x, b = d ? Math.abs(x) < Math.abs(-s) : Math.abs(x) < Math.abs(-n), e.detail === e.MSGESTURE_FLAG_INERTIA ? void setImmediate(function () {
              t._gesture.stop()
            }) : void ((!b || Number(new Date) - v > 500) && (e.preventDefault(), !f && i.transitions && (i.vars.animationLoop || (g = x / (0 === i.currentSlide && 0 > x || i.currentSlide === i.last && x > 0 ? Math.abs(x) / _ + 2 : 1)), i.setProps(m + g, "setTouch"))))
          }
        }

        function l(e) {
          e.stopPropagation();
          var t = e.target._slider;
          if (t) {
            if (t.animatingTo === t.currentSlide && !b && null !== g) {
              var i = u ? -g : g, s = t.getTarget(i > 0 ? "next" : "prev");
              t.canAdvance(s) && (Number(new Date) - v < 550 && Math.abs(i) > 50 || Math.abs(i) > _ / 2) ? t.flexAnimate(s, t.vars.pauseOnAction) : f || t.flexAnimate(t.currentSlide, t.vars.pauseOnAction, !0)
            }
            c = null, p = null, g = null, m = null, x = 0
          }
        }

        var c, p, m, _, g, v, b = !1, y = 0, w = 0, x = 0;
        a ? (t.style.msTouchAction = "none", t._gesture = new MSGesture, t._gesture.target = t, t.addEventListener("MSPointerDown", o, !1), t._slider = s, t.addEventListener("MSGestureChange", r, !1), t.addEventListener("MSGestureEnd", l, !1)) : t.addEventListener("touchstart", e, !1)
      }, resize: function () {
        !s.animating && s.is(":visible") && (h || s.doMath(), f ? m.smoothHeight() : h ? (s.slides.width(s.computedW), s.update(s.pagingCount), s.setProps()) : d ? (s.viewport.height(s.h), s.setProps(s.h, "setTotal")) : (s.vars.smoothHeight && m.smoothHeight(), s.newSlides.width(s.computedW), s.setProps(s.computedW, "setTotal")))
      }, smoothHeight: function (e) {
        if (!d || f) {
          var t = f ? s : s.viewport;
          e ? t.animate({height: s.slides.eq(s.animatingTo).height()}, e) : t.height(s.slides.eq(s.animatingTo).height())
        }
      }, sync: function (t) {
        var i = e(s.vars.sync).data("flexslider"), n = s.animatingTo;
        switch (t) {
          case"animate":
            i.flexAnimate(n, s.vars.pauseOnAction, !1, !0);
            break;
          case"play":
            i.playing || i.asNav || i.play();
            break;
          case"pause":
            i.pause()
        }
      }, uniqueID: function (t) {
        return t.filter("[id]").add(t.find("[id]")).each(function () {
          var t = e(this);
          t.attr("id", t.attr("id") + "_clone")
        }), t
      }, pauseInvisible: {
        visProp: null, init: function () {
          var e = m.pauseInvisible.getHiddenProp();
          if (e) {
            var t = e.replace(/[H|h]idden/, "") + "visibilitychange";
            document.addEventListener(t, function () {
              m.pauseInvisible.isHidden() ? s.startTimeout ? clearTimeout(s.startTimeout) : s.pause() : s.started ? s.play() : s.vars.initDelay > 0 ? setTimeout(s.play, s.vars.initDelay) : s.play()
            })
          }
        }, isHidden: function () {
          var e = m.pauseInvisible.getHiddenProp();
          return !!e && document[e]
        }, getHiddenProp: function () {
          var e = ["webkit", "moz", "ms", "o"];
          if ("hidden" in document) return "hidden";
          for (var t = 0; t < e.length; t++) if (e[t] + "Hidden" in document) return e[t] + "Hidden";
          return null
        }
      }, setToClearWatchedEvent: function () {
        clearTimeout(n), n = setTimeout(function () {
          c = ""
        }, 3e3)
      }
    }, s.flexAnimate = function (t, i, n, a, l) {
      if (s.vars.animationLoop || t === s.currentSlide || (s.direction = t > s.currentSlide ? "next" : "prev"), p && 1 === s.pagingCount && (s.direction = s.currentItem < t ? "next" : "prev"), !s.animating && (s.canAdvance(t, l) || n) && s.is(":visible")) {
        if (p && a) {
          var c = e(s.vars.asNavFor).data("flexslider");
          if (s.atEnd = 0 === t || t === s.count - 1, c.flexAnimate(t, !0, !1, !0, l), s.direction = s.currentItem < t ? "next" : "prev", c.direction = s.direction, Math.ceil((t + 1) / s.visible) - 1 === s.currentSlide || 0 === t) return s.currentItem = t, s.slides.removeClass(o + "active-slide").eq(t).addClass(o + "active-slide"), !1;
          s.currentItem = t, s.slides.removeClass(o + "active-slide").eq(t).addClass(o + "active-slide"), t = Math.floor(t / s.visible)
        }
        if (s.animating = !0, s.animatingTo = t, i && s.pause(), s.vars.before(s), s.syncExists && !l && m.sync("animate"), s.vars.controlNav && m.controlNav.active(), h || s.slides.removeClass(o + "active-slide").eq(t).addClass(o + "active-slide"), s.atEnd = 0 === t || t === s.last, s.vars.directionNav && m.directionNav.update(), t === s.last && (s.vars.end(s), s.vars.animationLoop || s.pause()), f) r ? (s.slides.eq(s.currentSlide).css({
          opacity: 0,
          zIndex: 1
        }), s.slides.eq(t).css({
          opacity: 1,
          zIndex: 2
        }), s.wrapup(b)) : (s.slides.eq(s.currentSlide).css({zIndex: 1}).animate({opacity: 0}, s.vars.animationSpeed, s.vars.easing), s.slides.eq(t).css({zIndex: 2}).animate({opacity: 1}, s.vars.animationSpeed, s.vars.easing, s.wrapup)); else {
          var _, g, v, b = d ? s.slides.filter(":first").height() : s.computedW;
          h ? (_ = s.vars.itemMargin, v = (s.itemW + _) * s.move * s.animatingTo, g = v > s.limit && 1 !== s.visible ? s.limit : v) : g = 0 === s.currentSlide && t === s.count - 1 && s.vars.animationLoop && "next" !== s.direction ? u ? (s.count + s.cloneOffset) * b : 0 : s.currentSlide === s.last && 0 === t && s.vars.animationLoop && "prev" !== s.direction ? u ? 0 : (s.count + 1) * b : u ? (s.count - 1 - t + s.cloneOffset) * b : (t + s.cloneOffset) * b, s.setProps(g, "", s.vars.animationSpeed), s.transitions ? (s.vars.animationLoop && s.atEnd || (s.animating = !1, s.currentSlide = s.animatingTo), s.container.unbind("webkitTransitionEnd transitionend"), s.container.bind("webkitTransitionEnd transitionend", function () {
            clearTimeout(s.ensureAnimationEnd), s.wrapup(b)
          }), clearTimeout(s.ensureAnimationEnd), s.ensureAnimationEnd = setTimeout(function () {
            s.wrapup(b)
          }, s.vars.animationSpeed + 100)) : s.container.animate(s.args, s.vars.animationSpeed, s.vars.easing, function () {
            s.wrapup(b)
          })
        }
        s.vars.smoothHeight && m.smoothHeight(s.vars.animationSpeed)
      }
    }, s.wrapup = function (e) {
      f || h || (0 === s.currentSlide && s.animatingTo === s.last && s.vars.animationLoop ? s.setProps(e, "jumpEnd") : s.currentSlide === s.last && 0 === s.animatingTo && s.vars.animationLoop && s.setProps(e, "jumpStart")), s.animating = !1, s.currentSlide = s.animatingTo, s.vars.after(s)
    }, s.animateSlides = function () {
      !s.animating && _ && s.flexAnimate(s.getTarget("next"))
    }, s.pause = function () {
      clearInterval(s.animatedSlides), s.animatedSlides = null, s.playing = !1, s.vars.pausePlay && m.pausePlay.update("play"), s.syncExists && m.sync("pause")
    }, s.play = function () {
      s.playing && clearInterval(s.animatedSlides), s.animatedSlides = s.animatedSlides || setInterval(s.animateSlides, s.vars.slideshowSpeed), s.started = s.playing = !0, s.vars.pausePlay && m.pausePlay.update("pause"), s.syncExists && m.sync("play")
    }, s.stop = function () {
      s.pause(), s.stopped = !0
    }, s.canAdvance = function (e, t) {
      var i = p ? s.pagingCount - 1 : s.last;
      return !!t || (!(!p || s.currentItem !== s.count - 1 || 0 !== e || "prev" !== s.direction) || (!p || 0 !== s.currentItem || e !== s.pagingCount - 1 || "next" === s.direction) && (!(e === s.currentSlide && !p) && (!!s.vars.animationLoop || (!s.atEnd || 0 !== s.currentSlide || e !== i || "next" === s.direction) && (!s.atEnd || s.currentSlide !== i || 0 !== e || "next" !== s.direction))))
    }, s.getTarget = function (e) {
      return s.direction = e, "next" === e ? s.currentSlide === s.last ? 0 : s.currentSlide + 1 : 0 === s.currentSlide ? s.last : s.currentSlide - 1
    }, s.setProps = function (e, t, i) {
      var n = function () {
        var i = e ? e : (s.itemW + s.vars.itemMargin) * s.move * s.animatingTo, n = function () {
          if (h) return "setTouch" === t ? e : u && s.animatingTo === s.last ? 0 : u ? s.limit - (s.itemW + s.vars.itemMargin) * s.move * s.animatingTo : s.animatingTo === s.last ? s.limit : i;
          switch (t) {
            case"setTotal":
              return u ? (s.count - 1 - s.currentSlide + s.cloneOffset) * e : (s.currentSlide + s.cloneOffset) * e;
            case"setTouch":
              return u ? e : e;
            case"jumpEnd":
              return u ? e : s.count * e;
            case"jumpStart":
              return u ? s.count * e : e;
            default:
              return e
          }
        }();
        return -1 * n + "px"
      }();
      s.transitions && (n = d ? "translate3d(0," + n + ",0)" : "translate3d(" + n + ",0,0)", i = void 0 !== i ? i / 1e3 + "s" : "0s", s.container.css("-" + s.pfx + "-transition-duration", i), s.container.css("transition-duration", i)), s.args[s.prop] = n, (s.transitions || void 0 === i) && s.container.css(s.args), s.container.css("transform", n)
    }, s.setup = function (t) {
      if (f) s.slides.css({
        width: "100%",
        "float": "left",
        marginRight: "-100%",
        position: "relative"
      }), "init" === t && (r ? s.slides.css({
        opacity: 0,
        display: "block",
        webkitTransition: "opacity " + s.vars.animationSpeed / 1e3 + "s ease",
        zIndex: 1
      }).eq(s.currentSlide).css({opacity: 1, zIndex: 2}) : 0 == s.vars.fadeFirstSlide ? s.slides.css({
        opacity: 0,
        display: "block",
        zIndex: 1
      }).eq(s.currentSlide).css({zIndex: 2}).css({opacity: 1}) : s.slides.css({
        opacity: 0,
        display: "block",
        zIndex: 1
      }).eq(s.currentSlide).css({zIndex: 2}).animate({opacity: 1}, s.vars.animationSpeed, s.vars.easing)), s.vars.smoothHeight && m.smoothHeight(); else {
        var i, n;
        "init" === t && (s.viewport = e('<div class="' + o + 'viewport"></div>').css({
          overflow: "hidden",
          position: "relative"
        }).appendTo(s).append(s.container), s.cloneCount = 0, s.cloneOffset = 0, u && (n = e.makeArray(s.slides).reverse(), s.slides = e(n), s.container.empty().append(s.slides))), s.vars.animationLoop && !h && (s.cloneCount = 2, s.cloneOffset = 1, "init" !== t && s.container.find(".clone").remove(), s.container.append(m.uniqueID(s.slides.first().clone().addClass("clone")).attr("aria-hidden", "true")).prepend(m.uniqueID(s.slides.last().clone().addClass("clone")).attr("aria-hidden", "true"))), s.newSlides = e(s.vars.selector, s), i = u ? s.count - 1 - s.currentSlide + s.cloneOffset : s.currentSlide + s.cloneOffset, d && !h ? (s.container.height(200 * (s.count + s.cloneCount) + "%").css("position", "absolute").width("100%"), setTimeout(function () {
          s.newSlides.css({display: "block"}), s.doMath(), s.viewport.height(s.h), s.setProps(i * s.h, "init")
        }, "init" === t ? 100 : 0)) : (s.container.width(200 * (s.count + s.cloneCount) + "%"), s.setProps(i * s.computedW, "init"), setTimeout(function () {
          s.doMath(), s.newSlides.css({
            width: s.computedW,
            "float": "left",
            display: "block"
          }), s.vars.smoothHeight && m.smoothHeight()
        }, "init" === t ? 100 : 0))
      }
      h || s.slides.removeClass(o + "active-slide").eq(s.currentSlide).addClass(o + "active-slide"), s.vars.init(s)
    }, s.doMath = function () {
      var e = s.slides.first(), t = s.vars.itemMargin, i = s.vars.minItems, n = s.vars.maxItems;
      s.w = void 0 === s.viewport ? s.width() : s.viewport.width(), s.h = e.height(), s.boxPadding = e.outerWidth() - e.width(), h ? (s.itemT = s.vars.itemWidth + t, s.minW = i ? i * s.itemT : s.w, s.maxW = n ? n * s.itemT - t : s.w, s.itemW = s.minW > s.w ? (s.w - t * (i - 1)) / i : s.maxW < s.w ? (s.w - t * (n - 1)) / n : s.vars.itemWidth > s.w ? s.w : s.vars.itemWidth, s.visible = Math.floor(s.w / s.itemW), s.move = s.vars.move > 0 && s.vars.move < s.visible ? s.vars.move : s.visible, s.pagingCount = Math.ceil((s.count - s.visible) / s.move + 1), s.last = s.pagingCount - 1, s.limit = 1 === s.pagingCount ? 0 : s.vars.itemWidth > s.w ? s.itemW * (s.count - 1) + t * (s.count - 1) : (s.itemW + t) * s.count - s.w - t) : (s.itemW = s.w, s.pagingCount = s.count, s.last = s.count - 1), s.computedW = s.itemW - s.boxPadding
    }, s.update = function (e, t) {
      s.doMath(), h || (e < s.currentSlide ? s.currentSlide += 1 : e <= s.currentSlide && 0 !== e && (s.currentSlide -= 1), s.animatingTo = s.currentSlide), s.vars.controlNav && !s.manualControls && ("add" === t && !h || s.pagingCount > s.controlNav.length ? m.controlNav.update("add") : ("remove" === t && !h || s.pagingCount < s.controlNav.length) && (h && s.currentSlide > s.last && (s.currentSlide -= 1, s.animatingTo -= 1), m.controlNav.update("remove", s.last))), s.vars.directionNav && m.directionNav.update()
    }, s.addSlide = function (t, i) {
      var n = e(t);
      s.count += 1, s.last = s.count - 1, d && u ? void 0 !== i ? s.slides.eq(s.count - i).after(n) : s.container.prepend(n) : void 0 !== i ? s.slides.eq(i).before(n) : s.container.append(n), s.update(i, "add"), s.slides = e(s.vars.selector + ":not(.clone)", s), s.setup(), s.vars.added(s)
    }, s.removeSlide = function (t) {
      var i = isNaN(t) ? s.slides.index(e(t)) : t;
      s.count -= 1, s.last = s.count - 1, isNaN(t) ? e(t, s.slides).remove() : d && u ? s.slides.eq(s.last).remove() : s.slides.eq(t).remove(), s.doMath(), s.update(i, "remove"), s.slides = e(s.vars.selector + ":not(.clone)", s), s.setup(), s.vars.removed(s)
    }, m.init()
  }, e(window).blur(function (e) {
    focused = !1
  }).focus(function (e) {
    focused = !0
  }), e.flexslider.defaults = {
    namespace: "flex-",
    selector: ".slides > li",
    animation: "fade",
    easing: "swing",
    direction: "horizontal",
    reverse: !1,
    animationLoop: !0,
    smoothHeight: !1,
    startAt: 0,
    slideshow: !0,
    slideshowSpeed: 7e3,
    animationSpeed: 600,
    initDelay: 0,
    randomize: !1,
    fadeFirstSlide: !0,
    thumbCaptions: !1,
    pauseOnAction: !0,
    pauseOnHover: !1,
    pauseInvisible: !0,
    useCSS: !0,
    touch: !0,
    video: !1,
    controlNav: !0,
    directionNav: !0,
    prevText: "Previous",
    nextText: "Next",
    keyboard: !0,
    multipleKeyboard: !1,
    mousewheel: !1,
    pausePlay: !1,
    pauseText: "Pause",
    playText: "Play",
    controlsContainer: "",
    manualControls: "",
    sync: "",
    asNavFor: "",
    itemWidth: 0,
    itemMargin: 0,
    minItems: 1,
    maxItems: 0,
    move: 0,
    allowOneSlide: !0,
    start: function () {
    },
    before: function () {
    },
    after: function () {
    },
    end: function () {
    },
    added: function () {
    },
    removed: function () {
    },
    init: function () {
    }
  }, e.fn.flexslider = function (t) {
    if (void 0 === t && (t = {}), "object" == typeof t) return this.each(function () {
      var i = e(this), s = t.selector ? t.selector : ".slides > li", n = i.find(s);
      1 === n.length && t.allowOneSlide === !0 || 0 === n.length ? (n.fadeIn(400), t.start && t.start(i)) : void 0 === i.data("flexslider") && new e.flexslider(this, t)
    });
    var i = e(this).data("flexslider");
    switch (t) {
      case"play":
        i.play();
        break;
      case"pause":
        i.pause();
        break;
      case"stop":
        i.stop();
        break;
      case"next":
        i.flexAnimate(i.getTarget("next"), !0);
        break;
      case"prev":
      case"previous":
        i.flexAnimate(i.getTarget("prev"), !0);
        break;
      default:
        "number" == typeof t && i.flexAnimate(t, !0)
    }
  }
}(jQuery), jQuery(document).ready(function (e) {
  e(".tx-in2flexslider").each(function () {
    var t = e(this).attr("id"), i = new Array;
    i.reverse = !1, i.initDelay = 5e3, i.slideshowSpeed = 12e3, i.animationSpeed = 2e3, e("#" + t + " .settings_additional_animation").html() && (i.animation = e("#" + t + " .settings_additional_animation").html()), e("#" + t + " .settings_additional_controlNav").html() && (i.controlNav = "true" === e("#" + t + " .settings_additional_controlNav").html()), e("#" + t + " .settings_additional_animationLoop").html() && (i.animationLoop = "true" === e("#" + t + " .settings_additional_animationLoop").html()), e("#" + t + " .settings_additional_slideshow").html() && (i.slideshow = "true" === e("#" + t + " .settings_additional_slideshow").html()), parseInt(e("#" + t + " .settings_additional_itemWidth").html()) > 0 && (i.itemWidth = parseInt(e("#" + t + " .settings_additional_itemWidth").html())), parseInt(e("#" + t + " .settings_additional_itemMargin").html()) > 0 && (i.itemMargin = parseInt(e("#" + t + " .settings_additional_itemMargin").html())), parseInt(e("#" + t + " .settings_additional_minItems").html()) > 0 && (i.minItems = parseInt(e("#" + t + " .settings_additional_minItems").html())), parseInt(e("#" + t + " .settings_additional_maxItems").html()) > 0 && (i.maxItems = parseInt(e("#" + t + " .settings_additional_maxItems").html())), parseInt(e("#" + t + " .settings_additional_initDelay").html()) > 0 && (i.initDelay = parseInt(e("#" + t + " .settings_additional_initDelay").html())), parseInt(e("#" + t + " .settings_additional_slideshowSpeed").html()) > 0 && (i.slideshowSpeed = parseInt(e("#" + t + " .settings_additional_slideshowSpeed").html())), parseInt(e("#" + t + " .settings_additional_animationSpeed").html()) > 0 && (i.animationSpeed = parseInt(e("#" + t + " .settings_additional_animationSpeed").html())), i.start = function (e) {
      e.removeClass("loading")
    }, e("#" + t + " .flexslider").flexslider(i), e("#" + t + " .flexslider_carousel").flexslider({
      animation: e("#" + t + " .settings_additional_animation").html(),
      useCSS: !0,
      controlNav: !1,
      animationLoop: !1,
      slideshow: !1,
      itemWidth: parseInt(e("#" + t + " .settings_additional_itemWidth").html()),
      itemMargin: parseInt(e("#" + t + " .settings_additional_itemMargin").html()),
      asNavFor: "#" + t + " .flexslider_slider"
    }), e("#" + t + " .flexslider_slider").flexslider({
      animation: e("#" + t + " .settings_additional_animation").html(),
      useCSS: !0,
      controlNav: !1,
      animationLoop: !1,
      slideshow: !1,
      sync: "#" + t + " .flexslider_carousel"
    })
  })
}), function (e, t, i) {
  function s(e) {
    return e
  }

  function n(e) {
    return decodeURIComponent(e.replace(o, " "))
  }

  var o = /\+/g, a = e.cookie = function (o, r, l) {
    if (r !== i) {
      if (l = e.extend({}, a.defaults, l), null === r && (l.expires = -1), "number" == typeof l.expires) {
        var c = l.expires, d = l.expires = new Date;
        d.setDate(d.getDate() + c)
      }
      return r = a.json ? JSON.stringify(r) : String(r), t.cookie = [encodeURIComponent(o), "=", a.raw ? r : encodeURIComponent(r), l.expires ? "; expires=" + l.expires.toUTCString() : "", l.path ? "; path=" + l.path : "", l.domain ? "; domain=" + l.domain : "", l.secure ? "; secure" : ""].join("")
    }
    for (var u = a.raw ? s : n, h = t.cookie.split("; "), f = 0, p = h.length; f < p; f++) {
      var m = h[f].split("=");
      if (u(m.shift()) === o) {
        var _ = u(m.join("="));
        return a.json ? JSON.parse(_) : _
      }
    }
    return null
  };
  a.defaults = {}, e.removeCookie = function (t, i) {
    return null !== e.cookie(t) && (e.cookie(t, null, i), !0)
  }
}(jQuery, document), jQuery.easing.jswing = jQuery.easing.swing, jQuery.extend(jQuery.easing, {
  def: "easeOutQuad", swing: function (e, t, i, s, n) {
    return jQuery.easing[jQuery.easing.def](e, t, i, s, n)
  }, easeInQuad: function (e, t, i, s, n) {
    return s * (t /= n) * t + i
  }, easeOutQuad: function (e, t, i, s, n) {
    return -s * (t /= n) * (t - 2) + i
  }, easeInOutQuad: function (e, t, i, s, n) {
    return (t /= n / 2) < 1 ? s / 2 * t * t + i : -s / 2 * (--t * (t - 2) - 1) + i
  }, easeInCubic: function (e, t, i, s, n) {
    return s * (t /= n) * t * t + i
  }, easeOutCubic: function (e, t, i, s, n) {
    return s * ((t = t / n - 1) * t * t + 1) + i
  }, easeInOutCubic: function (e, t, i, s, n) {
    return (t /= n / 2) < 1 ? s / 2 * t * t * t + i : s / 2 * ((t -= 2) * t * t + 2) + i
  }, easeInQuart: function (e, t, i, s, n) {
    return s * (t /= n) * t * t * t + i
  }, easeOutQuart: function (e, t, i, s, n) {
    return -s * ((t = t / n - 1) * t * t * t - 1) + i
  }, easeInOutQuart: function (e, t, i, s, n) {
    return (t /= n / 2) < 1 ? s / 2 * t * t * t * t + i : -s / 2 * ((t -= 2) * t * t * t - 2) + i
  }, easeInQuint: function (e, t, i, s, n) {
    return s * (t /= n) * t * t * t * t + i
  }, easeOutQuint: function (e, t, i, s, n) {
    return s * ((t = t / n - 1) * t * t * t * t + 1) + i
  }, easeInOutQuint: function (e, t, i, s, n) {
    return (t /= n / 2) < 1 ? s / 2 * t * t * t * t * t + i : s / 2 * ((t -= 2) * t * t * t * t + 2) + i
  }, easeInSine: function (e, t, i, s, n) {
    return -s * Math.cos(t / n * (Math.PI / 2)) + s + i
  }, easeOutSine: function (e, t, i, s, n) {
    return s * Math.sin(t / n * (Math.PI / 2)) + i
  }, easeInOutSine: function (e, t, i, s, n) {
    return -s / 2 * (Math.cos(Math.PI * t / n) - 1) + i
  }, easeInExpo: function (e, t, i, s, n) {
    return 0 == t ? i : s * Math.pow(2, 10 * (t / n - 1)) + i
  }, easeOutExpo: function (e, t, i, s, n) {
    return t == n ? i + s : s * (-Math.pow(2, -10 * t / n) + 1) + i
  }, easeInOutExpo: function (e, t, i, s, n) {
    return 0 == t ? i : t == n ? i + s : (t /= n / 2) < 1 ? s / 2 * Math.pow(2, 10 * (t - 1)) + i : s / 2 * (-Math.pow(2, -10 * --t) + 2) + i
  }, easeInCirc: function (e, t, i, s, n) {
    return -s * (Math.sqrt(1 - (t /= n) * t) - 1) + i
  }, easeOutCirc: function (e, t, i, s, n) {
    return s * Math.sqrt(1 - (t = t / n - 1) * t) + i
  }, easeInOutCirc: function (e, t, i, s, n) {
    return (t /= n / 2) < 1 ? -s / 2 * (Math.sqrt(1 - t * t) - 1) + i : s / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1) + i
  }, easeInElastic: function (e, t, i, s, n) {
    var o = 1.70158, a = 0, r = s;
    if (0 == t) return i;
    if (1 == (t /= n)) return i + s;
    if (a || (a = .3 * n), r < Math.abs(s)) {
      r = s;
      var o = a / 4
    } else var o = a / (2 * Math.PI) * Math.asin(s / r);
    return -(r * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * n - o) * (2 * Math.PI) / a)) + i
  }, easeOutElastic: function (e, t, i, s, n) {
    var o = 1.70158, a = 0, r = s;
    if (0 == t) return i;
    if (1 == (t /= n)) return i + s;
    if (a || (a = .3 * n), r < Math.abs(s)) {
      r = s;
      var o = a / 4
    } else var o = a / (2 * Math.PI) * Math.asin(s / r);
    return r * Math.pow(2, -10 * t) * Math.sin((t * n - o) * (2 * Math.PI) / a) + s + i
  }, easeInOutElastic: function (e, t, i, s, n) {
    var o = 1.70158, a = 0, r = s;
    if (0 == t) return i;
    if (2 == (t /= n / 2)) return i + s;
    if (a || (a = n * (.3 * 1.5)), r < Math.abs(s)) {
      r = s;
      var o = a / 4
    } else var o = a / (2 * Math.PI) * Math.asin(s / r);
    return t < 1 ? -.5 * (r * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * n - o) * (2 * Math.PI) / a)) + i : r * Math.pow(2, -10 * (t -= 1)) * Math.sin((t * n - o) * (2 * Math.PI) / a) * .5 + s + i
  }, easeInBack: function (e, t, i, s, n, o) {
    return void 0 == o && (o = 1.70158), s * (t /= n) * t * ((o + 1) * t - o) + i
  }, easeOutBack: function (e, t, i, s, n, o) {
    return void 0 == o && (o = 1.70158), s * ((t = t / n - 1) * t * ((o + 1) * t + o) + 1) + i
  }, easeInOutBack: function (e, t, i, s, n, o) {
    return void 0 == o && (o = 1.70158), (t /= n / 2) < 1 ? s / 2 * (t * t * (((o *= 1.525) + 1) * t - o)) + i : s / 2 * ((t -= 2) * t * (((o *= 1.525) + 1) * t + o) + 2) + i
  }, easeInBounce: function (e, t, i, s, n) {
    return s - jQuery.easing.easeOutBounce(e, n - t, 0, s, n) + i
  }, easeOutBounce: function (e, t, i, s, n) {
    return (t /= n) < 1 / 2.75 ? s * (7.5625 * t * t) + i : t < 2 / 2.75 ? s * (7.5625 * (t -= 1.5 / 2.75) * t + .75) + i : t < 2.5 / 2.75 ? s * (7.5625 * (t -= 2.25 / 2.75) * t + .9375) + i : s * (7.5625 * (t -= 2.625 / 2.75) * t + .984375) + i
  }, easeInOutBounce: function (e, t, i, s, n) {
    return t < n / 2 ? .5 * jQuery.easing.easeInBounce(e, 2 * t, 0, s, n) + i : .5 * jQuery.easing.easeOutBounce(e, 2 * t - n, 0, s, n) + .5 * s + i
  }
}), function (e) {
  function t(t, i) {
    var s, n = this, o = window.navigator, a = o.userAgent.toLowerCase();
    n.uid = e.rsModules.uid++, n.ns = ".rs" + n.uid;
    var r, l = document.createElement("div").style, c = ["webkit", "Moz", "ms", "O"], d = "", u = 0;
    for (s = 0; s < c.length; s++) r = c[s], !d && r + "Transform" in l && (d = r), r = r.toLowerCase(), window.requestAnimationFrame || (window.requestAnimationFrame = window[r + "RequestAnimationFrame"], window.cancelAnimationFrame = window[r + "CancelAnimationFrame"] || window[r + "CancelRequestAnimationFrame"]);
    window.requestAnimationFrame || (window.requestAnimationFrame = function (e, t) {
      var i = (new Date).getTime(), s = Math.max(0, 16 - (i - u)), n = window.setTimeout(function () {
        e(i + s)
      }, s);
      return u = i + s, n
    }), window.cancelAnimationFrame || (window.cancelAnimationFrame = function (e) {
      clearTimeout(e)
    }), n.isIPAD = a.match(/(ipad)/), n.isIOS = n.isIPAD || a.match(/(iphone|ipod)/), s = function (e) {
      return e = /(chrome)[ \/]([\w.]+)/.exec(e) || /(webkit)[ \/]([\w.]+)/.exec(e) || /(opera)(?:.*version|)[ \/]([\w.]+)/.exec(e) || /(msie) ([\w.]+)/.exec(e) || 0 > e.indexOf("compatible") && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec(e) || [], {
        browser: e[1] || "",
        version: e[2] || "0"
      }
    }(a), c = {}, s.browser && (c[s.browser] = !0, c.version = s.version), c.chrome && (c.webkit = !0), n._a = c, n.isAndroid = -1 < a.indexOf("android"), n.slider = e(t), n.ev = e(n), n._b = e(document), n.st = e.extend({}, e.fn.royalSlider.defaults, i), n._c = n.st.transitionSpeed, n._d = 0, !n.st.allowCSS3 || c.webkit && !n.st.allowCSS3OnWebkit || (s = d + (d ? "T" : "t"), n._e = s + "ransform" in l && s + "ransition" in l, n._e && (n._f = d + (d ? "P" : "p") + "erspective" in l)), d = d.toLowerCase(), n._g = "-" + d + "-", n._h = "vertical" !== n.st.slidesOrientation, n._i = n._h ? "left" : "top", n._j = n._h ? "width" : "height", n._k = -1, n._l = "fade" !== n.st.transitionType, n._l || (n.st.sliderDrag = !1, n._m = 10), n._n = "z-index:0; display:none; opacity:0;", n._o = 0, n._p = 0, n._q = 0, e.each(e.rsModules, function (e, t) {
      "uid" !== e && t.call(n)
    }), n.slides = [], n._r = 0, (n.st.slides ? e(n.st.slides) : n.slider.children().detach()).each(function () {
      n._s(this, !0)
    }), n.st.randomizeSlides && n.slides.sort(function () {
      return .5 - Math.random()
    }), n.numSlides = n.slides.length, n._t(), n.st.startSlideId ? n.st.startSlideId > n.numSlides - 1 && (n.st.startSlideId = n.numSlides - 1) : n.st.startSlideId = 0, n._o = n.staticSlideId = n.currSlideId = n._u = n.st.startSlideId, n.currSlide = n.slides[n.currSlideId], n._v = 0, n.pointerMultitouch = !1, n.slider.addClass((n._h ? "rsHor" : "rsVer") + (n._l ? "" : " rsFade")), l = '<div class="rsOverflow"><div class="rsContainer">', n.slidesSpacing = n.st.slidesSpacing, n._w = (n._h ? n.slider.width() : n.slider.height()) + n.st.slidesSpacing, n._x = Boolean(0 < n._y), 1 >= n.numSlides && (n._z = !1), n._a1 = n._z && n._l ? 2 === n.numSlides ? 1 : 2 : 0, n._b1 = 6 > n.numSlides ? n.numSlides : 6, n._c1 = 0, n._d1 = 0, n.slidesJQ = [];
    for (s = 0; s < n.numSlides; s++) n.slidesJQ.push(e('<div style="' + (n._l ? "" : s !== n.currSlideId ? n._n : "z-index:0;") + '" class="rsSlide "></div>'));
    n._e1 = l = e(l + "</div></div>");
    var h = n.ns, d = function (e, t, i, s, o) {
      n._j1 = e + t + h, n._k1 = e + i + h, n._l1 = e + s + h, o && (n._m1 = e + o + h)
    };
    s = o.pointerEnabled, n.pointerEnabled = s || o.msPointerEnabled, n.pointerEnabled ? (n.hasTouch = !1, n._n1 = .2, n.pointerMultitouch = Boolean(1 < o[(s ? "m" : "msM") + "axTouchPoints"]), s ? d("pointer", "down", "move", "up", "cancel") : d("MSPointer", "Down", "Move", "Up", "Cancel")) : (n.isIOS ? n._j1 = n._k1 = n._l1 = n._m1 = "" : d("mouse", "down", "move", "up"), "ontouchstart" in window || "createTouch" in document ? (n.hasTouch = !0, n._j1 += " touchstart" + h, n._k1 += " touchmove" + h,
      n._l1 += " touchend" + h, n._m1 += " touchcancel" + h, n._n1 = .5, n.st.sliderTouch && (n._f1 = !0)) : (n.hasTouch = !1, n._n1 = .2)), n.st.sliderDrag && (n._f1 = !0, c.msie || c.opera ? n._g1 = n._h1 = "move" : c.mozilla ? (n._g1 = "-moz-grab", n._h1 = "-moz-grabbing") : c.webkit && -1 != o.platform.indexOf("Mac") && (n._g1 = "-webkit-grab", n._h1 = "-webkit-grabbing"), n._i1()), n.slider.html(l), n._o1 = n.st.controlsInside ? n._e1 : n.slider, n._p1 = n._e1.children(".rsContainer"), n.pointerEnabled && n._p1.css((s ? "" : "-ms-") + "touch-action", n._h ? "pan-y" : "pan-x"), n._q1 = e('<div class="rsPreloader"></div>'), o = n._p1.children(".rsSlide"), n._r1 = n.slidesJQ[n.currSlideId], n._s1 = 0, n._e ? (n._t1 = "transition-property", n._u1 = "transition-duration", n._v1 = "transition-timing-function", n._w1 = n._x1 = n._g + "transform", n._f ? (c.webkit && !c.chrome && n.slider.addClass("rsWebkit3d"), n._y1 = "translate3d(", n._z1 = "px, ", n._a2 = "px, 0px)") : (n._y1 = "translate(", n._z1 = "px, ", n._a2 = "px)"), n._l ? n._p1[n._g + n._t1] = n._g + "transform" : (c = {}, c[n._g + n._t1] = "opacity", c[n._g + n._u1] = n.st.transitionSpeed + "ms", c[n._g + n._v1] = n.st.css3easeInOut, o.css(c))) : (n._x1 = "left", n._w1 = "top");
    var f;
    e(window).on("resize" + n.ns, function () {
      f && clearTimeout(f), f = setTimeout(function () {
        n.updateSliderSize()
      }, 50)
    }), n.ev.trigger("rsAfterPropsSetup"), n.updateSliderSize(), n.st.keyboardNavEnabled && n._b2(), n.st.arrowsNavHideOnTouch && (n.hasTouch || n.pointerMultitouch) && (n.st.arrowsNav = !1), n.st.arrowsNav && (o = n._o1, e('<div class="rsArrow rsArrowLeft"><div class="rsArrowIcn"></div></div><div class="rsArrow rsArrowRight"><div class="rsArrowIcn"></div></div>').appendTo(o), n._c2 = o.children(".rsArrowLeft").click(function (e) {
      e.preventDefault(), n.prev()
    }), n._d2 = o.children(".rsArrowRight").click(function (e) {
      e.preventDefault(), n.next()
    }), n.st.arrowsNavAutoHide && !n.hasTouch && (n._c2.addClass("rsHidden"), n._d2.addClass("rsHidden"), o.one("mousemove.arrowshover", function () {
      n._c2.removeClass("rsHidden"), n._d2.removeClass("rsHidden")
    }), o.hover(function () {
      n._e2 || (n._c2.removeClass("rsHidden"), n._d2.removeClass("rsHidden"))
    }, function () {
      n._e2 || (n._c2.addClass("rsHidden"), n._d2.addClass("rsHidden"))
    })), n.ev.on("rsOnUpdateNav", function () {
      n._f2()
    }), n._f2()), n.hasTouch && n.st.sliderTouch || !n.hasTouch && n.st.sliderDrag ? n._p1.on(n._j1, function (e) {
      n._g2(e)
    }) : n.dragSuccess = !1;
    var p = ["rsPlayBtnIcon", "rsPlayBtn", "rsCloseVideoBtn", "rsCloseVideoIcn"];
    n._p1.click(function (t) {
      if (!n.dragSuccess) {
        var i = e(t.target).attr("class");
        if (-1 !== e.inArray(i, p) && n.toggleVideo()) return !1;
        if (n.st.navigateByClick && !n._h2) {
          if (e(t.target).closest(".rsNoDrag", n._r1).length) return !0;
          n._i2(t)
        }
        n.ev.trigger("rsSlideClick", t)
      }
    }).on("click.rs", "a", function (e) {
      return !n.dragSuccess && (n._h2 = !0, void setTimeout(function () {
        n._h2 = !1
      }, 3))
    }), n.ev.trigger("rsAfterInit")
  }

  e.rsModules || (e.rsModules = {uid: 0}), t.prototype = {
    constructor: t, _i2: function (e) {
      e = e[this._h ? "pageX" : "pageY"] - this._j2, e >= this._q ? this.next() : 0 > e && this.prev()
    }, _t: function () {
      var e;
      e = this.st.numImagesToPreload, (this._z = this.st.loop) && (2 === this.numSlides ? (this._z = !1, this.st.loopRewind = !0) : 2 > this.numSlides && (this.st.loopRewind = this._z = !1)), this._z && 0 < e && (4 >= this.numSlides ? e = 1 : this.st.numImagesToPreload > (this.numSlides - 1) / 2 && (e = Math.floor((this.numSlides - 1) / 2))), this._y = e
    }, _s: function (t, i) {
      function s(e, t) {
        if (t ? r.images.push(e.attr(t)) : r.images.push(e.text()), l) {
          l = !1, r.caption = "src" === t ? e.attr("alt") : e.contents(), r.image = r.images[0], r.videoURL = e.attr("data-rsVideo");
          var i = e.attr("data-rsw"), s = e.attr("data-rsh");
          "undefined" != typeof i && !1 !== i && "undefined" != typeof s && !1 !== s ? (r.iW = parseInt(i, 10), r.iH = parseInt(s, 10)) : a.st.imgWidth && a.st.imgHeight && (r.iW = a.st.imgWidth, r.iH = a.st.imgHeight)
        }
      }

      var n, o, a = this, r = {}, l = !0;
      if (t = e(t), a._k2 = t, a.ev.trigger("rsBeforeParseNode", [t, r]), !r.stopParsing) return t = a._k2, r.id = a._r, r.contentAdded = !1, a._r++, r.images = [], r.isBig = !1, r.hasCover || (t.hasClass("rsImg") ? (o = t, n = !0) : (o = t.find(".rsImg"), o.length && (n = !0)), n ? (r.bigImage = o.eq(0).attr("data-rsBigImg"), o.each(function () {
        var t = e(this);
        t.is("a") ? s(t, "href") : t.is("img") ? s(t, "src") : s(t)
      })) : t.is("img") && (t.addClass("rsImg rsMainSlideImage"), s(t, "src"))), o = t.find(".rsCaption"), o.length && (r.caption = o.remove()), r.content = t, a.ev.trigger("rsAfterParseNode", [t, r]), i && a.slides.push(r), 0 === r.images.length && (r.isLoaded = !0, r.isRendered = !1, r.isLoading = !1, r.images = null), r
    }, _b2: function () {
      var e, t, i = this, s = function (e) {
        37 === e ? i.prev() : 39 === e && i.next()
      };
      i._b.on("keydown" + i.ns, function (n) {
        i._l2 || (t = n.keyCode, 37 !== t && 39 !== t || e || (n.preventDefault(), s(t), e = setInterval(function () {
          s(t)
        }, 700)))
      }).on("keyup" + i.ns, function (t) {
        e && (clearInterval(e), e = null)
      })
    }, goTo: function (e, t) {
      e !== this.currSlideId && this._m2(e, this.st.transitionSpeed, !0, !t)
    }, destroy: function (t) {
      this.ev.trigger("rsBeforeDestroy"), this._b.off("keydown" + this.ns + " keyup" + this.ns + " " + this._k1 + " " + this._l1), this._p1.off(this._j1 + " click"), this.slider.data("royalSlider", null), e.removeData(this.slider, "royalSlider"), e(window).off("resize" + this.ns), this.loadingTimeout && clearTimeout(this.loadingTimeout), t && this.slider.remove(), this.ev = this.slider = this.slides = null
    }, _n2: function (t, i) {
      function s(i, s, a) {
        i.isAdded ? (n(s, i), o(s, i)) : (a || (a = c.slidesJQ[s]), i.holder ? a = i.holder : (a = c.slidesJQ[s] = e(a), i.holder = a), i.appendOnLoaded = !1, o(s, i, a), n(s, i), c._p2(i, a, t), i.isAdded = !0)
      }

      function n(e, i) {
        i.contentAdded || (c.setItemHtml(i, t), t || (i.contentAdded = !0))
      }

      function o(e, t, i) {
        c._l && (i || (i = c.slidesJQ[e]), i.css(c._i, (e + c._d1 + h) * c._w))
      }

      function a(e) {
        if (d) {
          if (e > u - 1) return a(e - u);
          if (0 > e) return a(u + e)
        }
        return e
      }

      var r, l, c = this, d = c._z, u = c.numSlides;
      if (!isNaN(i)) return a(i);
      var h, f, p = c.currSlideId, m = t ? Math.abs(c._o2 - c.currSlideId) >= c.numSlides - 1 ? 0 : 1 : c._y,
        _ = Math.min(2, m), g = !1, v = !1;
      for (l = p; l < p + 1 + _; l++) if (f = a(l), (r = c.slides[f]) && (!r.isAdded || !r.positionSet)) {
        g = !0;
        break
      }
      for (l = p - 1; l > p - 1 - _; l--) if (f = a(l), (r = c.slides[f]) && (!r.isAdded || !r.positionSet)) {
        v = !0;
        break
      }
      if (g) for (l = p; l < p + m + 1; l++) f = a(l), h = Math.floor((c._u - (p - l)) / c.numSlides) * c.numSlides, (r = c.slides[f]) && s(r, f);
      if (v) for (l = p - 1; l > p - 1 - m; l--) f = a(l), h = Math.floor((c._u - (p - l)) / u) * u, (r = c.slides[f]) && s(r, f);
      if (!t) for (_ = a(p - m), p = a(p + m), m = _ > p ? 0 : _, l = 0; l < u; l++) _ > p && l > _ - 1 || !(l < m || l > p) || (r = c.slides[l]) && r.holder && (r.holder.detach(), r.isAdded = !1)
    }, setItemHtml: function (t, i) {
      var s = this, n = function () {
        if (t.images) {
          if (!t.isLoading) {
            var i, n;
            if (t.content.hasClass("rsImg") ? (i = t.content, n = !0) : i = t.content.find(".rsImg:not(img)"), i && !i.is("img") && i.each(function () {
              var i = e(this), s = '<img class="rsImg" src="' + (i.is("a") ? i.attr("href") : i.text()) + '" />';
              n ? t.content = e(s) : i.replaceWith(s)
            }), i = n ? t.content : t.content.find("img.rsImg"), c(), i.eq(0).addClass("rsMainSlideImage"), t.iW && t.iH && (t.isLoaded || s._q2(t), r()), t.isLoading = !0, t.isBig) e("<img />").on("load.rs error.rs", function (t) {
              e(this).off("load.rs error.rs"), o([this], !0)
            }).attr("src", t.image); else {
              t.loaded = [], t.numStartedLoad = 0, i = function (i) {
                e(this).off("load.rs error.rs"), t.loaded.push(this), t.loaded.length === t.numStartedLoad && o(t.loaded, !1)
              };
              for (var a = 0; a < t.images.length; a++) {
                var l = e("<img />");
                t.numStartedLoad++, l.on("load.rs error.rs", i).attr("src", t.images[a])
              }
            }
          }
        } else t.isRendered = !0, t.isLoaded = !0, t.isLoading = !1, r(!0)
      }, o = function (e, i) {
        if (e.length) {
          var s = e[0];
          if (i !== t.isBig) (s = t.holder.children()) && 1 < s.length && d(); else if (t.iW && t.iH) a(); else if (t.iW = s.width, t.iH = s.height, t.iW && t.iH) a(); else {
            var n = new Image;
            n.onload = function () {
              n.width ? (t.iW = n.width, t.iH = n.height, a()) : setTimeout(function () {
                n.width && (t.iW = n.width, t.iH = n.height), a()
              }, 1e3)
            }, n.src = s.src
          }
        } else a()
      }, a = function () {
        t.isLoaded = !0, t.isLoading = !1, r(), d(), l()
      }, r = function () {
        if (!t.isAppended && s.ev) {
          var e = s.st.visibleNearby, n = t.id - s._o;
          i || t.appendOnLoaded || !s.st.fadeinLoadedSlide || 0 !== n && (!(e || s._r2 || s._l2) || -1 !== n && 1 !== n) || (e = {
            visibility: "visible",
            opacity: 0
          }, e[s._g + "transition"] = "opacity 400ms ease-in-out", t.content.css(e), setTimeout(function () {
            t.content.css("opacity", 1)
          }, 16)), t.holder.find(".rsPreloader").length ? t.holder.append(t.content) : t.holder.html(t.content), t.isAppended = !0, t.isLoaded && (s._q2(t), l()), t.sizeReady || (t.sizeReady = !0, setTimeout(function () {
            s.ev.trigger("rsMaybeSizeReady", t)
          }, 100))
        }
      }, l = function () {
        !t.loadedTriggered && s.ev && (t.isLoaded = t.loadedTriggered = !0, t.holder.trigger("rsAfterContentSet"), s.ev.trigger("rsAfterContentSet", t))
      }, c = function () {
        s.st.usePreloader && t.holder.html(s._q1.clone())
      }, d = function (e) {
        s.st.usePreloader && (e = t.holder.find(".rsPreloader"), e.length && e.remove())
      };
      t.isLoaded ? r() : i ? !s._l && t.images && t.iW && t.iH ? n() : (t.holder.isWaiting = !0, c(), t.holder.slideId = -99) : n()
    }, _p2: function (e, t, i) {
      this._p1.append(e.holder), e.appendOnLoaded = !1
    }, _g2: function (t, i) {
      var s, n = this, o = "touchstart" === t.type;
      if (n._s2 = o, n.ev.trigger("rsDragStart"), e(t.target).closest(".rsNoDrag", n._r1).length) return n.dragSuccess = !1, !0;
      if (!i && n._r2 && (n._t2 = !0, n._u2()), n.dragSuccess = !1, n._l2) o && (n._v2 = !0); else {
        if (o && (n._v2 = !1), n._w2(), o) {
          var a = t.originalEvent.touches;
          if (!(a && 0 < a.length)) return;
          s = a[0], 1 < a.length && (n._v2 = !0)
        } else t.preventDefault(), s = t, n.pointerEnabled && (s = s.originalEvent);
        n._l2 = !0, n._b.on(n._k1, function (e) {
          n._x2(e, i)
        }).on(n._l1, function (e) {
          n._y2(e, i)
        }), n._z2 = "", n._a3 = !1, n._b3 = s.pageX, n._c3 = s.pageY, n._d3 = n._v = (i ? n._e3 : n._h) ? s.pageX : s.pageY, n._f3 = 0, n._g3 = 0, n._h3 = i ? n._i3 : n._p, n._j3 = (new Date).getTime(), o && n._e1.on(n._m1, function (e) {
          n._y2(e, i)
        })
      }
    }, _k3: function (e, t) {
      if (this._l3) {
        var i = this._m3, s = e.pageX - this._b3, n = e.pageY - this._c3, o = this._h3 + s, a = this._h3 + n,
          r = t ? this._e3 : this._h, o = r ? o : a, a = this._z2;
        this._a3 = !0, this._b3 = e.pageX, this._c3 = e.pageY, "x" === a && 0 !== s ? this._f3 = 0 < s ? 1 : -1 : "y" === a && 0 !== n && (this._g3 = 0 < n ? 1 : -1), a = r ? this._b3 : this._c3, s = r ? s : n, t ? o > this._n3 ? o = this._h3 + s * this._n1 : o < this._o3 && (o = this._h3 + s * this._n1) : this._z || (0 >= this.currSlideId && 0 < a - this._d3 && (o = this._h3 + s * this._n1), this.currSlideId >= this.numSlides - 1 && 0 > a - this._d3 && (o = this._h3 + s * this._n1)), this._h3 = o, 200 < i - this._j3 && (this._j3 = i, this._v = a), t ? this._q3(this._h3) : this._l && this._p3(this._h3)
      }
    }, _x2: function (e, t) {
      var i, s = this, n = "touchmove" === e.type;
      if (!s._s2 || n) {
        if (n) {
          if (s._r3) return;
          var o = e.originalEvent.touches;
          if (!o) return;
          if (1 < o.length) return;
          i = o[0]
        } else i = e, s.pointerEnabled && (i = i.originalEvent);
        if (s._a3 || (s._e && (t ? s._s3 : s._p1).css(s._g + s._u1, "0s"), function a() {
          s._l2 && (s._t3 = requestAnimationFrame(a), s._u3 && s._k3(s._u3, t))
        }()), s._l3) e.preventDefault(), s._m3 = (new Date).getTime(), s._u3 = i; else if (o = t ? s._e3 : s._h, i = Math.abs(i.pageX - s._b3) - Math.abs(i.pageY - s._c3) - (o ? -7 : 7), 7 < i) {
          if (o) e.preventDefault(), s._z2 = "x"; else if (n) return void s._v3(e);
          s._l3 = !0
        } else if (-7 > i) {
          if (o) {
            if (n) return void s._v3(e)
          } else e.preventDefault(), s._z2 = "y";
          s._l3 = !0
        }
      }
    }, _v3: function (e, t) {
      this._r3 = !0, this._a3 = this._l2 = !1, this._y2(e)
    }, _y2: function (t, i) {
      function s(e) {
        return 100 > e ? 100 : 500 < e ? 500 : e
      }

      function n(e, t) {
        (c._l || i) && (r = (-c._u - c._d1) * c._w, l = Math.abs(c._p - r), c._c = l / t, e && (c._c += 250), c._c = s(c._c), c._x3(r, !1))
      }

      var o, a, r, l, c = this;
      if (o = -1 < t.type.indexOf("touch"), !c._s2 || o) if (c._s2 = !1, c.ev.trigger("rsDragRelease"), c._u3 = null, c._l2 = !1, c._r3 = !1, c._l3 = !1, c._m3 = 0, cancelAnimationFrame(c._t3), c._a3 && (i ? c._q3(c._h3) : c._l && c._p3(c._h3)), c._b.off(c._k1).off(c._l1), o && c._e1.off(c._m1), c._i1(), !c._a3 && !c._v2 && i && c._w3) {
        var d = e(t.target).closest(".rsNavItem");
        d.length && c.goTo(d.index())
      } else {
        if (a = i ? c._e3 : c._h, !c._a3 || "y" === c._z2 && a || "x" === c._z2 && !a) {
          if (i || !c._t2) return c._t2 = !1, void (c.dragSuccess = !1);
          if (c._t2 = !1, c.st.navigateByClick) return c._i2(c.pointerEnabled ? t.originalEvent : t), void (c.dragSuccess = !0);
          c.dragSuccess = !0
        } else c.dragSuccess = !0;
        c._t2 = !1, c._z2 = "";
        var u = c.st.minSlideOffset;
        o = o ? t.originalEvent.changedTouches[0] : c.pointerEnabled ? t.originalEvent : t;
        var h = a ? o.pageX : o.pageY, f = c._d3;
        o = c._v;
        var p = c.currSlideId, m = c.numSlides, _ = a ? c._f3 : c._g3, g = c._z;
        if (Math.abs(h - f), o = h - o, a = (new Date).getTime() - c._j3, a = Math.abs(o) / a, 0 === _ || 1 >= m) n(!0, a); else {
          if (!g && !i) if (0 >= p) {
            if (0 < _) return void n(!0, a)
          } else if (p >= m - 1 && 0 > _) return void n(!0, a);
          if (i) {
            if (r = c._i3, r > c._n3) r = c._n3; else if (r < c._o3) r = c._o3; else {
              if (h = a * a / .006, d = -c._i3, f = c._y3 - c._z3 + c._i3, 0 < o && h > d ? (d += c._z3 / (15 / (h / a * .003)), a = a * d / h, h = d) : 0 > o && h > f && (f += c._z3 / (15 / (h / a * .003)), a = a * f / h, h = f), d = Math.max(Math.round(a / .003), 50), r += h * (0 > o ? -1 : 1), r > c._n3) return void c._a4(r, d, !0, c._n3, 200);
              if (r < c._o3) return void c._a4(r, d, !0, c._o3, 200)
            }
            c._a4(r, d, !0)
          } else d = function (e) {
            var t = Math.floor(e / c._w);
            return e - t * c._w > u && t++, t
          }, f + u < h ? 0 > _ ? n(!1, a) : (d = d(h - f), c._m2(c.currSlideId - d, s(Math.abs(c._p - (-c._u - c._d1 + d) * c._w) / a), !1, !0, !0)) : f - u > h ? 0 < _ ? n(!1, a) : (d = d(f - h), c._m2(c.currSlideId + d, s(Math.abs(c._p - (-c._u - c._d1 - d) * c._w) / a), !1, !0, !0)) : n(!1, a)
        }
      }
    }, _p3: function (e) {
      e = this._p = e, this._e ? this._p1.css(this._x1, this._y1 + (this._h ? e + this._z1 + 0 : 0 + this._z1 + e) + this._a2) : this._p1.css(this._h ? this._x1 : this._w1, e)
    }, updateSliderSize: function (e) {
      var t, i;
      if (this.slider) {
        if (this.st.autoScaleSlider) {
          var s = this.st.autoScaleSliderWidth, n = this.st.autoScaleSliderHeight;
          this.st.autoScaleHeight ? (t = this.slider.width(), t != this.width && (this.slider.css("height", n / s * t), t = this.slider.width()), i = this.slider.height()) : (i = this.slider.height(), i != this.height && (this.slider.css("width", s / n * i), i = this.slider.height()), t = this.slider.width())
        } else t = this.slider.width(), i = this.slider.height();
        if (e || t != this.width || i != this.height) {
          for (this.width = t, this.height = i, this._b4 = t, this._c4 = i, this.ev.trigger("rsBeforeSizeSet"), this.ev.trigger("rsAfterSizePropSet"), this._e1.css({
            width: this._b4,
            height: this._c4
          }), this._w = (this._h ? this._b4 : this._c4) + this.st.slidesSpacing, this._d4 = this.st.imageScalePadding, t = 0; t < this.slides.length; t++) e = this.slides[t], e.positionSet = !1, e && e.images && e.isLoaded && (e.isRendered = !1, this._q2(e));
          if (this._e4) for (t = 0; t < this._e4.length; t++) e = this._e4[t], e.holder.css(this._i, (e.id + this._d1) * this._w);
          this._n2(), this._l && (this._e && this._p1.css(this._g + "transition-duration", "0s"), this._p3((-this._u - this._d1) * this._w)), this.ev.trigger("rsOnUpdateNav")
        }
        this._j2 = this._e1.offset(), this._j2 = this._j2[this._i]
      }
    }, appendSlide: function (t, i) {
      var s = this._s(t);
      (isNaN(i) || i > this.numSlides) && (i = this.numSlides), this.slides.splice(i, 0, s), this.slidesJQ.splice(i, 0, e('<div style="' + (this._l ? "position:absolute;" : this._n) + '" class="rsSlide"></div>')), i <= this.currSlideId && this.currSlideId++, this.ev.trigger("rsOnAppendSlide", [s, i]), this._f4(i), i === this.currSlideId && this.ev.trigger("rsAfterSlideChange")
    }, removeSlide: function (e) {
      var t = this.slides[e];
      t && (t.holder && t.holder.remove(), e < this.currSlideId && this.currSlideId--, this.slides.splice(e, 1), this.slidesJQ.splice(e, 1), this.ev.trigger("rsOnRemoveSlide", [e]), this._f4(e), e === this.currSlideId && this.ev.trigger("rsAfterSlideChange"))
    }, _f4: function (e) {
      var t = this;
      for (e = t.numSlides, e = 0 >= t._u ? 0 : Math.floor(t._u / e), t.numSlides = t.slides.length, 0 === t.numSlides ? (t.currSlideId = t._d1 = t._u = 0, t.currSlide = t._g4 = null) : t._u = e * t.numSlides + t.currSlideId, e = 0; e < t.numSlides; e++) t.slides[e].id = e;
      t.currSlide = t.slides[t.currSlideId], t._r1 = t.slidesJQ[t.currSlideId], t.currSlideId >= t.numSlides ? t.goTo(t.numSlides - 1) : 0 > t.currSlideId && t.goTo(0), t._t(), t._l && t._p1.css(t._g + t._u1, "0ms"), t._h4 && clearTimeout(t._h4), t._h4 = setTimeout(function () {
        t._l && t._p3((-t._u - t._d1) * t._w), t._n2(), t._l || t._r1.css({display: "block", opacity: 1})
      }, 14), t.ev.trigger("rsOnUpdateNav")
    }, _i1: function () {
      this._f1 && this._l && (this._g1 ? this._e1.css("cursor", this._g1) : (this._e1.removeClass("grabbing-cursor"), this._e1.addClass("grab-cursor")))
    }, _w2: function () {
      this._f1 && this._l && (this._h1 ? this._e1.css("cursor", this._h1) : (this._e1.removeClass("grab-cursor"), this._e1.addClass("grabbing-cursor")))
    }, next: function (e) {
      this._m2("next", this.st.transitionSpeed, !0, !e)
    }, prev: function (e) {
      this._m2("prev", this.st.transitionSpeed, !0, !e)
    }, _m2: function (e, t, i, s, n) {
      var o, a, r, l = this;
      if (l.ev.trigger("rsBeforeMove", [e, s]), r = "next" === e ? l.currSlideId + 1 : "prev" === e ? l.currSlideId - 1 : e = parseInt(e, 10), !l._z) {
        if (0 > r) return void l._i4("left", !s);
        if (r >= l.numSlides) return void l._i4("right", !s)
      }
      l._r2 && (l._u2(!0), i = !1), a = r - l.currSlideId, r = l._o2 = l.currSlideId;
      var c = l.currSlideId + a;
      s = l._u;
      var d;
      l._z ? (c = l._n2(!1, c), s += a) : s = c, l._o = c, l._g4 = l.slidesJQ[l.currSlideId], l._u = s, l.currSlideId = l._o, l.currSlide = l.slides[l.currSlideId], l._r1 = l.slidesJQ[l.currSlideId];
      var c = l.st.slidesDiff, u = Boolean(0 < a);
      a = Math.abs(a);
      var h = Math.floor(r / l._y), f = Math.floor((r + (u ? c : -c)) / l._y),
        h = (u ? Math.max(h, f) : Math.min(h, f)) * l._y + (u ? l._y - 1 : 0);
      if (h > l.numSlides - 1 ? h = l.numSlides - 1 : 0 > h && (h = 0), r = u ? h - r : r - h, r > l._y && (r = l._y), a > r + c) for (l._d1 += (a - (r + c)) * (u ? -1 : 1), t *= 1.4, r = 0; r < l.numSlides; r++) l.slides[r].positionSet = !1;
      l._c = t, l._n2(!0), n || (d = !0), o = (-s - l._d1) * l._w, d ? setTimeout(function () {
        l._j4 = !1, l._x3(o, e, !1, i), l.ev.trigger("rsOnUpdateNav")
      }, 0) : (l._x3(o, e, !1, i), l.ev.trigger("rsOnUpdateNav"))
    }, _f2: function () {
      this.st.arrowsNav && (1 >= this.numSlides ? (this._c2.css("display", "none"), this._d2.css("display", "none")) : (this._c2.css("display", "block"), this._d2.css("display", "block"), this._z || this.st.loopRewind || (0 === this.currSlideId ? this._c2.addClass("rsArrowDisabled") : this._c2.removeClass("rsArrowDisabled"), this.currSlideId === this.numSlides - 1 ? this._d2.addClass("rsArrowDisabled") : this._d2.removeClass("rsArrowDisabled"))))
    }, _x3: function (t, i, s, n, o) {
      function a() {
        var e;
        r && (e = r.data("rsTimeout")) && (r !== l && r.css({
          opacity: 0,
          display: "none",
          zIndex: 0
        }), clearTimeout(e), r.data("rsTimeout", "")), (e = l.data("rsTimeout")) && (clearTimeout(e), l.data("rsTimeout", ""))
      }

      var r, l, c = this, d = {};
      isNaN(c._c) && (c._c = 400), c._p = c._h3 = t, c.ev.trigger("rsBeforeAnimStart"), c._e ? c._l ? (c._c = parseInt(c._c, 10), s = c._g + c._v1, d[c._g + c._u1] = c._c + "ms", d[s] = n ? e.rsCSS3Easing[c.st.easeInOut] : e.rsCSS3Easing[c.st.easeOut], c._p1.css(d), n || !c.hasTouch ? setTimeout(function () {
        c._p3(t)
      }, 5) : c._p3(t)) : (c._c = c.st.transitionSpeed, r = c._g4, l = c._r1, l.data("rsTimeout") && l.css("opacity", 0), a(), r && r.data("rsTimeout", setTimeout(function () {
        d[c._g + c._u1] = "0ms", d.zIndex = 0, d.display = "none", r.data("rsTimeout", ""), r.css(d), setTimeout(function () {
          r.css("opacity", 0)
        }, 16)
      }, c._c + 60)), d.display = "block", d.zIndex = c._m, d.opacity = 0, d[c._g + c._u1] = "0ms", d[c._g + c._v1] = e.rsCSS3Easing[c.st.easeInOut], l.css(d), l.data("rsTimeout", setTimeout(function () {
        l.css(c._g + c._u1, c._c + "ms"), l.data("rsTimeout", setTimeout(function () {
          l.css("opacity", 1), l.data("rsTimeout", "")
        }, 20))
      }, 20))) : c._l ? (d[c._h ? c._x1 : c._w1] = t + "px", c._p1.animate(d, c._c, n ? c.st.easeInOut : c.st.easeOut)) : (r = c._g4, l = c._r1, l.stop(!0, !0).css({
        opacity: 0,
        display: "block",
        zIndex: c._m
      }), c._c = c.st.transitionSpeed, l.animate({opacity: 1}, c._c, c.st.easeInOut), a(), r && r.data("rsTimeout", setTimeout(function () {
        r.stop(!0, !0).css({opacity: 0, display: "none", zIndex: 0})
      }, c._c + 60))), c._r2 = !0, c.loadingTimeout && clearTimeout(c.loadingTimeout), c.loadingTimeout = o ? setTimeout(function () {
        c.loadingTimeout = null, o.call()
      }, c._c + 60) : setTimeout(function () {
        c.loadingTimeout = null, c._k4(i)
      }, c._c + 60)
    }, _u2: function (e) {
      if (this._r2 = !1, clearTimeout(this.loadingTimeout), this._l) if (this._e) {
        if (!e) {
          e = this._p;
          var t = this._h3 = this._l4();
          this._p1.css(this._g + this._u1, "0ms"), e !== t && this._p3(t)
        }
      } else this._p1.stop(!0), this._p = parseInt(this._p1.css(this._h ? this._x1 : this._w1), 10); else 20 < this._m ? this._m = 10 : this._m++
    }, _l4: function () {
      var e = window.getComputedStyle(this._p1.get(0), null).getPropertyValue(this._g + "transform").replace(/^matrix\(/i, "").split(/, |\)$/g),
        t = 0 === e[0].indexOf("matrix3d");
      return parseInt(e[this._h ? t ? 12 : 4 : t ? 13 : 5], 10)
    }, _m4: function (e, t) {
      return this._e ? this._y1 + (t ? e + this._z1 + 0 : 0 + this._z1 + e) + this._a2 : e
    }, _k4: function (e) {
      this._l || (this._r1.css("z-index", 0), this._m = 10), this._r2 = !1, this.staticSlideId = this.currSlideId, this._n2(), this._n4 = !1, this.ev.trigger("rsAfterSlideChange")
    }, _i4: function (e, t) {
      var i = this, s = (-i._u - i._d1) * i._w;
      if (0 !== i.numSlides && !i._r2) if (i.st.loopRewind) i.goTo("left" === e ? i.numSlides - 1 : 0, t); else if (i._l) {
        i._c = 200;
        var n = function () {
          i._r2 = !1
        };
        i._x3(s + ("left" === e ? 30 : -30), "", !1, !0, function () {
          i._r2 = !1, i._x3(s, "", !1, !0, n)
        })
      }
    }, _q2: function (e, t) {
      if (!e.isRendered) {
        var i, s, n = e.content, o = "rsMainSlideImage", a = this.st.imageAlignCenter, r = this.st.imageScaleMode;
        if (e.videoURL && (o = "rsVideoContainer", "fill" !== r ? i = !0 : (s = n, s.hasClass(o) || (s = s.find("." + o)), s.css({
          width: "100%",
          height: "100%"
        }), o = "rsMainSlideImage")), n.hasClass(o) || (n = n.find("." + o)), n) {
          var l = e.iW, c = e.iH;
          if (e.isRendered = !0, "none" !== r || a) {
            o = "fill" !== r ? this._d4 : 0, s = this._b4 - 2 * o;
            var d, u, h = this._c4 - 2 * o, f = {};
            "fit-if-smaller" === r && (l > s || c > h) && (r = "fit"), "fill" !== r && "fit" !== r || (d = s / l, u = h / c, d = "fill" == r ? d > u ? d : u : "fit" == r ? d < u ? d : u : 1, l = Math.ceil(l * d, 10), c = Math.ceil(c * d, 10)), "none" !== r && (f.width = l, f.height = c, i && n.find(".rsImg").css({
              width: "100%",
              height: "100%"
            })), a && (f.marginLeft = Math.floor((s - l) / 2) + o, f.marginTop = Math.floor((h - c) / 2) + o), n.css(f)
          }
        }
      }
    }
  }, e.rsProto = t.prototype, e.fn.royalSlider = function (i) {
    var s = arguments;
    return this.each(function () {
      var n = e(this);
      if ("object" != typeof i && i) {
        if ((n = n.data("royalSlider")) && n[i]) return n[i].apply(n, Array.prototype.slice.call(s, 1))
      } else n.data("royalSlider") || n.data("royalSlider", new t(n, i))
    })
  }, e.fn.royalSlider.defaults = {
    slidesSpacing: 8,
    startSlideId: 0,
    loop: !1,
    loopRewind: !1,
    numImagesToPreload: 4,
    fadeinLoadedSlide: !0,
    slidesOrientation: "horizontal",
    transitionType: "move",
    transitionSpeed: 600,
    controlNavigation: "bullets",
    controlsInside: !0,
    arrowsNav: !0,
    arrowsNavAutoHide: !0,
    navigateByClick: !0,
    randomizeSlides: !1,
    sliderDrag: !0,
    sliderTouch: !0,
    keyboardNavEnabled: !1,
    fadeInAfterLoaded: !0,
    allowCSS3: !0,
    allowCSS3OnWebkit: !0,
    addActiveClass: !1,
    autoHeight: !1,
    easeOut: "easeOutSine",
    easeInOut: "easeInOutSine",
    minSlideOffset: 10,
    imageScaleMode: "fit-if-smaller",
    imageAlignCenter: !0,
    imageScalePadding: 4,
    usePreloader: !0,
    autoScaleSlider: !1,
    autoScaleSliderWidth: 800,
    autoScaleSliderHeight: 400,
    autoScaleHeight: !0,
    arrowsNavHideOnTouch: !1,
    globalCaption: !1,
    slidesDiff: 2
  }, e.rsCSS3Easing = {
    easeOutSine: "cubic-bezier(0.390, 0.575, 0.565, 1.000)",
    easeInOutSine: "cubic-bezier(0.445, 0.050, 0.550, 0.950)"
  }, e.extend(jQuery.easing, {
    easeInOutSine: function (e, t, i, s, n) {
      return -s / 2 * (Math.cos(Math.PI * t / n) - 1) + i
    }, easeOutSine: function (e, t, i, s, n) {
      return s * Math.sin(t / n * (Math.PI / 2)) + i
    }, easeOutCubic: function (e, t, i, s, n) {
      return s * ((t = t / n - 1) * t * t + 1) + i
    }
  })
}(jQuery, window), function (e) {
  e.extend(e.rsProto, {
    _i5: function () {
      var t = this;
      "bullets" === t.st.controlNavigation && (t.ev.one("rsAfterPropsSetup", function () {
        t._j5 = !0, t.slider.addClass("rsWithBullets");
        for (var i = '<div class="rsNav rsBullets">', s = 0; s < t.numSlides; s++) i += '<div class="rsNavItem rsBullet"><span></span></div>';
        t._k5 = i = e(i + "</div>"), t._l5 = i.appendTo(t.slider).children(), t._k5.on("click.rs", ".rsNavItem", function (i) {
          t._m5 || t.goTo(e(this).index())
        })
      }), t.ev.on("rsOnAppendSlide", function (e, i, s) {
        s >= t.numSlides ? t._k5.append('<div class="rsNavItem rsBullet"><span></span></div>') : t._l5.eq(s).before('<div class="rsNavItem rsBullet"><span></span></div>'), t._l5 = t._k5.children()
      }), t.ev.on("rsOnRemoveSlide", function (e, i) {
        var s = t._l5.eq(i);
        s && s.length && (s.remove(), t._l5 = t._k5.children())
      }), t.ev.on("rsOnUpdateNav", function () {
        var e = t.currSlideId;
        t._n5 && t._n5.removeClass("rsNavSelected"), e = t._l5.eq(e), e.addClass("rsNavSelected"), t._n5 = e
      }))
    }
  }), e.rsModules.bullets = e.rsProto._i5
}(jQuery), function (e) {
  e.extend(e.rsProto, {
    _h6: function () {
      var t = this;
      "thumbnails" === t.st.controlNavigation && (t._i6 = {
        drag: !0,
        touch: !0,
        orientation: "horizontal",
        navigation: !0,
        arrows: !0,
        arrowLeft: null,
        arrowRight: null,
        spacing: 4,
        arrowsAutoHide: !1,
        appendSpan: !1,
        transitionSpeed: 600,
        autoCenter: !0,
        fitInViewport: !0,
        firstMargin: !0,
        paddingTop: 0,
        paddingBottom: 0
      }, t.st.thumbs = e.extend({}, t._i6, t.st.thumbs), t._j6 = !0, !1 === t.st.thumbs.firstMargin ? t.st.thumbs.firstMargin = 0 : !0 === t.st.thumbs.firstMargin && (t.st.thumbs.firstMargin = t.st.thumbs.spacing), t.ev.on("rsBeforeParseNode", function (t, i, s) {
        i = e(i), s.thumbnail = i.find(".rsTmb").remove(), s.thumbnail.length ? s.thumbnail = e(document.createElement("div")).append(s.thumbnail).html() : (s.thumbnail = i.attr("data-rsTmb"), s.thumbnail || (s.thumbnail = i.find(".rsImg").attr("data-rsTmb")), s.thumbnail = s.thumbnail ? '<img src="' + s.thumbnail + '"/>' : "")
      }), t.ev.one("rsAfterPropsSetup", function () {
        t._k6()
      }), t._n5 = null, t.ev.on("rsOnUpdateNav", function () {
        var i = e(t._l5[t.currSlideId]);
        i !== t._n5 && (t._n5 && (t._n5.removeClass("rsNavSelected"), t._n5 = null), t._l6 && t._m6(t.currSlideId), t._n5 = i.addClass("rsNavSelected"))
      }), t.ev.on("rsOnAppendSlide", function (e, i, s) {
        e = "<div" + t._n6 + ' class="rsNavItem rsThumb">' + t._o6 + i.thumbnail + "</div>", t._e && t._s3.css(t._g + "transition-duration", "0ms"), s >= t.numSlides ? t._s3.append(e) : t._l5.eq(s).before(e), t._l5 = t._s3.children(), t.updateThumbsSize(!0)
      }), t.ev.on("rsOnRemoveSlide", function (e, i) {
        var s = t._l5.eq(i);
        s && (t._e && t._s3.css(t._g + "transition-duration", "0ms"), s.remove(), t._l5 = t._s3.children(), t.updateThumbsSize(!0))
      }))
    }, _k6: function () {
      var t, i, s = this, n = "rsThumbs", o = s.st.thumbs, a = "", r = o.spacing;
      s._j5 = !0, s._e3 = "vertical" !== o.orientation, s._n6 = t = r ? ' style="margin-' + (s._e3 ? "right" : "bottom") + ":" + r + 'px;"' : "", s._i3 = 0, s._p6 = !1, s._m5 = !1, s._l6 = !1, s._q6 = o.arrows && o.navigation, i = s._e3 ? "Hor" : "Ver", s.slider.addClass("rsWithThumbs rsWithThumbs" + i), a += '<div class="rsNav rsThumbs rsThumbs' + i + '"><div class="' + n + 'Container">', s._o6 = o.appendSpan ? '<span class="thumbIco"></span>' : "";
      for (var l = 0; l < s.numSlides; l++) i = s.slides[l], a += "<div" + t + ' class="rsNavItem rsThumb">' + i.thumbnail + s._o6 + "</div>";
      a = e(a + "</div></div>"), t = {}, o.paddingTop && (t[s._e3 ? "paddingTop" : "paddingLeft"] = o.paddingTop), o.paddingBottom && (t[s._e3 ? "paddingBottom" : "paddingRight"] = o.paddingBottom), a.css(t), s._s3 = e(a).find("." + n + "Container"), s._q6 && (n += "Arrow", o.arrowLeft ? s._r6 = o.arrowLeft : (s._r6 = e('<div class="' + n + " " + n + 'Left"><div class="' + n + 'Icn"></div></div>'), a.append(s._r6)), o.arrowRight ? s._s6 = o.arrowRight : (s._s6 = e('<div class="' + n + " " + n + 'Right"><div class="' + n + 'Icn"></div></div>'), a.append(s._s6)), s._r6.click(function () {
        var e = (Math.floor(s._i3 / s._t6) + s._u6) * s._t6 + s.st.thumbs.firstMargin;
        s._a4(e > s._n3 ? s._n3 : e)
      }), s._s6.click(function () {
        var e = (Math.floor(s._i3 / s._t6) - s._u6) * s._t6 + s.st.thumbs.firstMargin;
        s._a4(e < s._o3 ? s._o3 : e)
      }), o.arrowsAutoHide && !s.hasTouch && (s._r6.css("opacity", 0), s._s6.css("opacity", 0), a.one("mousemove.rsarrowshover", function () {
        s._l6 && (s._r6.css("opacity", 1), s._s6.css("opacity", 1))
      }), a.hover(function () {
        s._l6 && (s._r6.css("opacity", 1), s._s6.css("opacity", 1))
      }, function () {
        s._l6 && (s._r6.css("opacity", 0), s._s6.css("opacity", 0))
      }))), s._k5 = a, s._l5 = s._s3.children(), s.msEnabled && s.st.thumbs.navigation && s._s3.css("-ms-touch-action", s._e3 ? "pan-y" : "pan-x"), s.slider.append(a), s._w3 = !0, s._v6 = r, o.navigation && s._e && s._s3.css(s._g + "transition-property", s._g + "transform"), s._k5.on("click.rs", ".rsNavItem", function (t) {
        s._m5 || s.goTo(e(this).index())
      }), s.ev.off("rsBeforeSizeSet.thumbs").on("rsBeforeSizeSet.thumbs", function () {
        s._w6 = s._e3 ? s._c4 : s._b4, s.updateThumbsSize(!0)
      }), s.ev.off("rsAutoHeightChange.thumbs").on("rsAutoHeightChange.thumbs", function (e, t) {
        s.updateThumbsSize(!0, t)
      })
    }, updateThumbsSize: function (e, t) {
      var i = this, s = i._l5.first(), n = {}, o = i._l5.length;
      i._t6 = (i._e3 ? s.outerWidth() : s.outerHeight()) + i._v6, i._y3 = o * i._t6 - i._v6, n[i._e3 ? "width" : "height"] = i._y3 + i._v6, i._z3 = i._e3 ? i._k5.width() : void 0 !== t ? t : i._k5.height(), i._w3 && (i.isFullscreen || i.st.thumbs.fitInViewport) && (i._e3 ? i._c4 = i._w6 - i._k5.outerHeight() : i._b4 = i._w6 - i._k5.outerWidth()), i._z3 && (i._o3 = -(i._y3 - i._z3) - i.st.thumbs.firstMargin, i._n3 = i.st.thumbs.firstMargin, i._u6 = Math.floor(i._z3 / i._t6), i._y3 < i._z3 ? (i.st.thumbs.autoCenter ? i._q3((i._z3 - i._y3) / 2) : i._q3(i._n3), i.st.thumbs.arrows && i._r6 && (i._r6.addClass("rsThumbsArrowDisabled"), i._s6.addClass("rsThumbsArrowDisabled")), i._l6 = !1, i._m5 = !1, i._k5.off(i._j1)) : i.st.thumbs.navigation && !i._l6 && (i._l6 = !0, !i.hasTouch && i.st.thumbs.drag || i.hasTouch && i.st.thumbs.touch) && (i._m5 = !0, i._k5.on(i._j1, function (e) {
        i._g2(e, !0)
      })), i._s3.css(n), e && t && i._m6(i.currSlideId, !0))
    }, setThumbsOrientation: function (e, t) {
      this._w3 && (this.st.thumbs.orientation = e, this._k5.remove(), this.slider.removeClass("rsWithThumbsHor rsWithThumbsVer"), this._k6(), this._k5.off(this._j1), t || this.updateSliderSize(!0))
    }, _q3: function (e) {
      this._i3 = e, this._e ? this._s3.css(this._x1, this._y1 + (this._e3 ? e + this._z1 + 0 : 0 + this._z1 + e) + this._a2) : this._s3.css(this._e3 ? this._x1 : this._w1, e)
    }, _a4: function (t, i, s, n, o) {
      var a = this;
      if (a._l6) {
        i || (i = a.st.thumbs.transitionSpeed), a._i3 = t, a._x6 && clearTimeout(a._x6), a._p6 && (a._e || a._s3.stop(), s = !0);
        var r = {};
        a._p6 = !0, a._e ? (r[a._g + "transition-duration"] = i + "ms", r[a._g + "transition-timing-function"] = s ? e.rsCSS3Easing[a.st.easeOut] : e.rsCSS3Easing[a.st.easeInOut], a._s3.css(r), a._q3(t)) : (r[a._e3 ? a._x1 : a._w1] = t + "px", a._s3.animate(r, i, s ? "easeOutCubic" : a.st.easeInOut)), n && (a._i3 = n), a._y6(), a._x6 = setTimeout(function () {
          a._p6 = !1, o && (a._a4(n, o, !0), o = null)
        }, i)
      }
    }, _y6: function () {
      this._q6 && (this._i3 === this._n3 ? this._r6.addClass("rsThumbsArrowDisabled") : this._r6.removeClass("rsThumbsArrowDisabled"), this._i3 === this._o3 ? this._s6.addClass("rsThumbsArrowDisabled") : this._s6.removeClass("rsThumbsArrowDisabled"))
    }, _m6: function (e, t) {
      var i, s = 0, n = e * this._t6 + 2 * this._t6 - this._v6 + this._n3, o = Math.floor(this._i3 / this._t6);
      this._l6 && (this._j6 && (t = !0, this._j6 = !1), n + this._i3 > this._z3 ? (e === this.numSlides - 1 && (s = 1), o = -e + this._u6 - 2 + s, i = o * this._t6 + this._z3 % this._t6 + this._v6 - this._n3) : 0 !== e ? (e - 1) * this._t6 <= -this._i3 + this._n3 && e - 1 <= this.numSlides - this._u6 && (i = (-e + 1) * this._t6 + this._n3) : i = this._n3, i !== this._i3 && (s = void 0 === i ? this._i3 : i, s > this._n3 ? this._q3(this._n3) : s < this._o3 ? this._q3(this._o3) : void 0 !== i && (t ? this._q3(i) : this._a4(i))), this._y6())
    }
  }), e.rsModules.thumbnails = e.rsProto._h6
}(jQuery), function (e) {
  e.extend(e.rsProto, {
    _f6: function () {
      var t = this;
      "tabs" === t.st.controlNavigation && (t.ev.on("rsBeforeParseNode", function (t, i, s) {
        i = e(i), s.thumbnail = i.find(".rsTmb").remove(), s.thumbnail.length ? s.thumbnail = e(document.createElement("div")).append(s.thumbnail).html() : (s.thumbnail = i.attr("data-rsTmb"), s.thumbnail || (s.thumbnail = i.find(".rsImg").attr("data-rsTmb")), s.thumbnail = s.thumbnail ? '<img src="' + s.thumbnail + '"/>' : "")
      }), t.ev.one("rsAfterPropsSetup", function () {
        t._g6()
      }), t.ev.on("rsOnAppendSlide", function (e, i, s) {
        s >= t.numSlides ? t._k5.append('<div class="rsNavItem rsTab">' + i.thumbnail + "</div>") : t._l5.eq(s).before('<div class="rsNavItem rsTab">' + item.thumbnail + "</div>"), t._l5 = t._k5.children()
      }), t.ev.on("rsOnRemoveSlide", function (e, i) {
        var s = t._l5.eq(i);
        s && (s.remove(), t._l5 = t._k5.children())
      }), t.ev.on("rsOnUpdateNav", function () {
        var e = t.currSlideId;
        t._n5 && t._n5.removeClass("rsNavSelected"), e = t._l5.eq(e), e.addClass("rsNavSelected"), t._n5 = e
      }))
    }, _g6: function () {
      var t, i = this;
      i._j5 = !0, t = '<div class="rsNav rsTabs">';
      for (var s = 0; s < i.numSlides; s++) t += '<div class="rsNavItem rsTab">' + i.slides[s].thumbnail + "</div>";
      t = e(t + "</div>"), i._k5 = t, i._l5 = t.children(".rsNavItem"), i.slider.append(t), i._k5.click(function (t) {
        t = e(t.target).closest(".rsNavItem"), t.length && i.goTo(t.index())
      })
    }
  }), e.rsModules.tabs = e.rsProto._f6
}(jQuery), function (e) {
  e.extend(e.rsProto, {
    _q5: function () {
      var t = this;
      t._r5 = {
        enabled: !1,
        keyboardNav: !0,
        buttonFS: !0,
        nativeFS: !1,
        doubleTap: !0
      }, t.st.fullscreen = e.extend({}, t._r5, t.st.fullscreen), t.st.fullscreen.enabled && t.ev.one("rsBeforeSizeSet", function () {
        t._s5()
      })
    }, _s5: function () {
      var t = this;
      if (t._t5 = !t.st.keyboardNavEnabled && t.st.fullscreen.keyboardNav, t.st.fullscreen.nativeFS) {
        var i = {
          supportsFullScreen: !1, isFullScreen: function () {
            return !1
          }, requestFullScreen: function () {
          }, cancelFullScreen: function () {
          }, fullScreenEventName: "", prefix: ""
        }, s = ["webkit", "moz", "o", "ms", "khtml"];
        if ("undefined" != typeof document.cancelFullScreen) i.supportsFullScreen = !0; else for (var n = 0, o = s.length; n < o; n++) if (i.prefix = s[n], "undefined" != typeof document[i.prefix + "CancelFullScreen"]) {
          i.supportsFullScreen = !0;
          break
        }
        i.supportsFullScreen ? (t.nativeFS = !0, i.fullScreenEventName = i.prefix + "fullscreenchange" + t.ns, i.isFullScreen = function () {
          switch (this.prefix) {
            case"":
              return document.fullScreen;
            case"webkit":
              return document.webkitIsFullScreen;
            default:
              return document[this.prefix + "FullScreen"]
          }
        }, i.requestFullScreen = function (e) {
          return "" === this.prefix ? e.requestFullScreen() : e[this.prefix + "RequestFullScreen"]()
        }, i.cancelFullScreen = function (e) {
          return "" === this.prefix ? document.cancelFullScreen() : document[this.prefix + "CancelFullScreen"]()
        }, t._u5 = i) : t._u5 = !1
      }
      t.st.fullscreen.buttonFS && (t._v5 = e('<div class="rsFullscreenBtn"><div class="rsFullscreenIcn"></div></div>').appendTo(t._o1).on("click.rs", function () {
        t.isFullscreen ? t.exitFullscreen() : t.enterFullscreen()
      }))
    }, enterFullscreen: function (t) {
      var i = this;
      if (i._u5) {
        if (!t) return i._b.on(i._u5.fullScreenEventName, function (e) {
          i._u5.isFullScreen() ? i.enterFullscreen(!0) : i.exitFullscreen(!0)
        }), void i._u5.requestFullScreen(e("html")[0]);
        i._u5.requestFullScreen(e("html")[0]);
      }
      if (!i._w5) {
        i._w5 = !0, i._b.on("keyup" + i.ns + "fullscreen", function (e) {
          27 === e.keyCode && i.exitFullscreen()
        }), i._t5 && i._b2(), t = e(window), i._x5 = t.scrollTop(), i._y5 = t.scrollLeft(), i._z5 = e("html").attr("style"), i._a6 = e("body").attr("style"), i._b6 = i.slider.attr("style"), e("body, html").css({
          overflow: "hidden",
          height: "100%",
          width: "100%",
          margin: "0",
          padding: "0"
        }), i.slider.addClass("rsFullscreen");
        var s;
        for (s = 0; s < i.numSlides; s++) t = i.slides[s], t.isRendered = !1, t.bigImage && (t.isBig = !0, t.isMedLoaded = t.isLoaded, t.isMedLoading = t.isLoading, t.medImage = t.image, t.medIW = t.iW, t.medIH = t.iH, t.slideId = -99, t.bigImage !== t.medImage && (t.sizeType = "big"), t.isLoaded = t.isBigLoaded, t.isLoading = !1, t.image = t.bigImage, t.images[0] = t.bigImage, t.iW = t.bigIW, t.iH = t.bigIH, t.isAppended = t.contentAdded = !1, i._c6(t));
        i.isFullscreen = !0, i._w5 = !1, i.updateSliderSize(), i.ev.trigger("rsEnterFullscreen")
      }
    }, exitFullscreen: function (t) {
      var i = this;
      if (i._u5) {
        if (!t) return void i._u5.cancelFullScreen(e("html")[0]);
        i._b.off(i._u5.fullScreenEventName)
      }
      if (!i._w5) {
        i._w5 = !0, i._b.off("keyup" + i.ns + "fullscreen"), i._t5 && i._b.off("keydown" + i.ns), e("html").attr("style", i._z5 || ""), e("body").attr("style", i._a6 || "");
        var s;
        for (s = 0; s < i.numSlides; s++) t = i.slides[s], t.isRendered = !1, t.bigImage && (t.isBig = !1, t.slideId = -99, t.isBigLoaded = t.isLoaded, t.isBigLoading = t.isLoading, t.bigImage = t.image, t.bigIW = t.iW, t.bigIH = t.iH, t.isLoaded = t.isMedLoaded, t.isLoading = !1, t.image = t.medImage, t.images[0] = t.medImage, t.iW = t.medIW, t.iH = t.medIH, t.isAppended = t.contentAdded = !1, i._c6(t, !0), t.bigImage !== t.medImage && (t.sizeType = "med"));
        i.isFullscreen = !1, t = e(window), t.scrollTop(i._x5), t.scrollLeft(i._y5), i._w5 = !1, i.slider.removeClass("rsFullscreen"), i.updateSliderSize(), setTimeout(function () {
          i.updateSliderSize()
        }, 1), i.ev.trigger("rsExitFullscreen")
      }
    }, _c6: function (t, i) {
      var s = t.isLoaded || t.isLoading ? '<img class="rsImg rsMainSlideImage" src="' + t.image + '"/>' : '<a class="rsImg rsMainSlideImage" href="' + t.image + '"></a>';
      t.content.hasClass("rsImg") ? t.content = e(s) : t.content.find(".rsImg").eq(0).replaceWith(s), t.isLoaded || t.isLoading || !t.holder || t.holder.html(t.content)
    }
  }), e.rsModules.fullscreen = e.rsProto._q5
}(jQuery), function (e) {
  e.extend(e.rsProto, {
    _x4: function () {
      var t, i = this;
      i._y4 = {
        enabled: !1,
        stopAtAction: !0,
        pauseOnHover: !0,
        delay: 2e3
      }, !i.st.autoPlay && i.st.autoplay && (i.st.autoPlay = i.st.autoplay), i.st.autoPlay = e.extend({}, i._y4, i.st.autoPlay), i.st.autoPlay.enabled && (i.ev.on("rsBeforeParseNode", function (i, s, n) {
        s = e(s), (t = s.attr("data-rsDelay")) && (n.customDelay = parseInt(t, 10))
      }), i.ev.one("rsAfterInit", function () {
        i._z4()
      }), i.ev.on("rsBeforeDestroy", function () {
        i.stopAutoPlay(), i.slider.off("mouseenter mouseleave"), e(window).off("blur" + i.ns + " focus" + i.ns)
      }))
    }, _z4: function () {
      var t = this;
      t.startAutoPlay(), t.ev.on("rsAfterContentSet", function (e, i) {
        t._l2 || t._r2 || !t._a5 || i !== t.currSlide || t._b5()
      }), t.ev.on("rsDragRelease", function () {
        t._a5 && t._c5 && (t._c5 = !1, t._b5())
      }), t.ev.on("rsAfterSlideChange", function () {
        t._a5 && t._c5 && (t._c5 = !1, t.currSlide.isLoaded && t._b5())
      }), t.ev.on("rsDragStart", function () {
        t._a5 && (t.st.autoPlay.stopAtAction ? t.stopAutoPlay() : (t._c5 = !0, t._d5()))
      }), t.ev.on("rsBeforeMove", function (e, i, s) {
        t._a5 && (s && t.st.autoPlay.stopAtAction ? t.stopAutoPlay() : (t._c5 = !0, t._d5()))
      }), t._e5 = !1, t.ev.on("rsVideoStop", function () {
        t._a5 && (t._e5 = !1, t._b5())
      }), t.ev.on("rsVideoPlay", function () {
        t._a5 && (t._c5 = !1, t._d5(), t._e5 = !0)
      }), e(window).on("blur" + t.ns, function () {
        t._a5 && (t._c5 = !0, t._d5())
      }).on("focus" + t.ns, function () {
        t._a5 && t._c5 && (t._c5 = !1, t._b5())
      }), t.st.autoPlay.pauseOnHover && (t._f5 = !1, t.slider.hover(function () {
        t._a5 && (t._c5 = !1, t._d5(), t._f5 = !0)
      }, function () {
        t._a5 && (t._f5 = !1, t._b5())
      }))
    }, toggleAutoPlay: function () {
      this._a5 ? this.stopAutoPlay() : this.startAutoPlay()
    }, startAutoPlay: function () {
      this._a5 = !0, this.currSlide.isLoaded && this._b5()
    }, stopAutoPlay: function () {
      this._e5 = this._f5 = this._c5 = this._a5 = !1, this._d5()
    }, _b5: function () {
      var e = this;
      e._f5 || e._e5 || (e._g5 = !0, e._h5 && clearTimeout(e._h5), e._h5 = setTimeout(function () {
        var t;
        e._z || e.st.loopRewind || (t = !0, e.st.loopRewind = !0), e.next(!0), t && (e.st.loopRewind = !1)
      }, e.currSlide.customDelay ? e.currSlide.customDelay : e.st.autoPlay.delay))
    }, _d5: function () {
      this._f5 || this._e5 || (this._g5 = !1, this._h5 && (clearTimeout(this._h5), this._h5 = null))
    }
  }), e.rsModules.autoplay = e.rsProto._x4
}(jQuery), function (e) {
  e.extend(e.rsProto, {
    _z6: function () {
      var t = this;
      t._a7 = {
        autoHideArrows: !0,
        autoHideControlNav: !1,
        autoHideBlocks: !1,
        autoHideCaption: !1,
        disableCSS3inFF: !0,
        youTubeCode: '<iframe src="http://www.youtube.com/embed/%id%?rel=1&showinfo=0&autoplay=1&wmode=transparent" frameborder="no"></iframe>',
        vimeoCode: '<iframe src="http://player.vimeo.com/video/%id%?byline=0&portrait=0&autoplay=1" frameborder="no" webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe>'
      }, t.st.video = e.extend({}, t._a7, t.st.video), t.ev.on("rsBeforeSizeSet", function () {
        t._b7 && setTimeout(function () {
          var e = t._r1, e = e.hasClass("rsVideoContainer") ? e : e.find(".rsVideoContainer");
          t._c7 && t._c7.css({width: e.width(), height: e.height()})
        }, 32)
      });
      var i = t._a.mozilla;
      t.ev.on("rsAfterParseNode", function (s, n, o) {
        if (s = e(n), o.videoURL) {
          t.st.video.disableCSS3inFF && i && (t._e = t._f = !1), n = e('<div class="rsVideoContainer"></div>');
          var a = e('<div class="rsBtnCenterer"><div class="rsPlayBtn"><div class="rsPlayBtnIcon"></div></div></div>');
          s.hasClass("rsImg") ? o.content = n.append(s).append(a) : o.content.find(".rsImg").wrap(n).after(a)
        }
      }), t.ev.on("rsAfterSlideChange", function () {
        t.stopVideo()
      })
    }, toggleVideo: function () {
      return this._b7 ? this.stopVideo() : this.playVideo()
    }, playVideo: function () {
      var t = this;
      if (!t._b7) {
        var i = t.currSlide;
        if (!i.videoURL) return !1;
        t._d7 = i;
        var s, n, o = t._e7 = i.content, i = i.videoURL;
        return i.match(/youtu\.be/i) || i.match(/youtube\.com/i) ? (n = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/, (n = i.match(n)) && 11 == n[7].length && (s = n[7]), void 0 !== s && (t._c7 = t.st.video.youTubeCode.replace("%id%", s))) : i.match(/vimeo\.com/i) && (n = /(www\.)?vimeo.com\/(\d+)($|\/)/, (n = i.match(n)) && (s = n[2]), void 0 !== s && (t._c7 = t.st.video.vimeoCode.replace("%id%", s))), t.videoObj = e(t._c7), t.ev.trigger("rsOnCreateVideoElement", [i]), t.videoObj.length && (t._c7 = e('<div class="rsVideoFrameHolder"><div class="rsPreloader"></div><div class="rsCloseVideoBtn"><div class="rsCloseVideoIcn"></div></div></div>'), t._c7.find(".rsPreloader").after(t.videoObj), o = o.hasClass("rsVideoContainer") ? o : o.find(".rsVideoContainer"), t._c7.css({
          width: o.width(),
          height: o.height()
        }).find(".rsCloseVideoBtn").off("click.rsv").on("click.rsv", function (e) {
          return t.stopVideo(), e.preventDefault(), e.stopPropagation(), !1
        }), o.append(t._c7), t.isIPAD && o.addClass("rsIOSVideo"), t._f7(!1), setTimeout(function () {
          t._c7.addClass("rsVideoActive")
        }, 10), t.ev.trigger("rsVideoPlay"), t._b7 = !0), !0
      }
      return !1
    }, stopVideo: function () {
      var e = this;
      return !!e._b7 && (e.isIPAD && e.slider.find(".rsCloseVideoBtn").remove(), e._f7(!0), setTimeout(function () {
        e.ev.trigger("rsOnDestroyVideoElement", [e.videoObj]);
        var t = e._c7.find("iframe");
        if (t.length) try {
          t.attr("src", "")
        } catch (i) {
        }
        e._c7.remove(), e._c7 = null
      }, 16), e.ev.trigger("rsVideoStop"), e._b7 = !1, !0)
    }, _f7: function (e, t) {
      var i = [], s = this.st.video;
      if (s.autoHideArrows && (this._c2 && (i.push(this._c2, this._d2), this._e2 = !e), this._v5 && i.push(this._v5)), s.autoHideControlNav && this._k5 && i.push(this._k5), s.autoHideBlocks && this._d7.animBlocks && i.push(this._d7.animBlocks), s.autoHideCaption && this.globalCaption && i.push(this.globalCaption), this.slider[e ? "removeClass" : "addClass"]("rsVideoPlaying"), i.length) for (s = 0; s < i.length; s++) e ? i[s].removeClass("rsHidden") : i[s].addClass("rsHidden")
    }
  }), e.rsModules.video = e.rsProto._z6
}(jQuery), function (e) {
  e.extend(e.rsProto, {
    _p4: function () {
      function t() {
        var e = s.currSlide;
        if (s.currSlide && s.currSlide.isLoaded && s._t4 !== e) {
          if (0 < s._s4.length) {
            for (i = 0; i < s._s4.length; i++) clearTimeout(s._s4[i]);
            s._s4 = []
          }
          if (0 < s._r4.length) {
            var t;
            for (i = 0; i < s._r4.length; i++) (t = s._r4[i]) && (s._e ? (t.block.css(s._g + s._u1, "0s"), t.block.css(t.css)) : t.block.stop(!0).css(t.css), s._t4 = null, e.animBlocksDisplayed = !1);
            s._r4 = []
          }
          e.animBlocks && (e.animBlocksDisplayed = !0, s._t4 = e, s._u4(e.animBlocks))
        }
      }

      var i, s = this;
      s._q4 = {
        fadeEffect: !0,
        moveEffect: "top",
        moveOffset: 20,
        speed: 400,
        easing: "easeOutSine",
        delay: 200
      }, s.st.block = e.extend({}, s._q4, s.st.block), s._r4 = [], s._s4 = [], s.ev.on("rsAfterInit", function () {
        t()
      }), s.ev.on("rsBeforeParseNode", function (t, i, s) {
        i = e(i), s.animBlocks = i.find(".rsABlock").css("display", "none"), s.animBlocks.length || (i.hasClass("rsABlock") ? s.animBlocks = i.css("display", "none") : s.animBlocks = !1)
      }), s.ev.on("rsAfterContentSet", function (e, i) {
        i.id === s.slides[s.currSlideId].id && setTimeout(function () {
          t()
        }, s.st.fadeinLoadedSlide ? 300 : 0)
      }), s.ev.on("rsAfterSlideChange", function () {
        t()
      })
    }, _v4: function (e, t) {
      setTimeout(function () {
        e.css(t)
      }, 6)
    }, _u4: function (t) {
      var i, s, n, o, a, r, l, c = this;
      c._s4 = [], t.each(function (t) {
        i = e(this), s = {}, n = {}, o = null;
        var d = i.attr("data-move-offset"), d = d ? parseInt(d, 10) : c.st.block.moveOffset;
        if (0 < d && ((r = i.data("move-effect")) ? (r = r.toLowerCase(), "none" === r ? r = !1 : "left" !== r && "top" !== r && "bottom" !== r && "right" !== r && (r = c.st.block.moveEffect, "none" === r && (r = !1))) : r = c.st.block.moveEffect, r && "none" !== r)) {
          var u;
          u = "right" === r || "left" === r;
          var h;
          l = !1, c._e ? (h = 0, a = c._x1) : (u ? isNaN(parseInt(i.css("right"), 10)) ? a = "left" : (a = "right", l = !0) : isNaN(parseInt(i.css("bottom"), 10)) ? a = "top" : (a = "bottom", l = !0), a = "margin-" + a, l && (d = -d), c._e ? h = parseInt(i.css(a), 10) : (h = i.data("rs-start-move-prop"), void 0 === h && (h = parseInt(i.css(a), 10), isNaN(h) && (h = 0), i.data("rs-start-move-prop", h)))), n[a] = c._m4("top" === r || "left" === r ? h - d : h + d, u), s[a] = c._m4(h, u)
        }
        d = i.attr("data-fade-effect"), d ? "none" !== d.toLowerCase() && "false" !== d.toLowerCase() || (d = !1) : d = c.st.block.fadeEffect, d && (n.opacity = 0, s.opacity = 1), (d || r) && (o = {}, o.hasFade = Boolean(d), Boolean(r) && (o.moveProp = a, o.hasMove = !0), o.speed = i.data("speed"), isNaN(o.speed) && (o.speed = c.st.block.speed), o.easing = i.data("easing"), o.easing || (o.easing = c.st.block.easing), o.css3Easing = e.rsCSS3Easing[o.easing], o.delay = i.data("delay"), isNaN(o.delay) && (o.delay = c.st.block.delay * t)), d = {}, c._e && (d[c._g + c._u1] = "0ms"), d.moveProp = s.moveProp, d.opacity = s.opacity, d.display = "none", c._r4.push({
          block: i,
          css: d
        }), c._v4(i, n), c._s4.push(setTimeout(function (e, t, i, s) {
          return function () {
            if (e.css("display", "block"), i) {
              var n = {};
              if (c._e) {
                var o = "";
                i.hasMove && (o += i.moveProp), i.hasFade && (i.hasMove && (o += ", "), o += "opacity"), n[c._g + c._t1] = o, n[c._g + c._u1] = i.speed + "ms", n[c._g + c._v1] = i.css3Easing, e.css(n), setTimeout(function () {
                  e.css(t)
                }, 24)
              } else setTimeout(function () {
                e.animate(t, i.speed, i.easing)
              }, 16)
            }
            delete c._s4[s]
          }
        }(i, s, o, t), 6 >= o.delay ? 12 : o.delay))
      })
    }
  }), e.rsModules.animatedBlocks = e.rsProto._p4
}(jQuery), function (e) {
  e.extend(e.rsProto, {
    _w4: function () {
      var e = this;
      if (e.st.autoHeight) {
        var t, i, s, n = !0, o = function (o) {
          s = e.slides[e.currSlideId], (t = s.holder) && (i = t.height()) && void 0 !== i && i > (e.st.minAutoHeight || 30) && (e._c4 = i, e._e || !o ? e._e1.css("height", i) : e._e1.stop(!0, !0).animate({height: i}, e.st.transitionSpeed), e.ev.trigger("rsAutoHeightChange", i), n && (e._e && setTimeout(function () {
            e._e1.css(e._g + "transition", "height " + e.st.transitionSpeed + "ms ease-in-out")
          }, 16), n = !1))
        };
        e.ev.on("rsMaybeSizeReady.rsAutoHeight", function (e, t) {
          s === t && o()
        }), e.ev.on("rsAfterContentSet.rsAutoHeight", function (e, t) {
          s === t && o()
        }), e.slider.addClass("rsAutoHeight"), e.ev.one("rsAfterInit", function () {
          setTimeout(function () {
            o(!1), setTimeout(function () {
              e.slider.append('<div style="clear:both; float: none;"></div>')
            }, 16)
          }, 16)
        }), e.ev.on("rsBeforeAnimStart", function () {
          o(!0)
        }), e.ev.on("rsBeforeSizeSet", function () {
          setTimeout(function () {
            o(!1)
          }, 16)
        })
      }
    }
  }), e.rsModules.autoHeight = e.rsProto._w4
}(jQuery), function (e) {
  e.extend(e.rsProto, {
    _d6: function () {
      var t = this;
      t.st.globalCaption && (t.ev.on("rsAfterInit", function () {
        t.globalCaption = e('<div class="rsGCaption"></div>').appendTo(t.st.globalCaptionInside ? t._e1 : t.slider), t.globalCaption.html(t.currSlide.caption)
      }), t.ev.on("rsBeforeAnimStart", function () {
        t.globalCaption.html(t.currSlide.caption)
      }))
    }
  }), e.rsModules.globalCaption = e.rsProto._d6
}(jQuery), function (e) {
  e.rsProto._o4 = function () {
    var e, t = this;
    t.st.addActiveClass && t.ev.on("rsOnUpdateNav", function () {
      e && clearTimeout(e), e = setTimeout(function () {
        t._g4 && t._g4.removeClass("rsActiveSlide"), t._r1 && t._r1.addClass("rsActiveSlide"), e = null
      }, 50)
    })
  }, e.rsModules.activeClass = e.rsProto._o4
}(jQuery), function (e) {
  e.extend(e.rsProto, {
    _o5: function () {
      var t, i, s, n = this;
      if (n._p5 = {
        enabled: !1,
        change: !1,
        prefix: ""
      }, n.st.deeplinking = e.extend({}, n._p5, n.st.deeplinking), n.st.deeplinking.enabled) {
        var o = n.st.deeplinking.change, a = n.st.deeplinking.prefix, r = "#" + a, l = function () {
          var e = window.location.hash;
          return e && 0 < e.indexOf(a) && (e = parseInt(e.substring(r.length), 10), 0 <= e) ? e - 1 : -1
        }, c = l();
        -1 !== c && (n.st.startSlideId = c), o && (e(window).on("hashchange" + n.ns, function (e) {
          t || (e = l(), 0 > e || (e > n.numSlides - 1 && (e = n.numSlides - 1), n.goTo(e)))
        }), n.ev.on("rsBeforeAnimStart", function () {
          i && clearTimeout(i), s && clearTimeout(s)
        }), n.ev.on("rsAfterSlideChange", function () {
          i && clearTimeout(i), s && clearTimeout(s), s = setTimeout(function () {
            t = !0, window.location.replace(("" + window.location).split("#")[0] + r + (n.currSlideId + 1)), i = setTimeout(function () {
              t = !1, i = null
            }, 60)
          }, 400)
        })), n.ev.on("rsBeforeDestroy", function () {
          i = s = null, o && e(window).off("hashchange" + n.ns)
        })
      }
    }
  }), e.rsModules.deeplinking = e.rsProto._o5
}(jQuery), function (e, t, i) {
  function s(e) {
    return e = e || location.href, "#" + e.replace(/^[^#]*#?(.*)$/, "$1")
  }

  var n, o = document, a = e.event.special, r = o.documentMode, l = "onhashchange" in t && (r === i || 7 < r);
  e.fn.hashchange = function (e) {
    return e ? this.bind("hashchange", e) : this.trigger("hashchange")
  }, e.fn.hashchange.delay = 50, a.hashchange = e.extend(a.hashchange, {
    setup: function () {
      return !l && void e(n.start)
    }, teardown: function () {
      return !l && void e(n.stop)
    }
  }), n = function () {
    function n() {
      var i = s(), o = h(c);
      i !== c ? (u(c = i, o), e(t).trigger("hashchange")) : o !== c && (location.href = location.href.replace(/#.*/, "") + o), a = setTimeout(n, e.fn.hashchange.delay)
    }

    var a, r = {}, c = s(), d = function (e) {
      return e
    }, u = d, h = d;
    return r.start = function () {
      a || n()
    }, r.stop = function () {
      a && clearTimeout(a), a = i
    }, t.attachEvent && !t.addEventListener && !l && function () {
      var t, i;
      r.start = function () {
        t || (i = (i = e.fn.hashchange.src) && i + s(), t = e('<iframe tabindex="-1" title="empty"/>').hide().one("load", function () {
          i || u(s()), n()
        }).attr("src", i || "javascript:0").insertAfter("body")[0].contentWindow, o.onpropertychange = function () {
          try {
            "title" === event.propertyName && (t.document.title = o.title)
          } catch (e) {
          }
        })
      }, r.stop = d, h = function () {
        return s(t.location.href)
      }, u = function (i, s) {
        var n = t.document, a = e.fn.hashchange.domain;
        i !== s && (n.title = o.title, n.open(), a && n.write('<script>document.domain="' + a + '"</script>'), n.close(), t.location.hash = i)
      }
    }(), r
  }()
}(jQuery, this), function (e) {
  e.rsProto._g7 = function () {
    var t = this;
    t.st.visibleNearby && t.st.visibleNearby.enabled && (t._h7 = {
      enabled: !0,
      centerArea: .6,
      center: !0,
      breakpoint: 0,
      breakpointCenterArea: .8,
      hiddenOverflow: !0,
      navigateByCenterClick: !1
    }, t.st.visibleNearby = e.extend({}, t._h7, t.st.visibleNearby), t.ev.one("rsAfterPropsSetup", function () {
      t._i7 = t._e1.css("overflow", "visible").wrap('<div class="rsVisibleNearbyWrap"></div>').parent(), t.st.visibleNearby.hiddenOverflow || t._i7.css("overflow", "visible"), t._o1 = t.st.controlsInside ? t._i7 : t.slider
    }), t.ev.on("rsAfterSizePropSet", function () {
      var e, i = t.st.visibleNearby;
      e = i.breakpoint && t.width < i.breakpoint ? i.breakpointCenterArea : i.centerArea, t._h ? (t._b4 *= e, t._i7.css({
        height: t._c4,
        width: t._b4 / e
      }), t._d = t._b4 * (1 - e) / 2 / e) : (t._c4 *= e, t._i7.css({
        height: t._c4 / e,
        width: t._b4
      }), t._d = t._c4 * (1 - e) / 2 / e), i.navigateByCenterClick || (t._q = t._h ? t._b4 : t._c4), i.center && t._e1.css("margin-" + (t._h ? "left" : "top"), t._d)
    }))
  }, e.rsModules.visibleNearby = e.rsProto._g7
}(jQuery), !function (e, t, i) {
  var s = window.matchMedia;
  "undefined" != typeof module && module.exports ? module.exports = i(s) : "function" == typeof define && define.amd ? define(function () {
    return t[e] = i(s)
  }) : t[e] = i(s)
}("enquire", this, function (e) {
  "use strict";

  function t(e, t) {
    var i, s = 0, n = e.length;
    for (s; n > s && (i = t(e[s], s), i !== !1); s++) ;
  }

  function i(e) {
    return "[object Array]" === Object.prototype.toString.apply(e)
  }

  function s(e) {
    return "function" == typeof e
  }

  function n(e) {
    this.options = e, !e.deferSetup && this.setup()
  }

  function o(t, i) {
    this.query = t, this.isUnconditional = i, this.handlers = [], this.mql = e(t);
    var s = this;
    this.listener = function (e) {
      s.mql = e, s.assess()
    }, this.mql.addListener(this.listener)
  }

  function a() {
    if (!e) throw new Error("matchMedia not present, legacy browsers require a polyfill");
    this.queries = {}, this.browserIsIncapable = !e("only all").matches
  }

  return n.prototype = {
    setup: function () {
      this.options.setup && this.options.setup(), this.initialised = !0
    }, on: function () {
      !this.initialised && this.setup(), this.options.match && this.options.match()
    }, off: function () {
      this.options.unmatch && this.options.unmatch()
    }, destroy: function () {
      this.options.destroy ? this.options.destroy() : this.off()
    }, equals: function (e) {
      return this.options === e || this.options.match === e
    }
  }, o.prototype = {
    addHandler: function (e) {
      var t = new n(e);
      this.handlers.push(t), this.matches() && t.on()
    }, removeHandler: function (e) {
      var i = this.handlers;
      t(i, function (t, s) {
        return t.equals(e) ? (t.destroy(), !i.splice(s, 1)) : void 0
      })
    }, matches: function () {
      return this.mql.matches || this.isUnconditional
    }, clear: function () {
      t(this.handlers, function (e) {
        e.destroy()
      }), this.mql.removeListener(this.listener), this.handlers.length = 0
    }, assess: function () {
      var e = this.matches() ? "on" : "off";
      t(this.handlers, function (t) {
        t[e]()
      })
    }
  }, a.prototype = {
    register: function (e, n, a) {
      var r = this.queries, l = a && this.browserIsIncapable;
      return r[e] || (r[e] = new o(e, l)), s(n) && (n = {match: n}), i(n) || (n = [n]), t(n, function (t) {
        s(t) && (t = {match: t}), r[e].addHandler(t)
      }), this
    }, unregister: function (e, t) {
      var i = this.queries[e];
      return i && (t ? i.removeHandler(t) : (i.clear(), delete this.queries[e])), this
    }
  }, new a
}), window.Modernizr = function (e, t, i) {
  function s(e) {
    p.cssText = e
  }

  function n(e, t) {
    return typeof e === t
  }

  var o, a, r, l = "2.6.2", c = {}, d = !0, u = t.documentElement, h = "modernizr", f = t.createElement(h), p = f.style,
    m = {}.toString, _ = " -webkit- -moz- -o- -ms- ".split(" "), g = {svg: "http://www.w3.org/2000/svg"}, v = {},
    b = [], y = b.slice, w = function (e, i, s, n) {
      var o, a, r, l, c = t.createElement("div"), d = t.body, f = d || t.createElement("body");
      if (parseInt(s, 10)) for (; s--;) r = t.createElement("div"), r.id = n ? n[s] : h + (s + 1), c.appendChild(r);
      return o = ["&#173;", '<style id="s', h, '">', e, "</style>"].join(""), c.id = h, (d ? c : f).innerHTML += o, f.appendChild(c), d || (f.style.background = "", f.style.overflow = "hidden", l = u.style.overflow, u.style.overflow = "hidden", u.appendChild(f)), a = i(c, e), d ? c.parentNode.removeChild(c) : (f.parentNode.removeChild(f), u.style.overflow = l), !!a
    }, x = function (t) {
      var i = e.matchMedia || e.msMatchMedia;
      if (i) return i(t).matches;
      var s;
      return w("@media " + t + " { #" + h + " { position: absolute; } }", function (t) {
        s = "absolute" == (e.getComputedStyle ? getComputedStyle(t, null) : t.currentStyle).position
      }), s
    }, S = {}.hasOwnProperty;
  r = n(S, "undefined") || n(S.call, "undefined") ? function (e, t) {
    return t in e && n(e.constructor.prototype[t], "undefined")
  } : function (e, t) {
    return S.call(e, t)
  }, Function.prototype.bind || (Function.prototype.bind = function (e) {
    var t = this;
    if ("function" != typeof t) throw new TypeError;
    var i = y.call(arguments, 1), s = function () {
      if (this instanceof s) {
        var n = function () {
        };
        n.prototype = t.prototype;
        var o = new n, a = t.apply(o, i.concat(y.call(arguments)));
        return Object(a) === a ? a : o
      }
      return t.apply(e, i.concat(y.call(arguments)))
    };
    return s
  }), v.touch = function () {
    var i;
    return "ontouchstart" in e || e.DocumentTouch && t instanceof DocumentTouch ? i = !0 : w(["@media (", _.join("touch-enabled),("), h, ")", "{#modernizr{top:9px;position:absolute}}"].join(""), function (e) {
      i = 9 === e.offsetTop
    }), i
  }, v.svg = function () {
    return !!t.createElementNS && !!t.createElementNS(g.svg, "svg").createSVGRect
  }, v.inlinesvg = function () {
    var e = t.createElement("div");
    return e.innerHTML = "<svg/>", (e.firstChild && e.firstChild.namespaceURI) == g.svg
  }, v.svgclippaths = function () {
    return !!t.createElementNS && /SVGClipPath/.test(m.call(t.createElementNS(g.svg, "clipPath")))
  };
  for (var C in v) r(v, C) && (a = C.toLowerCase(), c[a] = v[C](), b.push((c[a] ? "" : "no-") + a));
  return c.addTest = function (e, t) {
    if ("object" == typeof e) for (var s in e) r(e, s) && c.addTest(s, e[s]); else {
      if (e = e.toLowerCase(), c[e] !== i) return c;
      t = "function" == typeof t ? t() : t, "undefined" != typeof d && d && (u.className += " " + (t ? "" : "no-") + e), c[e] = t
    }
    return c
  }, s(""), f = o = null, function (e, t) {
    function i(e, t) {
      var i = e.createElement("p"), s = e.getElementsByTagName("head")[0] || e.documentElement;
      return i.innerHTML = "x<style>" + t + "</style>", s.insertBefore(i.lastChild, s.firstChild)
    }

    function s() {
      var e = g.elements;
      return "string" == typeof e ? e.split(" ") : e
    }

    function n(e) {
      var t = _[e[p]];
      return t || (t = {}, m++, e[p] = m, _[m] = t), t
    }

    function o(e, i, s) {
      if (i || (i = t), d) return i.createElement(e);
      s || (s = n(i));
      var o;
      return o = s.cache[e] ? s.cache[e].cloneNode() : f.test(e) ? (s.cache[e] = s.createElem(e)).cloneNode() : s.createElem(e), o.canHaveChildren && !h.test(e) ? s.frag.appendChild(o) : o
    }

    function a(e, i) {
      if (e || (e = t), d) return e.createDocumentFragment();
      i = i || n(e);
      for (var o = i.frag.cloneNode(), a = 0, r = s(), l = r.length; a < l; a++) o.createElement(r[a]);
      return o
    }

    function r(e, t) {
      t.cache || (t.cache = {}, t.createElem = e.createElement, t.createFrag = e.createDocumentFragment, t.frag = t.createFrag()), e.createElement = function (i) {
        return g.shivMethods ? o(i, e, t) : t.createElem(i)
      }, e.createDocumentFragment = Function("h,f", "return function(){var n=f.cloneNode(),c=n.createElement;h.shivMethods&&(" + s().join().replace(/\w+/g, function (e) {
        return t.createElem(e), t.frag.createElement(e), 'c("' + e + '")'
      }) + ");return n}")(g, t.frag)
    }

    function l(e) {
      e || (e = t);
      var s = n(e);
      return g.shivCSS && !c && !s.hasCSS && (s.hasCSS = !!i(e, "article,aside,figcaption,figure,footer,header,hgroup,nav,section{display:block}mark{background:#FF0;color:#000}")), d || r(e, s), e
    }

    var c, d, u = e.html5 || {}, h = /^<|^(?:button|map|select|textarea|object|iframe|option|optgroup)$/i,
      f = /^(?:a|b|code|div|fieldset|h1|h2|h3|h4|h5|h6|i|label|li|ol|p|q|span|strong|style|table|tbody|td|th|tr|ul)$/i,
      p = "_html5shiv", m = 0, _ = {};
    !function () {
      try {
        var e = t.createElement("a");
        e.innerHTML = "<xyz></xyz>", c = "hidden" in e, d = 1 == e.childNodes.length || function () {
          t.createElement("a");
          var e = t.createDocumentFragment();
          return "undefined" == typeof e.cloneNode || "undefined" == typeof e.createDocumentFragment || "undefined" == typeof e.createElement
        }()
      } catch (i) {
        c = !0, d = !0
      }
    }();
    var g = {
      elements: u.elements || "abbr article aside audio bdi canvas data datalist details figcaption figure footer header hgroup mark meter nav output progress section summary time video",
      shivCSS: u.shivCSS !== !1,
      supportsUnknownElements: d,
      shivMethods: u.shivMethods !== !1,
      type: "default",
      shivDocument: l,
      createElement: o,
      createDocumentFragment: a
    };
    e.html5 = g, l(t)
  }(this, t), c._version = l, c._prefixes = _, c.mq = x, c.testStyles = w, u.className = u.className.replace(/(^|\s)no-js(\s|$)/, "$1$2") + (d ? " js " + b.join(" ") : ""), c
}(this, this.document), function (e, t, i) {
  function s(e) {
    return "[object Function]" == _.call(e)
  }

  function n(e) {
    return "string" == typeof e
  }

  function o() {
  }

  function a(e) {
    return !e || "loaded" == e || "complete" == e || "uninitialized" == e
  }

  function r() {
    var e = g.shift();
    v = 1, e ? e.t ? p(function () {
      ("c" == e.t ? h.injectCss : h.injectJs)(e.s, 0, e.a, e.x, e.e, 1)
    }, 0) : (e(), r()) : v = 0
  }

  function l(e, i, s, n, o, l, c) {
    function d(t) {
      if (!f && a(u.readyState) && (b.r = f = 1, !v && r(), u.onload = u.onreadystatechange = null, t)) {
        "img" != e && p(function () {
          w.removeChild(u)
        }, 50);
        for (var s in T[i]) T[i].hasOwnProperty(s) && T[i][s].onload()
      }
    }

    var c = c || h.errorTimeout, u = t.createElement(e), f = 0, _ = 0, b = {t: s, s: i, e: o, a: l, x: c};
    1 === T[i] && (_ = 1, T[i] = []), "object" == e ? u.data = i : (u.src = i, u.type = e), u.width = u.height = "0", u.onerror = u.onload = u.onreadystatechange = function () {
      d.call(this, _)
    }, g.splice(n, 0, b), "img" != e && (_ || 2 === T[i] ? (w.insertBefore(u, y ? null : m), p(d, c)) : T[i].push(u))
  }

  function c(e, t, i, s, o) {
    return v = 0, t = t || "j", n(e) ? l("c" == t ? S : x, e, t, this.i++, i, s, o) : (g.splice(this.i++, 0, e), 1 == g.length && r()), this
  }

  function d() {
    var e = h;
    return e.loader = {load: c, i: 0}, e
  }

  var u, h, f = t.documentElement, p = e.setTimeout, m = t.getElementsByTagName("script")[0], _ = {}.toString, g = [],
    v = 0, b = "MozAppearance" in f.style, y = b && !!t.createRange().compareNode, w = y ? f : m.parentNode,
    f = e.opera && "[object Opera]" == _.call(e.opera), f = !!t.attachEvent && !f,
    x = b ? "object" : f ? "script" : "img", S = f ? "script" : x, C = Array.isArray || function (e) {
      return "[object Array]" == _.call(e)
    }, k = [], T = {}, I = {
      timeout: function (e, t) {
        return t.length && (e.timeout = t[0]), e
      }
    };
  h = function (e) {
    function t(e) {
      var t, i, s, e = e.split("!"), n = k.length, o = e.pop(), a = e.length, o = {url: o, origUrl: o, prefixes: e};
      for (i = 0; i < a; i++) s = e[i].split("="), (t = I[s.shift()]) && (o = t(o, s));
      for (i = 0; i < n; i++) o = k[i](o);
      return o
    }

    function a(e, n, o, a, r) {
      var l = t(e), c = l.autoCallback;
      l.url.split(".").pop().split("?").shift(), l.bypass || (n && (n = s(n) ? n : n[e] || n[a] || n[e.split("/").pop().split("?")[0]]), l.instead ? l.instead(e, n, o, a, r) : (T[l.url] ? l.noexec = !0 : T[l.url] = 1, o.load(l.url, l.forceCSS || !l.forceJS && "css" == l.url.split(".").pop().split("?").shift() ? "c" : i, l.noexec, l.attrs, l.timeout), (s(n) || s(c)) && o.load(function () {
        d(), n && n(l.origUrl, r, a), c && c(l.origUrl, r, a), T[l.url] = 2
      })))
    }

    function r(e, t) {
      function i(e, i) {
        if (e) {
          if (n(e)) i || (u = function () {
            var e = [].slice.call(arguments);
            h.apply(this, e), f()
          }), a(e, u, t, 0, c); else if (Object(e) === e) for (l in r = function () {
            var t, i = 0;
            for (t in e) e.hasOwnProperty(t) && i++;
            return i
          }(), e) e.hasOwnProperty(l) && (!i && !--r && (s(u) ? u = function () {
            var e = [].slice.call(arguments);
            h.apply(this, e), f()
          } : u[l] = function (e) {
            return function () {
              var t = [].slice.call(arguments);
              e && e.apply(this, t), f()
            }
          }(h[l])), a(e[l], u, t, l, c))
        } else !i && f()
      }

      var r, l, c = !!e.test, d = e.load || e.both, u = e.callback || o, h = u, f = e.complete || o;
      i(c ? e.yep : e.nope, !!d), d && i(d)
    }

    var l, c, u = this.yepnope.loader;
    if (n(e)) a(e, 0, u, 0); else if (C(e)) for (l = 0; l < e.length; l++) c = e[l], n(c) ? a(c, 0, u, 0) : C(c) ? h(c) : Object(c) === c && r(c, u); else Object(e) === e && r(e, u)
  }, h.addPrefix = function (e, t) {
    I[e] = t
  }, h.addFilter = function (e) {
    k.push(e)
  }, h.errorTimeout = 1e4, null == t.readyState && t.addEventListener && (t.readyState = "loading", t.addEventListener("DOMContentLoaded", u = function () {
    t.removeEventListener("DOMContentLoaded", u, 0), t.readyState = "complete"
  }, 0)), e.yepnope = d(), e.yepnope.executeStack = r, e.yepnope.injectJs = function (e, i, s, n, l, c) {
    var d, u, f = t.createElement("script"), n = n || h.errorTimeout;
    f.src = e;
    for (u in s) f.setAttribute(u, s[u]);
    i = c ? r : i || o, f.onreadystatechange = f.onload = function () {
      !d && a(f.readyState) && (d = 1, i(), f.onload = f.onreadystatechange = null)
    }, p(function () {
      d || (d = 1, i(1))
    }, n), l ? f.onload() : m.parentNode.insertBefore(f, m)
  }, e.yepnope.injectCss = function (e, i, s, n, a, l) {
    var c, n = t.createElement("link"), i = l ? r : i || o;
    n.href = e, n.rel = "stylesheet", n.type = "text/css";
    for (c in s) n.setAttribute(c, s[c]);
    a || (m.parentNode.insertBefore(n, m), p(i, 0))
  }
}(this, document), Modernizr.load = function () {
  yepnope.apply(window, [].slice.call(arguments, 0))
}, Modernizr.addTest("ie8compat", function () {
  return !window.addEventListener && document.documentMode && 7 === document.documentMode
}), !function (e, t, i, s) {
  "use strict";

  function n(e) {
    var t = e.currentTarget, s = e.data ? e.data.options : {},
      n = s.selector ? i(s.selector) : e.data ? e.data.items : [], o = i(t).attr("data-fancybox") || "", a = 0,
      r = i.fancybox.getInstance();
    e.preventDefault(), e.stopPropagation(), r && r.current.opts.$orig.is(t) || (o ? (n = n.length ? n.filter('[data-fancybox="' + o + '"]') : i('[data-fancybox="' + o + '"]'), a = n.index(t), a < 0 && (a = 0)) : n = [t], i.fancybox.open(n, s, a))
  }

  if (i) {
    if (i.fn.fancybox) return void i.error("fancyBox already initialized");
    var o = {
      loop: !1,
      margin: [44, 0],
      gutter: 50,
      keyboard: !0,
      arrows: !0,
      infobar: !1,
      toolbar: !0,
      buttons: ["slideShow", "fullScreen", "thumbs", "close"],
      idleTime: 4,
      smallBtn: "auto",
      protect: !1,
      modal: !1,
      image: {preload: "auto"},
      ajax: {settings: {data: {fancybox: !0}}},
      iframe: {
        tpl: '<iframe id="fancybox-frame{rnd}" name="fancybox-frame{rnd}" class="fancybox-iframe" frameborder="0" vspace="0" hspace="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen allowtransparency="true" src=""></iframe>',
        preload: !0,
        css: {},
        attr: {scrolling: "auto"}
      },
      animationEffect: "zoom",
      animationDuration: 366,
      zoomOpacity: "auto",
      transitionEffect: "fade",
      transitionDuration: 366,
      slideClass: "",
      baseClass: "",
      baseTpl: '<div class="fancybox-container" role="dialog" tabindex="-1"><div class="fancybox-bg"></div><div class="fancybox-inner"><div class="fancybox-infobar"><button data-fancybox-prev title="{{PREV}}" class="fancybox-button fancybox-button--left"></button><div class="fancybox-infobar__body"><span data-fancybox-index></span>&nbsp;/&nbsp;<span data-fancybox-count></span></div><button data-fancybox-next title="{{NEXT}}" class="fancybox-button fancybox-button--right"></button></div><div class="fancybox-toolbar">{{BUTTONS}}</div><div class="fancybox-navigation"><button data-fancybox-prev title="{{PREV}}" class="fancybox-arrow fancybox-arrow--left" /><button data-fancybox-next title="{{NEXT}}" class="fancybox-arrow fancybox-arrow--right" /></div><div class="fancybox-stage"></div><div class="fancybox-caption-wrap"><div class="fancybox-caption"></div></div></div></div>',
      spinnerTpl: '<div class="fancybox-loading"></div>',
      errorTpl: '<div class="fancybox-error"><p>{{ERROR}}<p></div>',
      btnTpl: {
        slideShow: '<button data-fancybox-play class="fancybox-button fancybox-button--play" title="{{PLAY_START}}"></button>',
        fullScreen: '<button data-fancybox-fullscreen class="fancybox-button fancybox-button--fullscreen" title="{{FULL_SCREEN}}"></button>',
        thumbs: '<button data-fancybox-thumbs class="fancybox-button fancybox-button--thumbs" title="{{THUMBS}}"></button>',
        close: '<button data-fancybox-close class="fancybox-button fancybox-button--close" title="{{CLOSE}}"></button>',
        smallBtn: '<button data-fancybox-close class="fancybox-close-small" title="{{CLOSE}}"></button>'
      },
      parentEl: "body",
      autoFocus: !0,
      backFocus: !0,
      trapFocus: !0,
      fullScreen: {autoStart: !1},
      touch: {vertical: !0, momentum: !0},
      hash: null,
      media: {},
      slideShow: {autoStart: !1, speed: 4e3},
      thumbs: {autoStart: !1, hideOnClose: !0},
      onInit: i.noop,
      beforeLoad: i.noop,
      afterLoad: i.noop,
      beforeShow: i.noop,
      afterShow: i.noop,
      beforeClose: i.noop,
      afterClose: i.noop,
      onActivate: i.noop,
      onDeactivate: i.noop,
      clickContent: function (e, t) {
        return "image" === e.type && "zoom"
      },
      clickSlide: "close",
      clickOutside: "close",
      dblclickContent: !1,
      dblclickSlide: !1,
      dblclickOutside: !1,
      mobile: {
        clickContent: function (e, t) {
          return "image" === e.type && "toggleControls"
        }, clickSlide: function (e, t) {
          return "image" === e.type ? "toggleControls" : "close"
        }, dblclickContent: function (e, t) {
          return "image" === e.type && "zoom"
        }, dblclickSlide: function (e, t) {
          return "image" === e.type && "zoom"
        }
      },
      lang: "en",
      i18n: {
        en: {
          CLOSE: "Close",
          NEXT: "Next",
          PREV: "Previous",
          ERROR: "The requested content cannot be loaded. <br/> Please try again later.",
          PLAY_START: "Start slideshow",
          PLAY_STOP: "Pause slideshow",
          FULL_SCREEN: "Full screen",
          THUMBS: "Thumbnails"
        },
        de: {
          CLOSE: "Schliessen",
          NEXT: "Weiter",
          PREV: "Zurück",
          ERROR: "Die angeforderten Daten konnten nicht geladen werden. <br/> Bitte versuchen Sie es später nochmal.",
          PLAY_START: "Diaschau starten",
          PLAY_STOP: "Diaschau beenden",
          FULL_SCREEN: "Vollbild",
          THUMBS: "Vorschaubilder"
        }
      }
    }, a = i(e), r = i(t), l = 0, c = function (e) {
      return e && e.hasOwnProperty && e instanceof i
    }, d = function () {
      return e.requestAnimationFrame || e.webkitRequestAnimationFrame || e.mozRequestAnimationFrame || e.oRequestAnimationFrame || function (t) {
        return e.setTimeout(t, 1e3 / 60)
      }
    }(), u = function () {
      var e, i = t.createElement("fakeelement"), n = {
        transition: "transitionend",
        OTransition: "oTransitionEnd",
        MozTransition: "transitionend",
        WebkitTransition: "webkitTransitionEnd"
      };
      for (e in n) if (i.style[e] !== s) return n[e]
    }(), h = function (e) {
      return e && e.length && e[0].offsetHeight
    }, f = function (e, s, n) {
      var a = this;
      a.opts = i.extend(!0, {index: n}, o, s || {}), s && i.isArray(s.buttons) && (a.opts.buttons = s.buttons), a.id = a.opts.id || ++l, a.group = [], a.currIndex = parseInt(a.opts.index, 10) || 0, a.prevIndex = null, a.prevPos = null, a.currPos = 0, a.firstRun = null, a.createGroup(e), a.group.length && (a.$lastFocus = i(t.activeElement).blur(), a.slides = {}, a.init(e))
    };
    i.extend(f.prototype, {
      init: function () {
        var e, t, s, n = this, o = n.group[n.currIndex].opts;
        n.scrollTop = r.scrollTop(), n.scrollLeft = r.scrollLeft(), i.fancybox.getInstance() || i.fancybox.isMobile || "hidden" === i("body").css("overflow") || (e = i("body").width(), i("html").addClass("fancybox-enabled"), e = i("body").width() - e, e > 1 && i("head").append('<style id="fancybox-style-noscroll" type="text/css">.compensate-for-scrollbar, .fancybox-enabled body { margin-right: ' + e + "px; }</style>")), s = "", i.each(o.buttons, function (e, t) {
          s += o.btnTpl[t] || ""
        }), t = i(n.translate(n, o.baseTpl.replace("{{BUTTONS}}", s))).addClass("fancybox-is-hidden").attr("id", "fancybox-container-" + n.id).addClass(o.baseClass).data("FancyBox", n).prependTo(o.parentEl), n.$refs = {container: t}, ["bg", "inner", "infobar", "toolbar", "stage", "caption"].forEach(function (e) {
          n.$refs[e] = t.find(".fancybox-" + e)
        }), (!o.arrows || n.group.length < 2) && t.find(".fancybox-navigation").remove(), o.infobar || n.$refs.infobar.remove(), o.toolbar || n.$refs.toolbar.remove(), n.trigger("onInit"), n.activate(), n.jumpTo(n.currIndex)
      }, translate: function (e, t) {
        var i = e.opts.i18n[e.opts.lang];
        return t.replace(/\{\{(\w+)\}\}/g, function (e, t) {
          var n = i[t];
          return n === s ? e : n
        })
      }, createGroup: function (e) {
        var t = this, n = i.makeArray(e);
        i.each(n, function (e, n) {
          var o, a, r, l, c = {}, d = {}, u = [];
          i.isPlainObject(n) ? (c = n, d = n.opts || n) : "object" === i.type(n) && i(n).length ? (o = i(n), u = o.data(), d = "options" in u ? u.options : {}, d = "object" === i.type(d) ? d : {}, c.src = "src" in u ? u.src : d.src || o.attr("href"), ["width", "height", "thumb", "type", "filter"].forEach(function (e) {
            e in u && (d[e] = u[e])
          }), "srcset" in u && (d.image = {srcset: u.srcset}), d.$orig = o, c.type || c.src || (c.type = "inline", c.src = n)) : c = {
            type: "html",
            src: n + ""
          }, c.opts = i.extend(!0, {}, t.opts, d), i.fancybox.isMobile && (c.opts = i.extend(!0, {}, c.opts, c.opts.mobile)), a = c.type || c.opts.type, r = c.src || "", !a && r && (r.match(/(^data:image\/[a-z0-9+\/=]*,)|(\.(jp(e|g|eg)|gif|png|bmp|webp|svg|ico)((\?|#).*)?$)/i) ? a = "image" : r.match(/\.(pdf)((\?|#).*)?$/i) ? a = "pdf" : "#" === r.charAt(0) && (a = "inline")), c.type = a, c.index = t.group.length, c.opts.$orig && !c.opts.$orig.length && delete c.opts.$orig, !c.opts.$thumb && c.opts.$orig && (c.opts.$thumb = c.opts.$orig.find("img:first")), c.opts.$thumb && !c.opts.$thumb.length && delete c.opts.$thumb, "function" === i.type(c.opts.caption) ? c.opts.caption = c.opts.caption.apply(n, [t, c]) : "caption" in u && (c.opts.caption = u.caption), c.opts.caption = c.opts.caption === s ? "" : c.opts.caption + "", "ajax" === a && (l = r.split(/\s+/, 2), l.length > 1 && (c.src = l.shift(), c.opts.filter = l.shift())), "auto" == c.opts.smallBtn && (i.inArray(a, ["html", "inline", "ajax"]) > -1 ? (c.opts.toolbar = !1, c.opts.smallBtn = !0) : c.opts.smallBtn = !1), "pdf" === a && (c.type = "iframe", c.opts.iframe.preload = !1), c.opts.modal && (c.opts = i.extend(!0, c.opts, {
            infobar: 0,
            toolbar: 0,
            smallBtn: 0,
            keyboard: 0,
            slideShow: 0,
            fullScreen: 0,
            thumbs: 0,
            touch: 0,
            clickContent: !1,
            clickSlide: !1,
            clickOutside: !1,
            dblclickContent: !1,
            dblclickSlide: !1,
            dblclickOutside: !1
          })), t.group.push(c)
        })
      }, addEvents: function () {
        var s = this;
        s.removeEvents(), s.$refs.container.on("click.fb-close", "[data-fancybox-close]", function (e) {
          e.stopPropagation(), e.preventDefault(), s.close(e)
        }).on("click.fb-prev touchend.fb-prev", "[data-fancybox-prev]", function (e) {
          e.stopPropagation(), e.preventDefault(), s.previous()
        }).on("click.fb-next touchend.fb-next", "[data-fancybox-next]", function (e) {
          e.stopPropagation(), e.preventDefault(), s.next()
        }), a.on("orientationchange.fb resize.fb", function (e) {
          e && e.originalEvent && "resize" === e.originalEvent.type ? d(function () {
            s.update()
          }) : (s.$refs.stage.hide(), setTimeout(function () {
            s.$refs.stage.show(), s.update()
          }, 500))
        }), r.on("focusin.fb", function (e) {
          var n = i.fancybox ? i.fancybox.getInstance() : null;
          n.isClosing || !n.current || !n.current.opts.trapFocus || i(e.target).hasClass("fancybox-container") || i(e.target).is(t) || n && "fixed" !== i(e.target).css("position") && !n.$refs.container.has(e.target).length && (e.stopPropagation(), n.focus(), a.scrollTop(s.scrollTop).scrollLeft(s.scrollLeft))
        }), r.on("keydown.fb", function (e) {
          var t = s.current, n = e.keyCode || e.which;
          if (t && t.opts.keyboard && !i(e.target).is("input") && !i(e.target).is("textarea")) return 8 === n || 27 === n ? (e.preventDefault(), void s.close(e)) : 37 === n || 38 === n ? (e.preventDefault(), void s.previous()) : 39 === n || 40 === n ? (e.preventDefault(), void s.next()) : void s.trigger("afterKeydown", e, n)
        }), s.group[s.currIndex].opts.idleTime && (s.idleSecondsCounter = 0, r.on("mousemove.fb-idle mouseenter.fb-idle mouseleave.fb-idle mousedown.fb-idle touchstart.fb-idle touchmove.fb-idle scroll.fb-idle keydown.fb-idle", function () {
          s.idleSecondsCounter = 0, s.isIdle && s.showControls(), s.isIdle = !1
        }), s.idleInterval = e.setInterval(function () {
          s.idleSecondsCounter++, s.idleSecondsCounter >= s.group[s.currIndex].opts.idleTime && (s.isIdle = !0, s.idleSecondsCounter = 0, s.hideControls())
        }, 1e3))
      }, removeEvents: function () {
        var t = this;
        a.off("orientationchange.fb resize.fb"), r.off("focusin.fb keydown.fb .fb-idle"), this.$refs.container.off(".fb-close .fb-prev .fb-next"), t.idleInterval && (e.clearInterval(t.idleInterval), t.idleInterval = null)
      }, previous: function (e) {
        return this.jumpTo(this.currPos - 1, e)
      }, next: function (e) {
        return this.jumpTo(this.currPos + 1, e)
      }, jumpTo: function (e, t, n) {
        var o, a, r, l, c, d, u, f = this, p = f.group.length;
        if (!(f.isSliding || f.isClosing || f.isAnimating && f.firstRun)) {
          if (e = parseInt(e, 10), a = f.current ? f.current.opts.loop : f.opts.loop, !a && (e < 0 || e >= p)) return !1;
          if (o = f.firstRun = null === f.firstRun, !(p < 2 && !o && f.isSliding)) {
            if (l = f.current, f.prevIndex = f.currIndex, f.prevPos = f.currPos, r = f.createSlide(e), p > 1 && ((a || r.index > 0) && f.createSlide(e - 1), (a || r.index < p - 1) && f.createSlide(e + 1)), f.current = r, f.currIndex = r.index, f.currPos = r.pos, f.trigger("beforeShow", o), f.updateControls(), d = i.fancybox.getTranslate(r.$slide), r.isMoved = (0 !== d.left || 0 !== d.top) && !r.$slide.hasClass("fancybox-animated"), r.forcedDuration = s, i.isNumeric(t) ? r.forcedDuration = t : t = r.opts[o ? "animationDuration" : "transitionDuration"], t = parseInt(t, 10), o) return r.opts.animationEffect && t && f.$refs.container.css("transition-duration", t + "ms"), f.$refs.container.removeClass("fancybox-is-hidden"), h(f.$refs.container), f.$refs.container.addClass("fancybox-is-open"), r.$slide.addClass("fancybox-slide--current"), f.loadSlide(r), void f.preload();
            i.each(f.slides, function (e, t) {
              i.fancybox.stop(t.$slide)
            }), r.$slide.removeClass("fancybox-slide--next fancybox-slide--previous").addClass("fancybox-slide--current"), r.isMoved ? (c = Math.round(r.$slide.width()), i.each(f.slides, function (e, s) {
              var n = s.pos - r.pos;
              i.fancybox.animate(s.$slide, {top: 0, left: n * c + n * s.opts.gutter}, t, function () {
                s.$slide.removeAttr("style").removeClass("fancybox-slide--next fancybox-slide--previous"), s.pos === f.currPos && (r.isMoved = !1, f.complete())
              })
            })) : f.$refs.stage.children().removeAttr("style"), r.isLoaded ? f.revealContent(r) : f.loadSlide(r), f.preload(), l.pos !== r.pos && (u = "fancybox-slide--" + (l.pos > r.pos ? "next" : "previous"), l.$slide.removeClass("fancybox-slide--complete fancybox-slide--current fancybox-slide--next fancybox-slide--previous"), l.isComplete = !1, t && (r.isMoved || r.opts.transitionEffect) && (r.isMoved ? l.$slide.addClass(u) : (u = "fancybox-animated " + u + " fancybox-fx-" + r.opts.transitionEffect, i.fancybox.animate(l.$slide, u, t, function () {
              l.$slide.removeClass(u).removeAttr("style")
            }))))
          }
        }
      }, createSlide: function (e) {
        var t, s, n = this;
        return s = e % n.group.length, s = s < 0 ? n.group.length + s : s, !n.slides[e] && n.group[s] && (t = i('<div class="fancybox-slide"></div>').appendTo(n.$refs.stage), n.slides[e] = i.extend(!0, {}, n.group[s], {
          pos: e,
          $slide: t,
          isLoaded: !1
        }), n.updateSlide(n.slides[e])), n.slides[e]
      }, scaleToActual: function (e, t, n) {
        var o, a, r, l, c, d = this, u = d.current, h = u.$content, f = parseInt(u.$slide.width(), 10),
          p = parseInt(u.$slide.height(), 10), m = u.width, _ = u.height;
        "image" != u.type || u.hasError || !h || d.isAnimating || (i.fancybox.stop(h), d.isAnimating = !0, e = e === s ? .5 * f : e, t = t === s ? .5 * p : t, o = i.fancybox.getTranslate(h), l = m / o.width, c = _ / o.height, a = .5 * f - .5 * m, r = .5 * p - .5 * _, m > f && (a = o.left * l - (e * l - e), a > 0 && (a = 0), a < f - m && (a = f - m)), _ > p && (r = o.top * c - (t * c - t), r > 0 && (r = 0), r < p - _ && (r = p - _)), d.updateCursor(m, _), i.fancybox.animate(h, {
          top: r,
          left: a,
          scaleX: l,
          scaleY: c
        }, n || 330, function () {
          d.isAnimating = !1
        }), d.SlideShow && d.SlideShow.isActive && d.SlideShow.stop())
      }, scaleToFit: function (e) {
        var t, s = this, n = s.current, o = n.$content;
        "image" != n.type || n.hasError || !o || s.isAnimating || (i.fancybox.stop(o), s.isAnimating = !0, t = s.getFitPos(n), s.updateCursor(t.width, t.height), i.fancybox.animate(o, {
          top: t.top,
          left: t.left,
          scaleX: t.width / o.width(),
          scaleY: t.height / o.height()
        }, e || 330, function () {
          s.isAnimating = !1
        }))
      }, getFitPos: function (e) {
        var t, s, n, o, r, l = this, c = e.$content, d = e.width, u = e.height, h = e.opts.margin;
        return !(!c || !c.length || !d && !u) && ("number" === i.type(h) && (h = [h, h]), 2 == h.length && (h = [h[0], h[1], h[0], h[1]]), a.width() < 800 && (h = [0, 0, 0, 0]), t = parseInt(l.$refs.stage.width(), 10) - (h[1] + h[3]), s = parseInt(l.$refs.stage.height(), 10) - (h[0] + h[2]), n = Math.min(1, t / d, s / u), o = Math.floor(n * d), r = Math.floor(n * u), {
          top: Math.floor(.5 * (s - r)) + h[0],
          left: Math.floor(.5 * (t - o)) + h[3],
          width: o,
          height: r
        })
      }, update: function () {
        var e = this;
        i.each(e.slides, function (t, i) {
          e.updateSlide(i)
        })
      }, updateSlide: function (e) {
        var t = this, s = e.$content;
        s && (e.width || e.height) && (i.fancybox.stop(s), i.fancybox.setTranslate(s, t.getFitPos(e)), e.pos === t.currPos && t.updateCursor()), e.$slide.trigger("refresh"), t.trigger("onUpdate", e)
      }, updateCursor: function (e, t) {
        var i, n = this,
          o = n.$refs.container.removeClass("fancybox-is-zoomable fancybox-can-zoomIn fancybox-can-drag fancybox-can-zoomOut");
        n.current && !n.isClosing && (n.isZoomable() ? (o.addClass("fancybox-is-zoomable"), i = e !== s && t !== s ? e < n.current.width && t < n.current.height : n.isScaledDown(), i ? o.addClass("fancybox-can-zoomIn") : n.current.opts.touch ? o.addClass("fancybox-can-drag") : o.addClass("fancybox-can-zoomOut")) : n.current.opts.touch && o.addClass("fancybox-can-drag"))
      }, isZoomable: function () {
        var e, t = this, s = t.current;
        if (s && !t.isClosing) return !!("image" === s.type && s.isLoaded && !s.hasError && ("zoom" === s.opts.clickContent || i.isFunction(s.opts.clickContent) && "zoom" === s.opts.clickContent(s)) && (e = t.getFitPos(s), s.width > e.width || s.height > e.height))
      }, isScaledDown: function () {
        var e = this, t = e.current, s = t.$content, n = !1;
        return s && (n = i.fancybox.getTranslate(s), n = n.width < t.width || n.height < t.height), n
      }, canPan: function () {
        var e = this, t = e.current, i = t.$content, s = !1;
        return i && (s = e.getFitPos(t), s = Math.abs(i.width() - s.width) > 1 || Math.abs(i.height() - s.height) > 1), s
      }, loadSlide: function (e) {
        var t, s, n, o = this;
        if (!e.isLoading && !e.isLoaded) {
          switch (e.isLoading = !0, o.trigger("beforeLoad", e), t = e.type, s = e.$slide, s.off("refresh").trigger("onReset").addClass("fancybox-slide--" + (t || "unknown")).addClass(e.opts.slideClass), t) {
            case"image":
              o.setImage(e);
              break;
            case"iframe":
              o.setIframe(e);
              break;
            case"html":
              o.setContent(e, e.src || e.content);
              break;
            case"inline":
              i(e.src).length ? o.setContent(e, i(e.src)) : o.setError(e);
              break;
            case"ajax":
              o.showLoading(e), n = i.ajax(i.extend({}, e.opts.ajax.settings, {
                url: e.src, success: function (t, i) {
                  "success" === i && o.setContent(e, t)
                }, error: function (t, i) {
                  t && "abort" !== i && o.setError(e)
                }
              })), s.one("onReset", function () {
                n.abort()
              });
              break;
            default:
              o.setError(e)
          }
          return !0
        }
      }, setImage: function (t) {
        var s, n, o, a, r = this, l = t.opts.image.srcset;
        if (l) {
          o = e.devicePixelRatio || 1, a = e.innerWidth * o, n = l.split(",").map(function (e) {
            var t = {};
            return e.trim().split(/\s+/).forEach(function (e, i) {
              var s = parseInt(e.substring(0, e.length - 1), 10);
              return 0 === i ? t.url = e : void (s && (t.value = s, t.postfix = e[e.length - 1]))
            }), t
          }), n.sort(function (e, t) {
            return e.value - t.value
          });
          for (var c = 0; c < n.length; c++) {
            var d = n[c];
            if ("w" === d.postfix && d.value >= a || "x" === d.postfix && d.value >= o) {
              s = d;
              break
            }
          }
          !s && n.length && (s = n[n.length - 1]), s && (t.src = s.url, t.width && t.height && "w" == s.postfix && (t.height = t.width / t.height * s.value, t.width = s.value))
        }
        t.$content = i('<div class="fancybox-image-wrap"></div>').addClass("fancybox-is-hidden").appendTo(t.$slide), t.opts.preload !== !1 && t.opts.width && t.opts.height && (t.opts.thumb || t.opts.$thumb) ? (t.width = t.opts.width, t.height = t.opts.height, t.$ghost = i("<img />").one("error", function () {
          i(this).remove(), t.$ghost = null, r.setBigImage(t)
        }).one("load", function () {
          r.afterLoad(t), r.setBigImage(t)
        }).addClass("fancybox-image").appendTo(t.$content).attr("src", t.opts.thumb || t.opts.$thumb.attr("src"))) : r.setBigImage(t)
      }, setBigImage: function (e) {
        var t = this, s = i("<img />");
        e.$image = s.one("error", function () {
          t.setError(e)
        }).one("load", function () {
          clearTimeout(e.timouts), e.timouts = null, t.isClosing || (e.width = this.naturalWidth, e.height = this.naturalHeight, e.opts.image.srcset && s.attr("sizes", "100vw").attr("srcset", e.opts.image.srcset), t.hideLoading(e), e.$ghost ? e.timouts = setTimeout(function () {
            e.timouts = null, e.$ghost.hide()
          }, Math.min(300, Math.max(1e3, e.height / 1600))) : t.afterLoad(e))
        }).addClass("fancybox-image").attr("src", e.src).appendTo(e.$content), s[0].complete ? s.trigger("load") : s[0].error ? s.trigger("error") : e.timouts = setTimeout(function () {
          s[0].complete || e.hasError || t.showLoading(e)
        }, 100)
      }, setIframe: function (e) {
        var t, n = this, o = e.opts.iframe, a = e.$slide;
        e.$content = i('<div class="fancybox-content' + (o.preload ? " fancybox-is-hidden" : "") + '"></div>').css(o.css).appendTo(a), t = i(o.tpl.replace(/\{rnd\}/g, (new Date).getTime())).attr(o.attr).appendTo(e.$content), o.preload ? (n.showLoading(e), t.on("load.fb error.fb", function (t) {
          this.isReady = 1, e.$slide.trigger("refresh"), n.afterLoad(e)
        }), a.on("refresh.fb", function () {
          var e, i, n, a, r, l = c.$content;
          if (1 === t[0].isReady) {
            try {
              e = t.contents(), i = e.find("body")
            } catch (c) {
            }
            i && i.length && (o.css.width === s || o.css.height === s) && (n = t[0].contentWindow.document.documentElement.scrollWidth, a = Math.ceil(i.outerWidth(!0) + (l.width() - n)), r = Math.ceil(i.outerHeight(!0)), l.css({
              width: o.css.width === s ? a + (l.outerWidth() - l.innerWidth()) : o.css.width,
              height: o.css.height === s ? r + (l.outerHeight() - l.innerHeight()) : o.css.height
            })), l.removeClass("fancybox-is-hidden")
          }
        })) : this.afterLoad(e), t.attr("src", e.src), e.opts.smallBtn === !0 && e.$content.prepend(n.translate(e, e.opts.btnTpl.smallBtn)), a.one("onReset", function () {
          try {
            i(this).find("iframe").hide().attr("src", "//about:blank")
          } catch (e) {
          }
          i(this).empty(), e.isLoaded = !1
        })
      }, setContent: function (e, t) {
        var s = this;
        s.isClosing || (s.hideLoading(e), e.$slide.empty(), c(t) && t.parent().length ? (t.parent(".fancybox-slide--inline").trigger("onReset"), e.$placeholder = i("<div></div>").hide().insertAfter(t), t.css("display", "inline-block")) : e.hasError || ("string" === i.type(t) && (t = i("<div>").append(i.trim(t)).contents(), 3 === t[0].nodeType && (t = i("<div>").html(t))), e.opts.filter && (t = i("<div>").html(t).find(e.opts.filter))), e.$slide.one("onReset", function () {
          e.$placeholder && (e.$placeholder.after(t.hide()).remove(), e.$placeholder = null), e.$smallBtn && (e.$smallBtn.remove(), e.$smallBtn = null), e.hasError || (i(this).empty(), e.isLoaded = !1)
        }), e.$content = i(t).appendTo(e.$slide), e.opts.smallBtn && !e.$smallBtn && (e.$smallBtn = i(s.translate(e, e.opts.btnTpl.smallBtn)).appendTo(e.$content.filter("div").first())), this.afterLoad(e))
      }, setError: function (e) {
        e.hasError = !0, e.$slide.removeClass("fancybox-slide--" + e.type), this.setContent(e, this.translate(e, e.opts.errorTpl))
      }, showLoading: function (e) {
        var t = this;
        e = e || t.current, e && !e.$spinner && (e.$spinner = i(t.opts.spinnerTpl).appendTo(e.$slide))
      }, hideLoading: function (e) {
        var t = this;
        e = e || t.current, e && e.$spinner && (e.$spinner.remove(), delete e.$spinner)
      }, afterLoad: function (e) {
        var t = this;
        t.isClosing || (e.isLoading = !1, e.isLoaded = !0, t.trigger("afterLoad", e), t.hideLoading(e), e.opts.protect && e.$content && !e.hasError && (e.$content.on("contextmenu.fb", function (e) {
          return 2 == e.button && e.preventDefault(), !0
        }), "image" === e.type && i('<div class="fancybox-spaceball"></div>').appendTo(e.$content)), t.revealContent(e))
      }, revealContent: function (e) {
        var t, n, o, a, r, l = this, c = e.$slide, d = !1;
        return t = e.opts[l.firstRun ? "animationEffect" : "transitionEffect"], o = e.opts[l.firstRun ? "animationDuration" : "transitionDuration"], o = parseInt(e.forcedDuration === s ? o : e.forcedDuration, 10), !e.isMoved && e.pos === l.currPos && o || (t = !1), "zoom" !== t || e.pos === l.currPos && o && "image" === e.type && !e.hasError && (d = l.getThumbPos(e)) || (t = "fade"), "zoom" === t ? (r = l.getFitPos(e), r.scaleX = r.width / d.width, r.scaleY = r.height / d.height, delete r.width, delete r.height, a = e.opts.zoomOpacity, "auto" == a && (a = Math.abs(e.width / e.height - d.width / d.height) > .1), a && (d.opacity = .1, r.opacity = 1), i.fancybox.setTranslate(e.$content.removeClass("fancybox-is-hidden"), d), h(e.$content), void i.fancybox.animate(e.$content, r, o, function () {
          l.complete()
        })) : (l.updateSlide(e), t ? (i.fancybox.stop(c), n = "fancybox-animated fancybox-slide--" + (e.pos > l.prevPos ? "next" : "previous") + " fancybox-fx-" + t, c.removeAttr("style").removeClass("fancybox-slide--current fancybox-slide--next fancybox-slide--previous").addClass(n), e.$content.removeClass("fancybox-is-hidden"), h(c), void i.fancybox.animate(c, "fancybox-slide--current", o, function (t) {
          c.removeClass(n).removeAttr("style"), e.pos === l.currPos && l.complete()
        }, !0)) : (h(c), e.$content.removeClass("fancybox-is-hidden"), void (e.pos === l.currPos && l.complete())))
      }, getThumbPos: function (s) {
        var n, o = this, a = !1, r = function (t) {
          for (var s, n = t[0], o = n.getBoundingClientRect(), a = []; null !== n.parentElement;) "hidden" !== i(n.parentElement).css("overflow") && "auto" !== i(n.parentElement).css("overflow") || a.push(n.parentElement.getBoundingClientRect()), n = n.parentElement;
          return s = a.every(function (e) {
            var t = Math.min(o.right, e.right) - Math.max(o.left, e.left),
              i = Math.min(o.bottom, e.bottom) - Math.max(o.top, e.top);
            return t > 0 && i > 0
          }), s && o.bottom > 0 && o.right > 0 && o.left < i(e).width() && o.top < i(e).height()
        }, l = s.opts.$thumb, c = l ? l.offset() : 0;
        return c && l[0].ownerDocument === t && r(l) && (n = o.$refs.stage.offset(), a = {
          top: c.top - n.top + parseFloat(l.css("border-top-width") || 0),
          left: c.left - n.left + parseFloat(l.css("border-left-width") || 0),
          width: l.width(),
          height: l.height(),
          scaleX: 1,
          scaleY: 1
        }), a
      }, complete: function () {
        var e = this, s = e.current, n = {};
        s.isMoved || !s.isLoaded || s.isComplete || (s.isComplete = !0, s.$slide.siblings().trigger("onReset"), h(s.$slide), s.$slide.addClass("fancybox-slide--complete"), i.each(e.slides, function (t, s) {
          s.pos >= e.currPos - 1 && s.pos <= e.currPos + 1 ? n[s.pos] = s : s && (i.fancybox.stop(s.$slide), s.$slide.unbind().remove())
        }), e.slides = n, e.updateCursor(), e.trigger("afterShow"), (i(t.activeElement).is("[disabled]") || s.opts.autoFocus && "image" != s.type && "iframe" !== s.type) && e.focus())
      }, preload: function () {
        var e, t, i = this;
        i.group.length < 2 || (e = i.slides[i.currPos + 1], t = i.slides[i.currPos - 1], e && "image" === e.type && i.loadSlide(e), t && "image" === t.type && i.loadSlide(t))
      }, focus: function () {
        var e, t = this.current;
        this.isClosing || (e = t && t.isComplete ? t.$slide.find("button,:input,[tabindex],a").filter(":not([disabled]):visible:first") : null, e = e && e.length ? e : this.$refs.container, e.focus())
      }, activate: function () {
        var e = this;
        i(".fancybox-container").each(function () {
          var t = i(this).data("FancyBox");
          t && t.uid !== e.uid && !t.isClosing && t.trigger("onDeactivate")
        }), e.current && (e.$refs.container.index() > 0 && e.$refs.container.prependTo(t.body), e.updateControls()), e.trigger("onActivate"), e.addEvents()
      }, close: function (e, t) {
        var s, n, o, a, r, l, c = this, h = c.current, f = function () {
          c.cleanUp(e)
        };
        return !(c.isClosing || (c.isClosing = !0, c.trigger("beforeClose", e) === !1 ? (c.isClosing = !1, d(function () {
          c.update()
        }), 1) : (c.removeEvents(), h.timouts && clearTimeout(h.timouts), o = h.$content, s = h.opts.animationEffect, n = i.isNumeric(t) ? t : s ? h.opts.animationDuration : 0, h.$slide.off(u).removeClass("fancybox-slide--complete fancybox-slide--next fancybox-slide--previous fancybox-animated"), h.$slide.siblings().trigger("onReset").remove(), n && c.$refs.container.removeClass("fancybox-is-open").addClass("fancybox-is-closing"), c.hideLoading(h), c.hideControls(), c.updateCursor(), "zoom" !== s || e !== !0 && o && n && "image" === h.type && !h.hasError && (l = c.getThumbPos(h)) || (s = "fade"), "zoom" === s ? (i.fancybox.stop(o), r = i.fancybox.getTranslate(o), r.width = r.width * r.scaleX, r.height = r.height * r.scaleY, a = h.opts.zoomOpacity, "auto" == a && (a = Math.abs(h.width / h.height - l.width / l.height) > .1), a && (l.opacity = 0), r.scaleX = r.width / l.width, r.scaleY = r.height / l.height, r.width = l.width, r.height = l.height, i.fancybox.setTranslate(h.$content, r), i.fancybox.animate(h.$content, l, n, f), 0) : (s && n ? e === !0 ? setTimeout(f, n) : i.fancybox.animate(h.$slide.removeClass("fancybox-slide--current"), "fancybox-animated fancybox-slide--previous fancybox-fx-" + s, n, f) : f(), 0))))
      }, cleanUp: function (e) {
        var t, s = this;
        s.current.$slide.trigger("onReset"), s.$refs.container.empty().remove(), s.trigger("afterClose", e), s.$lastFocus && s.current.opts.backFocus && s.$lastFocus.focus(), s.current = null, t = i.fancybox.getInstance(), t ? t.activate() : (a.scrollTop(s.scrollTop).scrollLeft(s.scrollLeft), i("html").removeClass("fancybox-enabled"), i("#fancybox-style-noscroll").remove())
      }, trigger: function (e, t) {
        var s, n = Array.prototype.slice.call(arguments, 1), o = this, a = t && t.opts ? t : o.current;
        return a ? n.unshift(a) : a = o, n.unshift(o), i.isFunction(a.opts[e]) && (s = a.opts[e].apply(a, n)), s === !1 ? s : void ("afterClose" === e ? r.trigger(e + ".fb", n) : o.$refs.container.trigger(e + ".fb", n))
      }, updateControls: function (e) {
        var t = this, s = t.current, n = s.index, o = s.opts, a = o.caption, r = t.$refs.caption;
        s.$slide.trigger("refresh"), t.$caption = a && a.length ? r.html(a) : null, t.isHiddenControls || t.showControls(), i("[data-fancybox-count]").html(t.group.length), i("[data-fancybox-index]").html(n + 1), i("[data-fancybox-prev]").prop("disabled", !o.loop && n <= 0), i("[data-fancybox-next]").prop("disabled", !o.loop && n >= t.group.length - 1)
      }, hideControls: function () {
        this.isHiddenControls = !0, this.$refs.container.removeClass("fancybox-show-infobar fancybox-show-toolbar fancybox-show-caption fancybox-show-nav")
      }, showControls: function () {
        var e = this, t = e.current ? e.current.opts : e.opts, i = e.$refs.container;
        e.isHiddenControls = !1, e.idleSecondsCounter = 0, i.toggleClass("fancybox-show-toolbar", !(!t.toolbar || !t.buttons)).toggleClass("fancybox-show-infobar", !!(t.infobar && e.group.length > 1)).toggleClass("fancybox-show-nav", !!(t.arrows && e.group.length > 1)).toggleClass("fancybox-is-modal", !!t.modal), e.$caption ? i.addClass("fancybox-show-caption ") : i.removeClass("fancybox-show-caption")
      }, toggleControls: function () {
        this.isHiddenControls ? this.showControls() : this.hideControls()
      }
    }), i.fancybox = {
      version: "3.1.25",
      defaults: o,
      getInstance: function (e) {
        var t = i('.fancybox-container:not(".fancybox-is-closing"):first').data("FancyBox"),
          s = Array.prototype.slice.call(arguments, 1);
        return t instanceof f && ("string" === i.type(e) ? t[e].apply(t, s) : "function" === i.type(e) && e.apply(t, s), t)
      },
      open: function (e, t, i) {
        return new f(e, t, i)
      },
      close: function (e) {
        var t = this.getInstance();
        t && (t.close(), e === !0 && this.close())
      },
      destroy: function () {
        this.close(!0), r.off("click.fb-start")
      },
      isMobile: t.createTouch !== s && /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent),
      use3d: function () {
        var i = t.createElement("div");
        return e.getComputedStyle && e.getComputedStyle(i).getPropertyValue("transform") && !(t.documentMode && t.documentMode < 11)
      }(),
      getTranslate: function (e) {
        var t;
        if (!e || !e.length) return !1;
        if (t = e.eq(0).css("transform"), t && t.indexOf("matrix") !== -1 ? (t = t.split("(")[1], t = t.split(")")[0], t = t.split(",")) : t = [], t.length) t = t.length > 10 ? [t[13], t[12], t[0], t[5]] : [t[5], t[4], t[0], t[3]], t = t.map(parseFloat); else {
          t = [0, 0, 1, 1];
          var i = /\.*translate\((.*)px,(.*)px\)/i, s = i.exec(e.eq(0).attr("style"));
          s && (t[0] = parseFloat(s[2]), t[1] = parseFloat(s[1]))
        }
        return {
          top: t[0],
          left: t[1],
          scaleX: t[2],
          scaleY: t[3],
          opacity: parseFloat(e.css("opacity")),
          width: e.width(),
          height: e.height()
        }
      },
      setTranslate: function (e, t) {
        var i = "", n = {};
        if (e && t) return t.left === s && t.top === s || (i = (t.left === s ? e.position().left : t.left) + "px, " + (t.top === s ? e.position().top : t.top) + "px", i = this.use3d ? "translate3d(" + i + ", 0px)" : "translate(" + i + ")"), t.scaleX !== s && t.scaleY !== s && (i = (i.length ? i + " " : "") + "scale(" + t.scaleX + ", " + t.scaleY + ")"), i.length && (n.transform = i), t.opacity !== s && (n.opacity = t.opacity), t.width !== s && (n.width = t.width), t.height !== s && (n.height = t.height), e.css(n)
      },
      animate: function (e, t, n, o, a) {
        var r = u || "transitionend";
        i.isFunction(n) && (o = n, n = null), i.isPlainObject(t) || e.removeAttr("style"), e.on(r, function (n) {
          (!n || !n.originalEvent || e.is(n.originalEvent.target) && "z-index" != n.originalEvent.propertyName) && (e.off(r), i.isPlainObject(t) ? t.scaleX !== s && t.scaleY !== s && (e.css("transition-duration", "0ms"), t.width = Math.round(e.width() * t.scaleX), t.height = Math.round(e.height() * t.scaleY), t.scaleX = 1, t.scaleY = 1, i.fancybox.setTranslate(e, t)) : a !== !0 && e.removeClass(t), i.isFunction(o) && o(n))
        }), i.isNumeric(n) && e.css("transition-duration", n + "ms"), i.isPlainObject(t) ? i.fancybox.setTranslate(e, t) : e.addClass(t), e.data("timer", setTimeout(function () {
          e.trigger("transitionend")
        }, n + 16))
      },
      stop: function (e) {
        clearTimeout(e.data("timer")), e.off(u)
      }
    }, i.fn.fancybox = function (e) {
      var t;
      return e = e || {}, t = e.selector || !1, t ? i("body").off("click.fb-start", t).on("click.fb-start", t, {options: e}, n) : this.off("click.fb-start").on("click.fb-start", {
        items: this,
        options: e
      }, n), this
    }, r.on("click.fb-start", "[data-fancybox]", n)
  }
}(window, document, window.jQuery || jQuery), function (e) {
  "use strict";
  var t = function (t, i, s) {
    if (t) return s = s || "", "object" === e.type(s) && (s = e.param(s, !0)), e.each(i, function (e, i) {
      t = t.replace("$" + e, i || "")
    }), s.length && (t += (t.indexOf("?") > 0 ? "&" : "?") + s), t
  }, i = {
    youtube: {
      matcher: /(youtube\.com|youtu\.be|youtube\-nocookie\.com)\/(watch\?(.*&)?v=|v\/|u\/|embed\/?)?(videoseries\?list=(.*)|[\w-]{11}|\?listType=(.*)&list=(.*))(.*)/i,
      params: {autoplay: 1, autohide: 1, fs: 1, rel: 0, hd: 1, wmode: "transparent", enablejsapi: 1, html5: 1},
      paramPlace: 8,
      type: "iframe",
      url: "//www.youtube.com/embed/$4",
      thumb: "//img.youtube.com/vi/$4/hqdefault.jpg"
    },
    vimeo: {
      matcher: /^.+vimeo.com\/(.*\/)?([\d]+)(.*)?/,
      params: {autoplay: 1, hd: 1, show_title: 1, show_byline: 1, show_portrait: 0, fullscreen: 1, api: 1},
      paramPlace: 3,
      type: "iframe",
      url: "//player.vimeo.com/video/$2"
    },
    metacafe: {matcher: /metacafe.com\/watch\/(\d+)\/(.*)?/, type: "iframe", url: "//www.metacafe.com/embed/$1/?ap=1"},
    dailymotion: {
      matcher: /dailymotion.com\/video\/(.*)\/?(.*)/,
      params: {additionalInfos: 0, autoStart: 1},
      type: "iframe",
      url: "//www.dailymotion.com/embed/video/$1"
    },
    vine: {matcher: /vine.co\/v\/([a-zA-Z0-9\?\=\-]+)/, type: "iframe", url: "//vine.co/v/$1/embed/simple"},
    instagram: {
      matcher: /(instagr\.am|instagram\.com)\/p\/([a-zA-Z0-9_\-]+)\/?/i,
      type: "image",
      url: "//$1/p/$2/media/?size=l"
    },
    gmap_place: {
      matcher: /(maps\.)?google\.([a-z]{2,3}(\.[a-z]{2})?)\/(((maps\/(place\/(.*)\/)?\@(.*),(\d+.?\d+?)z))|(\?ll=))(.*)?/i,
      type: "iframe",
      url: function (e) {
        return "//maps.google." + e[2] + "/?ll=" + (e[9] ? e[9] + "&z=" + Math.floor(e[10]) + (e[12] ? e[12].replace(/^\//, "&") : "") : e[12]) + "&output=" + (e[12] && e[12].indexOf("layer=c") > 0 ? "svembed" : "embed")
      }
    },
    gmap_search: {
      matcher: /(maps\.)?google\.([a-z]{2,3}(\.[a-z]{2})?)\/(maps\/search\/)(.*)/i,
      type: "iframe",
      url: function (e) {
        return "//maps.google." + e[2] + "/maps?q=" + e[5].replace("query=", "q=").replace("api=1", "") + "&output=embed"
      }
    }
  };
  e(document).on("onInit.fb", function (s, n) {
    e.each(n.group, function (s, n) {
      var o, a, r, l, c, d, u, h = n.src || "", f = !1;
      n.type || (o = e.extend(!0, {}, i, n.opts.media), e.each(o, function (i, s) {
        if (r = h.match(s.matcher), d = {}, u = i, r) {
          if (f = s.type, s.paramPlace && r[s.paramPlace]) {
            c = r[s.paramPlace], "?" == c[0] && (c = c.substring(1)), c = c.split("&");
            for (var o = 0; o < c.length; ++o) {
              var p = c[o].split("=", 2);
              2 == p.length && (d[p[0]] = decodeURIComponent(p[1].replace(/\+/g, " ")))
            }
          }
          return l = e.extend(!0, {}, s.params, n.opts[i], d), h = "function" === e.type(s.url) ? s.url.call(this, r, l, n) : t(s.url, r, l), a = "function" === e.type(s.thumb) ? s.thumb.call(this, r, l, n) : t(s.thumb, r), "vimeo" === u && (h = h.replace("&%23", "#")), !1
        }
      }), f ? (n.src = h, n.type = f, n.opts.thumb || n.opts.$thumb && n.opts.$thumb.length || (n.opts.thumb = a), "iframe" === f && (e.extend(!0, n.opts, {
        iframe: {
          preload: !1,
          attr: {scrolling: "no"}
        }
      }), n.contentProvider = u, n.opts.slideClass += " fancybox-slide--" + ("gmap_place" == u || "gmap_search" == u ? "map" : "video"))) : n.type = "image")
    })
  })
}(window.jQuery), function (e, t, i) {
  "use strict";
  var s = function () {
    return e.requestAnimationFrame || e.webkitRequestAnimationFrame || e.mozRequestAnimationFrame || e.oRequestAnimationFrame || function (t) {
      return e.setTimeout(t, 1e3 / 60)
    }
  }(), n = function () {
    return e.cancelAnimationFrame || e.webkitCancelAnimationFrame || e.mozCancelAnimationFrame || e.oCancelAnimationFrame || function (t) {
      e.clearTimeout(t)
    }
  }(), o = function (t) {
    var i = [];
    t = t.originalEvent || t || e.e, t = t.touches && t.touches.length ? t.touches : t.changedTouches && t.changedTouches.length ? t.changedTouches : [t];
    for (var s in t) t[s].pageX ? i.push({x: t[s].pageX, y: t[s].pageY}) : t[s].clientX && i.push({
      x: t[s].clientX,
      y: t[s].clientY
    });
    return i
  }, a = function (e, t, i) {
    return t && e ? "x" === i ? e.x - t.x : "y" === i ? e.y - t.y : Math.sqrt(Math.pow(e.x - t.x, 2) + Math.pow(e.y - t.y, 2)) : 0
  }, r = function (e) {
    if (e.is("a,button,input,select,textarea") || i.isFunction(e.get(0).onclick) || e.data("selectable")) return !0;
    for (var t = 0, s = e[0].attributes, n = s.length; t < n; t++) if ("data-fancybox-" === s[t].nodeName.substr(0, 14)) return !0;
    return !1
  }, l = function (t) {
    var i = e.getComputedStyle(t)["overflow-y"], s = e.getComputedStyle(t)["overflow-x"],
      n = ("scroll" === i || "auto" === i) && t.scrollHeight > t.clientHeight,
      o = ("scroll" === s || "auto" === s) && t.scrollWidth > t.clientWidth;
    return n || o
  }, c = function (e) {
    for (var t = !1; !(t = l(e.get(0))) && (e = e.parent(), e.length && !e.hasClass("fancybox-stage") && !e.is("body"));) ;
    return t
  }, d = function (e) {
    var t = this;
    t.instance = e, t.$bg = e.$refs.bg, t.$stage = e.$refs.stage, t.$container = e.$refs.container, t.destroy(), t.$container.on("touchstart.fb.touch mousedown.fb.touch", i.proxy(t, "ontouchstart"))
  };
  d.prototype.destroy = function () {
    this.$container.off(".fb.touch")
  }, d.prototype.ontouchstart = function (s) {
    var n = this, l = i(s.target), d = n.instance, u = d.current, h = u.$content, f = "touchstart" == s.type;
    if (f && n.$container.off("mousedown.fb.touch"), !u || n.instance.isAnimating || n.instance.isClosing) return s.stopPropagation(), void s.preventDefault();
    if ((!s.originalEvent || 2 != s.originalEvent.button) && l.length && !r(l) && !r(l.parent()) && !(s.originalEvent.clientX > l[0].clientWidth + l.offset().left) && (n.startPoints = o(s), n.startPoints && !(n.startPoints.length > 1 && d.isSliding))) {
      if (n.$target = l, n.$content = h, n.canTap = !0, i(t).off(".fb.touch"), i(t).on(f ? "touchend.fb.touch touchcancel.fb.touch" : "mouseup.fb.touch mouseleave.fb.touch", i.proxy(n, "ontouchend")), i(t).on(f ? "touchmove.fb.touch" : "mousemove.fb.touch", i.proxy(n, "ontouchmove")), !d.current.opts.touch && !d.canPan() || !l.is(n.$stage) && !n.$stage.find(l).length) return void (l.is("img") && s.preventDefault());
      s.stopPropagation(), i.fancybox.isMobile && (c(n.$target) || c(n.$target.parent())) || s.preventDefault(), n.canvasWidth = Math.round(u.$slide[0].clientWidth), n.canvasHeight = Math.round(u.$slide[0].clientHeight), n.startTime = (new Date).getTime(), n.distanceX = n.distanceY = n.distance = 0, n.isPanning = !1, n.isSwiping = !1, n.isZooming = !1, n.sliderStartPos = n.sliderLastPos || {
        top: 0,
        left: 0
      }, n.contentStartPos = i.fancybox.getTranslate(n.$content), n.contentLastPos = null, 1 !== n.startPoints.length || n.isZooming || (n.canTap = !d.isSliding, "image" === u.type && (n.contentStartPos.width > n.canvasWidth + 1 || n.contentStartPos.height > n.canvasHeight + 1) ? (i.fancybox.stop(n.$content), n.$content.css("transition-duration", "0ms"), n.isPanning = !0) : n.isSwiping = !0, n.$container.addClass("fancybox-controls--isGrabbing")), 2 !== n.startPoints.length || d.isAnimating || u.hasError || "image" !== u.type || !u.isLoaded && !u.$ghost || (n.isZooming = !0, n.isSwiping = !1, n.isPanning = !1, i.fancybox.stop(n.$content), n.$content.css("transition-duration", "0ms"), n.centerPointStartX = .5 * (n.startPoints[0].x + n.startPoints[1].x) - i(e).scrollLeft(), n.centerPointStartY = .5 * (n.startPoints[0].y + n.startPoints[1].y) - i(e).scrollTop(), n.percentageOfImageAtPinchPointX = (n.centerPointStartX - n.contentStartPos.left) / n.contentStartPos.width, n.percentageOfImageAtPinchPointY = (n.centerPointStartY - n.contentStartPos.top) / n.contentStartPos.height, n.startDistanceBetweenFingers = a(n.startPoints[0], n.startPoints[1]))
    }
  }, d.prototype.ontouchmove = function (e) {
    var t = this;
    if (t.newPoints = o(e), i.fancybox.isMobile && (c(t.$target) || c(t.$target.parent()))) return e.stopPropagation(), void (t.canTap = !1);
    if ((t.instance.current.opts.touch || t.instance.canPan()) && t.newPoints && t.newPoints.length && (t.distanceX = a(t.newPoints[0], t.startPoints[0], "x"), t.distanceY = a(t.newPoints[0], t.startPoints[0], "y"), t.distance = a(t.newPoints[0], t.startPoints[0]), t.distance > 0)) {
      if (!t.$target.is(t.$stage) && !t.$stage.find(t.$target).length) return;
      e.stopPropagation(), e.preventDefault(), t.isSwiping ? t.onSwipe() : t.isPanning ? t.onPan() : t.isZooming && t.onZoom()
    }
  }, d.prototype.onSwipe = function () {
    var t, o = this, a = o.isSwiping, r = o.sliderStartPos.left || 0;
    a === !0 ? Math.abs(o.distance) > 10 && (o.canTap = !1, o.instance.group.length < 2 && o.instance.opts.touch.vertical ? o.isSwiping = "y" : o.instance.isSliding || o.instance.opts.touch.vertical === !1 || "auto" === o.instance.opts.touch.vertical && i(e).width() > 800 ? o.isSwiping = "x" : (t = Math.abs(180 * Math.atan2(o.distanceY, o.distanceX) / Math.PI), o.isSwiping = t > 45 && t < 135 ? "y" : "x"), o.instance.isSliding = o.isSwiping, o.startPoints = o.newPoints, i.each(o.instance.slides, function (e, t) {
      i.fancybox.stop(t.$slide), t.$slide.css("transition-duration", "0ms"), t.inTransition = !1, t.pos === o.instance.current.pos && (o.sliderStartPos.left = i.fancybox.getTranslate(t.$slide).left)
    }), o.instance.SlideShow && o.instance.SlideShow.isActive && o.instance.SlideShow.stop()) : ("x" == a && (o.distanceX > 0 && (o.instance.group.length < 2 || 0 === o.instance.current.index && !o.instance.current.opts.loop) ? r += Math.pow(o.distanceX, .8) : o.distanceX < 0 && (o.instance.group.length < 2 || o.instance.current.index === o.instance.group.length - 1 && !o.instance.current.opts.loop) ? r -= Math.pow(-o.distanceX, .8) : r += o.distanceX),
      o.sliderLastPos = {
        top: "x" == a ? 0 : o.sliderStartPos.top + o.distanceY,
        left: r
      }, o.requestId && (n(o.requestId), o.requestId = null), o.requestId = s(function () {
      o.sliderLastPos && (i.each(o.instance.slides, function (e, t) {
        var s = t.pos - o.instance.currPos;
        i.fancybox.setTranslate(t.$slide, {
          top: o.sliderLastPos.top,
          left: o.sliderLastPos.left + s * o.canvasWidth + s * t.opts.gutter
        })
      }), o.$container.addClass("fancybox-is-sliding"))
    }))
  }, d.prototype.onPan = function () {
    var e, t, o, a = this;
    a.canTap = !1, e = a.contentStartPos.width > a.canvasWidth ? a.contentStartPos.left + a.distanceX : a.contentStartPos.left, t = a.contentStartPos.top + a.distanceY, o = a.limitMovement(e, t, a.contentStartPos.width, a.contentStartPos.height), o.scaleX = a.contentStartPos.scaleX, o.scaleY = a.contentStartPos.scaleY, a.contentLastPos = o, a.requestId && (n(a.requestId), a.requestId = null), a.requestId = s(function () {
      i.fancybox.setTranslate(a.$content, a.contentLastPos)
    })
  }, d.prototype.limitMovement = function (e, t, i, s) {
    var n, o, a, r, l = this, c = l.canvasWidth, d = l.canvasHeight, u = l.contentStartPos.left,
      h = l.contentStartPos.top, f = l.distanceX, p = l.distanceY;
    return n = Math.max(0, .5 * c - .5 * i), o = Math.max(0, .5 * d - .5 * s), a = Math.min(c - i, .5 * c - .5 * i), r = Math.min(d - s, .5 * d - .5 * s), i > c && (f > 0 && e > n && (e = n - 1 + Math.pow(-n + u + f, .8) || 0), f < 0 && e < a && (e = a + 1 - Math.pow(a - u - f, .8) || 0)), s > d && (p > 0 && t > o && (t = o - 1 + Math.pow(-o + h + p, .8) || 0), p < 0 && t < r && (t = r + 1 - Math.pow(r - h - p, .8) || 0)), {
      top: t,
      left: e
    }
  }, d.prototype.limitPosition = function (e, t, i, s) {
    var n = this, o = n.canvasWidth, a = n.canvasHeight;
    return i > o ? (e = e > 0 ? 0 : e, e = e < o - i ? o - i : e) : e = Math.max(0, o / 2 - i / 2), s > a ? (t = t > 0 ? 0 : t, t = t < a - s ? a - s : t) : t = Math.max(0, a / 2 - s / 2), {
      top: t,
      left: e
    }
  }, d.prototype.onZoom = function () {
    var t = this, o = t.contentStartPos.width, r = t.contentStartPos.height, l = t.contentStartPos.left,
      c = t.contentStartPos.top, d = a(t.newPoints[0], t.newPoints[1]), u = d / t.startDistanceBetweenFingers,
      h = Math.floor(o * u), f = Math.floor(r * u), p = (o - h) * t.percentageOfImageAtPinchPointX,
      m = (r - f) * t.percentageOfImageAtPinchPointY, _ = (t.newPoints[0].x + t.newPoints[1].x) / 2 - i(e).scrollLeft(),
      g = (t.newPoints[0].y + t.newPoints[1].y) / 2 - i(e).scrollTop(), v = _ - t.centerPointStartX,
      b = g - t.centerPointStartY, y = l + (p + v), w = c + (m + b),
      x = {top: w, left: y, scaleX: t.contentStartPos.scaleX * u, scaleY: t.contentStartPos.scaleY * u};
    t.canTap = !1, t.newWidth = h, t.newHeight = f, t.contentLastPos = x, t.requestId && (n(t.requestId), t.requestId = null), t.requestId = s(function () {
      i.fancybox.setTranslate(t.$content, t.contentLastPos)
    })
  }, d.prototype.ontouchend = function (e) {
    var s = this, a = Math.max((new Date).getTime() - s.startTime, 1), r = s.isSwiping, l = s.isPanning,
      c = s.isZooming;
    return s.endPoints = o(e), s.$container.removeClass("fancybox-controls--isGrabbing"), i(t).off(".fb.touch"), s.requestId && (n(s.requestId), s.requestId = null), s.isSwiping = !1, s.isPanning = !1, s.isZooming = !1, s.canTap ? s.onTap(e) : (s.speed = 366, s.velocityX = s.distanceX / a * .5, s.velocityY = s.distanceY / a * .5, s.speedX = Math.max(.5 * s.speed, Math.min(1.5 * s.speed, 1 / Math.abs(s.velocityX) * s.speed)), void (l ? s.endPanning() : c ? s.endZooming() : s.endSwiping(r)))
  }, d.prototype.endSwiping = function (e) {
    var t = this, s = !1;
    t.instance.isSliding = !1, t.sliderLastPos = null, "y" == e && Math.abs(t.distanceY) > 50 ? (i.fancybox.animate(t.instance.current.$slide, {
      top: t.sliderStartPos.top + t.distanceY + 150 * t.velocityY,
      opacity: 0
    }, 150), s = t.instance.close(!0, 300)) : "x" == e && t.distanceX > 50 && t.instance.group.length > 1 ? s = t.instance.previous(t.speedX) : "x" == e && t.distanceX < -50 && t.instance.group.length > 1 && (s = t.instance.next(t.speedX)), s !== !1 || "x" != e && "y" != e || t.instance.jumpTo(t.instance.current.index, 150), t.$container.removeClass("fancybox-is-sliding")
  }, d.prototype.endPanning = function () {
    var e, t, s, n = this;
    n.contentLastPos && (n.instance.current.opts.touch.momentum === !1 ? (e = n.contentLastPos.left, t = n.contentLastPos.top) : (e = n.contentLastPos.left + n.velocityX * n.speed, t = n.contentLastPos.top + n.velocityY * n.speed), s = n.limitPosition(e, t, n.contentStartPos.width, n.contentStartPos.height), s.width = n.contentStartPos.width, s.height = n.contentStartPos.height, i.fancybox.animate(n.$content, s, 330))
  }, d.prototype.endZooming = function () {
    var e, t, s, n, o = this, a = o.instance.current, r = o.newWidth, l = o.newHeight;
    o.contentLastPos && (e = o.contentLastPos.left, t = o.contentLastPos.top, n = {
      top: t,
      left: e,
      width: r,
      height: l,
      scaleX: 1,
      scaleY: 1
    }, i.fancybox.setTranslate(o.$content, n), r < o.canvasWidth && l < o.canvasHeight ? o.instance.scaleToFit(150) : r > a.width || l > a.height ? o.instance.scaleToActual(o.centerPointStartX, o.centerPointStartY, 150) : (s = o.limitPosition(e, t, r, l), i.fancybox.setTranslate(o.content, i.fancybox.getTranslate(o.$content)), i.fancybox.animate(o.$content, s, 150)))
  }, d.prototype.onTap = function (e) {
    var t, s = this, n = i(e.target), a = s.instance, r = a.current, l = e && o(e) || s.startPoints,
      c = l[0] ? l[0].x - s.$stage.offset().left : 0, d = l[0] ? l[0].y - s.$stage.offset().top : 0, u = function (t) {
        var n = r.opts[t];
        if (i.isFunction(n) && (n = n.apply(a, [r, e])), n) switch (n) {
          case"close":
            a.close(s.startEvent);
            break;
          case"toggleControls":
            a.toggleControls(!0);
            break;
          case"next":
            a.next();
            break;
          case"nextOrClose":
            a.group.length > 1 ? a.next() : a.close(s.startEvent);
            break;
          case"zoom":
            "image" == r.type && (r.isLoaded || r.$ghost) && (a.canPan() ? a.scaleToFit() : a.isScaledDown() ? a.scaleToActual(c, d) : a.group.length < 2 && a.close(s.startEvent))
        }
      };
    if (!(e.originalEvent && 2 == e.originalEvent.button || a.isSliding || c > n[0].clientWidth + n.offset().left)) {
      if (n.is(".fancybox-bg,.fancybox-inner,.fancybox-outer,.fancybox-container")) t = "Outside"; else if (n.is(".fancybox-slide")) t = "Slide"; else {
        if (!a.current.$content || !a.current.$content.has(e.target).length) return;
        t = "Content"
      }
      if (s.tapped) {
        if (clearTimeout(s.tapped), s.tapped = null, Math.abs(c - s.tapX) > 50 || Math.abs(d - s.tapY) > 50 || a.isSliding) return this;
        u("dblclick" + t)
      } else s.tapX = c, s.tapY = d, r.opts["dblclick" + t] && r.opts["dblclick" + t] !== r.opts["click" + t] ? s.tapped = setTimeout(function () {
        s.tapped = null, u("click" + t)
      }, 300) : u("click" + t);
      return this
    }
  }, i(t).on("onActivate.fb", function (e, t) {
    t && !t.Guestures && (t.Guestures = new d(t))
  }), i(t).on("beforeClose.fb", function (e, t) {
    t && t.Guestures && t.Guestures.destroy()
  })
}(window, document, window.jQuery), function (e, t) {
  "use strict";
  var i = function (e) {
    this.instance = e, this.init()
  };
  t.extend(i.prototype, {
    timer: null, isActive: !1, $button: null, speed: 3e3, init: function () {
      var e = this;
      e.$button = e.instance.$refs.toolbar.find("[data-fancybox-play]").on("click", function () {
        e.toggle()
      }), (e.instance.group.length < 2 || !e.instance.group[e.instance.currIndex].opts.slideShow) && e.$button.hide()
    }, set: function () {
      var e = this;
      e.instance && e.instance.current && (e.instance.current.opts.loop || e.instance.currIndex < e.instance.group.length - 1) ? e.timer = setTimeout(function () {
        e.instance.next()
      }, e.instance.current.opts.slideShow.speed || e.speed) : (e.stop(), e.instance.idleSecondsCounter = 0, e.instance.showControls())
    }, clear: function () {
      var e = this;
      clearTimeout(e.timer), e.timer = null
    }, start: function () {
      var e = this, t = e.instance.current;
      e.instance && t && (t.opts.loop || t.index < e.instance.group.length - 1) && (e.isActive = !0, e.$button.attr("title", t.opts.i18n[t.opts.lang].PLAY_STOP).addClass("fancybox-button--pause"), t.isComplete && e.set())
    }, stop: function () {
      var e = this, t = e.instance.current;
      e.clear(), e.$button.attr("title", t.opts.i18n[t.opts.lang].PLAY_START).removeClass("fancybox-button--pause"), e.isActive = !1
    }, toggle: function () {
      var e = this;
      e.isActive ? e.stop() : e.start()
    }
  }), t(e).on({
    "onInit.fb": function (e, t) {
      t && !t.SlideShow && (t.SlideShow = new i(t))
    }, "beforeShow.fb": function (e, t, i, s) {
      var n = t && t.SlideShow;
      s ? n && i.opts.slideShow.autoStart && n.start() : n && n.isActive && n.clear()
    }, "afterShow.fb": function (e, t, i) {
      var s = t && t.SlideShow;
      s && s.isActive && s.set()
    }, "afterKeydown.fb": function (i, s, n, o, a) {
      var r = s && s.SlideShow;
      !r || !n.opts.slideShow || 80 !== a && 32 !== a || t(e.activeElement).is("button,a,input") || (o.preventDefault(), r.toggle())
    }, "beforeClose.fb onDeactivate.fb": function (e, t) {
      var i = t && t.SlideShow;
      i && i.stop()
    }
  }), t(e).on("visibilitychange", function () {
    var i = t.fancybox.getInstance(), s = i && i.SlideShow;
    s && s.isActive && (e.hidden ? s.clear() : s.set())
  })
}(document, window.jQuery), function (e, t) {
  "use strict";
  var i = function () {
    var t, i, s,
      n = [["requestFullscreen", "exitFullscreen", "fullscreenElement", "fullscreenEnabled", "fullscreenchange", "fullscreenerror"], ["webkitRequestFullscreen", "webkitExitFullscreen", "webkitFullscreenElement", "webkitFullscreenEnabled", "webkitfullscreenchange", "webkitfullscreenerror"], ["webkitRequestFullScreen", "webkitCancelFullScreen", "webkitCurrentFullScreenElement", "webkitCancelFullScreen", "webkitfullscreenchange", "webkitfullscreenerror"], ["mozRequestFullScreen", "mozCancelFullScreen", "mozFullScreenElement", "mozFullScreenEnabled", "mozfullscreenchange", "mozfullscreenerror"], ["msRequestFullscreen", "msExitFullscreen", "msFullscreenElement", "msFullscreenEnabled", "MSFullscreenChange", "MSFullscreenError"]],
      o = {};
    for (i = 0; i < n.length; i++) if (t = n[i], t && t[1] in e) {
      for (s = 0; s < t.length; s++) o[n[0][s]] = t[s];
      return o
    }
    return !1
  }();
  if (!i) return void (t && t.fancybox && (t.fancybox.defaults.btnTpl.fullScreen = !1));
  var s = {
    request: function (t) {
      t = t || e.documentElement, t[i.requestFullscreen](t.ALLOW_KEYBOARD_INPUT)
    }, exit: function () {
      e[i.exitFullscreen]()
    }, toggle: function (t) {
      t = t || e.documentElement, this.isFullscreen() ? this.exit() : this.request(t)
    }, isFullscreen: function () {
      return Boolean(e[i.fullscreenElement])
    }, enabled: function () {
      return Boolean(e[i.fullscreenEnabled])
    }
  };
  t(e).on({
    "onInit.fb": function (e, t) {
      var i, n = t.$refs.toolbar.find("[data-fancybox-fullscreen]");
      t && !t.FullScreen && t.group[t.currIndex].opts.fullScreen ? (i = t.$refs.container, i.on("click.fb-fullscreen", "[data-fancybox-fullscreen]", function (e) {
        e.stopPropagation(), e.preventDefault(), s.toggle(i[0])
      }), t.opts.fullScreen && t.opts.fullScreen.autoStart === !0 && s.request(i[0]), t.FullScreen = s) : n.hide()
    }, "afterKeydown.fb": function (e, t, i, s, n) {
      t && t.FullScreen && 70 === n && (s.preventDefault(), t.FullScreen.toggle(t.$refs.container[0]))
    }, "beforeClose.fb": function (e) {
      e && e.FullScreen && s.exit()
    }
  }), t(e).on(i.fullscreenchange, function () {
    var e = t.fancybox.getInstance();
    e.current && "image" === e.current.type && e.isAnimating && (e.current.$content.css("transition", "none"), e.isAnimating = !1, e.update(!0, !0, 0)), e.trigger("onFullscreenChange", s.isFullscreen())
  })
}(document, window.jQuery), function (e, t) {
  "use strict";
  var i = function (e) {
    this.instance = e, this.init()
  };
  t.extend(i.prototype, {
    $button: null, $grid: null, $list: null, isVisible: !1, init: function () {
      var e = this, t = e.instance.group[0], i = e.instance.group[1];
      e.$button = e.instance.$refs.toolbar.find("[data-fancybox-thumbs]"), e.instance.group.length > 1 && e.instance.group[e.instance.currIndex].opts.thumbs && ("image" == t.type || t.opts.thumb || t.opts.$thumb) && ("image" == i.type || i.opts.thumb || i.opts.$thumb) ? (e.$button.on("click", function () {
        e.toggle()
      }), e.isActive = !0) : (e.$button.hide(), e.isActive = !1)
    }, create: function () {
      var e, i, s = this.instance;
      this.$grid = t('<div class="fancybox-thumbs"></div>').appendTo(s.$refs.container), e = "<ul>", t.each(s.group, function (t, s) {
        i = s.opts.thumb || (s.opts.$thumb ? s.opts.$thumb.attr("src") : null), i || "image" !== s.type || (i = s.src), i && i.length && (e += '<li data-index="' + t + '"  tabindex="0" class="fancybox-thumbs-loading"><img data-src="' + i + '" /></li>')
      }), e += "</ul>", this.$list = t(e).appendTo(this.$grid).on("click", "li", function () {
        s.jumpTo(t(this).data("index"))
      }), this.$list.find("img").hide().one("load", function () {
        var e, i, s, n, o = t(this).parent().removeClass("fancybox-thumbs-loading"), a = o.outerWidth(),
          r = o.outerHeight();
        e = this.naturalWidth || this.width, i = this.naturalHeight || this.height, s = e / a, n = i / r, s >= 1 && n >= 1 && (s > n ? (e /= n, i = r) : (e = a, i /= s)), t(this).css({
          width: Math.floor(e),
          height: Math.floor(i),
          "margin-top": Math.min(0, Math.floor(.3 * r - .3 * i)),
          "margin-left": Math.min(0, Math.floor(.5 * a - .5 * e))
        }).show()
      }).each(function () {
        this.src = t(this).data("src")
      })
    }, focus: function () {
      this.instance.current && this.$list.children().removeClass("fancybox-thumbs-active").filter('[data-index="' + this.instance.current.index + '"]').addClass("fancybox-thumbs-active").focus()
    }, close: function () {
      this.$grid.hide()
    }, update: function () {
      this.instance.$refs.container.toggleClass("fancybox-show-thumbs", this.isVisible), this.isVisible ? (this.$grid || this.create(), this.instance.trigger("onThumbsShow"), this.focus()) : this.$grid && this.instance.trigger("onThumbsHide"), this.instance.update()
    }, hide: function () {
      this.isVisible = !1, this.update()
    }, show: function () {
      this.isVisible = !0, this.update()
    }, toggle: function () {
      this.isVisible = !this.isVisible, this.update()
    }
  }), t(e).on({
    "onInit.fb": function (e, t) {
      t && !t.Thumbs && (t.Thumbs = new i(t))
    }, "beforeShow.fb": function (e, t, i, s) {
      var n = t && t.Thumbs;
      if (n && n.isActive) {
        if (i.modal) return n.$button.hide(), void n.hide();
        s && t.opts.thumbs.autoStart === !0 && n.show(), n.isVisible && n.focus()
      }
    }, "afterKeydown.fb": function (e, t, i, s, n) {
      var o = t && t.Thumbs;
      o && o.isActive && 71 === n && (s.preventDefault(), o.toggle())
    }, "beforeClose.fb": function (e, t) {
      var i = t && t.Thumbs;
      i && i.isVisible && t.opts.thumbs.hideOnClose !== !1 && i.close()
    }
  })
}(document, window.jQuery), function (e, t, i) {
  "use strict";

  function s() {
    var e = t.location.hash.substr(1), i = e.split("-"),
      s = i.length > 1 && /^\+?\d+$/.test(i[i.length - 1]) ? parseInt(i.pop(-1), 10) || 1 : 1, n = i.join("-");
    return s < 1 && (s = 1), {hash: e, index: s, gallery: n}
  }

  function n(e) {
    var t;
    "" !== e.gallery && (t = i("[data-fancybox='" + i.escapeSelector(e.gallery) + "']").eq(e.index - 1), t.length || (t = i("#" + i.escapeSelector(e.gallery))), t.length && (a = !1, t.trigger("click")))
  }

  function o(e) {
    var t;
    return !!e && (t = e.current ? e.current.opts : e.opts, t.hash || (t.$orig ? t.$orig.data("fancybox") : ""))
  }

  i.escapeSelector || (i.escapeSelector = function (e) {
    var t = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\x80-\uFFFF\w-]/g, i = function (e, t) {
      return t ? "\0" === e ? "�" : e.slice(0, -1) + "\\" + e.charCodeAt(e.length - 1).toString(16) + " " : "\\" + e
    };
    return (e + "").replace(t, i)
  });
  var a = !0, r = null, l = null;
  i(function () {
    setTimeout(function () {
      i.fancybox.defaults.hash !== !1 && (i(e).on({
        "onInit.fb": function (e, t) {
          var i, n;
          t.group[t.currIndex].opts.hash !== !1 && (i = s(), n = o(t), n && i.gallery && n == i.gallery && (t.currIndex = i.index - 1))
        }, "beforeShow.fb": function (i, s, n) {
          var c;
          n && n.opts.hash !== !1 && (c = o(s), c && "" !== c && (t.location.hash.indexOf(c) < 0 && (s.opts.origHash = t.location.hash), r = c + (s.group.length > 1 ? "-" + (n.index + 1) : ""), "replaceState" in t.history ? (l && clearTimeout(l), l = setTimeout(function () {
            t.history[a ? "pushState" : "replaceState"]({}, e.title, t.location.pathname + t.location.search + "#" + r), l = null, a = !1
          }, 300)) : t.location.hash = r))
        }, "beforeClose.fb": function (s, n, a) {
          var c, d;
          l && clearTimeout(l), a.opts.hash !== !1 && (c = o(n), d = n && n.opts.origHash ? n.opts.origHash : "", c && "" !== c && ("replaceState" in history ? t.history.replaceState({}, e.title, t.location.pathname + t.location.search + d) : (t.location.hash = d, i(t).scrollTop(n.scrollTop).scrollLeft(n.scrollLeft))), r = null)
        }
      }), i(t).on("hashchange.fb", function () {
        var e = s();
        i.fancybox.getInstance() ? !r || r === e.gallery + "-" + e.index || 1 === e.index && r == e.gallery || (r = null, i.fancybox.close()) : "" !== e.gallery && n(e)
      }), n(s()))
    }, 50)
  })
}(document, window, window.jQuery), function (e) {
  "use strict";

  function t(e, t) {
    var i = decodeURIComponent(e);
    if (i.length <= t) return e;
    var s = i.substring(0, t - 1).lastIndexOf(" ");
    return i = encodeURIComponent(i.substring(0, s)) + "…"
  }

  function i(t) {
    var i = e('meta[name="' + t + '"]').attr("content");
    return i || ""
  }

  function s() {
    var t = i("DC.title"), s = i("DC.creator");
    return t.length > 0 && s.length > 0 ? t += " - " + s : t = e("title").text(), encodeURIComponent(t)
  }

  function n() {
    var t = document.location.href, i = e("link[rel=canonical]").attr("href");
    return i && i.length > 0 && (i.indexOf("http") < 0 && (i = document.location.protocol + "//" + document.location.host + i), t = i), t
  }

  function o(e, t, i, s, n) {
    var o = new Date;
    o.setTime(o.getTime() + 24 * i * 60 * 60 * 1e3), document.cookie = e + "=" + t + "; expires=" + o.toUTCString() + "; path=" + s + "; domain=" + n
  }

  function a(e, t, i, s) {
    var n = new Date;
    n.setTime(n.getTime() - 100), document.cookie = e + "=" + t + "; expires=" + n.toUTCString() + "; path=" + i + "; domain=" + s
  }

  e.fn.socialSharePrivacy = function (i) {
    function r() {
      var t = e.Deferred();
      return e.getJSON(c.lang_path + c.language + ".lang", function (e) {
        p = e, t.resolve()
      }).fail(function (e) {
        "undefined" != typeof console && console.log("Error " + e.status + " while loading the language file (" + c.lang_path + c.language + ".lang)"), t.reject()
      }), t.promise()
    }

    var l = {
        services: {
          facebook: {
            status: "on",
            dummy_img: "/typo3conf/ext/in2template/Resources/Public/Images/socialshare/dummy_facebook.png",
            perma_option: "on",
            referrer_track: "",
            action: "recommend",
            layout: "button_count",
            sharer: {
              status: "off",
              dummy_img: "/typo3conf/ext/in2template/Resources/Public/Images/socialshare/dummy_facebook_share_de.png",
              img: "/typo3conf/ext/in2template/Resources/Public/Images/socialshare/dummy_facebook_share_active_de.png"
            }
          },
          twitter: {
            status: "on",
            dummy_img: "/typo3conf/ext/in2template/Resources/Public/Images/socialshare/dummy_twitter.png",
            perma_option: "on",
            referrer_track: "",
            tweet_text: s,
            count: "horizontal"
          },
          gplus: {
            status: "on",
            dummy_img: "/typo3conf/ext/in2template/Resources/Public/Images/socialshare/dummy_gplus.png",
            perma_option: "on",
            referrer_track: "",
            size: "medium"
          }
        },
        info_link: "http://www.heise.de/ct/artikel/2-Klicks-fuer-mehr-Datenschutz-1333879.html",
        cookie_path: "/",
        cookie_domain: document.location.host,
        cookie_expires: "365",
        css_path: "",
        uri: n,
        language: "socialshareprivacy",
        lang_path: "/typo3conf/ext/in2template/tu/layout/language/",
        skin: "light",
        alignment: "horizontal",
        switch_alignment: "left",
        perma_orientation: "down"
      }, c = e.extend(!0, l, i), d = "on" === c.services.facebook.status, u = "on" === c.services.facebook.sharer.status,
      h = "on" === c.services.twitter.status, f = "on" === c.services.gplus.status;
    if (d || h || f) {
      c.css_path.length > 0 && "1" != e(window).data("socialshareprivacy_css") && (document.createStyleSheet ? document.createStyleSheet(c.css_path) : e("head").append('<link rel="stylesheet" type="text/css" href="' + c.css_path + '" />'), e(window).data("socialshareprivacy_css", "1"));
      var p;
      return this.each(function () {
        var i = this;
        e.when(r()).then(function () {
          e(i).prepend('<ul class="social_share_privacy_area clearfix"></ul>');
          var s = e(".social_share_privacy_area", i);
          "dark" == c.skin && e(s).addClass("skin-dark"), "vertical" == c.alignment && (e(s).addClass("vertical"), "right" == c.switch_alignment && (d && "box_count" == c.services.facebook.layout || !d) && (h && "vertical" == c.services.twitter.count || !h) && (f && "tall" == c.services.gplus.size || !f) && e(s).addClass("switch_right"));
          var n = c.uri;
          if ("function" == typeof n && (n = n(s)), d) {
            var r, l, m = "box_count" == c.services.facebook.layout ? "61" : "21",
              _ = "box_count" == c.services.facebook.layout ? "90" : "130",
              g = encodeURIComponent(n + c.services.facebook.referrer_track);
            u ? (r = '<img src="' + c.services.facebook.sharer.dummy_img + '" alt="Facebook &quot;Share&quot;-Dummy" class="fb_like_privacy_dummy" />', l = '<a href="#" onclick="window.open(\'https://www.facebook.com/sharer/sharer.php?u=' + g + "', 'facebook-share-dialog', 'width=626,height=436'); return false;\"><img src=\"" + c.services.facebook.sharer.img + '" alt="" /></a>') : (r = '<img src="' + c.services.facebook.dummy_img + '" alt="Facebook &quot;Like&quot;-Dummy" class="fb_like_privacy_dummy" />', l = '<iframe src="//www.facebook.com/plugins/like.php?locale=' + p.services.facebook.language + "&amp;href=" + g + "&amp;width=" + _ + "&amp;layout=" + c.services.facebook.layout + "&amp;action=" + c.services.facebook.action + "&amp;show_faces=false&amp;share=false&amp;height=" + m + "&amp;colorscheme=" + c.skin + '" scrolling="no" frameborder="0" style="border:none; overflow:hidden; width:' + _ + "px; height:" + m + 'px;" allowTransparency="true"></iframe>'), s.append('<li class="facebook help_info clearfix"><span class="info">' + p.services.facebook.txt_info + '</span><a href="#" class="switch off">' + p.services.facebook.txt_fb_off + '</a><div class="fb_like dummy_btn">' + r + "</div></li>");
            var v = e("li.facebook", s);
            e(s).on("click", "li.facebook div.fb_like img.fb_like_privacy_dummy,li.facebook .switch", function (e) {
              e.preventDefault(), v.find(".switch").hasClass("off") ? (v.addClass("info_off"), v.find(".switch").addClass("on").removeClass("off").html(p.services.facebook.txt_fb_on), v.find("img.fb_like_privacy_dummy").replaceWith(l)) : (v.removeClass("info_off"), v.find(".switch").addClass("off").removeClass("on").html(p.services.facebook.txt_fb_off), v.find(".fb_like").html(r))
            })
          }
          if (h) {
            var b = c.services.twitter.tweet_text;
            "function" == typeof b && (b = b()), b = t(b, "120");
            var y = "horizontal" == c.services.twitter.count ? "25" : "62",
              w = "horizontal" == c.services.twitter.count ? "130" : "83",
              x = encodeURIComponent(n + c.services.twitter.referrer_track), S = encodeURIComponent(n),
              C = '<iframe allowtransparency="true" frameborder="0" scrolling="no" src="//platform.twitter.com/widgets/tweet_button.html?url=' + x + "&amp;counturl=" + S + "&amp;text=" + b + "&amp;count=" + c.services.twitter.count + "&amp;lang=" + p.services.twitter.language + '&amp;dnt=true" style="width:' + w + "px; height:" + y + 'px;"></iframe>',
              k = '<img src="' + c.services.twitter.dummy_img + '" alt="&quot;Tweet this&quot;-Dummy" class="tweet_this_dummy" />';
            s.append('<li class="twitter help_info clearfix"><span class="info">' + p.services.twitter.txt_info + '</span><a href="#" class="switch off">' + p.services.twitter.txt_twitter_off + '</a><div class="tweet dummy_btn">' + k + "</div></li>");
            var T = e("li.twitter", s);
            e(s).on("click", "li.twitter div.tweet img,li.twitter .switch", function (e) {
              e.preventDefault(), T.find(".switch").hasClass("off") ? (T.addClass("info_off"), T.find(".switch").addClass("on").removeClass("off").html(p.services.twitter.txt_twitter_on), T.find("img.tweet_this_dummy").replaceWith(C)) : (T.removeClass("info_off"), T.find(".switch").addClass("off").removeClass("on").html(p.services.twitter.txt_twitter_off), T.find(".tweet").html(k))
            })
          }
          if (f) {
            var I = n + c.services.gplus.referrer_track,
              P = '<div class="g-plusone" data-size="' + c.services.gplus.size + '" data-href="' + I + '"></div><script type="text/javascript">window.___gcfg = {lang: "' + p.services.gplus.language + '"}; (function() { var po = document.createElement("script"); po.type = "text/javascript"; po.async = true; po.src = "https://apis.google.com/js/platform.js"; var s = document.getElementsByTagName("script")[0]; s.parentNode.insertBefore(po, s); })(); </script>',
              A = '<img src="' + c.services.gplus.dummy_img + '" alt="&quot;Google+1&quot;-Dummy" class="gplus_one_dummy" />';
            s.append('<li class="gplus help_info clearfix"><span class="info">' + p.services.gplus.txt_info + '</span><a href="#" class="switch off">' + p.services.gplus.txt_gplus_off + '</a><div class="gplusone dummy_btn">' + A + "</div></li>");
            var M = e("li.gplus", s);
            e(s).on("click", "li.gplus div.gplusone img,li.gplus .switch", function (e) {
              e.preventDefault(), M.find(".switch").hasClass("off") ? (M.addClass("info_off"), M.find(".switch").addClass("on").removeClass("off").html(p.services.gplus.txt_gplus_on), M.find("img.gplus_one_dummy").replaceWith(P)) : (M.removeClass("info_off"), M.find(".switch").addClass("off").removeClass("on").html(p.services.gplus.txt_gplus_off), M.find(".gplusone").html(A))
            })
          }
          s.append('<li class="settings_info ' + c.perma_orientation + '"><div class="settings_info_menu off perma_option_off"><a href="' + c.info_link + '"><span class="help_info icon"><span class="info">' + p.txt_help + "</span></span></a></div></li>"), e(s).on("mouseenter", ".help_info:not(.info_off)", function () {
            var t = e(this), i = window.setTimeout(function () {
              e(t).addClass("display")
            }, 500);
            e(this).data("timeout_id", i)
          }), e(s).on("mouseleave", ".help_info", function () {
            var t = e(this).data("timeout_id");
            window.clearTimeout(t), e(this).hasClass("display") && e(this).removeClass("display")
          });
          var E = "on" === c.services.facebook.perma_option, $ = "on" === c.services.twitter.perma_option,
            N = "on" === c.services.gplus.perma_option;
          if (d && E || h && $ || f && N) {
            for (var L = document.cookie.split(";"), O = "{", j = 0; j < L.length; j += 1) {
              var z = L[j].split("=");
              z[0] = e.trim(z[0].replace(/"/g, "")), z[1] = e.trim(z[1].replace(/"/g, "")), O += '"' + z[0] + '":"' + z[1] + '"', j < L.length - 1 && (O += ",")
            }
            O += "}", O = jQuery.parseJSON(O);
            var F = e("li.settings_info", s);
            F.find(".settings_info_menu").removeClass("perma_option_off"), F.find(".settings_info_menu").append('<a href="#" class="settings">' + p.settings + "</a><form><fieldset><legend>" + p.settings_perma + "</legend></fieldset></form>");
            var D = "r" + Math.floor(101 * Math.random()), q = ' checked="checked"';
            if (d && E) {
              var B = "perma_on" === O.socialSharePrivacy_facebook ? q : "";
              F.find("form fieldset").append('<input type="checkbox" name="perma_status_facebook" id="' + D + '_perma_status_facebook"' + B + ' /><label for="' + D + '_perma_status_facebook">' + p.services.facebook.perma_display_name + "</label>")
            }
            if (h && $) {
              var H = "perma_on" === O.socialSharePrivacy_twitter ? q : "";
              F.find("form fieldset").append('<input type="checkbox" name="perma_status_twitter" id="' + D + '_perma_status_twitter"' + H + ' /><label for="' + D + '_perma_status_twitter">' + p.services.twitter.perma_display_name + "</label>")
            }
            if (f && N) {
              var R = "perma_on" === O.socialSharePrivacy_gplus ? q : "";
              F.find("form fieldset").append('<input type="checkbox" name="perma_status_gplus" id="' + D + '_perma_status_gplus"' + R + ' /><label for="' + D + '_perma_status_gplus">' + p.services.gplus.perma_display_name + "</label>")
            }
            e(s).on("click", "li.settings_info .settings", function (t) {
              t.preventDefault(), "on" == e(this).data("keyb") ? (e("li.settings_info", s).trigger("mouseleave"), e(this).data("keyb", "off")) : (e("li.settings_info .settings", s).trigger("mouseenter"), e(this).data("keyb", "on"))
            }), e(s).on("mouseenter", "li.settings_info .settings", function () {
              var t = window.setTimeout(function () {
                F.find(".settings_info_menu").removeClass("off").addClass("on")
              }, 500);
              e(this).data("timeout_id", t)
            }), e(s).on("mouseleave", "li.settings_info", function () {
              var t = e(this).data("timeout_id");
              window.clearTimeout(t), F.find(".settings_info_menu").removeClass("on").addClass("off")
            }), e(s).on("click", "li.settings_info fieldset input", function (t) {
              var i = t.target.id, n = i.substr(i.lastIndexOf("_") + 1, i.length), r = "socialSharePrivacy_" + n;
              e("#" + t.target.id + ":checked").length ? (o(r, "perma_on", c.cookie_expires, c.cookie_path, c.cookie_domain), e("form fieldset label[for=" + i + "]", s).addClass("checked")) : (a(r, "perma_on", c.cookie_path, c.cookie_domain), e("form fieldset label[for=" + i + "]", s).removeClass("checked"))
            }), d && E && "perma_on" === O.socialSharePrivacy_facebook && e("li.facebook .switch", s).click(), h && $ && "perma_on" === O.socialSharePrivacy_twitter && e("li.twitter .switch", s).click(), f && N && "perma_on" === O.socialSharePrivacy_gplus && e("li.gplus .switch", s).click()
          }
        })
      })
    }
  }
}(jQuery), function (e, t, i, s) {
  e.fn.doubleTapToGo = function (s) {
    return !!("ontouchstart" in t || navigator.msMaxTouchPoints || navigator.userAgent.toLowerCase().match(/windows phone os 7/i)) && (this.each(function () {
      var t = !1;
      e(this).on("click", function (i) {
        var s = e(this);
        s[0] != t[0] && (i.preventDefault(), t = s)
      }), e(i).on("click touchstart MSPointerDown", function (i) {
        for (var s = !0, n = e(i.target).parents(), o = 0; o < n.length; o++) n[o] == t[0] && (s = !1);
        s && (t = !1)
      })
    }), this)
  }
}(jQuery, window, document), !function () {
  var e, t, i, s, n, o = {}.hasOwnProperty, a = function (e, t) {
    function i() {
      this.constructor = e
    }

    for (var s in t) o.call(t, s) && (e[s] = t[s]);
    return i.prototype = t.prototype, e.prototype = new i, e.__super__ = t.prototype, e
  };
  s = function () {
    function e() {
      this.options_index = 0, this.parsed = []
    }

    return e.prototype.add_node = function (e) {
      return "OPTGROUP" === e.nodeName.toUpperCase() ? this.add_group(e) : this.add_option(e)
    }, e.prototype.add_group = function (e) {
      var t, i, s, n, o, a;
      for (t = this.parsed.length, this.parsed.push({
        array_index: t,
        group: !0,
        label: this.escapeExpression(e.label),
        children: 0,
        disabled: e.disabled
      }), o = e.childNodes, a = [], s = 0, n = o.length; n > s; s++) i = o[s], a.push(this.add_option(i, t, e.disabled));
      return a
    }, e.prototype.add_option = function (e, t, i) {
      return "OPTION" === e.nodeName.toUpperCase() ? ("" !== e.text ? (null != t && (this.parsed[t].children += 1), this.parsed.push({
        array_index: this.parsed.length,
        options_index: this.options_index,
        value: e.value,
        text: e.text,
        html: e.innerHTML,
        selected: e.selected,
        disabled: i === !0 ? i : e.disabled,
        group_array_index: t,
        classes: e.className,
        style: e.style.cssText
      })) : this.parsed.push({
        array_index: this.parsed.length,
        options_index: this.options_index,
        empty: !0
      }), this.options_index += 1) : void 0
    }, e.prototype.escapeExpression = function (e) {
      var t, i;
      return null == e || e === !1 ? "" : /[\&\<\>\"\'\`]/.test(e) ? (t = {
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#x27;",
        "`": "&#x60;"
      }, i = /&(?!\w+;)|[\<\>\"\'\`]/g, e.replace(i, function (e) {
        return t[e] || "&amp;"
      })) : e
    }, e
  }(), s.select_to_array = function (e) {
    var t, i, n, o, a;
    for (i = new s, a = e.childNodes, n = 0, o = a.length; o > n; n++) t = a[n], i.add_node(t);
    return i.parsed
  }, t = function () {
    function e(t, i) {
      this.form_field = t, this.options = null != i ? i : {}, e.browser_is_supported() && (this.is_multiple = this.form_field.multiple, this.set_default_text(), this.set_default_values(), this.setup(), this.set_up_html(), this.register_observers())
    }

    return e.prototype.set_default_values = function () {
      var e = this;
      return this.click_test_action = function (t) {
        return e.test_active_click(t)
      }, this.activate_action = function (t) {
        return e.activate_field(t)
      }, this.active_field = !1, this.mouse_on_container = !1, this.results_showing = !1, this.result_highlighted = null, this.allow_single_deselect = null != this.options.allow_single_deselect && null != this.form_field.options[0] && "" === this.form_field.options[0].text && this.options.allow_single_deselect, this.disable_search_threshold = this.options.disable_search_threshold || 0, this.disable_search = this.options.disable_search || !1, this.enable_split_word_search = null == this.options.enable_split_word_search || this.options.enable_split_word_search, this.group_search = null == this.options.group_search || this.options.group_search, this.search_contains = this.options.search_contains || !1, this.single_backstroke_delete = null == this.options.single_backstroke_delete || this.options.single_backstroke_delete, this.max_selected_options = this.options.max_selected_options || 1 / 0, this.inherit_select_classes = this.options.inherit_select_classes || !1, this.display_selected_options = null == this.options.display_selected_options || this.options.display_selected_options, this.display_disabled_options = null == this.options.display_disabled_options || this.options.display_disabled_options
    }, e.prototype.set_default_text = function () {
      return this.default_text = this.form_field.getAttribute("data-placeholder") ? this.form_field.getAttribute("data-placeholder") : this.is_multiple ? this.options.placeholder_text_multiple || this.options.placeholder_text || e.default_multiple_text : this.options.placeholder_text_single || this.options.placeholder_text || e.default_single_text, this.results_none_found = this.form_field.getAttribute("data-no_results_text") || this.options.no_results_text || e.default_no_result_text
    }, e.prototype.mouse_enter = function () {
      return this.mouse_on_container = !0
    }, e.prototype.mouse_leave = function () {
      return this.mouse_on_container = !1
    }, e.prototype.input_focus = function () {
      var e = this;
      if (this.is_multiple) {
        if (!this.active_field) return setTimeout(function () {
          return e.container_mousedown()
        }, 50)
      } else if (!this.active_field) return this.activate_field()
    }, e.prototype.input_blur = function () {
      var e = this;
      return this.mouse_on_container ? void 0 : (this.active_field = !1, setTimeout(function () {
        return e.blur_test()
      }, 100))
    }, e.prototype.results_option_build = function (e) {
      var t, i, s, n, o;
      for (t = "", o = this.results_data, s = 0, n = o.length; n > s; s++) i = o[s], t += i.group ? this.result_add_group(i) : this.result_add_option(i), (null != e ? e.first : void 0) && (i.selected && this.is_multiple ? this.choice_build(i) : i.selected && !this.is_multiple && this.single_set_selected_text(i.text));
      return t
    }, e.prototype.result_add_option = function (e) {
      var t, i;
      return e.search_match && this.include_option_in_results(e) ? (t = [], e.disabled || e.selected && this.is_multiple || t.push("active-result"), !e.disabled || e.selected && this.is_multiple || t.push("disabled-result"), e.selected && t.push("result-selected"), null != e.group_array_index && t.push("group-option"), "" !== e.classes && t.push(e.classes), i = document.createElement("li"), i.className = t.join(" "), i.style.cssText = e.style, i.setAttribute("data-option-array-index", e.array_index), i.innerHTML = e.search_text, this.outerHTML(i)) : ""
    }, e.prototype.result_add_group = function (e) {
      var t;
      return (e.search_match || e.group_match) && e.active_options > 0 ? (t = document.createElement("li"), t.className = "group-result", t.innerHTML = e.search_text, this.outerHTML(t)) : ""
    }, e.prototype.results_update_field = function () {
      return this.set_default_text(), this.is_multiple || this.results_reset_cleanup(), this.result_clear_highlight(), this.results_build(), this.results_showing ? this.winnow_results() : void 0
    }, e.prototype.reset_single_select_options = function () {
      var e, t, i, s, n;
      for (s = this.results_data, n = [], t = 0, i = s.length; i > t; t++) e = s[t], e.selected ? n.push(e.selected = !1) : n.push(void 0);
      return n
    }, e.prototype.results_toggle = function () {
      return this.results_showing ? this.results_hide() : this.results_show()
    }, e.prototype.results_search = function () {
      return this.results_showing ? this.winnow_results() : this.results_show();
    }, e.prototype.winnow_results = function () {
      var e, t, i, s, n, o, a, r, l, c, d, u, h;
      for (this.no_results_clear(), n = 0, a = this.get_search_text(), e = a.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&"), s = this.search_contains ? "" : "^", i = new RegExp(s + e, "i"), c = new RegExp(e, "i"), h = this.results_data, d = 0, u = h.length; u > d; d++) t = h[d], t.search_match = !1, o = null, this.include_option_in_results(t) && (t.group && (t.group_match = !1, t.active_options = 0), null != t.group_array_index && this.results_data[t.group_array_index] && (o = this.results_data[t.group_array_index], 0 === o.active_options && o.search_match && (n += 1), o.active_options += 1), (!t.group || this.group_search) && (t.search_text = t.group ? t.label : t.html, t.search_match = this.search_string_match(t.search_text, i), t.search_match && !t.group && (n += 1), t.search_match ? (a.length && (r = t.search_text.search(c), l = t.search_text.substr(0, r + a.length) + "</em>" + t.search_text.substr(r + a.length), t.search_text = l.substr(0, r) + "<em>" + l.substr(r)), null != o && (o.group_match = !0)) : null != t.group_array_index && this.results_data[t.group_array_index].search_match && (t.search_match = !0)));
      return this.result_clear_highlight(), 1 > n && a.length ? (this.update_results_content(""), this.no_results(a)) : (this.update_results_content(this.results_option_build()), this.winnow_results_set_highlight())
    }, e.prototype.search_string_match = function (e, t) {
      var i, s, n, o;
      if (t.test(e)) return !0;
      if (this.enable_split_word_search && (e.indexOf(" ") >= 0 || 0 === e.indexOf("[")) && (s = e.replace(/\[|\]/g, "").split(" "), s.length)) for (n = 0, o = s.length; o > n; n++) if (i = s[n], t.test(i)) return !0
    }, e.prototype.choices_count = function () {
      var e, t, i, s;
      if (null != this.selected_option_count) return this.selected_option_count;
      for (this.selected_option_count = 0, s = this.form_field.options, t = 0, i = s.length; i > t; t++) e = s[t], e.selected && (this.selected_option_count += 1);
      return this.selected_option_count
    }, e.prototype.choices_click = function (e) {
      return e.preventDefault(), this.results_showing || this.is_disabled ? void 0 : this.results_show()
    }, e.prototype.keyup_checker = function (e) {
      var t, i;
      switch (t = null != (i = e.which) ? i : e.keyCode, this.search_field_scale(), t) {
        case 8:
          if (this.is_multiple && this.backstroke_length < 1 && this.choices_count() > 0) return this.keydown_backstroke();
          if (!this.pending_backstroke) return this.result_clear_highlight(), this.results_search();
          break;
        case 13:
          if (e.preventDefault(), this.results_showing) return this.result_select(e);
          break;
        case 27:
          return this.results_showing && this.results_hide(), !0;
        case 9:
        case 38:
        case 40:
        case 16:
        case 91:
        case 17:
          break;
        default:
          return this.results_search()
      }
    }, e.prototype.clipboard_event_checker = function () {
      var e = this;
      return setTimeout(function () {
        return e.results_search()
      }, 50)
    }, e.prototype.container_width = function () {
      return null != this.options.width ? this.options.width : "" + this.form_field.offsetWidth + "px"
    }, e.prototype.include_option_in_results = function (e) {
      return !(this.is_multiple && !this.display_selected_options && e.selected) && (!(!this.display_disabled_options && e.disabled) && !e.empty)
    }, e.prototype.search_results_touchstart = function (e) {
      return this.touch_started = !0, this.search_results_mouseover(e)
    }, e.prototype.search_results_touchmove = function (e) {
      return this.touch_started = !1, this.search_results_mouseout(e)
    }, e.prototype.search_results_touchend = function (e) {
      return this.touch_started ? this.search_results_mouseup(e) : void 0
    }, e.prototype.outerHTML = function (e) {
      var t;
      return e.outerHTML ? e.outerHTML : (t = document.createElement("div"), t.appendChild(e), t.innerHTML)
    }, e.browser_is_supported = function () {
      return "Microsoft Internet Explorer" === window.navigator.appName ? document.documentMode >= 8 : !/iP(od|hone)/i.test(window.navigator.userAgent) && (!/Android/i.test(window.navigator.userAgent) || !/Mobile/i.test(window.navigator.userAgent))
    }, e.default_multiple_text = "Select Some Options", e.default_single_text = "Select an Option", e.default_no_result_text = "No results match", e
  }(), e = jQuery, e.fn.extend({
    chosen: function (s) {
      return t.browser_is_supported() ? this.each(function () {
        var t, n;
        t = e(this), n = t.data("chosen"), "destroy" === s && n ? n.destroy() : n || t.data("chosen", new i(this, s))
      }) : this
    }
  }), i = function (t) {
    function i() {
      return n = i.__super__.constructor.apply(this, arguments)
    }

    return a(i, t), i.prototype.setup = function () {
      return this.form_field_jq = e(this.form_field), this.current_selectedIndex = this.form_field.selectedIndex, this.is_rtl = this.form_field_jq.hasClass("chosen-rtl")
    }, i.prototype.set_up_html = function () {
      var t, i;
      return t = ["chosen-container"], t.push("chosen-container-" + (this.is_multiple ? "multi" : "single")), this.inherit_select_classes && this.form_field.className && t.push(this.form_field.className), this.is_rtl && t.push("chosen-rtl"), i = {
        "class": t.join(" "),
        style: "width: " + this.container_width() + ";",
        title: this.form_field.title
      }, this.form_field.id.length && (i.id = this.form_field.id.replace(/[^\w]/g, "_") + "_chosen"), this.container = e("<div />", i), this.is_multiple ? this.container.html('<ul class="chosen-choices"><li class="search-field"><input type="text" value="' + this.default_text + '" class="default" autocomplete="off" style="width:25px;" /></li></ul><div class="chosen-drop"><ul class="chosen-results"></ul></div>') : this.container.html('<a class="chosen-single chosen-default" tabindex="-1"><span>' + this.default_text + '</span><div><b></b></div></a><div class="chosen-drop"><div class="chosen-search"><input type="text" autocomplete="off" /></div><ul class="chosen-results"></ul></div>'), this.form_field_jq.hide().after(this.container), this.dropdown = this.container.find("div.chosen-drop").first(), this.search_field = this.container.find("input").first(), this.search_results = this.container.find("ul.chosen-results").first(), this.search_field_scale(), this.search_no_results = this.container.find("li.no-results").first(), this.is_multiple ? (this.search_choices = this.container.find("ul.chosen-choices").first(), this.search_container = this.container.find("li.search-field").first()) : (this.search_container = this.container.find("div.chosen-search").first(), this.selected_item = this.container.find(".chosen-single").first()), this.results_build(), this.set_tab_index(), this.set_label_behavior(), this.form_field_jq.trigger("chosen:ready", {chosen: this})
    }, i.prototype.register_observers = function () {
      var e = this;
      return this.container.bind("mousedown.chosen", function (t) {
        e.container_mousedown(t)
      }), this.container.bind("mouseup.chosen", function (t) {
        e.container_mouseup(t)
      }), this.container.bind("mouseenter.chosen", function (t) {
        e.mouse_enter(t)
      }), this.container.bind("mouseleave.chosen", function (t) {
        e.mouse_leave(t)
      }), this.search_results.bind("mouseup.chosen", function (t) {
        e.search_results_mouseup(t)
      }), this.search_results.bind("mouseover.chosen", function (t) {
        e.search_results_mouseover(t)
      }), this.search_results.bind("mouseout.chosen", function (t) {
        e.search_results_mouseout(t)
      }), this.search_results.bind("mousewheel.chosen DOMMouseScroll.chosen", function (t) {
        e.search_results_mousewheel(t)
      }), this.search_results.bind("touchstart.chosen", function (t) {
        e.search_results_touchstart(t)
      }), this.search_results.bind("touchmove.chosen", function (t) {
        e.search_results_touchmove(t)
      }), this.search_results.bind("touchend.chosen", function (t) {
        e.search_results_touchend(t)
      }), this.form_field_jq.bind("chosen:updated.chosen", function (t) {
        e.results_update_field(t)
      }), this.form_field_jq.bind("chosen:activate.chosen", function (t) {
        e.activate_field(t)
      }), this.form_field_jq.bind("chosen:open.chosen", function (t) {
        e.container_mousedown(t)
      }), this.form_field_jq.bind("chosen:close.chosen", function (t) {
        e.input_blur(t)
      }), this.search_field.bind("blur.chosen", function (t) {
        e.input_blur(t)
      }), this.search_field.bind("keyup.chosen", function (t) {
        e.keyup_checker(t)
      }), this.search_field.bind("keydown.chosen", function (t) {
        e.keydown_checker(t)
      }), this.search_field.bind("focus.chosen", function (t) {
        e.input_focus(t)
      }), this.search_field.bind("cut.chosen", function (t) {
        e.clipboard_event_checker(t)
      }), this.search_field.bind("paste.chosen", function (t) {
        e.clipboard_event_checker(t)
      }), this.is_multiple ? this.search_choices.bind("click.chosen", function (t) {
        e.choices_click(t)
      }) : this.container.bind("click.chosen", function (e) {
        e.preventDefault()
      })
    }, i.prototype.destroy = function () {
      return e(this.container[0].ownerDocument).unbind("click.chosen", this.click_test_action), this.search_field[0].tabIndex && (this.form_field_jq[0].tabIndex = this.search_field[0].tabIndex), this.container.remove(), this.form_field_jq.removeData("chosen"), this.form_field_jq.show()
    }, i.prototype.search_field_disabled = function () {
      return this.is_disabled = this.form_field_jq[0].disabled, this.is_disabled ? (this.container.addClass("chosen-disabled"), this.search_field[0].disabled = !0, this.is_multiple || this.selected_item.unbind("focus.chosen", this.activate_action), this.close_field()) : (this.container.removeClass("chosen-disabled"), this.search_field[0].disabled = !1, this.is_multiple ? void 0 : this.selected_item.bind("focus.chosen", this.activate_action))
    }, i.prototype.container_mousedown = function (t) {
      return this.is_disabled || (t && "mousedown" === t.type && !this.results_showing && t.preventDefault(), null != t && e(t.target).hasClass("search-choice-close")) ? void 0 : (this.active_field ? this.is_multiple || !t || e(t.target)[0] !== this.selected_item[0] && !e(t.target).parents("a.chosen-single").length || (t.preventDefault(), this.results_toggle()) : (this.is_multiple && this.search_field.val(""), e(this.container[0].ownerDocument).bind("click.chosen", this.click_test_action), this.results_show()), this.activate_field())
    }, i.prototype.container_mouseup = function (e) {
      return "ABBR" !== e.target.nodeName || this.is_disabled ? void 0 : this.results_reset(e)
    }, i.prototype.search_results_mousewheel = function (e) {
      var t;
      return e.originalEvent && (t = -e.originalEvent.wheelDelta || e.originalEvent.detail), null != t ? (e.preventDefault(), "DOMMouseScroll" === e.type && (t = 40 * t), this.search_results.scrollTop(t + this.search_results.scrollTop())) : void 0
    }, i.prototype.blur_test = function () {
      return !this.active_field && this.container.hasClass("chosen-container-active") ? this.close_field() : void 0
    }, i.prototype.close_field = function () {
      return e(this.container[0].ownerDocument).unbind("click.chosen", this.click_test_action), this.active_field = !1, this.results_hide(), this.container.removeClass("chosen-container-active"), this.clear_backstroke(), this.show_search_field_default(), this.search_field_scale()
    }, i.prototype.activate_field = function () {
      return this.container.addClass("chosen-container-active"), this.active_field = !0, this.search_field.val(this.search_field.val()), this.search_field.focus()
    }, i.prototype.test_active_click = function (t) {
      var i;
      return i = e(t.target).closest(".chosen-container"), i.length && this.container[0] === i[0] ? this.active_field = !0 : this.close_field()
    }, i.prototype.results_build = function () {
      return this.parsing = !0, this.selected_option_count = null, this.results_data = s.select_to_array(this.form_field), this.is_multiple ? this.search_choices.find("li.search-choice").remove() : this.is_multiple || (this.single_set_selected_text(), this.disable_search || this.form_field.options.length <= this.disable_search_threshold ? (this.search_field[0].readOnly = !0, this.container.addClass("chosen-container-single-nosearch")) : (this.search_field[0].readOnly = !1, this.container.removeClass("chosen-container-single-nosearch"))), this.update_results_content(this.results_option_build({first: !0})), this.search_field_disabled(), this.show_search_field_default(), this.search_field_scale(), this.parsing = !1
    }, i.prototype.result_do_highlight = function (e) {
      var t, i, s, n, o;
      if (e.length) {
        if (this.result_clear_highlight(), this.result_highlight = e, this.result_highlight.addClass("highlighted"), s = parseInt(this.search_results.css("maxHeight"), 10), o = this.search_results.scrollTop(), n = s + o, i = this.result_highlight.position().top + this.search_results.scrollTop(), t = i + this.result_highlight.outerHeight(), t >= n) return this.search_results.scrollTop(t - s > 0 ? t - s : 0);
        if (o > i) return this.search_results.scrollTop(i)
      }
    }, i.prototype.result_clear_highlight = function () {
      return this.result_highlight && this.result_highlight.removeClass("highlighted"), this.result_highlight = null
    }, i.prototype.results_show = function () {
      return this.is_multiple && this.max_selected_options <= this.choices_count() ? (this.form_field_jq.trigger("chosen:maxselected", {chosen: this}), !1) : (this.container.addClass("chosen-with-drop"), this.results_showing = !0, this.search_field.focus(), this.search_field.val(this.search_field.val()), this.winnow_results(), this.form_field_jq.trigger("chosen:showing_dropdown", {chosen: this}))
    }, i.prototype.update_results_content = function (e) {
      return this.search_results.html(e)
    }, i.prototype.results_hide = function () {
      return this.results_showing && (this.result_clear_highlight(), this.container.removeClass("chosen-with-drop"), this.form_field_jq.trigger("chosen:hiding_dropdown", {chosen: this})), this.results_showing = !1
    }, i.prototype.set_tab_index = function () {
      var e;
      return this.form_field.tabIndex ? (e = this.form_field.tabIndex, this.form_field.tabIndex = -1, this.search_field[0].tabIndex = e) : void 0
    }, i.prototype.set_label_behavior = function () {
      var t = this;
      return this.form_field_label = this.form_field_jq.parents("label"), !this.form_field_label.length && this.form_field.id.length && (this.form_field_label = e("label[for='" + this.form_field.id + "']")), this.form_field_label.length > 0 ? this.form_field_label.bind("click.chosen", function (e) {
        return t.is_multiple ? t.container_mousedown(e) : t.activate_field()
      }) : void 0
    }, i.prototype.show_search_field_default = function () {
      return this.is_multiple && this.choices_count() < 1 && !this.active_field ? (this.search_field.val(this.default_text), this.search_field.addClass("default")) : (this.search_field.val(""), this.search_field.removeClass("default"))
    }, i.prototype.search_results_mouseup = function (t) {
      var i;
      return i = e(t.target).hasClass("active-result") ? e(t.target) : e(t.target).parents(".active-result").first(), i.length ? (this.result_highlight = i, this.result_select(t), this.search_field.focus()) : void 0
    }, i.prototype.search_results_mouseover = function (t) {
      var i;
      return i = e(t.target).hasClass("active-result") ? e(t.target) : e(t.target).parents(".active-result").first(), i ? this.result_do_highlight(i) : void 0
    }, i.prototype.search_results_mouseout = function (t) {
      return e(t.target).hasClass("active-result") ? this.result_clear_highlight() : void 0
    }, i.prototype.choice_build = function (t) {
      var i, s, n = this;
      return i = e("<li />", {"class": "search-choice"}).html("<span>" + t.html + "</span>"), t.disabled ? i.addClass("search-choice-disabled") : (s = e("<a />", {
        "class": "search-choice-close",
        "data-option-array-index": t.array_index
      }), s.bind("click.chosen", function (e) {
        return n.choice_destroy_link_click(e)
      }), i.append(s)), this.search_container.before(i)
    }, i.prototype.choice_destroy_link_click = function (t) {
      return t.preventDefault(), t.stopPropagation(), this.is_disabled ? void 0 : this.choice_destroy(e(t.target))
    }, i.prototype.choice_destroy = function (e) {
      return this.result_deselect(e[0].getAttribute("data-option-array-index")) ? (this.show_search_field_default(), this.is_multiple && this.choices_count() > 0 && this.search_field.val().length < 1 && this.results_hide(), e.parents("li").first().remove(), this.search_field_scale()) : void 0
    }, i.prototype.results_reset = function () {
      return this.reset_single_select_options(), this.form_field.options[0].selected = !0, this.single_set_selected_text(), this.show_search_field_default(), this.results_reset_cleanup(), this.form_field_jq.trigger("change"), this.active_field ? this.results_hide() : void 0
    }, i.prototype.results_reset_cleanup = function () {
      return this.current_selectedIndex = this.form_field.selectedIndex, this.selected_item.find("abbr").remove()
    }, i.prototype.result_select = function (e) {
      var t, i;
      return this.result_highlight ? (t = this.result_highlight, this.result_clear_highlight(), this.is_multiple && this.max_selected_options <= this.choices_count() ? (this.form_field_jq.trigger("chosen:maxselected", {chosen: this}), !1) : (this.is_multiple ? t.removeClass("active-result") : this.reset_single_select_options(), i = this.results_data[t[0].getAttribute("data-option-array-index")], i.selected = !0, this.form_field.options[i.options_index].selected = !0, this.selected_option_count = null, this.is_multiple ? this.choice_build(i) : this.single_set_selected_text(i.text), (e.metaKey || e.ctrlKey) && this.is_multiple || this.results_hide(), this.search_field.val(""), (this.is_multiple || this.form_field.selectedIndex !== this.current_selectedIndex) && this.form_field_jq.trigger("change", {selected: this.form_field.options[i.options_index].value}), this.current_selectedIndex = this.form_field.selectedIndex, this.search_field_scale())) : void 0
    }, i.prototype.single_set_selected_text = function (e) {
      return null == e && (e = this.default_text), e === this.default_text ? this.selected_item.addClass("chosen-default") : (this.single_deselect_control_build(), this.selected_item.removeClass("chosen-default")), this.selected_item.find("span").text(e)
    }, i.prototype.result_deselect = function (e) {
      var t;
      return t = this.results_data[e], !this.form_field.options[t.options_index].disabled && (t.selected = !1, this.form_field.options[t.options_index].selected = !1, this.selected_option_count = null, this.result_clear_highlight(), this.results_showing && this.winnow_results(), this.form_field_jq.trigger("change", {deselected: this.form_field.options[t.options_index].value}), this.search_field_scale(), !0)
    }, i.prototype.single_deselect_control_build = function () {
      return this.allow_single_deselect ? (this.selected_item.find("abbr").length || this.selected_item.find("span").first().after('<abbr class="search-choice-close"></abbr>'), this.selected_item.addClass("chosen-single-with-deselect")) : void 0
    }, i.prototype.get_search_text = function () {
      return this.search_field.val() === this.default_text ? "" : e("<div/>").text(e.trim(this.search_field.val())).html()
    }, i.prototype.winnow_results_set_highlight = function () {
      var e, t;
      return t = this.is_multiple ? [] : this.search_results.find(".result-selected.active-result"), e = t.length ? t.first() : this.search_results.find(".active-result").first(), null != e ? this.result_do_highlight(e) : void 0
    }, i.prototype.no_results = function (t) {
      var i;
      return i = e('<li class="no-results">' + this.results_none_found + ' "<span></span>"</li>'), i.find("span").first().html(t), this.search_results.append(i), this.form_field_jq.trigger("chosen:no_results", {chosen: this})
    }, i.prototype.no_results_clear = function () {
      return this.search_results.find(".no-results").remove()
    }, i.prototype.keydown_arrow = function () {
      var e;
      return this.results_showing && this.result_highlight ? (e = this.result_highlight.nextAll("li.active-result").first()) ? this.result_do_highlight(e) : void 0 : this.results_show()
    }, i.prototype.keyup_arrow = function () {
      var e;
      return this.results_showing || this.is_multiple ? this.result_highlight ? (e = this.result_highlight.prevAll("li.active-result"), e.length ? this.result_do_highlight(e.first()) : (this.choices_count() > 0 && this.results_hide(), this.result_clear_highlight())) : void 0 : this.results_show()
    }, i.prototype.keydown_backstroke = function () {
      var e;
      return this.pending_backstroke ? (this.choice_destroy(this.pending_backstroke.find("a").first()), this.clear_backstroke()) : (e = this.search_container.siblings("li.search-choice").last(), e.length && !e.hasClass("search-choice-disabled") ? (this.pending_backstroke = e, this.single_backstroke_delete ? this.keydown_backstroke() : this.pending_backstroke.addClass("search-choice-focus")) : void 0)
    }, i.prototype.clear_backstroke = function () {
      return this.pending_backstroke && this.pending_backstroke.removeClass("search-choice-focus"), this.pending_backstroke = null
    }, i.prototype.keydown_checker = function (e) {
      var t, i;
      switch (t = null != (i = e.which) ? i : e.keyCode, this.search_field_scale(), 8 !== t && this.pending_backstroke && this.clear_backstroke(), t) {
        case 8:
          this.backstroke_length = this.search_field.val().length;
          break;
        case 9:
          this.results_showing && !this.is_multiple && this.result_select(e), this.mouse_on_container = !1;
          break;
        case 13:
          e.preventDefault();
          break;
        case 38:
          e.preventDefault(), this.keyup_arrow();
          break;
        case 40:
          e.preventDefault(), this.keydown_arrow()
      }
    }, i.prototype.search_field_scale = function () {
      var t, i, s, n, o, a, r, l, c;
      if (this.is_multiple) {
        for (s = 0, r = 0, o = "position:absolute; left: -1000px; top: -1000px; display:none;", a = ["font-size", "font-style", "font-weight", "font-family", "line-height", "text-transform", "letter-spacing"], l = 0, c = a.length; c > l; l++) n = a[l], o += n + ":" + this.search_field.css(n) + ";";
        return t = e("<div />", {style: o}), t.text(this.search_field.val()), e("body").append(t), r = t.width() + 25, t.remove(), i = this.container.outerWidth(), r > i - 10 && (r = i - 10), this.search_field.css({width: r + "px"})
      }
    }, i
  }(t)
}.call(this), function (e, t) {
  "function" == typeof define && define.amd ? define(t) : "object" == typeof exports ? module.exports = t() : e.toTopButton = t()
}(this, function (e) {
  "use strict";

  function t(e, t) {
    for (var i in t) t.hasOwnProperty(i) && (null !== t[i] ? e[i] = t[i] : console.log("Error: " + Object.keys(t)[0] + " is " + t[i]));
    return e
  }

  var i = function (e) {
    var i = e.container instanceof Node ? e.container : document.querySelector(e.container);
    this.props = t(e, {container: i, fromTop: e.fromTop})
  };
  return i.prototype.toTop = function () {
    function e(t, i) {
      var s = window.scrollY || window.pageYOffset || document.body.scrollTop + (document.documentElement && document.documentElement.scrollTop || 0);
      if (!(i < 0)) {
        var n = t - s, o = n / i * 2;
        setTimeout(function () {
          document.documentElement.scrollTop && (document.documentElement.scrollTop = s + o), document.body.scrollTop && (document.body.scrollTop = s + o), e(t, i - 2)
        }, 10)
      }
    }

    return !!this.props.container && void ("undefined" != typeof this.props.container.addEventListener && this.props.container.addEventListener("click", function (t) {
      e(0, 50)
    }))
  }, i.prototype.show = function () {
    if (!this.props.container) return !1;
    var e = 100, t = this.props.container;
    void 0 !== this.props.fromTop && (e = this.props.fromTop);
    var i = function () {
      t.classList && (window.pageYOffset >= e ? t.classList.add("to-top-container--visible") : t.classList.remove("to-top-container--visible"))
    };
    window.addEventListener("scroll", function () {
      i()
    }), i()
  }, i
}), function (e) {
  var t = !1;
  if ("function" == typeof define && define.amd && (define(e), t = !0), "object" == typeof exports && (module.exports = e(), t = !0), !t) {
    var i = window.Cookies, s = window.Cookies = e();
    s.noConflict = function () {
      return window.Cookies = i, s
    }
  }
}(function () {
  function e() {
    for (var e = 0, t = {}; e < arguments.length; e++) {
      var i = arguments[e];
      for (var s in i) t[s] = i[s]
    }
    return t
  }

  function t(i) {
    function s(t, n, o) {
      var a;
      if ("undefined" != typeof document) {
        if (arguments.length > 1) {
          if (o = e({path: "/"}, s.defaults, o), "number" == typeof o.expires) {
            var r = new Date;
            r.setMilliseconds(r.getMilliseconds() + 864e5 * o.expires), o.expires = r
          }
          o.expires = o.expires ? o.expires.toUTCString() : "";
          try {
            a = JSON.stringify(n), /^[\{\[]/.test(a) && (n = a)
          } catch (l) {
          }
          n = i.write ? i.write(n, t) : encodeURIComponent(String(n)).replace(/%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g, decodeURIComponent), t = encodeURIComponent(String(t)), t = t.replace(/%(23|24|26|2B|5E|60|7C)/g, decodeURIComponent), t = t.replace(/[\(\)]/g, escape);
          var c = "";
          for (var d in o) o[d] && (c += "; " + d, o[d] !== !0 && (c += "=" + o[d]));
          return document.cookie = t + "=" + n + c
        }
        t || (a = {});
        for (var u = document.cookie ? document.cookie.split("; ") : [], h = /(%[0-9A-Z]{2})+/g, f = 0; f < u.length; f++) {
          var p = u[f].split("="), m = p.slice(1).join("=");
          '"' === m.charAt(0) && (m = m.slice(1, -1));
          try {
            var _ = p[0].replace(h, decodeURIComponent);
            if (m = i.read ? i.read(m, _) : i(m, _) || m.replace(h, decodeURIComponent), this.json) try {
              m = JSON.parse(m)
            } catch (l) {
            }
            if (t === _) {
              a = m;
              break
            }
            t || (a[_] = m)
          } catch (l) {
          }
        }
        return a
      }
    }

    return s.set = s, s.get = function (e) {
      return s.call(s, e)
    }, s.getJSON = function () {
      return s.apply({json: !0}, [].slice.call(arguments))
    }, s.defaults = {}, s.remove = function (t, i) {
      s(t, "", e(i, {expires: -1}))
    }, s.withConverter = t, s
  }

  return t(function () {
  })
}), enquire.register("only screen and (max-width: 799px)", {
  match: function () {
    $(".js-main-nav-item-1-level").removeClass("main-nav__item-1-level--hover")
  }, unmatch: function () {
    $(".js-main-nav-item-1-level").addClass("main-nav__item-1-level--hover"), $(".js-main-nav, .js-main-nav *").removeAttr("style").removeClass("main-nav__toggle--minus"), $(".js-directory-nav-item, .js-directory-nav-item *").removeAttr("style").removeClass("directory-nav__item--is-active")
  }
}), function (e) {
  e(function () {
    function t() {
      e(".js-main-nav-item-1-level").each(function () {
        e(this).find("li:visible:last").children(".js-main-nav-link").css("border-bottom", "none")
      })
    }

    function i() {
      e(".js-service-bar").slideToggle(), e(".js-search-bar").slideToggle()
    }

    var s = new toTopButton({container: ".in2js-to-top", fromTop: 700});
    s.show(), s.toTop(), e("table").wrap('<div class="table-responsive"></div>'), e(".js-fancybox").fancybox({
      transitionEffect: "fade",
      caption: function (t, i) {
        return e(this).attr("title")
      }
    }), "" == e(".indexedsearch").val() ? e(".indexedsearch").addClass("watermark") : e(".indexedsearch").removeClass("watermark"), e(".indexedsearch").focus(function () {
      e(this).removeClass("watermark")
    }), e(".indexedsearch").blur(function () {
      e(this).val() ? e(this).removeClass("watermark") : e(this).addClass("watermark")
    });
    var n = e(".search_target").val();
    e("#indexedsearch, #indexedsearch_mobile").attr("action", n), "all" == e("#container_type").val() && e("#sites_all").attr("checked", "checked"), "this" == e("#container_type").val() && e("#sites_this").attr("checked", "checked"), e("#cseform_content").submit(function (e) {
      e.preventDefault();
      var t;
      t = window.location.protocol + "//" + window.location.host, "/" != window.location.pathname.charAt(0) && (t += "/"), t += window.location.pathname + "?", t += "cx=007464603711196986792:tm-egyeaeic&ie=UTF-8", t += "&q=" + encodeURIComponent(document.forms.cseform_content.elements.q.value), t += 1 == document.getElementById("sites_this").checked ? "&sites=this" : "&sites=all", window.location = t
    });
    var o = e("#mailformfrom_email").val();
    e("#mailform").submit(function () {
      var t = e.trim(e("#mailformemail").val()), i = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
      e("#mailformfrom_email").val(i.test(t) ? t : o)
    });
    var a = e(".flex-control-nav");
    (a.length && e(".flex-control-nav > li:last-child").position().top > 0 || a.length && e(".flex-prev").is(":visible") && e(".flex-control-nav > li:last-child").offset().left + e(".flex-control-nav > li:last-child").outerWidth(!0) > e(".flex-prev").offset().left) && e(".flex-control-nav").css("display", "none"), e(".js-double-tap").doubleTapToGo(), e(".js-main-nav-toggle").click(function () {
      var i = e(".js-main-nav");
      i.slideToggle(), i.is(":visible") && i.find(".main-nav__link--active").each(function () {
        e(this).siblings(".js-main-nav-sub-toggle").hide(), e(this).siblings(".js-main-nav-list").attr("style", "display: block !important")
      }), t()
    }), e(".js-main-nav-sub-toggle").click(function () {
      var t = (e(this).siblings(".js-main-nav-link"), e(this).siblings(".js-main-nav-list"));
      if (t.is(":visible")) e(this).removeClass("main-nav__toggle--minus"), 0 === e(this).parent().next("li").length && e(this).parent().removeClass("main-nav__item--lastelement"), e(this).closest("ul").parent().addClass("main-nav__item--lastelement"); else if (e(this).addClass("main-nav__toggle--minus"), e(this).closest(".main-nav__item--lastelement").removeClass("main-nav__item--lastelement"), e(this).hasClass("main-nav__toggle--1-level") && e(this).parent().addClass("main-nav__item--lastelement"), 0 === e(this).parent().next("li").length) {
        var i = e(this).siblings("ul.js-main-nav-list").children("li:last-child"),
          s = i.children("ul.js-main-nav-list");
        "block" === s.css("display") ? e(this).parent().removeClass("main-nav__item--lastelement") : e(this).parent().addClass("main-nav__item--lastelement")
      }
      t.slideToggle()
    }), e(".js-directory-nav-toggle").click(function () {
      var t = e(this).siblings(".js-directory-nav-submenu"), i = e(this).parent(".js-directory-nav-item");
      e(t).is(":visible") ? e(i).removeClass("directory-nav__item--is-active") : e(i).addClass("directory-nav__item--is-active"), t.slideToggle()
    });
    var r = e("#fullWidth");
    if (r.length > 0 && (r.royalSlider({
      arrowsNavAutoHide: !1,
      transitionType: "fade",
      loop: !0,
      keyboardNavEnabled: !0,
      slidesSpacing: 0,
      navigateByClick: !1
    }), r.data("royalSlider").ev.on("rsBeforeAnimStart", function () {
      changeRoyalSlidesToBackgroundImages()
    }), e(".pid111 .rsArrow").wrapAll('<div class="rsArrows-outer" />').wrapAll('<div class="rsArrows-inner" />'), e(".rsBullets").wrapAll('<div class="rsBullets-outer" />').wrapAll('<div class="rsBullets-inner" />'), changeRoyalSlidesToBackgroundImages()), e("#socialshareprivacy").length > 0 && e("#socialshareprivacy").socialSharePrivacy({
      services: {
        facebook: {perma_option: "off"},
        twitter: {perma_option: "off"},
        gplus: {perma_option: "off"}
      }, cookie_domain: "tum.de"
    }), e(".js-cse-form-button-close").click(function () {
      i(), e(".js-service-bar").css("overflow", "visible")
    }), e(".js-cse-open").click(function (e) {
      e.preventDefault(), i()
    }), Cookies.get("fe_accordion_status")) {
      for (var l = Cookies.get("fe_accordion_status").split(","), c = 0; c <= l.length; c++) if (0 !== e("#" + l[c]).length) {
        var d = e("#" + l[c]);
        d.find(".js-accordion-box-content").slideToggle(), d.toggleClass("accordion-box--opened")
      }
    } else Cookies.set("fe_accordion_status", "", {expires: 1});
    !function () {
      e(".js-accordion-box").each(function () {
        var t = e(this), i = [];
        t.find(".js-accordion-box-title").click(function () {
          "" !== Cookies.get("fe_accordion_status") && (i = Cookies.get("fe_accordion_status").split(","));
          var s = e.inArray(t.attr("id"), i);
          t.hasClass("accordion-box--opened") ? s !== -1 && i.splice(s, 1) : s === -1 && i.push(t.attr("id")), Cookies.set("fe_accordion_status", i.toString(), {expires: 1}), t.find(".js-accordion-box-content").slideToggle(), t.toggleClass("accordion-box--opened")
        })
      })
    }(), e("input.js-googlecustomsearch").val() ? e("input.js-googlecustomsearch").removeClass("watermark") : e("input.js-googlecustomsearch").addClass("watermark"), e(".js-cse-open").removeClass("cse-open--no-js"), e(".cseform_content").removeClass("cseform_content--no-js")
  })
}(jQuery);
