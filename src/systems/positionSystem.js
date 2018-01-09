import { System } from '../core/system';

export class PositionSystem extends System {

    onAwake() {
        this.createListeners();
    }

    renderPositions() {
        let components = this.getComponentsWithDependency('Position', 'Sprite');
        
        for (let i = 0; i < components.length; i++) {
            const posComponent = components[i].Position;

            const spriteComponent = components[i].Sprite;
            let sprite = spriteComponent.sprite;

            if(sprite !== undefined) {
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