# Week 2 - Visualization (PowerBI)

## Goal

Create a **Scatter Plot** showing Distance vs. Average Pace.

## Instructions

### 1. Get Data

1.  **Get Data** > **Text/CSV**.
2.  Select `Week 2/data/distance_vs_pace.csv`.
3.  Click **Load**.

### 2. Create Visual

1.  Select **Scatter Chart** from Visualizations.
2.  Drag `Distance` to the **X-axis**.
    *   *Note: Ensure it is "Don't Summarize" if Power BI tries to Sum it. Right-click the field in the well to check.*
3.  Drag `AveragePace` (or `Pace`) to the **Y-axis**.
    *   *Note: Ensure "Don't Summarize".*

### 3. Average Lines (Analytics)

1.  Go to the **Analytics** pane (Magnifying glass icon).
2.  **Average Line**:
    *   Add Line.
    *   Measure: `Distance`.
    *   Color: Grey.
    *   Label: On.
3.  Add another Average Line for `Pace`.

### 4. Format

1.  **Markers**:
    *   Shape: Circle.
    *   Size: -10 (Adjust as needed).
    *   Color: Purple.
2.  **General > Title**: "Distance vs Pace".
