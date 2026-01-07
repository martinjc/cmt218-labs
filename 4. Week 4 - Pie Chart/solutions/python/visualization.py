import pandas as pd
import matplotlib.pyplot as plt
import os

def visualize():
    data_path = '../../data/time_of_day_counts.csv'
    
    if not os.path.exists(data_path):
        print(f"Data not found at {data_path}")
        return

    df = pd.read_csv(data_path)
    
    # Plot
    plt.figure(figsize=(8, 8))
    
    # Colors
    # Colors (Purple Theme)
    colors = ['#D1C4E9', '#9575CD', '#673AB7', '#311B92']
    
    plt.pie(df['Count'], labels=df['Category'], autopct='%1.1f%%', startangle=90, colors=colors)
    
    plt.title('Runs by Time of Day', fontsize=16)
    
    plt.tight_layout()
    plt.savefig('time_of_day_pie.png')
    print("Chart saved to time_of_day_pie.png")
    plt.show()

if __name__ == "__main__":
    visualize()
