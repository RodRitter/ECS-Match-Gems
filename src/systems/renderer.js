import { System } from '../core/system';

export class Renderer extends System {
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
        this.pixiRenderer = PIXI.autoDetectRenderer(800, 600, {antialias: false, transparent: false, resolution: 1});
		document.body.appendChild(this.pixiRenderer.view);
        this.pixiRenderer.view.setAttribute("id", "stage");
        //Create the stage
        this.stage = new PIXI.Container();
        this.pixiRenderer.render(this.stage);

        // Begin render loop
        this._tick(0);
    }

    renderNewSprites() {
        let spriteComponents = this.game.components['Sprite'];

        if(spriteComponents !== undefined) {
            for (let i = 0; i < Object.keys(spriteComponents).length; i++) {
                const spriteComponent = this.game.components['Sprite'][Object.keys(spriteComponents)[i]];
                if(spriteComponent.loaded == false) {
                    let sprite = PIXI.Sprite.fromImage(spriteComponent.image);
                    sprite.anchor.set(0.5,0.5);
                    spriteComponent.sprite = sprite;
                    this.stage.addChild(sprite);
                    spriteComponent.loaded = true;
                }
            }
        }

        
    }
}