const Employee = require("../lib/Employee");

test("Can instantiate Employee instance", () => {
  const e = new Employee("Testy Tester", 123, "test@test.com");

  expect(typeof e).toBe("object");
});

test("Can set name via constructor arguments", () => {
  const name = "Alice";
  const e = new Employee(name, 1, "test@test.com");

  expect(e.name).toBe(name);
});

test("Should throw error if 'name' is not a string", () => {
  const name = 123;
  const error = new Error("Expected parameter 'name' to be a non-empty string.");

  const e = () => new Employee(name, 1, "test@test.com");

  expect(e).toThrowError(error);
});

test("Should throw error if 'name' passed as empty string", () => {
  const name = "";
  const error = new Error("Expected parameter 'name' to be a non-empty string.");

  const cb = () => new Employee(name, 1, "test@test.com");

  expect(cb).toThrowError(error);
});

test("Can set id via constructor argument", () => {
  const testValue = 100;
  const e = new Employee("Foo", testValue, "test@test.com");

  expect(e.id).toBe(testValue);
});

test("Should throw error if 'id' empty", () => {
  const id = "";
  const error = new Error("Expected parameter 'id' to be a non-empty string or number.");

  const cb = () => new Employee("Testy", id, "test@test.com");

  expect(cb).toThrowError(error);
});

test("Should throw error if 'id' not string or number", () => {
  const id = true;
  const error = new Error("Expected parameter 'id' to be of type 'string' or 'number'.");

  const cb = () => new Employee("Testy", id, "test@test.com");

  expect(cb).toThrowError(error);
});

test("Can set email via constructor argument", () => {
  const testValue = "test@test.com";
  const e = new Employee("Foo", 1, testValue);

  expect(e.email).toBe(testValue);
});

test("Should throw error if 'email' is not a string", () => {
  const email = 123;
  const error = new Error("Expected parameter 'email' to be a non-empty string.");

  const cb = () => new Employee("testy", 1, email);

  expect(cb).toThrowError(error);
});

test("Can get name via getName()", () => {
  const testValue = "Alice";
  const e = new Employee(testValue, 1, "email");

  expect(e.getName()).toBe(testValue);
});

test("Can get id via getId()", () => {
  const testValue = 100;
  const e = new Employee("Foo", testValue, "test@test.com");

  expect(e.getId()).toBe(testValue);
});

test("Can get email via getEmail()", () => {
  const testValue = "test@test.com";
  const e = new Employee("Foo", 1, testValue);

  expect(e.getEmail()).toBe(testValue);
});

test('getRole() should return "Employee"', () => {
  const testValue = "Employee";
  const e = new Employee("Alice", 1, "test@test.com");

  expect(e.getRole()).toBe(testValue);
});
