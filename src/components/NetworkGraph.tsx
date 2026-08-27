import { useEffect, useRef } from "react";

type Node = {
  x: number;
  y: number;
  vx: number;
  vy: number;
};

/**
 * Procedural node-graph animation for the hero. Stands in for a personal
 * photo (none available) and echoes the thesis subject: agent networks and
 * anomaly detection. Pauses entirely under prefers-reduced-motion.
 */
export function NetworkGraph() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let width = 0;
    let height = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let nodes: Node[] = [];
    let raf = 0;
    let activeIndex = 0;

    const NODE_COUNT = 34;
    const LINK_DIST = 130;

    function resize() {
      const rect = canvas!.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas!.width = width * dpr;
      canvas!.height = height * dpr;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function seed() {
      nodes = Array.from({ length: NODE_COUNT }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.18,
        vy: (Math.random() - 0.5) * 0.18,
      }));
    }

    function drawStatic() {
      ctx!.clearRect(0, 0, width, height);
      ctx!.strokeStyle = "rgba(250, 191, 36, 0.14)";
      ctx!.fillStyle = "rgba(250, 191, 36, 0.5)";
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.hypot(dx, dy);
          if (dist < LINK_DIST) {
            ctx!.beginPath();
            ctx!.moveTo(nodes[i].x, nodes[i].y);
            ctx!.lineTo(nodes[j].x, nodes[j].y);
            ctx!.stroke();
          }
        }
      }
      for (const n of nodes) {
        ctx!.beginPath();
        ctx!.arc(n.x, n.y, 1.6, 0, Math.PI * 2);
        ctx!.fill();
      }
    }

    function tick() {
      for (const n of nodes) {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > width) n.vx *= -1;
        if (n.y < 0 || n.y > height) n.vy *= -1;
      }

      ctx!.clearRect(0, 0, width, height);

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.hypot(dx, dy);
          if (dist < LINK_DIST) {
            const isActive = i === activeIndex || j === activeIndex;
            const opacity = (1 - dist / LINK_DIST) * (isActive ? 0.55 : 0.16);
            ctx!.strokeStyle = `rgba(250, 191, 36, ${opacity})`;
            ctx!.beginPath();
            ctx!.moveTo(nodes[i].x, nodes[i].y);
            ctx!.lineTo(nodes[j].x, nodes[j].y);
            ctx!.stroke();
          }
        }
      }

      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        const isActive = i === activeIndex;
        ctx!.beginPath();
        ctx!.arc(n.x, n.y, isActive ? 3 : 1.6, 0, Math.PI * 2);
        ctx!.fillStyle = isActive ? "rgba(250, 191, 36, 0.95)" : "rgba(250, 191, 36, 0.45)";
        ctx!.fill();
      }

      raf = requestAnimationFrame(tick);
    }

    resize();
    seed();

    if (reduceMotion) {
      drawStatic();
    } else {
      raf = requestAnimationFrame(tick);
      const pulse = window.setInterval(() => {
        activeIndex = Math.floor(Math.random() * nodes.length);
      }, 1400);
      const onResize = () => {
        resize();
        seed();
      };
      window.addEventListener("resize", onResize);
      return () => {
        cancelAnimationFrame(raf);
        window.clearInterval(pulse);
        window.removeEventListener("resize", onResize);
      };
    }

    const onResizeStatic = () => {
      resize();
      seed();
      drawStatic();
    };
    window.addEventListener("resize", onResizeStatic);
    return () => window.removeEventListener("resize", onResizeStatic);
  }, []);

  return <canvas ref={canvasRef} className="h-full w-full" aria-hidden="true" />;
}
