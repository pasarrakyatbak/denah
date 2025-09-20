// Contoh data lapak
const dataLapak = {
    1: { nama: "Budi", dagangan: "Sayur Mayur" },
    2: { nama: "Ani", dagangan: "Pakaian" },
    194: { nama: "Rina", dagangan: "Buah-buahan" },
    200: { nama: "Joko", dagangan: "Ikan Segar" }
};

// Generate lapak kiri
const lapakKiri = document.getElementById("lapak-kiri");
for (let i = 1; i <= 193; i++) {
    const div = document.createElement("div");
    div.textContent = i;
    div.addEventListener("click", () => showDetail(i));
    lapakKiri.appendChild(div);
}

// Generate lapak kanan
const lapakKanan = document.getElementById("lapak-kanan");
for (let i = 194; i <= 216; i++) {
    const div = document.createElement("div");
    div.textContent = i;
    div.addEventListener("click", () => showDetail(i));
    lapakKanan.appendChild(div);
}

// Modal
const modal = document.getElementById("modal");
const modalTitle = document.getElementById("modal-title");
const modalBody = document.getElementById("modal-body");
const closeBtn = document.getElementById("close-btn");

function showDetail(no) {
    modal.style.display = "flex";
    if (dataLapak[no]) {
        modalTitle.textContent = `Lapak ${no}`;
        modalBody.innerHTML = `
      <b>Nama:</b> ${dataLapak[no].nama}<br>
      <b>Dagangan:</b> ${dataLapak[no].dagangan}
    `;
    } else {
        modalTitle.textContent = `Lapak ${no}`;
        modalBody.textContent = "Belum ada data pemilik.";
    }
}

closeBtn.onclick = () => modal.style.display = "none";
window.onclick = (e) => { if (e.target == modal) modal.style.display = "none"; };

// ======================
// Zoom & Geser Denah
// ======================
/ Zoom & Geser
const denahWrapper = document.querySelector(".denah-wrapper");
const denah = document.getElementById("denah");

let scale = 1;
let posX = 0, posY = 0;
let isDragging = false;
let startX, startY;

function updateTransform() {
    denah.style.transform = `translate(${posX}px, ${posY}px) scale(${scale})`;
}

// --- Zoom via tombol ---
document.getElementById("zoom-in").addEventListener("click", () => {
    scale = Math.min(scale + 0.2, 3);
    updateTransform();
});

document.getElementById("zoom-out").addEventListener("click", () => {
    scale = Math.max(scale - 0.2, 0.5);
    updateTransform();
});

document.getElementById("zoom-reset").addEventListener("click", () => {
    scale = 1;
    posX = 0;
    posY = 0;
    updateTransform();
});

// --- Zoom via scroll ---
denahWrapper.addEventListener("wheel", (e) => {
    e.preventDefault();
    scale += e.deltaY * -0.001;
    scale = Math.min(Math.max(0.5, scale), 3);
    updateTransform();
});

// Drag pakai mouse
denahWrapper.addEventListener("mousedown", (e) => {
    isDragging = true;
    startX = e.clientX - posX;
    startY = e.clientY - posY;
});
denahWrapper.addEventListener("mousemove", (e) => {
    if (!isDragging) return;
    posX = e.clientX - startX;
    posY = e.clientY - startY;
    updateTransform();
});
denahWrapper.addEventListener("mouseup", () => isDragging = false);
denahWrapper.addEventListener("mouseleave", () => isDragging = false);

// Drag pakai sentuhan (HP)
denahWrapper.addEventListener("touchstart", (e) => {
    if (e.touches.length === 1) {
        isDragging = true;
        startX = e.touches[0].clientX - posX;
        startY = e.touches[0].clientY - posY;
    }
}, { passive: false });

denahWrapper.addEventListener("touchmove", (e) => {
    if (isDragging && e.touches.length === 1) {
        posX = e.touches[0].clientX - startX;
        posY = e.touches[0].clientY - startY;
        updateTransform();
    }
}, { passive: false });

denahWrapper.addEventListener("touchend", () => isDragging = false);

// Inisialisasi transform awal
updateTransform();
