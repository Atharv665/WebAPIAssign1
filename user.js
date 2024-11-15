// user.js
import chalk from "chalk";

let currentUser = null;
const UserModule = {
  users: [
    {
      id: 1,
      username: "Atharvisherr",
      password: "lmao",
      phoneNumber: "90660459",
      dateJoined: "2024-11-01",
      role: "admin",
    },
    {
      id: 2,
      username: "User",
      password: "user123",
      phoneNumber: "93879231",
      dateJoined: "2024-11-01",
      role: "user",
    },
  ],
  userIdCounter: 3,

  //returns the current logged in user.
  getCurrentUser() {
    return currentUser;
  },

  //gets the role of the current logged in user.
  getRole() {
    if (currentUser) {
      const user = this.users.find((user) => user.username === currentUser);
      return user ? user.role : chalk.bgRedBright("Role not found.");
    } else {
      return chalk.redBright("No user is currently logged in.");
    }
  },

  //logs in the user storing the username in a temporary var at runtime.
  loginUser(username, password) {
    const user = this.users.find(
      (user) => user.username === username && user.password === password
    );
    if (user) {
      currentUser = username;
    }
    return user ? "Login successful!" : "Invalid username or password.";
  },

  //adds a user with the specified username,password, mobile number and role.
  addUser(username, password, phoneNumber, role) {
    if (!username || !password || !phoneNumber) {
      return chalk.redBright(
        "Unable to add User.All fields (username, password, phoneNumber, role) are required."
      );
    }

    if (role !== "admin" && role !== "user") {
      return chalk.redBright("Role provided is not valid.");
    } else {
      const newUser = {
        id: this.userIdCounter++,
        username,
        password,
        phoneNumber,
        dateJoined: new Date().toISOString().split("T")[0],
        role,
      };
      this.users.push(newUser);
      return chalk.green("User added successfully!");
    }
  },

  //finds and returns a user with the specified id.
  getUserById(id) {
    return (
      this.users.find((user) => user.id === id) ||
      chalk.redBright("User not found.")
    );
  },

  //returns all users.
  getAllUsers() {
    return this.users;
  },

  //returns the user with the specified username
  getUsersByUsername(username) {
    const matches = this.users.filter((user) =>
      user.username.toLowerCase().includes(String(username).toLowerCase())
    );

    return matches.length > 0
      ? matches
      : chalk.redBright("No Users with matching username found.");
  },

  //gets all users that joined on a specific date.
  getUsersByJoinDate(dateJoined) {
    const matchedUsers = this.users.filter(
      (user) => user.dateJoined === dateJoined
    );
    return matchedUsers.length
      ? matchedUsers
      : chalk.redBright("No users found who joined on this date.");
  },
};

export default UserModule;
