   const c = document.getElementById('c');
   const ctx = c.getContext('2d');

   function petal(len, wid, base, tip) {
     const g = ctx.createLinearGradient(0, 0, 0, -len);
     g.addColorStop(0, base);
     g.addColorStop(1, tip);
     ctx.fillStyle = g;
     ctx.beginPath();
     ctx.moveTo(0, 0);
     ctx.bezierCurveTo(wid, -len * 0.25, wid * 0.9, -len * 0.75, 0, -len);
     ctx.bezierCurveTo(-wid * 0.9, -len * 0.75, -wid, -len * 0.25, 0, 0);
     ctx.fill();
   }

   function lily(x, y, size, base, tip) {
  ctx.save();
  ctx.translate(x, y);
  for (let i = 0; i < 6; i++) {
    ctx.save();
    ctx.rotate(i * Math.PI / 3);
    petal(size, size * 0.35, base, tip);
    ctx.restore();
  }
  ctx.lineWidth = Math.max(1.5, size * 0.022);
  for (let i = 0; i < 6; i++) {
    const a = i * Math.PI / 3 + 0.3;
    const ex = Math.cos(a) * size * 0.44;
    const ey = Math.sin(a) * size * 0.44;
    ctx.strokeStyle = '#f6e8b4';
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(ex, ey);
    ctx.stroke();
    ctx.fillStyle = '#8a2e12';
    ctx.beginPath();
    ctx.arc(ex, ey, size * 0.04, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.restore();
}


   const COLS = 80, ROWS = 100;
   const small = document.createElement('canvas');
   small.width = COLS;
   small.height = ROWS;
   const sctx = small.getContext('2d', { willReadFrequently: true });
   const out = document.getElementById('out').getContext('2d');
   const CHARS = ' .:-=+*#%@';

   function toAscii() {
     sctx.drawImage(c, 0, 0, COLS, ROWS);
     const d = sctx.getImageData(0, 0, COLS, ROWS).data;
     out.fillStyle = '#000';
     out.fillRect(0, 0, 640, 800);
     out.font = '11px monospace';
     for (let y = 0; y < ROWS; y++) {
       for (let x = 0; x < COLS; x++) {
         const i = (y * COLS + x) * 4;
         const r = d[i], g = d[i + 1], b = d[i + 2];
         const bright = (r + g + b) / 3 / 255;
         const m = Math.max(r, g, b);
         if (m < 22) continue;
         const s = 255 / m;
         out.fillStyle = `rgb(${r * s | 0},${g * s | 0},${b * s | 0})`;
         out.fillText(CHARS[Math.floor(bright * (CHARS.length - 1))], x * 8, (y + 1) * 8);
       }
     }
   }

      const FLOWERS = [
     { x: 120, y: 230, size: 60, base: '#c9962f', tip: '#fff1d2', ph: 0.4 },
     { x: 280, y: 220, size: 58, base: '#bd7a00', tip: '#ffd844', ph: 1.9 },
     { x: 200, y: 150, size: 50, base: '#b84a3c', tip: '#ffdcc8', ph: 3.1 },
     { x: 150, y: 290, size: 75, base: '#6e0613', tip: '#ff2638', ph: 4.0 },
     { x: 260, y: 320, size: 70, base: '#7e0c62', tip: '#ff74c6', ph: 1.3 }
   ];

   const LEAF_ANGLES = [-1.1, -0.7, -0.35, 0, 0.35, 0.7, 1.1];

   function leaf(angle, len) {
     ctx.save();
     ctx.translate(200, 490);
     ctx.rotate(angle);
     petal(len, 16, '#1b5a1a', '#6fd24a');
     ctx.restore();
   }

      const STARS = Array.from({ length: 55 }, () => ({
     x: Math.random() * 400,
     y: Math.random() * 470,
     r: 1.5 + Math.random(),
     ph: Math.random() * 6.28
   }));
      let wind = 0;
   let windTarget = 0;
   const outCanvas = document.getElementById('out');

   outCanvas.addEventListener('pointermove', e => {
     const r = outCanvas.getBoundingClientRect();
     windTarget = ((e.clientX - r.left) / r.width - 0.5) * 2;
   });
   outCanvas.addEventListener('pointerleave', () => {
     windTarget = 0;
   });

   function flowerX(f, t) {
     const k = (490 - f.y) / 350;
     return f.x + Math.sin(t / 700 + f.ph) * 8 + wind * 30 * k;
   }

         function frame(t) {
     wind += (windTarget - wind) * 0.06;

     ctx.fillStyle = '#000';
     ctx.fillRect(0, 0, 400, 500);

     STARS.forEach(s => {
       ctx.globalAlpha = 0.6 + 0.4 * Math.sin(t / 500 + s.ph);
       ctx.fillStyle = '#fff';
       ctx.beginPath();
       ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
       ctx.fill();
     });
     ctx.globalAlpha = 1;

     LEAF_ANGLES.forEach(a => leaf(a, 170));

     ctx.lineCap = 'round';
     ctx.lineWidth = 4;
     ctx.strokeStyle = '#2d8a28';

     FLOWERS.forEach(f => {
       const fx = flowerX(f, t);
       ctx.beginPath();
       ctx.moveTo(200, 490);
       ctx.quadraticCurveTo(200 + (fx - 200) * 0.2, (490 + f.y) / 2, fx, f.y);
       ctx.stroke();
     });

     FLOWERS.forEach(f => {
       lily(flowerX(f, t), f.y, f.size, f.base, f.tip);
     });

     toAscii();
     requestAnimationFrame(frame);
   }

   requestAnimationFrame(frame);