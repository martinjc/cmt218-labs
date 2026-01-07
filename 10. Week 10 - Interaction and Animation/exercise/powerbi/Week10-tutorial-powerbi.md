# Week 10 - Visualization (PowerBI)

## Goal

Enable **Interactivity** (Cross-filtering and Slicers).

## Instructions

### 1. Slicers

1.  Select your **Dashboard Page**.
2.  Add a **Slicer** visual.
3.  Drag `Date` (from any dataset that has it, e.g., Week 3 data) to the Field.
4.  Change Slicer settings to "Between" (Date Range slider).
5.  *Note: For the slicer to filter ALL charts, all datasets must be related in the "Model View". If you used separate CSVs for each week without relationship, it won't filter everything automatically.*
    *   *For this tutorial, create a relationship or just demonstrate filtering the Week 3 Line Chart.*

### 2. Cross-Highlighting

1.  Select the **Bar Chart** (Monthly Distances).
2.  Click on a specific Month bar (e.g., June).
3.  Observe how the other charts (Pie, Scatter) react. They should highlight data corresponding to that selection (if relationships exist).

### 3. Edit Interactions

1.  Select the Bar Chart.
2.  Go to **Format (Tab) > Edit interactions**.
3.  Small icons appear above other charts (Filter icon vs. Highlight icon vs. None).
4.  Choose **Filter** (Funnel icon) for the Line Chart instead of Highlight, so the line redrawing to show only that month's data.

### 4. Publish (Optional)

1.  Save as `Final_Dashboard.pbix`.
2.  Click **Publish** to share to Power BI Service.
