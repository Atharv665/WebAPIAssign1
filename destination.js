// destination.js
import chalk from "chalk";

const DestinationModule = {
  destinations: [
    {
      id: 1,
      name: "Caves of Zion",
      country: "United States",
      description:
        "An underground wonder nestled beneath Zion National Park, featuring glowing crystal formations and bioluminescent pools.",
      rating: 9.4,
      price: 120,
      likes: 520,
    },

    {
      id: 2,
      name: "Sky Gardens of Kyoto",
      country: "Japan",
      description:
        "A breathtaking fusion of ancient tradition and futuristic architecture, featuring floating gardens, offering unparalleled views of Kyoto's skyline.",
      rating: 9.8,
      price: 150,
      likes: 475,
    },

    {
      id: 3,
      name: "Banded Sickle",
      country: "Turkey",
      description:
        "A natural rock formation , shaped like a crescent moon. Legend has it that this site was made by celestial beings, and it's said to grant luck to all that visit it during a full moon.",
      rating: 8.0,
      price: 200,
      likes: 355,
    },
  ],
  destinationIdCounter: 4,

  //adds a new destination.
  addDestination(name, country, description, rating, price, likes) {
    if (!name || !country || !description || !rating || !price || !likes) {
      return chalk.redBright(
        "Unable to add Destination.All fields (name, country, description, rating, price, likes) are required."
      );
    }
    const newDestination = {
      id: this.destinationIdCounter++,
      name,
      country,
      description,
      rating,
      price,
      likes,
    };
    this.destinations.push(newDestination);
    return chalk.greenBright("Destination added successfully!");
  },

  //finds and returns a destination by the specified id.
  getDestinationById(id) {
    return (
      this.destinations.find((dest) => dest.id === id) ||
      "Destination not found."
    );
  },

  //returns all destinations.
  getAllDestinations() {
    return this.destinations;
  },

  //returns a destination with the specified name
  getDestinationsByName(name) {
    const matches = this.destinations.filter((dest) =>
      dest.name.toLowerCase().includes(name.toLowerCase())
    );

    return matches.length > 0
      ? matches
      : chalk.magentaBright("No close matches found.");
  },

  //Returns all destinations in the specified country
  getDestinationsByCountry(country) {
    const matches = this.destinations.filter(
      (destination) => destination.country === country
    );
    return matches.length
      ? matches
      : chalk.redBright("No destinations found with the specified country.");
  },

  //updates the destination based on specifed id, name,country and description.
  updateDestination(id, name, country, description) {
    const destination = this.destinations.find(
      (destination) => destination.id === id
    );
    if (destination) {
      destination.name = name;
      destination.country = country;
      destination.description = description;
      return chalk.green("Destination updated successfully!");
    } else {
      return chalk.redBright(
        "Unable to update destination: Destination not found."
      );
    }
  },

  //deletes a destination with the specifed id.
  deleteDestination(id) {
    const res = this.destinations.find((dest) => dest.id === id);
    if (!res) {
      return chalk.redBright("Unable to find destination ID: " + id);
    } else {
      const finalId = id - 1;
      this.destinations.splice(finalId, 1);
      return chalk.green("Destination with id:" + id + " has been deleted");
    }
  },

  //sorts destinations based on rating and whether in acsending order or descending.
  sortDestinations(order = "asc") {
    const sortedDestinations = [...this.destinations].sort((a, b) => {
      if (order === "asc") {
        return a.rating - b.rating;
      } else {
        return b.rating - a.rating;
      }
    });
    return sortedDestinations;
  },
};

export default DestinationModule;
