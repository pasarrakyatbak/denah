// ====================== DATA NOMOR ======================
const leftNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25,
    26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50,
    51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75,
    76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100,
    101, 102, 103, 104, 186, 187, 188, 189, 190, 191, 192, 193];

const rightNumbers = [194, 195, 196, 197, 198, 199, 200, 201, 202, 203, 204, 205, 206, 207,
    208, 209, 210, 211, 212, 213, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117,
    118, 119, 120, 121, 122, 123, 124, 125, 126, 127, 128, 129, 130, 131, 132, 133, 134, 135, 136,
    137, 138, 214, 215, 216, 139, 140, 141, 142, 143, 144, 145, 146, 147, 148, 149, 150, 151, 152,
    153, 154, 155, 156, 157, 158, 159, 160, 161, 162, 163, 164, 165, 166, 167, 168, 169, 170, 171,
    172, 173, 174, 175, 176, 177, 178, 179, 180, 181, 182, 183, 184, 185];

const rightSide = document.getElementById('right-side');
const leftSide = document.getElementById('left-side');

// Buat lapak dasar
function makeLapak(num) {
    const wrap = document.createElement('div');
    wrap.className = 'lapak-wrapper';
    const d = document.createElement('div');
    d.className = 'lapak';
    d.textContent = num;
    wrap.appendChild(d);
    return wrap;
}

// Generate lapak kiri & kanan
rightNumbers.forEach(n => rightSide.appendChild(makeLapak(n)));
leftNumbers.slice().reverse().forEach(n => leftSide.appendChild(makeLapak(n)));

// ====================== FUNGSI TAMBAHAN ======================

// Cari lapak wrapper by nomor
function findWrapper(parent, num) {
    return Array.from(parent.querySelectorAll('.lapak-wrapper'))
        .find(w => w.querySelector('.lapak')?.textContent == String(num));
}

// Gerbang
function insertGerbangBetween(parent, a, b, label = 'Gerbang') {
    const wrapA = findWrapper(parent, a);
    const wrapB = findWrapper(parent, b);
    if (!wrapA || !wrapB) return;
    const jalan = document.createElement('div');
    jalan.className = 'jalan-gerbang';
    jalan.textContent = label;
    parent.insertBefore(jalan, wrapB);
}
insertGerbangBetween(leftSide, 2, 3);
insertGerbangBetween(leftSide, 11, 15);

// Gapura
function insertGapura(leftParent, rightParent, a, b) {
    const wrapL = findWrapper(leftParent, a);
    const wrapR = findWrapper(rightParent, b);
    if (!wrapL || !wrapR) return;

    const gapuraL = document.createElement('div');
    gapuraL.className = 'gapura-container';
    gapuraL.innerHTML = `<div class="gapura-icon">⛩️</div><div class="gapura-arrow">⬆️</div>`;
    wrapL.insertBefore(gapuraL, wrapL.firstChild);

    const gapuraR = document.createElement('div');
    gapuraR.className = 'gapura-container';
    gapuraR.innerHTML = `<div class="gapura-arrow">⬇️</div><div class="gapura-icon">⛩️</div>`;
    wrapR.insertBefore(gapuraR, wrapR.firstChild);
}
insertGapura(leftSide, rightSide, 57, 146);

// Sungai
function placeSungaiBelow(parent, num) {
    const wrap = findWrapper(parent, num);
    if (!wrap) return;
    const sungai = document.createElement('div');
    sungai.className = 'sungai-bawah';
    sungai.textContent = 'Sungai';
    wrap.appendChild(sungai);
}

function placeSungaiAbove(parent, num) {
    const wrap = findWrapper(parent, num);
    if (!wrap) return;
    const sungai = document.createElement('div');
    sungai.className = 'sungai-atas';
    sungai.textContent = 'Sungai';
    wrap.insertBefore(sungai, wrap.firstChild);
}
placeSungaiBelow(leftSide, 62);
placeSungaiAbove(rightSide, 141);

// Tiang WiFi + Lampu
function insertTiangAbove(parent, num) {
    const wrap = findWrapper(parent, num);
    if (!wrap) return;
    const tiang = document.createElement('div');
    tiang.className = 'tiang-container';
    tiang.innerHTML = `📡<div class="tiang-label">WiFi</div>💡<div class="tiang-label">Lampu</div>`;
    wrap.insertBefore(tiang, wrap.firstChild);
}
insertTiangAbove(rightSide, 201);
insertTiangAbove(rightSide, 109);
insertTiangAbove(rightSide, 125);
insertTiangAbove(rightSide, 137);

// Jalan
function insertJalan(parent, a, b, label = 'Jalan') {
    const wrapA = findWrapper(parent, a);
    const wrapB = findWrapper(parent, b);
    if (!wrapA || !wrapB) return;
    const jalan = document.createElement('div');
    jalan.className = 'jalan-gerbang';
    jalan.textContent = label;
    parent.insertBefore(jalan, wrapB);
}
insertJalan(rightSide, 156, 157);
insertJalan(rightSide, 216, 139);
insertJalan(rightSide, 163, 164);
insertJalan(rightSide, 180, 181);

// ====================== TOOLTIP ======================
const tooltip = document.getElementById('tooltip');
function showTooltip(e, text) {
    tooltip.textContent = text;
    tooltip.style.left = e.pageX + 10 + 'px';
    tooltip.style.top = e.pageY + 10 + 'px';
    tooltip.style.opacity = 1;
}
function hideTooltip() { tooltip.style.opacity = 0; }

function attachTooltip(selector, textFn) {
    document.querySelectorAll(selector).forEach(el => {
        el.addEventListener('mouseenter', e => showTooltip(e, textFn(el)));
        el.addEventListener('mousemove', e => showTooltip(e, textFn(el)));
        el.addEventListener('mouseleave', hideTooltip);
    });
}
attachTooltip('.lapak', el => 'Lapak #' + el.textContent);
attachTooltip('.jalan-gerbang', el => 'Jalan / Gerbang: ' + el.textContent);
attachTooltip('.sungai-bawah, .sungai-atas', () => 'Sungai');
attachTooltip('.tiang-container', () => 'Tiang WiFi & Lampu');
attachTooltip('.gapura-container', () => 'Gapura Lintas Jalan');
