document.addEventListener('DOMContentLoaded', () => {

    // --- BAGIAN LOADING SCREEN ---
    const loader = document.getElementById('loader');
    const progressBar = document.getElementById('progress-bar');
    const progressPercent = document.getElementById('progress-percent');
    const gameboyContent = document.getElementById('gameboy-content');
    const backgroundSound = document.getElementById('background-sound');
    let width = 0;
    const interval = setInterval(fill, 40);

    function fill() {
        if (width >= 100) {
            clearInterval(interval);
            setTimeout(() => {
                loader.style.opacity = '0';
                setTimeout(() => {
                    loader.classList.add('hidden');
                    gameboyContent.classList.remove('hidden');
                    gameboyContent.style.opacity = '1';
                    backgroundSound.play().catch(error => console.log("Autoplay background sound dicegah browser."));
                }, 500);
            }, 500);
        } else {
            width++;
            progressBar.style.width = width + '%';
            progressPercent.innerHTML = width + '%';
        }
    }

    // --- ELEMEN UTAMA ---
    const screens = document.querySelectorAll('.screen-content');
    const btnStart = document.getElementById('btn-start');
    const btnMessage = document.getElementById('btn-message');
    const btnGallery = document.getElementById('btn-gallery');
    const btnMusic = document.getElementById('btn-music');

    // --- LOGIKA PESAN ---
    const messageTextElement = document.getElementById('message-text-target');
    const btnSkip = document.getElementById('btn-skip');
    const btnNextGalleryInMessage = document.getElementById('btn-next-gallery');
    const btnBackInMessage = document.getElementById('btn-back');
    const fullMessage = "Hai sayaangg,\n\nHappy birthday yaa!\n\n hari ini tentu hari yang sangat berarti buat caa, doa abang semoga sehat selalu lancar-lancar kuliahnyaa, dilancarkan semua urusannya dan hal-hal baik selalu menyertai ca yaa sayangg.\n\n abang minta maaf yaa belum bisa kasi kado yang spesial buat caa, tapi insyaallah doa terbaik akan selalu menyertai caa, sekali lagi minta maaf yaa.\n\n terimakasi sudaa hadir di hidup bang yaa, teruslaa jadi orang baik yaa sayangg, terimakasi sudaa terima bang dengan sangat baik. sekali lagi maaf dan terimakasih yaa sayangg.\n\n selamat ulang tahun yaaa sayang🌼🤍";
    let isTyping = false, typingTimeout;
    function finishTyping() { isTyping = false; clearTimeout(typingTimeout); messageTextElement.innerHTML = fullMessage.replace(/\n/g, '<br>'); btnSkip.classList.add('hidden'); btnNextGalleryInMessage.classList.remove('hidden'); btnBackInMessage.classList.remove('hidden'); }
    function startTypewriter() { messageTextElement.innerHTML = ""; btnSkip.classList.remove('hidden'); btnNextGalleryInMessage.classList.add('hidden'); btnBackInMessage.classList.add('hidden'); isTyping = true; let i = 0; const speed = 50; function type() { if (i < fullMessage.length) { if (fullMessage.charAt(i) === '\n') { messageTextElement.innerHTML += '<br>'; } else { messageTextElement.innerHTML += fullMessage.charAt(i); } i++; typingTimeout = setTimeout(type, speed); } else { finishTyping(); } } type(); }
    btnSkip.addEventListener('click', finishTyping);
    btnBackInMessage.addEventListener('click', () => showScreen('screen-home'));
    // PERBAIKAN: Alur navigasi Message -> Gallery
    btnNextGalleryInMessage.addEventListener('click', () => { resetGallery(); showScreen('screen-gallery'); });
    
    // --- LOGIKA GALERI FOTO ---
    const photoData = [ { src: 'img/icacantiksyekali.jpg' }, { src: 'img/2.jpg' }, { src: 'img/3.jpg' },{ src: 'img/4.jpg' },{ src: 'img/5.jpg' },{ src: 'img/6.jpg' } ];
    // PERBAIKAN: Ubah videoData agar menggunakan src untuk file lokal
    const videoData = { thumbnailText: "Clip Dump", src: 'img/vid.mp4' }; 
    const photoDate = "24/06/25"; const delayPerPhoto = 1500;
    const galleryStart = document.getElementById('gallery-start'); const galleryPhotobox = document.getElementById('gallery-photobox'); const galleryStatus = document.getElementById('gallery-status'); const galleryGrid = document.getElementById('gallery-grid'); const btnMulaiCetak = document.getElementById('btn-mulai-cetak'); const btnPrintAgain = document.getElementById('btn-print-again'); const btnGalleryNext = document.getElementById('btn-gallery-next'); const btnGalleryBack = document.getElementById('btn-gallery-back');
    function resetGallery() { galleryStart.classList.remove('hidden'); galleryPhotobox.classList.add('hidden'); galleryGrid.innerHTML = ""; }
    function startPrinting() {
        galleryStart.classList.add('hidden');
        galleryPhotobox.classList.remove('hidden');
        btnPrintAgain.classList.add('hidden');
        galleryGrid.innerHTML = "";
        photoData.forEach((photo, index) => {
            setTimeout(() => {
                galleryStatus.innerText = `Mencetak foto ${index + 1} dari ${photoData.length}...`;
                const strip = document.createElement('div');
                strip.className = 'photostrip';
                strip.innerHTML = `<img src="${photo.src}" alt="Photo ${index + 1}"><div class="info"><span class="photo-number"># ${index + 1}</span><span class="photo-date">${photoDate}</span></div>`;
                galleryGrid.appendChild(strip);
                setTimeout(() => strip.classList.add('reveal'), 50);
            }, index * delayPerPhoto);
        });
        const totalDuration = photoData.length * delayPerPhoto;
        setTimeout(() => {
            galleryStatus.innerText = `Menyusun klip video...`;
            const videoStrip = document.createElement('div');
            videoStrip.className = 'photostrip';
            // PERBAIKAN: onclick sekarang membuka file lokal dari properti 'src'
            videoStrip.innerHTML = `<div class="video-thumb" onclick="window.open('${videoData.src}', '_blank')"><span class="play-icon">▶</span><span>Klik untuk memutar video</span></div><div class="info"><span class="photo-number">${videoData.thumbnailText}</span><span class="photo-date">${photoDate}</span></div>`;
            galleryGrid.appendChild(videoStrip);
            setTimeout(() => videoStrip.classList.add('reveal'), 50);
            galleryStatus.innerText = `Selesai!`;
            btnPrintAgain.classList.remove('hidden');
        }, totalDuration);
    }
    btnMulaiCetak.addEventListener('click', startPrinting); btnPrintAgain.addEventListener('click', resetGallery);
    // PERBAIKAN: Alur navigasi Gallery -> Music
    btnGalleryNext.addEventListener('click', () => { showScreen('screen-music'); });
    btnGalleryBack.addEventListener('click', () => { showScreen('screen-home'); });

    // --- LOGIKA MUSIC PLAYER ---
    const mainPlayer = document.getElementById('music-player-audio');
    const albumArt = document.getElementById('album-art');
    const songTitle = document.getElementById('song-title');
    const songArtist = document.getElementById('song-artist');
    const currentTimeEl = document.getElementById('current-time');
    const totalDurationEl = document.getElementById('total-duration');
    const progressBarWrapper = document.getElementById('progress-bar-wrapper');
    const progressBarFill = document.getElementById('progress-bar-fill');
    const btnPrev = document.getElementById('btn-prev');
    const btnPlayPause = document.getElementById('btn-play-pause');
    const btnNext = document.getElementById('btn-next');
    const playlistContainer = document.getElementById('playlist-container');
    const btnMusicNext = document.getElementById('btn-music-next');
    const btnMusicBack = document.getElementById('btn-music-back');

    const playlistData = [
        { title: "Robbers", artist: "The 1975", src: "music/1. Iframe The 1975 - Robbers [wjHgiSx0RNQ].mp3", albumArt: "music/lagu1.png" },
        { title: "About You", artist: "The 1975", src: "music/2. Iframe The 1975 - About You (Official) [tGv7CUutzqU].mp3", albumArt: "music/lagu2.png" },
        { title: "I'd like to watch you sleeping", artist: "Sal Priadi", src: "music/3. Iframe I'd like to watch you sleeping [8P2p97pYCv8].mp3", albumArt: "music/lagu3.png" },
        { title: "Sekali Lagi", artist: "Ipang Lazuardi", src: "music/4. Iframe IPANG LAZUARDI - SEKALI LAGI (OFFICIAL LYRIC VIDEO) [MEEf9zjCGuk].mp3", albumArt: "music/lagu4.png" },
        { title: "Autumn", artist: "NIKI", src: "music/5. Iframe NIKI - Autumn (Official Lyric Video) [toHJ3yp4TY8].mp3", albumArt: "music/lagu5.png" },
        { title: "Anything You Want", artist: "Reality Club", src: "music/6. Iframe Reality Club - Anything You Want (Official Lyric Video) [FKijnRja8is].mp3", albumArt: "music/lagu6.png" },
        { title: "Mawar Jingga", artist: "Juicy Luicy", src: "music/7. Iframe Juicy Luicy - Mawar Jingga (Official Lyric Video) [UZ9l9jkrG30].mp3", albumArt: "music/lagu7.png" },
        { title: "If You Know That I'm Lonely", artist: "Iframe FUR", src: "music/8. Iframe FUR - If You Know That I'm Lonely (Official Video) [IXllKXhFMEs].mp3", albumArt: "music/lagu8.png" },
        { title: "Nina", artist: ".Feast", src: "music/9. Iframe .Feast - Nina (Official Lyric Video) [iQo-8wx0l0Y].mp3", albumArt: "music/lagu9.png" },
        { title: "Interaksi", artist: "Tulus", src: "music/10. Iframe TULUS - Interaksi (Official Lyric Video) [GIy9ZbH0sHo].mp3", albumArt: "music/lagu10.png" }
    ];

    let currentSongIndex = 0;
    let isPlayingMusic = false;

    function loadSong(song) { songTitle.textContent = song.title; songArtist.textContent = song.artist; albumArt.src = song.albumArt; mainPlayer.src = song.src; mainPlayer.onloadedmetadata = () => { totalDurationEl.textContent = formatTime(mainPlayer.duration); }; }
    function playSong() { isPlayingMusic = true; backgroundSound.pause(); mainPlayer.play(); btnPlayPause.textContent = '❚❚'; }
    function pauseSong() { isPlayingMusic = false; mainPlayer.pause(); backgroundSound.play().catch(e => console.log("Backsound dicegah")); btnPlayPause.textContent = '▶'; }
    function prevSong() { currentSongIndex = (currentSongIndex - 1 + playlistData.length) % playlistData.length; loadSong(playlistData[currentSongIndex]); playSong(); updatePlaylistUI(); }
    function nextSong() { currentSongIndex = (currentSongIndex + 1) % playlistData.length; loadSong(playlistData[currentSongIndex]); playSong(); updatePlaylistUI(); }
    function updateProgress(e) { const { duration, currentTime } = e.srcElement; const progressPercent = (currentTime / duration) * 100; progressBarFill.style.width = `${progressPercent}%`; currentTimeEl.textContent = formatTime(currentTime); }
    function formatTime(seconds) { const minutes = Math.floor(seconds / 60); const secs = Math.floor(seconds % 60); return `${minutes}:${secs < 10 ? '0' : ''}${secs}`; }
    function setProgress(e) { const width = this.clientWidth; const clickX = e.offsetX; const duration = mainPlayer.duration; mainPlayer.currentTime = (clickX / width) * duration; }
    function generatePlaylist() { playlistContainer.innerHTML = ''; playlistData.forEach((song, index) => { const songEl = document.createElement('div'); songEl.classList.add('playlist-item'); songEl.innerHTML = `<span class="title">${index + 1}. ${song.title}</span>`; songEl.addEventListener('click', () => { currentSongIndex = index; loadSong(playlistData[currentSongIndex]); playSong(); updatePlaylistUI(); }); playlistContainer.appendChild(songEl); }); }
    function updatePlaylistUI() { const playlistItems = document.querySelectorAll('.playlist-item'); playlistItems.forEach((item, index) => { item.classList.toggle('active', index === currentSongIndex); }); }

    btnPlayPause.addEventListener('click', () => (isPlayingMusic ? pauseSong() : playSong()));
    btnPrev.addEventListener('click', prevSong);
    btnNext.addEventListener('click', nextSong);
    mainPlayer.addEventListener('timeupdate', updateProgress);
    mainPlayer.addEventListener('ended', nextSong);
    progressBarWrapper.addEventListener('click', setProgress);
    // PERBAIKAN: Alur navigasi Music -> Home
    btnMusicNext.addEventListener('click', () => { pauseSong(); showScreen('screen-home'); });
    btnMusicBack.addEventListener('click', () => { pauseSong(); showScreen('screen-home'); });

    // --- FUNGSI DAN EVENT LISTENER UTAMA ---
    function showScreen(screenId) {
        screens.forEach(screen => { screen.classList.add('hidden'); });
        document.getElementById(screenId).classList.remove('hidden');
        if (screenId !== 'screen-music' && isPlayingMusic) {
            pauseSong();
        }
    }
    btnStart.addEventListener('click', () => { showScreen('screen-message'); startTypewriter(); });
    btnMessage.addEventListener('click', () => { showScreen('screen-message'); startTypewriter(); });
    btnGallery.addEventListener('click', () => { resetGallery(); showScreen('screen-gallery'); });
    btnMusic.addEventListener('click', () => { showScreen('screen-music'); });

    generatePlaylist();
    loadSong(playlistData[currentSongIndex]);
    updatePlaylistUI();
    gameboyContent.style.opacity = '0';
});