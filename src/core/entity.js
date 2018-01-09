export class Entity {
    constructor() {
        this.id = this._generateRandomID();
        this.components = {};
    }

    _generateRandomID() {
        return `Entity_${(+new Date()).toString(16) + (Math.random() * 100000000 | 0).toString(16)}`;
    }

    getComponent(id) {
        return this.components[id]
    }

    addComponents(components) {
        components.forEach(component => {
            component.entity = this;
            this.components[component.id] = component;
            this.components[component.id].addComponent();
        });
    }

    remove() {
        // Delete components first
        for(var key in this.components) {
            delete window.game.components[key][this.id];
        }

        // then delete entity
        delete window.game.entities[this.id];
    }
}