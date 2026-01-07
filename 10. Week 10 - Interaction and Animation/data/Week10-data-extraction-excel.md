# Week 10 - Data Extraction (Excel)

## Goal

Prepare a clean dataset for Linked View Visualizations.

## Instructions

1.  **Open Data**: `runs_only_redacted.csv`.
2.  **Calculate Columns**:
    *   Ensure you have:
        *   `Date`
        *   `Distance` (km)
        *   `Pace` (min/km, calculated as `=(Time/60)/Distance`)
    *   Create a `Month` column (`=TEXT(A2, "YYYY-MM")`) for grouping.
3.  **Clean**:
    *   Filter out rows with 0 Distance or errors.
4.  **Select & Save**:
    *   Copy columns: `Date`, `Month`, `Distance`, `Pace`.
    *   Paste Values into a new workbook.
    *   Save as `linked_data.csv`.
