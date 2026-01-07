# Week 5 - Data Extraction (Excel)

## Goal

Aggregate Distance by **Year** and **Week Number**.

## Instructions

1.  **Open Data**: `runs_only_redacted.csv`.
2.  **Calculate Year & Week**:
    *   Helper Col 1 `Year`: `=YEAR(A2)`
        *   *Tip: ISO Years can differ from calendar years near Jan 1st. For simplicity, standard YEAR() is often sufficient, or use =ISOWEEKNUM logic if available.*
    *   Helper Col 2 `Week`: `=ISOWEEKNUM(A2)`
        *   *ISOWEEKNUM is available in Excel 2013+. It creates standard Monday-start weeks.*
3.  **Pivot Table**:
    *   Rows: `Year`
    *   Columns: `Week`
    *   Values: `Sum of Distance`
4.  **Flatten for Output**:
    *   The Visualization typically requires a "Long Format" (Year, Week, Distance).
    *   Pivot Table default is "Wide" (Matrix).
    *   **Option A**: Change Pivot Layout to Tabular, repeat item labels.
    *   **Option B (Easier)**: Put BOTH `Year` and `Week` in the **Rows** area.
        *   Go to Design > Report Layout > Show in Tabular Form.
        *   Design > Report Layout > Repeat All Item Labels.
        *   Design > Subtotals > Do Not Show Subtotals.
5.  **Save**:
    *   Copy the 3 columns (Year, Week, TotalDistance) to `weekly_distance_heatmap.csv`.
