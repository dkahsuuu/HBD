import re

script_file = 'script.js'
with open(script_file, 'r', encoding='utf-8') as f:
    js_content = f.read()

# Update variable declarations
js_content = re.sub(
    r"const bgMusic = document\.getElementById\('bg-music'\);",
    "const bgMusic = document.getElementById('bg-music');\nconst bgMusicMain = document.getElementById('bg-music-main');\nlet activeMusic = bgMusic;",
    js_content
)

# Update volume initialization
js_content = re.sub(
    r"bgMusic\.volume = 0\.3;",
    "bgMusic.volume = 0.3;\nbgMusicMain.volume = 0.3;",
    js_content
)

# Update toggle logic
js_content = re.sub(
    r"bgMusic\.pause\(\);",
    "activeMusic.pause();",
    js_content
)
js_content = re.sub(
    r"bgMusic\.play\(\)\.catch",
    "activeMusic.play().catch",
    js_content
)

# Update nextSection logic
old_logic = """    // Play music when entering section 2
    if (next === 2) {
        bgMusic.play().then(() => {
            isMusicPlaying = true;
            iconPlay.classList.add('hidden');
            iconPause.classList.remove('hidden');
        }).catch(e => console.log("Audio play failed:", e));
    }
    
    // Stop music when leaving section 2
    if (current === 2) {
        bgMusic.pause();
        isMusicPlaying = false;
        iconPlay.classList.remove('hidden');
        iconPause.classList.add('hidden');
    }"""

new_logic = """    // Play music when entering section 2
    if (next === 2) {
        activeMusic = bgMusic;
        bgMusic.play().then(() => {
            isMusicPlaying = true;
            iconPlay.classList.add('hidden');
            iconPause.classList.remove('hidden');
        }).catch(e => console.log("Audio play failed:", e));
    }
    
    // Stop first music and play second music when leaving section 2
    if (current === 2) {
        bgMusic.pause();
        
        // Start second music
        activeMusic = bgMusicMain;
        bgMusicMain.play().then(() => {
            isMusicPlaying = true;
            iconPlay.classList.add('hidden');
            iconPause.classList.remove('hidden');
        }).catch(e => console.log("Audio play failed:", e));
    }"""

js_content = js_content.replace(old_logic, new_logic)

with open(script_file, 'w', encoding='utf-8') as f:
    f.write(js_content)

print("Updates applied.")
