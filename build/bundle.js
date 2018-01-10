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
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class System {
  constructor(game) {
    this.id = this.constructor.name;
    this.game = game;
  }

  onAwake() {// Implemented in system
  }

  onStart() {} // Implemented in system
  // --------------------------------------------
  // Simplified signal/messaging between Systems
  // --------------------------------------------


  listen(id, callback) {
    let listenerObj = {
      listener: this,
      callback: callback
    };

    if (this.game.listeners[id] === undefined) {
      this.game.listeners[id] = new Array();
    }

    this.game.listeners[id].push(listenerObj);
  }

  sendSignal(id) {
    let listeners = this.game.listeners[id];

    if (listeners !== undefined) {
      for (let i = 0; i < listeners.length; i++) {
        listeners[i].callback();
      }
    }
  }

  sendSignal(id, params) {
    let listeners = this.game.listeners[id];

    if (listeners !== undefined) {
      for (let i = 0; i < listeners.length; i++) {
        listeners[i].callback(params);
      }
    }
  } // --------------------------------------------


  getComponents(id) {
    let components = this.game.components[id];
    let componentArr = [];

    if (components !== undefined) {
      for (let i = 0; i < Object.keys(components).length; i++) {
        const key = Object.keys(components)[i];
        componentArr.push(components[key]);
      }
    }

    return componentArr;
  }

  getComponentsWithDependency(id, dependencyName) {
    let allComponents = this.getComponents(id);
    let filteredComponents = [];

    for (let i = 0; i < allComponents.length; i++) {
      const component = allComponents[i];
      const dependency = component.entity.getComponent(dependencyName);

      if (dependency !== undefined) {
        let filtered = {};
        filtered[id] = component;
        filtered[dependencyName] = dependency;
        filteredComponents.push(filtered);
      }

      ;
    }

    return filteredComponents;
  }

  getSystem(id) {
    for (let i = 0; i < this.game.systems.length; i++) {
      const system = this.game.systems[i];
      if (system.id == id) return system;
    }
  }

}
/* harmony export (immutable) */ __webpack_exports__["a"] = System;


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Component {
  constructor(game, data) {
    this.id = this.constructor.name;
    this.game = game;
    this.init(data);
  } // Called when Entity adds the component


  addComponent() {
    if (this.game.components[this.id] === undefined) {
      this.game.components[this.id] = {};
    }

    this.game.components[this.id][this.entity.id] = this;
  }

  getSiblingComponent(id) {
    let components = this.entity.components;

    for (let i = 0; i < Object.keys(components).length; i++) {
      const component = components[Object.keys(components)[i]];
      if (component.id == id) return component;
    }
  }

  init(data) {// implemented in component
  }

}
/* harmony export (immutable) */ __webpack_exports__["a"] = Component;


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Entity {
  constructor() {
    this.id = this._generateRandomID();
    this.components = {};
  }

  _generateRandomID() {
    return `Entity_${(+new Date()).toString(16) + (Math.random() * 100000000 | 0).toString(16)}`;
  }

  getComponent(id) {
    return this.components[id];
  }

  addComponents(components) {
    components.forEach(component => {
      component.entity = this;
      this.components[component.id] = component;
      this.components[component.id].addComponent();
    });
  }

  remove() {
    // Delete components first
    for (var key in this.components) {
      delete window.game.components[key][this.id];
    } // then delete entity


    delete window.game.entities[this.id];
  }

}
/* harmony export (immutable) */ __webpack_exports__["a"] = Entity;


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__core_game__ = __webpack_require__(4);

window.game = new __WEBPACK_IMPORTED_MODULE_0__core_game__["a" /* Game */](); // Start Game Loop

gameLoop(0);

function gameLoop(time) {
  requestAnimationFrame(gameLoop);
  TWEEN.update(time);
}

/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__entity__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__system__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__systems_renderer__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__systems_gridSystem__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__systems_gameSystem__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__systems_positionSystem__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__systems_gravitySystem__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__systems_matchSystem__ = __webpack_require__(16);
// Core

 // Systems







class Game {
  constructor() {
    this.running = false;
    this.entities = {};
    this.systems = [];
    this.components = {};
    this.listeners = {};
    this.start();
  }

