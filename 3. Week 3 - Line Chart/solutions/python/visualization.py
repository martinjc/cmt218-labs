import pandas as pd
import matplotlib.pyplot as plt
import matplotlib.dates as mdates
import os

def visualize():
    data_path = '../../data/trailing_365_distance.csv'
    
    if not os.path.exists(data_path):
        print(f"Data not found at {data_path}")
        return

    df = pd.read_csv(data_path)
    df['Date'] = pd.to_datetime(df['Date'])
    
    # 1. Plot
    plt.figure(figsize=(12, 6))
    
    plt.plot(df['Date'], df['TotalDistance'], color='rebeccapurple', linewidth=2, label='Trailing 365d Distance')
    
    # 2. Formatting
    plt.title('Trailing 365-Day Total Distance', fontsize=16)
    plt.xlabel('Date', fontsize=12)
    plt.ylabel('Distance (km)', fontsize=12)
    plt.grid(True, linestyle='--', alpha=0.5)
    
    # 3. Date Axis Formatting
    plt.gca().xaxis.set_major_formatter(mdates.DateFormatter('%Y-%m'))
    plt.gca().xaxis.set_major_locator(mdates.YearLocator())
    plt.xticks(rotation=45)
    
    plt.legend()
    plt.tight_layout()
    
    plt.savefig('trailing_distance_chart.png')
    print("Chart saved to trailing_distance_chart.png")
    plt.show()

if __name__ == "__main__":
    visualize()
