// DATA NOMOR
const leftNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100, 101, 102, 103, 104, 186, 187, 188, 189, 190, 191, 192, 193];
const rightNumbers = [194, 195, 196, 197, 198, 199, 200, 201, 202, 203, 204, 205, 206, 207, 208, 209, 210, 211, 212, 213, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 123, 124, 125, 126, 127, 128, 129, 130, 131, 132, 133, 134, 135, 136, 137, 138, 214, 215, 216, 139, 140, 141, 142, 143, 144, 145, 146, 147, 148, 149, 150, 151, 152, 153, 154, 155, 156, 157, 158, 159, 160, 161, 162, 163, 164, 165, 166, 167, 168, 169, 170, 171, 172, 173, 174, 175, 176, 177, 178, 179, 180, 181, 182, 183, 184, 185];
const isDarkMode = document.body.classList.contains('dark');

const rightSide = document.getElementById('right-side');
const leftSide = document.getElementById('left-side');

// Toggle Dark Mode
const toggleDark = document.getElementById('toggleDark');
toggleDark.addEventListener('change', e => {
    if (e.target.checked) { document.body.classList.add('dark'); }
    else { document.body.classList.remove('dark'); }
});
// Buat lapak
function makeLapak(num) {
    const d = document.createElement('div');
    d.className = 'lapak';
    d.textContent = num;
    return d;
}

rightNumbers.forEach(n => rightSide.appendChild(makeLapak(n)));
leftNumbers.slice().reverse().forEach(n => leftSide.appendChild(makeLapak(n)));

// Gerbang
function insertGerbangBetween(parent, a, b, label = 'Gerbang') {
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
insertGerbangBetween(leftSide, 2, 3);
insertGerbangBetween(leftSide, 11, 15);

// Gapura lintas jalan
function insertGapura(leftParent, rightParent, a, b) {
    const idxL = Array.from(leftParent.children).findIndex(c => c.textContent == a);
    const idxR = Array.from(rightParent.children).findIndex(c => c.textContent == b);
    if (idxL === -1 || idxR === -1) return;

    const gapuraBottom = document.createElement('div');
    gapuraBottom.className = 'gapura-container';
    gapuraBottom.innerHTML = `<div class="gapura-icon">⛩️</div><div class="gapura-arrow">⬆️</div>`;
    leftParent.insertBefore(gapuraBottom, leftParent.children[idxL + 1]);

    const gapuraTop = document.createElement('div');
    gapuraTop.className = 'gapura-container';
    gapuraTop.innerHTML = `<div class="gapura-arrow">⬇️</div><div class="gapura-icon">⛩️</div>`;
    rightParent.insertBefore(gapuraTop, rightParent.children[idxR]);
}
insertGapura(leftSide, rightSide, 57, 146);

// Jalan
function insertJalan(parent, a, b, label = 'Jalan') {
    const idxA = Array.from(parent.children).findIndex(c => c.textContent == a);
    const idxB = Array.from(parent.children).findIndex(c => c.textContent == b);
    if (idxA === -1 || idxB === -1) return;
    const insertAfter = Math.min(idxA, idxB);
    const refNode = parent.children[insertAfter + 1] || null;
    const jalan = document.createElement('div');
    jalan.className = 'jalan-gerbang';
    jalan.textContent = label;
    parent.insertBefore(jalan, refNode);
}

// Contoh insert
insertJalan(rightSide, 156, 157);
insertJalan(rightSide, 216, 139);
insertJalan(rightSide, 163, 164);
insertJalan(rightSide, 182, 181);

const tooltip = document.getElementById('tooltip');

function showTooltip(e, text) {
    tooltip.textContent = text;
    tooltip.style.left = e.pageX + 10 + 'px';
    tooltip.style.top = e.pageY + 10 + 'px';
    tooltip.style.opacity = 1;
}

function hideTooltip() {
    tooltip.style.opacity = 0;
}

// Tambahkan tooltip untuk setiap elemen
document.querySelectorAll('.lapak').forEach(el => {
    el.addEventListener('mouseenter', e => showTooltip(e, 'Lapak #' + el.textContent));
    el.addEventListener('mousemove', e => showTooltip(e, 'Lapak #' + el.textContent));
    el.addEventListener('mouseleave', hideTooltip);
});

document.querySelectorAll('.jalan-gerbang').forEach(el => {
    el.addEventListener('mouseenter', e => showTooltip(e, 'Jalan / Gerbang: ' + el.textContent));
    el.addEventListener('mousemove', e => showTooltip(e, 'Jalan / Gerbang: ' + el.textContent));
    el.addEventListener('mouseleave', hideTooltip);
});
document.querySelectorAll('.gapura-container').forEach(el => {
    el.addEventListener('mouseenter', e => showTooltip(e, 'Gapura Lintas Jalan'));
    el.addEventListener('mousemove', e => showTooltip(e, 'Gapura Lintas Jalan'));
    el.addEventListener('mouseleave', hideTooltip);
});

// Mapping foto tiap lapak (contoh)
const lapakPhotos = {
    2: 'images/lapak2.jpg',
    3: 'images/lapak3.jpg',
    11: 'images/lapak11.jpg',
    29: 'images/lapak29.jpg',
    37: 'images/lapak37.jpg',
    51: 'images/lapak51.jpg',
    57: 'images/lapak57.jpg',
    61: 'images/lapak61.jpg',
    70: 'images/lapak70.jpg',
    83: 'images/lapak83.jpg',
    84: 'images/lapak84.jpg',
    86: 'images/lapak86.jpg',
    99: 'images/lapak99.jpg',
    101: 'images/lapak108.jpg',
    124: 'images/lapak124.jpg',
    137: 'images/lapak137.jpg',
    139: 'images/lapak139.jpg',
    140: 'images/lapak140.jpg',
    145: 'images/lapak145.jpg',
    151: 'images/lapak151.jpg',
    153: 'images/lapak153.jpg',
    157: 'images/lapak157.jpg',
    163: 'images/lapak163.jpg',
    168: 'images/lapak168.jpg',
    194: 'images/lapak194.jpg',
    200: 'images/lapak200.jpg',
    214: 'images/lapak214.jpg'
};


const modal = document.getElementById('photoModal');
const modalImg = document.getElementById('modalImg');
const caption = document.getElementById('caption');
const modalClose = document.getElementById('modalClose');

// Klik lapak
document.querySelectorAll('.lapak').forEach(el => {
    el.addEventListener('click', () => {
        const num = el.textContent;
        if (lapakPhotos[num]) {
            modal.style.display = 'block';
            modalImg.src = lapakPhotos[num];
            caption.textContent = 'Lapak #' + num;
        } else {
            alert('Foto belum tersedia untuk lapak #' + num);
        }
    });
});

// Tutup modal
modalClose.addEventListener('click', () => {
    modal.style.display = 'none';
});

// Tutup modal saat klik luar gambar
window.addEventListener('click', e => {
    if (e.target === modal) {
        modal.style.display = 'none';
    }
});
// Setelah membuat semua lapak, tandai yang ada fotonya
document.querySelectorAll('.lapak').forEach(el => {
    const num = el.textContent;
    if (lapakPhotos[num]) {
        el.classList.add('has-photo'); // tambahkan kelas
    }
});