  _createSystems() {
    this.systems = [new __WEBPACK_IMPORTED_MODULE_4__systems_gameSystem__["a" /* GameSystem */](this), new __WEBPACK_IMPORTED_MODULE_2__systems_renderer__["a" /* Renderer */](this), new __WEBPACK_IMPORTED_MODULE_3__systems_gridSystem__["a" /* GridSystem */](this), new __WEBPACK_IMPORTED_MODULE_5__systems_positionSystem__["a" /* PositionSystem */](this), new __WEBPACK_IMPORTED_MODULE_6__systems_gravitySystem__["a" /* GravitySystem */](this), new __WEBPACK_IMPORTED_MODULE_7__systems_matchSystem__["a" /* MatchSystem */](this)];
  }

  start() {
    // First create systems
    this._createSystems(); // Awake systems in order


    for (let i = 0; i < this.systems.length; i++) {
      this.systems[i].onAwake();
    } // Game is now running!


    this.running = true; // Start systems in order

    for (let i = 0; i < this.systems.length; i++) {
      this.systems[i].onStart();
    }
  }

  addEntity(entity) {
    this.entities[entity.id] = entity;
  }

  removeEntity(entity) {
    delete this.entities[entity.id];
  }

  createEntity(components) {
    // Create Entity
    let entity = new __WEBPACK_IMPORTED_MODULE_0__entity__["a" /* Entity */](); // Add Components to Entity

    entity.addComponents(components); // Add Entity to Game

    this.addEntity(entity);
    return entity;
  }

}
/* harmony export (immutable) */ __webpack_exports__["a"] = Game;


/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__core_system__ = __webpack_require__(0);

class Renderer extends __WEBPACK_IMPORTED_MODULE_0__core_system__["a" /* System */] {
  onAwake() {
    this._init();

    this.sprites = [];
  }

  _tick(time) {
    requestAnimationFrame(this._tick.bind(this));
    this.pixiRenderer.render(this.stage);
    this.renderNewSprites();
    TWEEN.update(time);
  }

  _init() {
    //Create the renderer
    this.pixiRenderer = PIXI.autoDetectRenderer(800, 600, {
      antialias: false,
      transparent: false,
      resolution: 1
    });
    document.body.appendChild(this.pixiRenderer.view);
    this.pixiRenderer.view.setAttribute("id", "stage"); //Create the stage

    this.stage = new PIXI.Container();
    this.pixiRenderer.render(this.stage); // Begin render loop

    this._tick(0);
  }

  renderNewSprites() {
    let spriteComponents = this.game.components['Sprite'];

    if (this.game.running && spriteComponents !== undefined) {
      for (let i = 0; i < Object.keys(spriteComponents).length; i++) {
        const spriteComponent = this.game.components['Sprite'][Object.keys(spriteComponents)[i]];

        if (spriteComponent.loaded == false) {
          let sprite = PIXI.Sprite.fromImage(spriteComponent.image);
          sprite.anchor.set(0.5, 0.5);
          spriteComponent.sprite = sprite;
          this.stage.addChild(sprite);
          spriteComponent.loaded = true;
          this.sendSignal('Renderer.SpriteLoaded', spriteComponent);
        }
      }
    }
  }

}
/* harmony export (immutable) */ __webpack_exports__["a"] = Renderer;


/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__core_system__ = __webpack_require__(0);

class GridSystem extends __WEBPACK_IMPORTED_MODULE_0__core_system__["a" /* System */] {
  onAwake() {
    this.createListeners();
  }

  renderGrid() {
    if (this.map === undefined) {
      this.map = this.createMap();
    }

    ;
    let renderer = this.getSystem('Renderer');
    let grids = this.getComponents('Grid');

    for (let i = 0; i < grids.length; i++) {
      let posComponent = grids[i].getSiblingComponent('Position');
      let pos = {
        x: 0,
        y: 0
      };

      if (posComponent !== undefined) {
        pos.x = posComponent.x;
        pos.y = posComponent.y;
      }

      for (let w = 0; w < grids[i].width; w++) {
        for (let h = 0; h < grids[i].height; h++) {
          let circle = new PIXI.Graphics();
          circle.lineStyle(2, 0xFF00FF);
          circle.drawCircle(pos.x + w * grids[i].scale, pos.y + h * grids[i].scale, 2);
          circle.endFill();
          renderer.stage.addChild(circle);
        }
      }
    }
  }

