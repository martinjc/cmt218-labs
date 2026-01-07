# Week 7 - Data Extraction (Python)

In this week's exercise, we will calculate Key Performance Indicators (KPIs) or summary statistics for our entire dataset.

## Goal

Create `kpi_stats.csv` with a single row of summary data.

## Instructions

1.  **Setup**:
    *   Virtual env + pandas.

2.  **Process**:
    *   **Read Data**:
    ```python
    df = pd.read_csv('../../data/runs_only_redacted.csv')
    # ... standard cleaning ...
    ```
    *   **Calculate Stats**:
    ```python
    total_runs = len(df)
    total_distance = df['Distance'].sum()
    longest_run = df['Distance'].max()
    avg_distance = df['Distance'].mean()
    ```
    *   **Create DataFrame**:
    Since these are scalars, we create a DataFrame from a list of one dictionary.
    ```python
    stats = pd.DataFrame([{
        'TotalRuns': total_runs,
        'TotalDistance': round(total_distance, 2),
        'LongestRun': round(longest_run, 2),
        'AvgDistance': round(average_distance, 2)
    }])
    ```

3.  **Output**:
    *   Save to CSV.

## Verification

Check the CSV contains headers and one row of values.
