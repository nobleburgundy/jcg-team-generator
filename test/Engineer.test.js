const Engineer = require("../lib/Engineer");

test("Can set GitHUb account via constructor", () => {
  const testValue = "GitHubUser";
  const e = new Engineer("Foo", 1, "test@test.com", testValue);
  expect(e.github).toBe(testValue);
});

test("Should throw error if 'github' parameter passed as non-string", () => {
  const github = 123;
  const cb = () => new Engineer("Test", 1, "test@test.com", github);
  const error = new Error("Expected parameter 'github' to be a non-empty string.");

  expect(cb).toThrowError(error);
});

test("Should throw error if 'github' parameter passed empty string", () => {
  const github = "";
  const cb = () => new Engineer("Test", 1, "test@test.com", github);
  const error = new Error("Expected parameter 'github' to be a non-empty string.");

  expect(cb).toThrowError(error);
});

test('getRole() should return "Engineer"', () => {
  const testValue = "Engineer";
  const e = new Engineer("Foo", 1, "test@test.com", "GitHubUser");
  expect(e.getRole()).toBe(testValue);
});

test("Can get GitHub username via getGithub()", () => {
  const testValue = "GitHubUser";
  const e = new Engineer("Foo", 1, "test@test.com", testValue);
  expect(e.getGithub()).toBe(testValue);
});
