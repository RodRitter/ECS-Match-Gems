import { Component } from '../core/component';

export class Position extends Component {
    init(data) {
        this.x = data.x;
        this.y = data.y;
    }
}