import pandas as pd
import matplotlib.pyplot as plt
import os

def visualize():
    data_path = '../../data/distance_vs_pace.csv'
    
    if not os.path.exists(data_path):
        print(f"Data not found at {data_path}")
        return

    df = pd.read_csv(data_path)
    
    # Plot
    plt.figure(figsize=(10, 6))
    
    # Scatter plot with color mapping
    sc = plt.scatter(df['Distance_km'], df['AveragePace_min_km'], 
                     c=df['AveragePace_min_km'], cmap='Purples', alpha=0.7)
    
    plt.colorbar(sc, label='Pace (min/km)')
    plt.title('Distance vs. Pace', fontsize=16)
    plt.xlabel('Distance (km)', fontsize=12)
    plt.ylabel('Pace (min/km)', fontsize=12)
    plt.grid(True, linestyle='--', alpha=0.5)
    
    plt.tight_layout()
    plt.savefig('distance_vs_pace_chart.png')
    print("Chart saved to distance_vs_pace_chart.png")
    plt.show()

if __name__ == "__main__":
    visualize()
