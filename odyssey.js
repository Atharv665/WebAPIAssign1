import chalk from "chalk";
import inquirer from "inquirer";
import DestinationModule from "./destination.js";
import UserModule from "./user.js";
import BookingModule from "./booking.js";
import CommentModule from "./comments.js";

//save user's role
let role = null;
async function login() {
  console.log(
    chalk.magentaBright(
      "Welcome To AtharvsOdyssey.Please login to your account to access menus"
    )
  );
  const answers = await inquirer.prompt([
    {
      type: "input",
      name: "username",
      message: "Input your Username",
    },
    {
      type: "input",
      name: "password",
      message: "Input your Password",
    },
  ]);

  const result = UserModule.loginUser(answers.username, answers.password);

  if (result === "Login successful!") {
    //get user's role and save it to be used to restrict functions based on role.
    role = UserModule.getRole();
    mainMenu();
  } else {
    console.log(
      chalk.redBright("Login failed.Please check login details and try again.")
    );

    return;
  }
}

async function mainMenu() {
  const { action } = await inquirer.prompt([
    {
      type: "list",
      name: "action",
      message: "What would you like to do?",
      choices: [
        "Interact with Destinations",
        "Interact with Users",
        "Interact with Bookings",
        "Interact with Comments",
        "Exit",
      ],
      default: "Interact with users",
    },
  ]);

  // Route to sub-menus based on choice
  switch (action) {
    case "Interact with Destinations":
      await destinationsMenu();
      break;
    case "Interact with Users":
      await usersMenu();
      break;
    case "Interact with Bookings":
      await bookingsMenu();
      break;
    case "Interact with Comments":
      await commentsMenu();
      break;
    case "Exit":
      console.log(chalk.green("Come visit us again soon!"));
      return;
  }

  mainMenu();
}

async function bookingsMenu() {
  let bookingChoices = ["Add Booking", "Cancel Booking", "Back to Main Menu"];
  if (role === "admin") {
    bookingChoices.unshift(
      "View all Bookings",
      "View Bookings by Username",
      "Calculate Revenue"
    );
  }
  const { userAction } = await inquirer.prompt([
    {
      type: "list",
      name: "userAction",
      message: "Choose an action for bookings:",
      choices: bookingChoices,
    },
  ]);

  // Execute based on choice
  switch (userAction) {
    case "Add Booking":
      await addBooking();
      break;
    case "View all Bookings":
      await viewAllBookings();
      break;
    case "View Bookings by Username":
      await viewBookingsByUsername();
      break;
    case "Cancel Booking":
      await cancelBooking();
      break;
    case "Calculate Revenue":
      await calculateRevenue();
      break;
    case "Back to Main Menu":
      return;
  }
}

