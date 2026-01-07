# Week 2 - Visualization (Tableau)

## Goal

Create a **Scatter Plot** of Distance vs. Pace.

## Instructions

### 1. Connect to Data

1.  Connect to `distance_vs_pace.csv`.
2.  Go to **Sheet 1**.

### 2. Build the View

1.  **Columns**: Drag `Distance`.
2.  **Rows**: Drag `Pace`.
3.  **Analysis Menu**: Uncheck **Aggregate Measures**.
    *   *Why?* Tableau aggregates all data to one point by default. We want one point per row.
    *   *Alternative*: Drag a unique identifier (like Row ID or Date) to the **Detail** card.

### 3. Analytics (Average Lines)

1.  Switch to the **Analytics** tab (left pane, next to Data).
2.  Drag **Average Line** into the view.
    *   Drop it on **Table** (creates a crosshair of averages).

### 4. Format

1.  **Shape**: Change Mark Type to **Circle**.
2.  **Color**: Set to Purple.
3.  **Opacity**: Lower opacity (60%) to see overlap.