  createMap() {
    let grid = this.getComponents('Grid')[0];
    let width = grid.width;
    let height = grid.height;
    let map = new Array();

    for (let i = 0; i < width; i++) {
      map[i] = new Array();

      for (let j = 0; j < height; j++) {
        map[i][j] = undefined;
      }
    }

    return map;
  }

  addExistingGemsToMap() {
    let gems = this.getComponents('Gem');

    for (let i = 0; i < gems.length; i++) {
      let gem = gems[i];

      if (this.map[gem.x][gem.y] === undefined) {
        this.map[gem.x][gem.y] = gem;
      } else {
        console.warn(`Error: Trying to add Gem to occupied space on grid map.`);
      }
    }
  }

  setPosition(from, to) {
    this.map[to.x][to.y] = this.map[from.x][from.y];
    this.map[from.x][from.y] = undefined;
  } // Get a global position form grid co-ordinates


  getPositionFromGrid(x, y) {
    let grid = this.getComponents('Grid')[0];

    if (grid !== undefined) {
      let posComponent = grid.getSiblingComponent('Position');
      return {
        x: posComponent.x + x * grid.scale,
        y: posComponent.y + y * grid.scale
      };
    }
  }

  getLowestEmptyGrid(x, y) {
    let grid = this.getComponents('Grid')[0];
    let check = y + 1;

    while (this.map[x][check] === undefined && check < grid.height) {
      check++;
    }

    return check - 1;
  }

  createListeners() {
    this.listen('Grid.CreateGrid', () => {
      this.renderGrid();
    });
    this.listen('Grid.AddGemsToMap', () => {
      this.addExistingGemsToMap();
    });
  }

}
/* harmony export (immutable) */ __webpack_exports__["a"] = GridSystem;


/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__core_entity__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__core_component__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__core_system__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_position__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__components_gridPosition__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__components_sprite__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__components_gravity__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__components_grid__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__components_gem__ = __webpack_require__(13);
// Core


 // Components







const GEMS = [{
  image: 'resources/gems/element_blue_square_glossy.png',
  type: 'blue'
}, {
  image: 'resources/gems/element_green_square_glossy.png',
  type: 'green'
}, {
  image: 'resources/gems/element_grey_square_glossy.png',
  type: 'silver'
}, {
  image: 'resources/gems/element_purple_cube_glossy.png',
  type: 'purple'
}, {
  image: 'resources/gems/element_yellow_square_glossy.png',
  type: 'yellow'
}];
class GameSystem extends __WEBPACK_IMPORTED_MODULE_2__core_system__["a" /* System */] {
  onStart() {
    this.create();
  }

  create() {
    this.game.createEntity([new __WEBPACK_IMPORTED_MODULE_3__components_position__["a" /* Position */](this.game, {
      x: 50,
      y: 50
    }), new __WEBPACK_IMPORTED_MODULE_7__components_grid__["a" /* Grid */](this.game, {
      width: 10,
      height: 13,
      scale: 40
    })]);
    this.start();
  }

  start() {
    this.sendSignal('Grid.CreateGrid');
    this.sendSignal('Grid.AddGemsToMap');
    this.sendSignal('Position.AlignAndPositionToGrid');
    this.sendSignal('Gravity.ApplyGravity');
    this.startSequence();
  }

  startSequence() {
    this.fillEntireGrid();
  }

  addTopRow() {
    let grid = this.getComponents('Grid')[0];
    let map = this.getSystem('GridSystem').map;

    for (let i = 0; i < grid.width; i++) {
      const grid = map[i][0];

      if (grid === undefined) {
        this.createRandomGem(i, 0);
      }
    }

    this.sendSignal('Grid.AddGemsToMap');
    this.sendSignal('Position.AlignAndPositionToGrid');
    this.sendSignal('Gravity.ApplyGravity');
  }

