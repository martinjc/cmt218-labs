import pandas as pd
import os

def extract_data():
    input_path = '../../data/runs_only_redacted.csv'
    output_path = 'kpi_stats.csv'
    
    if not os.path.exists(input_path):
        print(f"Error: Input file")
        return

    try:
        df = pd.read_csv(input_path)
        df.columns = [c.lower() for c in df.columns]
        
        # Distance km
        if 'distance' in df.columns:
            df['Distance'] = df['distance'] / 1000
        
        # Stats
        total_runs = len(df)
        total_distance = df['Distance'].sum()
        longest_run = df['Distance'].max()
        average_distance = df['Distance'].mean()
        
        # Create DataFrame
        stats = pd.DataFrame([{
            'TotalRuns': total_runs,
            'TotalDistance': round(total_distance, 2),
            'LongestRun': round(longest_run, 2),
            'AvgDistance': round(average_distance, 2)
        }])
        
        stats.to_csv(output_path, index=False)
        print(f"Created {output_path}")
        print(stats)

    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    extract_data()
