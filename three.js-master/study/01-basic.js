import * as THREE from "../build/three.module";

class App {
	constructor() {
		this._setupCamera();
		this._setupLight();
		this._setupModel();

		window.onresize = this.resize.bond(this);
		this.resize();

		requestAnimationFrame(this.render.bind(this));
	}
}

window.onload = function () {
	new App();
};
