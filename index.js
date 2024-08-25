const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.post("/bfhl", (req, res) => {
  const { data } = req.body;

  if (!data || !Array.isArray(data)) {
    return res.status(400).json({ error: "Invalid input data" });
  }

  // Separate numbers and alphabets
  const numbers = data.filter((item) => !isNaN(item)).map(Number);
  const alphabets = data.filter((item) => isNaN(item));

  // Find the highest lowercase alphabet
  const lowerCaseAlphabets = alphabets.filter(
    (char) => char >= "a" && char <= "z"
  );
  const highestLowercaseAlphabet =
    lowerCaseAlphabets.length > 0 ? lowerCaseAlphabets.sort().pop() : "";

  res.json({
    numbers,
    alphabets,
    highest_lowercase_alphabet: highestLowercaseAlphabet,
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
