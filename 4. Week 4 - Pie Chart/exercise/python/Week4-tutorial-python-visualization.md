# Week 4 - Visualization (Python & Matplotlib)

## Goal

Create a Pie Chart to show the distribution of runs by Time of Day.

## Instructions

### 1. Loading Data

```python
import pandas as pd
import matplotlib.pyplot as plt

df = pd.read_csv('../../data/time_of_day_counts.csv')
```

### 2. Creating the Pie Chart

We use `plt.pie()`.

```python
plt.figure(figsize=(8, 8))

# Data
counts = df['Count']
labels = df['Category']

# Plot
plt.pie(counts, labels=labels, autopct='%1.1f%%', startangle=90)
```

### 3. Customizing

Adding colors and a title.

```python
colors = ['#f1c40f', '#e67e22', '#34495e', '#95a5a6'] # Gold, Orange, Dark Blue, Grey

plt.pie(counts, labels=labels, autopct='%1.1f%%', startangle=90, colors=colors)
plt.title('Runs by Time of Day')

plt.tight_layout()
plt.savefig('time_of_day_pie.png')
plt.show()
```
