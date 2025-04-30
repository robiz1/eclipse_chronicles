window.addEventListener('DOMContentLoaded', () => {
    const dialogueText = document.getElementById("dialogue-text");
    const optionsContainer = document.getElementById("options");
    const sceneImage = document.getElementById("scene-img");
    const nameInputContainer = document.getElementById("player-name-input");
    const playerNameInput = document.getElementById("player-name");

    const saveBtn = document.getElementById("saveBtn");
    const loadBtn = document.getElementById("loadBtn");
    const newGameBtn = document.getElementById("newGameBtn");

    let playerName = "";
    let currentScene = "scene1";

    const scenes = {
        // --- Scene pembuka ---
        scene1: {
            text: "<p>Selamat datang di Nuklir dan Nektar Magis, {{nama}}. Pilih karakter yang ingin kamu mainkan:</p>",
            img: "../images/opening_scene.jpg",
            options: [
                { text: "aria-Pencari Kebenaran (Karakter Wanita)", nextScene: "aria_scene1" },
                { text: "kael-Pejuang Pemberontak (Karakter Laki-laki)", nextScene: "kael_scene1" }
            ]
        },

        // --- Alur Aria ---
        aria_scene1: {
            text: `<p>Dunia ini sudah mati. Namun harapan kecil tetap hidup di dalam mimpimu yang selalu berulang—tentang reruntuhan, sosok berjubah hitam, dan sebutir cahaya yang menolak padam.`,
            img: "../images/aria_room.jpg",
            options: [
                { text: "Periksa catatan di dinding", nextScene: "aria_scene2" },
                { text: "Keluar kamar mencari Kael", nextScene: "aria_scene3" }
            ]
        },
        aria_scene2: {
            text: `<p>Dinding kamarmu dipenuhi peta, gambar, dan simbol-simbol magis yang belum bisa kau pecahkan. Satu coretan mencolok tertulis: 'Zona Terkutuk - kebenaran menunggu`,
            img: "../images/aria_notes.jpg",
            options: [
                { text: "Bawa perlengkapan dan pergi", nextScene: "aria_scene4" },
                { text: "Tunggu Kael datang", nextScene: "aria_scene3" }
            ]
        },
        aria_scene3: {
            text: `<p>Kael tiba-tiba membanting pintu. '{{nama}}, kau harus ikut sekarang. Aku menemukannya... jejak itu nyata!`,
            img: "../images/kael_arrives.jpg",
            options: [
                { text: "Pergi sekarang juga", nextScene: "aria_scene4" },
                { text: "Tanya detail lebih lanjut", nextScene: "aria_scene3a" }
            ]
        },
        aria_scene3a: {
            text: `<p>"Jejaknya mengarah ke reruntuhan Menara Obsidian. Tapi sesuatu terasa... salah. Ada yang menunggumu di sana`,
            img: "../images/kael_talking.jpg",
            options: [
                { text: "Tetap pergi meski berbahaya", nextScene: "aria_scene4" },
                { text: "Buat rencana dulu", nextScene: "aria_scene3b" }
            ]
        },
        aria_scene3b: {
            text: `<p>"Kael mengangguk. 'Kita tidak bisa gegabah. Reruntuhan itu hidup—dan bisa memakanmu mentah-mentah.'`,
            img: "../images/kael_thinking.jpg",
            options: [
                { text: "Siapkan jebakan", nextScene: "aria_scene4" },
                { text: "Berdoa dan berangkat", nextScene: "aria_scene4" }
            ]
        },
        aria_scene4: {
            text: `<p>Zona Terkutuk - jantung kota yang hancur. Asap hitam mengalir dari celah-celah retakan bumi. Angin berbisik seolah mengingatkanmu akan masa lalu yang dilupakan`,
            img: "../images/ruins_scene.jpg",
            options: [
                { text: "Lanjutkan menyelidiki", nextScene: "aria_scene5" },
                { text: "Segera peringatkan Kael", nextScene: "aria_scene6" }
            ]
        },
        aria_scene5: {
            text: `<p>Tiba-tiba tanah bergetar. Sosok berjubah muncul dari balik kabut. 'Akhirnya kau datang... {{nama}}.`,
            img: "../images/mystery_man_appears.jpg",
            options: [
                { text: "Tanyakan bagaimana dia mengenalmu", nextScene: "aria_truth_path" },
                { text: "Serang dia karena tidak percaya", nextScene: "aria_capture_path" },
                { text: "Gunakan magis untuk baca ingatannya", nextScene: "aria_memory_path" }
            ]
        },
        aria_truth_path: {
            text: `<p>Dia mengungkapkan bahwa kalian terikat dalam eksperimen masa lalu. Kau adalah kunci, dan waktu kalian hampir habis.`,
            img: "../images/truth_revealed.jpg",
            options: [
                { text: "Bergabung dengannya", nextScene: "aria_ending1" },
                { text: "Tetap waspada", nextScene: "aria_ending2" }
            ]
        },
        aria_capture_path: {
            text: `<p>Seranganmu gagal. Sosok itu menahanmu dengan kekuatan tak terlihat. Kesadaranmu menghilang dalam kegelapan.`,
            img: "../images/aria_captured.jpg",
            options: [
                { text: "Bangun di sel tahanan", nextScene: "aria_prison_scene" }
            ]
        },

        // --- Alur Kael ---
        kael_scene1: {
            text: `<p>Zona Terkutuk selalu membuat kulitmu merinding. Tapi kali ini berbeda. Langkahmu tertarik pada satu reruntuhan: Menara Obsidian`,
            img: "../images/mc.png",
            options: [
                { text: "Periksa area sekitar", nextScene: "kael_scene2" },
                { text: "Panggil Aria untuk bergabung", nextScene: "kael_scene3" }
            ]
        },
        kael_scene2: {
            text: `<p>Di dinding reruntuhan Menara Obsidian, kau melihat simbol yang berdenyut pelan. Saat disentuh, dunia berputar`,
            img: "../images/mysterious_symbol.jpg",
            options: [
                { text: "Sentuh simbol lagi", nextScene: "kael_vision" },
                { text: "Segera cari Aria", nextScene: "kael_scene3" }
            ]
        },
        kael_vision: {
            text: `<p>Penglihatanmu semakin jelas. Seorang gadis—Aria—dalam tabung kristal. Suara-suara menyebut namamu dengan nomor eksperimen</p>`,
            img: "../images/flashback_lab.jpg",
            options: [
                { text: "Tarik diri dari penglihatan", nextScene: "kael_scene3" },
                { text: "Selami lebih dalam", nextScene: "kael_memory_reveal" }
            ]
        },
        kael_memory_reveal: {
            text: `<p>Kau ingat segalanya. Proyek Genesis. Mereka menciptakanmu... dan Aria bukan hanya teman. Dia alasanmu hidup</p>`,
            img: "../images/kael_remembers.jpg",
            options: [
                { text: "Cari Aria", nextScene: "kael_scene3" }
            ]
        },
        kael_scene3: {
            text: `<p>'aria! Kau di mana?' Aria tiba-tiba muncul dari balik puing. Matanya panik. Tapi di belakangnya, bayangan bergerak cepat`,
            img: "../images/aria_finds_kael.jpg",
            options: [
                { text: "Tunjukkan simbol padanya", nextScene: "kael_scene4" },
                { text: "Bohong dan bawa dia pergi", nextScene: "kael_lie_path" }
            ]
        },
        kael_scene4: {
            text: `<p>Tanah tiba-tiba bergetar. Ledakan! Sosok misterius melompat dan menyelamatkan kalian dari runtuhan. Dia menatapmu tajam: 'Sudah waktunya kau tahu semuanya.`,
            img: "../images/mystery_man_saves.jpg",
            options: [
                { text: "Lindungi Aria", nextScene: "kael_sacrifice_path" },
                { text: "Biarkan mereka berinteraksi", nextScene: "kael_observe_path" },
                { text: "Tanya identitas lelaki itu", nextScene: "kael_confront_path" },
                { text: "Aktifkan magis tersembunyi", nextScene: "kael_magic_reveal" },
                { text: "Ingatkan Aria pada mimpinya", nextScene: "kael_remind_path" }
            ]
        },
        kael_sacrifice_path: {
            text: `<p>Kau tarik Aria. 'Jangan dekat-dekat dia!' Energi dari telapak tanganmu meledak, melindungi tubuhnya dari proyektil bayangan."</p>`,
            img: "../images/kael_protects.jpg",
            options: [
                { text: "Terus tembak", nextScene: "kael_bad_ending" },
                { text: "Gunakan magis darurat", nextScene: "kael_magic_reveal" }
            ]
        },
        kael_magic_reveal: {
            text: `<p>Dengan terpaksa, kau aktifkan simbol magis di lenganmu. Cahaya biru memancar, membentuk pola berbentuk bunga delima</p>`,
            img: "../images/kael_magic.jpg",
            options: [
                { text: "Buka ingatan yang terblokir", nextScene: "kael_full_memory" },
                { text: "Tetap waspada", nextScene: "kael_cautious_path" }
            ]
        },
        kael_full_memory: {
            text: `<p>Segalanya menjadi jelas. Kau, Aria, dan Dante diciptakan dari nuklir dan magis. Tapi hanya satu dari kalian yang bisa bertahan di akhir.</p>`,
            img: "../images/lab_escape.jpg",
            options: [
                { text: "Bergabung dengan Dante", nextScene: "kael_redemption_ending" },
                { text: "Tetap tidak percaya", nextScene: "kael_reject_ending" }
            ]
        }
    };

    function showScene(sceneId) {
        const scene = scenes[sceneId];
        if (!scene) return;

        currentScene = sceneId;
        const personalizedText = scene.text.replace(/{{nama}}/gi, playerName);
        dialogueText.innerHTML = "";
        const p = document.createElement("p");
        p.innerHTML = personalizedText;
        dialogueText.appendChild(p);

        dialogueText.style.maxHeight = "300px";
        dialogueText.style.overflowY = "auto";

        sceneImage.src = scene.img;
        optionsContainer.innerHTML = "";
        scene.options.forEach(option => {
            const btn = document.createElement("button");
            btn.className = "btn btn-primary m-1";
            btn.textContent = option.text;
            btn.onclick = () => showScene(option.nextScene);
            optionsContainer.appendChild(btn);
        });
    }

    function startGame() {
        playerName = playerNameInput.value.trim() || "Pemain";
        nameInputContainer.style.display = "none";
        showScene("scene1");
    }

    function saveGame() {
        const data = { playerName, currentScene };
        localStorage.setItem("eclipseSave", JSON.stringify(data));
        alert("Game disimpan!");
    }

    function loadGame() {
        const data = JSON.parse(localStorage.getItem("eclipseSave"));
        if (!data) return alert("Tidak ada data.");
        playerName = data.playerName;
        currentScene = data.currentScene;
        nameInputContainer.style.display = "none";
        showScene(currentScene);
    }

    function newGame() {
        if (confirm("Mulai game baru?")) {
            playerName = "";
            currentScene = "scene1";
            nameInputContainer.style.display = "block";
            dialogueText.textContent = "";
            optionsContainer.innerHTML = "";
            sceneImage.src = "";
        }
    }

    saveBtn.addEventListener("click", saveGame);
    loadBtn.addEventListener("click", loadGame);
    newGameBtn.addEventListener("click", newGame);

    const bgMusic = document.getElementById("bgMusic");
    const unmuteBtn = document.getElementById("unmuteBtn");

    bgMusic.muted = true;
    bgMusic.play().catch(e => console.log("Autoplay blocked:", e));

    unmuteBtn.addEventListener("click", () => {
        bgMusic.muted = !bgMusic.muted;
        unmuteBtn.textContent = bgMusic.muted ? "🔇 Unmute" : "🔊 Mute";
        if (bgMusic.paused) {
            bgMusic.play().catch(e => console.log("Play failed:", e));
        }
    });

    window.startGame = startGame;
});
