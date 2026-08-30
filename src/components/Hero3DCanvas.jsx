import React, { useEffect, useRef } from 'react';

export default function Hero3DCanvas({ mode = 'blueprint' }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let width = (canvas.width = canvas.parentElement.offsetWidth);
    let height = (canvas.height = canvas.parentElement.offsetHeight);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.offsetWidth;
      height = canvas.height = canvas.parentElement.offsetHeight;
    };

    window.addEventListener('resize', handleResize);

    // 3D Nodes representing Pakistan infrastructure coordinates projected in 3D space
    const nodesCount = 36;
    const nodes = [];
    for (let i = 0; i < nodesCount; i++) {
      nodes.push({
        x: (Math.random() - 0.5) * 800,
        y: (Math.random() - 0.5) * 500,
        z: Math.random() * 600 - 300,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        vz: (Math.random() - 0.5) * 0.35,
        radius: Math.random() * 2.5 + 1.5,
        type: Math.random() > 0.6 ? 'anchor' : 'data',
        pulse: Math.random() * Math.PI,
      });
    }

    let angleY = 0;
    let angleX = 0.12;
    let targetAngleY = 0;
    let targetAngleX = 0.12;

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      const nx = ((e.clientX - rect.left) / width - 0.5) * 2;
      const ny = ((e.clientY - rect.top) / height - 0.5) * 2;
      targetAngleY = nx * 0.22;
      targetAngleX = 0.12 - ny * 0.18;
    };

    window.addEventListener('mousemove', handleMouseMove);

    const fov = 460;

    const render = () => {
      // Smooth camera rotation interpolation
      angleY += (targetAngleY - angleY) * 0.04;
      angleX += (targetAngleX - angleX) * 0.04;

      ctx.clearRect(0, 0, width, height);

      const cosY = Math.cos(angleY);
      const sinY = Math.sin(angleY);
      const cosX = Math.cos(angleX);
      const sinX = Math.sin(angleX);

      const centerX = width / 2;
      const centerY = height / 2;

      // Draw subtle 3D isometric base grid lines
      ctx.save();
      ctx.lineWidth = 0.75;
      ctx.strokeStyle = mode === 'radar' ? 'rgba(37, 99, 235, 0.08)' : 'rgba(180, 140, 100, 0.09)';

      const gridSize = 420;
      const gridSteps = 8;
      const stepSize = (gridSize * 2) / gridSteps;
      const groundY = 170;

      for (let i = -gridSize; i <= gridSize; i += stepSize) {
        // Grid line parallel to X
        const p1 = project3D(i, groundY, -gridSize, cosY, sinY, cosX, sinX, fov, centerX, centerY);
        const p2 = project3D(i, groundY, gridSize, cosY, sinY, cosX, sinX, fov, centerX, centerY);
        if (p1 && p2) {
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.stroke();
        }

        // Grid line parallel to Z
        const p3 = project3D(-gridSize, groundY, i, cosY, sinY, cosX, sinX, fov, centerX, centerY);
        const p4 = project3D(gridSize, groundY, i, cosY, sinY, cosX, sinX, fov, centerX, centerY);
        if (p3 && p4) {
          ctx.beginPath();
          ctx.moveTo(p3.x, p3.y);
          ctx.lineTo(p4.x, p4.y);
          ctx.stroke();
        }
      }
      ctx.restore();

      // Update and project nodes
      const projectedNodes = [];

      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];
        node.x += node.vx;
        node.y += node.vy;
        node.z += node.vz;
        node.pulse += 0.03;

        // Boundaries
        if (node.x > 400 || node.x < -400) node.vx *= -1;
        if (node.y > 250 || node.y < -250) node.vy *= -1;
        if (node.z > 300 || node.z < -300) node.vz *= -1;

        const proj = project3D(node.x, node.y, node.z, cosY, sinY, cosX, sinX, fov, centerX, centerY);
        if (proj) {
          projectedNodes.push({
            ...proj,
            node,
            scale: proj.scale,
          });
        }
      }

      // Draw connecting 3D wireframe edges
      ctx.lineWidth = 0.75;
      for (let i = 0; i < projectedNodes.length; i++) {
        for (let j = i + 1; j < projectedNodes.length; j++) {
          const p1 = projectedNodes[i];
          const p2 = projectedNodes[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 130) {
            const alpha = (1 - dist / 130) * 0.22 * Math.min(p1.scale, p2.scale);
            ctx.strokeStyle =
              mode === 'radar'
                ? `rgba(37, 99, 235, ${alpha})`
                : `rgba(180, 130, 70, ${alpha})`;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }

      // Sort nodes by Z for proper depth rendering
      projectedNodes.sort((a, b) => b.scale - a.scale);

      // Draw nodes
      for (let i = 0; i < projectedNodes.length; i++) {
        const p = projectedNodes[i];
        const r = Math.max(1.2, p.node.radius * p.scale);
        const pulseEffect = Math.sin(p.node.pulse) * 0.35 + 0.65;

        if (p.node.type === 'anchor') {
          // Blue glowing portal nodes
          ctx.fillStyle = `rgba(37, 99, 235, ${0.75 * pulseEffect})`;
          ctx.beginPath();
          ctx.arc(p.x, p.y, r * 1.4, 0, Math.PI * 2);
          ctx.fill();

          // Outer halo
          ctx.strokeStyle = `rgba(59, 130, 246, ${0.35 * pulseEffect})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.arc(p.x, p.y, r * 2.6, 0, Math.PI * 2);
          ctx.stroke();
        } else {
          // Gold / Beige construction nodes
          ctx.fillStyle = `rgba(202, 138, 4, ${0.65 * pulseEffect})`;
          ctx.beginPath();
          ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    function project3D(x, y, z, cosY, sinY, cosX, sinX, fov, cx, cy) {
      // Rotate around Y
      const x1 = x * cosY - z * sinY;
      const z1 = z * cosY + x * sinY;

      // Rotate around X
      const y2 = y * cosX - z1 * sinX;
      const z2 = z1 * cosX + y * sinX + 550; // offset camera distance

      if (z2 <= 50) return null;

      const scale = fov / z2;
      const px = cx + x1 * scale;
      const py = cy + y2 * scale;

      return { x: px, y: py, scale, z: z2 };
    }

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [mode]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0 opacity-80"
    />
  );
}
