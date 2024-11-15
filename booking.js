// destination.js
import chalk from "chalk";
import DestinationModule from "./destination.js";
import UserModule from "./user.js";

const BookingModule = {
  bookings: [],
  bookingIdCounter: 1,

  //adds a booking using the username of the logged in user for a destination
  addBooking(destinationId) {
    const res = DestinationModule.getDestinationById(destinationId);

    const existingBooking = this.bookings.find(
      (booking) =>
        booking.username === UserModule.getCurrentUser() &&
        booking.destinationId === res.id
    );

    if (existingBooking) {
      return chalk.redBright(
        "You already have a booking for this destination."
      );
    }

    if (res !== "Destination not found.") {
      const newBooking = {
        bookingId: this.bookingIdCounter++,
        username: UserModule.getCurrentUser(),
        destinationName: res.name,
        destinationId: res.id,
      };

      this.bookings.push(newBooking);
      return chalk.greenBright(
        "Booking added successfully! Your Booking ID: " + newBooking.bookingId
      );
    } else {
      return chalk.redBright(res);
    }
  },

  //returns all bookings
  getAllBookings() {
    return this.bookings;
  },

  //shows all bookings made under the username.
  getBookingsByUsername(username) {
    const userBookings = this.bookings.filter(
      (booking) => booking.username === username
    );
    return userBookings.length
      ? userBookings
      : chalk.redBright("No bookings found for this username.");
  },

  //deletes a booking with the id specified from the array.
  cancelBooking(id) {
    // Find the booking by ID
    const bookingIndex = this.bookings.findIndex(
      (booking) => booking.bookingId === id
    );

    // Check if the booking exists
    if (bookingIndex === -1) {
      return chalk.redBright("Unable to find booking ID.");
    }

    // Remove the booking from the array
    this.bookings.splice(bookingIndex, 1);
    return chalk.greenBright(
      `Booking with ID ${id} has been successfully cancelled.`
    );
  },

  //calculates revenue by checking instances of each destination name in booking and then adds all the prices together by referencing the
  //price in the destination table.
  calculateRevenue() {
    const totalRevenue = this.bookings.reduce((total, booking) => {
      const destination = DestinationModule.getDestinationsByName(
        booking.destinationName
      );
      return destination && destination[0]
        ? total + destination[0].price
        : total;
    }, 0);

    return chalk.greenBright(`Revenue Calculated: ${totalRevenue}`);
  },
};

export default BookingModule;
