# Week 3 - Visualization (Tableau)

## Goal

Create a **Line Chart** of Trailing 365-Day Distance.

## Instructions

### 1. Connect to Data

1.  Connect to `trailing_365_distance.csv`.

### 2. Build the View

1.  **Columns**: Drag `Date`.
    *   Right-click > Select **Exact Date**.
2.  **Rows**: Drag `Trailing365`.
    *   Marks Type should automatically be **Line**.
    *   If not, select Line from the dropdown.

### 3. Advanced (Table Calculation Method)

*If using raw data without pre-calculation:*
1.  Drag `Distance` to Rows.
2.  Right-click `SUM(Distance)` > Quick Table Calculation > **Moving Average**.
    *   *Edit Calculation*:
    *   Compute Using: Date.
    *   Previous values: 364. Next values: 0.
    *   *Note: This averages it. To Sum, you need a custom calculation `WINDOW_SUM(SUM([Distance]), -364, 0)`.*

### 4. Format

1.  **Color**: Purple.
2.  **Size**: Increase line thickness.
