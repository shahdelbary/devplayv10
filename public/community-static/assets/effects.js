(() => {
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const canvas = document.querySelector('#matrix');
  if (canvas && !reduced) {
    const ctx = canvas.getContext('2d');
    const chars = '01<>/{}[]DEVPLAYCODE'; const size = 17; let drops = [];
    const resize = () => { const r=Math.min(devicePixelRatio||1,2); canvas.width=innerWidth*r; canvas.height=innerHeight*r; ctx.setTransform(r,0,0,r,0,0); drops=Array.from({length:Math.ceil(innerWidth/size)},()=>Math.random()*-70); };
    const draw = () => { ctx.fillStyle='rgba(5,7,20,.12)';ctx.fillRect(0,0,innerWidth,innerHeight);ctx.font=`${size}px monospace`;drops.forEach((y,i)=>{ctx.fillStyle=Math.random()>.97?'#ad55ff':'rgba(35,211,255,.65)';ctx.fillText(chars[Math.floor(Math.random()*chars.length)],i*size,y*size);drops[i]=y*size>innerHeight&&Math.random()>.975?-5:y+.38});requestAnimationFrame(draw)};
    resize();addEventListener('resize',resize,{passive:true});requestAnimationFrame(draw);
  }
  document.querySelectorAll('details').forEach(item => item.addEventListener('toggle', () => {
    if (!item.open) return;
    document.querySelectorAll('details[open]').forEach(other => { if (other !== item) other.open = false; });
  }));
  if (!reduced) {
    const root = document.documentElement;
    const card = document.querySelector('.tilt-card');
    addEventListener('pointermove', e => {
      root.style.setProperty('--cursor-x', `${e.clientX}px`);
      root.style.setProperty('--cursor-y', `${e.clientY}px`);
      if (!card || innerWidth < 681) return;
      const r = card.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - .5;
      const y = (e.clientY - r.top) / r.height - .5;
      if (e.clientX >= r.left && e.clientX <= r.right && e.clientY >= r.top && e.clientY <= r.bottom) {
        card.style.transform = `rotateX(${-y * 4}deg) rotateY(${x * 6}deg) translateY(-2px)`;
      } else card.style.transform = '';
    }, { passive: true });
    card?.addEventListener('pointerleave', () => { card.style.transform = ''; });
  }
  document.querySelectorAll('summary, .panel-body a').forEach(target => target.addEventListener('pointerdown', e => {
    const r = target.getBoundingClientRect();
    const wave = document.createElement('span');
    wave.className = 'ripple'; wave.style.left = `${e.clientX-r.left}px`; wave.style.top = `${e.clientY-r.top}px`;
    target.append(wave); wave.addEventListener('animationend', () => wave.remove(), { once:true });
  }));
})();
