# Week 3 - Visualization (PowerBI)

## Goal

Create a **Line Chart** showing Trailing 365-Day Distance.

## Instructions

### 1. Get Data

1.  Load `Week 3/data/trailing_365_distance.csv`.
2.  Ensure `Date` is detected as a Date column.

### 2. Create Visual

1.  Select **Line Chart**.
2.  Drag `Date` to **X-axis**.
    *   *Important: If Power BI creates a Date Hierarchy (Year/Quarter/Month/Day), right-click the field in the axis well and select "Date" (the raw column name) to show continuous time.*
3.  Drag `Trailing365` to **Y-axis**.

### 3. Format

1.  **Lines**:
    *   Stroke Width: 3px.
    *   Color: Purple.
2.  **Y-Axis**:
    *   Title: "Distance (km)".
3.  **Title**: "Trailing 365 Days".

*(Advanced: If using raw data, you would create a New Measure using DAX: `CALCULATE(SUM(Runs[Distance]), DATESINPERIOD(Runs[Date], LASTDATE(Runs[Date]), -365, DAY))`)*
