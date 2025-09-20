// === data nomor (sudah Anda berikan) ===
const leftNumbers = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11,
    15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30,
    31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50,
    51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70,
    71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90,
    91, 92, 93, 94, 95, 96, 97, 98, 99, 100, 101, 102, 103, 104,
    186, 187, 188, 189, 190, 191, 192, 193
];

const rightNumbers = [
    194, 195, 196, 197, 198, 199, 200, 201, 202, 203, 204, 205, 206, 207, 208, 209, 210, 211, 212, 213,
    105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 123, 124,
    125, 126, 127, 128, 129, 130, 131, 132, 133, 134, 135, 136, 137, 138,
    214, 215, 216,
    139, 140, 141, 142, 143, 144, 145, 146, 147, 148, 149, 150, 151, 152, 153, 154, 155, 156, 157, 158, 159, 160,
    161, 162, 163, 164, 165, 166, 167, 168, 169, 170, 171, 172, 173, 174, 175, 176, 177, 178, 179, 180,
    181, 182, 183, 184, 185
];

// cari elemen
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

// Render: 
// kanan = urutan asli
rightNumbers.forEach(n => rightSide.appendChild(makeLapak(n)));

// kiri = dibalik
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

// Gerbang di bawah (sisi kiri)
insertGerbangBetween(leftSide, 2, 3);
insertGerbangBetween(leftSide, 11, 15);

// Sesuaikan lebar jalan
function adjustRoadAndWidth() {
    const wTop = rightSide.scrollWidth;
    const wBottom = leftSide.scrollWidth;
    const maxW = Math.max(wTop, wBottom);

    hInner.style.minWidth = (maxW + 40) + 'px';
    road.style.width = maxW + 'px';

    const containerW = scrollContainer.clientWidth;
    scrollContainer.scrollLeft = Math.max(0, (maxW - containerW) / 2);
}

adjustRoadAndWidth();
window.addEventListener('resize', () => {
    clearTimeout(window._adjustTimeout);
    window._adjustTimeout = setTimeout(adjustRoadAndWidth, 120);
});

// === GAPURA: di antara 57 dan 58 (sisi kiri) ===
function insertGapura(leftParent, a, b, label = 'Gapura Selamat Datang') {
    const children = Array.from(leftParent.children);
    const idxA = children.findIndex(c => c.textContent == String(a));
    const idxB = children.findIndex(c => c.textContent == String(b));
    if (idxA === -1 || idxB === -1) return;

    // Buat wrapper container agar gapura tembus dari kiri ke kanan
    const wrapper = document.createElement('div');
    wrapper.style.display = "flex";
    wrapper.style.alignItems = "center";
    wrapper.style.justifyContent = "center";
    wrapper.style.gap = "10px";

    // Tambah gapura
    const gapura = document.createElement('div');
    gapura.className = "gapura";
    gapura.textContent = label;
    wrapper.appendChild(gapura);

    // Insert ke bawah (di sisi kiri tapi membentang ke tengah)
    const insertAfterIndex = Math.min(idxA, idxB);
    const refNode = leftParent.children[insertAfterIndex + 1] || null;
    leftParent.insertBefore(wrapper, refNode);

    // Geser posisi supaya gapura menyeberang jalan
    const roadEl = document.getElementById('road');
    roadEl.parentNode.insertBefore(wrapper, roadEl.nextSibling);
}

// Panggil fungsi untuk buat gapura di antara 57 dan 58
insertGapura(leftSide, 57, 58);
