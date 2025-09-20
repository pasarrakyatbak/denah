// ===== Ambil data lapak dari API =====
async function fetchLapakData() {
    showLoading();
    try {
        const res = await fetch('https://script.google.com/macros/s/AKfycby4z2qZ24SrJkcyGpybH29lSUC_3_z1LG-7wSmTzpaOEXrwjXf0Cl3hqkg95qAxPj1-/exec?action=listLapak');
        const json = await res.json();
        return json.success ? json.data : [];
    } catch (err) {
        console.error('Fetch error', err);
        return [];
    } finally {
        hideLoading();
    }
}
function splitNama(nama) {
    const match = nama.match(/^(.*?)\s*\((.*?)\)$/);
    if (match) {
        return {
            pemilik: match[1].trim(),
            jualan: match[2].trim()
        };
    }
    return { pemilik: nama.trim(), jualan: "" };
}

// ===== Element Modal & Tooltip =====
const tooltip = document.getElementById('tooltip');
const modal = document.getElementById('photoModal');
const modalImg = document.getElementById('modalImg');
const caption = document.getElementById('caption');
const modalClose = document.getElementById('modalClose');
const loading = document.getElementById('loading');
function showLoading() { loading.style.display = 'flex'; }
function hideLoading() { loading.style.display = 'none'; }
const lapakDataMap = {};
function showTooltip(e, info) {
    const tooltip = document.getElementById('tooltip');
    const container = document.getElementById('scrollContainer');
    const containerRect = container.getBoundingClientRect();
    const targetRect = e.target.getBoundingClientRect();

    let x = targetRect.left - containerRect.left + container.scrollLeft + (targetRect.width / 2);
    let yTop = targetRect.top - containerRect.top + container.scrollTop - 8;
    let yBottom = targetRect.bottom - containerRect.top + container.scrollTop + 8;

    if (!info || !info.nama) {
        tooltip.innerHTML = `Lapak #${info?.num || ''}`;
    } else {
        const { pemilik, jualan } = splitNama(info.nama);
        tooltip.innerHTML = `Lapak #${info.num}: ${pemilik}` +
            (jualan ? `<br><small>${jualan}</small>` : "");
    }

    tooltip.style.left = `${x - (tooltip.offsetWidth / 2)}px`;
    tooltip.style.top = `${yTop - tooltip.offsetHeight}px`;

    tooltip.classList.add("show");

    if (tooltip.offsetTop < container.scrollTop) {
        tooltip.style.top = `${yBottom}px`;
        tooltip.style.setProperty("--tooltip-arrow-dir", "up");
    } else {
        tooltip.style.setProperty("--tooltip-arrow-dir", "down");
    }
}



function hideTooltip() {
    const tooltip = document.getElementById('tooltip');
    tooltip.classList.remove("show");
}

function hideTooltip() {
    const tooltip = document.getElementById('tooltip');
    tooltip.style.opacity = 0;
}


// ===== Mapping Foto Lapak =====
const lapakPhotos = {
    2: 'images/lapak2.jpg', 3: 'images/lapak3.jpg', 11: 'images/lapak11.jpg', 29: 'images/lapak29.jpg',
    37: 'images/lapak37.jpg', 51: 'images/lapak51.jpg', 57: 'images/lapak57.jpg', 61: 'images/lapak61.jpg',
    70: 'images/lapak70.jpg', 83: 'images/lapak83.jpg', 84: 'images/lapak84.jpg', 86: 'images/lapak86.jpg',
    99: 'images/lapak99.jpg', 101: 'images/lapak108.jpg', 124: 'images/lapak124.jpg', 137: 'images/lapak137.jpg',
    139: 'images/lapak139.jpg', 140: 'images/lapak140.jpg', 145: 'images/lapak145.jpg', 151: 'images/lapak151.jpg',
    153: 'images/lapak153.jpg', 157: 'images/lapak157.jpg', 163: 'images/lapak163.jpg', 168: 'images/lapak168.jpg',
    194: 'images/lapak194.jpg', 200: 'images/lapak200.jpg', 214: 'images/lapak214.jpg'
};

