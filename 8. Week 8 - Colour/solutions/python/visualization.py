import pandas as pd
import matplotlib.pyplot as plt
import matplotlib.cm as cm
import matplotlib.colors as mcolors
import numpy as np
import os

def visualize():
    data_path = '../../data/distance_per_month.csv'
    
    if not os.path.exists(data_path):
        print(f"Data not found at {data_path}")
        return

    df = pd.read_csv(data_path)
    
    # Setup Colors
    # Normalize distance values to 0-1 range for colormap
    norm = mcolors.Normalize(vmin=df['TotalDistance'].min(), vmax=df['TotalDistance'].max())
    # Choose a colormap (e.g., 'viridis', 'plasma', 'Blues')
    cmap = cm.get_cmap('Purples')
    
    # Create colors for each bar
    colors = [cmap(norm(val)) for val in df['TotalDistance']]
    
    plt.figure(figsize=(12, 6))
    
    # Bar Chart with custom colors
    bars = plt.bar(df['Month'], df['TotalDistance'], color=colors)
    
    plt.title('Monthly Distance (Colored by Intensity)', fontsize=16)
    plt.xlabel('Month')
    plt.ylabel('Distance (km)')
    plt.xticks(rotation=45)
    
    # Add a Colorbar to show scale
    sm = cm.ScalarMappable(cmap=cmap, norm=norm)
    sm.set_array([])
    plt.colorbar(sm, label='Distance Intensity')
    
    plt.tight_layout()
    plt.savefig('colored_bar_chart.png')
    print("Chart saved to colored_bar_chart.png")
    plt.show()

if __name__ == "__main__":
    visualize()
