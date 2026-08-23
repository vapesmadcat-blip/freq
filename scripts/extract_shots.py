#!/usr/bin/env python3
# scripts/extract_shots.py
# Extrai o objeto JS `SHOTS` de app/src/main/assets/freq_completo.html e gera presets/presets.json

import re, json, sys, pathlib, subprocess, tempfile, os

IN = 'app/src/main/assets/freq_completo.html'
OUT_DIR = 'app/src/main/assets/presets'
OUT = f'{OUT_DIR}/presets.json'

html = pathlib.Path(IN).read_text(encoding='utf-8')

m = re.search(r'const\s+SHOTS\s*=\s*({[\s\S]*?})\s*;?', html)
if not m:
    print("SHOTS não encontrado em", IN, file=sys.stderr)
    sys.exit(2)

shots_js = m.group(1)

# Heurística de limpeza JS -> JSON
js = shots_js
# remove JS single-line comments
js = re.sub(r'//.*', '', js)
# remove block comments
js = re.sub(r'/\*[\s\S]*?\*/', '', js)
# convert single quotes to double quotes when safe (heuristic)
js = re.sub(r"'([^'\\n]*?)'", r'"\1"', js)
# remove trailing commas before } or ]
js = re.sub(r',\s*([}\]])', r'\1', js)

# Try direct json.loads
try:
    data = json.loads(js)
except Exception:
    # fallback: use node to evaluate and stringify
    with tempfile.NamedTemporaryFile('w', delete=False, suffix='.js') as tf:
        tf.write('const SHOTS = ' + js + ';\nconsole.log(JSON.stringify(SHOTS));')
        tfname = tf.name
    try:
        out = subprocess.check_output(['node', tfname], stderr=subprocess.PIPE, timeout=20)
        data = json.loads(out.decode('utf-8'))
    except Exception as e:
        print('Erro convertendo SHOTS para JSON:', e, file=sys.stderr)
        try:
            os.unlink(tfname)
        except: pass
        sys.exit(3)
    finally:
        try:
            os.unlink(tfname)
        except: pass

presets = []
for k, v in data.items():
    presets.append({
        'id': k,
        'displayName': v.get('label') or v.get('shot') or k,
        'description': v.get('terapia',''),
        'settings': v
    })

pathlib.Path(OUT_DIR).mkdir(parents=True, exist_ok=True)
pathlib.Path(OUT).write_text(json.dumps(presets, indent=2, ensure_ascii=False), encoding='utf-8')
print('Wrote', OUT)
