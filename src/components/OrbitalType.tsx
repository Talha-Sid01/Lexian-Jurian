import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useSyncExternalStore,
} from "react";
import * as THREE from "three";
import { cn } from "@/lib/utils";

export interface OrbitalTypeProps {
  text?: string;
  colors?: [string, string];
  fontFamily?: string;
  fontWeight?: number;
  layout?: "bands" | "scatter";
  bands?: number;
  glyphScale?: number;
  spacing?: number;
  tilt?: number;
  spin?: number;
  flow?: number;
  alternate?: boolean;
  size?: number;
  perspective?: number;
  backOpacity?: number;
  interactive?: boolean;
  brush?: number;
  clickPulse?: boolean;
  pulseStrength?: number;
  paused?: boolean;
  quality?: number;
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

export interface OrbitalTypeRef {
  pulse: (latitude?: number) => void;
}

const subscribeReducedMotion = (callback: () => void) => {
  const m = window.matchMedia("(prefers-reduced-motion: reduce)");
  m.addEventListener("change", callback);
  return () => m.removeEventListener("change", callback);
};

const getReducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const clamp = (val: number, min: number, max: number) => Math.min(max, Math.max(min, val));

let sharedColorCanvasCtx: CanvasRenderingContext2D | null = null;
const parseColor = (colorStr: string, fallback: [number, number, number]): [number, number, number] => {
  if (!sharedColorCanvasCtx) {
    sharedColorCanvasCtx = document.createElement("canvas").getContext("2d");
  }
  if (!sharedColorCanvasCtx) return fallback;
  sharedColorCanvasCtx.fillStyle = "#010203";
  sharedColorCanvasCtx.fillStyle = colorStr;
  const computed = String(sharedColorCanvasCtx.fillStyle);
  if (computed === "#010203" && colorStr.trim().toLowerCase() !== "#010203") {
    return fallback;
  }
  if (computed.startsWith("#")) {
    const hex = computed.slice(1);
    return [
      parseInt(hex.slice(0, 2), 16) / 255,
      parseInt(hex.slice(2, 4), 16) / 255,
      parseInt(hex.slice(4, 6), 16) / 255,
    ];
  }
  const parts = computed.match(/[\d.]+/g);
  if (!parts || parts.length < 3) return fallback;
  return [Number(parts[0]) / 255, Number(parts[1]) / 255, Number(parts[2]) / 255];
};

const vertexShaderSource = `
precision highp float;
in float aBand;
in float aTheta;
in float aPhi;
in vec4 aRect;
in vec2 aSize;
uniform float uAngles[48];
uniform float uSwell[48];
uniform mat3 uRotation;
uniform float uScale;
uniform float uPerspective;
uniform float uAspect;
out vec2 vUv;
out float vFacing;

void main() {
  vec2 corner = position.xy;
  int band = int(aBand);
  float theta = aTheta + uAngles[band];
  float phi = aPhi;
  float swell = uSwell[band];
  vec3 p = vec3(cos(phi) * sin(theta), sin(phi), cos(phi) * cos(theta));
  vec3 along = vec3(cos(theta), 0.0, -sin(theta));
  vec3 up = vec3(-sin(phi) * sin(theta), cos(phi), -sin(phi) * cos(theta));
  vec3 local = p * (1.0 + 0.05 * swell) + (along * corner.x * aSize.x + up * corner.y * aSize.y) * (1.0 + 0.16 * swell);
  vec3 view = uRotation * local;
  vec3 normal = uRotation * p;
  vFacing = normal.z;
  float depth = 1.0 / (1.0 - view.z * uPerspective);
  vUv = vec2(aRect.x + (corner.x + 0.5) * aRect.z, aRect.y + (0.5 - corner.y) * aRect.w);
  gl_Position = vec4(view.x * uScale * depth / uAspect, view.y * uScale * depth, 0.0, 1.0);
}
`;

const fragmentShaderSource = `
precision highp float;
uniform sampler2D uAtlas;
uniform vec3 uFront;
uniform vec3 uBack;
uniform float uBackOpacity;
uniform float uSide;
in vec2 vUv;
in float vFacing;
out vec4 fragColor;

void main() {
  if ((uSide > 0.5) != (vFacing >= 0.0)) discard;
  float coverage = texture(uAtlas, vUv).r;
  float front = smoothstep(-0.15, 0.55, vFacing);
  vec3 color = mix(uBack, uFront, front);
  float alpha = coverage * mix(uBackOpacity, 1.0, front);
  if (alpha < 0.004) discard;
  fragColor = vec4(color * alpha, alpha);
}
`;

export const OrbitalType = forwardRef<OrbitalTypeRef, OrbitalTypeProps>(function OrbitalType(
  {
    text = "LEXIAN & JURIAN \u00B7 LITIGATION FINANCE \u00B7 STRATEGIC DISPUTE RESOLUTION \u00B7 ",
    colors = ["#001d51", "#00BFFF"],
    fontFamily = "",
    fontWeight = 600,
    layout = "bands",
    bands = 18,
    glyphScale = 0.72,
    spacing = 1,
    tilt = 24,
    spin = 0.12,
    flow = 0.5,
    alternate = true,
    size = 0.82,
    perspective = 0.3,
    backOpacity = 0.35,
    interactive = true,
    brush = 1,
    clickPulse = true,
    pulseStrength = 1,
    paused = false,
    quality = 1,
    className = "",
    style,
    children,
  },
  ref
) {
  const containerRef = useRef<HTMLDivElement>(null);
  const controllerRef = useRef<{ sync: () => void; destroy: () => void; pulse: (lat?: number) => void } | null>(null);
  const reducedMotion = useSyncExternalStore(subscribeReducedMotion, getReducedMotion, () => false);

  const propsRef = useRef({
    text,
    colors,
    fontFamily,
    fontWeight,
    layout,
    bands,
    glyphScale,
    spacing,
    tilt,
    spin,
    flow,
    alternate,
    size,
    perspective,
    backOpacity,
    interactive,
    brush,
    clickPulse,
    pulseStrength,
    paused,
    quality,
    reduced: reducedMotion,
  });

  useEffect(() => {
    propsRef.current = {
      text,
      colors,
      fontFamily,
      fontWeight,
      layout,
      bands,
      glyphScale,
      spacing,
      tilt,
      spin,
      flow,
      alternate,
      size,
      perspective,
      backOpacity,
      interactive,
      brush,
      clickPulse,
      pulseStrength,
      paused,
      quality,
      reduced: reducedMotion,
    };
    controllerRef.current?.sync();
  });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const initOrbital = (el: HTMLDivElement) => {
      let renderer: THREE.WebGLRenderer;
      const canvas = document.createElement("canvas");
      canvas.setAttribute("aria-hidden", "true");
      canvas.style.position = "absolute";
      canvas.style.inset = "0";
      canvas.style.width = "100%";
      canvas.style.height = "100%";
      canvas.style.display = "block";
      canvas.style.pointerEvents = "none";
      el.prepend(canvas);

      try {
        renderer = new THREE.WebGLRenderer({
          canvas,
          alpha: true,
          premultipliedAlpha: true,
          antialias: true,
        });
      } catch {
        canvas.remove();
        return null;
      }

      if (!renderer.capabilities.isWebGL2) {
        renderer.dispose();
        canvas.remove();
        return null;
      }
      renderer.setClearColor(0, 0);

      const uAngles = new Float32Array(48);
      const momentum = new Float32Array(48);
      const pulseVelocities = new Float32Array(48);
      const uSwell = new Float32Array(48);
      const rotationMatrix = new THREE.Matrix3();

      const material = new THREE.ShaderMaterial({
        glslVersion: THREE.GLSL3,
        vertexShader: vertexShaderSource,
        fragmentShader: fragmentShaderSource,
        transparent: true,
        side: THREE.DoubleSide,
        depthTest: false,
        depthWrite: false,
        premultipliedAlpha: true,
        blending: THREE.CustomBlending,
        blendSrc: THREE.OneFactor,
        blendDst: THREE.OneMinusSrcAlphaFactor,
        uniforms: {
          uAngles: { value: uAngles },
          uSwell: { value: uSwell },
          uRotation: { value: rotationMatrix },
          uScale: { value: 0.8 },
          uPerspective: { value: 0.3 },
          uAspect: { value: 1 },
          uSide: { value: 0 },
          uAtlas: { value: null },
          uFront: { value: new THREE.Vector3(1, 1, 1) },
          uBack: { value: new THREE.Vector3(0, 0.75, 1) },
          uBackOpacity: { value: 0.35 },
        },
      });

      const quadPositions = [-0.5, -0.5, 0, 0.5, -0.5, 0, 0.5, 0.5, 0, -0.5, -0.5, 0, 0.5, 0.5, 0, -0.5, 0.5, 0];
      let geometry = new THREE.InstancedBufferGeometry();
      const mesh = new THREE.Mesh(geometry, material);
      mesh.frustumCulled = false;

      const scene = new THREE.Scene();
      scene.add(mesh);

      const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

      let atlasData: {
        texture: THREE.CanvasTexture;
        rects: Map<string, { u: number; v: number; w: number; h: number; advance: number }>;
      } | null = null;
      let currentAtlasKey = "";
      let activeBandCount = 1;
      let width = 1;
      let height = 1;
      let currentPixelDensity = 1;
      let currentRotationY = 0.6;
      let animFrameId = 0;
      let lastTimestamp = 0;
      let totalTime = 0;
      let isIntersecting = true;
      let isDestroyed = false;
      const pointerState = { x: 0, y: 0, t: 0, inside: false };
      const pendingPulses: Array<{ band: number; at: number; amount: number }> = [];

      const updateAtlasAndGeometry = () => {
        const cfg = propsRef.current;
        const rawText = cfg.text.trim() ? cfg.text : " ";
        const graphemes =
          typeof Intl !== "undefined" && Intl.Segmenter
            ? Array.from(new Intl.Segmenter(undefined, { granularity: "grapheme" }).segment(rawText), (s) => s.segment)
            : Array.from(rawText);

        const compStyle = getComputedStyle(el);
        const fontFam = cfg.fontFamily || compStyle.fontFamily;
        const getFont = (px: number) => `${clamp(cfg.fontWeight ?? 600, 100, 900)} ${px}px ${fontFam}`;

        const atlasKey = `${rawText}|${getFont(10)}|${cfg.layout}|${cfg.bands}|${cfg.glyphScale}|${cfg.spacing}`;
        if (atlasKey === currentAtlasKey && atlasData) return;

        currentAtlasKey = atlasKey;
        atlasData?.texture.dispose();

        const uniqueChars = Array.from(new Set(graphemes.filter((g) => g.trim())));
        const measureCanvas = document.createElement("canvas").getContext("2d");
        const charWidths = uniqueChars.map((ch) => {
          if (measureCanvas) {
            measureCanvas.font = getFont(80.64);
            return measureCanvas.measureText(ch).width;
          }
          return 48.384;
        });

        let curX = 0;
        let curY = 0;
        const rectsList: Array<{ x: number; y: number; w: number }> = [];
        charWidths.forEach((w) => {
          const cw = Math.ceil(w) + 16;
          if (curX + cw > 1024) {
            curX = 0;
            curY += 112;
          }
          rectsList.push({ x: curX, y: curY, w: cw });
          curX += cw;
        });

        const atlasHeight = Math.max(112, Math.pow(2, Math.ceil(Math.log2(curY + 112))));
        const atlasCanvas = document.createElement("canvas");
        atlasCanvas.width = 1024;
        atlasCanvas.height = atlasHeight;
        const atlasCtx = atlasCanvas.getContext("2d");
        const rectsMap = new Map<string, { u: number; v: number; w: number; h: number; advance: number }>();

        if (atlasCtx) {
          atlasCtx.fillStyle = "#000000";
          atlasCtx.fillRect(0, 0, 1024, atlasHeight);
          atlasCtx.fillStyle = "#ffffff";
          atlasCtx.font = getFont(80.64);
          atlasCtx.textBaseline = "alphabetic";
          atlasCtx.textAlign = "left";

          uniqueChars.forEach((ch, idx) => {
            const r = rectsList[idx];
            atlasCtx.fillText(ch, r.x + 8, r.y + 82.88);
            rectsMap.set(ch, {
              u: r.x / 1024,
              v: r.y / atlasHeight,
              w: r.w / 1024,
              h: 112 / atlasHeight,
              advance: charWidths[idx] / 80.64,
            });
          });
        }

        const texture = new THREE.CanvasTexture(atlasCanvas);
        texture.flipY = false;
        texture.minFilter = THREE.LinearMipmapLinearFilter;
        texture.magFilter = THREE.LinearFilter;
        texture.generateMipmaps = true;
        texture.anisotropy = 4;
        texture.colorSpace = THREE.SRGBColorSpace;
        texture.needsUpdate = true;

        atlasData = { texture, rects: rectsMap };
        material.uniforms.uAtlas.value = texture;

        const numBands = Math.round(clamp(cfg.bands ?? 18, 4, 48));
        const spacingVal = clamp(cfg.spacing ?? 1, 0.5, 3);
        const glyphScaleVal = (Math.PI / numBands) * (clamp(cfg.glyphScale ?? 0.72, 0.2, 1.4) / 0.72);

        const aBandArr: number[] = [];
        const aThetaArr: number[] = [];
        const aPhiArr: number[] = [];
        const aRectArr: number[] = [];
        const aSizeArr: number[] = [];

        const getAdvance = (ch: string) => (atlasData?.rects.get(ch)?.advance ?? 0.32) * glyphScaleVal * 0.72;

        const addGlyphInstance = (bandIdx: number, theta: number, phi: number, ch: string) => {
          const r = atlasData?.rects.get(ch);
          if (!r) return;
          aBandArr.push(bandIdx);
          aThetaArr.push(theta);
          aPhiArr.push(phi);
          aRectArr.push(r.u, r.v, r.w, r.h);
          const widthUnits = (1024 * r.w * glyphScaleVal) / 112;
          aSizeArr.push(widthUnits, glyphScaleVal);
        };

        if (cfg.layout === "scatter") {
          const nonWhitespace = graphemes.filter((g) => g.trim());
          const totalPoints = Math.round(clamp(numBands * numBands * 2.2, 60, 4000));
          const goldenAngle = Math.PI * (3 - Math.sqrt(5));
          for (let n = 0; n < totalPoints; n++) {
            const phi = Math.asin(1 - (2 * (n + 0.5)) / totalPoints);
            const theta = goldenAngle * n;
            const randIdx = Math.floor(Math.abs((43758.5453 * Math.sin(12.9898 * n + 78.233)) % 1) * nonWhitespace.length);
            addGlyphInstance(0, theta, phi, nonWhitespace[randIdx] ?? nonWhitespace[0] ?? " ");
          }
          activeBandCount = 1;
        } else {
          const spaceWidth = getAdvance(" ") * spacingVal;
          const totalPhraseWidth = graphemes.reduce((acc, g) => acc + getAdvance(g) * spacingVal, 0) + spaceWidth;

          for (let b = 0; b < numBands; b++) {
            const phi = -Math.PI / 2 + (Math.PI * (b + 0.5)) / numBands;
            const ringCircumference = 2 * Math.PI * Math.cos(phi);
            if (ringCircumference < 1.2 * glyphScaleVal) continue;

            let repeats = Math.max(1, Math.round(ringCircumference / totalPhraseWidth));
            let scaleFactor = ringCircumference / (repeats * totalPhraseWidth);
            if (scaleFactor < 0.82 && repeats > 1) {
              repeats -= 1;
              scaleFactor = ringCircumference / (repeats * totalPhraseWidth);
            }
            const effectiveScale = scaleFactor > 1.35 && repeats === 1 ? 1 : scaleFactor;
            let arcPos = 0;

            for (let r = 0; r < repeats; r++) {
              for (const ch of graphemes) {
                const adv = getAdvance(ch) * spacingVal * effectiveScale;
                if (ch.trim()) {
                  addGlyphInstance(b, (arcPos + adv / 2) / Math.cos(phi), phi, ch);
                }
                arcPos += adv;
              }
              arcPos += spaceWidth * effectiveScale;
              if (arcPos > ringCircumference + 1e-6) break;
            }
          }
          activeBandCount = numBands;
        }

        const newGeom = new THREE.InstancedBufferGeometry();
        newGeom.setAttribute("position", new THREE.Float32BufferAttribute(quadPositions, 3));
        newGeom.setAttribute("aBand", new THREE.InstancedBufferAttribute(new Float32Array(aBandArr), 1));
        newGeom.setAttribute("aTheta", new THREE.InstancedBufferAttribute(new Float32Array(aThetaArr), 1));
        newGeom.setAttribute("aPhi", new THREE.InstancedBufferAttribute(new Float32Array(aPhiArr), 1));
        newGeom.setAttribute("aRect", new THREE.InstancedBufferAttribute(new Float32Array(aRectArr), 4));
        newGeom.setAttribute("aSize", new THREE.InstancedBufferAttribute(new Float32Array(aSizeArr), 2));
        newGeom.instanceCount = aBandArr.length;

        geometry.dispose();
        geometry = newGeom;
        mesh.geometry = newGeom;
      };

      const render = () => {
        updateAtlasAndGeometry();
        const cfg = propsRef.current;
        const tiltRad = clamp(cfg.tilt ?? 24, -90, 90) * (Math.PI / 180);
        const cosTilt = Math.cos(tiltRad);
        const sinTilt = Math.sin(tiltRad);
        const cosSpin = Math.cos(currentRotationY);
        const sinSpin = Math.sin(currentRotationY);

        const matTilt = new THREE.Matrix3().set(cosTilt, -sinTilt, 0, sinTilt, cosTilt, 0, 0, 0, 1);
        const matSpin = new THREE.Matrix3().set(cosSpin, 0, sinSpin, 0, 1, 0, -sinSpin, 0, cosSpin);
        const matBase = new THREE.Matrix3().set(
          1,
          0,
          0,
          0,
          0.9758974493306055,
          0.21822962308086932,
          0,
          -0.21822962308086932,
          0.9758974493306055
        );
        rotationMatrix.copy(matBase.multiply(matSpin).multiply(matTilt));

        const frontColor = parseColor(cfg.colors?.[0] ?? "#FFFFFF", [1, 1, 1]);
        const backColor = parseColor(cfg.colors?.[1] ?? "#00BFFF", [0, 0.75, 1]);

        const u = material.uniforms;
        u.uScale.value = 0.92 * clamp(cfg.size ?? 0.82, 0.2, 1.4) * (height > width ? width / height : 1);
        u.uPerspective.value = clamp(cfg.perspective ?? 0.3, 0, 0.8);
        u.uAspect.value = width / height;
        u.uFront.value.set(frontColor[0], frontColor[1], frontColor[2]);
        u.uBack.value.set(backColor[0], backColor[1], backColor[2]);
        u.uBackOpacity.value = clamp(cfg.backOpacity ?? 0.35, 0, 1);

        renderer.setRenderTarget(null);
        renderer.clear();
        material.uniforms.uSide.value = 0;
        renderer.render(scene, camera);
        material.uniforms.uSide.value = 1;
        renderer.autoClear = false;
        renderer.render(scene, camera);
        renderer.autoClear = true;
      };

      const stepAnimation = (deltaTime: number) => {
        const cfg = propsRef.current;
        if (cfg.paused || cfg.reduced) return;

        totalTime += deltaTime;
        currentRotationY += deltaTime * clamp(cfg.spin ?? 0.12, -3, 3);

        for (let idx = pendingPulses.length - 1; idx >= 0; idx--) {
          const pulse = pendingPulses[idx];
          if (pulse.at <= totalTime) {
            if (pulse.band < activeBandCount) {
              pulseVelocities[pulse.band] += pulse.amount;
            }
            pendingPulses.splice(idx, 1);
          }
        }

        const decayPulse = Math.exp(-deltaTime / 0.3);
        const pulseStrengthVal = Math.max(clamp(cfg.pulseStrength ?? 1, 0, 3), 0.01);
        const diffusion = 7 * deltaTime;

        if (activeBandCount > 2) {
          let prevMom = momentum[0];
          for (let b = 1; b < activeBandCount - 1; b++) {
            const curMom = momentum[b];
            momentum[b] += (prevMom + momentum[b + 1] - 2 * curMom) * diffusion;
            prevMom = curMom;
          }
        }

        const flowSpeed = clamp(cfg.flow ?? 0.5, -3, 3);
        const decayMom = Math.exp(-deltaTime / 1.4);

        for (let b = 0; b < activeBandCount; b++) {
          const dir = (cfg.alternate ?? true) && b % 2 === 1 ? -1 : 1;
          uAngles[b] += (0.35 * flowSpeed * dir + momentum[b] + pulseVelocities[b]) * deltaTime;
          momentum[b] *= decayMom;
          pulseVelocities[b] *= decayPulse;

          const targetSwell = clamp(Math.abs(pulseVelocities[b]) / (7 * pulseStrengthVal), 0, 1);
          uSwell[b] += (targetSwell - uSwell[b]) * (1 - Math.exp(-deltaTime / 0.08));
        }
      };

      const loop = (timestamp: number) => {
        animFrameId = 0;
        if (isDestroyed) return;

        const deltaTime = Math.min(0.05, Math.max(0, (timestamp - lastTimestamp) / 1000));
        lastTimestamp = timestamp;

        stepAnimation(deltaTime);
        render();

        const cfg = propsRef.current;
        if (isIntersecting && !document.hidden && !cfg.paused && !cfg.reduced) {
          animFrameId = requestAnimationFrame(loop);
        }
      };

      const ensureLoop = () => {
        if (!isDestroyed && !animFrameId && isIntersecting) {
          lastTimestamp = performance.now();
          animFrameId = requestAnimationFrame(loop);
        }
      };

      const handleResize = () => {
        const rect = el.getBoundingClientRect();
        width = Math.max(1, rect.width);
        height = Math.max(1, rect.height);
        currentPixelDensity =
          Math.min(window.devicePixelRatio || 1, 2) * clamp(propsRef.current.quality ?? 1, 0.25, 1);
        renderer.setPixelRatio(currentPixelDensity);
        renderer.setSize(width, height, false);
        render();
        ensureLoop();
      };

      const unprojectSpherePoint = (clientX: number, clientY: number): THREE.Vector3 | null => {
        const rect = el.getBoundingClientRect();
        const scale = material.uniforms.uScale.value;
        const persp = material.uniforms.uPerspective.value;
        const ndcX = ((clientX - rect.left) / rect.width) * 2 - 1;
        const ndcY = 1 - ((clientY - rect.top) / rect.height) * 2;

        let u = ((width / height) * ndcX) / scale;
        let v = ndcY / scale;
        let h = 0;

        for (let iter = 0; iter < 3; iter++) {
          const r2 = u * u + v * v;
          if (r2 >= 1) return null;
          h = Math.sqrt(1 - r2);
          const depth = 1 - h * persp;
          u = (((width / height) * ndcX) / scale) * depth;
          v = (ndcY / scale) * depth;
        }
        return new THREE.Vector3(u, v, h);
      };

      const getBandFromLatitude = (phi: number) =>
        propsRef.current.layout === "scatter" ? 0 : Math.floor(((phi + Math.PI / 2) / Math.PI) * activeBandCount);

      const triggerPulse = (bandIdx: number, strength: number) => {
        const cfg = propsRef.current;
        if (cfg.reduced || cfg.paused) return;
        const amt = 7 * clamp(strength, 0, 3);
        for (let b = 0; b < activeBandCount; b++) {
          const dist = Math.abs(b - bandIdx);
          pendingPulses.push({
            band: b,
            at: totalTime + 0.075 * dist,
            amount: amt * Math.exp(-dist / 14),
          });
        }
        ensureLoop();
      };

      const onPointerMove = (evt: PointerEvent) => {
        const cfg = propsRef.current;
        if (!cfg.interactive || cfg.reduced || cfg.paused || evt.pointerType === "touch") return;

        const now = performance.now();
        const dt = Math.max((now - pointerState.t) / 1000, 1 / 240);
        const dx = evt.clientX - pointerState.x;
        const dy = evt.clientY - pointerState.y;
        const isFresh = !pointerState.inside || now - pointerState.t > 120;

        pointerState.x = evt.clientX;
        pointerState.y = evt.clientY;
        pointerState.t = now;
        pointerState.inside = true;
        if (isFresh) return;

        const hit = unprojectSpherePoint(evt.clientX, evt.clientY);
        if (!hit) return;

        const localHit = hit.clone().applyMatrix3(rotationMatrix.clone().transpose());
        const phi = Math.asin(clamp(localHit.y, -1, 1));
        const band = getBandFromLatitude(phi);
        if (band < 0 || band >= activeBandCount) return;

        const theta = Math.atan2(localHit.x, localHit.z);
        const tangentDir = new THREE.Vector3(Math.cos(theta), 0, -Math.sin(theta)).applyMatrix3(rotationMatrix);
        const elRect = el.getBoundingClientRect();
        const radiusPx = (material.uniforms.uScale.value * elRect.height) / 2;
        const screenTangent = new THREE.Vector2(tangentDir.x, -tangentDir.y);
        const tangentLen = screenTangent.length();
        if (tangentLen < 0.15) return;
        screenTangent.divideScalar(tangentLen);

        const projectedSpeed = (dx * screenTangent.x + dy * screenTangent.y) / dt / (radiusPx * Math.max(Math.cos(phi), 0.25));
        const brushFactor = 0.6 * clamp(cfg.brush ?? 1, 0, 3);
        momentum[band] += (projectedSpeed - momentum[band]) * Math.min(1, 9 * dt) * brushFactor;
        ensureLoop();
      };

      const onPointerLeave = () => {
        pointerState.inside = false;
      };

      const onClick = (evt: MouseEvent) => {
        const cfg = propsRef.current;
        if (!cfg.interactive || !cfg.clickPulse) return;
        const hit = unprojectSpherePoint(evt.clientX, evt.clientY);
        if (hit) {
          const localHit = hit.applyMatrix3(rotationMatrix.clone().transpose());
          const phi = Math.asin(clamp(localHit.y, -1, 1));
          triggerPulse(clamp(getBandFromLatitude(phi), 0, activeBandCount - 1), cfg.pulseStrength ?? 1);
        }
      };

      el.addEventListener("pointermove", onPointerMove);
      el.addEventListener("pointerleave", onPointerLeave);
      el.addEventListener("click", onClick);

      const resizeObserver = new ResizeObserver(handleResize);
      resizeObserver.observe(el);

      const intersectionObserver = new IntersectionObserver(
        (entries) => {
          isIntersecting = entries.some((e) => e.isIntersecting);
          if (isIntersecting) ensureLoop();
        },
        { rootMargin: "80px" }
      );
      intersectionObserver.observe(el);

      const onVisibilityChange = () => {
        if (!document.hidden) ensureLoop();
      };
      document.addEventListener("visibilitychange", onVisibilityChange);

      document.fonts?.ready
        ?.then(() => {
          if (!isDestroyed) {
            currentAtlasKey = "";
            render();
          }
        })
        .catch(() => {});

      const onContextLost = (e: Event) => e.preventDefault();
      canvas.addEventListener("webglcontextlost", onContextLost);

      handleResize();

      return {
        sync: () => {
          const targetDpr =
            Math.min(window.devicePixelRatio || 1, 2) * clamp(propsRef.current.quality ?? 1, 0.25, 1);
          if (Math.abs(targetDpr - currentPixelDensity) > 0.001) {
            handleResize();
          } else {
            render();
          }
          ensureLoop();
        },
        destroy: () => {
          isDestroyed = true;
          cancelAnimationFrame(animFrameId);
          el.removeEventListener("pointermove", onPointerMove);
          el.removeEventListener("pointerleave", onPointerLeave);
          el.removeEventListener("click", onClick);
          document.removeEventListener("visibilitychange", onVisibilityChange);
          canvas.removeEventListener("webglcontextlost", onContextLost);
          resizeObserver.disconnect();
          intersectionObserver.disconnect();
          atlasData?.texture.dispose();
          geometry.dispose();
          material.dispose();
          renderer.dispose();
          renderer.forceContextLoss();
          canvas.remove();
        },
        pulse: (latitude = 0) => {
          const phi = clamp(latitude, -1, 1) * (Math.PI / 2);
          triggerPulse(clamp(getBandFromLatitude(phi), 0, activeBandCount - 1), propsRef.current.pulseStrength ?? 1);
        },
      };
    };

    const ctrl = initOrbital(container);
    controllerRef.current = ctrl;

    return () => {
      ctrl?.destroy();
      controllerRef.current = null;
    };
  }, []);

  useImperativeHandle(
    ref,
    () => ({
      pulse: (latitude = 0) => controllerRef.current?.pulse(latitude),
    }),
    []
  );

  return (
    <div
      ref={containerRef}
      role="img"
      aria-label={text}
      className={cn("relative isolate h-full min-h-[240px] w-full overflow-hidden", className)}
      style={style}
    >
      {children && <div className="relative z-10 h-full w-full">{children}</div>}
    </div>
  );
});

OrbitalType.displayName = "OrbitalType";

export default OrbitalType;

