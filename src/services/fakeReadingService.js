import * as usersAPI from "./fakeUserService";
import http from "./httpService";
const apiEndpoint = "/readings";

const readings = [
  {
    _id: "5sdf6s65f55afdsdf2020",
    user: { _id: "5sdf6s65f55afcccd2001", email: "patient1@patients.com" },
    value: 400,
    preMed: "preMed",
    dateTime: "2020-01-23T19:04:28.8092",
    notes: "sfdsdfsdf",
  },

  {
    _id: "5sdf6s65f55afdsdf2021",
    user: { _id: "5sdf6s65f55afcccd2001", email: "patient1@patients.com" },
    value: 380,
    preMed: "postMed",
    dateTime: "2020-01-24T09:04:28.8092",
    notes: "sfdsdfsdf",
  },

  {
    _id: "5sdf6s65f55afdsdf2022",
    user: { _id: "5sdf6s65f55afcccd2001", email: "patient1@patients.com" },
    value: 410,
    preMed: "preMed",
    dateTime: "2020-01-24T19:04:28.8092",
    notes: "sfdsdfsdf",
  },

  {
    _id: "5sdf6s65f55afdsdf2023",
    user: { _id: "5sdf6s65f55afcccd2002", email: "patient2@patients.com" },
    value: 410,
    preMed: "preMed",
    dateTime: "2020-01-24T19:14:28.8092",
    notes: "sfdsdfsdf",
  },

  {
    _id: "5sdf6s65f55afdsdf2026",
    user: { _id: "5sdf6s65f55afcccd2003", email: "patient3@patients.com" },
    value: 777,
    preMed: "postMed",
    dateTime: "2021-04-17T19:14:28.8092",
    notes: "sfdsdfsdf",
  },

  {
    _id: "5sdf6s65f55afdsdf2024",
    user: { _id: "5sdf6s65f55afcccd2003", email: "patient3@patients.com" },
    value: 800,
    preMed: "postMed",
    dateTime: "2020-01-25T19:14:28.8092",
    notes: "sfdsdfsdf",
  },

  {
    _id: "5sdf6s65f55afdsdf2025",
    user: { _id: "5sdf6s65f55afcccd2003", email: "patient3@patients.com" },
    value: 1200,
    preMed: "postMed",
    dateTime: "2020-02-25T19:14:28.8092",
    notes: "sfdsdfsdf",
  },
];

export function getReadings() {
  return readings;
}

export function getReading(id) {
  return readings.find((r) => r.id === id);
}

export function getReadingByDate(dateTime) {
  return readings.find((r) => r.dateTime === dateTime);
}

export function saveReading(reading) {
  if (reading._id) {
    const body = { ...reading };
    delete body._id;
    return http.put(apiEndpoint + "/" + reading._id, body);
  }
  return http.post(apiEndpoint, reading);
}

export function deleteReading(readingId) {
  return http.delete(apiEndpoint + "/" + readingId);
}
