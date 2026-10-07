#!/usr/bin/env python3
import subprocess

thumb_in = "/tmp/problem_solved_thumb.jpg"
final_jpg = "public/media/lifestyle_groceries.jpg"
final_mp4 = "public/media/lifestyle_groceries.mp4"
final_mp3 = "public/media/lifestyle_groceries.mp3"

crop_filter = "scale=1920:1080:force_original_aspect_ratio=increase,crop=1920:1080"
draw_t1 = "drawtext=text='8 genius tips to save money on groceries':fontcolor=white:fontsize=36:x=50:y=40:shadowcolor=black@0.8:shadowx=2:shadowy=2"
draw_wm = "drawtext=text='Problem Solved':fontcolor=0xcccccc:fontsize=28:x=1680:y=40:shadowcolor=black@0.8:shadowx=2:shadowy=2"
draw_box = "drawbox=x=600:y=860:w=720:h=120:color=black@0.75:t=fill"
draw_sub1 = "drawtext=text='If you\\'re looking to spend a little less at the':fontcolor=white:fontsize=30:x=630:y=880"
draw_sub2 = "drawtext=text='grocery store\\, here are 8 smart shopping tips\\:':fontcolor=white:fontsize=30:x=630:y=925"

full_vf = f"{crop_filter},{draw_t1},{draw_wm},{draw_box},{draw_sub1},{draw_sub2}"

subprocess.run(["ffmpeg", "-y", "-i", thumb_in, "-vf", full_vf, final_jpg], check=True)

# Generate 80-second (1:20) MP4
subprocess.run([
    "ffmpeg", "-y",
    "-loop", "1", "-i", thumb_in,
    "-f", "lavfi", "-i", "anoisesrc=d=80:c=pink:r=48000:a=0.01",
    "-vf", full_vf,
    "-c:v", "libx264", "-tune", "stillimage", "-pix_fmt", "yuv420p",
    "-c:a", "aac", "-b:a", "192k",
    "-t", "80",
    "-shortest",
    final_mp4
], check=True)

# Generate 80-second MP3
subprocess.run([
    "ffmpeg", "-y",
    "-i", final_mp4,
    "-vn", "-c:a", "libmp3lame", "-b:a", "320k",
    final_mp3
], check=True)

print("Successfully created 80-second (1:20) Problem Solved MP4 and MP3!")
