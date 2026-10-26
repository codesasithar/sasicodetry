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
  body.scale.x = 0.94;
  root.add(body);

  const shell = new THREE.MeshStandardMaterial({ color: 0xcbd1d4, metalness: 0.44, roughness: 0.25 });
  const brightShell = new THREE.MeshStandardMaterial({ color: 0xe5e8e9, metalness: 0.36, roughness: 0.23 });
  const faceShell = new THREE.MeshPhysicalMaterial({
    color: 0xd5d7d6,
    metalness: 0.16,
    roughness: 0.31,
    clearcoat: 0.22,
    clearcoatRoughness: 0.26,
  });
  const shadowShell = new THREE.MeshStandardMaterial({ color: 0x7f898f, metalness: 0.66, roughness: 0.27 });
  const joint = new THREE.MeshStandardMaterial({ color: 0x101216, metalness: 0.38, roughness: 0.34 });
  const jointEdge = new THREE.MeshStandardMaterial({ color: 0xa0a9ae, metalness: 0.76, roughness: 0.2 });
  const eyeWhite = new THREE.MeshStandardMaterial({ color: 0xe5ecee, metalness: 0.08, roughness: 0.2 });
  const iris = new THREE.MeshStandardMaterial({ color: 0x819ba4, metalness: 0.06, roughness: 0.24 });

  const sphereGeometry = new THREE.SphereGeometry(1, 32, 24);
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

  const extrudedPanel = (
    parent: THREE.Group,
    material: THREE.Material,
    shape: THREE.Shape,
    position: Vec3,
    depth: number,
    bevel: number,
  ) => {
    const mesh = new THREE.Mesh(
      new THREE.ExtrudeGeometry(shape, {
        depth,
        bevelEnabled: true,
        bevelSegments: 3,
        bevelSize: bevel,
        bevelThickness: bevel,
        curveSegments: 16,
        steps: 1,
      }),
      material,
    );
    mesh.position.set(...position);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    parent.add(mesh);
    return mesh;
  };

  // A single pearl-silver chest shell wraps an exposed mechanical core.
  sphere(body, joint, [0, 2.1, -0.015], [0.45, 0.64, 0.29]);
  sphere(body, shadowShell, [0, 2.34, 0.015], [0.49, 0.57, 0.28]);
  sphere(body, brightShell, [0, 2.36, 0.035], [0.58, 0.59, 0.34]);

  // The waist stays narrow and open, with a V-shaped silver pelvis shell.
  sphere(body, joint, [0, 1.66, 0], [0.14, 0.125, 0.11]);
  const pelvisShape = new THREE.Shape();
  pelvisShape.moveTo(-0.14, 0.085);
  pelvisShape.quadraticCurveTo(0, 0.145, 0.14, 0.085);
  pelvisShape.lineTo(0.11, -0.04);
  pelvisShape.quadraticCurveTo(0.06, -0.115, 0, -0.15);
  pelvisShape.quadraticCurveTo(-0.06, -0.115, -0.11, -0.04);
  pelvisShape.closePath();
  extrudedPanel(body, shell, pelvisShape, [0, 1.49, 0.11], 0.07, 0.0175);
  box(body, jointEdge, [0, 1.42, 0], [0.235, 0.05, 0.14]);
  for (let vertebra = 0; vertebra < 4; vertebra += 1) {
    const y = 1.88 - vertebra * 0.075;
    sphere(body, jointEdge, [0, y, 0.13], [0.115 - vertebra * 0.01, 0.035, 0.055]);
    sphere(body, joint, [0, y - 0.035, 0.135], [0.07, 0.027, 0.045]);
  }
  for (const side of [-1, 1]) {
    segment(body, jointEdge, [side * 0.2, 1.9, 0.07], [side * 0.12, 1.6, 0.13], 0.025, 0.018);
    segment(body, joint, [side * 0.22, 1.88, 0.015], [side * 0.16, 1.61, 0.035], 0.035, 0.026);
  }

  // Narrow neck struts remain visible between the chest and the turning head.
  segment(body, joint, [0, 2.76, 0], [0, 3.12, 0], 0.09, 0.075);
  for (const side of [-1, 1]) {
    segment(body, brightShell, [side * 0.12, 2.79, 0.04], [side * 0.16, 3.1, 0.02], 0.025, 0.018);
    segment(body, joint, [side * 0.15, 2.81, -0.04], [side * 0.12, 3.09, 0.01], 0.022, 0.014);
  }

  // Mirrored arms pair exposed black actuators with smooth silver outer shells.
  for (const side of [-1, 1]) {
    sphere(body, joint, [side * 0.58, 2.61, -0.015], [0.29, 0.27, 0.25]);
    sphere(body, brightShell, [side * 0.61, 2.63, 0.08], [0.23, 0.23, 0.22]);
    sphere(body, jointEdge, [side * 0.61, 2.63, 0.27], [0.13, 0.13, 0.045]);
    sphere(body, shell, [side * 0.61, 2.63, 0.305], [0.075, 0.075, 0.025]);

    sphere(body, joint, [side * 0.72, 2.27, 0.02], [0.17, 0.32, 0.17]);
    for (const offset of [-0.085, 0, 0.085]) {
      segment(body, joint, [side * 0.67 + offset, 2.46, 0.16], [side * 0.77 + offset * 0.82, 2.06, 0.17], 0.033, 0.026);
    }
    segment(body, brightShell, [side * 0.62, 2.46, 0.14], [side * 0.68, 2.06, 0.17], 0.027, 0.02);
    segment(body, jointEdge, [side * 0.81, 2.44, 0.13], [side * 0.8, 2.07, 0.15], 0.025, 0.018);
    sphere(body, jointEdge, [side * 0.78, 1.98, 0.02], [0.16, 0.16, 0.16]);
    sphere(body, brightShell, [side * 0.78, 1.98, 0.15], [0.11, 0.11, 0.035]);

    segment(body, joint, [side * 0.78, 1.91, 0.01], [side * 0.82, 1.35, 0.04], 0.13, 0.11);
    sphere(body, shell, [side * 0.81, 1.62, 0.06], [0.18, 0.32, 0.19]);
    segment(body, jointEdge, [side * 0.72, 1.89, 0.13], [side * 0.77, 1.4, 0.15], 0.024, 0.017);
    segment(body, brightShell, [side * 0.9, 1.88, 0.12], [side * 0.88, 1.41, 0.14], 0.022, 0.016);
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

  // Black thigh actuators and mirrored silver shin armor match the reference silhouette.
  for (const side of [-1, 1]) {
    const hipX = side * 0.22;
    sphere(body, joint, [hipX, 1.42, 0], [0.095, 0.1, 0.09]);
    segment(body, joint, [hipX, 1.38, 0], [side * 0.25, 0.77, 0], 0.16, 0.14);
    sphere(body, joint, [side * 0.24, 1.05, 0.02], [0.2, 0.4, 0.2]);
    segment(body, jointEdge, [side * 0.13, 1.38, 0.1], [side * 0.16, 0.8, 0.12], 0.025, 0.018);
    segment(body, brightShell, [side * 0.34, 1.35, 0.1], [side * 0.33, 0.82, 0.11], 0.023, 0.017);
    sphere(body, jointEdge, [side * 0.25, 0.73, 0.02], [0.17, 0.16, 0.17]);
    sphere(body, brightShell, [side * 0.25, 0.73, 0.15], [0.12, 0.12, 0.045]);

    segment(body, joint, [side * 0.25, 0.67, 0], [side * 0.27, 0.18, 0.01], 0.13, 0.12);
    sphere(body, brightShell, [side * 0.26, 0.43, 0.06], [0.19, 0.31, 0.2]);
    sphere(body, jointEdge, [side * 0.27, 0.16, 0], [0.15, 0.13, 0.16]);
    box(body, shell, [side * 0.27, 0.08, 0.13], [0.3, 0.16, 0.43]);
    box(body, brightShell, [side * 0.27, 0.135, 0.3], [0.27, 0.07, 0.18]);
    segment(body, jointEdge, [side * 0.27, 0.17, 0.02], [side * 0.27, 0.1, 0.34], 0.018, 0.014);
  }

  // Face assembly rotates independently at the neck while the body follows the pointer.
  const head = new THREE.Group();
  head.position.y = 3.08;
  body.add(head);
  const headGeometry = new THREE.SphereGeometry(1, 64, 48);
  const headPositions = headGeometry.attributes.position;
  for (let index = 0; index < headPositions.count; index += 1) {
    const y = headPositions.getY(index);
    const x = headPositions.getX(index);
    const z = headPositions.getZ(index);
    const jawTaper = clamp((0.16 - y) / 1.16, 0, 1);
    headPositions.setX(index, x * (1 - 0.23 * jawTaper));

    if (z > 0) {
      const frontness = clamp((z - 0.12) / 0.68, 0, 1);
      const gaussian = (cx: number, cy: number, sx: number, sy: number) =>
        Math.exp(-(((x - cx) / sx) ** 2 + ((y - cy) / sy) ** 2));
      const sockets = gaussian(-0.37, 0.05, 0.19, 0.15) + gaussian(0.37, 0.05, 0.19, 0.15);
      const brows = gaussian(-0.36, 0.2, 0.25, 0.12) + gaussian(0.36, 0.2, 0.25, 0.12);
      const cheeks = gaussian(-0.45, -0.18, 0.31, 0.2) + gaussian(0.45, -0.18, 0.31, 0.2);
      const noseBridge = gaussian(0, -0.015, 0.15, 0.34);
      const noseTip = gaussian(0, -0.25, 0.2, 0.16);
      const noseWings = gaussian(-0.15, -0.31, 0.14, 0.11) + gaussian(0.15, -0.31, 0.14, 0.11);
      const muzzle = gaussian(0, -0.4, 0.31, 0.15);
      const mouth = gaussian(0, -0.5, 0.34, 0.045);
      const chin = gaussian(0, -0.67, 0.29, 0.18);
      const relief =
        -0.055 * sockets +
        0.025 * brows +
        0.032 * cheeks +
        0.25 * noseBridge +
        0.31 * noseTip +
        0.12 * noseWings +
        0.045 * muzzle -
        0.06 * mouth +
        0.075 * chin;
      headPositions.setZ(index, z + relief * frontness);
    }
  }
  headGeometry.computeVertexNormals();
  const skull = new THREE.Mesh(headGeometry, faceShell);
  skull.position.set(0, 0.35, 0);
  skull.scale.set(0.34, 0.43, 0.29);
  skull.castShadow = true;
  skull.receiveShadow = true;
  head.add(skull);
  // Small nostrils and a fine mouth seam give the porcelain face human proportions.
  for (const side of [-1, 1]) {
    sphere(head, joint, [side * 0.041, 0.219, 0.361], [0.012, 0.006, 0.004]);
  }
  segment(head, joint, [-0.07, 0.14, 0.247], [0, 0.133, 0.254], 0.005, 0.005);
  segment(head, joint, [0, 0.133, 0.254], [0.07, 0.14, 0.247], 0.005, 0.005);
  segment(head, shell, [-0.045, 0.105, 0.248], [0.045, 0.105, 0.248], 0.004, 0.004);
  for (const side of [-1, 1]) {
    sphere(head, faceShell, [side * 0.325, 0.31, 0.005], [0.05, 0.105, 0.085]);
    sphere(head, shadowShell, [side * 0.35, 0.31, 0.045], [0.012, 0.046, 0.022]);
  }

  const pupils: RobotModel["pupils"] = [];
  for (const side of [-1, 1]) {
    sphere(head, shadowShell, [side * 0.13, 0.37, 0.254], [0.068, 0.047, 0.018]);
    sphere(head, faceShell, [side * 0.13, 0.405, 0.261], [0.054, 0.012, 0.012]);
    sphere(head, eyeWhite, [side * 0.13, 0.37, 0.26], [0.044, 0.03, 0.015]);
    const pupil = new THREE.Group();
    pupil.position.set(side * 0.13, 0.37, 0.273);
    sphere(pupil, iris, [0, 0, 0], [0.021, 0.022, 0.009]);
    sphere(pupil, joint, [0, 0, 0.007], [0.01, 0.014, 0.006]);
    sphere(pupil, eyeWhite, [-0.007, 0.009, 0.012], [0.005, 0.005, 0.003]);
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
            group.position.x += (side * 0.13 + aimX * 0.026 - group.position.x) * smooth;
            group.position.y += (0.37 - aimY * 0.02 - group.position.y) * smooth;
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

    const initDelay = window.matchMedia('(max-width: 767px)').matches ? 1400 : 650;
    const initTimer = window.setTimeout(() => void initialize(), initDelay);

    return () => {
      disposed = true;
      window.clearTimeout(initTimer);
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
