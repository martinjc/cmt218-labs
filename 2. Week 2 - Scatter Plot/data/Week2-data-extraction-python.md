# Week 2 - Data Extraction (Python)

In this week's exercise, we will extract data suitable for a scatter plot to analyze the relationship between Distance and Pace.

## Goal

Create a `distance_vs_pace.csv` file.

## Instructions

1.  **Setup**:
    *   Use the virtual environment you set up in Week 1.
    *   Make sure `pandas` is installed.

2.  **Create Script**:
    *   Create `extract_data.py`.
    *   Import pandas.

3.  **Process**:
    *   **Read Data**:
    ```python
    df = pd.read_csv('../../data/runs_only_redacted.csv')
    ```
    *   **Calculate Metrics**:
        *   Convert `distance` from meters to km (divide by 1000).
        *   Calculate `AveragePace` (min/km).
            *   We can compute pace from `average_speed` (m/s) if available:
            *   `Pace (min/km) = (1000 / Speed (m/s)) / 60`
    ```python
    # Ensure column names are lowercase for consistency
    df.columns = [c.lower() for c in df.columns]
    
    df['Distance'] = df['distance'] / 1000
    
    # Calculate Pace from Speed (formula: 16.667 / speed_in_m_s)
    # We use apply to avoid division by zero errors
    df['AveragePace'] = df['average_speed'].apply(lambda x: 16.666666667 / x if x > 0 else 0)
    ```
    *   **Filter**: Remove invalid entries.
    ```python
    df = df[(df['Distance'] > 0) & (df['AveragePace'] > 0)]
    ```

4.  **Output**:
    ```python
    df[['Distance', 'AveragePace']].round(2).to_csv('distance_vs_pace.csv', index=False)
    ```

## Verification

Check your CSV. It should have two columns of numerical data.
