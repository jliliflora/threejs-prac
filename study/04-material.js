import * as THREE from '../build/three.module.js';
import { OrbitControls } from "../examples/jsm/controls/OrbitControls.js"

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

    /*마우스를 통해 자유롭게 화면을 조작할 수 있는 함수 */
    _setupControls() {
        new OrbitControls(this._camera, this._divContainer);
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
        camera.position.z = 3; /*카메라를 조정해서 10000개가 모두 화면에 보이도록 하려면 여기 값을 높여주면 됨 */
        this._camera = camera;
    }

    _setupLight() {
        const color = 0xffffff;
        const intensity = 1;
        const light = new THREE.DirectionalLight(color, intensity);
        light.position.set(-1, 2, 4);
        this._scene.add(light);
    }

    /*
    //PointsMaterial을 적용할 10000개의 포인트를 scene에 추가하는 코드!
    _setupModel() {
        
        
        const vertices = [];
        for(let i = 0; i < 10000; i++) {
            const x = THREE.MathUtils.randFloatSpread(5);
            const y = THREE.MathUtils.randFloatSpread(5);
            const z = THREE.MathUtils.randFloatSpread(5);

            vertices.push(x, y, z);
        }

        const geometry = new THREE.BufferGeometry();
        geometry.setAttribute(
            "position",
            new THREE.Float32BufferAttribute(vertices, 3)
        );

        // 원으로 렌더링 시키기
        const sprite = new THREE.TextureLoader().load(
            "../examples/textures/sprites/disc.png"
        );

        const material = new THREE.PointsMaterial({
            map: sprite,
            alphaTest: 0.5,
            color: "#00ffff",
            size: 0.1,
            sizeAttenuation: true  //카메라에서 가까운 포인트와 카메라에서 훨씬 더 먼 포인트의 크기가 다르도록 주는 설정값
        });

        const points = new THREE.Points(geometry, material);
        this._scene.add(points);
    }
    */

    /*
    //Line, LineSegments, LineLoop 사용법
    _setupModel() {
        const vertices = [
            -1, 1, 0,
            1, 1, 0,
            -1, -1, 0,
            1, -1, 0,
        ];

        const geometry = new THREE.BufferGeometry();
        geometry.setAttribute("position", new THREE.Float32BufferAttribute(vertices, 3));
        
        
        //LineBasicMaterial : 선에 대한 색상만 지정하는 코드
        // const material = new THREE.LineBasicMaterial({
        //     color: 0xffff00
        // });

        //LineDashedMaterial : 선의 길이를 참조해서 재질이 적용되므로 선의 길이를 계산해줌
        const material = new THREE.LineDashedMaterial({
            color: 0xffff00,
            dashSize: 0.2,
            gapSize: 0.1,
            scale: 4
        });

        const line = new THREE.LineLoop(geometry, material); //여기 변경해주면됨
        this._scene.add(line);
    }
    */

    //정육면체와 구를 활용한 Mesh 렌더링
   _setupModel() {
        //MeshBasicMaterial
        // const material = new THREE.MeshBasicMaterial({
        //     visible: true, //mesh가 보일지 안보일지
        //     transparent: false, //투명도
        //     opacity: 1, //투명도 정도
        //     depthTest: true,
        //     depthWrite: true,
        //     side: THREE.FontSide,

        //     color: 0xffff00, //색상변경
        //     wireframe: false
        // });

        //MeshLambertMaterial : mesh를 구성하는 정점에서 광원의 영향을 계산하는 재질
        // const material = new THREE.MeshLambertMaterial({
        //     transparent: true,
        //     opacity: 0.5,
        //     side: THREE.DoubleSide, //FronstSide, BackSide, DoubleSide

        //     color: "#d25383",
        //     emissive: 0x555500,
        //     wireframe: true
        // });

        //MeshPhongMaterial : mesh가 렌더링되는 픽셀 단위로 광원의 영향을 계산하는 재질
        // const material = new THREE.MeshPhongMaterial({
        //     color: 0xff0000,
        //     emissive: 0x00000, // 다른 광원에 영향을 받지 않는 재질 자체에서 방출하는 색상값
        //     specular: 0xffff00, // 광원에 의한 반사되는 색상으로 기본값은 연한 회색
        //     shininess: 10, //광원이 반사되는 정도
        //     flatShading: true, //mesh를 평편하게 렌더링 할지에 대한 여부
        //     wireframe: false
        // });

        //MeshStandardMaterial : PBR재질로 3차원 그래픽에서 가장 많이 사용하는 재질 2가지 중 하나임, 고품질의 렌더링결과를 얻을수 있음
        // const material = new THREE.MeshStandardMaterial({
        //     color: 0xff0000,
        //     emissive: 0x00000,
        //     roughness: 0.25, //거칠기, 최댓값은 1
        //     metalness: 0.8, //금속성, 1로 갈수록 금속성이 강해짐
        //     wireframe: false,
        //     flatShading: false,
        // });

        //MeshPhysicalMaterial : MeshStandardMaterial보다 발전된 물리기반렌더링 재질, 코팅효과, 유리같은 효과
        const material = new THREE.MeshPhysicalMaterial({
            color: 0xff0000,
            emissive: 0x00000,
            roughness: 1,
            metalness: 0,
            clearcoat: 0.5, //코팅 효과, 거칠고 금속성이 전혀 없음에도 코팅이 되서 반사효과를 줌, 1로 갈수록 효과를 최대치로 표현
            clearcoatRoughness: 0, //코팅에 대한 거칠기값, 1이 최대값
            wireframe: false,
            flatShading: false,
        });

        const box = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), material);
        box.position.set(-1, 0, 0);
        this._scene.add(box);

        const sphere = new THREE.Mesh(new THREE.SphereGeometry(0.7, 32, 32), material);
        sphere.position.set(1, 0, 0);
        this._scene.add(sphere);
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

    }
}

window.onload = function() {
    new App();
}

