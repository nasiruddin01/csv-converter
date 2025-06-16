const fs = require("fs");
const csv = require("csv-parser");
const { parse } = require("date-fns");

// Read input file
const results = [];
fs.createReadStream("bill.csv")
  .pipe(csv())
  .on("data", (data) => {
    // Extract text from first brackets
    const descriptionMatch = data.Description.match(/\(([^)]+)\)/);
    let extractedDescription = descriptionMatch
      ? descriptionMatch[1]
      : data.Description;
    extractedDescription = extractedDescription.replace(/,/g, " ");

    // Process amount: remove minus, multiply by 125
    const amount = Math.abs(parseFloat(data.Amount)) * 125;

    // Convert date format
    const date = parse(data.Date, "dd MMM, yyyy", new Date());
    const formattedDate = date.toISOString().split("T")[0];

    results.push({
      Date: formattedDate,
      Description: extractedDescription,
      Amount: amount,
    });
  })
  .on("end", () => {
    // Ensure output directory exists
    if (!fs.existsSync("csvoutput")) {
      fs.mkdirSync("csvoutput");
    }
    // Convert to CSV
    const csvOutput = [
      Object.keys(results[0]).join(","),
      ...results.map((row) => Object.values(row).join(",")),
    ].join("\n");

    // Write to output file
    fs.writeFileSync("csvoutput/processed-data.csv", csvOutput);
    console.log("Processing complete! Check csvoutput/processed-data.csv");
  });
