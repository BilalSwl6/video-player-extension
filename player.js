// Professional Video Player with Audio/Subtitle Track Support
const playPath = "M8 5v14l11-7z";
const pausePath = "M6 19h4V5H6v14zm8-14v14h4V5h-4z";
const volumeUpPath = "M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z";
const volumeDownPath = "M18.5 12c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM5 9v6h4l5 5V4L9 9H5z";
const volumeMutePath = "M16.5 12c0-1.77-1.02-3.29-2.5-4.03v1.79l2.48 2.48c.01-.08.02-.16.02-.24zm-6.5 0c0 .83.26 1.65.77 2.32l1.57-1.57L10 10.5v1.5zm6.5 4.03V19c1.48-.73 2.5-2.25 2.5-4.03 0-.83-.26-1.65-.77-2.32l-1.57 1.57.77.77zm-9.14-5.56L5 7.5H3v9h2.5l3.36 3.36 1.41-1.41L7.27 15.5 6.5 14.77V9.23l.77-.77 1.86-1.86-1.41-1.41z";
const expandPath = "M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z";
const compressPath = "M5 16h3v3h2v-5H5v2zm3-8H5v2h5V5H8v3zm6 11h2v-3h3v-2h-5v5zm2-11V5h-2v5h5V8h-3z";

