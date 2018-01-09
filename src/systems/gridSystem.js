import { System } from '../core/system';

export class GridSystem extends System {

    onAwake() {
        this.createListeners();
    }

    renderGrid() {
        if(this.map === undefined) {this.map = this.createMap()};

        let renderer = this.getSystem('Renderer');
        let grids = this.getComponents('Grid');

        for (let i = 0; i < grids.length; i++) {
            let posComponent = grids[i].getSiblingComponent('Position');
            let pos = {x: 0, y: 0}

            if(posComponent !== undefined) {
                pos.x = posComponent.x;
                pos.y = posComponent.y;
            }

            for (let w = 0; w < grids[i].width; w++) {
                for (let h = 0; h < grids[i].height; h++) {
                    let circle = new PIXI.Graphics();
                    circle.lineStyle(2, 0xFF00FF);
                    circle.drawCircle(pos.x + (w * grids[i].scale), pos.y + (h * grids[i].scale),2);
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
            if(this.map[gem.x][gem.y] === undefined) {
                this.map[gem.x][gem.y] = gem;
            } else {
                console.warn(`Error: Trying to add Gem to occupied space on grid map.`);
            }
            
        }
    }

    setPosition(from, to) {
        this.map[to.x][to.y] = this.map[from.x][from.y];
        this.map[from.x][from.y] = undefined;
    }

    // Get a global position form grid co-ordinates
    getPositionFromGrid(x,y) {
        let grid = this.getComponents('Grid')[0];
        if(grid !== undefined) {
            let posComponent = grid.getSiblingComponent('Position');
            return {
                x: posComponent.x + (x * grid.scale),
                y: posComponent.y + (y * grid.scale)
            }
        }
    }
    

    getLowestEmptyGrid(x,y) {
        let grid = this.getComponents('Grid')[0];
        let check = y+1;
        while(this.map[x][check] === undefined && check < grid.height) {
            check++;
        }
        return check-1;
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