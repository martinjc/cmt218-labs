import pandas as pd
import seaborn as sns
import matplotlib.pyplot as plt
import os

def visualize():
    data_path = '../../data/weekly_distance_heatmap.csv'
    
    if not os.path.exists(data_path):
        print(f"Data not found at {data_path}")
        return

    df = pd.read_csv(data_path)
    
    # Pivot for Heatmap: Index=WeekDay/Year?, Columns=Week? 
    # Let's inspect columns first. Assuming Year, Week, Distance.
    # The file name implies Weekly Distance.
    # If columns are Year, Week, Distance:
    matrix = df.pivot(index='Year', columns='Week', values='Distance')
    
    plt.figure(figsize=(15, 8))
    
    # Heatmap
    sns.heatmap(matrix, cmap='Purples', linewidths=1, linecolor='white')
    
    plt.title('Weekly Distance Heatmap', fontsize=16)
    plt.xlabel('Week Number')
    plt.ylabel('Year')
    
    plt.tight_layout()
    plt.savefig('heatmap.png')
    print("Chart saved to heatmap.png")
    plt.show()

if __name__ == "__main__":
    visualize()
