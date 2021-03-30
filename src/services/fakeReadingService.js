import * as usersAPI from "./fakeUserService";

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
  let readingInDb = readings.find((r) => r.mid === reading.mid) || {};
  readingInDb.value = reading.value;
  readingInDb.user = usersAPI.users.find((u) => u._id === reading.userId);
  readingInDb.dateTime = reading.dateTime;
  readingInDb.notes = reading.notes;

  if (!readingInDb._id) {
    readingInDb._id = Date.now().toString();
    readings.push(readingInDb);
  }

  return readingInDb;
}

export function deletereading(id) {
  let readingInDb = readings.find((r) => r._id === id);
  readings.splice(readings.indexOf(readingInDb), 1);
  return readingInDb;
}
