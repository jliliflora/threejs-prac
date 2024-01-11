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

		/*scene객체를 생성하는 코드 /이 객체는 three.js 라이브러리에서 Scene클래스로 간단히 생성가능 */
		const scene = new THREE.Scene();
		/*그리고 이 객체를 field화 시키고 있음 다른 method에서도 참조할수있도록 했음 */
		this._scense = scene;

		/*카메라 객체를 구성하는 _setupCamera method호출 */
		this._setupCamera();
		/*광원을 설정하는 _setupLight method 호출 */
		this._setupLight();
		/*3차원 모델을 설정하는 _setupModel method 호출*/
		this._setupModel();
		/*밑줄로 시작하는 filed와 method가 있는데 이렇게 밑줄로 시작하는 이유는 이 App 클래스 내부에서만 사용되는 private filed, private method라는 의미인데 자바스크립트에서는 클래스를 정의할때 private 성격을 부여할 기능이 없음*/

		window.onresize = this.resize.bond(this);
		this.resize();

		requestAnimationFrame(this.render.bind(this));
	}

	_setupCamera() {
		const width = this._divContainer.clientWidth;
		const height = this._divContainer.clientHeight;
		const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 100);
		camera.position.z = 2;
		this._camera = camera;
	}
}

window.onload = function () {
	new App();
};
