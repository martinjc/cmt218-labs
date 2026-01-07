# Week 5 - Data Extraction (Python)

In this week's exercise, we will aggregate data by Week and Year for a calendar heatmap.

## Goal

Create `weekly_distance_heatmap.csv`.

## Instructions

1.  **Setup**:
    *   Virtual env + pandas.

2.  **Process**:
    *   **Read Data**:
    ```python
    df = pd.read_csv('../../data/runs_only_redacted.csv')
    df.columns = [c.lower() for c in df.columns]
    df['Date'] = pd.to_datetime(df['start_date'])
    ```
    *   **Extract Date Parts**:
    *   We use `dt.isocalendar()` to get the ISO Year and Week, which is standard for weekly aggregations.
    ```python
    df['Year'] = df['Date'].dt.isocalendar().year
    df['Week'] = df['Date'].dt.isocalendar().week
    ```
    *   **Aggregate**:
    ```python
    df['Distance'] = df['distance'] / 1000
    
    # Calculate Time/Pace if needed
    # ...
    
    weekly = df.groupby(['Year', 'Week']).agg(
        TotalDistance=('Distance', 'sum'),
        RunCount=('Distance', 'count')
        # ... average pace ...
    ).reset_index()
    ```

3.  **Output**:
    *   Save to CSV.

## Verification

Check that you have rows for each week where runs occurred.
