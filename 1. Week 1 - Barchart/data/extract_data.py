import pandas as pd
import os

def extract_data():
    # Load the dataset
    input_path = '../../data/runs_only_redacted.csv'
    output_path = 'distance_per_month.csv'
    
    # Check if input file exists
    if not os.path.exists(input_path):
        print(f"Error: Input file not found at {input_path}")
        return

    try:
        # Read CSV - explicitly handling potential bad lines or types if needed, 
        # but standard read_csv usually works well.
        df = pd.read_csv(input_path)
        
        # Ensure 'Date' is datetime
        if 'Date' in df.columns:
            df['Date'] = pd.to_datetime(df['Date'])
        elif 'start_date' in df.columns: # Found start_date in previous check
             df['Date'] = pd.to_datetime(df['start_date'])
        else:
            print("Error: Could not find Date column")
            return

        # Ensure Distance is float
        # Found 'distance' column (lowercase) in check_headers check
        if 'distance' in df.columns:
            df['Distance'] = pd.to_numeric(df['distance'], errors='coerce')
        elif 'Distance' in df.columns:
              df['Distance'] = pd.to_numeric(df['Distance'], errors='coerce')
        else:
             print("Error: Could not find Distance column")
             return

        # Handle Average Pace if it exists, otherwise calculate it or skip?
        # The prompt mentions Average Pace. 
        # check_headers showed: 1: average_cadence, 3: average_speed. 
        # It didn't strictly show 'Average Pace'. 
        # Usually Pace = 1 / Speed. Speed is likely m/s or km/h.
        # Let's check headers again or infer. 
        # The user file 'runs_only_redacted.csv' from previous attempts seemed to have 'Average Pace'.
        # But check_headers output: 0: achievement_count ... 3: average_speed ... 7: distance ...
        # It did NOT show 'Average Pace' in the top 25 columns. 
        # But earlier I saw: "8,76.9,142.6,2.981,..." and header check said "3: average_speed".
        # Let's recalculate Pace from Distance / Time if needed or look for it.
        # Average Speed (m/s) -> Pace (min/km). 
        # Pace (min/km) = (1000 / Speed (m/s)) / 60 = 16.666 / Speed.
        # Or Just use average_speed for now and rename?
        # WAIT. The earlier `head` command output showed "341.9" etc.
        # Actually, let's look at the previous `check_headers` output again.
        # Columns: distance, moving_time or elapsed_time.
        # I can calculate Average Pace = (Moving Time / 60) / (Distance / 1000) = min/km.
        
        # Let's inspect columns to be safe. I'll include a print of columns in the script to debug if needed.
        
        # For now, I will assume 'average_speed' is available and 'moving_time' and 'distance'.
        # Pace (min/km) = 16.666666667 / average_speed (if m/s).
        
        # Extract Month and Year
        df['YearMonth'] = df['Date'].dt.to_period('M')
        
        # Group
        monthly_stats = df.groupby('YearMonth').agg(
            TotalDistance=('Distance', 'sum'),
            RunCount=('Distance', 'count'),
            TotalTime=('moving_time', 'sum') # assuming moving_time exists
        ).reset_index()
        
        # Calculate Average Pace for the month (weighted average essentially)
        # Avg Pace = Total Time (min) / Total Distance (km)
        # moving_time is likely seconds. distance is likely meters.
        monthly_stats['AveragePace'] = (monthly_stats['TotalTime'] / 60) / (monthly_stats['TotalDistance'] / 1000)
        
        # Convert Distance to km for final output
        monthly_stats['TotalDistance'] = monthly_stats['TotalDistance'] / 1000
        
        # Format YearMonth
        monthly_stats['Month'] = monthly_stats['YearMonth'].dt.strftime('%Y-%m')
        
        # Select columns
        output_df = monthly_stats[['Month', 'TotalDistance', 'AveragePace', 'RunCount']]
        
        # Round
        output_df['TotalDistance'] = output_df['TotalDistance'].round(2)
        output_df['AveragePace'] = output_df['AveragePace'].round(2)
        
        output_df.to_csv(output_path, index=False)
        print(f"Successfully created {output_path}")
        print(output_df.head())

    except Exception as e:
        print(f"An error occurred: {e}")
        import traceback
        traceback.print_exc()

if __name__ == "__main__":
    extract_data()
