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

// ===== Helper =====
function splitNama(nama) {
    const match = nama.match(/^(.*?)\s*\((.*?)\)$/);
    return match ? { pemilik: match[1].trim(), jualan: match[2].trim() } : { pemilik: nama.trim(), jualan: "" };
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
function hideTooltip() { tooltip.classList.remove("show"); tooltip.style.opacity = 0; }

const lapakDataMap = {};

// ===== Tooltip =====
function showTooltip(e, info) {
    const container = document.getElementById('scrollContainer');
    const containerRect = container.getBoundingClientRect();
    const targetRect = e.target.getBoundingClientRect();

    let x = targetRect.left - containerRect.left + container.scrollLeft + targetRect.width/2;
    let yTop = targetRect.top - containerRect.top + container.scrollTop - 8;
    let yBottom = targetRect.bottom - containerRect.top + container.scrollTop + 8;

    if (!info || !info.nama) {
        tooltip.innerHTML = `Lapak #${info?.num || ''}`;
    } else {
        const { pemilik, jualan } = splitNama(info.nama);
        tooltip.innerHTML = `Lapak #${info.num}: ${pemilik}` +
            (jualan ? `<br><small>${jualan}</small>` : "");
    }

    tooltip.style.left = `${x - tooltip.offsetWidth/2}px`;
    tooltip.style.top = `${yTop - tooltip.offsetHeight}px`;
    tooltip.classList.add("show");

    if (tooltip.offsetTop < container.scrollTop) {
        tooltip.style.top = `${yBottom}px`;
        tooltip.style.setProperty("--tooltip-arrow-dir", "up");
    } else {
        tooltip.style.setProperty("--tooltip-arrow-dir", "down");
    }
}

// ===== Foto Lapak =====
const lapakPhotos = {
    2: 'images/lapak2.jpg', 3: 'images/lapak3.jpg', 11: 'images/lapak11.jpg', 29: 'images/lapak29.jpg',
    37: 'images/lapak37.jpg', 51: 'images/lapak51.jpg', 57: 'images/lapak57.jpg', 61: 'images/lapak61.jpg',
    70: 'images/lapak70.jpg', 83: 'images/lapak83.jpg', 84: 'images/lapak84.jpg', 86: 'images/lapak86.jpg',
    99: 'images/lapak99.jpg', 101: 'images/lapak101.jpg', 124: 'images/lapak124.jpg', 137: 'images/lapak137.jpg',
    139: 'images/lapak139.jpg', 140: 'images/lapak140.jpg', 145: 'images/lapak145.jpg', 151: 'images/lapak151.jpg',
    153: 'images/lapak153.jpg', 157: 'images/lapak157.jpg', 163: 'images/lapak163.jpg', 168: 'images/lapak168.jpg',
    194: 'images/lapak194.jpg', 200: 'images/lapak200.jpg', 214: 'images/lapak214.jpg'
};

// ===== Buat Lapak & Pasang Event =====
function makeLapak(num) {
    const d = document.createElement('div');
    d.className = 'lapak';
    d.textContent = num;
    return d;
}

function attachLapakEvents() {
    document.querySelectorAll('.lapak').forEach(el => {
        const num = el.textContent;
        const info = lapakDataMap[num];

        // Warna background
        if (!info) el.style.backgroundColor = '#4CAF50';         // Kosong
        else if (!info.bayar) el.style.backgroundColor = '#F44336'; // Belum bayar
        else el.style.backgroundColor = '#2196F3';               // Terisi

        // Tooltip
        el.addEventListener('mouseenter', e => showTooltip(e, info ? {...info,num} : {num}));
        el.addEventListener('mousemove', e => showTooltip(e, info ? {...info,num} : {num}));

        // Modal
        el.addEventListener('click', () => {
            modal.style.display = 'flex';
            if (lapakPhotos[num]) {
                modalImg.style.display = 'block';
                modalImg.src = lapakPhotos[num];
            } else {
                modalImg.style.display = 'none';
            }

            caption.innerHTML = info?.nama
                ? `<strong>Lapak #${num}: ${info.nama}</strong><br><small>Ukuran: 18 cm</small>`
                : `<strong>Lapak #${num} (Kosong)</strong><br><small>Ukuran: 18 cm</small>`;
        });

        if (lapakPhotos[num]) el.classList.add('has-photo');
    });
}

// ===== Tutup Modal =====
modalClose.addEventListener('click', () => modal.style.display = 'none');
window.addEventListener('click', e => { if (e.target === modal) modal.style.display = 'none'; });

// ===== Ambil Data & Render =====
fetchLapakData().then(data => {
    data.forEach(lapak => lapakDataMap[lapak.no] = lapak);
    attachLapakEvents();
});
