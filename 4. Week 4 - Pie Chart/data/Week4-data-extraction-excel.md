# Week 4 - Data Extraction (Excel)

## Goal

Classify runs into **AM** and **PM**.

## Instructions

1.  **Open Data**: `runs_only_redacted.csv`.
2.  **Extract Hour**:
    *   Excel stores Date/Time as numbers.
    *   If cell A2 is `2018-01-01 09:30:00`:
    *   Formula `B2`: `=HOUR(A2)` -> Returns `9`.
3.  **Classify (IF Function)**:
    *   Formula `C2`: `=IF(B2 < 12, "AM", "PM")`
    *   *Note: If you want to handle the "Spanning Midday" logic exactly like the Python script, you would need End Time (Start + Duration) and complex logic. For simplicity in Excel, split by Start Time.*
4.  **Count (Pivot Table)**:
    *   Insert Pivot Table.
    *   Rows: `Category` (AM/PM).
    *   Values: Count of `Category` (or any column).
5.  **Save**:
    *   Copy table to `time_of_day_counts.csv`.
