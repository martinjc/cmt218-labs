# Week 3 - Data Extraction (Python)

In this week's exercise, we will calculate a rolling metric: the total distance run in the trailing 365 days for every day in our dataset.

## Goal

Create `trailing_365_distance.csv` with a row for every day.

## Instructions

1.  **Setup**:
    *   Use your virtual environment with pandas.

2.  **Process**:
    *   **Read Data**:
    ```python
    df = pd.read_csv('../../data/runs_only_redacted.csv')
    df.columns = [c.lower() for c in df.columns]
    ```
    *   **Parse Dates & Sort**:
    ```python
    df['Date'] = pd.to_datetime(df['start_date'])
    df = df.sort_values('Date')
    ```
    *   **Create Daily Index**: We need a continuous date range.
    ```python
    all_days = pd.date_range(start=df['Date'].min(), end=df['Date'].max(), freq='D')
    ```
    *   **Aggregate by Day**:
    ```python
    df['DailyDist'] = df['distance'] / 1000 # km
    
    # helper for grouping
    daily = df.groupby(df['Date'].dt.date)['DailyDist'].sum()
    
    # Reindex to fill missing days with 0
    daily = daily.reindex(all_days.date, fill_value=0)
    ```
    *   **Rolling Window**:
    ```python
    # Calculate sum over last 365 days
    rolling_sum = daily.rolling(window=365, min_periods=1).sum()
    ```

3.  **Output**:
    *   Create a DataFrame with `Date` and `TotalDistance`.
    *   Save to CSV.

## Verification

The first 364 values will increase as the window fills up. After that, it represents the "annual volume" at that point in time.
