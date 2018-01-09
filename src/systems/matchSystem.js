import { System } from '../core/system';

export class MatchSystem extends System {

    onAwake() {
        this.checkQueue = [];
    }

    onStart() {
        
    }

    registerClickListeners() {
        let components = this.getComponentsWithDependency('Gem', 'Sprite');

        for (let i = 0; i < components.length; i++) {
            const sprite = components[i].sprite;
            if(sprite.loaded && !sprite.onClick) {
                sprite.sprite.click = () => {
                    console.log('click');
                }
            }
        }
    }

    createListeners() {
        this.listen('Match.RegisterClickEvents', () => {
            this.registerClickListeners();
        });
    }

}