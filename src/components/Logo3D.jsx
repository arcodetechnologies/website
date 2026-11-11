import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';

/** ARCODE isotype as extruded solids. Self-contained: owns its renderer, loop and cleanup. */
function build() {
  const mat = (color, emissive, glow) =>
    new THREE.MeshPhysicalMaterial({ color, emissive, emissiveIntensity: glow, metalness: 0.15, roughness: 0.22, clearcoat: 1, clearcoatRoughness: 0.1, envMapIntensity: 0.45 });
  const front = mat(0x0a6cff, 0x0540ff, 0.3);
  const cyan = mat(0x00c4f0, 0x00a8e8, 0.35);
  const side = mat(0x0a38c8, 0x0628a0, 0.3);

  const solid = (pts, material, depth) => {
    const shape = new THREE.Shape();
    shape.moveTo(...pts[0]);
    pts.slice(1).forEach((p) => shape.lineTo(...p));
    shape.closePath();
    const geo = new THREE.ExtrudeGeometry(shape, {
      depth, bevelEnabled: true, bevelSegments: 5, bevelSize: 0.055, bevelThickness: 0.055, curveSegments: 8,
    });
    geo.computeVertexNormals();
    return new THREE.Mesh(geo, [side, material]);
  };

  const group = new THREE.Group();
  group.add(
    solid([[-3.35, -2.45], [-0.72, 2.45], [-0.48, 2.45], [0.05, 1.58], [-2.15, -2.45]], cyan, 0.72),
    solid([[-0.72, 2.45], [-0.05, 1.58], [1.18, -0.25], [0.48, -1.18]], front, 0.72),
    solid([[-1.52, -1.95], [-0.66, -0.72], [0.22, -1.95]], cyan, 0.55),
    solid([[1.02, 1.05], [1.75, 1.05], [2.72, -0.35], [1.68, -2.45], [0.96, -2.45], [2.02, -0.35]], front, 0.72)
  );
  // Center the solid so it spins around its own axis.
  const box = new THREE.Box3().setFromObject(group);
  group.children.forEach((m) => m.position.sub(box.getCenter(new THREE.Vector3())));
  group.rotation.x = -0.08;
  return group;
}

export default function Logo3D() {
  const hostRef = useRef(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const host = hostRef.current;
    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    } catch {
      setFailed(true);
      return undefined;
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;
    renderer.domElement.style.cssText = 'display:block;width:100%;height:100%';
    host.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const pmrem = new THREE.PMREMGenerator(renderer);
    scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
    const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100);
    camera.position.set(0, 0.3, 11);
    scene.add(new THREE.HemisphereLight(0xffffff, 0x263d77, 2.2));
    const key = new THREE.DirectionalLight(0xffffff, 3.5); key.position.set(-4, 6, 8);
    const rim = new THREE.DirectionalLight(0x00cfff, 2.8); rim.position.set(5, 2, -4);
    const blue = new THREE.PointLight(0x075cff, 35, 18); blue.position.set(3, -2, 5);
    const aqua = new THREE.PointLight(0x00d9f5, 28, 18); aqua.position.set(-4, 2, 3);
    scene.add(key, rim, blue, aqua);

    const logo = build();
    logo.rotation.y = -0.5;
    scene.add(logo);

    const resize = () => {
      const { clientWidth: w, clientHeight: h } = host;
      if (!w || !h) return;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    const ro = new ResizeObserver(() => { resize(); renderer.render(scene, camera); });
    ro.observe(host);
    resize();

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let frame = 0, visible = true, last = performance.now(), t = 0;
    const tick = (now) => {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now; t += dt;
      logo.rotation.y += dt * 0.7;
      logo.position.y = Math.sin(t * 1.2) * 0.12;
      renderer.render(scene, camera);
      frame = requestAnimationFrame(tick);
    };
    const start = () => { if (!frame && !reduced && visible && !document.hidden) { last = performance.now(); frame = requestAnimationFrame(tick); } };
    const stop = () => { cancelAnimationFrame(frame); frame = 0; };

    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; visible ? start() : stop(); });
    io.observe(host);
    const onVis = () => (document.hidden ? stop() : start());
    document.addEventListener('visibilitychange', onVis);
    renderer.render(scene, camera);
    start();

    return () => {
      stop(); io.disconnect(); ro.disconnect();
      document.removeEventListener('visibilitychange', onVis);
      logo.traverse((o) => { if (o.isMesh) { o.geometry.dispose(); } });
      pmrem.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);

  return failed ? (
    <img className="logo3d-fallback" src="/images/ARCODE_logo_solo.png" alt="" />
  ) : (
    <div ref={hostRef} className="logo3d" aria-hidden="true" />
  );
}