  fillEntireGrid() {
    let grid = this.getComponents('Grid')[0];
    let map = this.getSystem('GridSystem').map;

    for (let w = 0; w < grid.width; w++) {
      for (let h = 0; h < grid.height; h++) {
        const grid = map[w][h];

        if (grid === undefined) {
          this.createRandomGem(w, h);
        }
      }
    }

    window.setTimeout(() => {
      this.sendSignal('Grid.AddGemsToMap');
      this.sendSignal('Position.AlignAndPositionToGrid');
      this.sendSignal('Match.RegisterClickEvents');
    }, 10);
  }

  createRandomGem(x, y) {
    let grid = this.getComponents('Grid')[0];
    let randomIndex = Math.floor(Math.random() * GEMS.length - 1) + 1;
    this.game.createEntity([new __WEBPACK_IMPORTED_MODULE_3__components_position__["a" /* Position */](this.game, {
      x: 0,
      y: 0
    }), new __WEBPACK_IMPORTED_MODULE_5__components_sprite__["a" /* Sprite */](this.game, {
      image: GEMS[randomIndex].image
    }), new __WEBPACK_IMPORTED_MODULE_8__components_gem__["a" /* Gem */](this.game, {
      x: x,
      y: y,
      type: GEMS[randomIndex].type
    }), new __WEBPACK_IMPORTED_MODULE_6__components_gravity__["a" /* Gravity */](this.game, {})]);
  }

}
/* harmony export (immutable) */ __webpack_exports__["a"] = GameSystem;


/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__core_component__ = __webpack_require__(1);

class Position extends __WEBPACK_IMPORTED_MODULE_0__core_component__["a" /* Component */] {
  init(data) {
    this.x = data.x;
    this.y = data.y;
  }

}
/* harmony export (immutable) */ __webpack_exports__["a"] = Position;


/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__core_component__ = __webpack_require__(1);

class GridPosition extends __WEBPACK_IMPORTED_MODULE_0__core_component__["a" /* Component */] {
  init(data) {
    this.x = data.x;
    this.y = data.y;
  }

}
/* unused harmony export GridPosition */


/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__core_component__ = __webpack_require__(1);

class Sprite extends __WEBPACK_IMPORTED_MODULE_0__core_component__["a" /* Component */] {
  init(data) {
    this.image = data.image;
    this.sprite = undefined;
    this.loaded = false;
    this.onClick = false;
  }

}
/* harmony export (immutable) */ __webpack_exports__["a"] = Sprite;


/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__core_component__ = __webpack_require__(1);

class Gravity extends __WEBPACK_IMPORTED_MODULE_0__core_component__["a" /* Component */] {
  init(data) {}

}
/* harmony export (immutable) */ __webpack_exports__["a"] = Gravity;


/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__core_component__ = __webpack_require__(1);

class Grid extends __WEBPACK_IMPORTED_MODULE_0__core_component__["a" /* Component */] {
  init(data) {
    this.width = data.width;
    this.height = data.height;
    this.scale = data.scale;
  }

}
/* harmony export (immutable) */ __webpack_exports__["a"] = Grid;


/***/ }),
/* 13 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__core_component__ = __webpack_require__(1);

class Gem extends __WEBPACK_IMPORTED_MODULE_0__core_component__["a" /* Component */] {
  init(data) {
    this.x = data.x;
    this.y = data.y;
    this.grid = data.grid;
    this.type = data.type;
  }

}
/* harmony export (immutable) */ __webpack_exports__["a"] = Gem;


/***/ }),
/* 14 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__core_system__ = __webpack_require__(0);

class PositionSystem extends __WEBPACK_IMPORTED_MODULE_0__core_system__["a" /* System */] {
  onAwake() {
    this.createListeners();
  }

  renderPositions() {
    let components = this.getComponentsWithDependency('Position', 'Sprite');

    for (let i = 0; i < components.length; i++) {
      const posComponent = components[i].Position;
      const spriteComponent = components[i].Sprite;
      let sprite = spriteComponent.sprite;

      if (sprite !== undefined) {
        sprite.x = posComponent.x;
        sprite.y = posComponent.y;
      }
    }
  }

