/**
 * Utility function for printing padded strings
 * @param { string } str The string to pad
 * @param { number } len The length to pad out to
 * @param { "left" | "right" } [padSide="right"] Which side of the string to apply padding
 * @param { string } [padChar=" "] The character to pad with
 * @returns
 */
function padString(str, len, padSide = "right", padChar = " ") {
  const padChars = padChar.repeat(len - str.length);
  return padSide === "left" ? `${padChars}${str}` : `${str}${padChars}`;
}

/**
 * Display a helpful message
 */
export function help() {
  const usageTable = [
    ["help", "", "Display this message"],
    ["getRecipe", "id: int - id of recipe", "fetch a recipe by id"],
    ["getAll", "", "Fetch all recipes and ingredients"],
  ];
  const colWidths = [15, 30, 70];
  const getTableRow = (row, separator = ".", padChar = " ") => {
    // table starts with a | on every row (left border)
    let result = "|";
    for (let colIndex = 0; colIndex < colWidths.length; colIndex++) {
      // text for the cell
      const val = row[colIndex] || "";

      // column width
      const colWidth = colWidths[colIndex];

      // pad and append
      if (colIndex !== 0) {
        // separators go before every cell except the first one
        result += separator;
      }
      result += padString(val, colWidth, "right", padChar);
    }
    // right side border
    return result + "|";
  };

  const logTableRow = (row) =>
    console.log(getTableRow(row.map((v) => " " + v)));
  const logEmptyRow = (padChar, separator = "^") =>
    console.log(getTableRow([], separator, padChar));

  console.log("Usage: node client.mjs [command] [param]");
  // top border
  logEmptyRow("=", "=");

  // header row
  logTableRow(["Command", "Param", "Description"]);

  // help rows
  usageTable.forEach((row) => {
    logEmptyRow("-");
    logTableRow(row);
  });

  // bottom border
  logEmptyRow("=", "=");
}
