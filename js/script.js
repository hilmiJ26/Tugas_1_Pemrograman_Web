"use strict";

document.addEventListener("DOMContentLoaded", function () {
  // ==========================================
  // 1. LOGIN
  // ==========================================
  const loginForm = document.getElementById("loginForm");
  const errorAlert = document.getElementById("errorAlert");

  if (loginForm && errorAlert) {
    loginForm.addEventListener("submit", function (event) {
      event.preventDefault();

      errorAlert.hidden = true;
      errorAlert.textContent = "";

      const email = document.getElementById("email").value.trim().toLowerCase();

      const password = document.getElementById("password").value;

      const userFound = dataPengguna.find(function (user) {
        return user.email.toLowerCase() === email && user.password === password;
      });

      if (!userFound) {
        errorAlert.textContent =
          "Email atau password yang Anda masukkan salah.";
        errorAlert.hidden = false;
        return;
      }

      const activeUser = {
        id: userFound.id,
        nama: userFound.nama,
        email: userFound.email,
        role: userFound.role,
        lokasi: userFound.lokasi,
      };

      try {
        localStorage.setItem("activeUser", JSON.stringify(activeUser));
      } catch (error) {
        errorAlert.textContent =
          "Sesi tidak dapat disimpan. Periksa pengaturan browser.";
        errorAlert.hidden = false;
        return;
      }

      window.location.href = "dashboard.html";
    });
  }

  // ==========================================
  // 2. MODAL LOGIN
  // ==========================================
  const modal = document.getElementById("infoModal");
  const modalTitle = document.getElementById("modalTitle");
  const modalMessage = document.getElementById("modalMessage");
  const forgotBtn = document.getElementById("forgotBtn");
  const registerBtn = document.getElementById("registerBtn");
  const closeModalBtn = document.getElementById("closeModal");

  function showModal(title, message) {
    if (!modal || !modalTitle || !modalMessage) return;

    modalTitle.textContent = title;
    modalMessage.textContent = message;
    modal.hidden = false;
  }

  function closeModal() {
    if (modal) {
      modal.hidden = true;
    }
  }

  if (forgotBtn) {
    forgotBtn.addEventListener("click", function (event) {
      event.preventDefault();

      showModal(
        "Lupa Password",
        "Silakan hubungi administrator atau layanan akademik UT untuk bantuan reset password.",
      );
    });
  }

  if (registerBtn) {
    registerBtn.addEventListener("click", function (event) {
      event.preventDefault();

      showModal(
        "Pendaftaran Akun SITTA",
        "Pendaftaran akun dilakukan melalui sistem registrasi akademik UT. Fitur ini masih berupa simulasi.",
      );
    });
  }

  if (closeModalBtn) {
    closeModalBtn.addEventListener("click", closeModal);
  }

  if (modal) {
    modal.addEventListener("click", function (event) {
      if (event.target === modal) {
        closeModal();
      }
    });
  }

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && modal && !modal.hidden) {
      closeModal();
    }
  });

  // ==========================================
  // 3. DASHBOARD: SAPAAN DAN NAMA PENGGUNA
  // ==========================================
  const greeting = document.getElementById("greeting");
  const userName = document.getElementById("userName");
  const logoutBtn = document.getElementById("logoutBtn");

  if (greeting && userName) {
    let activeUser = null;

    try {
      activeUser = JSON.parse(localStorage.getItem("activeUser"));
    } catch (error) {
      activeUser = null;
    }

    if (!activeUser || !activeUser.nama) {
      window.location.replace("index.html");
      return;
    }

    const jam = new Date().getHours();

    if (jam >= 4 && jam < 11) {
      greeting.textContent = "Selamat pagi!";
    } else if (jam >= 11 && jam < 15) {
      greeting.textContent = "Selamat siang!";
    } else if (jam >= 15 && jam < 18) {
      greeting.textContent = "Selamat sore!";
    } else {
      greeting.textContent = "Selamat malam!";
    }

    userName.textContent = "Halo, " + activeUser.nama;
  }

  // ==========================================
  // 4. LOGOUT
  // ==========================================
  if (logoutBtn) {
    logoutBtn.addEventListener("click", function () {
      localStorage.removeItem("activeUser");
      window.location.href = "index.html";
    });
  }

  // ==========================================
  // 5. SUBMENU LAPORAN DAN NOTIFIKASI MENU
  // ==========================================
  const laporanToggle = document.getElementById("laporanToggle");
  const laporanSubmenu = document.getElementById("laporanSubmenu");

  // Buka dan tutup submenu Laporan
  if (laporanToggle && laporanSubmenu) {
    laporanToggle.addEventListener("click", function () {
      const akanDibuka = laporanSubmenu.hidden;

      laporanSubmenu.hidden = !akanDibuka;
      laporanToggle.setAttribute("aria-expanded", String(akanDibuka));

      const panah = laporanToggle.querySelector(".laporan-panah");

      if (panah) {
        panah.textContent = akanDibuka ? "⌃" : "⌄";
      }
    });
  }

  // Notifikasi untuk menu yang belum memiliki halaman
  document.querySelectorAll("[data-menu]").forEach(function (menu) {
    menu.addEventListener("click", function (event) {
      const menuName = menu.dataset.menu;

      // Kedua menu ini membuka halaman masing-masing
      if (menuName === "stok" || menuName === "tracking") {
        return;
      }

      // Submenu Laporan hanya membuka/menutup daftar
      if (menuName === "monitoring" || menuName === "rekap") {
        event.preventDefault();
        return;
      }

      // Notifikasi Histori Transaksi
      if (menuName === "histori") {
        event.preventDefault();
        alert(
          "Histori Transaksi Bahan Ajar akan dikembangkan pada tahap berikutnya.",
        );
      }
    });
  });

  // ==========================================
  // 6 INFORMASI DAN PENAMBAHAN STOK BAHAN AJAR
  // ==========================================
  const daftarBahanAjar = document.getElementById("daftarBahanAjar");
  const formBahanAjar = document.getElementById("formBahanAjar");
  const pesanStok = document.getElementById("pesanStok");
  const inputCover = document.getElementById("coverBuku");
  const previewCover = document.getElementById("previewCover");

  if (daftarBahanAjar && formBahanAjar) {
    // Menampilkan data bahan ajar
    function tampilkanBahanAjar(bahan) {
      const baris = document.createElement("tr");

      // Kolom cover buku
      const selCover = document.createElement("td");
      const gambarCover = document.createElement("img");

      gambarCover.src = bahan.cover || "";
      gambarCover.alt = "Cover " + bahan.namaBarang;
      gambarCover.className = "cover-buku";
      gambarCover.loading = "lazy";

      selCover.appendChild(gambarCover);
      baris.appendChild(selCover);

      const kolom = [
        bahan.kodeLokasi,
        bahan.kodeBarang,
        bahan.namaBarang,
        bahan.jenisBarang,
        bahan.edisi,
        bahan.stok,
      ];

      kolom.forEach(function (nilai) {
        const sel = document.createElement("td");
        sel.textContent = nilai;
        baris.appendChild(sel);
      });

      daftarBahanAjar.appendChild(baris);
    }

    // Menampilkan data awal dari data.js
    dataBahanAjar.forEach(function (bahan) {
      tampilkanBahanAjar(bahan);
    });

    // Pratinjau cover ketika pengguna memilih gambar
    if (inputCover && previewCover) {
      inputCover.addEventListener("change", function () {
        const file = inputCover.files[0];

        previewCover.hidden = true;
        previewCover.removeAttribute("src");

        if (!file) {
          return;
        }

        if (!file.type.startsWith("image/")) {
          inputCover.setCustomValidity("Pilih file gambar yang valid.");
          inputCover.reportValidity();
          inputCover.value = "";
          inputCover.setCustomValidity("");
          return;
        }

        inputCover.setCustomValidity("");

        const reader = new FileReader();

        reader.onload = function () {
          previewCover.src = reader.result;
          previewCover.hidden = false;
        };

        reader.onerror = function () {
          previewCover.hidden = true;
          alert("Gambar gagal dibaca. Silakan pilih gambar lain.");
        };

        reader.readAsDataURL(file);
      });
    }

    // Menambahkan bahan ajar baru ke tabel
    formBahanAjar.addEventListener("submit", function (event) {
      event.preventDefault();

      const bahanBaru = {
        kodeLokasi: document.getElementById("kodeLokasi").value.trim(),
        kodeBarang: document.getElementById("kodeBarang").value.trim(),
        namaBarang: document.getElementById("namaBarang").value.trim(),
        jenisBarang: document.getElementById("jenisBarang").value.trim(),
        edisi: document.getElementById("edisi").value.trim(),
        stok: Number(document.getElementById("stok").value),
      };

      if (
        !bahanBaru.kodeLokasi ||
        !bahanBaru.kodeBarang ||
        !bahanBaru.namaBarang ||
        !bahanBaru.jenisBarang ||
        !bahanBaru.edisi ||
        document.getElementById("stok").value === "" ||
        !Number.isFinite(bahanBaru.stok) ||
        bahanBaru.stok < 0
      ) {
        pesanStok.textContent = "Lengkapi semua data dengan benar.";
        pesanStok.hidden = false;
        return;
      }

      const file = inputCover.files[0];
      const reader = new FileReader();

      // Setelah gambar berhasil dibaca, tambahkan data ke tabel
      reader.onload = function () {
        bahanBaru.cover = reader.result;

        dataBahanAjar.push(bahanBaru);
        tampilkanBahanAjar(bahanBaru);

        formBahanAjar.reset();

        if (previewCover) {
          previewCover.hidden = true;
          previewCover.removeAttribute("src");
        }

        pesanStok.textContent =
          "Data bahan ajar dan cover buku berhasil ditambahkan.";
        pesanStok.hidden = false;
      };

      reader.onerror = function () {
        pesanStok.textContent =
          "Gambar gagal dibaca. Silakan pilih gambar lain.";
        pesanStok.hidden = false;
      };

      reader.readAsDataURL(file);
    });
  }

  // ==========================================
  // 7 TRACKING PENGIRIMAN
  // ==========================================
  const trackingForm = document.getElementById("trackingForm");
  const hasilTracking = document.getElementById("hasilTracking");
  const pesanTracking = document.getElementById("pesanTracking");
  const daftarPerjalanan = document.getElementById("daftarPerjalanan");
  const statusProgressFill = document.getElementById("statusProgressFill");
  const statusAktual = document.getElementById("statusAktual");

  if (
    trackingForm &&
    hasilTracking &&
    pesanTracking &&
    daftarPerjalanan &&
    statusProgressFill &&
    statusAktual
  ) {
    trackingForm.addEventListener("submit", function (event) {
      event.preventDefault();

      const nomorDO = document.getElementById("nomorDO").value.trim();
      const data = dataTracking[nomorDO];

      pesanTracking.hidden = true;
      pesanTracking.textContent = "";
      hasilTracking.hidden = true;
      daftarPerjalanan.replaceChildren();

      if (!data) {
        pesanTracking.textContent =
          "Nomor DO tidak ditemukan. Silakan periksa kembali nomor yang dimasukkan.";
        pesanTracking.hidden = false;
        return;
      }

      // Informasi pengiriman
      document.getElementById("hasilNomorDO").textContent = data.nomorDO;
      document.getElementById("hasilNama").textContent = data.nama;
      document.getElementById("hasilStatus").textContent = data.status;
      document.getElementById("hasilEkspedisi").textContent = data.ekspedisi;
      document.getElementById("hasilTanggalKirim").textContent =
        data.tanggalKirim;
      document.getElementById("hasilPaket").textContent = data.paket;
      document.getElementById("hasilTotal").textContent = data.total;

      // Menentukan tahapan status berdasarkan data DO
      const status = data.status.toLowerCase();
      let tahapAktif = 0;

      if (status.includes("selesai")) {
        tahapAktif = 3;
      } else if (
        status.includes("dalam perjalanan") ||
        status.includes("dalam pengiriman")
      ) {
        tahapAktif = 1;
      } else if (status.includes("dikirim")) {
        tahapAktif = 2;
      }

      const tahapan = document.querySelectorAll(".status-step");

      tahapan.forEach(function (tahap, indeks) {
        tahap.classList.remove("active", "completed");

        if (indeks < tahapAktif) {
          tahap.classList.add("completed");
        } else if (indeks === tahapAktif) {
          tahap.classList.add("active");
        }
      });

      // Mengisi garis progres sesuai tahapan aktif
      statusProgressFill.style.width =
        (tahapAktif / (tahapan.length - 1)) * 100 + "%";

      statusAktual.textContent = "Status saat ini: " + data.status;

      // Riwayat perjalanan dalam bentuk timeline
      data.perjalanan.reverse().forEach(function (peristiwa) {
        const item = document.createElement("div");
        item.className = "timeline-item";

        const waktu = document.createElement("div");
        waktu.className = "timeline-waktu";
        waktu.textContent = peristiwa.waktu;

        const keterangan = document.createElement("div");
        keterangan.className = "timeline-keterangan";
        keterangan.textContent = peristiwa.keterangan;

        item.appendChild(waktu);
        item.appendChild(keterangan);
        daftarPerjalanan.appendChild(item);
      });

      hasilTracking.hidden = false;
    });
  }
});