// ===== Nomor Lapak =====
const leftNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100, 101, 102, 103, 104, 186, 187, 188, 189, 190, 191, 192, 193];
const rightNumbers = [194, 195, 196, 197, 198, 199, 200, 201, 202, 203, 204, 205, 206, 207, 208, 209, 210, 211, 212, 213, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 123, 124, 125, 126, 127, 128, 129, 130, 131, 132, 133, 134, 135, 136, 137, 138, 214, 215, 216, 139, 140, 141, 142, 143, 144, 145, 146, 147, 148, 149, 150, 151, 152, 153, 154, 155, 156, 157, 158, 159, 160, 161, 162, 163, 164, 165, 166, 167, 168, 169, 170, 171, 172, 173, 174, 175, 176, 177, 178, 179, 180, 181, 182, 183, 184, 185];

// ===== Container =====
const leftSide = document.getElementById('left-side');
const rightSide = document.getElementById('right-side');

// ===== Toggle Dark Mode =====
const toggleDark = document.getElementById('toggleDark');
toggleDark.addEventListener('change', e => {
    if (e.target.checked) document.body.classList.add('dark');
    else document.body.classList.remove('dark');
});

// ===== Buat Lapak =====
function makeLapak(num) {
    const d = document.createElement('div');
    d.className = 'lapak';
    d.textContent = num;
    return d;
}

rightNumbers.forEach(n => rightSide.appendChild(makeLapak(n)));
leftNumbers.slice().reverse().forEach(n => leftSide.appendChild(makeLapak(n)));

// ===== Gerbang & Jalan =====
function insertGerbangBetween(parent, a, b, label = 'Jalan') {
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
insertJalan(rightSide, 156, 157);
insertJalan(rightSide, 216, 139);
insertJalan(rightSide, 163, 164);
insertJalan(rightSide, 182, 183);
insertJalan(rightSide, 185);

// ===== Pasang Tooltip & Modal =====
function attachLapakEvents() {
    document.querySelectorAll('.lapak').forEach(el => {
        const num = el.textContent;
        const info = lapakDataMap[num];

        // Warna background otomatis
        if (!info) el.style.backgroundColor = '#4CAF50';      // Kosong
        else if (!info.bayar) el.style.backgroundColor = '#F44336'; // Belum bayar
        else el.style.backgroundColor = '#2196F3';            // Terisi

        // Tooltip selalu muncul selama kursor masih di atas
        el.addEventListener('mouseenter', e => {
            showTooltip(e, info ? { ...info, num } : { num });
        });

        el.addEventListener('mousemove', e => {
            showTooltip(e, info ? { ...info, num } : { num });
        });
        el.addEventListener('click', () => {
            if (lapakPhotos[num]) {
                modal.style.display = 'flex';
                modalImg.src = lapakPhotos[num];

                if (info && info.nama) {
                    const { pemilik, jualan } = splitNama(info.nama);
                    caption.innerHTML = `Lapak #${num}: ${pemilik}` +
                        (jualan ? `<br><small>${jualan}</small>` : "");
                } else {
                    caption.textContent = `Lapak #${num} (Kosong)`;
                }
            } else {
                alert('Foto belum tersedia untuk Lapak #' + num);
            }
        });

        if (lapakPhotos[num]) el.classList.add('has-photo');
    });
}


// ===== Tutup Modal =====
modalClose.addEventListener('click', () => modal.style.display = 'none');
window.addEventListener('click', e => { if (e.target === modal) modal.style.display = 'none'; });

// ===== Ambil Data Lapak & Pasang Event =====
fetchLapakData().then(data => {
    data.forEach(lapak => lapakDataMap[lapak.no] = lapak);
    attachLapakEvents();
});
