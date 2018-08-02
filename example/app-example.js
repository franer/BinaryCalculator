#!/usr/bin/env node

const menu = require("node-menu");
const calculator = require("../calculator");

calculator.init({
  N: 32,
});

menu.addDelimiter("-", 40, "Main Menu")
  .addItem(
    "Configuration: Number of bits",
    op1 => {
      try {
        calculator.init({
          N: op1,
        });
        console.log("Update your configuration.");
      } catch (e) {
        console.log(`Error: ${e.message}`);
      }
    },
    null, [{
      name: "number",
      type: "string",
    }])
  .addItem(
    "Binary",
    op1 => {
      try {
        console.log(`Binary: ${calculator.toBinary(op1)}`);
      } catch (e) {
        console.log(`Error: ${e.message}`);
      }
    },
    null, [{
      name: "number",
      type: "numeric",
    }])
  .addItem(
    "Octal",
    op1 => {
      try {
        console.log(`Octal: ${calculator.toOctal(op1)}`);
      } catch (e) {
        console.log(`Error: ${e.message}`);
      }
    },
    null, [{
      name: "number",
      type: "string",
    }])
  .addItem(
    "Decimal",
    op1 => {
      try {
        console.log(`Decimal: ${calculator.toDecimal(op1.toString())}`);
      } catch (e) {
        console.log(`Error: ${e.message}`);
      }
    },
    null, [{
      name: "number",
      type: "string",
    }])
  .addItem(
    "SM",
    op1 => {
      try {
        console.log(`SM: ${calculator.toSM(op1)}`);
      } catch (e) {
        console.log(`Error: ${e.message}`);
      }
    },
    null, [{
      name: "number",
      type: "string",
    }])
  .addItem(
    "C1",
    op1 => {
      try {
        console.log(`C1: ${calculator.toC1(op1)}`);
      } catch (e) {
        console.log(`Error: ${e.message}`);
      }
    },
    null, [{
      name: "number",
      type: "string",
    }])
  .addItem(
    "C2",
    op1 => {
      try {
        console.log(`C2: ${calculator.toC2(op1)}`);
      } catch (e) {
        console.log(`Error: ${e.message}`);
      }
    },
    null, [{
      name: "number",
      type: "string",
    }])
  .addDelimiter("*", 40)
  .disableDefaultHeader()
  .start();
