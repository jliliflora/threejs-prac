import * as THREE from "../build/three.module";

class App {
	constructor() {
		/* divContainer를 클래스의 field로 정의하고 있음, filed로 정의한 이유는 this._divContainer로 다른 method에서 참조 할 수 있도록 하기 위함 */
		const divContainer = document.querySelector("#webgl-container");
		this._divContainer = divContainer;

		/* Renderer(렌더러)를 생성하는 코드, Renderer객체는 three.js webGLRenderer라는 클래스로 생성 할 수 있음, antialias 속성을 활성화시켜주면 3차원 장면이 렌더링될때 경계선이 계단현상 없이 부드럽게 표현됨 */
		const renderer = new THREE.WebGLRenderer({ antialias: true });
		/*renderer객체에 setPixelRatio method를 호출해서 픽셀의 ratio값을 정의하고 설정해주는 코드 */
		renderer.setPixelRatio(window.devicePixelRatio);
		/*이렇게 생성된 renderer의 DomElement를 id가 webgl-container인 divContainer의 자식으로 추가 */
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
