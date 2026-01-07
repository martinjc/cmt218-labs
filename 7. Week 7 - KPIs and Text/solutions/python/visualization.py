import pandas as pd
import matplotlib.pyplot as plt
import os

def visualize():
    data_path = '../../data/kpi_stats.csv'
    
    if not os.path.exists(data_path):
        print(f"Data not found at {data_path}")
        # Fallback if specific KPI file doesn't exist (it might have been generated in Week 7 data extraction)
        # Week 7 extraction generated 'global_kpis.csv'
        return

    df = pd.read_csv(data_path)
    # Assumes structure: Label, Value (or columns like TotalDistance, TotalRuns, etc.)
    # Let's inspect column names first.
    # For now, I'll assume it's a single row with columns.
    
    kpis = df.iloc[0]
    
    # Plot "Infographic"
    fig, ax = plt.subplots(figsize=(12, 4))
    ax.axis('off')
    
    # Define Metrics to show
    # Adjust keys based on actual CSV content found in list_dir
    metrics = [
        ('Total Runs', kpis.get('TotalRuns', 0)),
        ('Total Distance', f"{kpis.get('TotalDistance', 0)} km"),
        ('Longest Run', f"{kpis.get('LongestRun', 0)} km"),
        ('Avg Pace', f"{kpis.get('AveragePace', 0)} min/km")
    ]
    
    # Position them
    for i, (label, value) in enumerate(metrics):
        x = (i + 0.5) / len(metrics)
        ax.text(x, 0.6, str(value), ha='center', va='center', fontsize=24, fontweight='bold', color='#2c3e50')
        ax.text(x, 0.4, label, ha='center', va='center', fontsize=14, color='#7f8c8d')
        
    plt.title('Quick Global Stats', fontsize=18)
    plt.tight_layout()
    plt.savefig('kpi_dashboard.png')
    print("KPI Infographic saved to kpi_dashboard.png")
    plt.show()

if __name__ == "__main__":
    visualize()
