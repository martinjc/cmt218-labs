# Week 1 - Data Extraction (Python)

In this week's exercise, we will check our data and prepare it for visualisation. We will be using the Python programming language and the Pandas library to load, clean, and aggregate our running data.

## Goal

We want to create a `distance_per_month.csv` file that contains the total distance run for each month in our dataset.

## Instructions

1.  **Setup**:
    *   Ensure you have Python installed.
    *   It is recommended to use a virtual environment:
        ```bash
        python3 -m venv venv
        source venv/bin/activate  # On Mac/Linux
        # .\venv\Scripts\activate # On Windows
        ```
    *   Install Pandas: `pip install pandas`

2.  **Create your script**:
    *   Create a new file named `extract_data.py`.
    *   Import the necessary libraries: `pandas` and `os`.

3.  **Load the Data**:
    *   Use `pd.read_csv()` to load the dataset.
    ```python
    df = pd.read_csv('../../data/runs_only_redacted.csv')
    ```

4.  **Process the Data**:
    *   **Convert Dates**: We need to ensure Pandas understands the date column.
    ```python
    df['Date'] = pd.to_datetime(df['Date'])
    ```
    *   **Create Month Column**: We will group by month. Converting to a period 'M' gives us a YYYY-MM format.
    ```python
    df['YearMonth'] = df['Date'].dt.to_period('M')
    ```
    *   **Group and Aggregate**: Group by the new month column and sum the distances.
    ```python
    monthly_stats = df.groupby('YearMonth').agg(
        TotalDistance=('Distance', 'sum'),
        RunCount=('Distance', 'count')
    ).reset_index()
    
    # Calculate Average Pace (Total Time / Total Distance) if needed, 
    # or just take the mean of the 'Average Pace' column if strictly instructed,
    # though weighted average is more accurate.
    # For simplicity in this tutorial, we can use the mean of the column:
    monthly_stats['AveragePace'] = df.groupby('YearMonth')['Average Pace'].mean().reset_index()['Average Pace']
    ```
    *   **Formatting**: Convert distance to km (if in meters) and format the month string for the CSV.
    ```python
    monthly_stats['Month'] = monthly_stats['YearMonth'].dt.strftime('%Y-%m')
    monthly_stats['TotalDistance'] = monthly_stats['TotalDistance'] / 1000
    ```

5.  **Save the Output**:
    *   Select the columns you want to keep.
    *   Use `.to_csv()` to save the result to `distance_per_month.csv`.

## Hints

*   Remember that the raw distance is in meters! You might want to convert it to kilometers.
*   Check your column names if you get key errors.

## Verification

Run your script:
```bash
python3 extract_data.py
```
Check that `distance_per_month.csv` is created and looks correct (open it in a text editor or Excel).
