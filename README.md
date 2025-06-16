# CSV Data Processor

A Node.js script that processes financial transaction data from CSV files. The script performs the following operations:

## Features
- Extracts text from first brackets in description field
- Removes commas from extracted descriptions
- Processes amounts by removing negative signs and multiplying by 125
- Converts dates to ISO format (YYYY-MM-DD)
- Automatically creates output directory if it doesn't exist

## Input Format
Expected CSV format:
```csv
Date,Description,Amount,Currency,Status,Transaction ID
"07 Jun, 2025",Card charge (CLOUDFLARE),-6.06,USD,Completed,892601210
```

## Output Format
```csv
Date,Description,Amount
2025-06-07,CLOUDFLARE,757.5
```

## Usage
1. Place your input CSV file as `bill.csv`
2. Run the script:
```bash
node process-csv.js
```
3. Check the output in `csvoutput/processed-data.csv`

## Example
Input: `"Card charge (CURSOR, AI POWERED IDE)",-20.20`
Output: `CURSOR AI POWERED IDE,2525`

## Project Structure
