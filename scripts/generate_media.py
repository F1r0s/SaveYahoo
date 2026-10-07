#!/usr/bin/env python3
import os
import subprocess
import urllib.request

MEDIA_DIR = "public/media"
os.makedirs(MEDIA_DIR, exist_ok=True)

categories = [
    {
        "id": "lifestyle_groceries",
        "url": "https://images.unsplash.com/photo-1542838132-92c53300491e?w=1920&q=85",
        "category": "YAHOO LIFESTYLE",
        "title": "5 Hacks to Make Groceries Cheaper",
        "tone": 440,
        "badge_color": "0x16a34a" # Emerald green
    },
    {
        "id": "news_strait",
        "url": "https://images.unsplash.com/photo-1585829365295-ab7cd400c167?w=1920&q=85",
        "category": "YAHOO NEWS",
        "title": "Trump Strait Map & Shipping Analysis",
        "tone": 520,
        "badge_color": "0x6001d2" # Yahoo purple
    },
    {
        "id": "finance_sp500",
        "url": "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1920&q=85",
        "category": "YAHOO FINANCE",
        "title": "S&P 500 Record High Market Surge",
        "tone": 480,
        "badge_color": "0x0284c7" # Sky blue
    },
    {
        "id": "sports_championship",
        "url": "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=1920&q=85",
        "category": "YAHOO SPORTS",
        "title": "Championship Highlights & Trade Recap",
        "tone": 600,
        "badge_color": "0xdc2626" # Sports red
    },
    {
        "id": "tech_review",
        "url": "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1920&q=85",
        "category": "YAHOO TECH",
        "title": "Next-Gen AI Hardware & Chipsets",
        "tone": 560,
        "badge_color": "0x9333ea" # Purple/cyan
    }
]

headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'}

for item in categories:
    raw_img = os.path.join(MEDIA_DIR, f"{item['id']}_raw.jpg")
    final_jpg = os.path.join(MEDIA_DIR, f"{item['id']}.jpg")
    mp4_path = os.path.join(MEDIA_DIR, f"{item['id']}.mp4")
    mp3_path = os.path.join(MEDIA_DIR, f"{item['id']}.mp3")

    print(f"Downloading high-res image for {item['id']}...")
    req = urllib.request.Request(item['url'], headers=headers)
    with urllib.request.urlopen(req) as resp, open(raw_img, 'wb') as f:
        f.write(resp.read())

    # Crop and scale to exact 1920x1080 16:9 for pristine thumbnail
    crop_cmd = [
        "ffmpeg", "-y",
        "-i", raw_img,
        "-vf", "scale=1920:1080:force_original_aspect_ratio=increase,crop=1920:1080",
        final_jpg
    ]
    subprocess.run(crop_cmd, check=True)

    # Create 5-second 1080p 60fps video with smooth gentle zoom motion & audio
    safe_cat = item['category']
    safe_title = item['title'].replace("'", "")
    
    # Filter with smooth zoompan + lower third overlay banner
    vf_filter = (
        "scale=2560:1440,zoompan=z='min(zoom+0.0008,1.15)':d=150:x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':s=1920x1080:fps=30,"
        f"drawbox=x=0:y=940:w=1920:h=140:color=black@0.65:t=fill,"
        f"drawbox=x=40:y=960:w=220:h=40:color={item['badge_color']}@0.95:t=fill,"
        f"drawtext=text='{safe_cat}':fontcolor=white:fontsize=22:x=55:y=970,"
        f"drawtext=text='{safe_title}':fontcolor=white:fontsize=36:x=290:y=962,"
        f"drawtext=text='SAVEYAHOO HD VERIFIED STREAM':fontcolor=0x94a3b8:fontsize=20:x=290:y=1010"
    )

    print(f"Synthesizing 1080p MP4 for {item['id']}...")
    video_cmd = [
        "ffmpeg", "-y",
        "-loop", "1", "-i", raw_img,
        "-f", "lavfi", "-i", f"sine=frequency={item['tone']}:sample_rate=48000",
        "-filter_complex", f"[0:v]{vf_filter}[v]",
        "-map", "[v]",
        "-map", "1:a",
        "-c:v", "libx264", "-pix_fmt", "yuv420p", "-b:v", "2500k",
        "-c:a", "aac", "-b:a", "192k",
        "-t", "5",
        "-shortest",
        mp4_path
    ]
    subprocess.run(video_cmd, check=True)

    # Create MP3
    print(f"Creating MP3 for {item['id']}...")
    audio_cmd = [
        "ffmpeg", "-y",
        "-f", "lavfi", "-i", f"sine=frequency={item['tone']}:sample_rate=48000:duration=5",
        "-c:a", "libmp3lame", "-b:a", "320k",
        "-t", "5",
        mp3_path
    ]
    subprocess.run(audio_cmd, check=True)

    # Remove temporary raw file
    if os.path.exists(raw_img):
        os.remove(raw_img)

print("All media assets generated successfully with vibrant full-color photography!")
