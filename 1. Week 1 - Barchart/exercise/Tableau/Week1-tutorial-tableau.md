# Week 1 - Visualization (Tableau)

## Goal

Create a **Bar Chart** showing Total Distance per Month.

## Instructions

### 1. Connect to Data

1.  Open Tableau.
2.  Under **Connect**, select **Text file**.
3.  Choose `distance_per_month.csv` (or `runs_only_redacted.csv`).
4.  Go to the **Sheet 1** tab.

### 2. Build the View

1.  **Columns Shelf**: Drag `Month` (or Date).
    *   *If using Date*: Right-click the pill > Select **Month (May 2015)** (Continuous or Discrete Month/Year part).
2.  **Rows Shelf**: Drag `TotalDistance` (or Distance).
    *   Ensure aggregation is `SUM(TotalDistance)`.

### 3. Format

1.  **Show Marks Labels**: Click the **"T"** icon in the toolbar.
2.  **Color**: Click on the **Color** card > Select Purple.
3.  **Titles**: Double-click the Sheet Title ("Sheet 1") and rename to "Monthly Distance".

### 4. Save

1.  File > Save to Tableau Public (or Save As .twbx if you have Desktop).
