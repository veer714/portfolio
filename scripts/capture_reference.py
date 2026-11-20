import subprocess
import os
import time

chrome_path = r"C:\Program Files\Google\Chrome\Application\chrome.exe"
ref_dir = os.path.abspath(r"screenshots\reference")
os.makedirs(ref_dir, exist_ok=True)

targets = [
    {
        "url": "https://www.killerportfolio.com/by/fine-thought",
        "output": os.path.join(ref_dir, "01_killerportfolio_landing.png"),
        "size": "1440,900"
    },
    {
        "url": "https://finethought.com.au/",
        "output": os.path.join(ref_dir, "02_finethought_landing.png"),
        "size": "1440,900"
    },
    {
        "url": "https://finethought.com.au/project/black-fridye/",
        "output": os.path.join(ref_dir, "03_finethought_case_study.png"),
        "size": "1440,900"
    },
    {
        "url": "https://finethought.com.au/",
        "output": os.path.join(ref_dir, "04_finethought_mobile.png"),
        "size": "390,844"
    }
]

for t in targets:
    print(f"Capturing {t['output']} from {t['url']}...")
    cmd = [
        chrome_path,
        "--headless=new",
        "--disable-gpu",
        f"--window-size={t['size']}",
        "--virtual-time-budget=4000",
        f"--screenshot={t['output']}",
        t['url']
    ]
    res = subprocess.run(cmd, capture_output=True, text=True, timeout=30)
    print("Done. Size:", os.path.getsize(t['output']) if os.path.exists(t['output']) else "FAILED")

print("All reference screenshots captured.")

