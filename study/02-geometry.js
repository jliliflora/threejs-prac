import * as THREE from '../build/three.module.js'
import { OrbitControls } from "../examples/jsm/controls/OrbitControls.js";
import { FontLoader } from "../examples/jsm/loaders/FontLoader.js"
import { TextGeometry } from "../examples/jsm/geometries/TextGeometry.js"

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

        camera.position.x = -15;
        camera.position.z = 15; //카메라 시점을 더 멀리 두려면 여기 값을 키우셈
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
        // 기본 입체 도형 메서드
        // const geometry = new THREE.BoxGeometry(1, 1, 1, 2, 2, 2);
        // const geometry = new THREE.CircleGeometry(0.9, 16, Math.PI/2, Math.PI); //(원판의 크기, 분할 갯수, 시작각도, 연장각도) 
        // const geometry = new THREE.ConeGeometry(0.5, 1.6, 16, 5, true, 0, Math.PI); //(밑면 원의 반지름크기, 높이, 분할갯수, 높이 방향에 대한 분할갯수, 원뿔 밑면을 열어놓을지의 여부, 원뿔의 시작각, 연장각)
        // const geometry = new THREE.CylinderGeometry(0.3, 0.7, 1.2, 32, 12, true, 0, Math.PI); //(윗면반지름, 밑면반지름, 높이, 둘레방향에 대한 분할갯수, 높이방향에 대한 분할갯수, 윗면과 밑면을 열어놓을지의 여부, 원통의 시작각, 연장각)
        // const geometry = new THREE.SphereGeometry(0.8, 32, 12, 0, Math.PI, 0, Math.PI/2); //(반지름크기, 수형방향에 대한 분할, 수직방향에 대한 분할 수, 수평방향에 대한 구의 시작각, 연장각, 수직방향에 대한 구의 시작각, 연장각)
        // const geometry = new THREE.RingGeometry(0.5, 1, 6, 3, 0, Math.PI); //(내부반지름값, 외부반지름값, 가장자리 둘레방향으로의 분할 갯수, 내부 방향에 대한 분할 갯수, 시작각, 연장각)
        // const geometry = new THREE.PlaneGeometry(1, 1.4, 4, 2); //(너비에 대한 길이, 높이, 너비방향에 대한 분할 수, 높이 방향에 대한 분할 수)
        // const geometry = new THREE.TorusGeometry(0.7, 0.2, 8, 32, Math.PI); //(토러스의 반지름, 도넛원통의 반지름값, 토러스의 방사 방향에 대한 분할 수, 토러스에 대한 긴 원통의 분할 수, 연장각(시작각 없음))
        // const geometry = new THREE.TorusKnotGeometry(0.6, 0.1, 64, 32, 3, 4);
        
        // 하트 그리기
        // const shape = new THREE.Shape();
        // const x = -2.5, y = -5;
        // shape.moveTo(x + 2.5, y + 2.5);
        // shape.bezierCurveTo(x + 2.5, y + 2.5, x + 2, y, x, y);
        // shape.bezierCurveTo(x - 3, y, x - 3, y + 3.5, x - 3, y + 3.5);
        // shape.bezierCurveTo(x - 3, y + 5.5, x - 1.5, y + 7.7, x + 2.5, y + 9.5);
        // shape.bezierCurveTo(x + 6, y + 7.7, x + 8, y + 4.5, x + 8, y + 3.5);
        // shape.bezierCurveTo(x + 8, y + 3.5, x + 8, y, x + 5, y);
        // shape.bezierCurveTo(x + 3.5, y, x + 2.5, y + 2.5, x + 2.5, y + 2.5);
        // const geometry = new THREE.ShapeGeometry(shape);

        //TubeGeometry 그리기
        // class CustomSinCurve extends THREE.Curve {
        //     constructor(scale) {
        //         super();
        //         this.scale = scale;
        //     }
        //     getPoint(t) {
        //         const tx = t * 3 - 1.5;
        //         const ty = Math.sin(2 * Math.PI * t);
        //         const tz = 0;
        //         return new THREE.Vector3(tx, ty, tz).multiplyScalar(this.scale);
        //     }
        // }
        // const path = new CustomSinCurve(4);
        // const geometry = new THREE.TubeGeometry(path, 64, 1.5, 8, false); //(커브객체 path가져오기, 튜브의 진행방향에 대한 분할 수, 튜브 원통에 대한 반지름크기, 원통에 대한 분할 수, 원통 끝단을 닫을지의 여부)

        // LatheGeometry 그리기
        // const points = [];
        // for (let i = 0; i < 10; ++i) {
        //     points.push(new THREE.Vector2(Math.sin(i * 0.2) * 3 + 3, (i - 5) * .8));
        // }
        // const geometry = new THREE.LatheGeometry(points, 32, 0, Math.PI); //(points 좌표배열 가져오기, 분할수, 시작각도, 연장각도)

        // ExtrudeGeometry 그리기(하트엉덩이 그리기)
        // const shape = new THREE.Shape();
        // const x = -2.5, y = -5;
        // shape.moveTo(x + 2.5, y + 2.5);
        // shape.bezierCurveTo(x + 2.5, y + 2.5, x + 2, y, x, y);
        // shape.bezierCurveTo(x - 3, y, x - 3, y + 3.5, x - 3, y + 3.5);
        // shape.bezierCurveTo(x - 3, y + 5.5, x - 1.5, y + 7.7, x + 2.5, y + 9.5);
        // shape.bezierCurveTo(x + 6, y + 7.7, x + 8, y + 4.5, x + 8, y + 3.5);
        // shape.bezierCurveTo(x + 8, y + 3.5, x + 8, y, x + 5, y);
        // shape.bezierCurveTo(x + 3.5, y, x + 2.5, y + 2.5, x + 2.5, y + 2.5);
        // const settings = {
        //     steps: 1, //깊이 방향으로의 분할 수
        //     depth: 2, //깊이값
        //     bevelEnabled: true, //베벨링을 할 것인지의 여부
        //     bevelThickness: 1.6, //베벨링에 대한 두께값
        //     bevelSize: 1.5, //shape의 외곽선으로부터 얼마나 멀리 베벨링 할것인지의 거리
        //     bevelSegments: 6 //베벨링 단계 수
        // }
        // const geometry = new THREE.ExtrudeGeometry(shape, settings);

        const fontLoader = new FontLoader();
        async function loadFont(that) {
            const url = "../examples/fonts/helvetiker_regular.typeface.json"
            const font = await new Promise((resolve, reject) => {
                fontLoader.load(url, resolve, undefined, reject);
            });

            const geometry = new TextGeometry("sy", {
                font: font,
                size: 5,
                height: 0.7,
                curveSegments: 4,
                bevelEnabled: true,
                bevelThickness: 1,
                bevelSize: 0.7,
                bevelSegments: 2,
            });

            const fillMaterial = new THREE.MeshPhongMaterial({ color : 0x515151 });
            const cube = new THREE.Mesh(geometry, fillMaterial);

            const lineMaterial = new THREE.LineBasicMaterial({ color : 0xffff00 });
            const line = new THREE.LineSegments(
                new THREE.WireframeGeometry(geometry), lineMaterial
            );
            const group = new THREE.Group()
            group.add(cube);
            group.add(line);

            that._scene.add(group);
            that._cube = group;
        };
        loadFont(this);

        // const fillMaterial = new THREE.MeshPhongMaterial({ color : 0x515151 });
        // const cube = new THREE.Mesh(geometry, fillMaterial);

        // const lineMaterial = new THREE.LineBasicMaterial({ color : 0xffff00 });
        // const line = new THREE.LineSegments(
        //     new THREE.WireframeGeometry(geometry), lineMaterial
        // );
        // const group = new THREE.Group()
        // group.add(cube);
        // group.add(line);

        // this._scene.add(group);
        // this._cube = group;
    }
    

    /*
    //shape는 2차원 도형을 정의하기 위한 클래스
    _setupModel() {
        const shape = new THREE.Shape();
        // shape.moveTo(1, 1);
        // shape.lineTo(1, -1);
        // shape.lineTo(-1, -1);
        // shape.lineTo(-1, 1);
        // shape.closePath();

        //하트 그리기
        const x = -2.5, y = -5;
        shape.moveTo(x + 2.5, y + 2.5);
        shape.bezierCurveTo(x + 2.5, y + 2.5, x + 2, y, x, y);
        shape.bezierCurveTo(x - 3, y, x - 3, y + 3.5, x - 3, y + 3.5);
        shape.bezierCurveTo(x - 3, y + 5.5, x - 1.5, y + 7.7, x + 2.5, y + 9.5);
        shape.bezierCurveTo(x + 6, y + 7.7, x + 8, y + 4.5, x + 8, y + 3.5);
        shape.bezierCurveTo(x + 8, y + 3.5, x + 8, y, x + 5, y);
        shape.bezierCurveTo(x + 3.5, y, x + 2.5, y + 2.5, x + 2.5, y + 2.5);


        const geometry = new THREE.BufferGeometry();
        const points = shape.getPoints();
        geometry.setFromPoints(points);

        const material = new THREE.LineBasicMaterial({color: 0xffff00});
        const line = new THREE.Line(geometry, material);

        this._scene.add(line);
    }*/

    /*
    //TubeGeometry에서 돌릴 s자 커브 그리기
    _setupModel() {
        class CustomSinCurve extends THREE.Curve {
            constructor(scale) {
                super();
                this.scale = scale;
            }
            //getpoint메서드를 통해 0~1 사이의 t값에 대한 커브의 구성 좌표를 계산함
            getPoint(t) {
                const tx = t * 3 - 1.5;
                const ty = Math.sin(2 * Math.PI * t);
                const tz = 0;
                return new THREE.Vector3(tx, ty, tz).multiplyScalar(this.scale);
            }
        }

        const path = new CustomSinCurve(4);

        const geometry = new THREE.BufferGeometry();
        const points = path.getPoints(30);//부드러운 곡선을 얻고자 한다면 여기에 적당한 정수값을 넣어주면 됨(기본값 5)
        geometry.setFromPoints(points);

        const material = new THREE.LineBasicMaterial({color: 0xffff00});
        const line = new THREE.Line(geometry, material);

        this._scene.add(line);
    }
    */

    /*
    //LatheGeometry에서 회전시킬 커브곡선 만들기
    _setup() {
        const points = [];
        for (let i = 0; i < 10; ++i) {
            points.push(new THREE.Vector2(Math.sin(i * 0.2) * 3 + 3, (i - 5) * .8));
        }

        const geometry = new THREE.BufferGeometry();
        geometry.setFromPoints(points);

        const material = new THREE.LineBasicMaterial({color : 0xffff00});
        const line = new THREE.Line(geometry, material);

        this._scene.add(line);
    }
    */

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

