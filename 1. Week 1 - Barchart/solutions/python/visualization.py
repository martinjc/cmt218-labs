import pandas as pd
import matplotlib.pyplot as plt
import os

def visualize():
    # Load data
    data_path = '../../data/extract_data.csv' # Assuming standard naming or relative path
    # Actually we should use the Week 1 specific data
    data_path = '../../data/distance_per_month.csv'
    
    if not os.path.exists(data_path):
        print(f"Data not found at {data_path}")
        return

    df = pd.read_csv(data_path)
    
    # 1. Plot
    plt.figure(figsize=(10, 6))
    plt.bar(df['Month'], df['TotalDistance'], color='rebeccapurple')
    
    # 2. Labels
    plt.title('Total Distance per Month', fontsize=16)
    plt.xlabel('Month', fontsize=12)
    plt.ylabel('Distance (km)', fontsize=12)
    plt.xticks(rotation=45)
    plt.tight_layout()
    
    # 3. Save
    plt.savefig('monthly_distance_chart.png')
    print("Chart saved to monthly_distance_chart.png")
    plt.show()

if __name__ == "__main__":
    visualize()
