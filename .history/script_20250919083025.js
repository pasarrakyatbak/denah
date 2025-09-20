// === data nomor ===
const leftNumbers = [ /* data sama */];
const rightNumbers = [ /* data sama */];

// elemen
const rightSide = document.getElementById('right-side');
const leftSide = document.getElementById('left-side');
const road = document.getElementById('road');
const hInner = document.querySelector('.h-inner');
const scrollContainer = document.querySelector('.scroll-container');

// fungsi buat kotak lapak
function makeLapak(num) {
    const d = document.createElement('div');
    d.className = 'lapak';
    d.textContent = num;
    return d;
}

// Render kanan (urutan asli)
rightNumbers.forEach(n => rightSide.appendChild(makeLapak(n)));

// Render kiri (dibalik)
leftNumbers.slice().reverse().forEach(n => leftSide.appendChild(makeLapak(n)));

// Sisipkan "Gerbang Sekolah" di sisi kiri
function insertGerbangBetween(parent, a, b, label = 'Gerbang Sekolah') {
    const children = Array.from(parent.children);
    const idxA = children.findIndex(c => c.textContent == String(a));
    const idxB = children.findIndex(c => c.textContent == String(b));
    if (idxA === -1 || idxB === -1) return;
    const insertAfterIndex = Math.min(idxA, idxB);
    const refNode = parent.children[insertAfterIndex + 1] || null;
    const g = document.createElement('div');
    g.className = 'jalan-gerbang';
    g.textContent = label;
    parent.insertBefore(g, refNode);
}

// Gerbang Sekolah tetap dipertahankan
insertGerbangBetween(leftSide, 2, 3, 'Gerbang Sekolah');
insertGerbangBetween(leftSide, 11, 15, 'Gerbang Sekolah');

// === Buat gapura realistis ===
const gapura = document.createElement('div');
gapura.className = 'gapura';
gapura.innerHTML = `
  <div class="tiang kiri"></div>
  <div class="atap">
    <div class="dekor-atas"></div>
    <div class="teks">🌸 SELAMAT DATANG 🌸</div>
  </div>
  <div class="tiang kanan"></div>
`;
scrollContainer.appendChild(gapura);

// Posisi gapura di tengah jalan
function adjustGapura() {
    const wTop = rightSide.scrollWidth;
    const wBottom = leftSide.scrollWidth;
    const maxW = Math.max(wTop, wBottom);

    hInner.style.minWidth = (maxW + 40) + 'px';
    road.style.width = maxW + 'px';

    // Posisi horizontal gapura
    gapura.style.position = 'absolute';
    gapura.style.top = '50%'; // vertikal di tengah jalan
    gapura.style.left = `${maxW / 2}px`;
    gapura.style.transform = 'translate(-50%, -50%)';

    // Scroll ke tengah jalan
    const containerW = scrollContainer.clientWidth;
    scrollContainer.scrollLeft = Math.max(0, (maxW - containerW) / 2);
}

adjustGapura();
window.addEventListener('resize', () => {
    clearTimeout(window._adjustTimeout);
    window._adjustTimeout = setTimeout(adjustGapura, 120);
});
