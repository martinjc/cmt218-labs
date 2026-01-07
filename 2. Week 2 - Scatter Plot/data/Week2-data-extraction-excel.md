# Week 2 - Data Extraction (Excel)

## Goal

Calculate **Average Pace** (min/km) for each run.

## Instructions

1.  **Open Data**: Open `runs_only_redacted.csv` in Excel.
2.  **Verify Units**:
    *   `Distance` is in km (Column `D` usually).
    *   `Time`/`Moving Time` is in seconds (Column `H` e.g.).
3.  **Create New Column**:
    *   Header in cell `O1`: `Pace (min/km)`.
4.  **Enter Formula**:
    *   We need Time in Minutes.
    *   Formula: `=(TimeCell / 60) / DistanceCell`
    *   Example (if Time is H2 and Distance is D2): `=(H2/60)/D2`
5.  **Fill Down**: Double-click the fill handle to apply to all rows.
6.  **Filter**:
    *   Select Headers > **Data > Filter**.
    *   Filter out `0` distances or `#DIV/0!` errors.
7.  **Select & Save**:
    *   Copy `Distance` and your new `Pace` column.
    *   Paste as Values into a new workbook.
    *   Save as `distance_vs_pace.csv`.
