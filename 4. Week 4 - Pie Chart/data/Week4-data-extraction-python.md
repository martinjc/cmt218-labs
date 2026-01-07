# Week 4 - Data Extraction (Python)

In this week's exercise, we will classify runs into Morning (AM), Afternoon/Evening (PM), or Both, based on their start and end times.

## Goal

Create `time_of_day_counts.csv` with counts for each category.

## Instructions

1.  **Setup**:
    *   Virtual env + pandas.

2.  **Process**:
    *   **Read Data**:
    ```python
    df = pd.read_csv('../../data/runs_only_redacted.csv')
    df.columns = [c.lower() for c in df.columns]
    ```
    *   **Parse Time**:
    ```python
    df['Start'] = pd.to_datetime(df['start_date'])
    df['Duration'] = pd.to_timedelta(df['moving_time'], unit='s')
    df['End'] = df['Start'] + df['Duration']
    ```
    *   **Classify**:
    Define a function to categorize each row.
    *   **Both**: If start is before noon and end is after noon.
    *   **AM**: Start < 12:00.
    *   **PM**: Start >= 12:00.
    ```python
    def classify(row):
        noon = row['Start'].replace(hour=12, minute=0, second=0)
        if row['Start'] < noon and row['End'] > noon:
            return 'Both'
        elif row['Start'].hour < 12:
            return 'AM'
        else:
            return 'PM'
            
    df['Category'] = df.apply(classify, axis=1)
    ```

3.  **Aggregate**:
    *   Count the occurrences of each category.
    ```python
    output = df['Category'].value_counts().reset_index()
    output.columns = ['Category', 'Count']
    output.to_csv('time_of_day_counts.csv', index=False)
    ```

## Verification

You should see 3 rows (AM, PM, Both) with their respective counts.
