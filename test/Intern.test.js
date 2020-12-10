const Intern = require("../lib/Intern");

test("Can set school via constructor", () => {
  const testValue = "UCLA";
  const e = new Intern("Foo", 1, "test@test.com", testValue);
  expect(e.school).toBe(testValue);
});

test("Should throw error if 'school' passed as non-string", () => {
  const school = 123;
  const cb = () => new Intern("Test", 1, "t@t.com", school);
  const error = new Error("Expected parameter 'school' to be a non-empty string.");

  expect(cb).toThrowError(error);
});

test("Should throw error if 'school' passed as empty string", () => {
  const school = "";
  const cb = () => new Intern("Test", 1, "t@t.com", school);
  const error = new Error("Expected parameter 'school' to be a non-empty string.");

  expect(cb).toThrowError(error);
});

test('getRole() should return "Intern"', () => {
  const testValue = "Intern";
  const e = new Intern("Foo", 1, "test@test.com", "UCLA");
  expect(e.getRole()).toBe(testValue);
});

test("Can get school via getSchool()", () => {
  const testValue = "UCLA";
  const e = new Intern("Foo", 1, "test@test.com", testValue);
  expect(e.getSchool()).toBe(testValue);
});