  alignPositionsToGrid() {
    let gridSystem = this.getSystem('GridSystem');
    let components = this.getComponentsWithDependency('Position', 'Gem');

    for (let i = 0; i < components.length; i++) {
      let newPos = gridSystem.getPositionFromGrid(components[i].Gem.x, components[i].Gem.y);
      components[i].Position.x = newPos.x;
      components[i].Position.y = newPos.y;
    }
  }

  createListeners() {
    this.listen('Position.RenderPositions', () => {
      this.renderPositions();
    });
    this.listen('Position.AlignToGrid', () => {
      this.alignPositionsToGrid();
    });
    this.listen('Position.AlignAndPositionToGrid', () => {
      this.alignPositionsToGrid();
      this.renderPositions();
    });
  }

}
/* harmony export (immutable) */ __webpack_exports__["a"] = PositionSystem;


/***/ }),
/* 15 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__core_system__ = __webpack_require__(0);

class GravitySystem extends __WEBPACK_IMPORTED_MODULE_0__core_system__["a" /* System */] {
  onAwake() {
    this.createListeners();
  }

  applyGravity() {
    let components = this.getComponentsWithDependency('Gravity', 'Gem'); // Start from lowest Y and work way up

    components.sort(function (compA, compB) {
      return compB.Gem.y - compA.Gem.y;
    });

    for (let i = 0; i < components.length; i++) {
      this.calculateAndAnimateGravity(components[i]);
    }
  }

  calculateAndAnimateGravity(component) {
    let gridSystem = this.getSystem('GridSystem');
    let gemComp = component.Gem; // Get lowest grid

    let lowGrid = gridSystem.getLowestEmptyGrid(gemComp.x, gemComp.y); // set to lowest grid

    let currGrid = {
      x: gemComp.x,
      y: gemComp.y
    };
    let newGrid = {
      x: gemComp.x,
      y: lowGrid
    };

    if (gridSystem.map[newGrid.x][lowGrid] === undefined) {
      gemComp.y = newGrid.y;
      gridSystem.setPosition(currGrid, newGrid); // Animate gravity

      if (newGrid !== currGrid) {
        this.animating = true;
        let coords = gridSystem.getPositionFromGrid(currGrid.x, currGrid.y);
        let target = gridSystem.getPositionFromGrid(newGrid.x, newGrid.y);
        let randomDuration = Math.floor(Math.random() * (750 - 650)) + 650;
        let posComp = gemComp.getSiblingComponent('Position');
        this.animateGravity(posComp, coords, target, randomDuration);
      }
    }
  }

  animateGravity(positionComponent, coords, target, duration) {
    let positionSystem = this.getSystem('PositionSystem');
    new TWEEN.Tween(coords).to(target, duration).easing(TWEEN.Easing.Bounce.Out).onUpdate(function () {
      positionComponent.x = coords.x;
      positionComponent.y = coords.y;
      positionSystem.renderPositions();
    }).start();
  }

  createListeners() {
    this.listen('Gravity.ApplyGravity', () => {
      this.applyGravity();
    });
  }

}
/* harmony export (immutable) */ __webpack_exports__["a"] = GravitySystem;


/***/ }),
/* 16 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__core_system__ = __webpack_require__(0);

class MatchSystem extends __WEBPACK_IMPORTED_MODULE_0__core_system__["a" /* System */] {
  onAwake() {
    this.checkQueue = [];
    this.createListeners();
  }

  registerClickOnSprite(spriteComponent) {
    spriteComponent.sprite.interactive = true;
    spriteComponent.sprite.buttonMode = true;
    spriteComponent.sprite.on('click', () => {
      console.log('click', this);
    });
    spriteComponent.onClick = true;
  }

  createListeners() {
    this.listen('Renderer.SpriteLoaded', spriteComponent => {
      let gemComponent = spriteComponent.getSiblingComponent('Gem');

      if (gemComponent !== undefined) {
        this.registerClickOnSprite(spriteComponent);
      }
    });
  }

}
/* harmony export (immutable) */ __webpack_exports__["a"] = MatchSystem;


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map