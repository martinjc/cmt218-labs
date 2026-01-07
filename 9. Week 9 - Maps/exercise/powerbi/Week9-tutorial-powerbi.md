# Week 9 - Visualization (PowerBI)

## Goal

Map the run routes using **Azure Maps** and a GeoJSON file.

## Instructions

### 1. Enable Azure Maps (If needed)

1.  Go to **File > Options and settings > Options > Preview features**.
2.  Ensure **Azure Maps Visual** is checked.
3.  Restart Power BI if you changed this.

### 2. Add Visual

1.  Insert **Azure Maps** visual.
2.  *Note: Power BI might ask you to enable map visuals in Tenant Admin settings if you are in a corporate environment. For Personal use, it usually works.*

### 3. Load Reference Layer

1.  Unlike standard data binding, we will load the GeoJSON as a static reference layer.
2.  Go to **Format visual**.
3.  Expand **Reference layer**.
4.  Switch **On**.
5.  **Add file**: Select `Week 9/data/runs.geojson`.

### 4. Adjust View

1.  The map should zoom to the extent of your routes.
2.  You can customize line color and width in the Reference Layer settings.

*Alternative: If Azure Maps is unavailable, use the **Shape Map** visual (Preview) or a Custom Visual like **Icon Map**.*
