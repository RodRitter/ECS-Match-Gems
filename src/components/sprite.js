import { Component } from '../core/component';

export class Sprite extends Component {
    init(data) {
        this.image = data.image;
        this.sprite = undefined;
        this.loaded = false;
        this.onClick = false;
    }
}