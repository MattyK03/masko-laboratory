import { GUI } from "dat.gui";
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const ThreeScene: React.FC = () => {
	const mountRef = useRef<HTMLDivElement>(null);
	const [points, setPoints] = useState<THREE.Vector3[]>([]);
	const [step, setStep] = useState<number>(0.3);
	const [showWireframe, setShowWireframe] = useState<boolean>(true);
	const [is3D, setIs3D] = useState<boolean>(false);
	const pointsMeshRef = useRef<THREE.Points>();
	const sceneRef = useRef<THREE.Scene>();
	const meshRef = useRef<THREE.Mesh>();

	const createShape = (scene: THREE.Scene) => {
		if (meshRef.current) {
			scene.remove(meshRef.current);
		}

		if (points.length < 2) {
			console.warn("Недостаточно точек для создания формы");
			return;
		}

		const shapeGeometry = new THREE.BufferGeometry();
		const vertices: number[] = [];
		points.forEach((point) => {
			vertices.push(point.x, point.y, point.z);
		});
		vertices.push(points[0].x, points[0].y, points[0].z);

		const expVertices: number[] = [];
		const segments = 10;

		for (let i = 0; i < segments; i++) {
			const scale = Math.exp(i * step);
			for (let j = 0; j < vertices.length; j += 3) {
				expVertices.push(
					vertices[j] * scale,
					vertices[j + 1] * scale,
					i * step
				);
			}
		}

		const indices: number[] = [];
		const numPoints = vertices.length / 3;
		for (let i = 0; i < segments - 1; i++) {
			for (let j = 0; j < numPoints - 1; j++) {
				const a = i * numPoints + j;
				const b = (i + 1) * numPoints + j;
				const c = (i + 1) * numPoints + (j + 1);
				const d = i * numPoints + (j + 1);

				indices.push(a, b, d);
				indices.push(b, c, d);
			}
		}

		shapeGeometry.setAttribute(
			"position",
			new THREE.Float32BufferAttribute(expVertices, 3)
		);
		shapeGeometry.setIndex(indices);
		shapeGeometry.computeVertexNormals();

		const material = new THREE.MeshPhongMaterial({
			color: 0x0077ff,
			wireframe: showWireframe,
			side: THREE.DoubleSide,
		});

		meshRef.current = new THREE.Mesh(shapeGeometry, material);
		scene.add(meshRef.current);
	};

	const updatePoints = (scene: THREE.Scene) => {
		if (pointsMeshRef.current) {
			scene.remove(pointsMeshRef.current);
		}

		const geometry = new THREE.BufferGeometry().setFromPoints(points);
		const material = new THREE.PointsMaterial({
			color: 0xff0000,
			size: 0.1,
		});
		pointsMeshRef.current = new THREE.Points(geometry, material);
		scene.add(pointsMeshRef.current);
	};

	useEffect(() => {
		const scene = new THREE.Scene();
		sceneRef.current = scene;
		scene.background = new THREE.Color(0xeeeeee);

		const camera = new THREE.PerspectiveCamera(
			75,
			window.innerWidth / window.innerHeight,
			0.1,
			1000
		);
		camera.position.z = 10;

		const renderer = new THREE.WebGLRenderer({ antialias: true });
		renderer.setSize(window.innerWidth, window.innerHeight);
		mountRef.current?.appendChild(renderer.domElement);

		const controls = new OrbitControls(camera, renderer.domElement);
		const gui = new GUI();

		const ambientLight = new THREE.AmbientLight(0x404040, 2);
		scene.add(ambientLight);

		const pointLight = new THREE.PointLight(0xffffff, 1);
		pointLight.position.set(10, 10, 10);
		scene.add(pointLight);

		const axesHelper = new THREE.AxesHelper(5);
		scene.add(axesHelper);

		const addPoint = (event: MouseEvent) => {
			if (is3D) return;

			const rect = renderer.domElement.getBoundingClientRect();
			const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
			const y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

			const vector = new THREE.Vector3(x, y, 0).unproject(camera);
			vector.z = 0;

			setPoints((prevPoints) => [
				...prevPoints,
				new THREE.Vector3(vector.x, vector.y, vector.z),
			]);
		};

		renderer.domElement.addEventListener("click", addPoint);

		const animate = () => {
			requestAnimationFrame(animate);
			controls.update();
			renderer.render(scene, camera);
		};

		animate();

		const guiControls = {
			x: 0,
			y: 0,
			z: 0,
			rotationX: 0,
			rotationY: 0,
			rotationZ: 0,
			scaleX: 1,
			scaleY: 1,
			scaleZ: 1,
			wireframe: showWireframe,
			updateWireframe: () => {
				setShowWireframe(!showWireframe);
				if (meshRef.current) {
					(
						meshRef.current.material as THREE.MeshPhongMaterial
					).wireframe = !showWireframe;
				}
			},
		};

		gui.add(guiControls, "x", -10, 10).onChange(() => {
			if (meshRef.current) meshRef.current.position.x = guiControls.x;
		});
		gui.add(guiControls, "y", -10, 10).onChange(() => {
			if (meshRef.current) meshRef.current.position.y = guiControls.y;
		});
		gui.add(guiControls, "z", -10, 10).onChange(() => {
			if (meshRef.current) meshRef.current.position.z = guiControls.z;
		});
		gui.add(guiControls, "rotationX", 0, Math.PI * 2).onChange(() => {
			if (meshRef.current)
				meshRef.current.rotation.x = guiControls.rotationX;
		});
		gui.add(guiControls, "rotationY", 0, Math.PI * 2).onChange(() => {
			if (meshRef.current)
				meshRef.current.rotation.y = guiControls.rotationY;
		});
		gui.add(guiControls, "rotationZ", 0, Math.PI * 2).onChange(() => {
			if (meshRef.current)
				meshRef.current.rotation.z = guiControls.rotationZ;
		});
		gui.add(guiControls, "scaleX", 0.1, 5).onChange(() => {
			if (meshRef.current) meshRef.current.scale.x = guiControls.scaleX;
		});
		gui.add(guiControls, "scaleY", 0.1, 5).onChange(() => {
			if (meshRef.current) meshRef.current.scale.y = guiControls.scaleY;
		});
		gui.add(guiControls, "scaleZ", 0.1, 5).onChange(() => {
			if (meshRef.current) meshRef.current.scale.z = guiControls.scaleZ;
		});
		gui.add(guiControls, "wireframe").onChange(guiControls.updateWireframe);

		return () => {
			mountRef.current?.removeChild(renderer.domElement);
			gui.destroy();
			renderer.domElement.removeEventListener("click", addPoint);
		};
	}, [is3D]);

	useEffect(() => {
		if (sceneRef.current) {
			if (!is3D) {
				updatePoints(sceneRef.current);
			} else {
				createShape(sceneRef.current);
			}
		}
	}, [points, is3D]);

	const handleGenerateShape = () => {
		setIs3D(true);
	};

	return (
		<div>
			<div ref={mountRef} style={{ width: "100%", height: "100vh" }} />
			<div
				style={{
					position: "absolute",
					top: 10,
					left: 10,
					zIndex: 1,
					display: "flex",
					gap: 12,
				}}
			>
				<Link to={"/"}>Home</Link>
				<button onClick={handleGenerateShape}>Generate Shape</button>
				<label>
					Step:
					<input
						type="number"
						value={step}
						onChange={(e) => setStep(parseFloat(e.target.value))}
						step="0.01"
					/>
				</label>
				<label>
					Show Wireframe:
					<input
						type="checkbox"
						checked={showWireframe}
						onChange={(e) => setShowWireframe(!showWireframe)}
					/>
				</label>
			</div>
		</div>
	);
};

export default ThreeScene;
