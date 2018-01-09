export class Component {
    constructor(game, data) {
        this.id = this.constructor.name;
        this.game = game;
        this.init(data);
    }

    // Called when Entity adds the component
    addComponent() {
        if(this.game.components[this.id] === undefined) {
            this.game.components[this.id] = {};
        }
        this.game.components[this.id][this.entity.id] = this;
    }

    getSiblingComponent(id) {
        let components = this.entity.components;
        
        for (let i = 0; i < Object.keys(components).length; i++) {
            const component = components[Object.keys(components)[i]];
            if(component.id == id) return component;
        }
    }

    init(data) {
        // implemented in component
    }
}