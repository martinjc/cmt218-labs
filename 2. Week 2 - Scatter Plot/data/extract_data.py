import pandas as pd
import os

def extract_data():
    input_path = '../../data/runs_only_redacted.csv'
    output_path = 'distance_vs_pace.csv'
    
    if not os.path.exists(input_path):
        print(f"Error: Input file not found at {input_path}")
        return

    try:
        df = pd.read_csv(input_path)
        
        # Check columns
        required_cols = ['distance', 'average_speed'] # inferred from previous checks
        # If 'average_speed' (m/s) is present, we calculate pace (min/km).
        # Pace = 16.6667 / Speed
        
        # Normalize columns if needed
        df.columns = [c.lower() for c in df.columns]
        
        if 'distance' not in df.columns:
            print("Error: 'distance' column not found")
            return
            
        # Extract and Calculate
        output_df = pd.DataFrame()
        output_df['Distance'] = df['distance'] / 1000 # Convert m to km
        
        if 'average_pace' in df.columns:
             output_df['AveragePace'] = df['average_pace']
        elif 'average_speed' in df.columns:
             # Avoid division by zero
             output_df['AveragePace'] = df['average_speed'].apply(lambda x: 16.666666667 / x if x > 0 else 0)
        else:
            print("Error: check pace/speed columns")
            return
            
        # Round and Filter
        output_df = output_df.round(2)
        
        # Filter out invalid 0s
        output_df = output_df[(output_df['Distance'] > 0) & (output_df['AveragePace'] > 0)]
        
        output_df.to_csv(output_path, index=False)
        print(f"Successfully created {output_path}")
        print(output_df.head())

    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    extract_data()
