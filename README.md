# CMT218: Data Visualisation - Lab Tutorials

This repository contains the ongoing lab tutorials for the CMT218 Data Visualisation module. Each week's tutorial focuses on specific data extraction and visualisation techniques using various tools and languages.

## Project Structure

The project is organized by week, with each folder containing:

-   **Week X/**: The main folder for the week's exercise.
    -   **data/**:
        -   `runs_only_redacted.csv`: Source dataset (Strava running data).
        -   `data_description.md`: Documentation of the dataset schema and fields.
        -   Scripts and instructions for data extraction (Python, R, Excel, Sheets).
    -   **exercise/**: Starter code and instructions for the visualisation task.
    -   **solutions/**: Completed solutions for reference (Python, R, JavaScript).
        -   Note: Solutions are typically provided for programming tasks but not always for GUI tools like Tableau/PowerBI.

## Technologies

The tutorials cover a broad range of data visualisation tools:

-   **Python**: Matplotlib, Seaborn, Plotly, Dash.
-   **R**: ggplot2, Shiny (interactive).
-   **JavaScript**: D3.js.
-   **GUI Tools**: Tableau, PowerBI, Flourish.

## Dataset

The core dataset is a collection of running activities from Strava, spanning from 2011 to 2025. It includes metrics such as distance, speed, heart rate, elevation, and geolocation data.

## Getting Started

### Prerequisites

-   **Python**: Ensure you have a recent version of Python installed (3.8+). It is recommended to use a virtual environment (`venv`).
-   **R**: R and RStudio are recommended for R-based exercises.
-   **Node.js**: Required for running the JavaScript/D3.js examples locally (using a simple HTTP server).

### Setup

1.  Clone the repository:
    ```bash
    git clone https://github.com/martinjc/cmt218-labs.git
    cd cmt218-labs
    ```

2.  **Files**: Navigate to the specific week you are working on, e.g., `cd "Week 1"`.

3.  **Dependencies**: Check for any `requirements.txt` (Python) or `package.json` (Node) within specific solution or exercise folders if applicable.
