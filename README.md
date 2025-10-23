# VLC-like Video Player Chrome Extension# VLC-like Video Player Chrome Extension



A standalone Chrome extension that opens as a full-screen video player with VLC-style interface, subtitle support, and customizable controls.A standalone Chrome extension that opens as a full-screen video player app with VLC-style interface, subtitle support, and customizable controls.



## Features## Features



- **Standalone App Experience**: Opens in a new tab as a full-screen application- ✅ **Standalone App Experience**: Opens in a new tab as a full-screen application

- **Professional Interface**: Modern, clean design with auto-hiding controls- ✅ **Professional YouTube-style Interface**: Modern, clean design with auto-hiding controls

- **Subtitle Support**: Load external .srt/.vtt files or detect embedded subtitles- ✅ **Multiple Audio Track Support**: Switch between audio tracks in videos with multiple audio streams

- **Video Format Support**: MP4, WebM, OGG, and limited MKV support- ✅ **Embedded Subtitle Detection**: Automatically detects and displays subtitles embedded in video files

- **Drag & Drop**: Drop video files directly onto the player- ✅ **External Subtitle Support**: Load .srt, .vtt, and .ass subtitle files

- **Picture-in-Picture**: Watch videos while browsing other tabs- ✅ **Video Format Support**: MP4, WebM, OGG, and limited MKV support

- **Keyboard Shortcuts**: Play/pause, seek, volume, fullscreen- ✅ **Drag & Drop**: Drop video files directly onto the player

- **Volume Control**: Adjustable volume with mute option- ✅ **Playback Speed Control**: 0.25x to 2x speed adjustment

- **Seek Bar**: Click anywhere on the progress bar to jump to that position- ✅ **Picture-in-Picture**: Watch videos while browsing other tabs

- **Lock Controls**: Hide all controls with captions still visible- ✅ **Skip Controls**: Quick 10s forward/backward buttons

- ✅ **Comprehensive Keyboard Shortcuts**: Play/pause, seek, volume, fullscreen

## Installation- ✅ **Volume Control**: Adjustable volume with mute option

- ✅ **Seek Bar**: Click anywhere on the progress bar to jump to that position

### From Source

1. Download/clone the repository## Built With

2. Open Chrome and go to `chrome://extensions/`

3. Enable **Developer mode**- **Video.js**: Professional HTML5 video player

4. Click **Load unpacked** and select the extension folder- **SVG Icons**: Custom inline SVG icons for UI elements

5. Click the extension icon to open the player- **Chrome Extension Manifest V3**: Modern extension architecture



### From ZIP## Installation

1. Download `video-player-extension.zip`

2. Extract to a folder### Option 1: Install from Source

3. Follow steps 2-5 above

1. **Download the extension**

## Usage   ```bash

   git clone https://github.com/BilalSwl6/video-player-extension.git

### Opening Files   cd video-player-extension

- Click **Browse Files** or drag & drop video files onto the player   ```



### Subtitles2. **Load in Chrome**

- Click **CC** button to load external subtitle files (.srt/.vtt)   - Open Chrome and navigate to `chrome://extensions/`

- Embedded subtitles in MKV files are auto-detected   - Enable **Developer mode** (toggle in top-right corner)

   - Click **Load unpacked**

### Keyboard Shortcuts   - Select the extension folder

- **Space**: Play/Pause

- **F**: Fullscreen3. **Use the player**

- **M**: Mute   - Click the extension icon in the toolbar

- **←/→**: Rewind/Forward 10s   - The player will open in a new tab

- **↑/↓**: Volume up/down

### Option 2: Install from ZIP

### Controls

- **Eye with cross**: Hide all controls (captions stay visible)1. Download the `video-player-extension.zip` file

- **Open eye**: Show controls again2. Extract it to a folder on your computer

3. Follow steps 2-3 from Option 1 above

## Built With

- **Video.js**: HTML5 video player## How to Build

- **SVG Icons**: Custom icons

- **Chrome Extension Manifest V3**No build process is required! This extension uses plain HTML, CSS, and JavaScript with pre-downloaded libraries.



## Note### Project Structure

This extension was entirely created by AI. Not a single line of code was written by a human.

```

## Licensevideo-player-extension/

Open source. Feel free to use and modify.├── manifest.json          # Extension configuration
├── background.js          # Service worker to open player
├── player.html           # Main player interface
├── player.js             # Player functionality
├── player-styles.css     # Player styling
├── icon.png              # Extension icon
├── lib/                  # Third-party libraries
│   ├── video.min.js      # Video.js library
│   ├── video-js.min.css  # Video.js styles
│   └── fontawesome.min.css # Font Awesome icons
├── popup.html            # Legacy popup (optional)
├── popup.js              # Legacy popup script (optional)
└── README.md             # This file
```

