import { Component, ViewChild, ElementRef, OnInit, OnDestroy } from '@angular/core';
import * as THREE from 'three';
import { ActivatedRoute, Router } from "@angular/router";
import { ProductService } from "../services/product.service";
import { orderService } from "../services/order.service";
import { MatSnackBar, _MatRadioGroupMixinBase } from "@angular/material";
import { Product } from '../model/product';
import { ContinuousDimension } from '../model/continuous-dimension';
import { DiscreteDimension } from '../model/discrete-dimension';
import { Category } from '../model/category';
import { order } from '../model/order';
import { orderItem } from '../model/orderItem';
import { Item } from '../model/Item';
import { SurfaceFinish } from '../model/surface-finish';
import { Material } from '../model/Material';
import { MaterialFinish } from '../model/material-finish';
import { MaterialFinishDTO } from '../model/material-finish-dto';
import { OptionalProducts } from '../model/optional-products';
import { AuthService } from '../services/auth.service';
import { parseTemplate } from '@angular/compiler';
import { Scene } from 'three';
import { concatAll } from 'rxjs/operators';

declare const require: (moduleId: string) => any; /*for require function below*/
var OrbitControls = require('three-orbit-controls')(THREE) /*import orbit controls*/
var dat = require('dat.gui');

var datGUI = null;
var guiControls = null;
var guiControlsNomeExtra = null;
var guiControlsExtraLargura = null;
var guiControlsExtraAltura = null;
var guiControlsExtraProfundidade = null;
var guiControlsExtraMaterial = null;
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
	categoria = "Gavetas";
	parts = [];
	product: Product;
	optionalProduct: Product;
	id: number;



	updateSize() {

		this.scene.remove(this.mesh);
		let tmp = guiControls.material.split(" / ");
		const loader = new THREE.TextureLoader().load(tmp[3]);
		let material = new THREE.MeshLambertMaterial({ map: loader });
		this.mesh = this.devolverTipoProduto(guiControls.largura, guiControls.altura, guiControls.profundidade, material, this.product.category.description);
		if (this.optionalProduct != null) {
			var selectedObject = this.scene.getObjectByName((this.optionalProduct.id).toString());
			if (selectedObject != null) {
				this.scene.remove(selectedObject);
				Object.keys(this.parts).forEach(key => {
					let k = +key;
					if (k < this.parts.length) {
						if (this.parts[k].name == (this.optionalProduct.id).toString()) {
							console.log("Found." + k);
							var tmp = this.parts.splice(k, 1);
							console.log(this.parts);
						}
					}
				});
			}
			let tmp = guiControls.materialProdutoExtra.split(" / ");
			const loader = new THREE.TextureLoader().load(tmp[3]);
			let material = new THREE.MeshLambertMaterial({ map: loader });
			var obj = this.devolverTipoProduto(guiControls.larguraProdutoExtra, guiControls.alturaProdutoExtra, guiControls.profundidadeProdutoExtra, material, this.optionalProduct.category.description);
			obj.name = (this.optionalProduct.id).toString();
			this.scene.add(obj);
			this.parts.push(obj);
		}
		this.scene.add(this.mesh);
	}

	getProduct(): void {
		this.route.params.subscribe(res => {
			this.id = <number>res.id;
		});
		this.service.getProduct(this.id).subscribe(data => {
			this.product = (<Product>data)
			guiControls.name = this.product.name;

			this.createDatGui();
		}, error => {
			if (error.status == 401) {
				this.bar.open(
					'A sua sessão expirou ou não fez login. Por favor inicie sessão para continuar.',
					'', {
						duration: 2000,
					});
			} else {
				this.bar.open(
					`Ocorreu um erro ao tentar obter o producto do servidor...`,
					'', {
						duration: 2000,
					});
			}
		});
	}

	constructor(private route: ActivatedRoute, private service: ProductService, private bar: MatSnackBar, private serviceorder: orderService, private authservice: AuthService) {
		this.scene = new THREE.Scene();
		this.scene.background = null;

		guiControls = new function () {
			this.name = "";
			this.largura = 0;
			this.altura = 0;
			this.profundidade = 0;
			this.material = "";
			this.produtoExtra = [];
			this.materialExtra = [];
			this.cidade = "";
			this.latitude = "0000";
			this.longitude = "0000";
			this.encomendar = function () {
			}
			this.adicionar = function () {
			}
			this.remover = function () {
			}
			this.nomeProdutoOpcional = " ";
			this.larguraProdutoExtra = 0;
			this.alturaProdutoExtra = 0;
			this.profundidadeProdutoExtra = 0;
			this.materialProdutoExtra = "";
		}


		this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000);
		this.camera.position.z = 200;

		this.camera.add(new THREE.PointLight(0xffffff));
		this.scene.add(this.camera);

		this.controls = new OrbitControls(this.camera, this.renderer.domElement);
		this.controls.addEventListener('change', () => { this.renderer.render(this.scene, this.camera); });

		window.addEventListener('mousedown', (event) => { this.onMouseDown(event) }, false);
		window.addEventListener('mousemove', (event) => { this.onMouseScale(event) }, false);
		window.addEventListener('mousemove', (event) => { this.onMouseMove(event) }, false);
		window.addEventListener('mouseup', (event) => { this.onMouseUp(event) }, false);
	}

	ngOnInit() {
		this.getProduct();
	}

	ngAfterViewInit() {
		this.renderer.setSize(window.innerWidth, window.innerHeight * 0.9155);
		this.rendererContainer.nativeElement.appendChild(this.renderer.domElement);
		this.animate();
	}

	createDatGui() {
		datGUI = new dat.default.GUI({ width: 300 });
		datGUI.add(guiControls, 'name').name('Name').listen().onChange(() => { this.updateSize() });
		if (((<DiscreteDimension>this.product.dimensions.height).discrete) == null) {
			datGUI.add(guiControls, 'altura', (<ContinuousDimension>this.product.dimensions.height).min, (<ContinuousDimension>this.product.dimensions.height).max, 1).name('Altura').listen().onChange(() => { this.updateSize() });
		} else {
			datGUI.add(guiControls, 'altura',
				this.convertDimensions(((<DiscreteDimension>this.product.dimensions.height).discrete)))
				.name('Altura').onChange(() => { this.updateSize() });
		}
		if (((<DiscreteDimension>this.product.dimensions.width).discrete) == null) {
			datGUI.add(guiControls, 'largura', (<ContinuousDimension>this.product.dimensions.width).min, (<ContinuousDimension>this.product.dimensions.width).max, 1).name('Largura').listen().onChange(() => { this.updateSize() });
		} else {
			datGUI.add(guiControls, 'largura',
				this.convertDimensions(((<DiscreteDimension>this.product.dimensions.width).discrete)))
				.name('Largura').onChange(() => { this.updateSize() });
		}
		if (((<DiscreteDimension>this.product.dimensions.depth).discrete) == null) {
			datGUI.add(guiControls, 'profundidade', (<ContinuousDimension>this.product.dimensions.depth).min, (<ContinuousDimension>this.product.dimensions.depth).max, 1).name('Profundidade').listen().onChange(() => { this.updateSize() });
		} else {
			datGUI.add(guiControls, 'profundidade',
				this.convertDimensions(((<DiscreteDimension>this.product.dimensions.depth).discrete)))
				.name('Profundidade').onChange(() => { this.updateSize() });
		}
		datGUI.add(guiControls, 'material',
			this.getMaterialFinish((<MaterialFinish[]>this.product.materialFinishes)))
			.name('Material Acabamento').onChange(() => { this.updateSize() });
		datGUI.add(guiControls, 'produtoExtra', this.getSubProducts((<OptionalProducts[]>this.product.optionalProducts)))
			.name('SubProdutos').onChange(() => { this.updateSize() });
		datGUI.add(guiControls, 'cidade').name('cidade');
		datGUI.add(guiControls, 'latitude').name('latitude');
		datGUI.add(guiControls, 'longitude').name('longitude');
		datGUI.add(guiControls, 'adicionar').name("Adicionar Produto").onChange(() => { this.adicionar() });
		datGUI.add(guiControls, 'remover').name("Remover Produto").onChange(() => { this.removeProduct(this.optionalProduct.id) });
		datGUI.add(guiControls, 'encomendar').name("Encomendar Produto").onChange(() => { this.encomenda(guiControls.name, guiControls.material, guiControls.altura, guiControls.profundidade, guiControls.largura, guiControls.latitude, guiControls.longitude, guiControls.cidade) });
	}
	animate() {
		window.requestAnimationFrame(() => this.animate());
		this.renderer.render(this.scene, this.camera);
	}

	//Create Closet
	closet(width, height, depth, material): THREE.Mesh {
		const thickness = height * 0.02;
		const closetG = new THREE.BoxGeometry(width, height, 0);
		const closetM = new THREE.MeshLambertMaterial({ color: 0x00ff00 });
		closetM.transparent = true;
		closetM.opacity = 0.2;
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

	//Create Drawer
	drawer(width, height, depth, material): THREE.Mesh {
		const thickness = height * 0.05;
		const drawerG = new THREE.BoxGeometry(width, height, depth);
		const drawerM = new THREE.MeshLambertMaterial({ color: 0x00ff00 });
		drawerM.transparent = true;
		drawerM.opacity = 0.001;
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

		const pullG = new THREE.BoxGeometry(width / 5, height / 7, thickness);
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

	//Create Shelf
	shelf(width, height, depth, material): THREE.Mesh {
		const shelfG = new THREE.BoxGeometry(width, height, depth);
		const shelfM = new THREE.MeshLambertMaterial({ color: 0x00ff00 });
		shelfM.transparent = true;
		shelfM.opacity = 0.001;
		const drawer = new THREE.Mesh(shelfG, shelfM);
		const frontWallG = new THREE.BoxGeometry(width, height, depth);
		const frontWall = new THREE.Mesh(frontWallG, material);
		drawer.add(frontWall);
		return drawer;
	}

	//Create Cabide
	cabide(width, height, depth, material): THREE.Mesh {
		const cabideG = new THREE.BoxGeometry(width, height, depth);
		const cabideM = new THREE.MeshLambertMaterial({ color: 0x00ff00 });
		cabideM.transparent = true;
		cabideM.opacity = 0.001;
		const cabide = new THREE.Mesh(cabideG, cabideM);
		var geometry = new THREE.CylinderGeometry(depth, height , width, 32);
		material = new THREE.MeshPhongMaterial({ color: 0x282828 });
		var cylinder = new THREE.Mesh(geometry, material);
		cylinder.rotateZ(THREE.Math.degToRad(90));
		cabide.add(cylinder);
		return cabide;
	}

	convertDimensions(dimensoes) {
		return dimensoes.split(";");
	}

	adicionar() {
		var id = guiControls.produtoExtra.split("/")[1];
		if (this.getProductById(id) != null) {
			this.limparProdutoOpcionalDatGUI();
			guiControls.nomeProdutoOpcional = this.optionalProduct.name;
			guiControlsNomeExtra = datGUI.add(guiControls, 'nomeProdutoOpcional').name('Produto Opcional Selecionado').listen();
			if (((<DiscreteDimension>this.optionalProduct.dimensions.height).discrete) == null) {
				guiControlsExtraAltura = datGUI.add(guiControls, 'alturaProdutoExtra', (<ContinuousDimension>this.optionalProduct.dimensions.height).min, (<ContinuousDimension>this.optionalProduct.dimensions.height).max, 1).name('Altura').listen().onChange(() => { this.updateSize() });
			} else {
				guiControlsExtraAltura = datGUI.add(guiControls, 'alturaProdutoExtra',
					this.convertDimensions(((<DiscreteDimension>this.optionalProduct.dimensions.height).discrete)))
					.name('Altura Produto Opcional').onChange(() => { this.updateSize() });
			}
			if (((<DiscreteDimension>this.optionalProduct.dimensions.width).discrete) == null) {
				guiControlsExtraLargura = datGUI.add(guiControls, 'larguraProdutoExtra', (<ContinuousDimension>this.optionalProduct.dimensions.width).min, (<ContinuousDimension>this.optionalProduct.dimensions.width).max, 1).name('Largura').listen().onChange(() => { this.updateSize() });
			} else {
				guiControlsExtraLargura = datGUI.add(guiControls, 'larguraProdutoExtra',
					this.convertDimensions(((<DiscreteDimension>this.optionalProduct.dimensions.width).discrete)))
					.name('Largura Produto Opcional').onChange(() => { this.updateSize() });
			}
			if (((<DiscreteDimension>this.optionalProduct.dimensions.depth).discrete) == null) {
				guiControlsExtraProfundidade = datGUI.add(guiControls, 'profundidadeProdutoExtra', (<ContinuousDimension>this.optionalProduct.dimensions.depth).min, (<ContinuousDimension>this.optionalProduct.dimensions.depth).max, 1).name('Profundidade').listen().onChange(() => { this.updateSize() });
			} else {
				guiControlsExtraProfundidade = datGUI.add(guiControls, 'profundidadeProdutoExtra',
					this.convertDimensions(((<DiscreteDimension>this.optionalProduct.dimensions.depth).discrete)))
					.name('Profundidade Produto Opcional').onChange(() => { this.updateSize() });
			}
			guiControlsExtraMaterial = datGUI.add(guiControls, 'materialProdutoExtra',
				this.getMaterialFinish((<MaterialFinish[]>this.optionalProduct.materialFinishes)))
				.name('Material Acabamento Extra').onChange(() => { this.updateSize() });
			var obj = null;
			if (guiControls.produtoExtra == "Armários") {
				obj = this.closet(guiControls.larguraProdutoExtra, guiControls.alturaProdutoExtra, guiControls.profundidadeProdutoExtra, "");
				console.log("adicionar " + obj);
			} else if (guiControls.produtoExtra == "Gavetas") {
				obj = this.drawer(guiControls.larguraProdutoExtra, guiControls.alturaProdutoExtra, guiControls.profundidadeProdutoExtra, "");
			} else if (guiControls.produtoExtra == "Prateleiras") {
				obj = this.shelf(guiControls.larguraProdutoExtra, guiControls.alturaProdutoExtra, guiControls.profundidadeProdutoExtra, "");
			} else {
				obj = this.closet(guiControls.larguraProdutoExtra, guiControls.alturaProdutoExtra, guiControls.profundidadeProdutoExtra, "");
				console.log(obj.geometry);
			}
			obj.name = (this.optionalProduct.id).toString();
			this.scene.add(obj);
			this.parts.push(obj);
		}
	}

	encomenda(name: string, material: string, altura: number, profundidade: number, largura: number, latitude: number, longitude: number, cidade: string) {
		console.log(this.product)
		const category: string = this.product.category.description;
		const list: orderItem[] = [];
		const mataca = material.split(" / ");
		const productI: orderItem = new orderItem(name, category, mataca[0], mataca[1], list, altura, profundidade, largura);
		const it: Item = new Item(productI, parseInt(mataca[2]));
		const items: Item[] = [];
		items.push(it);
		const ord: order = new order(items, parseInt(mataca[2]), latitude, longitude, cidade, this.authservice.getLoggedInUsername());
		this.serviceorder.createEncomenda(ord).subscribe();
	}


	getMaterialFinish(matsFinish: MaterialFinish[]): string[] {
		const ret: string[] = [];

		for (let key in matsFinish) {
			const matFinish = (<MaterialFinishDTO>(<unknown>matsFinish[key]));
			ret.push(matFinish.materialDTO.name + " / " + matFinish.surfaceFinishDTO.name + " / " + (matsFinish[key].price + matFinish.materialDTO.price) + " / " + matsFinish[key].textureUrl);
		}
		return ret;
	}

	removeProduct(id) {
		var selectedObject = this.scene.getObjectByName(id.toString());
		if (selectedObject != null) {
			this.scene.remove(selectedObject);
			this.limparProdutoOpcionalDatGUI();
			Object.keys(this.parts).forEach(k => {
				let key = +k;
				if (key < this.parts.length) {
					if (this.parts[key].name == id.toString()) {
						console.log("Found." + key);
						var tmp = this.parts.splice(key, 1);
						console.log(this.parts);
					}
				}
			});
		}
	}
	getSubProducts(matsFinish: OptionalProducts[]): string[] {
		const ret: string[] = [];

		console.log(matsFinish);
		for (let key in matsFinish) {
			const matFinish = (<OptionalProducts>(<unknown>matsFinish[key]));
			ret.push(matFinish.optional + " / " + matFinish.productId);
		}
		return ret;
	}

	getProductById(id) {
		this.service.getProduct(id).subscribe(data => {
			this.optionalProduct = (<Product>data);
		}, error => {
			if (error.status == 401) {
				this.bar.open(
					'A sua sessão expirou ou não fez login. Por favor inicie sessão para continuar.',
					'', {
						duration: 2000,
					});
			} else {
				this.bar.open(
					`Ocorreu um erro ao tentar obter o producto do servidor...`,
					'', {
						duration: 2000,
					});
			}
		});
		return this.optionalProduct;
	}

	changeActiveProduct(id) {
		var newProduct = this.getProductById(id);
		if (newProduct != null) {
			console.log("mudei");
			this.optionalProduct = newProduct;
			this.limparProdutoOpcionalDatGUI();
			guiControlsNomeExtra = this.optionalProduct.name;
			guiControlsNomeExtra = datGUI.add(guiControls, 'nomeProdutoOpcional').name('Produto Opcional Selecionado').listen();
			if (((<DiscreteDimension>this.optionalProduct.dimensions.height).discrete) == null) {
				guiControlsExtraAltura = datGUI.add(guiControls, 'alturaProdutoExtra', (<ContinuousDimension>this.optionalProduct.dimensions.height).min, (<ContinuousDimension>this.optionalProduct.dimensions.height).max, 1).name('Altura').listen().onChange(() => { this.updateSize() });
			} else {
				guiControlsExtraAltura = datGUI.add(guiControls, 'alturaProdutoExtra',
					this.convertDimensions(((<DiscreteDimension>this.optionalProduct.dimensions.height).discrete)))
					.name('Altura Produto Opcional').onChange(() => { this.updateSize() });
			}
			if (((<DiscreteDimension>this.optionalProduct.dimensions.width).discrete) == null) {
				guiControlsExtraLargura = datGUI.add(guiControls, 'larguraProdutoExtra', (<ContinuousDimension>this.optionalProduct.dimensions.width).min, (<ContinuousDimension>this.optionalProduct.dimensions.width).max, 1).name('Largura').listen().onChange(() => { this.updateSize() });
			} else {
				guiControlsExtraLargura = datGUI.add(guiControls, 'larguraProdutoExtra',
					this.convertDimensions(((<DiscreteDimension>this.optionalProduct.dimensions.width).discrete)))
					.name('Largura Produto Opcional').onChange(() => { this.updateSize() });
			}
			if (((<DiscreteDimension>this.optionalProduct.dimensions.depth).discrete) == null) {
				guiControlsExtraProfundidade = datGUI.add(guiControls, 'profundidadeProdutoExtra', (<ContinuousDimension>this.optionalProduct.dimensions.depth).min, (<ContinuousDimension>this.optionalProduct.dimensions.depth).max, 1).name('Profundidade').listen().onChange(() => { this.updateSize() });
			} else {
				guiControlsExtraProfundidade = datGUI.add(guiControls, 'profundidadeProdutoExtra',
					this.convertDimensions(((<DiscreteDimension>this.optionalProduct.dimensions.depth).discrete)))
					.name('Profundidade Produto Opcional').onChange(() => { this.updateSize() });
			}
			guiControlsExtraMaterial = datGUI.add(guiControls, 'materialProdutoExtra',
				this.getMaterialFinish((<MaterialFinish[]>this.optionalProduct.materialFinishes)))
				.name('Material Acabamento Extra').onChange(() => { this.updateSize() });
		}
	}
	onMouseDown(event) {

		if (event.which == 1) {
			this.mouse.set((event.offsetX / this.renderer.getSize().width) * 2 - 1, -(event.offsetY / this.renderer.getSize().height) * 2 + 1);

			// update the picking ray with the camera and mouse position
			this.raycaster.setFromCamera(this.mouse, this.camera);

			// calculate objects intersecting the picking ray
			var intersects = this.raycaster.intersectObjects(this.parts);
			console.log(intersects.length);
			if (intersects.length > 0) {
				this.controls.enableRotate = false;
				this.changeActiveProduct(parseInt(intersects[0].object.name));
				this.selectedMove = intersects[0].object;
			} else {
				intersects = this.raycaster.intersectObject(this.mesh);
				console.log(intersects);
				if (intersects.length > 0) {

					this.controls.enableRotate = false;
					this.selectedScale = intersects[0].object;
				}
			}
		}
	}


	onMouseMove(event) {
		if (this.selectedMove != null) {
			this.mouse.set((event.offsetX / this.renderer.getSize().width) * 2 - 1, -(event.offsetY / this.renderer.getSize().height) * 2 + 1);

			console.log(this.selectedMove);

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

			//redraw
			let sizeX = guiControls.largura + x * distance;
			let sizeY = guiControls.altura + y * distance;

			if (sizeX > (<ContinuousDimension>this.product.dimensions.width).max) {
				sizeX = (<ContinuousDimension>this.product.dimensions.width).max;
			}
			if (sizeX < (<ContinuousDimension>this.product.dimensions.width).min) {
				sizeX = (<ContinuousDimension>this.product.dimensions.width).min;
			}
			if (sizeY > (<ContinuousDimension>this.product.dimensions.height).max) {
				sizeY = (<ContinuousDimension>this.product.dimensions.height).max;
			}
			if (sizeY < (<ContinuousDimension>this.product.dimensions.height).min) {
				sizeY = (<ContinuousDimension>this.product.dimensions.height).min;
			}

			if (((<DiscreteDimension>this.product.dimensions.width).discrete) == null) {
				if (sizeX <= (<ContinuousDimension>this.product.dimensions.width).max &&
					sizeX >= (<ContinuousDimension>this.product.dimensions.width).min) {
					//update dimensions
					guiControls.largura = sizeX;

					this.selectedScale.scale.x = sizeX / this.selectedScale.geometry.parameters.width;
				}
			}

			if (((<DiscreteDimension>this.product.dimensions.height).discrete) == null) {
				if (sizeY <= (<ContinuousDimension>this.product.dimensions.height).max &&
					sizeY >= (<ContinuousDimension>this.product.dimensions.height).min) {
					//update dimensions
					guiControls.altura = sizeY;

					this.selectedScale.scale.y = sizeY / this.selectedScale.geometry.parameters.height;
				}
			}

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

	limparProdutoOpcionalDatGUI() {
		if (datGUI != null) {
			if (guiControlsNomeExtra != null) {
				datGUI.remove(guiControlsNomeExtra);
				guiControlsNomeExtra = null;
			}
			if (guiControlsExtraLargura != null) {
				datGUI.remove(guiControlsExtraLargura);
				guiControlsExtraLargura = null;
			}
			if (guiControlsExtraAltura != null) {
				datGUI.remove(guiControlsExtraAltura);
				guiControlsExtraAltura = null;
			}
			if (guiControlsExtraProfundidade != null) {
				datGUI.remove(guiControlsExtraProfundidade);
				guiControlsExtraProfundidade = null;
			}
			if (guiControlsExtraMaterial != null) {
				datGUI.remove(guiControlsExtraMaterial);
				guiControlsExtraMaterial = null;
			}
		}
	}

	devolverTipoProduto(largura, altura, profundidade, material, categoria) {
		if (categoria != null) {
			var catSplit = categoria.split(" ")[0];
		}
		var objeto = null;
		if (catSplit == "Armários" || catSplit == "Armário") {
			objeto = this.closet(largura, altura, profundidade, material);
		} else if (catSplit == "Gavetas" || catSplit == "Gaveta") {
			objeto = this.drawer(largura, altura, profundidade, material);
		} else if (catSplit == "Prateleiras" || catSplit == "Prateleira") {
			objeto = this.shelf(largura, altura, profundidade, material);
		} else if (catSplit == "Cabides" || catSplit == "Cabide") {
			objeto = this.cabide(largura, altura, profundidade, material);
		}
		else {
			objeto = this.closet(largura, altura, profundidade, material);
		}
		return objeto;
	}

}
