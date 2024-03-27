const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});

function isValidSequence(s) {
  s = s.toUpperCase();
  if (/(.)\1\1\1/.test(s)) return false;

  const pattern = /^(A{1,3}|B|Z|L|C|D|R|AB|AZ|ZL|ZC|CD|CR)+$/;
  return pattern.test(s);
}

function StringToInteger(s) {
  const values = {
    A: 1,
    B: 5,
    Z: 10,
    L: 50,
    C: 100,
    D: 500,
    R: 1000,
  };
  const subtractions = {
    A: { B: 4, Z: 9 },
    Z: { L: 40, C: 90 },
    C: { D: 400, R: 900 },
  };

  s = s.toUpperCase();

  if (!isValidSequence(s)) {
    return "Invalid sequence";
  }

  let result = 0;
  for (let i = 0; i < s.length; i++) {
    const currentChar = s[i];
    const nextChar = s[i + 1];
    if (
      i + 1 < s.length &&
      subtractions[currentChar] &&
      subtractions[currentChar][nextChar]
    ) {
      result += subtractions[currentChar][nextChar];
      i++;
    } else {
      result += values[currentChar];
    }
  }
  return result;
}

readline.question("Enter an numeral: ", (alienNumeral) => {
  const result = StringToInteger(alienNumeral);
  console.log(`The value of the numeral "${alienNumeral}" is: ${result}`);
  readline.close();
});
