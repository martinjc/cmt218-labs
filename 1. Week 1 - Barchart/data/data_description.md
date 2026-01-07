# Week 1 Data Description

For this week's tutorial, we have extracted a simplified dataset from the main `runs_only_redacted.csv` file.

## Source Data

The source data contains individual run records. For our bar chart, we need to aggregate this data to show totals per month.

## Extracted Data: `distance_per_month.csv`

The data has been aggregated by month. Each row represents a single month.

### Columns:

- `Month`: The month and year of the record (Format: YYYY-MM).
- `TotalDistance`: The sum of the distance of all runs in that month (in km).
- `AveragePace`: The weighted average pace of runs in that month (in min/km).
- `RunCount`: The total number of runs recorded in that month.

### Example Data:

| Month   | TotalDistance | AveragePace | RunCount |
| :------ | :------------ | :---------- | :------- |
| 2020-01 | 154.23        | 5.42        | 12       |
| 2020-02 | 120.50        | 5.38        | 10       |
