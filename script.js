/* -------------------------------------------------------
   MERGED & FINAL script.js
   - Right-side sliding menu (reference)
   - Click animation + active highlight
   - Full original interactions preserved
-------------------------------------------------------- */

/* -------------------------
   Page order & elements
--------------------------*/
const pagesOrder = ['welcome','letter','timeline','gallery','music','reasons','surprise','minigame','promises','final'];
const pagesContainer = document.getElementById('pagesContainer');
const menuBtn = document.getElementById('menuBtn');
const sideMenu = document.getElementById('sideMenu');
const confettiCanvas = document.getElementById('confetti');

let currentPageId = 'welcome';

/* -------------------------
   Confetti setup
--------------------------*/
let confettiAnim = null;
let confettiPieces = [];
const ctx = confettiCanvas.getContext ? confettiCanvas.getContext('2d') : null;

function fitCanvas(){
  confettiCanvas.width = window.innerWidth;
  confettiCanvas.height = window.innerHeight;
}
window.addEventListener('resize', fitCanvas);
fitCanvas();

/* -------------------------
   SIDE MENU (toggle + outside click)
--------------------------*/
menuBtn.addEventListener('click', ()=> {
  const open = sideMenu.classList.toggle('open');
  sideMenu.setAttribute('aria-hidden', String(!open));
  menuBtn.setAttribute('aria-expanded', String(open));
});

/* close sideMenu if click outside when open */
document.addEventListener('click', (e) => {
  if(!sideMenu.classList.contains('open')) return;
  const inside = e.target.closest('#sideMenu') || e.target.closest('#menuBtn');
  if(!inside){
    sideMenu.classList.remove('open');
    sideMenu.setAttribute('aria-hidden', 'true');
    menuBtn.setAttribute('aria-expanded', 'false');
  }
});

/* handle menu links (animation + highlight + navigate) */
sideMenu.querySelectorAll('a[data-page]').forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();

    // click pulse animation
    link.classList.add('clicked');
    setTimeout(()=> link.classList.remove('clicked'), 360);

    // mark active
    sideMenu.querySelectorAll('a').forEach(a=>a.classList.remove('active'));
    link.classList.add('active');

    // navigate
    const target = link.dataset.page;
    navigateTo(target);

    // close
    sideMenu.classList.remove('open');
    sideMenu.setAttribute('aria-hidden', 'true');
    menuBtn.setAttribute('aria-expanded', 'false');
  });
});

/* -------------------------
   NAVIGATION (safe, no jumps)
--------------------------*/
function showPageById(id){
  document.getElementById(currentPageId)?.classList.remove('show');
  document.getElementById(id)?.classList.add('show');
  currentPageId = id;
  onEnterPage(id);

  // highlight corresponding menu link if present
  sideMenu.querySelectorAll('a[data-page]').forEach(a=>{
    a.classList.toggle('active', a.dataset.page === id);
  });
}

function navigateTo(id){
  const prev = document.getElementById(currentPageId);
  if(prev) prev.classList.remove('show');
  showPageById(id);
}

/* next buttons (in-page) */
document.addEventListener('click', (e)=>{
  const b = e.target.closest('button[data-next]');
  if(b) {
    navigateTo(b.dataset.next);
    // close menu if open
    sideMenu.classList.remove('open');
  }
});

/* restart button */
document.getElementById('restartBtn')?.addEventListener('click', ()=>{
  resetGame();
  navigateTo('welcome');
});

/* swipe left / right (mobile) */
let sx=0,sy=0;
pagesContainer.addEventListener('touchstart',(ev)=>{
  sx = ev.touches[0].clientX;
  sy = ev.touches[0].clientY;
},{passive:true});
pagesContainer.addEventListener('touchend',(ev)=>{
  const dx = ev.changedTouches[0].clientX - sx;
  const dy = ev.changedTouches[0].clientY - sy;
  if(Math.abs(dx)>50 && Math.abs(dx)>Math.abs(dy)){
    if(dx < 0) goNext();
    else goPrev();
  }
},{passive:true});

function goNext(){
  const i = pagesOrder.indexOf(currentPageId);
  if(i < pagesOrder.length-1) navigateTo(pagesOrder[i+1]);
}
function goPrev(){
  const i = pagesOrder.indexOf(currentPageId);
  if(i > 0) navigateTo(pagesOrder[i-1]);
}

