import * as THREE from '../build/three.module.js'
import { OrbitControls } from "../examples/jsm/controls/OrbitControls.js";

class App {
    constructor(){
        const divContainer = document.querySelector("#main");
        this._divContainer = divContainer;

        const renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setPixelRatio(window.devicePixelRatio);
        divContainer.appendChild(renderer.domElement);
        this._renderer = renderer;

        const scene = new THREE.Scene();
        this._scene = scene;

        this._setupCamera();
        this._setupLight();
        this._setupModel();
        this._setupControls();

        window.onresize = this.resize.bind(this);
        this.resize();

        requestAnimationFrame(this.render.bind(this));
    }

    _setupCamera() {
        const width = this._divContainer.clientWidth;
        const height = this._divContainer.clientHeight;
        const camera = new THREE.PerspectiveCamera(
            75,
            width / height,
            0.1,
            100
        );
        camera.position.z = 2;
        this._camera = camera;
    }

    _setupLight() {
        const color = 0xffffff;
        const intensity = 1;
        const light = new THREE.DirectionalLight(color, intensity);
        light.position.set(-1, 2, 4);
        this._scene.add(light);
    }

    _setupModel() {
        // const geometry = new THREE.BoxGeometry(1, 1, 1, 2, 2, 2);
        // const geometry = new THREE.CircleGeometry(0.9, 16, Math.PI/2, Math.PI); //(원판의 크기, 분할 갯수, 시작각도, 연장각도) 
        // const geometry = new THREE.ConeGeometry(0.5, 1.6, 16, 5, true, 0, Math.PI); //(밑면 원의 반지름크기, 높이, 분할갯수, 높이 방향에 대한 분할갯수, 원뿔 밑면을 열어놓을지의 여부, 원뿔의 시작각, 연장각)
        // const geometry = new THREE.CylinderGeometry(0.3, 0.7, 1.2, 32, 12, true, 0, Math.PI); //(윗면반지름, 밑면반지름, 높이, 둘레방향에 대한 분할갯수, 높이방향에 대한 분할갯수, 윗면과 밑면을 열어놓을지의 여부, 원통의 시작각, 연장각)
        // const geometry = new THREE.SphereGeometry(0.8, 32, 12, 0, Math.PI, 0, Math.PI/2); //(반지름크기, 수형방향에 대한 분할, 수직방향에 대한 분할 수, 수평방향에 대한 구의 시작각, 연장각, 수직방향에 대한 구의 시작각, 연장각)
        // const geometry = new THREE.RingGeometry(0.5, 1, 6, 3, 0, Math.PI); //(내부반지름값, 외부반지름값, 가장자리 둘레방향으로의 분할 갯수, 내부 방향에 대한 분할 갯수, 시작각, 연장각)
        // const geometry = new THREE.PlaneGeometry(1, 1.4, 4, 2); //(너비에 대한 길이, 높이, 너비방향에 대한 분할 수, 높이 방향에 대한 분할 수)
        const geometry = new THREE.TorusGeometry(0.7, 0.2, 8, 32, Math.PI); //(토러스의 반지름, 도넛원통의 반지름값, 토러스의 방사 방향에 대한 분할 수, 토러스에 대한 긴 원통의 분할 수, 연장각(시작각 없음))
        // const geometry = new THREE.TorusKnotGeometry(0.6, 0.1, 64, 32, 3, 4);
        const fillMaterial = new THREE.MeshPhongMaterial({ color : 0x515151 });
        const cube = new THREE.Mesh(geometry, fillMaterial);

        const lineMaterial = new THREE.LineBasicMaterial({ color : 0xffff00 });
        const line = new THREE.LineSegments(
            new THREE.WireframeGeometry(geometry), lineMaterial
        );
        const group = new THREE.Group()
        group.add(cube);
        group.add(line);

        this._scene.add(group);
        this._cube = group;
    }

    _setupControls() {
        new OrbitControls(this._camera, this._divContainer);
    }

    resize() {
        const width = this._divContainer.clientWidth;
        const height = this._divContainer.clientHeight;

        this._camera.aspect = width / height;
        this._camera.updateProjectionMatrix();

        this._renderer.setSize(width, height);
    }

    render(time) {
        this._renderer.render(this._scene, this._camera);
        this.update(time);
        requestAnimationFrame(this.render.bind(this));
    }

    update(time) {
        time *= 0.001; //second unit
        // this._cube.rotation.x = time;
        // this._cube.rotation.y = time;
    }
}

window.onload = function() {
    new App();
}

