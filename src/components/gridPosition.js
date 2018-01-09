import { Component } from '../core/component';

export class GridPosition extends Component {
    init(data) {
        this.x = data.x;
        this.y = data.y;
    }
}