# Week 9 - Visualization (Tableau)

## Goal

Create a **Map** of Routes from GeoJSON.

## Instructions

### 1. Connect to Data

1.  **Connect** > **Spatial File**.
2.  Select `runs.geojson`.

### 2. Build the View

1.  Double-click the **Geometry** field.
    *   Tableau automatically detects spatial types and generates a map (`Longitude (generated)` / `Latitude (generated)`).
2.  **Marks**: Ensure it is set to **Collect** or **Line**.
    *   Tableau creates a "Collection" of all linestrings.
3.  **Detail**: Drag `ID` (or unique run identifier) to **Detail** to separate lines.

### 3. Format

1.  **Color**: Drag `Distance` (if available in properties) to Color.
2.  **Map Layers**: Map > Background Layers > Style: **Dark**, Washout: 0% (or Light/Street depending on preference).
