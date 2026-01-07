# Week 5 - Visualization (Tableau)

## Goal

Create a **Highlight Table (Heatmap)** of Weekly Distances.

## Instructions

### 1. Connect to Data

1.  Connect to `weekly_distance_heatmap.csv`.

### 2. Build the View

1.  **Columns**: Drag `Week`.
    *   Measure > Count/Dimension? -> Ensure it is treated as a **Discrete Dimension** (blue pill).
2.  **Rows**: Drag `Year`.
    *   Ensure it is a **Discrete Dimension** (blue pill).
3.  **Marks**: Select **Square**.
4.  **Color**: Drag `TotalDistance` to Color.

### 3. Format

1.  **Color Palette**: Click Color > Edit Colors > Select "Purple" (Sequential).
2.  **Label**: Drag `TotalDistance` to Label to show numbers inside squares.
3.  **Layout**: Adjust column widths to make squares look uniform.
