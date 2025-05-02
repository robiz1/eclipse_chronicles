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
            text: "<p>Selamat datang di dunia yang magis dengan penuh nuansa kegelapan, {{nama}}. Pilih karakter yang ingin kamu mainkan:</p>",
            img: "../images/opening_scene.jpg",
            options: [
                { text: "astra-the survivor (karakter laki-laki)", nextScene: "a1" },
                
            ]
        },

        // --- Alur Aria ---
        a1: {
            text: `<p>aku terbangun dari pingsan ku setelah bom nuklir di jatuhkan dari langit, ntah bagaimana aku bisa selamat.

            <p>setelah aku terbangun aku melihat banyak puing-puing dan reruntuhan bangunan di tengah kota.

            <p>kepala ku sangat pusing dan aku berusaha untuk berdiri, karena hari sudah malam dan aku harus menjadi tempat yang aman.
            
            <p> <strong>aku berpikir sejenak arah mana yang akan aku pergi</strong>`,
            img: "../images/aria_room.jpg",
            options: [
                { text: "pergi ke pusat kota", nextScene: "a2" },
                { text: "pergi ke ujung kota dekat dengan hutan", nextScene: "a3" }
            ]
        },
        a2: {
            text: `<p>aku pergi ke arah pusat kota, dan banyak bangunan yang telah runtuh.

            <p>namun untungnya ada beberapa bangunan, yang tidak sepenuhnya hancur, aku mencoba memeriksa bangunan itu, dan menemukan beberapa barang yang berguna seperti pisau dapur, korek, minyak mesin, kain dan makanan kaleng.

            <p>setelah memeriksa 1 bagunan itu, aku memeriksa bagunan lainya.

            <p>dari kejauhan aku melihat sebuah tikus yang lumayan besar dan ganas, yang berlari ke arah ku, </p>
            <p> aku mengeluar pisau dapur yang ku temukan tadi`,
            img: "../images/aria_notes.jpg",
            options: [
                { text: "mencoba untuk melawan", nextScene: "a4" },
                { text: "simpan pisau itu dan lari", nextScene: "aria_scene3" }
            ]
        },
        a3: {
            text: `<p>Aku berjalan ke ujung kota, dekat dengan hutan, tidak banyak bangunan ku temukan.

                    <p>namun banyak bangunan yang tidak sepenuhnya hancur "

                    <p>aku mencoba untuk mencari sesuatu dalam bagunan itu, dan menemukan kapak, kain, dan beberapa makanan kaleng.

                    <p>aku berpikir sepertinya bagus untuk bermalam di sini, karena bangunannya tidak sepenuhnya hancur dan masih dapat di tinggali

                    <p>lalu ku buat perapian agar tetap hangat di malam ini, setelah aku apa yang aku yang ku lakukan?`,
                    
                    
            img: "../images/kael_arrives.jpg",
            options: [
                { text: "makan dan lalu tidur", nextScene: "a4a" },
                { text: "coba jelajahi hutan", nextScene: "a3a" }
            ]
        },
        a3a: {
            text: `<p>aku mencoba menjelajahi hutan tanpa persiapan, dan mencari beberapa berry yang mungkin dapat di makan
            <p>aku merasa di dalam hutan ada sesuatu yang mengintai ku, namu aku terus menjelajahi hutan lebih dalam lagi
            <p>tapi tak ku sangka aku bertemu dengan se-ekor beruang ganas, yang sedang memandangi-ku, aku tak harus berbuat apa`,
            img: "../images/kael_talking.jpg",
            options: [
                { text: "mencoba untuk melawan", nextScene: "a3b" },
                { text: "lari dan kembali ke rumah", nextScene: "a3b" },
            ]
        },
        a3b: {
            text: `<p>aku mengambil posisi bersiap untuk bertarung, dengan kapak di tangan-ku
            <p> aku berlari ke arahn-nya, dan menhujam kan kapak ke arah bawah seperti kilat, mencabik bahu beruang itu
            <p> namun beruang dapat masih dapat melawan, dan mencakar badan-ku, lalu beruang itu mencabik badan-ku
            <p> aku berteriak kesakitan meminta tolong, aku mulai pusing dan pandangan ku mulai gelap.
            
            <p> tidak kemudia {{nama}} tewas terbunuh oleh beruang`,
            img: "../images/kael_thinking.jpg",
            options: [
                { text: "sad ending", nextScene: "sad ending" },
            ]
        },
        a4: {
            text: `<p>aku melawanya dengan tenaga yang seadanya, aku menusuk seperti ular, pisau melesat masuk-keluar dari perut tikus mutan itu sebelum darah sempat mengucur.
            <p>Suara pisau menembus daging seperti mengiris daging mentah—cepat, basah, dan jijik.
            <p>namun tikus mutan itu melawan dengan mecakar pergelagan tangan ku.
            <p>darah mengalir dari pergelangan tangan ku dan membasahi lengan baju ku.
            <p>aku menarik pisau keluar dan menyambar ke samping—sepotong kilat logam menyayat leher tikus mutan itu, 
            <p> darah terus mengucur deras dari leher tikus itu, tikus itu meronta kesakitan dan tidak berapa lama kemudian, tikus itu diam dan mati kehabisan darah
            <p>Kaki-ku gemetar seperti agar-agar, lalu aku terjatuh di samping mayat itu, napasx     terengah-engah seperti ikan yang terdampar dan lalu pingsan`,
            img: "../images/ruins_scene.jpg",
            options: [
                { text: "ke-esokan harinya", nextScene: "a6" },
                
            ]
        },
        a4a: {
            text: `<p>aku memakan makanan kaleng dan lalu tidur`,
            img: "../images/ruins_scene.jpg",
            options: [
                { text: "ke-esokan harinya", nextScene: "a5" }
            ]
        },
        a5: {
            text: `<p>aku bangun dengan keadaan segar dan badan ku terasa lebih bertenaga,
            <p> aku keluar dari bangunan itu dan berkeliling sekitar ujung kota ini
            <p> dari arah kejauhan, ada sebuah rumah yang tampak sangat bersih
            <p> sepertinya ada kehidupan di rumah itu`,
            img: "../images/mystery_man_appears.jpg",
            options: [
                { text: "pergi dan lihat rumah itu", nextScene: "a5a" },
                { text: "lihat rumah itu dari kejauhan", nextScene: "a5b" },
            ]
        },
        a6: {
            text: `<p>aku bangun dari tidur ku, namun tenaga ku tidak begitu banyak karena pertempuran semalam
            <p> aku mencoba mencari barang yang ada di pusat kota ini
            <p> setelah berkeliling di semua bangunan puat kota
            <p> tiba-tiba Sebilah anak panah menyambar dari balik puing-puing bangunan, meleset sejengkal dari pelipisku - aku mendengar whoosh udara yang terbelah sebelum tok! diding di belakangku tertancap mata panah berkarat."
            <p>Bulu ekor panah masih bergetar seperti lebah yang baru menyengat.
            <p> "hei kau yang disana, apa yang kau lakukan, tunjukan dirimu jika tidak aku akan membunuhmu" ucap seseorang dengan suara yang halus namun tinggi`,
            img: "../images/truth_revealed.jpg",
            options: [
                { text: "tunjukan diri", nextScene: "a6a" },
                { text: "Tetap waspada dan tenang", nextScene: "a6b" },
            ]
        },
        a5a: {
            text: `<p>aku berjalan kearah rumah itu, dan tidak melihat tanda2 kehidupan di dalam rumah itu
            <p> aku mencoba masuk ke dalam rumah itu, namun pintu rumah itu terkunci
            <p> ku hancur pintu itu dengan kapak yang ku temukan
            <p> tidak lama kemudian sebuah suara langkah kaki terdengar dalam suara rumah, dan lalu aku bersembunyi dalam rumah itu
            <p> tidak lama kemudia seorang wanita muda dengan sebuah pisau di tangannya, yang sedang berwaspada.`,
            img: "../images/aria_captured.jpg",
            options: [
                { text: "sergap dari belakang", nextScene: "a7a" },
                { text: "menunjukan diri", nextScene: "a7b" },
            ]
        },

        a5b: {
            text: `<p>tidak berapa lama kemudian, dari kejauhan aku melihat seorang wanita muda berjalan dan masuk kedalam rumah itu
            <p> aku mendekati rumah itu, dan berteriak minta tolong, namun bukan sebuah pertolongan yang ku dapati namun sebuah ancaman`,
            img: "../images/aria_captured.jpg",
            options: [
                { text: "angkat tangan", nextScene: "a8a" },
                { text: "melarikan diri", nextScene: "a8b" },
            ]
        },

        a6a: {
            text: `<p>Tanganku naik perlahan, telapak terbuka ke depan - bahasa universal 'aku tak bersenjata'. Lutut menyentuh tanah, debu menempel di celana. Kepala menunduk, tapi mataku tetap melirik ke atas, mengawasi setiap gerakan musuh.
            'Aku menyerah,' suaraku datar, sengaja dibuat tanpa emosi agar tak memicu kekerasan lebih jauh.
            <p>"aku hanya mencari makanan dan beberapa barang, tolong jangan bunuh aku" ucap {{nama}} dengan datar, dan ter-nyata yang ku lihat seorang wanita muda berparas cantik dengan badan yang atletis dan sedikit berotot, tatapanya tajam dan dingin.
            <p>Ia menendang tulang rusukku untuk memastikan penyerahan tulus. 'Bagus,' bisiknya sambil menginjak tanganku. 'Anjing patuh memang pantas dapat hadiah.'`,
            img: "../images/aria_captured.jpg",
            options: [
                { text: "slave ending", nextScene: "slave_ending" },
            ]
        },

        a6b: {
            text: `<p>Tubuhku bereaksi sebelum otak memproses
            <p> aku membungkuk rendah, dan bersembunyi di antara puing-puing bangunan.
            <p>sebuah pecahanan batu kecil dari puing-puing rumah, aku mengambilnya dan Melemparkannya ke arah sumber panah sambil teriak, 'Tampakkan dirimu juga, pengecut!'
            <p>jantung-ku berdetak dengan sangat kencang, sekarang setiap indra bekerja overdrive, dari yang ku lihat sepertinya anak panah ini berasal dari arah barat laut.
            <p>Aku membungkuk serendah mungkin, berlari zigzag seperti kelinci dikejar serigala. Panah pertama meleset - kudengar thuk! saat ia menancap di puingpuing bangunan di belakangku.
            <p>'Sekarang!' Aku maju brutal, memanfaatkan 4 detik emasnya menggapai anak panah baru." `,
            img: "",
            options: [
                {text: "buat luka sayatan kecil", nextScene: "domination_ending"},
                {text: "buat dia pingsan", nextScene: "true_ending"}
            ]
        },

        a7a: {
            text: `<p>Kapak bergerak mendekat, sisi tajamnya hampir menempel di jaket korban. 'Aku tidak butuh tenagamu,' bisik si {{nama}}, 'tapi kau punya sesuatu yang kuinginkan.
            <p>Korban membeku. Darahnya berdesir dingin—ia bisa merasakan ketajaman kapak itu tanpa perlu melihat. Sedikit saja ia menoleh, logam itu akan mencukur rambutnya.
            <p>"turunkan senjata-mu, dan yang kuingin hanyalah makanan dan minuman, atau bekerja sama lah dengan ku" ucap {{nama}} dengan kapak di tangan-nya
            <p>"tolong jangan bunuh aku, akan ku berikan makananku, dan dari mana kau berasal?" ucap wanita itu.`,
            img: "../images/aria_captured.jpg",
            options: [
                { text: "turunkan senjata", nextScene: "a9a" },
                { text: "ancam dia lebih keras", nextScene: "dominatin_ending2" },
            ]
        },

        a7b: {
            text: `<p>Aku perlahan mengangkat tangan, telapak terbuka ke depan—isyarat universal 'aku tidak bersenjata'
            <p>Kubuat gerakanku lambat, sambil mundur selangkah memberi ruang. 'Aku tidak ingin masalah,' kataku, suara sengaja dibuat datar, tidak memancing.
            <p>"Kita tidak harus bertarung. Aku cari tempat aman, sama seperti kamu." ucap ku sambil mengangkat tangan
            <p>wanita itu melirik ke pintu, lau kembali kepadaku, 'siapa kau, mengapa masuk ke rumah ku?' suaranya kasar. pisau di ikat pinggangnya berkilat
            <p>"aku hanya mengira rumah ini sudah di tinggali, aku hanya ingin mencari makan" ucap ku dengan suara tenang mengendalikan situasi
            <p>Napasnya masih berat, tapi bahunya sedikit turun. 'apakah kamu tidak membawa senjata?' tanyanya, masih curiga.
            <p>"ada, namun ku gunakan untuk menhacurkan pintu" ucapku dengan jujur
            <p> wanita itu mulai menurukan senjatanya, dan mengajakku berkenalan`,
            img: "../images/aria_captured.jpg",
            options: [
                { text: "perkenalkan diri", nextScene: "a9a" },
            ]
        },

        a8a: {
            text: `<p>Tanganku melonjak ke atas secepat tersetrum, telapak tangan terbuka. 'Aku tak bersenjata!' suaraku lebih tinggi dari biasanya. Lutut hampir tertekuk sendiri - bukan karena takut, tapi otot yang menegang lalu lemas sekaligus
            <p>"Kau bisa menggeledahku, aku tak bawa apa-apa."
            <p>wanita itu muali mendekat dan menggeledahku
            <p>"baiklah apa yang kau inginkan, jika macam akan ku bunuh" ucap wanita itu dengan nada tinggi.
            <p>"aku hanya ingin makan dan memiliki tempat tinggal yang layak" ucap diriku dengan tenang.
            <p>lalu wanita itu menurukan senjatanya, dan mempersilahkan aku memasuki rumah.`,
            img: "",
            options: [
                { text: "ikuti wanita itu", nextScene: "happy_ending"},
            ]
        },

        a8b: {
                text: `<p>"Lari!* teriak instingku. Diam! teriak rasa sakit di kaki. Aku mengabaikan keduanya, terus bergerak sambil mendengar langkah berat di belakang."
                <p>wanita itu tampak curiga padaku, namun ia membiarkan diriku lari menjauh ketakutan
                <p>tak sempat untuk meminta bantuan, diriku yang penakut ini sangat akan kematian, nth apa yang akan terjadi di depan, aku hanya berharap agar tetap bisa hidup dengan tenang`,
                img: "",
                options: [
                    {text: "fear ending", nextScene: "fear_ending"}
                ]
        },

        a9a: {
            text:`<p>aku adalah seorang penyintas.
            <p>aku sedang mencari makanan namun aku tidak menemukan apa pun 
            <p>hingga akhirnya aku menemukan rumah ini menyala dan sanngat terawat
            <p>namun tuan rumah sedikit tidak percaya dan menatapku dengan sangat tajam, dia masih terlihat waspada`,
            img: "",
            options: [
                {text: "coba berusaha meyakinkan", nextScene: "happy_ending"}
            ]
        },        

        sad_ending: {
            text: `<h2> sad-ending
            <p>{{nama}} mati terbunuh oleh beruang, dan mayatnya di makan oleh beruang itu tampa sisa sedikit pun`,
            img: "",
            options: [
                {text:"ulangi permainan", nextScene: "scene1"}
            ]
        },

        happy_ending: {
            text: `<h2> happy-ending
            <p>wanita itu mulai mempercayai {{nama}},tidak lama kemudian kami saling jatuh cinta, dan hidup bersama hingga maut memisahkan`,
            img: "",
            options: [
                {text: "ulangi permainan", nextScene: "scene1"}
            ]
        },

        slave_ending: {
            text: `<h2> slave-ending
            <p>{{nama}} terlalu lemah, bahkan di tundukan oleh seorang wanita, dan di jadikan budak oleh wanita tersebut`,
            img:"",
            options:[
                {text: "ulangi permainan", nextScene: "scene1"}
            ]
        },

        domination_ending: {
            text: `<h2> domination-ending
            <p>pisau menyambar cepat - garis merah muncul di lengan kanannya. Tidak dalam, tapi cukup membuatnya menjerit dan menjatuhkan busur
            <p> wanita itu ketakutan, dan memohon ampun kepada {{nama}}, dan wanita di jadikan bawahan`,
            img:"",
            options:[
                {text:"ulangi permainan", nextScene:"scene1"}
            ]
        },

        true_ending:{
            text:`<h2> true_ending
            <P>Tinjuku menghantam solar plexus-nya, saat ia lengah menarik tali busur. Napasnya tercekat - matanya membelalak sebelum tubuhnya rubuh seperti karung gandum.
            <p>{{nama}} membawa wanita itu ketempat yang lebih aman, dan menunggunya bangun.
            <p> tidak berapa lama kemudian wanita itu terbangun, dan kami berkenalan untuk tujuan yang sama yaitu memecahkan misteri di dunia ini`,
            img:"",
            options:[
                {text:"ulangi permainan", nextScene:"scene1"}
            ]

        },

        fear_ending:{
            text:`<h2> fear_ending
            <p>{{nama}} lari ketakutan dan masih belum siap menghadapi dunia ini, dan {{nama}} mati kelaparan karena ketakutan yang sangat mendalam dan membuat dirinya begitu truama`,
            img:"",
            options:[
                {text:"ulangi permainan", nextScene:"scene1"}
            ]
        },

        domination_ending2: {
            text:`<h2> domination-ending-2
            <p>{{nama}} mengancam wanita itu hingga ketakutan dan berlutut meminta ampun, dan akan menuruti semua kemauan {{nama}}`,
            img:"",
            options:[
                {text:"ulangi permainan", nextScene:"scene1"}
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
