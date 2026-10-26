import { useEffect, useRef, type RefObject } from "react";
import type * as THREE from "three";

type ThreeRuntime = typeof import("three");
type Vec3 = readonly [number, number, number];

interface Sasibot3DProps {
  buttonRef: RefObject<HTMLButtonElement>;
  onReady: () => void;
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

  const shell = new THREE.MeshStandardMaterial({ color: 0xd9e3e9, metalness: 0.62, roughness: 0.28 });
  const brightShell = new THREE.MeshStandardMaterial({ color: 0xf0f5f8, metalness: 0.48, roughness: 0.24 });
  const shadowShell = new THREE.MeshStandardMaterial({ color: 0x73818c, metalness: 0.68, roughness: 0.3 });
  const joint = new THREE.MeshStandardMaterial({ color: 0x18232c, metalness: 0.72, roughness: 0.3 });
  const jointEdge = new THREE.MeshStandardMaterial({ color: 0x42535f, metalness: 0.82, roughness: 0.24 });
  const blue = new THREE.MeshStandardMaterial({
    color: 0x32cfff,
    emissive: 0x078bc5,
    emissiveIntensity: 1.5,
    metalness: 0.2,
    roughness: 0.22,
  });
  const darkBlue = new THREE.MeshStandardMaterial({ color: 0x075071, metalness: 0.65, roughness: 0.25 });

  const sphereGeometry = new THREE.SphereGeometry(1, 20, 16);
  const boxGeometry = new THREE.BoxGeometry(1, 1, 1);

  const sphere = (parent: THREE.Group, material: THREE.Material, position: Vec3, scale: Vec3) => {
    const mesh = new THREE.Mesh(sphereGeometry, material);
    mesh.position.set(...position);
    mesh.scale.set(...scale);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    parent.add(mesh);
    return mesh;
  };

  const box = (parent: THREE.Group, material: THREE.Material, position: Vec3, scale: Vec3, rotationZ = 0) => {
    const mesh = new THREE.Mesh(boxGeometry, material);
    mesh.position.set(...position);
    mesh.scale.set(...scale);
    mesh.rotation.z = rotationZ;
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    parent.add(mesh);
    return mesh;
  };

