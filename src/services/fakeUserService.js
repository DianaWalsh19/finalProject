//import * as readingsAPI from "./fakeReadingService";

export const users = [
  {
    _id: "5sdf6s65f55afcccd2001",
    email: "patient1@patients.com",
    password: "password123",
  },

  {
    _id: "5sdf6s65f55afcccd2002",
    email: "patient2@patients.com",
    password: "password123",
  },

  {
    _id: "5sdf6s65f55afcccd2003",
    email: "patient3@patients.com",
    password: "password123",
  },
];

export function getUsers() {
  return users.filter((u) => u);
}
