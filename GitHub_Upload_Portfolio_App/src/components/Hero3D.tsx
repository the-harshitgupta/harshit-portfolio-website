"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function Hero3D() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced || window.innerWidth < 760) return;

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      55,
      window.innerWidth / window.innerHeight,
      0.1,
      100
    );
    camera.position.z = 14;

    const size = () => {
      renderer.setSize(window.innerWidth, window.innerHeight);
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
    };
    size();
    window.addEventListener("resize", size);

    const group = new THREE.Group();
    scene.add(group);

    const mats = [
      new THREE.MeshBasicMaterial({
        color: 0x0a8f96,
        wireframe: true,
        transparent: true,
        opacity: 0.34,
      }),
      new THREE.MeshBasicMaterial({
        color: 0x112d68,
        wireframe: true,
        transparent: true,
        opacity: 0.22,
      }),
      new THREE.MeshBasicMaterial({
        color: 0xd79a2d,
        wireframe: true,
        transparent: true,
        opacity: 0.3,
      }),
    ];
    const geos = [
      new THREE.IcosahedronGeometry(2.1, 1),
      new THREE.TorusGeometry(1.6, 0.5, 12, 32),
      new THREE.OctahedronGeometry(1.7, 0),
      new THREE.DodecahedronGeometry(1.8, 0),
    ];
    const positions = [
      [-7, 3, -2],
      [7, -2, -1],
      [5, 4, -4],
      [-6, -3, -3],
      [0, 5, -6],
    ];
    const shapes: THREE.Mesh[] = [];
    positions.forEach((p, i) => {
      const m = new THREE.Mesh(geos[i % geos.length], mats[i % mats.length]);
      m.position.set(p[0], p[1], p[2]);
      m.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, 0);
      (m.userData as { sp: number }).sp = 0.0015 + Math.random() * 0.0025;
      group.add(m);
      shapes.push(m);
    });

    const pCount = 140;
    const pGeo = new THREE.BufferGeometry();
    const arr = new Float32Array(pCount * 3);
    for (let i = 0; i < pCount * 3; i++) arr[i] = (Math.random() - 0.5) * 26;
    pGeo.setAttribute("position", new THREE.BufferAttribute(arr, 3));
    const pMat = new THREE.PointsMaterial({
      color: 0x0a8f96,
      size: 0.06,
      transparent: true,
      opacity: 0.55,
    });
    const points = new THREE.Points(pGeo, pMat);
    scene.add(points);

    let mx = 0,
      my = 0,
      tx = 0,
      ty = 0;
    const onMove = (e: MouseEvent) => {
      tx = e.clientX / window.innerWidth - 0.5;
      ty = e.clientY / window.innerHeight - 0.5;
    };
    window.addEventListener("mousemove", onMove);

    let raf = 0;
    const animate = () => {
      raf = requestAnimationFrame(animate);
      mx += (tx - mx) * 0.05;
      my += (ty - my) * 0.05;
      shapes.forEach((s) => {
        const sp = (s.userData as { sp: number }).sp;
        s.rotation.x += sp;
        s.rotation.y += sp;
      });
      group.rotation.y = mx * 0.4;
      group.rotation.x = my * 0.3;
      points.rotation.y += 0.0006;
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", size);
      window.removeEventListener("mousemove", onMove);
      geos.forEach((g) => g.dispose());
      mats.forEach((m) => m.dispose());
      pGeo.dispose();
      pMat.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 z-0"
      aria-hidden="true"
    />
  );
}
