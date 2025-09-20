// DATA NOMOR
const leftNumbers = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24,
    25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43,
    44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62,
    63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81,
    82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100,
    101, 102, 103, 104, 186, 187, 188, 189, 190, 191, 192, 193
];
const rightNumbers = [
    194, 195, 196, 197, 198, 199, 200, 201, 202, 203, 204, 205, 206, 207, 208,
    209, 210, 211, 212, 213, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114,
    115, 116, 117, 118, 119, 120, 121, 122, 123, 124, 125, 126, 127, 128, 129,
    130, 131, 132, 133, 134, 135, 136, 137, 138, 214, 215, 216, 139, 140, 141,
    142, 143, 144, 145, 146, 147, 148, 149, 150, 151, 152, 153, 154, 155, 156,
    157, 158, 159, 160, 161, 162, 163, 164, 165, 166, 167, 168, 169, 170, 171,
    172, 173, 174, 175, 176, 177, 178, 179, 180, 181, 182, 183, 184, 185
];

const rightSide = document.getElementById('right-side');
const leftSide = document.getElementById('left-side');

// Fungsi buat lapak
function makeLapak(num) {
    const d = document.createElement('div');
    d.className = 'lapak';
    d.textContent = num;
    return d;
}
rightNumbers.forEach(n => rightSide.appendChild(makeLapak(n)));
leftNumbers.slice().reverse().forEach(n => leftSide.appendChild(makeLapak(n)));

// Gerbang di sisi kiri
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
insertGerbangBetween(leftSide, 2, 3);
insertGerbangBetween(leftSide, 11, 15);
// Fungsi buat gapura lintas jalan dengan garis penghubung
function insertGapuraLintasJalan(leftParent, rightParent, a, b) {
    const leftChildren = Array.from(leftParent.children);
    const rightChildren = Array.from(rightParent.children);

    const idxLeft = leftChildren.findIndex(c => c.textContent == String(a));
    const idxRight = rightChildren.findIndex(c => c.textContent == String(b));

    if (idxLeft === -1 || idxRight === -1) return;

    // Buat gapura bawah (⛩️ + panah ke atas)
    const gapuraBottom = document.createElement('div');
    gapuraBottom.className = 'gapura-container';
    gapuraBottom.innerHTML = `
        <div class="gapura-icon">⛩️</div>
        <div class="gapura-arrow">⬆️</div>
    `;
    leftParent.insertBefore(gapuraBottom, leftParent.children[idxLeft + 1]);

    // Buat gapura atas (panah ke bawah + ⛩️)
    const gapuraTop = document.createElement('div');
    gapuraTop.className = 'gapura-container';
    gapuraTop.innerHTML = `
        <div class="gapura-arrow">⬇️</div>
        <div class="gapura-icon">⛩️</div>
    `;
    rightParent.insertBefore(gapuraTop, rightParent.children[idxRight]);

    // Buat garis penghubung (connector) di jalan
    const road = document.getElementById("road");
    const connector = document.createElement("div");
    connector.className = "gapura-connector";
    road.appendChild(connector);
}

// Tambah gapura lintas jalan antara 57-58 (bawah) dan 145-146 (atas)
insertGapuraLintasJalan(leftSide, rightSide, 57, 146);
function placeSungaiBelowLapak(parent, targetNum) {
    const target = Array.from(parent.children)
        .find(c => c.textContent == String(targetNum));

    if (!target) return;

    // ambil posisi lapak 62
    const rect = target.getBoundingClientRect();
    const containerRect = parent.getBoundingClientRect();

    // buat elemen sungai
    const sungai = document.createElement("div");
    sungai.className = "sungai-bawah";
    sungai.innerHTML = "🌉 Sungai";

    // hitung posisi absolute (relative ke parent)
    sungai.style.left = (rect.left - containerRect.left) + "px";
    sungai.style.top = (rect.bottom - containerRect.top + 5) + "px";

    parent.style.position = "relative"; // biar posisi absolute bisa dipakai
    parent.appendChild(sungai);
}

// panggil untuk lapak 62
placeSungaiBelowLapak(leftSide, 62);
