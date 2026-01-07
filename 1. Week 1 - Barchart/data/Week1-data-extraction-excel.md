# Week 1 - Data Extraction (Excel)

## Goal

Calculate **Total Distance per Month** using a Pivot Table.

## Instructions

1.  **Open Data**: Open `runs_only_redacted.csv` in Excel.
2.  **Date Parsing**:
    *   Ensure the `Date` column is recognized as timestamps. Sort by Date.
    *   Excel might group dates automatically. If not, create a helper column `Month`:
        *   Formula in Cell `M2` (or next free column): `=TEXT(A2, "YYYY-MM")`
3.  **Insert Pivot Table**:
    *   Select your entire data range.
    *   Go to **Insert > Pivot Table**.
    *   Place it in a **New Worksheet**.
4.  **Configure Pivot Fields**:
    *   **Rows**: Drag 'Month' (or your helper column) here.
    *   **Values**: Drag 'Distance' here.
        *   Ensure it says **Sum of Distance**. If it says Count, click it > Value Field Settings > Sum.
5.  **Clean Up**:
    *   Copy the Pivot Table results (Month and Sum of Distance).
    *   Paste them as **Values** into a new sheet or file named `distance_per_month.csv`.
    *   Rename columns to `Month` and `TotalDistance`.
6.  **Save**: Save as CSV.
