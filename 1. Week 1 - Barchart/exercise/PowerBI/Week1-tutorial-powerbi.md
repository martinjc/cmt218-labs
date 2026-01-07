# Week 1 - Visualization (PowerBI)

## Goal

Create a **Bar Chart** showing Total Distance per Month.

## Instructions

### 1. Get Data

1.  Open Power BI Desktop.
2.  Click **Get Data** > **Text/CSV**.
3.  Select `Week 1/data/distance_per_month.csv` (or `runs_only_redacted.csv` if doing raw aggregation).
    *   *Recommendation: Use the pre-aggregated CSV from the Data Extraction step for simplicity.*
4.  Click **Load**.

### 2. Create Visual

1.  In the **Visualizations** pane, select **Clustered Column Chart**.
2.  Drag `Month` to the **X-axis** field.
3.  Drag `TotalDistance` to the **Y-axis** field.

### 3. Format

1.  Select the chart.
2.  Go to **Format your visual** (Paintbrush icon).
3.  **X-Axis**:
    *   Title: "Month"
4.  **Y-Axis**:
    *   Title: "Total Distance (km)"
5.  **Columns**:
    *   Color: Choose a theme color (e.g., Purple).
6.  **General > Title**:
    *   Text: "Monthly Running Distance"

### 4. Save

Save your file as `Week1_Solution.pbix`.