/* -------------------------
   onEnterPage hooks
--------------------------*/
function onEnterPage(id){
  if(id==='timeline'){
    document.querySelectorAll('#timeline .timeline-card').forEach((c,i)=>{
      c.classList.remove('visible');
      setTimeout(()=>c.classList.add('visible'), i*130);
    });
  }

  if(id==='gallery'){
    document.querySelectorAll('.img-card').forEach(card=>{
      const cap = card.dataset.caption || "";
      card.querySelector('.glass-caption').textContent = cap;
    });
  }
}

/* -------------------------
   LETTER — styles & interactions
--------------------------*/
const styles = ['envelope','scroll','card','floating'];
const switcherButtons = document.querySelectorAll('.letter-switcher .small-btn');
const letterStyles = document.querySelectorAll('.letter-style');

function showLetterStyle(k){
  letterStyles.forEach(el=>el.classList.add('hidden'));
  const el = document.getElementById('letter-'+k);
  if(el) el.classList.remove('hidden');
}

switcherButtons.forEach(b=>{
  b.addEventListener('click',()=> showLetterStyle(b.dataset.style));
});

/* Envelope */
const envelope = document.getElementById('envelope');
const openEnvelopeBtn = document.getElementById('openEnvelope');

if(openEnvelopeBtn){
  openEnvelopeBtn.addEventListener('click', ()=>{
    envelope.classList.toggle('open');

    const body = envelope.querySelector('.body');

    if(envelope.classList.contains('open')){
      body.innerHTML = `
      <div class="glass-card" style="padding:14px;max-width:250px;">
        <strong>My Love,</strong>
        <p style="margin-top:6px">
          Every day I miss you a lot dear.
          I want to hug you sooooo Badly, and tighter I won't let you go.<br>
          Ms.😊
        </p>
      </div>`;
    } else {
      body.innerHTML = `<div class="stamp">💌</div>`;
    }
  });
}

/* Scroll */
const scrollPaper = document.getElementById('scrollPaper');
const unrollBtn = document.getElementById('unrollBtn');

if(unrollBtn){
  unrollBtn.addEventListener('click',()=>{
    scrollPaper.classList.toggle('unrolled');
    const txt = scrollPaper.classList.contains('unrolled')
      ? "My dearest, Njn etharatholam ninode addicted aane ninake ariyan but, ne vijarikinathea kal njn ninode addicted aane. Ne vijarikam evane enthe patti, idiot polea enthokea parayanallo enne, athe njn idiot thannea. Ninta idiot aane njn, Honestly I never thought, njanum oru oralode itharaikum sheaham kanikum enne, I love you a lot, lot more than you can even imagin Dear Ms. Pinnea Ms. ninta koodea njn unde ippo, ninake ethe share cheyanam engilum aayalum appo aayalum, njn unde koodea.Ne ellum enode open aayi parayuninde, athe thannea enike valiya achievement aane, But enthina problems onnum ne neaayite parayathea, Ithe thette allea, we laughed together but you are crying alone?. Enike istalla ithe, maybe njn worthy allea de kelkan? Ne utharam para..."
      : " Enike ne irreplacable aane, ninta sthanam ninake mathram aane, vara aarkum varn patilla, njn samathikilla :) Enike ne thannea mathi de, I am soooooooooooo happy, Enike onne mathram ullu de, Ne enta eduke safe eeyi feel cheyanam. That's all Ms....";
    document.getElementById('scrollContent').textContent = txt;
  });
}

/* Card (typewriter) */
function typewriter(container, text, speed=20){
  container.textContent = "";
  let i = 0;
  const id = setInterval(()=>{
    container.textContent += text[i++];
    if(i >= text.length) clearInterval(id);
  }, speed);
}

const revealCardBtn = document.getElementById('revealCard');
if(revealCardBtn){
  revealCardBtn.addEventListener('click',()=>{
    const msg = "I fall in love with you again every single day Ms.❤️";
    typewriter(document.getElementById('cardContent'), msg, 20);
  });
}

