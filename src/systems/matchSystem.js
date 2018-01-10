import { System } from '../core/system';

export class MatchSystem extends System {

    onAwake() {
        this.checkType = undefined;
        this.checkQueue = [];
        this.createListeners();
    }

    registerClickOnSprite(spriteComponent, gemComponent) {
        spriteComponent.sprite.interactive = true;
        spriteComponent.sprite.buttonMode = true;
        spriteComponent.sprite.on('click', () => {
            this.startMatch(gemComponent.x, gemComponent.y);
        });
        spriteComponent.onClick = true;
    }

    createListeners() {
        this.listen('Renderer.SpriteLoaded', (spriteComponent) => {
            let gemComponent = spriteComponent.getSiblingComponent('Gem');
            if(gemComponent !== undefined) {
                this.registerClickOnSprite(spriteComponent, gemComponent);
            }
        });
    }

    startMatch(x,y) {
        let gridSys = this.getSystem('GridSystem');
        let map = gridSys.map;

        let origin = map[x][y];
        this.checkType = origin.type;
        this.checkQueue.push(origin);

        // check left
        if(x-1 >= 0) {
            this.match(map[x-1][y]);
        }

        // check right
        if(x+1 < gridSys.width) {
            this.match(map[x+1][y]);
        }

        // check top
        if(y-1 >= 0) {
            this.match(map[x][y-1]);
        }

        // check bottom
        if(y+1 < gridSys.height) {
            this.match(map[x][y+1]);
        }

        this.checkQueue = Array.from(new Set(this.checkQueue)); // Remove duplicates
        this.onMatched(this.checkQueue);
        
    }

    match(gem) {
        if(gem !== undefined) {
            let gridSys = this.getSystem('GridSystem')
            let map = gridSys.map;

            if(gem.type == this.checkType) {
                this.checkQueue.push(gem);

                // check left
                if(gem.x-1 >= 0) {
                    let g = map[gem.x-1][gem.y];
                    if(g !== undefined && this.isQueued(g) == false) {
                        if(g.type == this.checkType) {
                            this.checkQueue.push(g);
                            this.match(g);
                        }
                    }
                }

                // check right
                if(gem.x+1 < gridSys.width) {
                    let g = map[gem.x+1][gem.y];
                    if(g !== undefined && this.isQueued(g) == false) {
                        if(g.type == this.checkType) {
                            this.checkQueue.push(g);
                            this.match(g);
                        }
                    }
                }

                // check top
                if(gem.y-1 >= 0) {
                    let g = map[gem.x][gem.y-1];
                    if(g !== undefined && this.isQueued(g) == false) {
                        if(g.type == this.checkType) {
                            this.checkQueue.push(g);
                            this.match(g);
                        }
                    }
                }

                // check bottom
                if(gem.y+1 < gridSys.height) {
                    let g = map[gem.x][gem.y+1];
                    if(g !== undefined && this.isQueued(g) == false) {
                        if(g.type == this.checkType) {
                            this.checkQueue.push(g);
                            this.match(g);
                        }
                    }
                }
            }
            
            
        }
    }

    isQueued(gem) {
        if(gem === undefined) return false;
        
        for (let i = 0; i < this.checkQueue.length; i++) {
            if(this.checkQueue[i].x == gem.x && this.checkQueue[i].y == gem.y) {
                return true;
            }
        }
        return false;
    }

    onMatched(matches) {
        let gridSys = this.getSystem('GridSystem');
        
        if(matches.length >= 3) {
            for (let i = 0; i < matches.length; i++) {
                const gem = matches[i];
                let sprite = gem.getSiblingComponent('Sprite').sprite;
                
                let newAlpha = {alpha: sprite.alpha};
                let target = {alpha: 0};

                new TWEEN.Tween(newAlpha)
                .to(target, 100)
                .easing(TWEEN.Easing.Linear.None)
                .onUpdate(function() {
                    sprite.alpha = newAlpha.alpha;
                })
                .onComplete(() => {
                    gridSys.removeFromGrid(gem.x, gem.y);
                    this.sendSignal('Gravity.ApplyGravity');
                })
                .start();
                
            }
            this.sendSignal('Game.AddScore', matches.length);
        }

        // Reset
        this.checkType = undefined;
        this.checkQueue = new Array();
    }
    

    

}