async function destinationsMenu() {
  let destinationChoices = [
    "View All Destinations",
    "Find Destinations by Name (Likeness Search)",
    "Find Destinations by Country",
    "Sort Destinations by Rating",
    "Back to Main Menu",
  ];
  if (role === "admin") {
    destinationChoices.unshift(
      "Add a Destination",
      "Find Destination by ID",
      "Update Destination",
      "Delete Destination"
    );
  }
  const { destinationAction } = await inquirer.prompt([
    {
      type: "list",
      name: "destinationAction",
      message: "Choose an action for destinations:",
      choices: destinationChoices,
    },
  ]);

  // Execute based on choice
  switch (destinationAction) {
    case "Add a Destination":
      await addDestination();
      break;
    case "Find Destination by ID":
      await findDestinationById();
      break;
    case "Find Destinations by Name (Likeness Search)":
      await findDestinationsByName();
      break;
    case "View All Destinations":
      await viewAllDestinations();
      break;
    case "Find Destinations by Country":
      await findDestinationsByCountry();
      break;
    case "Update Destination":
      await updateDestination();
      break;
    case "Delete Destination":
      await deleteDestination();
      break;
    case "Sort Destinations by Rating":
      await sortDestinations();
      break;
    case "Back to Main Menu":
      return; // Go back to main menu
  }
}
async function usersMenu() {
  let userChoices = [
    "View Users by Username",
    "View Users by Join Date",
    "Back to Main Menu",
  ];
  if (role === "admin") {
    userChoices.unshift("Add User", "Find User by ID", "View all Users");
  }
  const { userAction } = await inquirer.prompt([
    {
      type: "list",
      name: "userAction",
      message: "Choose an action for users:",
      choices: userChoices,
    },
  ]);

  // Execute based on choice
  switch (userAction) {
    case "Add User":
      await addUser();
      break;
    case "Find User by ID":
      await findUserById();
      break;
    case "View all Users":
      await viewAllUsers();
      break;
    case "View Users by Username":
      await viewUsersByUsername();
      break;
    case "View Users by Join Date":
      await viewUsersByJoinDate();
      break;
    case "Back to Main Menu":
      return;
  }
}
async function commentsMenu() {
  let commentChoices = [
    "Add Comment",
    "View all Comments",
    "Back to Main Menu",
  ];
  if (role === "admin") {
    commentChoices.unshift(
      "Analyze Sentiment of All Comments",
      "Calculate Total scores for positive and negative comments",
      "Sort Comments by Most Negative to Most Positive"
    );
  }
  const { userAction } = await inquirer.prompt([
    {
      type: "list",
      name: "userAction",
      message: "Choose an action for bookings:",
      choices: commentChoices,
    },
  ]);

  // Execute based on choice
  switch (userAction) {
    case "Add Comment":
      await addComment();
      break;
    case "View all Comments":
      await viewAllComments();
      break;
    case "Analyze Sentiment of All Comments":
      await analyseComments();
      break;
    case "Calculate Total scores for positive and negative comments":
      await calculateTotalScores();
      break;
    case "Sort Comments by Most Negative to Most Positive":
      await sortComments();
      break;
    case "Back to Main Menu":
      return;
  }
}

//destination functions
async function addDestination() {
  const answers = await inquirer.prompt([
    { type: "input", name: "name", message: "Enter the destination name:" },
    { type: "input", name: "country", message: "Enter the country:" },
    { type: "input", name: "description", message: "Enter the description:" },
    {
      type: "number",
      name: "rating",
      message: "Enter the rating for the destination (/10):",
    },
    {
      type: "number",
      name: "price",
      message: "Enter price:",
    },
    { type: "number", name: "likes", message: "Enter number of likes:" },
  ]);

  const result = DestinationModule.addDestination(
    answers.name,
    answers.country,
    answers.description,
    answers.rating,
    answers.price,
    answers.likes
  );

  console.log(result);
}

async function findDestinationById() {
  const { id } = await inquirer.prompt([
    { type: "number", name: "id", message: "Enter destination ID:" },
  ]);

  const result = DestinationModule.getDestinationById(id);
  if (result === "Destination not found.") {
    console.log(chalk.redBright(result));
  } else {
    console.log(result);
  }
}

async function findDestinationsByName() {
  const { name } = await inquirer.prompt([
    { type: "input", name: "name", message: "Enter destination name:" },
  ]);

  const result = DestinationModule.getDestinationsByName(name);
  console.log(result);
}
async function viewAllDestinations() {
  const result = DestinationModule.getAllDestinations();
  console.log(result);
}
async function findDestinationsByCountry() {
  const { country } = await inquirer.prompt([
    { type: "input", name: "country", message: "Enter destination country:" },
  ]);
  const result = DestinationModule.getDestinationsByCountry(country);
  console.log(result);
}
async function updateDestination() {
  const answers = await inquirer.prompt([
    {
      type: "number",
      name: "id",
      message: "Enter the destination id to update:",
    },
    { type: "input", name: "name", message: "Enter the destination name:" },
    { type: "input", name: "country", message: "Enter the country:" },
    { type: "input", name: "description", message: "Enter the description:" },
  ]);

  const result = DestinationModule.updateDestination(
    answers.id,
    answers.name,
    answers.country,
    answers.description
  );

  console.log(result);
}
async function deleteDestination() {
  const { id } = await inquirer.prompt([
    { type: "number", name: "id", message: "Enter destination ID:" },
  ]);

  const result = DestinationModule.deleteDestination(id);
  console.log(result);
}

