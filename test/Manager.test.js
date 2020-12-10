const Manager = require("../lib/Manager");
const Employee = require("../lib/Employee");

test("Can set office number via constructor argument", () => {
  const testValue = "100";
  const e = new Manager("Foo", 1, "test@test.com", testValue);
  expect(e.officeNumber).toBe(testValue);
});

test("Should throw error if 'officeNumber' passed as non-string", () => {
  const officeNumber = 123;
  const cb = () => new Manager("Test", 1, "test@test.com", officeNumber);
  const error = new Error("Expected parameter 'officeNumber' to be a non-empty string.");

  expect(cb).toThrowError(error);
});

test("Should throw error if 'officeNumber' passed as an empty string", () => {
  const officeNumber = "";
  const cb = () => new Manager("Test", 1, "test@test.com", officeNumber);
  const error = new Error("Expected parameter 'officeNumber' to be a non-empty string.");

  expect(cb).toThrowError(error);
});

test('getRole() should return "Manager"', () => {
  const testValue = "Manager";
  const e = new Manager("Foo", 1, "test@test.com", "100");
  expect(e.getRole()).toBe(testValue);
});

test("Can get office number via getOffice()", () => {
  const testValue = "100";
  const e = new Manager("Foo", 1, "test@test.com", testValue);
  expect(e.getOfficeNumber()).toBe(testValue);
});
