// Core
import { Entity } from './entity';
import { System } from './system';

// Systems
import { Renderer } from '../systems/renderer';
import { GridSystem } from '../systems/gridSystem';
import { GameSystem } from '../systems/gameSystem';
import { PositionSystem } from '../systems/positionSystem';
import { GravitySystem } from '../systems/gravitySystem';
import { MatchSystem } from '../systems/matchSystem';


export class Game {
    constructor(){
        this.running = false;
        this.entities = {};
        this.systems = [];
        this.components = {};
        this.listeners = {};
        this.start();
    }
    _createSystems() {
        this.systems = [
            new GameSystem(this),
            new Renderer(this),
            new GridSystem(this),
            new PositionSystem(this),
            new GravitySystem(this),
            new MatchSystem(this)
        ];
    }

    start() {
        // First create systems
        this._createSystems();

        // Awake systems in order
        for (let i = 0; i < this.systems.length; i++) {
            this.systems[i].onAwake();
        }

        // Game is now running!
        this.running = true;

        // Start systems in order
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
        let entity = new Entity(); 
        
        // Add Components to Entity
        entity.addComponents(components);

        // Add Entity to Game
        this.addEntity(entity);

        return entity;
    }

    
}