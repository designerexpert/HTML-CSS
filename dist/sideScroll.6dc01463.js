// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

// eslint-disable-next-line no-global-assign
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  return newRequire;
})({"component\\sideScroll\\sideScroll.js":[function(require,module,exports) {
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

window.onload = function () {
    return doResize();
};
window.onresize = function () {
    return doResize();
};

var doResize = function doResize() {
    if (window.innerWidth > 750) {
        container[0].itemsToShow(3);
    }
    if (window.innerWidth < 750) {
        container[0].itemsToShow(2);
    }
    if (window.innerWidth < 500) {
        container[0].itemsToShow(1); // How many items to show on carousel based on Ress less than 750;
    }
};

var ScrollPan = function () {
    function ScrollPan(container) {
        var _this = this;

        _classCallCheck(this, ScrollPan);

        this.element = container;
        this.project = container.querySelectorAll('.section__projects__projectBlock');
        this.project = Array.from(this.project).map(function (project) {
            return new ScrollItem(project, _this);
        });
        this.activeProject = this.project[0]; // automatically set activeProject to the first project on list.
        this.itemsShow; // Arbitrary number of items to be hidden from the view, should decrease with ressolution.
        this.activePanProjects;
        this.pushloc = this.project.length - this.itemsShow;
        this.shiftloc = 0;
        this.scrollButton = container.querySelectorAll('.sideScroll');
        this.scrollButton = Array.from(this.scrollButton).map(function (button) {
            return new ScrollButton(button, _this);
        });
        this.activatePanProjects(); // Load up the items to be shown in the pan onto an array
        this.init(); // Upon class creation initiate the first 3 tabs with init();
        // this.updateActive(this.project[0]); // Enable Description on the First Item of the Pan
    }

    _createClass(ScrollPan, [{
        key: 'itemsToShow',
        value: function itemsToShow(n) {
            this.itemsShow = this.project.length - n;
            this.activatePanProjects();
            this.hideAll();
            this.pushloc = this.project.length - this.itemsShow;
            this.init();
        }
    }, {
        key: 'hideAll',
        value: function hideAll() {
            this.project.forEach(function (item) {
                item.hide();
            });
        }
    }, {
        key: 'activatePanProjects',
        value: function activatePanProjects() {
            this.activePanProjects = this.project.slice(0, this.project.length - this.itemsShow);
        }
    }, {
        key: 'init',
        value: function init() {
            // Initiate and render the objects passed on the activePanProjects array.
            this.activePanProjects.forEach(function (item) {
                item.show();
            });
        }
    }, {
        key: 'updateActive',
        value: function updateActive() {
            var scrollItem = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.activeProject;

            this.activeProject.deselect();
            this.activeProject = scrollItem;
            this.activeProject.select();
        }
    }, {
        key: 'getMatchingDesc',
        value: function getMatchingDesc(data) {
            return this.element.querySelectorAll('.section__projects__description[data-tab=\'' + data + '\']');
        }
    }, {
        key: 'updatePan',
        value: function updatePan(buttonClicked) {
            console.log(this.shiftloc);
            if (buttonClicked.dataset.tab === 'right' && this.pushloc === this.project.length) {
                // Implement Looping going Right
                this.hideAll();
                this.activePanProjects = this.project.slice(0, this.project.length - this.itemsShow);
                if (window.innerWidth < 500) this.updateActive(this.project[0]); //for Mobile Browsers Auto Show Description
                this.init();
                this.pushloc = this.project.length - this.itemsShow;
                this.shiftloc = 0;
            } else if (buttonClicked.dataset.tab === 'right' && this.pushloc < this.project.length) {
                this.activePanProjects.shift().hide();
                this.activePanProjects.push(this.project[this.pushloc]);
                if (window.innerWidth < 500) this.updateActive(this.project[this.pushloc]); //for Mobile Browsers Auto Show Description
                this.project[this.pushloc + 1];
                this.init();
                this.pushloc++;
                this.shiftloc++;
            } else if (buttonClicked.dataset.tab === 'left' && this.shiftloc > 0) {
                this.activePanProjects.pop().hide();
                this.activePanProjects.unshift(this.project[this.shiftloc - 1]);
                if (window.innerWidth < 500) this.updateActive(this.project[this.shiftloc - 1]); //for Mobile Browsers Auto Show Description
                this.pushloc--;
                this.shiftloc--;
                this.init();
            } else if (buttonClicked.dataset.tab === 'left' && this.shiftloc === 0) {
                // implement looping going left
                this.hideAll();
                this.activePanProjects = this.project.slice(this.itemsShow, this.project.length);
                if (window.innerWidth < 500) this.updateActive(); //for Mobile Browsers Auto Show Description
                this.pushloc = 0;
                this.shiftloc = this.itemsShow;
                this.init();
            }
        }
    }]);

    return ScrollPan;
}();

var ScrollButton = function ScrollButton(button, parent) {
    var _this2 = this;

    _classCallCheck(this, ScrollButton);

    this.element = button;
    this.pan = parent;
    this.element.addEventListener('click', function () {
        _this2.pan.updatePan(_this2.element);
    });
};

var ScrollItem = function () {
    function ScrollItem(projectBlock, parent) {
        var _this3 = this;

        _classCallCheck(this, ScrollItem);

        this.element = projectBlock;
        this.pan = parent;
        this.matchingDesc = this.pan.getMatchingDesc(this.element.dataset.tab)[0];
        this.matchingDesc = new DescItem(this.matchingDesc);
        this.element.addEventListener('click', function () {
            _this3.pan.updateActive(_this3);
            _this3.select();
        });
    }

    _createClass(ScrollItem, [{
        key: 'select',
        value: function select() {
            this.matchingDesc.show();
        }
    }, {
        key: 'deselect',
        value: function deselect() {
            this.matchingDesc.hide();
        }
    }, {
        key: 'show',
        value: function show() {
            // Show the Speciffic element when it comes into view on the pan
            this.element.classList.add('section__projects__projectBlock--show');
        }
    }, {
        key: 'hide',
        value: function hide() {
            // Hide the Speciffic element when it goes out of view on the pan
            this.element.classList.remove('section__projects__projectBlock--show');
        }
    }]);

    return ScrollItem;
}();

var DescItem = function () {
    function DescItem(element) {
        _classCallCheck(this, DescItem);

        this.element = element;
        // console.log(this.element);
    }

    _createClass(DescItem, [{
        key: 'show',
        value: function show() {
            this.element.classList.add('section__projects__description--show');
        }
    }, {
        key: 'hide',
        value: function hide() {
            this.element.classList.remove('section__projects__description--show');
        }
    }]);

    return DescItem;
}();

var container = document.querySelectorAll('.section__projects__pan');
container = Array.from(container).map(function (container) {
    return new ScrollPan(container);
});
},{}],"node_modules\\parcel-bundler\\src\\builtins\\hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';

var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };

  module.bundle.hotData = null;
}

module.bundle.Module = Module;

var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = '' || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + '39721' + '/');
  ws.onmessage = function (event) {
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      console.clear();

      data.assets.forEach(function (asset) {
        hmrApply(global.parcelRequire, asset);
      });

      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          hmrAccept(global.parcelRequire, asset.id);
        }
      });
    }

    if (data.type === 'reload') {
      ws.close();
      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');

      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);

      removeErrorOverlay();

      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);
  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID;

  // html encode message and stack trace
  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;

  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';

  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];
      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAccept(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAccept(bundle.parent, id);
  }

  var cached = bundle.cache[id];
  bundle.hotData = {};
  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);

  cached = bundle.cache[id];
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAccept(global.parcelRequire, id);
  });
}
},{}]},{},["node_modules\\parcel-bundler\\src\\builtins\\hmr-runtime.js","component\\sideScroll\\sideScroll.js"], null)
//# sourceMappingURL=/sideScroll.6dc01463.map