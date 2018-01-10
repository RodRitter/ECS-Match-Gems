import { Component } from '../core/component';

export class Gem extends Component {
    init(data) {
        this.x = data.x;
        this.y = data.y;
        this.type = data.type;
    }
}