### Making Changes

1. **Edit the code**
   - Modify `player.html`, `player.js`, or `player-styles.css`
   - Add new features or customize the interface

2. **Reload the extension**
   - Go to `chrome://extensions/`
   - Click the refresh icon on your extension card
   - Or disable and re-enable the extension

3. **Test your changes**
   - Click the extension icon
   - Test all features thoroughly

## Usage Guide

### Opening Files

**Method 1: Browse Button**
- Click the **Browse Files** button or the folder icon in the top-left
- Select your video file

**Method 2: Drag & Drop**
- Drag video files onto the player window

### Audio Track Selection

1. Click the **Settings** button (gear icon)
2. Click **Audio Track**
3. Select from available audio tracks (if the video has multiple audio streams)
4. The selected track will be highlighted with a checkmark

### Subtitle Management

**For videos with embedded subtitles (MKV files):**
1. Click the **CC** (Closed Captions) button
2. See list of embedded subtitle tracks
3. Select the subtitle track you want to display
4. Select **Off** to disable subtitles

**To load external subtitle files:**
1. Click the **CC** button
2. Click **Load Subtitle File** at the bottom
3. Select your .srt or .vtt subtitle file
4. The subtitle will be automatically enabled

**Supported subtitle formats:**
- .srt (SubRip)
- .vtt (WebVTT)
- .ass (Advanced SubStation Alpha) - experimental

### Keyboard Shortcuts

| Key | Action |
|-----|--------|
| **Space** | Play/Pause |
| **F** | Toggle Fullscreen |
| **M** | Mute/Unmute |
| **←** (Left Arrow) | Rewind 10 seconds |
| **→** (Right Arrow) | Forward 10 seconds |
| **↑** (Up Arrow) | Increase volume |
| **↓** (Down Arrow) | Decrease volume |

### Player Controls

**Bottom Control Bar:**
- **Play/Pause** - Start or pause video playback
- **Rewind** - Jump back 10 seconds
- **Forward** - Jump ahead 10 seconds  
- **Volume** - Adjust volume (hover to see slider)
- **CC Button** - Access subtitle menu
- **Settings** - Access playback speed and audio track settings
- **PiP** - Enable Picture-in-Picture mode
- **Lock** - Lock controls to hide them permanently
- **Fullscreen** - Toggle fullscreen mode

**Progress Bar:**
- **Seek Bar:**
- Click anywhere to seek to that position
- Shows current time and total duration

**Lock Controls:**
- Click the **Lock button** (padlock icon) to hide all controls permanently
- A semi-transparent unlock button will appear in the top-right corner
- Click the unlock button to restore controls

**Settings Menu:**
- **Playback Speed**: 0.25x to 2x
- **Audio Track**: Switch between multiple audio streams
- **Auto-hide Controls**: Toggle automatic hiding of controls when playing

## Limitations

- **MKV Container Support**: Chrome has limited native MKV support. Some MKV files may not play or may not show all tracks. If you encounter issues, convert to MP4 using FFmpeg:
  ```bash
  ffmpeg -i input.mkv -c copy output.mp4
  ```
- **Embedded Subtitle Extraction**: For MKV files, embedded subtitles will be auto-detected if the browser supports them. Otherwise, extract and load them as external files
- **Subtitle Formats**: Fully supports .srt and .vtt. Embedded subtitles in MKV depend on browser codec support
- **Online Videos**: This extension only supports local video files, not streaming URLs

## Troubleshooting

**Extension icon doesn't appear**
- Make sure the extension is enabled in `chrome://extensions/`
- Check that Developer mode is ON

**Video won't play**
- Verify the video format is supported (MP4, WebM, OGG)
- Try converting the video to MP4

**Subtitles not showing**
- Ensure subtitle file is .srt or .vtt format
- Check that subtitles are enabled (Subtitle → Show/Hide)

## Development

### Adding New Features

1. Fork this repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

### Future Enhancements

- [ ] Online video URL support
- [ ] Playlist functionality
- [ ] Audio equalizer
- [ ] Video effects/filters
- [ ] MKV support via WebAssembly demuxing
- [ ] Multiple subtitle track support
- [ ] Subtitle synchronization controls

## License

This project is open source. Feel free to use and modify as needed.

## Credits

- Video.js - https://videojs.com/
- Font Awesome - https://fontawesome.com/