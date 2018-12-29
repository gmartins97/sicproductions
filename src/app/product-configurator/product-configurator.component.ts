import { Component, ViewChild, ElementRef, OnInit, OnDestroy } from '@angular/core';
import * as THREE from 'three';
import { Scene } from 'three';
declare const require: (moduleId: string) => any; /*for require function below*/
var OrbitControls = require('three-orbit-controls')(THREE) /*import orbit controls*/
var dat = require('dat.gui');
var datGUI = null;
var guiControls = null;
//Substituir com as do produto
var minAltura=200;
var	maxAltura=1000;
var	minLargura=200;
var	maxLargura=1000;
var	minProfundidade=100;
var	maxProfundidade=500;

@Component({
	selector: 'app-product-configurator',
	templateUrl: './product-configurator.component.html',
	styleUrls: ['./product-configurator.component.css']
})	


export class ProductConfiguratorComponent implements OnInit, OnDestroy {

	ngOnDestroy(): void {
		if (datGUI != null) {
			datGUI.destroy();
		}
	}

	@ViewChild('rendererContainer') rendererContainer: ElementRef;

	renderer = new THREE.WebGLRenderer({ alpha: true });
	scene = null;
	camera = null;
	mesh = null;
	controls = null;
	raycaster = new THREE.Raycaster();
	mouse = new THREE.Vector2();
	selectedMove = null;
	selectedScale = null;
	parts = [];


	updateSize() {
		this.scene.remove(this.mesh);
		const material = new THREE.MeshLambertMaterial({ color: 0xff0000, wireframe: false });
		this.mesh = this.closet(guiControls.largura, guiControls.altura, guiControls.profundidade, material);
		this.scene.add(this.mesh);
	}
	constructor() {
		this.scene = new THREE.Scene();
		this.scene.background = null;

		guiControls = new function () {
			this.largura = minLargura;
			this.altura = minAltura;
			this.profundidade = minProfundidade;
			this.material = "";
			this.acabamento = "";
		}

		//this.scene.add(new THREE.AmbientLight(0xffffff), 0.5);

		datGUI = new dat.default.GUI({ width: 300 });
		datGUI.add(guiControls, 'altura', minAltura, maxAltura, 1).name('Altura').listen().onChange(() => { this.updateSize() });
		datGUI.add(guiControls, 'largura', minLargura, maxAltura, 1).name('Largura').listen().onChange(() => { this.updateSize() });
		datGUI.add(guiControls, 'profundidade', minProfundidade, maxProfundidade, 1).name('Profundidade').listen().onChange(() => { this.updateSize() });
		datGUI.add(guiControls, 'material',
			['Material 1', 'Material 2'])
			.name('Material').onChange(() => { this.updateSize() });
		datGUI.add(guiControls, 'acabamento',
			['Acabamento 1', 'Acabamento 2'])
			.name('Acabamento').onChange(() => { this.updateSize() });
		//var modulos = datGUI.addFolder('Modulos');
		//var modulo1 = modulos.addFolder('Modulo 1');
		this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000);
		this.camera.position.z = 1000;

		this.camera.add(new THREE.PointLight(0xffffff));
		this.scene.add(this.camera);

		this.controls = new OrbitControls(this.camera, this.renderer.domElement);
		this.controls.addEventListener('change', () => { this.renderer.render(this.scene, this.camera); });

		const material = new THREE.MeshLambertMaterial({ color: 0xff0000, wireframe: false });

		this.mesh = this.closet(guiControls.altura, guiControls.largura, guiControls.profundidade, material);

		this.scene.add(this.mesh);

