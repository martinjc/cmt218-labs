import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
import os

def visualize():
    # Setup Figure
    fig = plt.figure(figsize=(20, 12))
    
    # Grid Layout: 2x2
    gs = fig.add_gridspec(2, 2)
    
    # --- Chart 1: Bar Chart (Distance per Month) ---
    ax1 = fig.add_subplot(gs[0, 0])
    df1 = pd.read_csv('../../data/distance_per_month.csv')
    ax1.bar(df1['Month'], df1['TotalDistance'], color='rebeccapurple')
    ax1.set_title('Distance per Month')
    ax1.tick_params(axis='x', rotation=45)
    
    # --- Chart 2: Scatter Plot (Distance vs Pace) ---
    ax2 = fig.add_subplot(gs[0, 1])
    df2 = pd.read_csv('../../data/distance_vs_pace.csv')
    sc = ax2.scatter(df2['Distance_km'], df2['AveragePace_min_km'], c=df2['AveragePace_min_km'], cmap='Purples')
    ax2.set_title('Distance vs Pace')
    ax2.set_xlabel('Distance (km)')
    ax2.set_ylabel('Pace (min/km)')
    
    # --- Chart 3: Line Chart (Trailing 365) ---
    ax3 = fig.add_subplot(gs[1, 0])
    df3 = pd.read_csv('../../data/trailing_365_distance.csv')
    df3['Date'] = pd.to_datetime(df3['Date'])
    ax3.plot(df3['Date'], df3['TotalDistance'], color='rebeccapurple')
    ax3.set_title('Trailing 365-Day Distance')
    ax3.tick_params(axis='x', rotation=45)
    
    # --- Chart 4: Pie Chart (Time of Day) ---
    ax4 = fig.add_subplot(gs[1, 1])
    df4 = pd.read_csv('../../data/time_of_day_counts.csv')
    ax4.pie(df4['Count'], labels=df4['Category'], autopct='%1.1f%%', colors=['#D1C4E9', '#9575CD', '#673AB7', '#311B92'])
    ax4.set_title('Time of Day')
    
    # Final Layout
    plt.tight_layout()
    plt.suptitle('Running Dashboard', fontsize=24, y=1.02)
    plt.savefig('dashboard.png', bbox_inches='tight')
    print("Dashboard saved to dashboard.png")
    plt.show()

if __name__ == "__main__":
    visualize()
