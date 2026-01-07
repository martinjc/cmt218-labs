import pandas as pd
import os

def extract_data():
    input_path = '../../data/runs_only_redacted.csv'
    output_path = 'linked_data.csv'
    
    if not os.path.exists(input_path):
        print(f"Error: {input_path} not found")
        return

    df = pd.read_csv(input_path)
    
    # Process
    df['Date'] = pd.to_datetime(df['start_date'])
    df['Distance_km'] = round(df['distance'] / 1000, 2)
    df['Pace_min_km'] = round(df['average_speed'].apply(lambda x: 16.6667 / x if x > 0 else 0), 2)
    df['Month'] = df['Date'].dt.strftime('%Y-%m') # Year-Month for grouping
    
    # Keep necessary columns
    out_df = df[['Date', 'Month', 'Distance_km', 'Pace_min_km']].dropna()
    
    out_df.to_csv(output_path, index=False)
    print(f"Created {output_path}")

if __name__ == "__main__":
    extract_data()
