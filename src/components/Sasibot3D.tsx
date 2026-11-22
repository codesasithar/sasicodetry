import { useEffect, useRef, type RefObject } from "react";
import type * as THREE from "three";

type ThreeRuntime = typeof import("three");
type Vec3 = readonly [number, number, number];

interface Sasibot3DProps {
  buttonRef: RefObject<HTMLButtonElement>;
  onReady: (ready: boolean) => void;
}

interface RobotModel {
  root: THREE.Group;
  body: THREE.Group;
  head: THREE.Group;
  pupils: Array<{ group: THREE.Group; side: number }>;
}

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

const createRobotModel = (THREE: ThreeRuntime): RobotModel => {
  const root = new THREE.Group();
  const body = new THREE.Group();
  root.add(body);

  const greenShell = new THREE.MeshPhysicalMaterial({
    color: 0x748b91,
    metalness: 0.18,
    roughness: 0.24,
    clearcoat: 0.95,
    clearcoatRoughness: 0.16,
  });
  const lightShell = new THREE.MeshPhysicalMaterial({
    color: 0xc1d1cf,
    metalness: 0.16,
    roughness: 0.2,
    clearcoat: 1,
    clearcoatRoughness: 0.13,
  });
  const trim = new THREE.MeshPhysicalMaterial({
    color: 0x3282b8,
    metalness: 0.38,
    roughness: 0.22,
    clearcoat: 0.8,
    emissive: 0x0f4c75,
  });
  const seam = new THREE.MeshStandardMaterial({ color: 0x636467, metalness: 0.16, roughness: 0.4 });
  const eyeWhite = new THREE.MeshPhysicalMaterial({ color: 0xbbe1fa, roughness: 0.16, clearcoat: 1 });
  const pupilMaterial = new THREE.MeshStandardMaterial({ color: 0x18262c, metalness: 0.28, roughness: 0.16 });
  const iris = new THREE.MeshStandardMaterial({ color: 0x3282b8, metalness: 0.2, roughness: 0.18, emissive: 0x0f4c75 });
  const sphereGeometry = new THREE.SphereGeometry(1, 56, 40);

  const sphere = (parent: THREE.Group, material: THREE.Material, position: Vec3, scale: Vec3) => {
    const mesh = new THREE.Mesh(sphereGeometry, material);
    mesh.position.set(...position);
    mesh.scale.set(...scale);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    parent.add(mesh);
    return mesh;
  };
  const capsule = (parent: THREE.Group, material: THREE.Material, start: Vec3, end: Vec3, radius: number) => {
    const from = new THREE.Vector3(...start);
    const to = new THREE.Vector3(...end);
    const direction = to.clone().sub(from);
    const mesh = new THREE.Mesh(
      new THREE.CapsuleGeometry(radius, Math.max(direction.length() - radius * 2, 0.01), 8, 32),
      material,
    );
    mesh.position.copy(from).add(to).multiplyScalar(0.5);
    mesh.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), direction.normalize());
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    parent.add(mesh);
    return mesh;
  };

  // A simple rounded body gives Sasibot the friendly Android-inspired silhouette.
  const torso = new THREE.Mesh(new THREE.CapsuleGeometry(0.54, 0.78, 10, 48), greenShell);
  torso.position.set(0, 1.57, 0);
  torso.scale.z = 0.9;
  torso.castShadow = true;
  torso.receiveShadow = true;
  body.add(torso);

  // Low-profile collar ring separates the head from the body while keeping the join soft.
  const collar = new THREE.Mesh(new THREE.TorusGeometry(0.51, 0.035, 16, 64), seam);
  collar.rotation.x = Math.PI / 2;
  collar.scale.set(1, 0.82, 1);
  collar.position.set(0, 2.42, 0);
  body.add(collar);
  const collarGlow = new THREE.Mesh(new THREE.TorusGeometry(0.5, 0.012, 12, 64), trim);
  collarGlow.rotation.x = Math.PI / 2;
  collarGlow.scale.set(1, 0.82, 1);
  collarGlow.position.set(0, 2.45, 0);
  body.add(collarGlow);

  // Smooth capsule arms and short legs stay close to the compact mascot reference.
  for (const side of [-1, 1]) {
    capsule(body, greenShell, [side * 0.52, 2.12, 0], [side * 0.9, 1.16, 0], 0.18);
    sphere(body, lightShell, [side * 0.91, 1.1, 0.02], [0.18, 0.17, 0.16]);
    sphere(body, trim, [side * 0.91, 1.1, 0.16], [0.045, 0.045, 0.016]);

    capsule(body, greenShell, [side * 0.22, 0.8, 0], [side * 0.24, 0.28, 0], 0.14);
    sphere(body, lightShell, [side * 0.25, 0.2, 0.12], [0.17, 0.12, 0.28]);
    sphere(body, seam, [side * 0.24, 0.28, 0.035], [0.145, 0.09, 0.14]);
    sphere(body, trim, [side * 0.24, 0.25, 0.37], [0.07, 0.025, 0.018]);
  }

  // A soft, elliptical contact shadow grounds the floating mascot on transparent pages.
  const shadow = new THREE.Mesh(
    new THREE.CircleGeometry(0.72, 64),
    new THREE.MeshBasicMaterial({ color: 0x171f22, transparent: true, opacity: 0.26, depthWrite: false }),
  );
  shadow.rotation.x = -Math.PI / 2;
  shadow.scale.set(1, 0.4, 1);
  shadow.position.set(0, 0.035, 0);
  root.add(shadow);

  // The dome is a true hemispherical shell, with a narrow seam under the cheek line.
  const head = new THREE.Group();
  head.position.y = 2.43;
  body.add(head);
  const domeGeometry = new THREE.SphereGeometry(1, 64, 48, 0, Math.PI * 2, 0, Math.PI / 2);
  const dome = new THREE.Mesh(domeGeometry, lightShell);
  dome.scale.set(0.58, 0.63, 0.5);
  dome.position.y = 0.02;
  dome.castShadow = true;
  dome.receiveShadow = true;
  head.add(dome);
  const lowerHead = new THREE.Mesh(new THREE.CylinderGeometry(0.58, 0.58, 0.045, 64), greenShell);
  lowerHead.scale.z = 0.87;
  lowerHead.position.y = -0.005;
  head.add(lowerHead);
  const headSeam = new THREE.Mesh(new THREE.TorusGeometry(0.57, 0.018, 12, 64), seam);
  headSeam.rotation.x = Math.PI / 2;
  headSeam.scale.set(1, 0.87, 1);
  headSeam.position.y = 0.01;
  head.add(headSeam);

  // Two short antennae and softly inset bright eyes make the expression easy to read.
  const pupils: RobotModel["pupils"] = [];
  for (const side of [-1, 1]) {
    capsule(head, greenShell, [side * 0.28, 0.51, 0], [side * 0.38, 0.88, 0], 0.035);
    sphere(head, trim, [side * 0.38, 0.88, 0], [0.043, 0.043, 0.043]);

    const eyeX = side * 0.205;
    sphere(head, seam, [eyeX, 0.31, 0.367], [0.108, 0.12, 0.045]);
    sphere(head, eyeWhite, [eyeX, 0.315, 0.394], [0.082, 0.092, 0.04]);
    const pupil = new THREE.Group();
    pupil.position.set(eyeX, 0.315, 0.426);
    sphere(pupil, iris, [0, 0, 0], [0.042, 0.048, 0.02]);
    sphere(pupil, pupilMaterial, [0, 0, 0.014], [0.025, 0.032, 0.014]);
    sphere(pupil, eyeWhite, [-0.012, 0.015, 0.027], [0.009, 0.01, 0.005]);
    head.add(pupil);
    pupils.push({ group: pupil, side });
  }

  // One small cyan status light gives the otherwise clean body a Sasibot signature.
  sphere(body, seam, [0, 1.72, 0.386], [0.09, 0.09, 0.025]);
  sphere(body, trim, [0, 1.72, 0.408], [0.045, 0.045, 0.015]);

  return { root, body, head, pupils };
};
const Sasibot3D = ({ buttonRef, onReady }: Sasibot3DProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    let disposed = false;
    let animationFrame = 0;
    let renderer: THREE.WebGLRenderer | null = null;
    let scene: THREE.Scene | null = null;
    let threeRuntime: ThreeRuntime | null = null;
    let resizeObserver: ResizeObserver | null = null;
    let removeInputListeners: (() => void) | undefined;
    let resumeAnimation: (() => void) | undefined;
    const desktopPointer = window.matchMedia("(min-width: 768px) and (hover: hover) and (pointer: fine)");
    const idleWindow = window as Window & {
      requestIdleCallback?: (callback: () => void, options?: { timeout: number }) => number;
      cancelIdleCallback?: (handle: number) => void;
    };
    let idleHandle: number | undefined;
    let fallbackTimer: number | undefined;
    const button = buttonRef.current;
    let pointerX = window.innerWidth / 2;
    let pointerY = window.innerHeight / 2;
    let hovering = false;

    const initialize = async () => {
      if (!desktopPointer.matches) return;
      try {
        const THREE = await import("three");
        if (disposed || !desktopPointer.matches || !canvasRef.current || !button) return;
        threeRuntime = THREE;

        const canvas = canvasRef.current;
        renderer = new THREE.WebGLRenderer({
          canvas,
          alpha: true,
          antialias: true,
          powerPreference: "low-power",
        });
        renderer.setClearColor(0x000000, 0);
        renderer.outputColorSpace = THREE.SRGBColorSpace;
        renderer.toneMapping = THREE.ACESFilmicToneMapping;
        renderer.toneMappingExposure = 1.1;

        scene = new THREE.Scene();
        scene.add(new THREE.HemisphereLight(0xc1d1cf, 0x171f22, 2.1));
        const keyLight = new THREE.DirectionalLight(0xbbe1fa, 3.2);
        keyLight.position.set(-3.5, 5, 5);
        scene.add(keyLight);
        const coolRim = new THREE.DirectionalLight(0x3282b8, 2.8);
        coolRim.position.set(3.5, 3, -3);
        scene.add(coolRim);
        const warmFill = new THREE.DirectionalLight(0x748b91, 1.25);
        warmFill.position.set(-4, 1, 2);
        scene.add(warmFill);

        const camera = new THREE.PerspectiveCamera(27, 9 / 16, 0.1, 40);
        camera.position.set(0, 2.05, 8.6);
        camera.lookAt(0, 2.05, 0);

        const model = createRobotModel(THREE);
        scene.add(model.root);

        const resize = () => {
          if (!renderer || !canvasRef.current) return;
          const { width, height } = canvasRef.current.getBoundingClientRect();
          if (width <= 0 || height <= 0) return;
          renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
          renderer.setSize(width, height, false);
          camera.aspect = width / height;
          camera.updateProjectionMatrix();
        };

        resizeObserver = new ResizeObserver(resize);
        resizeObserver.observe(canvas);
        window.addEventListener("resize", resize);
        resize();

        const updatePointer = (event: PointerEvent) => {
          pointerX = event.clientX;
          pointerY = event.clientY;
        };
        const updateTouch = (event: TouchEvent) => {
          const touch = event.touches[0] ?? event.changedTouches[0];
          if (!touch) return;
          pointerX = touch.clientX;
          pointerY = touch.clientY;
        };
        const onEnter = (event: PointerEvent) => {
          if (event.pointerType !== "mouse") return;
          hovering = true;
          updatePointer(event);
        };
        const onLeave = (event: PointerEvent) => {
          if (event.pointerType === "mouse") hovering = false;
        };
        window.addEventListener("pointermove", updatePointer, { passive: true });
        window.addEventListener("pointerdown", updatePointer, { passive: true });
        window.addEventListener("touchstart", updateTouch, { passive: true });
        window.addEventListener("touchmove", updateTouch, { passive: true });
        window.addEventListener("touchend", updateTouch, { passive: true });
        button.addEventListener("pointerenter", onEnter);
        button.addEventListener("pointerleave", onLeave);
        removeInputListeners = () => {
          window.removeEventListener("resize", resize);
          window.removeEventListener("pointermove", updatePointer);
          window.removeEventListener("pointerdown", updatePointer);
          window.removeEventListener("touchstart", updateTouch);
          window.removeEventListener("touchmove", updateTouch);
          window.removeEventListener("touchend", updateTouch);
          button.removeEventListener("pointerenter", onEnter);
          button.removeEventListener("pointerleave", onLeave);
        };

        const clock = new THREE.Clock();
        const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        const animate = () => {
          if (!renderer || !scene || disposed || !desktopPointer.matches || document.hidden) {
            animationFrame = 0;
            return;
          }
          animationFrame = window.requestAnimationFrame(animate);
          const delta = Math.min(clock.getDelta(), 0.05);
          const bounds = button.getBoundingClientRect();
          const centerX = bounds.left + bounds.width / 2;
          const eyeLineY = bounds.top + bounds.height * 0.12;
          const horizontalDepth = Math.max(bounds.width * 2.3, window.innerWidth * 0.08);
          const verticalDepth = Math.max(bounds.height * 0.9, window.innerHeight * 0.08);
          const lookYaw = clamp(Math.atan2(pointerX - centerX, horizontalDepth), -0.68, 0.68);
          const lookPitch = clamp(Math.atan2(pointerY - eyeLineY, verticalDepth), -0.5, 0.5);
          const smooth = reducedMotion ? 1 : 1 - Math.exp(-8 * delta);

          // Share the target angle across the torso and neck so the face stays locked on the pointer.
          const bodyYaw = lookYaw * 0.28;
          const bodyPitch = lookPitch * 0.18;
          const headYaw = lookYaw - bodyYaw;
          const headPitch = lookPitch - bodyPitch;
          model.body.rotation.y += (bodyYaw - model.body.rotation.y) * smooth;
          model.body.rotation.x += (bodyPitch - model.body.rotation.x) * smooth;
          model.head.rotation.y += (headYaw - model.head.rotation.y) * smooth;
          model.head.rotation.x += (headPitch - model.head.rotation.x) * smooth;
          model.root.scale.setScalar(model.root.scale.x + ((hovering ? 1.045 : 1) - model.root.scale.x) * smooth);

          for (const { group, side } of model.pupils) {
            group.position.x += (side * 0.205 + (lookYaw / 0.68) * 0.02 - group.position.x) * smooth;
            group.position.y += (0.315 - (lookPitch / 0.5) * 0.018 - group.position.y) * smooth;
          }

          renderer.render(scene, camera);
        };

        resumeAnimation = () => {
          if (animationFrame || !desktopPointer.matches || document.hidden) return;
          animationFrame = window.requestAnimationFrame(animate);
        };
        renderer.render(scene, camera);
        onReady(true);
        resumeAnimation();

      } catch {
        // Keep the existing portrait visible if WebGL is unavailable on the device.
      }
    };

    const cancelPendingInitialization = () => {
      if (idleHandle !== undefined) idleWindow.cancelIdleCallback?.(idleHandle);
      if (fallbackTimer !== undefined) window.clearTimeout(fallbackTimer);
      idleHandle = undefined;
      fallbackTimer = undefined;
    };
    const scheduleInitialization = () => {
      cancelPendingInitialization();
      if (!desktopPointer.matches) {
        if (animationFrame) window.cancelAnimationFrame(animationFrame);
        animationFrame = 0;
        onReady(false);
        return;
      }
      if (renderer && scene) {
        onReady(true);
        resumeAnimation?.();
        return;
      }
      if (idleWindow.requestIdleCallback) {
        idleHandle = idleWindow.requestIdleCallback(() => {
          idleHandle = undefined;
          void initialize();
        }, { timeout: 2000 });
      } else {
        fallbackTimer = window.setTimeout(() => {
          fallbackTimer = undefined;
          void initialize();
        }, 800);
      }
    };
    const handleVisibilityChange = () => {
      if (document.hidden) {
        if (animationFrame) window.cancelAnimationFrame(animationFrame);
        animationFrame = 0;
      } else {
        resumeAnimation?.();
      }
    };

    desktopPointer.addEventListener("change", scheduleInitialization);
    document.addEventListener("visibilitychange", handleVisibilityChange);
    scheduleInitialization();

    return () => {
      disposed = true;
      desktopPointer.removeEventListener("change", scheduleInitialization);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      cancelPendingInitialization();
      if (animationFrame) window.cancelAnimationFrame(animationFrame);
      resizeObserver?.disconnect();
      removeInputListeners?.();
      if (scene && threeRuntime) {
        const geometries = new Set<THREE.BufferGeometry>();
        const materials = new Set<THREE.Material>();
        scene.traverse((object) => {
          if (!(object instanceof threeRuntime!.Mesh)) return;
          geometries.add(object.geometry);
          const objectMaterials = Array.isArray(object.material) ? object.material : [object.material];
          objectMaterials.forEach((material) => materials.add(material));
        });
        geometries.forEach((geometry) => geometry.dispose());
        materials.forEach((material) => material.dispose());
      }
      renderer?.dispose();
    };
  }, [buttonRef, onReady]);

  return <canvas ref={canvasRef} className="scroll-robot-canvas" aria-hidden="true" />;
};

export default Sasibot3D;
