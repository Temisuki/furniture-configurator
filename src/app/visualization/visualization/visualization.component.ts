import {AfterContentInit, AfterViewChecked, AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {
  AmbientLight,
  Camera, Color, DirectionalLight,
  FBXLoader, MeshPhongMaterial,
  PerspectiveCamera,
  Scene,
  Vector3,
  WebGLRenderer
} from 'three';
import OrbitControls from 'threejs-orbit-controls';
import {BaseComponent} from '../../utility/BaseComponent';

declare var require: any;

@Component({
  selector: 'app-visualization',
  templateUrl: './visualization.component.html',
  styleUrls: ['./visualization.component.scss']
})
export class VisualizationComponent extends BaseComponent implements OnInit, OnDestroy, AfterContentInit {

  @ViewChild('canvasElement') canvasElement: ElementRef;

  renderer: WebGLRenderer;
  scene: Scene;
  camera: Camera;
  fbxLoader: FBXLoader;
  FBXLoader = require('three-fbx-loader');
  controls: OrbitControls;
  furnitureObject;

  constructor() {
    super();
  }

  ngOnInit() {
    this.fbxLoader = new this.FBXLoader();
    this.initCanvas();
    // const w = new Worker('')
  }

  initCanvas() {
    this.renderer = new WebGLRenderer({
      preserveDrawingBuffer: true,
      canvas: this.canvasElement.nativeElement,
      antialias: true,
      alpha: true
    });
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.scene = new Scene();
    this.camera = new PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);
    this.camera.position.z = 10;
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enabled = true;
    const ambientLight = new AmbientLight(0x333333);	// 0.2
    this.scene.add(ambientLight);
    this.scene.add(this.camera);
    this.onResize();
    this.onRender();
    this.loadObject();
    window.addEventListener('resize', () => this.onResize());
  }

  loadObject() {
    this.fbxLoader.load('assets/Sofa.fbx', (object) => {
      this.scene.add(object);
      const light = new DirectionalLight(0xFFFFFF, 0.2);
      light.target = object;
      this.scene.add(light);
      this.furnitureObject = object;
      object.scale = new Vector3(0.00001, 0.00001, 0.00001);
      this.isLoading = false;
    });
  }

  update() {
    if (this.renderer && this.camera instanceof Camera) {
      this.renderer.render(this.scene, this.camera);
    }
    if (this.controls) {
      this.controls.update();
    }
  }

  onResize() {
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }

  onRender() {
    this.update();
    setTimeout(() => {
      requestAnimationFrame(() => {
        this.onRender();
      });
    }, 1000 / 30);
  }

  ngOnDestroy(): void {
    this.renderer.dispose();
  }

  randomColor() {
    this.furnitureObject.children.forEach(child => {
      if (child.material) {
        console.log(child.material);
        if (child.material.length > 1) {
          child.material.forEach(mat => {
            const color = new Color();
            color.setHex( Math.random() * 0xffffff );
            mat.color = color;
          });
        } else {
          const color = new Color();
          color.setHex( Math.random() * 0xffffff );
          child.material.color = color;
        }
      }
    });
  }

  colorChanged(colorId: number): void {
    this.furnitureObject.children.forEach(child => {
      if (child.material) {
        console.log(child.material);
        if (child.material.length > 1) {
          child.material.forEach(mat => {
            const color = new Color();
            color.setHex( colorId );
            mat.color = color;
          });
        } else {
          const color = new Color();
          color.setHex( colorId );
          child.material.color = color;
        }
      }
    });
  }

  ngAfterContentInit(): void {
  }
}
