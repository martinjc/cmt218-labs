import shutil
import os

def prepare_data():
    sources = {
        '../../Week 1/data/distance_per_month.csv': 'distance_per_month.csv',
        '../../Week 2/data/distance_vs_pace.csv': 'distance_vs_pace.csv',
        '../../Week 3/data/trailing_365_distance.csv': 'trailing_365_distance.csv',
        '../../Week 4/data/time_of_day_counts.csv': 'time_of_day_counts.csv',
        '../../Week 5/data/weekly_distance_heatmap.csv': 'weekly_distance_heatmap.csv'
    }
    
    for src, dest in sources.items():
        if os.path.exists(src):
            shutil.copy(src, dest)
            print(f"Copied {src} to {dest}")
        else:
            print(f"Warning: Source {src} not found. Please run previous weeks' extractions.")

if __name__ == "__main__":
    prepare_data()
