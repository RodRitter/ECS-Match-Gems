export class System {
    constructor(game) {
        this.id = this.constructor.name;
        this.game = game;
    }

    onAwake() {
        // Implemented in system
    }

    onStart() {
        // Implemented in system
    }

    // --------------------------------------------
    // Simplified signal/messaging between Systems
    // --------------------------------------------
    listen(id, callback) {
        let listenerObj = {listener: this, callback: callback};
        if(this.game.listeners[id] === undefined) {
            this.game.listeners[id] = new Array();
        }
        this.game.listeners[id].push(listenerObj);
    }

    sendSignal(id) {
        let listeners = this.game.listeners[id];
        for (let i = 0; i < listeners.length; i++) {
            listeners[i].callback();
        }
    }

    sendSignal(id, params) {
        let listeners = this.game.listeners[id];
        for (let i = 0; i < listeners.length; i++) {
            listeners[i].callback(params);
        }
    }
    // --------------------------------------------

    getComponents(id) {
        let components = this.game.components[id];
        let componentArr = [];

        if(components !== undefined) {
            for (let i = 0; i < Object.keys(components).length; i++) {
                const key = Object.keys(components)[i];
                componentArr.push(components[key]);
            }
        }
        
        return componentArr;
    }

    getComponentsWithDependency(id, dependencyName) {
        let allComponents = this.getComponents(id);
        let filteredComponents = [];
        
        for (let i = 0; i < allComponents.length; i++) {
            const component = allComponents[i];
            const dependency = component.entity.getComponent(dependencyName);
            if(dependency !== undefined) {
                let filtered = {};
                filtered[id] = component;
                filtered[dependencyName] = dependency;
                filteredComponents.push(filtered);
            };
        }

        return filteredComponents;
    }

    getSystem(id) {
        for (let i = 0; i < this.game.systems.length; i++) {
            const system = this.game.systems[i];
            if(system.id == id) return system;
        }
    }

}