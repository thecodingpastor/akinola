const keywords = [
  "False",
  "None",
  "True",
  "and",
  "as",
  "assert",
  "async",
  "await",
  "break",
  "class",
  "continue",
  "def",
  "del",
  "elif",
  "else",
  "except",
  "finally",
  "for",
  "from",
  "global",
  "if",
  "import",
  "in",
  "is",
  "lambda",
  "nonlocal",
  "not",
  "or",
  "pass",
  "raise",
  "return",
  "try",
  "while",
  "with",
  "yield",
];

const characters = ["{", "}", "'", `"`];

const findChars = (paragraph) => {
  // let paragraphAsArray = paragraph.split(" ");
  let paragraphAsArray = paragraph.replace("import", "Hello");
  return paragraphAsArray;

  // paragraph = "Hello";
  // str.replace(/( |^)@devtest1\b/g, "$1aaaa");
};
