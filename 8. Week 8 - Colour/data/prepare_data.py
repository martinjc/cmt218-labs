import shutil
import os

def prepare_data():
    src = '../../Week 1/data/distance_per_month.csv'
    dest = 'distance_per_month.csv'
    
    if os.path.exists(src):
        shutil.copy(src, dest)
        print(f"Copied {src} to {dest}")
    else:
        print(f"Warning: {src} not found.")

if __name__ == "__main__":
    prepare_data()
