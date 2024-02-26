import { FC, useEffect, useRef } from 'react';
import {
  AdditiveBlending,
  BufferAttribute,
  BufferGeometry,
  Clock,
  Color,
  PerspectiveCamera,
  Points,
  PointsMaterial,
  Scene,
  WebGLRenderer,
} from 'three';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

import GUI from 'lil-gui';

const Galaxy: FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const gui = new GUI();
    gui.domElement.style.marginTop = '2.75rem';
    const canvas = canvasRef.current!;
    const scene = new Scene();

    const parameters = {
      count: 20000,
      size: 0.001,
      radius: 5,
      branches: 3,
      spin: 1,
      tilt: 0,
      randomness: 0.2,
      randomnessPower: 3,
      insideColor: '#b3d1ff',
      outsideColor: '#1b3984',
      rotationSpeed: 0.25,
      centerRadius: 1,
    };

    let geometry: BufferGeometry | null = null;
    let material: PointsMaterial | null = null;
    let points: Points | null = null;

    const generateGalaxy = () => {
      const positions = new Float32Array(parameters.count * 3);
      const colors = new Float32Array(parameters.count * 3);

      const colorInside = new Color(parameters.insideColor);
      const colorOutside = new Color(parameters.outsideColor);

      for (let i = 0; i < parameters.count * 3; i += 1) {
        const radius = Math.random() * parameters.radius;
        const spinAngle = radius * parameters.spin;
        const i3 = i * 3;

        const branchAngle =
          ((i % parameters.branches) / parameters.branches) * Math.PI * 2;

        const randomX =
          Math.random() ** parameters.randomnessPower * (Math.random() < 0.5 ? 1 : -1);
        const randomY =
          Math.random() ** parameters.randomnessPower * (Math.random() < 0.5 ? 1 : -1);
        const randomZ =
          Math.random() ** parameters.randomnessPower * (Math.random() < 0.5 ? 1 : -1);

        positions[i3] = Math.cos(branchAngle + spinAngle) * radius + randomX;
        positions[i3 + 1] = randomY;
        positions[i3 + 2] = Math.sin(branchAngle + spinAngle) * radius + randomZ;

        const mixedColor = colorInside.clone();
        mixedColor.lerp(colorOutside, radius / parameters.radius);
        colors[i3] = mixedColor.r;
        colors[i3 + 1] = mixedColor.g;
        colors[i3 + 2] = mixedColor.b;
      }

      if (points && geometry && material) {
        geometry.dispose();
        material.dispose();
        scene.remove(points);
      }

      geometry = new BufferGeometry();
      geometry.setAttribute('position', new BufferAttribute(positions, 3));
      geometry.setAttribute('color', new BufferAttribute(colors, 3));

      material = new PointsMaterial({
        size: parameters.size,
        sizeAttenuation: true,
        depthWrite: false,
        blending: AdditiveBlending,
        vertexColors: true,
      });

      points = new Points(geometry, material);

      scene.add(points);
    };

    generateGalaxy();

    const sizes = {
      width: window.innerWidth,
      height: window.innerHeight,
    };

    const camera = new PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100);
    camera.position.x = 3;
    camera.position.y = 3;
    camera.position.z = 3;
    scene.add(camera);

    const controls = new OrbitControls(camera, canvas);
    controls.enableDamping = true;

    const renderer = new WebGLRenderer({ canvas });
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const clock = new Clock();

    const animate = () => {
      if (!points || !geometry || !material) return;

      const elapsedTime = clock.getElapsedTime();

      points.rotation.y = elapsedTime * parameters.rotationSpeed * 0.1;
      points.rotation.x = parameters.tilt;

      controls.update();
      renderer.render(scene, camera);
      window.requestAnimationFrame(animate);
    };

    const onResize = () => {
      sizes.width = window.innerWidth;
      sizes.height = window.innerHeight;

      camera.aspect = sizes.width / sizes.height;
      camera.updateProjectionMatrix();

      renderer.setSize(sizes.width, sizes.height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    };

    window.addEventListener('resize', onResize);

    animate();

    gui
      .add(parameters, 'count')
      .min(100)
      .max(100000)
      .step(100)
      .onFinishChange(generateGalaxy);

    gui
      .add(parameters, 'size')
      .min(0.0001)
      .max(0.1)
      .step(0.0001)
      .onFinishChange(generateGalaxy);

    gui
      .add(parameters, 'radius')
      .min(0.01)
      .max(20)
      .step(0.01)
      .onFinishChange(generateGalaxy);

    gui.add(parameters, 'branches').min(2).max(20).step(1).onFinishChange(generateGalaxy);

    gui.add(parameters, 'spin').min(-5).max(5).step(0.001).onFinishChange(generateGalaxy);

    gui
      .add(parameters, 'randomness')
      .min(0)
      .max(2)
      .step(0.001)
      .onFinishChange(generateGalaxy);

    gui
      .add(parameters, 'randomnessPower')
      .min(1)
      .max(10)
      .step(0.001)
      .onFinishChange(generateGalaxy);

    gui
      .add(parameters, 'rotationSpeed')
      .min(0)
      .max(1)
      .step(0.001)
      .onFinishChange(generateGalaxy);

    gui
      .add(parameters, 'tilt')
      .min((Math.PI / 2) * -1)
      .max(Math.PI / 2)
      .step(0.001)
      .onFinishChange(generateGalaxy);

    gui
      .add(parameters, 'centerRadius')
      .min(0)
      .max(10)
      .step(0.01)
      .onFinishChange(generateGalaxy);

    gui.addColor(parameters, 'insideColor').onFinishChange(generateGalaxy);
    gui.addColor(parameters, 'outsideColor').onFinishChange(generateGalaxy);

    return () => {
      window.removeEventListener('resize', onResize);
      gui.destroy();
    };
  });

  return (
    <canvas ref={canvasRef}>Your browser does not support the HTML5 canvas tag.</canvas>
  );
};
export default Galaxy;
