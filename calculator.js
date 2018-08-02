const config = {
  N: 16,
  table: []
};

function createTable() {
  const table = [];
  for (let i = config.N - 1; i >= 0; i--) {
    table.push(Math.pow(2, i));
  }
  return table;
}

function toBinary(number) {
  const max = config.table.reduce((ant, cur) => ant + cur);
  if (number > max) {
    throw new Error("StackOverflow!");
  }
  const index = config.table.findIndex(e => e <= number);
  const start = index !== -1 ? index : config.N - 1;
  let result = "";
  let rest = number;
  for (let i = start; i < config.table.length; ++i) {
    if (config.table[i] <= rest) {
      result += "1";
      rest -= config.table[i];
    } else {
      result += "0";
    }
  }
  return result;
}

function toDecimal(binary) {
  const numberIterations = binary.length;
  const subtable = config.table.slice(-numberIterations);
  let result = 0;
  for (let i = 0; i < numberIterations; ++i) {
    if (binary[i] === "1") {
      result += subtable[i];
    }
  }
  return result;
}

function toOctal(number) {
  let binary = toBinary(number);
  const fillZero = binary.length % 3 ? 3 - binary.length % 3 : 0;
  binary =
    Array(fillZero)
    .fill(0)
    .join("") + binary;
  const numberIterations = binary.length / 3;
  let result = "";
  for (let i = 0; i < numberIterations; ++i) {
    result += toDecimal(binary.substring(i * 3, i * 3 + 3)).toString();
  }
  return result;
}

function toSM(number) {
  let binary = "";
  let joinNumber = [];
  let sign = number < 0 ? false : true;

  number = sign ? number : number * (-1);
  binary = toBinary(number);
  let zeros = new Array(config.N - binary.length);

  let fillZero = zeros.fill(0);
  fillZero[0] = sign ? 0 : 1;

  joinNumber.push(fillZero.join("").concat(binary));
  let result = joinNumber.join("");

  return result;
}

function toC1(number) {
  const numberSM = toSM(number);
  let binaryArr = numberSM.split("");
  let resultBinary = "";

  if (binaryArr[0] != 0)
    binaryArr[0] = 0;

  if (number < 0) {
    let i = 0;
    for (i; i < binaryArr.length; i++) {
      binaryArr[i] = binaryArr[i] == 0 ? 1 : 0
    }
  }
  resultBinary = binaryArr.join("");
  return resultBinary;
}

function toC2(number) {
  const numC1 = toC1(number);
  let result = "";
  if (number < 0) {
    const c1ArrayNumber = numC1.split("");
    let c2ArrayNumber = new Array(8);
    let i = c2ArrayNumber.length - 1;

    let sumNumber = 1;
    for (i; i >= 0; i--) {
      c2ArrayNumber[i] = sumNumber != c1ArrayNumber[i] ? 1 : 0;
      sumNumber = sumNumber != c1ArrayNumber[i] ? 0 : sumNumber == 1 ? 1 : 0;

      /* if (sumNumber != c1ArrayNumber[i]) {
        c2ArrayNumber[i] = 1;
        sumNumber = 0;
      } else {
        sumNumber = sumNumber == 1 ? 1 : 0;
        c2ArrayNumber[i] = 0;
      } */
    }
    result = c2ArrayNumber.join("");
    return result;
  } else {
    return numC1;
  }
}

function init(options) {
  config.N = (options && options.N) || 16;
  config.table = createTable();
}

function getParams() {
  return {
    N: config.N,
    table: config.table
  };
}
module.exports = {
  init,
  getParams,
  toDecimal,
  toBinary,
  toOctal,
  toSM,
  toC1,
  toC2
};

function run() {
  init();
  getParams();
  createTable();
  toBinary(5);
  toSM(-5);
}
run();
