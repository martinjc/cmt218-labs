import pandas as pd
import os
import numpy as np

def extract_data():
    input_path = '../../data/runs_only_redacted.csv'
    output_path = 'weekly_distance_heatmap.csv'
    
    if not os.path.exists(input_path):
        print(f"Error: Input file")
        return

    try:
        df = pd.read_csv(input_path)
        df.columns = [c.lower() for c in df.columns]
        
        # Parse dates
        if 'start_date' in df.columns:
            df['Date'] = pd.to_datetime(df['start_date'])
        else:
            return

        # Distance km
        df['Distance'] = df['distance'] / 1000
        
        # Calculate Pace?
        # Requirement: "tooltip showing total distance, avg pace, total runs"
        # Need moving_time
        if 'moving_time' in df.columns:
             df['Time'] = df['moving_time']
        elif 'average_speed' in df.columns:
             df['Time'] = df['distance'] / df['average_speed']
        else:
             df['Time'] = df['Distance'] * 5 * 60 # varying fallback? 
        
        # Extract Year and Week
        # Iso calendar is best for heatmaps usually
        df['Year'] = df['Date'].dt.isocalendar().year
        df['Week'] = df['Date'].dt.isocalendar().week
        
        # Aggregate
        weekly = df.groupby(['Year', 'Week']).agg(
            TotalDistance=('Distance', 'sum'),
            TotalTime=('Time', 'sum'),
            RunCount=('Distance', 'count')
        ).reset_index()
        
        # Avg Pace
        weekly['AveragePace'] = (weekly['TotalTime'] / 60) / weekly['TotalDistance']
        # Handle nan/inf
        weekly['AveragePace'] = weekly['AveragePace'].replace([np.inf, -np.inf], 0).fillna(0)
        
        # Round
        weekly['TotalDistance'] = weekly['TotalDistance'].round(2)
        weekly['AveragePace'] = weekly['AveragePace'].round(2)
        
        weekly.to_csv(output_path, index=False)
        print(f"Created {output_path}")

    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    extract_data()
