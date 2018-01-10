import { System } from '../core/system';

export class MatchSystem extends System {

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
        this.listen('Renderer.SpriteLoaded', (spriteComponent) => {
            let gemComponent = spriteComponent.getSiblingComponent('Gem');
            if(gemComponent !== undefined) {
                this.registerClickOnSprite(spriteComponent);
            }
        });
    }

}