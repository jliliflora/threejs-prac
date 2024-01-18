import * as THREE from "../build/three.module";
import { color } from "three/nodes";

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
		/*이렇게 밑줄로 시작함으로써 개발자간의 약속을 정하는 건데 이 밑줄에 정의를 해놨음으로 app클래스 외부에서는 밑줄로 시작하는 filed 또는 method를 호출해서는 안된다 */

		/* 창 크키가 변경되면 발생하는 onesiz 이벤트에 이 클래스의 resize method를 지정하고 있음*/
		/* resize 이벤트가 필요한 이유 : renderer나 camera는창 크기가 변경 될때마다 그 크기에 맞게 속성값을 재설정 해줘야함 */
		/* resize 이벤트에 resize metho를 지정할때 bind를 사용해 지정하는 이유 : resize method안에서 this가 가르키는 객체가 아닌 App 클래스의 객체가 되도록 하기 위함 */
		/* */
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

	_setupLight() {
		const color = 0xffffff;
		const intensity = 1;
		const light = new THREE.DirectionalLight(color, intensity);
	}
}

window.onload = function () {
	new App();
};
