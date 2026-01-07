# Week 3 - Data Extraction (Excel)

## Goal

Calculate **Trailing 365-Day Total Distance**.

## Instructions

### Step 1: Daily Aggregation (Pivot Table)
Since we have multiple runs on some days and missing days, we first aggregate by day.

1.  **Insert Pivot Table** from your raw data.
2.  **Rows**: Date (Ensure it is ungrouped, i.e., shows individual days, not Years/Quarters).
3.  **Values**: Sum of Distance.
4.  **Copy/Paste**: Copy the result to a new sheet. Sort by Date Ascending.

### Step 2: Handle Missing Dates (Crucial)
Excel formulas look at previous *rows*, not previous *dates*. We need consecutive days.
*   *Note: If extensive dates are missing, this is hard in Excel. For this dataset, if gaps are small, we can proceed, or create a 'Master Date Sequence' and VLOOKUP.*
*   **Simple Method**: Assume daily data is mostly continuous or proceed with "Last 365 Entires" approximation (less accurate).
*   **Accurate Method (Recommended)**:
    1.  Create a column with Series Fill from Start Date to End Date (1-day steps).
    2.  `VLOOKUP` your Daily Distances to this master list (Fill N/A with 0).

### Step 3: Rolling Sum Formula
Assuming Column A is Date, Column B is Daily Distance (with 0s for missing days):

1.  Header C1: `Trailing 365`.
2.  In Cell C366 (row 366): `=SUM(B2:B366)` (Sum of current day + 364 previous).
3.  Drag down.

### Step 4: Save
Save columns `Date` and `Trailing 365` as `trailing_365_distance.csv`.