		window.addEventListener('mousedown', (event) => { this.onMouseDown(event) }, false);
		window.addEventListener('mousemove', (event) => { this.onMouseScale(event) }, false);
		window.addEventListener('mousemove', (event) => { this.onMouseMove(event) }, false);
		window.addEventListener('mouseup', (event) => { this.onMouseUp(event) }, false);
	}

	ngOnInit() {

	}

	ngAfterViewInit() {
		this.renderer.setSize(window.innerWidth, window.innerHeight * 0.9155);
		this.rendererContainer.nativeElement.appendChild(this.renderer.domElement);
		this.animate();
	}

	animate() {
		window.requestAnimationFrame(() => this.animate());
		this.renderer.render(this.scene, this.camera);
	}

	// create closet
	closet(width, height, depth, material): THREE.Mesh {
		const thickness = height * 0.05;
		const closetG = new THREE.BoxGeometry(width, height, depth);
		const closetM = new THREE.MeshLambertMaterial({ color: 0x00ff00 });
		closetM.transparent = true;
		closetM.opacity = 0.0;
		const closet = new THREE.Mesh(closetG, closetM);

		const backWallG = new THREE.BoxGeometry(width, height, thickness);
		const backWall = new THREE.Mesh(backWallG, material);
		backWall.position.z = -depth * .5;

		const leftWallG = new THREE.BoxGeometry(thickness, height, depth);
		const leftWall = new THREE.Mesh(leftWallG, material);
		leftWall.position.x = -width * .5 + thickness * .5;

		const rightWallG = new THREE.BoxGeometry(thickness, height, depth);
		const rightWall = new THREE.Mesh(rightWallG, material);
		rightWall.position.x = width * .5 - thickness * .5;

		const topWallG = new THREE.BoxGeometry(width, thickness, depth);
		const topWall = new THREE.Mesh(topWallG, material);
		topWall.position.y = height * .5 - thickness * .5;

		const bottomWallG = new THREE.BoxGeometry(width, thickness, depth);
		const bottomWall = new THREE.Mesh(bottomWallG, material);
		bottomWall.position.y = -height * .5 + thickness * .5;

		closet.add(backWall);
		closet.add(leftWall);
		closet.add(rightWall);
		closet.add(topWall);
		closet.add(bottomWall);

		return closet;
	}
	drawer(width, height, depth, material): THREE.Mesh {
		const thickness = height * 0.05;
		const drawerG = new THREE.BoxGeometry(width, height, depth);
		const drawerM = new THREE.MeshLambertMaterial({ color: 0x00ff00 });
		drawerM.transparent = true;
		drawerM.opacity = 0.0;
		const drawer = new THREE.Mesh(drawerG, drawerM);

		const backWallG = new THREE.BoxGeometry(width, height, thickness);
		const backWall = new THREE.Mesh(backWallG, material);
		backWall.position.z = -depth * .5;

		const frontWallG = new THREE.BoxGeometry(width, height, thickness);
		const frontWall = new THREE.Mesh(frontWallG, material);
		frontWall.position.z = depth * .5;

		const leftWallG = new THREE.BoxGeometry(thickness, height, depth);
		const leftWall = new THREE.Mesh(leftWallG, material);
		leftWall.position.x = -width * .5 + thickness * .5;

		const rightWallG = new THREE.BoxGeometry(thickness, height, depth);
		const rightWall = new THREE.Mesh(rightWallG, material);
		rightWall.position.x = width * .5 - thickness * .5;

		const bottomWallG = new THREE.BoxGeometry(width, thickness, depth);
		const bottomWall = new THREE.Mesh(bottomWallG, material);
		bottomWall.position.y = -height * .5 + thickness * .5;

		const pullG = new THREE.BoxGeometry(width/5, height/7, thickness);
		const pull = new THREE.Mesh(pullG, material);
		pull.position.z = depth * .51;


		drawer.add(backWall);
		drawer.add(leftWall);
		drawer.add(rightWall);
		drawer.add(frontWall);
		drawer.add(bottomWall);
		drawer.add(pull);
		return drawer;
	}
	

	onMouseDown(event) {
		if (event.which == 1) {
			this.mouse.set((event.offsetX / this.renderer.getSize().width) * 2 - 1, -(event.offsetY / this.renderer.getSize().height) * 2 + 1);

			// update the picking ray with the camera and mouse position
			this.raycaster.setFromCamera(this.mouse, this.camera);

			// calculate objects intersecting the picking ray
			let intersects = this.raycaster.intersectObjects(this.parts);

			if (intersects.length > 0) {
				this.controls.enableRotate = false;
				this.selectedMove = intersects[0].object;
			} else {
				intersects = this.raycaster.intersectObject(this.mesh);
				if (intersects.length > 0) {
					this.controls.enableRotate = false;
					this.selectedScale = intersects[0].object;
				}
			}
		}
		/*if (event.which == 3) {
			  mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
			  mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
	
			  // update the picking ray with the camera and mouse position
			  raycaster.setFromCamera( mouse, camera );
	
			  // calculate objects intersecting the picking ray
			  var intersects = raycaster.intersectObjects( test );
	
			  if (intersects.length > 0) {
					controls.enablePan = false;
					selectedScale = intersects[ 0 ].object;
			  }
		}*/
	}

	onMouseMove(event) {
		if (this.selectedMove != null) {

			this.mouse.set((event.offsetX / this.renderer.getSize().width) * 2 - 1, -(event.offsetY / this.renderer.getSize().height) * 2 + 1);

			this.raycaster.setFromCamera(this.mouse, this.camera);

			//transform mouse coordinates to real world coordinates
			const vector = new THREE.Vector3(this.mouse.x, this.mouse.y, 0.5);
			vector.unproject(this.camera);
			const dir = vector.sub(this.camera.position).normalize();
			const distance = - this.camera.position.z / dir.z;
			const pos = this.camera.position.clone().add(dir.multiplyScalar(distance));

			//copy position
			this.selectedMove.position.copy(pos);
		}

	}

	onMouseScale(event) {
		if (this.selectedScale != null) {
			const x = ((event.offsetX / this.renderer.getSize().width) * 2 - 1) - this.mouse.x;
			const y = (-(event.offsetY / this.renderer.getSize().height) * 2 + 1) - this.mouse.y;

			//transform mouse coordinates to real world coordinates
			const vector = new THREE.Vector3(x, y, 0.5);
			vector.unproject(this.camera);
			const dir = vector.sub(this.camera.position).normalize();
			const distance = - this.camera.position.z / dir.z;
			const pos = this.camera.position.clone().add(dir.multiplyScalar(distance));

			//scale

			//this.selectedScale.scale.x += x * this.camera.position.z * .005;
			//this.selectedScale.scale.y += y * this.camera.position.z * .005;

			guiControls.largura += x * this.camera.position.z * .5;
			guiControls.altura += y * this.camera.position.z * .5;

			//redraw
			this.updateSize();

			//update mouse position
			this.mouse.x = (event.offsetX / this.renderer.getSize().width) * 2 - 1;
			this.mouse.y = -(event.offsetY / this.renderer.getSize().height) * 2 + 1;
		}
	}

	onMouseUp(event) {
		// Enable the controls
		if (event.which == 1) {
			this.controls.enableRotate = true;
			this.selectedMove = null;
			this.selectedScale = null;
		}
		/*if (event.which == 3) {
			  controls.enablePan = true;
			  selectedScale = null;
		}*/
	}

}
