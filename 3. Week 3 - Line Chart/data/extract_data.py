import pandas as pd
import os
import numpy as np

def extract_data():
    input_path = '../../data/runs_only_redacted.csv'
    output_path = 'trailing_365_distance.csv'
    
    if not os.path.exists(input_path):
        print(f"Error: Input file not found at {input_path}")
        return

    try:
        # Load and normalize
        df = pd.read_csv(input_path)
        df.columns = [c.lower().strip() for c in df.columns]
        
        # Identify Columns
        date_col = next((c for c in ['start_date', 'date'] if c in df.columns), None)
        dist_col = next((c for c in ['distance', 'dist'] if c in df.columns), None)
        
        if not date_col or not dist_col:
            print(f"Error: Missing required columns. Found: {df.columns}")
            return

        # Parse Date
        df['dt'] = pd.to_datetime(df[date_col], utc=True).dt.tz_convert(None) # Make timezone naive
        
        # Parse Distance (to km)
        df['km'] = df[dist_col] / 1000.0
        
        # Handle Move Time
        if 'moving_time' in df.columns:
            df['mins'] = df['moving_time'] / 60.0
        elif 'average_speed' in df.columns:
            # speed is m/s. time = dist / speed
            # mins = (dist / speed) / 60
            df['mins'] = (df[dist_col] / df['average_speed']) / 60.0
            df['mins'] = df['mins'].replace([np.inf, -np.inf], 0).fillna(0)
        else:
            df['mins'] = 0.0

        # Set Index for Resampling
        df = df.set_index('dt').sort_index()
        
        # Resample to Daily frequency and aggregate
        # This handles missing days automatically (filling with 0 for sum/count)
        daily = df.resample('D').agg({
            'km': 'sum',
            'mins': 'sum',
            'distance': 'count' # Use original distance column for count
        }).rename(columns={'distance': 'count'})
        
        # Fill missing days with 0
        daily = daily.fillna(0)
        
        print(f"Daily aggregated data points: {len(daily)}")
        print(daily.head())

        # Rolling 365
        rolling = daily.rolling(window=365, min_periods=1).sum()
        
        # Calculate Metrics on rolling windows
        # Pace = Time(min) / Distance(km)
        rolling['pace'] = np.where(
            rolling['km'] > 0,
            rolling['mins'] / rolling['km'],
            0
        )
        
        # Output DataFrame
        output = pd.DataFrame()
        output['Date'] = rolling.index.strftime('%Y-%m-%d')
        output['TotalDistance'] = rolling['km'].values.round(2)
        output['RunCount'] = rolling['count'].values.astype(int)
        output['AveragePace'] = rolling['pace'].values.round(2)
        
        # Filter out leading zeros if desired, or keep all to show ramp up
        # The prompt implies showing trailing 365, so keeping all days is fine.
        
        output.to_csv(output_path, index=False)
        print(f"Successfully created {output_path}")
        print(output.tail())

    except Exception as e:
        print(f"Error extracting data: {e}")
        import traceback
        traceback.print_exc()

if __name__ == "__main__":
    extract_data()
