import * as THREE from "../build/three.module";

class App {
	constructor() {
		const divContainer = document.querySelector("#webgl-container");
		this._divContainer = divContainer;
		/* divContainer를 클래스의 field로 정의하고 있음, filed로 정의한 이유는 this._divContainer로 다른 method에서 참조 할 수 있도록 하기 위함 */

		const renderer = new THREE.WebGLRenderer({ antialias: true });
		renderer.setPixelRatio(window.devicePixelRatio);
		divContainer.appendChild(renderer.domElement);
		this._renderer = renderer;

		const scene = new THREE.Scene();
		this._scense = scene;

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
