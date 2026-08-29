import React, { useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

const vertexShader = `
  varying vec2 vUv;

  void main() {
    vUv = uv;

    gl_Position =
      projectionMatrix *
      modelViewMatrix *
      vec4(position, 1.0);
  }
`;

const fragmentShader = `
  precision highp float;

  uniform float uTime;
  uniform float uSpeed;
  uniform vec3 uColor1;
  uniform vec3 uColor2;
  uniform vec3 uColor3;

  varying vec2 vUv;

  float random(vec2 st) {
    return fract(
      sin(dot(st, vec2(12.9898, 78.233)))
      * 43758.5453123
    );
  }

  float noise(vec2 st) {
    vec2 i = floor(st);
    vec2 f = fract(st);

    float a = random(i);
    float b = random(i + vec2(1.0, 0.0));
    float c = random(i + vec2(0.0, 1.0));
    float d = random(i + vec2(1.0, 1.0));

    vec2 u = f * f * (3.0 - 2.0 * f);

    return mix(a, b, u.x)
      + (c - a) * u.y * (1.0 - u.x)
      + (d - b) * u.x * u.y;
  }

  float fbm(vec2 st) {
    float value = 0.0;
    float amplitude = 0.5;

    for (int i = 0; i < 6; i++) {
      value += amplitude * noise(st);
      st *= 2.0;
      amplitude *= 0.5;
    }

    return value;
  }

  void main() {

    vec2 st = vUv * 3.0;
    float time = uTime * uSpeed;

    // First layer
    vec2 q = vec2(0.0);

    q.x = fbm(st);
    q.y = fbm(st + vec2(1.0));

    // Domain warping
    vec2 r = vec2(0.0);

    r.x = fbm(
      st +
      q +
      vec2(1.7, 9.2) +
      0.15 * time
    );

    r.y = fbm(
      st +
      q +
      vec2(8.3, 2.8) +
      0.126 * time
    );

    // Final noise
    float f = fbm(st + r);

    // Start with deep-space color
    vec3 color = mix(
      uColor3,
      uColor2,
      clamp(f * f * 4.0, 0.0, 1.0)
    );

    // Add cyan
    color = mix(
      color,
      uColor1,
      clamp(length(q), 0.0, 1.0)
    );

    // Add highlights
    float highlight = clamp(abs(r.x), 0.0, 1.0);

    color = mix(
      color,
      vec3(1.0),
      highlight * 0.25
    );

    // Vignette
    float distanceFromCenter =
      length(vUv - vec2(0.5));

    float vignette =
      1.0 -
      smoothstep(
        0.25,
        0.8,
        distanceFromCenter
      );

    color *= vignette;

    // Nebula brightness
    float brightness =
      f * f * f +
      0.6 * f * f +
      0.5 * f;

    color *= brightness;

    gl_FragColor = vec4(color, 1.0);
  }
`;

function NebulaMaterial({
  speed,
  color1,
  color2,
  color3,
}) {
  const materialRef = useRef(null);

  const uniforms = useMemo(
    () => ({
      uTime: {
        value: 0,
      },

      uSpeed: {
        value: speed,
      },

      uColor1: {
        value: new THREE.Color(color1),
      },

      uColor2: {
        value: new THREE.Color(color2),
      },

      uColor3: {
        value: new THREE.Color(color3),
      },
    }),
    []
  );

  useEffect(() => {
    uniforms.uSpeed.value = speed;
    uniforms.uColor1.value.set(color1);
    uniforms.uColor2.value.set(color2);
    uniforms.uColor3.value.set(color3);
  }, [
    speed,
    color1,
    color2,
    color3,
    uniforms,
  ]);

  useFrame((state) => {
    if (!materialRef.current) return;

    materialRef.current.uniforms.uTime.value =
      state.clock.getElapsedTime();
  });

  const { viewport } = useThree();

  return (
    <mesh>
      <planeGeometry
        args={[
          viewport.width,
          viewport.height,
        ]}
      />

      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
      />
    </mesh>
  );
}

export default function Nebula({
  speed = 2,
  color1 = "#5efff4",
  color2 = "#763b65",
  color3 = "#1a0b2e",
}) {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
      }}
    >
      <Canvas
        style={{
          width: "100%",
          height: "100%",
          display: "block",
        }}
        camera={{
          position: [0, 0, 1],
        }}
        dpr={[1, 2]}
        gl={{
          antialias: false,
          powerPreference: "high-performance",
        }}
      >
        <NebulaMaterial
          speed={speed}
          color1={color1}
          color2={color2}
          color3={color3}
        />
      </Canvas>
    </div>
  );
}