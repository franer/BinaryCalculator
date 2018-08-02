require("should");
const calculator = require("../calculator");

beforeEach(() => calculator.init());

describe("Init the calculator", () => {
  it("should create a calculator without params (default)", () => {
    calculator.init();
    const {
      N,
      table
    } = calculator.getParams();
    N.should.be.a.Number().and.be.equal(16);
    table.should.be.a.Array().and.length(16);
    table.should.be.eql(
      [
        1,
        2,
        4,
        8,
        16,
        32,
        64,
        128,
        256,
        512,
        1024,
        2048,
        4096,
        8192,
        16384,
        32768
      ].reverse()
    );
  });
  it("should create a calculator with param (N = 8)", () => {
    calculator.init({
      N: 8
    });
    const {
      N,
      table
    } = calculator.getParams();
    N.should.be.a.Number().and.be.equal(8);
    table.should.be.a.Array().and.length(8);
    table.should.be.eql([1, 2, 4, 8, 16, 32, 64, 128].reverse());
  });
  it("should create a calculator with param (N = 11)", () => {
    calculator.init({
      N: 11
    });
    const {
      N,
      table
    } = calculator.getParams();
    N.should.be.a.Number().and.be.equal(11);
    table.should.be.a.Array().and.length(11);
    table.should.be.eql(
      [1, 2, 4, 8, 16, 32, 64, 128, 256, 512, 1024].reverse()
    );
  });
});

describe("Binary", () => {
  it("should return a number in binary if the value is correct", () => {
    calculator
      .toBinary(5)
      .should.be.a.String()
      .and.have.be.eql("101");

    calculator
      .toBinary(100)
      .should.be.a.String()
      .and.have.be.eql("1100100");

    calculator
      .toBinary(2000)
      .should.be.a.String()
      .and.have.be.eql("11111010000");

    calculator
      .toBinary(0)
      .should.be.a.String()
      .and.have.be.eql("0");

    calculator
      .toBinary(8)
      .should.be.a.String()
      .and.have.be.eql("1000");

    /*  expect(calculator.toBinary(5)).toBe("101"); <- Junit/PHPUnit */
  });
  it("should return an Error stackoverflow when the number is upper limit - (N = 16)", () => {
    (function () {
      calculator.toBinary(65536);
    }.should.throw());
  });

  it("should return a Error stackoverflow when the number is upper limit - (N = 8)", () => {
    calculator.init({
      N: 8
    });
    (function () {
      calculator.toBinary(33000);
    }.should.throw());
  });
});

describe("Decimal", () => {
  it("should return a number in decimal if the value is correct", () => {
    calculator
      .toDecimal("101")
      .should.be.a.Number()
      .and.have.be.eql(5);

    calculator
      .toDecimal("1100100")
      .should.be.a.Number()
      .and.have.be.eql(100);

    calculator
      .toDecimal("11111010000")
      .should.be.a.Number()
      .and.have.be.eql(2000);

    calculator
      .toDecimal("0")
      .should.be.a.Number()
      .and.have.be.eql(0);

    calculator
      .toDecimal("1000")
      .should.be.a.Number()
      .and.have.be.eql(8);
  });
});

describe("Octal", () => {
  it("should return a number in octal if the value is correct", () => {
    calculator
      .toOctal(5)
      .should.be.a.String()
      .and.have.be.eql("5");

    calculator
      .toOctal(8)
      .should.be.a.String()
      .and.have.be.eql("10");

    calculator
      .toOctal(132)
      .should.be.a.String()
      .and.have.be.eql("204");

    calculator
      .toOctal(52500)
      .should.be.a.String()
      .and.have.be.eql("146424");
  });
  it("should return a Error stackoverflow when the number is upper limit - (N = 16)", () => {
    calculator.init({
      N: 16
    });
    (function () {
      calculator.toOctal(65536);
    }.should.throw());
  });

  it("should return a Error stackoverflow when the number is upper limit - (N = 8)", () => {
    calculator.init({
      N: 8
    });
    (function () {
      calculator.toOctal(256);
    }.should.throw());
  });
});

describe("SM", () => {
  it("should return a number in SM if the value is correct (N =8)", () => {
    calculator.init({
      N: 8
    });
    calculator
      .toSM(55)
      .should.be.a.String()
      .and.have.be.eql("00110111");

    calculator
      .toSM(5)
      .should.be.a.String()
      .and.have.be.eql("00000101");

    calculator
      .toSM(-5)
      .should.be.a.String()
      .and.have.be.eql("10000101");

    calculator
      .toSM(100)
      .should.be.a.String()
      .and.have.be.eql("01100100");

    calculator
      .toSM(-100)
      .should.be.a.String()
      .and.have.be.eql("11100100");
  });

  it("should return a Error stackoverflow when the number is upper limit - (N = 16)", () => {
    calculator.init({
      N: 16
    });
    (function () {
      calculator.toOctal(65536);
    }.should.throw());
  });

  it("should return a Error stackoverflow when the number is upper limit - (N = 8)", () => {
    calculator.init({
      N: 8
    });
    (function () {
      calculator.toOctal(256);
    }.should.throw());
  });
});

describe("C1", () => {
  it("should return a number in C1 if the value is correct (N =8)", () => {
    calculator.init({
      N: 8
    });
    calculator.toC1(55)
      .should.be.a.String()
      .and.have.be.eql("00110111");

    calculator.toC1(-55)
      .should.be.a.String()
      .and.have.be.eql("11001000");

    calculator.toC1(100)
      .should.be.a.String()
      .and.have.be.eql("01100100");

    calculator.toC1(-100)
      .should.be.a.String()
      .and.have.be.eql("10011011");
  });

  it("should return a Error stackoverflow when the number is upper limit - (N = 16)", () => {
    calculator.init({
      N: 16
    });
    (function () {
      calculator.toC1(65536)
    }.should.throw());
  });

  it("should return a Error stackoverflow when the number is upper limit - (N = 8)", () => {
    calculator.init({
      N: 8
    });
    (function () {
      calculator.toC1(256)
    }.should.throw());
  });
});

describe("C2", () => {
  it("should return a number in C2 if the value is correct (N =8)", () => {
    calculator.init({
      N: 8
    });
    calculator.toC2(-5)
      .should.be.a.String()
      .and.have.be.eql("11111011");

    calculator.toC2(5)
      .should.be.a.String()
      .and.have.be.eql("00000101");

    calculator.toC2(-100)
      .should.be.a.String()
      .and.have.be.eql("10011100");

    calculator.toC2(100)
      .should.be.a.String()
      .and.have.be.eql("01100100");
  });

  it("should return a Error stackoverflow when the number is upper limit - (N = 16)", () => {
    calculator.init({
      N: 16
    });
    (function () {
      calculator.toC1(65536)
    }.should.throw());
  });

  it("should return a Error stackoverflow when the number is upper limit - (N = 8)", () => {
    calculator.init({
      N: 8
    });
    (function () {
      calculator.toC1(256)
    }.should.throw());
  });
});
