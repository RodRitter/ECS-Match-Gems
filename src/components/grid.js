import { Component } from '../core/component';

export class Grid extends Component {
    init(data) {
        this.width = data.width;
        this.height = data.height;
        this.scale = data.scale;
    }
}