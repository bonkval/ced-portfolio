"""Render an original instrumental loop. Requires numpy and ffmpeg.
Reference direction: wistful, spacious synth-pop; no samples or transcribed parts.
All notes, rhythms, synthesis and arrangement below are original.
"""
from pathlib import Path
import subprocess
import tempfile
import wave
import numpy as np

RATE = 44100
BPM = 86
BEAT = 60 / BPM
BARS = 16
N = round(BARS * 4 * BEAT * RATE)
rng = np.random.default_rng(197)
mix = np.zeros((N, 2), dtype=np.float64)

def hz(note):
    return 440 * 2 ** ((note - 69) / 12)

def add(sound, beat, gain=1, pan=0):
    indices = (np.arange(len(sound)) + round(beat * BEAT * RATE)) % N
    angle = (pan + 1) * np.pi / 4
    np.add.at(mix[:, 0], indices, sound * gain * np.cos(angle))
    np.add.at(mix[:, 1], indices, sound * gain * np.sin(angle))

def tone(note, length, kind):
    t = np.arange(round(length * RATE)) / RATE
    f = hz(note)
    if kind == 'pad':
        # Soft detuned partials, slow attack and release.
        signal = sum(np.sin(2*np.pi*f*r*t + .18*np.sin(2*np.pi*.22*t)) / (i+1)**2
                     for i,r in enumerate([.998, 1.002, 2.001, 3.0]))
        env = np.minimum(t/.5, 1) * np.minimum(np.maximum(length-t, 0)/1.1, 1)
    elif kind == 'keys':
        signal = np.sin(2*np.pi*f*t + 1.6*np.sin(2*np.pi*f*2*t)*np.exp(-t*3))
        signal += .12*np.sin(2*np.pi*f*3*t)*np.exp(-t*5)
        env = (1-np.exp(-t*170))*np.exp(-t*2.2)*np.minimum((length-t)/.08,1)
    elif kind == 'bass':
        signal = np.sin(2*np.pi*f*t) + .2*np.sin(2*np.pi*f*2*t)
        env = (1-np.exp(-t*90))*np.exp(-t*1.5)*np.minimum((length-t)/.08,1)
    else:
        signal = np.sin(2*np.pi*f*t + .3*np.sin(2*np.pi*f*3*t)*np.exp(-t*6))
        env = (1-np.exp(-t*65))*np.exp(-t*1.7)*np.minimum((length-t)/.12,1)
    return signal * env

# A sixteen-bar progression, voiced to keep the texture spacious.
chords = [([53,60,64,67,72],29),([50,57,60,64,69],26),
          ([46,53,57,60,65],34),([48,55,62,64,67],24)] * 2
for section,(notes,root) in enumerate(chords):
    at = section*8
    for i,note in enumerate(notes):
        add(tone(note,8*BEAT+1.1,'pad'),at,.052,(i-2)*.33)
    for offset in [0,3,4,6.5]:
        add(tone(root,1.2*BEAT,'bass'),at+offset,.23)
    for j,offset in enumerate([.5,2,3.5,4.5,6,7]):
        note = notes[[2,3,1,4,3,2][j]]+12
        add(tone(note,1.7,'keys'),at+offset,.085,(-1)**j*.4)

# Separate, newly composed lead phrases; rests leave room for browsing.
phrases = [ [(0,76),(1.5,79),(3,72),(5,74),(6.5,76)],
            [(.5,77),(2,76),(4,72),(6,69)],
            [(0,72),(2.5,77),(4,76),(5.5,72),(7,69)],
            [(1,74),(2.5,79),(4.5,76),(6.5,74)],
            [(0,79),(2,76),(3.5,72),(6,74)],
            [(.5,81),(2,77),(4,76),(6.5,72)],
            [(0,77),(1.5,76),(4,72),(6,69)],
            [(1,74),(3,76),(5,72),(7,67)] ]
for section,phrase in enumerate(phrases):
    for offset,note in phrase:
        add(tone(note,2.1,'lead'),section*8+offset,.065,.12)

for bar in range(BARS):
    at=bar*4
    for off in [0,2.5]:
        t=np.arange(round(.38*RATE))/RATE
        kick=np.sin(2*np.pi*(47*t+42*.025*(1-np.exp(-t/.025))))
        add(kick*(1-np.exp(-t*800))*np.exp(-t*15),at+off,.28)
    for off in [1,3]:
        t=np.arange(round(.28*RATE))/RATE
        noise=rng.normal(0,1,len(t))
        soft=np.convolve(noise,np.ones(7)/7,mode='same')
        snare=(.46*soft+.14*np.sin(2*np.pi*178*t))*np.exp(-t*19)*(1-np.exp(-t*500))
        add(snare,at+off,.22,-.12)
    for j in range(8):
        t=np.arange(round(.075*RATE))/RATE
        noise=rng.normal(0,1,len(t))
        high=noise-np.convolve(noise,np.ones(12)/12,mode='same')
        add(high*np.exp(-t*75),at+j*.5+.025,.022 if j%2 else .014,.45)

# Circular stereo echoes preserve tails across the loop boundary.
dry=mix.copy()
for delay,gain in [(BEAT*.75,.15),(BEAT*1.5,.08),(.071,.09),(.137,.06)]:
    mix += np.roll(dry[:,::-1],round(delay*RATE),axis=0)*gain
mix=np.tanh(mix*1.25)
mix-=mix.mean(axis=0)
mix*=.78/max(np.abs(mix).max(),.001)
# Smooth the tiny waveform discontinuity without silencing the beat.
edge=256
bridge=(mix[0]+mix[-1])/2
mix[:edge]=bridge+(mix[:edge]-bridge)*np.linspace(0,1,edge)[:,None]
mix[-edge:]=bridge+(mix[-edge:]-bridge)*np.linspace(1,0,edge)[:,None]
out=Path(__file__).resolve().parents[1]/'public'/'audio'/'afterglow-v1.mp3'
out.parent.mkdir(exist_ok=True)
with tempfile.TemporaryDirectory() as temp:
    wav=Path(temp)/'loop.wav'
    with wave.open(str(wav),'wb') as file:
        file.setnchannels(2);file.setsampwidth(2);file.setframerate(RATE)
        file.writeframes((mix*32767).astype('<i2').tobytes())
    subprocess.run(['ffmpeg','-y','-hide_banner','-loglevel','error','-i',str(wav),
                    '-codec:a','libmp3lame','-b:a','128k','-metadata','title=Afterglow',
                    '-metadata','comment=Original synthesized portfolio instrumental',str(out)],check=True)
print(f'Rendered {N/RATE:.2f}s original loop: {out} ({out.stat().st_size:,} bytes)')
