// Core
import { Entity } from '../core/entity';
import { Component } from '../core/component';
import { System } from '../core/system';

// Components
import { Position } from '../components/position';
import { GridPosition } from '../components/gridPosition';
import { Sprite } from '../components/sprite';
import { Gravity } from '../components/gravity';
import { Grid } from '../components/grid';
import { Gem } from '../components/gem';

const GEMS = [
    {
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
    }
];

export class GameSystem extends System {

    onStart() {
        this.create();
    }

    create() {

        this.game.createEntity([
            new Position(this.game, {x: 50, y: 50}),
            new Grid(this.game, {width: 10, height: 13, scale: 40})
        ]);

    }

    start() {
        this.sendSignal('Grid.CreateGrid');
        this.sendSignal('Grid.AddGemsToMap');
        this.sendSignal('Position.AlignAndPositionToGrid');
        this.sendSignal('Gravity.ApplyGravity');
    }

    addTopRow() {
        let grid = this.getComponents('Grid')[0];
        let map = this.getSystem('GridSystem').map;

        for (let i = 0; i < grid.width; i++) {
            const grid = map[i][0];
            if(grid === undefined) {
                this.createRandomGem(i,0);
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
                if(grid === undefined) {
                    this.createRandomGem(w,h);
                }
            }
        }

        window.setTimeout(() => {
            this.sendSignal('Grid.AddGemsToMap');
            this.sendSignal('Position.AlignAndPositionToGrid');
        }, 10);
        
    }

    createRandomGem(x, y) {
        let grid = this.getComponents('Grid')[0];
        let randomIndex = Math.floor(Math.random() * GEMS.length-1) + 1;
        
        this.game.createEntity([
            new Position(this.game, {x: 0, y: 0}),
            new Sprite(this.game, {image: GEMS[randomIndex].image}),
            new Gem(this.game, {x: x, y: y}),
            new Gravity(this.game, {})
        ]);
    }

    
    
}