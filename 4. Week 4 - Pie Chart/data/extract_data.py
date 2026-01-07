import pandas as pd
import os
import numpy as np

def extract_data():
    input_path = '../../data/runs_only_redacted.csv'
    output_path = 'time_of_day_counts.csv'
    
    if not os.path.exists(input_path):
        print(f"Error: Input file not found")
        return

    try:
        df = pd.read_csv(input_path)
        
        # Check columns. Need start_date and moving_time (seconds)
        df.columns = [c.lower() for c in df.columns]
        
        if 'start_date' in df.columns:
             # Parse as datetime (UTC usually in Strava data)
             df['Start'] = pd.to_datetime(df['start_date'])
        else:
             print("Error: start_date not found")
             return
             
        if 'moving_time' in df.columns:
            df['Duration'] = pd.to_timedelta(df['moving_time'], unit='s')
        else:
            # Fallback or error? Let's assume moving_time exists or prompt said so
            print("Error: moving_time not found")
            return
            
        # Calculate End Time
        df['End'] = df['Start'] + df['Duration']
        
        # Classify
        # Morning (AM): Start < 12:00
        # Afternoon/Evening (PM): Start >= 12:00
        # Both: Spans over 12:00?
        # Requirement: "Runs that span over midday are counted in a 'both' category."
        
        # Logic: 
        #   Start Hour
        #   End Hour
        # If Start < 12 and End >= 12 -> Both
        # Else If Start < 12 -> AM
        # Else -> PM (Start >= 12)
        
        def classify(row):
            start_hour = row['Start'].hour
            end_hour = row['End'].hour
            
            # Simplified check: strictly speaking, spanning midday means crossing 12:00:00
            # E.g. Start 11:30, End 12:30.
            
            # Check if interval contains a noon
            # Start and End are timestamps.
            # Local time issue? Assuming local or consistent.
            
            s = row['Start']
            e = row['End']
            
            # Noon on the start day
            noon = s.replace(hour=12, minute=0, second=0, microsecond=0)
            
            if s < noon and e > noon:
                return 'Both'
            elif s.hour < 12:
                return 'AM'
            else:
                return 'PM'

        df['Category'] = df.apply(classify, axis=1)
        
        # Examples of categories
        print(df['Category'].value_counts())
        
        # Aggregate
        counts = df['Category'].value_counts().reset_index()
        counts.columns = ['Category', 'Count']
        
        counts.to_csv(output_path, index=False)
        print(f"Created {output_path}")

    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    extract_data()
