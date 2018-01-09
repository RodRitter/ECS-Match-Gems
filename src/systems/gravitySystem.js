import { System } from '../core/system';

export class GravitySystem extends System {

    onAwake() {
        this.createListeners();
    }

    applyGravity() {
        let components = this.getComponentsWithDependency('Gravity', 'Gem');

        // Start from lowest Y and work way up
        components.sort(function(compA, compB) {
            return compB.Gem.y - compA.Gem.y;
        });
        
        for (let i = 0; i < components.length; i++) {
            this.calculateAndAnimateGravity(components[i]);
        }
    }

    calculateAndAnimateGravity(component) {
        let gridSystem = this.getSystem('GridSystem');
        let gemComp = component.Gem;

        // Get lowest grid
        let lowGrid = gridSystem.getLowestEmptyGrid(gemComp.x, gemComp.y);
        
        // set to lowest grid
        let currGrid = {x: gemComp.x, y: gemComp.y};
        let newGrid = {x: gemComp.x, y: lowGrid};


        if(gridSystem.map[newGrid.x][lowGrid] === undefined) {
            gemComp.y = newGrid.y;
            gridSystem.setPosition(currGrid, newGrid);
        
            // Animate gravity
            if(newGrid !== currGrid) {
                this.animating = true;
                let coords = gridSystem.getPositionFromGrid(currGrid.x, currGrid.y);
                let target = gridSystem.getPositionFromGrid(newGrid.x, newGrid.y);
                let randomDuration = Math.floor(Math.random() * (950 - 750)) + 750;
                let posComp = gemComp.getSiblingComponent('Position');
                this.animateGravity(posComp, coords, target, randomDuration);
            }
        }
    }

    animateGravity(positionComponent, coords, target, duration) {
        let positionSystem = this.getSystem('PositionSystem');
        new TWEEN.Tween(coords)
        .to(target, duration)
        .easing(TWEEN.Easing.Bounce.Out)
        .onUpdate(function() {
            positionComponent.x = coords.x;
            positionComponent.y = coords.y;
            positionSystem.renderPositions();
        })
        .start();
    }


    createListeners() {
        this.listen('Gravity.ApplyGravity', () => {
            this.applyGravity();
        });
    }

}