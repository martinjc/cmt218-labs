# Week 7 - Data Extraction (Excel)

## Goal

Calculate Global Key Performance Indicators (KPIs).

## Instructions

1.  **Open Data**: `runs_only_redacted.csv`.
2.  **Calculate KPIs** (Anywhere in a new sheet):
    *   **Total Runs**: `=COUNT(D:D)` (Counts numeric entries in Distance column)
    *   **Total Distance**: `=SUM(D:D)`
    *   **Longest Run**: `=MAX(D:D)`
    *   **Avg Distance**: `=AVERAGE(D:D)`
3.  **Format Output**:
    *   Create a header row: `TotalRuns, TotalDistance, LongestRun, AvgDistance`
    *   Paste values (Special > Values) below.
4.  **Save**:
    *   Save as `kpi_stats.csv`.