  const segment = (parent: THREE.Group, material: THREE.Material, start: Vec3, end: Vec3, radius: number, endRadius = radius) => {
    const from = new THREE.Vector3(...start);
    const to = new THREE.Vector3(...end);
    const direction = to.clone().sub(from);
    const mesh = new THREE.Mesh(
      new THREE.CylinderGeometry(endRadius, radius, direction.length(), 14),
      material,
    );
    mesh.position.copy(from).add(to).multiplyScalar(0.5);
    mesh.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), direction.normalize());
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    parent.add(mesh);
    return mesh;
  };

  // Torso and layered chest armor.
  sphere(body, joint, [0, 2.1, 0], [0.47, 0.68, 0.31]);
  sphere(body, shell, [0, 2.34, 0.02], [0.53, 0.55, 0.32]);
  sphere(body, brightShell, [-0.22, 2.45, 0.19], [0.31, 0.37, 0.2]);
  sphere(body, brightShell, [0.22, 2.45, 0.19], [0.31, 0.37, 0.2]);
  box(body, shadowShell, [0, 2.08, 0.28], [0.055, 0.4, 0.035]);
  sphere(body, blue, [0, 2.2, 0.315], [0.047, 0.047, 0.025]);
  sphere(body, darkBlue, [0, 1.72, 0.05], [0.4, 0.25, 0.28]);
  sphere(body, shell, [0, 1.65, 0.13], [0.36, 0.21, 0.28]);
  box(body, jointEdge, [0, 1.43, 0], [0.62, 0.16, 0.38]);

  // Neck pistons meet the head at its natural turning point.
  segment(body, joint, [0, 2.75, 0], [0, 3.12, 0], 0.14, 0.11);
  for (const side of [-1, 1]) {
    segment(body, jointEdge, [side * 0.13, 2.78, 0.02], [side * 0.13, 3.1, 0.02], 0.035, 0.025);
    sphere(body, blue, [side * 0.13, 2.95, 0.04], [0.035, 0.035, 0.035]);
  }

  // Mirrored arms with matching shoulder, elbow, forearm, and hand geometry.
  for (const side of [-1, 1]) {
    sphere(body, joint, [side * 0.57, 2.63, 0], [0.27, 0.3, 0.26]);
    sphere(body, shell, [side * 0.61, 2.65, 0.08], [0.25, 0.27, 0.25]);
    sphere(body, blue, [side * 0.6, 2.65, 0.29], [0.045, 0.045, 0.025]);

    segment(body, joint, [side * 0.68, 2.47, 0], [side * 0.77, 2.02, 0.015], 0.15, 0.13);
    sphere(body, brightShell, [side * 0.72, 2.28, 0.03], [0.19, 0.31, 0.19]);
    sphere(body, jointEdge, [side * 0.78, 1.98, 0.02], [0.16, 0.16, 0.16]);
    sphere(body, shell, [side * 0.78, 1.98, 0.15], [0.11, 0.11, 0.035]);

    segment(body, joint, [side * 0.78, 1.91, 0.01], [side * 0.82, 1.35, 0.04], 0.13, 0.11);
    sphere(body, shell, [side * 0.81, 1.62, 0.06], [0.18, 0.32, 0.19]);
    box(body, jointEdge, [side * 0.82, 1.36, 0.04], [0.22, 0.09, 0.22]);
    sphere(body, joint, [side * 0.82, 1.17, 0.05], [0.13, 0.16, 0.12]);
    sphere(body, shell, [side * 0.82, 1.11, 0.15], [0.13, 0.15, 0.1]);

    for (const fingerOffset of [-0.075, -0.025, 0.025, 0.075]) {
      const fingerX = side * 0.82 + fingerOffset;
      segment(body, jointEdge, [fingerX, 1.04, 0.12], [fingerX, 0.88, 0.14], 0.022, 0.016);
      sphere(body, shell, [fingerX, 0.88, 0.14], [0.025, 0.035, 0.028]);
    }
    segment(body, jointEdge, [side * 0.92, 1.15, 0.12], [side * 0.99, 1.01, 0.14], 0.03, 0.022);
  }

  // Mirrored legs, with visible mechanical joints and armored shins.
  for (const side of [-1, 1]) {
    const hipX = side * 0.22;
    sphere(body, joint, [hipX, 1.42, 0], [0.19, 0.2, 0.18]);
    segment(body, joint, [hipX, 1.38, 0], [side * 0.25, 0.77, 0], 0.16, 0.14);
    sphere(body, shell, [side * 0.24, 1.05, 0.02], [0.22, 0.39, 0.22]);
    sphere(body, jointEdge, [side * 0.25, 0.73, 0.02], [0.17, 0.16, 0.17]);
    sphere(body, shell, [side * 0.25, 0.73, 0.15], [0.12, 0.12, 0.045]);
    sphere(body, blue, [side * 0.25, 0.73, 0.19], [0.035, 0.035, 0.02]);

    segment(body, joint, [side * 0.25, 0.67, 0], [side * 0.27, 0.18, 0.01], 0.13, 0.12);
    sphere(body, brightShell, [side * 0.26, 0.43, 0.06], [0.19, 0.31, 0.2]);
    sphere(body, jointEdge, [side * 0.27, 0.16, 0], [0.15, 0.13, 0.16]);
    box(body, shell, [side * 0.27, 0.08, 0.13], [0.3, 0.16, 0.43]);
    box(body, brightShell, [side * 0.27, 0.13, 0.3], [0.26, 0.07, 0.16]);
  }

  // Face assembly rotates independently at the neck while the body follows the pointer.
  const head = new THREE.Group();
  head.position.y = 3.08;
  body.add(head);
  sphere(head, joint, [0, 0.35, 0], [0.34, 0.43, 0.29]);
  sphere(head, brightShell, [0, 0.31, 0.16], [0.28, 0.31, 0.2]);
  sphere(head, shell, [0, 0.1, 0.17], [0.24, 0.18, 0.18]);
  box(head, brightShell, [0, 0.57, 0.23], [0.49, 0.085, 0.13]);
  sphere(head, darkBlue, [0, 0.65, 0.275], [0.045, 0.035, 0.025]);
  sphere(head, shell, [0, 0.28, 0.34], [0.055, 0.12, 0.08]);
  box(head, joint, [0, 0.08, 0.325], [0.17, 0.022, 0.025]);
  for (const side of [-1, 1]) {
    sphere(head, jointEdge, [side * 0.32, 0.33, 0], [0.07, 0.15, 0.13]);
    sphere(head, blue, [side * 0.34, 0.33, 0.08], [0.035, 0.045, 0.035]);
  }

  const pupils: RobotModel["pupils"] = [];
  for (const side of [-1, 1]) {
    sphere(head, joint, [side * 0.14, 0.4, 0.345], [0.09, 0.065, 0.04]);
    sphere(head, blue, [side * 0.14, 0.4, 0.377], [0.058, 0.044, 0.026]);
    const pupil = new THREE.Group();
    pupil.position.set(side * 0.14, 0.4, 0.4);
    sphere(pupil, joint, [0, 0, 0], [0.028, 0.031, 0.018]);
    sphere(pupil, brightShell, [-0.009, 0.012, 0.016], [0.009, 0.009, 0.006]);
    head.add(pupil);
    pupils.push({ group: pupil, side });
  }

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
    const button = buttonRef.current;
    let pointerX = window.innerWidth / 2;
    let pointerY = window.innerHeight / 2;
    let hovering = false;
    let hoverDirection = -1;

    const initialize = async () => {
      try {
        const THREE = await import("three");
        if (disposed || !canvasRef.current || !button) return;
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
        scene.add(new THREE.HemisphereLight(0xc8ebff, 0x18212a, 2.1));
        const keyLight = new THREE.DirectionalLight(0xffffff, 3.2);
        keyLight.position.set(-3.5, 5, 5);
        scene.add(keyLight);
        const coolRim = new THREE.DirectionalLight(0x55dfff, 2.8);
        coolRim.position.set(3.5, 3, -3);
        scene.add(coolRim);
        const warmFill = new THREE.DirectionalLight(0xffd39b, 1.25);
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
        const onEnter = (event: PointerEvent) => {
          if (event.pointerType !== "mouse") return;
          hovering = true;
          const centerX = button.getBoundingClientRect().left + button.getBoundingClientRect().width / 2;
          const approach = event.movementX;
          hoverDirection = approach > 0 ? -1 : approach < 0 ? 1 : event.clientX < centerX ? -1 : 1;
          updatePointer(event);
        };
        const onLeave = (event: PointerEvent) => {
          if (event.pointerType === "mouse") hovering = false;
        };
        window.addEventListener("pointermove", updatePointer, { passive: true });
        window.addEventListener("pointerdown", updatePointer, { passive: true });
        button.addEventListener("pointerenter", onEnter);
        button.addEventListener("pointerleave", onLeave);
        removeInputListeners = () => {
          window.removeEventListener("resize", resize);
          window.removeEventListener("pointermove", updatePointer);
          window.removeEventListener("pointerdown", updatePointer);
          button.removeEventListener("pointerenter", onEnter);
          button.removeEventListener("pointerleave", onLeave);
        };

        const clock = new THREE.Clock();
        const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        const animate = () => {
          if (!renderer || !scene || disposed) return;
          animationFrame = window.requestAnimationFrame(animate);
          const delta = Math.min(clock.getDelta(), 0.05);
          const bounds = button.getBoundingClientRect();
          const centerX = bounds.left + bounds.width / 2;
          const eyeLineY = bounds.top + bounds.height * 0.09;
          const aimX = clamp((pointerX - centerX) / Math.max(window.innerWidth * 0.55, 1), -1, 1);
          const aimY = clamp((pointerY - eyeLineY) / Math.max(window.innerHeight * 0.62, 1), -1, 1);
          const smooth = reducedMotion ? 1 : 1 - Math.exp(-8 * delta);

          const bodyYaw = aimX * 0.34 + (hovering ? hoverDirection * 0.42 : 0);
          const bodyPitch = aimY * 0.1 + (hovering ? 0.025 : 0);
          const headYaw = aimX * 0.5;
          const headPitch = aimY * 0.28;
          model.body.rotation.y += (bodyYaw - model.body.rotation.y) * smooth;
          model.body.rotation.x += (bodyPitch - model.body.rotation.x) * smooth;
          model.head.rotation.y += (headYaw - model.head.rotation.y) * smooth;
          model.head.rotation.x += (headPitch - model.head.rotation.x) * smooth;
          model.root.scale.setScalar(model.root.scale.x + ((hovering ? 1.045 : 1) - model.root.scale.x) * smooth);

          for (const { group, side } of model.pupils) {
            group.position.x += (side * 0.14 + aimX * 0.035 - group.position.x) * smooth;
            group.position.y += (0.4 - aimY * 0.024 - group.position.y) * smooth;
          }

          renderer.render(scene, camera);
        };

        renderer.render(scene, camera);
        onReady();
        animationFrame = window.requestAnimationFrame(animate);

      } catch {
        // Keep the existing portrait visible if WebGL is unavailable on the device.
      }
    };

    void initialize();

    return () => {
      disposed = true;
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