/* Floating paper */
const floatBtn = document.getElementById('floatBtn');
if(floatBtn){
  floatBtn.addEventListener('click',()=>{
    const p = document.getElementById('floatingPaper');
    p.classList.toggle('float');
    document.getElementById('floatingText').textContent =
      p.classList.contains('float')
        ? "I just wanted to let you know that.I miss you, I adore you, and I can’t wait to see you again.."
        : "Tap float to reveal the message.";
  });
}

/* -------------------------
   GALLERY interactions
--------------------------*/
document.querySelectorAll('.img-card').forEach(card=>{
  card.addEventListener('click',()=>{
    card.classList.add('touch-visible');
    setTimeout(()=> card.classList.remove('touch-visible'), 2000);
  });
});

/* -------------------------
   SURPRISE
--------------------------*/
const revealBtn = document.getElementById('revealBtn');
if(revealBtn){
  revealBtn.addEventListener('click',()=>{
    const box = document.getElementById('surpriseBox');
    box.classList.add('revealed');
    box.innerHTML = `
      💙 You are my world.<br>
      💙 You are my peace.<br>
      💙 You are my happiness.<br>
      💙 I choose you, always.`;
  });
}

/* -------------------------
   MINI GAME
--------------------------*/
const heartButtons = document.querySelectorAll('.heart-btn');
const winText = document.getElementById('winText');
const gameNextBtn = document.getElementById('gameNext');

let heartsState = Array.from({length:heartButtons.length}).map(()=>false);

function resetGame(){
  heartsState = heartsState.map(()=>false);
  heartButtons.forEach(b=>{
    b.textContent = '💙';
    b.classList.remove('found');
  });
  winText.textContent = "";
  winText.classList.remove('show');
  gameNextBtn.classList.add('hidden');
  stopConfetti();
}

heartButtons.forEach(btn=>{
  btn.addEventListener('click',()=>{
    const i = +btn.dataset.index;
    heartsState[i] = !heartsState[i];
    btn.textContent = heartsState[i] ? '💖' : '💙';
    btn.classList.toggle('found', heartsState[i]);

    if(heartsState.every(Boolean)){
      winText.textContent = "You found them all! 💌✨";
      winText.classList.add('show');
      gameNextBtn.classList.remove('hidden');
      startConfetti();
    }
  });
});

resetGame();

/* -------------------------
   CONFETTI
--------------------------*/
function rand(a,b){ return Math.random()*(b-a)+a; }

function startConfetti(){
  if(!ctx) return;
  confettiCanvas.style.display = 'block';

  confettiPieces = Array.from({length:60}).map(()=>({
    x: rand(0,confettiCanvas.width),
    y: rand(-200,0),
    w: rand(6,12),
    h: rand(10,20),
    vx: rand(-1.5,1.5),
    vy: rand(1.5,4),
    rot: rand(0,Math.PI*2),
    vr: rand(-0.1,0.1),
    color: ['#60a5fa','#3b82f6','#93c5fd','#bfdbfe','#7dd3fc'][Math.floor(rand(0,5))]
  }));

  if(!confettiAnim) confettiAnim = requestAnimationFrame(step);
}

function step(){
  ctx.clearRect(0,0,confettiCanvas.width,confettiCanvas.height);

  confettiPieces.forEach(p=>{
    p.x += p.vx;
    p.y += p.vy;
    p.rot += p.vr;
  });

  confettiPieces = confettiPieces.filter(p=> p.y < confettiCanvas.height+40);

  confettiPieces.forEach(p=>{
    ctx.save();
    ctx.translate(p.x,p.y);
    ctx.rotate(p.rot);
    ctx.fillStyle = p.color;
    ctx.fillRect(-p.w/2,-p.h/2,p.w,p.h);
    ctx.restore();
  });

  if(confettiPieces.length > 0){
    confettiAnim = requestAnimationFrame(step);
  } else {
    stopConfetti();
  }
}

function stopConfetti(){
  if(confettiAnim) cancelAnimationFrame(confettiAnim);
  confettiAnim = null;
  if(ctx) ctx.clearRect(0,0,confettiCanvas.width,confettiCanvas.height);
  confettiCanvas.style.display='none';
}

/* -------------------------
   INIT
--------------------------*/
document.querySelectorAll('.page').forEach(p=>p.classList.remove('show'));
document.getElementById('welcome').classList.add('show');
onEnterPage('welcome');