document.addEventListener('DOMContentLoaded', function () {
    // DOM Elements
    const videoFileInput = document.getElementById('video-file-input');
    const subtitleFileInput = document.getElementById('subtitle-file-input');
    const dropZone = document.getElementById('drop-zone');
    const browseBtn = document.getElementById('browse-btn');
    const videoTitle = document.getElementById('video-title');
    const subtitleDisplay = document.getElementById('subtitle-display');
    const playerWrapper = document.querySelector('.player-wrapper');

    // Control Elements
    const playPauseBtn = document.getElementById('play-pause-btn');
    const rewindBtn = document.getElementById('rewind-btn');
    const forwardBtn = document.getElementById('forward-btn');
    const volumeBtn = document.getElementById('volume-btn');
    const volumeSlider = document.getElementById('volume-slider');
    const subtitleBtn = document.getElementById('subtitle-btn');
    const pipBtn = document.getElementById('pip-btn');
    const fullscreenBtn = document.getElementById('fullscreen-btn');
    const openFileBtn = document.getElementById('open-file-btn');
    const lockBtn = document.getElementById('lock-btn');
    const unlockBtn = document.getElementById('unlock-btn');

    // Progress Elements
    const progressBar = document.getElementById('progress-bar');
    const progressFilled = document.getElementById('progress-filled');
    const progressHandle = document.getElementById('progress-handle');
    const currentTimeEl = document.getElementById('current-time');
    const durationEl = document.getElementById('duration');

    // Menu Elements
    const subtitleMenu = document.getElementById('subtitle-menu');

    let player;
    let subtitles = [];
    let currentSubtitleTrack = -1;
    let hideControlsTimeout;
    let controlsLocked = false;

    // Initialize Video.js
    player = videojs('video-player', {
        controls: false,
        autoplay: false,
        preload: 'auto'
    });

    // File Input Handlers
    videoFileInput.addEventListener('change', handleVideoFile);
    subtitleFileInput.addEventListener('change', handleSubtitleFile);
    browseBtn.addEventListener('click', () => videoFileInput.click());
    openFileBtn.addEventListener('click', () => videoFileInput.click());

    // Drag and Drop
    dropZone.addEventListener('click', () => videoFileInput.click());

    document.addEventListener('dragover', (e) => {
        e.preventDefault();
        dropZone.classList.add('drag-over');
    });

    document.addEventListener('dragleave', () => {
        dropZone.classList.remove('drag-over');
    });

    document.addEventListener('drop', (e) => {
        e.preventDefault();
        dropZone.classList.remove('drag-over');
        const files = Array.from(e.dataTransfer.files);
        const videoFile = files.find(f => f.type.startsWith('video/'));
        if (videoFile) {
            loadVideo(videoFile);
        }
    });

    // Play/Pause
    playPauseBtn.addEventListener('click', () => {
        showControls();
        togglePlayPause();
    });
    player.on('click', () => {
        showControls();
        togglePlayPause();
    });

    function togglePlayPause() {
        if (player.paused()) {
            player.play();
            playPauseBtn.querySelector('path').setAttribute('d', pausePath);
        } else {
            player.pause();
            playPauseBtn.querySelector('path').setAttribute('d', playPath);
        }
    }

    // Rewind/Forward
    rewindBtn.addEventListener('click', () => {
        showControls();
        player.currentTime(Math.max(0, player.currentTime() - 10));
    });
    forwardBtn.addEventListener('click', () => {
        showControls();
        player.currentTime(Math.min(player.duration(), player.currentTime() + 10));
    });

    // Volume
    volumeBtn.addEventListener('click', () => {
        showControls();
        if (player.muted() || player.volume() === 0) {
            player.muted(false);
            player.volume(0.7);
            volumeSlider.value = 70;
            updateVolumeIcon();
        } else {
            player.muted(true);
            updateVolumeIcon();
        }
    });

    volumeSlider.addEventListener('input', (e) => {
        showControls();
        const vol = e.target.value / 100;
        player.volume(vol);
        player.muted(vol === 0);
        updateVolumeIcon();
    });

    function updateVolumeIcon() {
        const vol = player.muted() ? 0 : player.volume();
        const path = volumeBtn.querySelector('path');
        if (vol === 0) {
            path.setAttribute('d', volumeMutePath);
        } else if (vol < 0.5) {
            path.setAttribute('d', volumeDownPath);
        } else {
            path.setAttribute('d', volumeUpPath);
        }
    }

    // Progress Bar
    player.on('timeupdate', updateProgress);
    progressBar.addEventListener('click', (e) => {
        showControls();
        seek(e);
    });

    function updateProgress() {
        const percent = (player.currentTime() / player.duration()) * 100;
        progressFilled.style.width = percent + '%';
        progressHandle.style.left = percent + '%';
        currentTimeEl.textContent = formatTime(player.currentTime());
        durationEl.textContent = formatTime(player.duration());

        // Update subtitles
        updateSubtitles();
    }

    function seek(e) {
        const rect = progressBar.getBoundingClientRect();
        const percent = (e.clientX - rect.left) / rect.width;
        player.currentTime(percent * player.duration());
    }

    function formatTime(seconds) {
        if (isNaN(seconds)) return '0:00';
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return mins + ':' + secs.toString().padStart(2, '0');
    }

    // Fullscreen
    fullscreenBtn.addEventListener('click', () => {
        showControls();
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen();
            fullscreenBtn.querySelector('path').setAttribute('d', compressPath);
        } else {
            document.exitFullscreen();
            fullscreenBtn.querySelector('path').setAttribute('d', expandPath);
        }
    });

    // PiP
    pipBtn.addEventListener('click', () => {
        showControls();
        const video = player.el().querySelector('video');
        if (document.pictureInPictureElement) {
            document.exitPictureInPicture();
        } else if (video.requestPictureInPicture) {
            video.requestPictureInPicture();
        }
    });

    // Lock Controls
    lockBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        controlsLocked = true;
        document.querySelector('.custom-controls').classList.add('hidden');
        unlockBtn.classList.remove('hidden');
    });

    unlockBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        controlsLocked = false;
        document.querySelector('.custom-controls').classList.remove('hidden');
        document.getElementById('subtitle-display').classList.remove('hidden');
        unlockBtn.classList.add('hidden');
        showControls();
    });

    subtitleBtn.addEventListener('click', () => {
        showControls();
        toggleMenu(subtitleMenu);
    });

    function toggleMenu(menu) {
        menu.classList.toggle('hidden');
    }

    // Subtitle Menu - Off option
    document.querySelectorAll('#subtitle-track-list .selectable').forEach(item => {
        item.addEventListener('click', () => {
            const trackId = item.dataset.track;
            if (trackId === 'off') {
                currentSubtitleTrack = -1;
                subtitleDisplay.textContent = '';
                // Disable all embedded tracks
                const video = player.el().querySelector('video');
                const textTracks = video.textTracks;
                if (textTracks) {
                    for (let i = 0; i < textTracks.length; i++) {
                        textTracks[i].mode = 'hidden';
                    }
                }
            }
            document.querySelectorAll('#subtitle-track-list .selectable').forEach(el => el.classList.remove('selected'));
            item.classList.add('selected');
            subtitleMenu.classList.add('hidden');
        });
    });

    // Initial load subtitle button (will be replaced after video loads)
    const initialLoadBtn = document.getElementById('load-subtitle-item');
    if (initialLoadBtn) {
        initialLoadBtn.addEventListener('click', () => {
            subtitleFileInput.click();
            subtitleMenu.classList.add('hidden');
        });
    }

    // Controls are hidden by default, show on interaction
    let controlsVisible = false;

    function showControls() {
        if (controlsLocked) return;
        if (!controlsVisible) {
            controlsVisible = true;
            document.querySelector('.custom-controls').classList.add('show');
            document.querySelector('.custom-controls').classList.remove('hide');
        }
        // Reset hide timeout
        clearTimeout(hideControlsTimeout);
        hideControlsTimeout = setTimeout(hideControls, 5000); // 5 seconds
    }

    function hideControls() {
        if (controlsVisible && !player.paused()) {
            controlsVisible = false;
            document.querySelector('.custom-controls').classList.remove('show');
            document.querySelector('.custom-controls').classList.add('hide');
        }
    }

    // Show controls on mouse movement over player
    playerWrapper.addEventListener('mousemove', showControls);
    playerWrapper.addEventListener('mouseenter', showControls);

    // Show controls when video is paused
    player.on('pause', () => {
        showControls();
        clearTimeout(hideControlsTimeout); // Don't hide when paused
    });

    // Hide controls when video starts playing (after a brief delay)
    player.on('play', () => {
        setTimeout(() => {
            if (!controlsVisible) {
                hideControls();
            }
        }, 1000);
    });

    // Show controls on any click
    playerWrapper.addEventListener('click', (e) => {
        // Don't show controls if clicking on video to play/pause
        if (e.target.closest('.custom-controls')) {
            return; // Already handled by control buttons
        }
        showControls();
    });    // Keyboard Shortcuts
    document.addEventListener('keydown', (e) => {
        if (e.target.tagName === 'INPUT') return;

        switch (e.key) {
            case ' ':
                e.preventDefault();
                togglePlayPause();
                break;
            case 'f':
            case 'F':
                e.preventDefault();
                fullscreenBtn.click();
                break;
            case 'ArrowLeft':
                e.preventDefault();
                rewindBtn.click();
                break;
            case 'ArrowRight':
                e.preventDefault();
                forwardBtn.click();
                break;
            case 'ArrowUp':
                e.preventDefault();
                player.volume(Math.min(1, player.volume() + 0.1));
                volumeSlider.value = player.volume() * 100;
                updateVolumeIcon();
                break;
            case 'ArrowDown':
                e.preventDefault();
                player.volume(Math.max(0, player.volume() - 0.1));
                volumeSlider.value = player.volume() * 100;
                updateVolumeIcon();
                break;
            case 'm':
            case 'M':
                e.preventDefault();
                volumeBtn.click();
                break;
        }
    });

    // Load Video
    function handleVideoFile(e) {
        const file = e.target.files[0];
        if (file) loadVideo(file);
    }

    function loadVideo(file) {
        const url = URL.createObjectURL(file);
        player.src({ src: url, type: file.type || 'video/mp4' });
        player.load();
        videoTitle.textContent = file.name;
        dropZone.classList.add('hidden');

        // Reset controls
        playPauseBtn.querySelector('path').setAttribute('d', playPath);

        // Wait for metadata to load, then detect embedded tracks
        player.one('loadedmetadata', () => {
            detectEmbeddedTracks();
        });
    }

    // Detect and populate embedded audio and subtitle tracks
    function detectEmbeddedTracks() {
        // Detect embedded subtitle/text tracks
        detectEmbeddedSubtitles();

        // Add visual indicators
        const video = player.el().querySelector('video');
        const textTracks = video.textTracks;

        // Highlight subtitle button if tracks available
        if (textTracks && textTracks.length > 0) {
            subtitleBtn.style.color = '#3ea6ff';
        }
    }

    function detectEmbeddedSubtitles() {
        const video = player.el().querySelector('video');
        const textTracks = video.textTracks;
        const trackList = document.getElementById('subtitle-track-list');

        // Clear existing tracks but keep a reference to re-add "Off"
        trackList.innerHTML = '';

        // Re-add "Off" option first
        const offOption = document.createElement('div');
        offOption.className = 'settings-item selectable selected';
        offOption.dataset.track = 'off';
        offOption.innerHTML = '<span>Off</span>';
        offOption.addEventListener('click', () => {
            currentSubtitleTrack = -1;
            subtitleDisplay.textContent = '';
            // Disable all embedded tracks
            if (textTracks) {
                for (let i = 0; i < textTracks.length; i++) {
                    textTracks[i].mode = 'hidden';
                }
            }
            document.querySelectorAll('#subtitle-track-list .selectable').forEach(el => el.classList.remove('selected'));
            offOption.classList.add('selected');
            subtitleMenu.classList.add('hidden');
        });
        trackList.appendChild(offOption);

        // Add embedded subtitle tracks
        if (textTracks && textTracks.length > 0) {
            for (let i = 0; i < textTracks.length; i++) {
                const track = textTracks[i];
                if (track.kind === 'subtitles' || track.kind === 'captions') {
                    const item = document.createElement('div');
                    item.className = 'settings-item selectable';
                    const trackLabel = track.label || track.language || `Track ${i + 1}`;
                    item.innerHTML = `<span>${trackLabel} (Embedded)</span>`;
                    item.dataset.track = `embedded-${i}`;

                    item.addEventListener('click', () => {
                        // Disable all tracks
                        for (let j = 0; j < textTracks.length; j++) {
                            textTracks[j].mode = 'hidden';
                        }
                        // Enable selected track
                        track.mode = 'showing';
                        currentSubtitleTrack = -2; // -2 indicates embedded track
                        subtitleDisplay.textContent = ''; // Clear external subtitle display

                        document.querySelectorAll('#subtitle-track-list .selectable').forEach(el => el.classList.remove('selected'));
                        item.classList.add('selected');
                        subtitleMenu.classList.add('hidden');
                    });

                    trackList.appendChild(item);
                }
            }

            // Add separator if there are embedded tracks
            const separator = document.createElement('div');
            separator.className = 'settings-separator';
            trackList.appendChild(separator);
        }

        // Add "Load Subtitle File" option
        const loadItem = document.createElement('div');
        loadItem.className = 'settings-item';
        loadItem.id = 'load-subtitle-item-dynamic';
        loadItem.innerHTML = '<span><svg class="icon" viewBox="0 0 24 24"><path fill="currentColor" d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/></svg> Load Subtitle File</span>';
        loadItem.addEventListener('click', () => {
            subtitleFileInput.click();
            subtitleMenu.classList.add('hidden');
        });
        trackList.appendChild(loadItem);
    }

    // Load Subtitles
    function handleSubtitleFile(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const text = e.target.result;
                if (file.name.endsWith('.srt')) {
                    subtitles = parseSRT(text);
                } else if (file.name.endsWith('.vtt')) {
                    subtitles = parseVTT(text);
                }
                addSubtitleTrack(file.name);
            };
            reader.readAsText(file);
        }
    }

    function addSubtitleTrack(name) {
        const trackList = document.getElementById('subtitle-track-list');

        // Find the position before the load button
        const loadBtn = document.getElementById('load-subtitle-item-dynamic');
        const separator = trackList.querySelector('.settings-separator:last-of-type');

        const item = document.createElement('div');
        item.className = 'settings-item selectable';
        item.innerHTML = '<span>' + name + '</span>';
        item.dataset.track = 'external';
        item.addEventListener('click', () => {
            currentSubtitleTrack = 0;
            // Disable all embedded tracks
            const video = player.el().querySelector('video');
            const textTracks = video.textTracks;
            if (textTracks) {
                for (let i = 0; i < textTracks.length; i++) {
                    textTracks[i].mode = 'hidden';
                }
            }
            document.querySelectorAll('#subtitle-track-list .selectable').forEach(el => el.classList.remove('selected'));
            item.classList.add('selected');
            subtitleMenu.classList.add('hidden');
        });

        // Insert before load button
        if (loadBtn) {
            trackList.insertBefore(item, loadBtn);
        } else {
            trackList.appendChild(item);
        }

        // Auto-select the newly added subtitle
        item.click();
    }

    function updateSubtitles() {
        if (currentSubtitleTrack < 0 || subtitles.length === 0) {
            subtitleDisplay.textContent = '';
            return;
        }

        const currentTime = player.currentTime();
        const subtitle = subtitles.find(sub => currentTime >= sub.start && currentTime <= sub.end);
        subtitleDisplay.textContent = subtitle ? subtitle.text : '';
    }

    function parseSRT(text) {
        const subs = [];
        const blocks = text.split(/\n\s*\n/);
        blocks.forEach(block => {
            const lines = block.trim().split('\n');
            if (lines.length >= 3) {
                const timeLine = lines[1];
                if (timeLine && timeLine.includes('-->')) {
                    const times = timeLine.split('-->').map(t => parseTime(t.trim()));
                    const text = lines.slice(2).join('\n').replace(/<[^>]*>/g, '');
                    subs.push({ start: times[0], end: times[1], text: text });
                }
            }
        });
        return subs;
    }

    function parseVTT(text) {
        return parseSRT(text.replace(/^WEBVTT\s*\n\n?/, ''));
    }

    function parseTime(timeStr) {
        const parts = timeStr.split(':');
        if (parts.length === 3) {
            const h = parts[0];
            const m = parts[1];
            const s = parts[2];
            const secParts = s.split(/[,\.]/);
            const sec = secParts[0];
            const ms = secParts[1] || 0;
            return parseInt(h) * 3600 + parseInt(m) * 60 + parseFloat(sec) + parseInt(ms) / 1000;
        }
        return 0;
    }
});