async function sortDestinations() {
  const { order } = await inquirer.prompt([
    {
      type: "input",
      name: "order",
      message: "Enter sort order (asc or desc):",
    },
  ]);
  const result = DestinationModule.sortDestinations(order);
  console.log(result);
}

//user functions
async function addUser() {
  const answers = await inquirer.prompt([
    { type: "input", name: "username", message: "Enter username:" },

    { type: "input", name: "password", message: "Enter password:" },
    {
      type: "number",
      name: "phoneNumber",
      message: "Enter your Mobile Number:",
    },
    { type: "input", name: "role", message: "Enter role (user/admin):" },
  ]);

  const result = UserModule.addUser(
    answers.username,
    answers.password,
    answers.phoneNumber,
    answers.role
  );

  console.log(result);
}

async function findUserById() {
  const { id } = await inquirer.prompt([
    { type: "number", name: "id", message: "Enter User ID:" },
  ]);

  const result = UserModule.getUserById(id);
  console.log(result);
}
async function viewAllUsers() {
  const result = UserModule.getAllUsers();
  console.log(result);
}
async function viewUsersByUsername() {
  const { username } = await inquirer.prompt([
    { type: "input", name: "username", message: "Enter Username:" },
  ]);
  const result = UserModule.getUsersByUsername(username);
  console.log(result);
}
async function viewUsersByJoinDate() {
  const { joinDate } = await inquirer.prompt([
    {
      type: "input",
      name: "joinDate",
      message: "Enter Join Date(YYYY-MM-DD):",
    },
  ]);
  const result = UserModule.getUsersByJoinDate(joinDate);
  console.log(result);
}

//booking functions
async function addBooking() {
  const answers = await inquirer.prompt([
    {
      type: "number",
      name: "destId",
      message: "Enter the Destination Id:",
    },
  ]);

  const result = BookingModule.addBooking(answers.destId);

  console.log(result);
}

async function viewAllBookings() {
  const result = BookingModule.getAllBookings();

  console.log(result);
}

async function calculateRevenue() {
  const result = BookingModule.calculateRevenue();

  console.log(result);
}

async function viewBookingsByUsername() {
  const answers = await inquirer.prompt([
    {
      type: "input",
      name: "username",
      message: "Enter the Username:",
    },
  ]);

  const result = BookingModule.getBookingsByUsername(answers.username);

  console.log(result);
}
async function cancelBooking() {
  const { id } = await inquirer.prompt([
    { type: "number", name: "id", message: "Enter booking ID:" },
  ]);

  const result = BookingModule.cancelBooking(id);
  console.log(result);
}
//comments functions
async function addComment() {
  const answers = await inquirer.prompt([
    { type: "number", name: "destinationId", message: "Enter Destination ID:" },

    { type: "input", name: "commentText", message: "Enter your comment:" },
  ]);

  const result = CommentModule.addComment(
    answers.destinationId,
    answers.commentText
  );

  console.log(result);
}
async function viewAllComments() {
  const result = CommentModule.getAllComments();

  console.log(result);
}
async function analyseComments() {
  const result = CommentModule.sentimentAnalysis();

  console.log(result);
}
async function calculateTotalScores() {
  const result = CommentModule.calculateAllScore();

  console.log(result);
}
async function sortComments() {
  const result = CommentModule.sentimentAnalysisSort();
  console.log(result);
}
// Start the application
login();
