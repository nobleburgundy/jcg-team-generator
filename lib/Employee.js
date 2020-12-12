class Employee {
  constructor(name, id, email) {
    this.name = name;
    this.email = email;
    this.id = id;

    // Check that parameters passed correctly
    if (typeof name !== "string" || !name.trim().length) {
      throw new Error("Expected parameter 'name' to be a non-empty string.");
    }

    if (["string", "number"].indexOf(typeof id) < 0) {
      throw new Error("Expected parameter 'id' to be of type 'string' or 'number'.");
    }

    if (!id.toString().length > 0) {
      throw new Error("Expected parameter 'id' to be a non-empty string or number.");
    }

    if (typeof email !== "string" || !email.trim().length) {
      throw new Error("Expected parameter 'email' to be a non-empty string.");
    }
  }

  getName() {
    return this.name;
  }
  getEmail() {
    return this.email;
  }
  getId() {
    return this.id;
  }
  getRole() {
    return "Employee";
  }
}

module.exports = Employee;
