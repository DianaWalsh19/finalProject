import * as usersAPI from "./fakeUserService";

const readings = [
    {
        _id: "5sdf6s65f55afdsdf2020",
        user: { _id: "5sdf6s65f55afcccd2001", email: "patient1@patients.com"},
        value: 400,
        preMed: "yes",
        dateTime: "2020-01-23T19:04:28.8092",
        notes: "sfdsdfsdf"
    },

    {
        _id: "5sdf6s65f55afdsdf2021",
        user: { _id: "5sdf6s65f55afcccd2001", email: "patient1@patients.com"},
        value: 380,
        preMed: "no",
        dateTime: "2020-01-24T09:04:28.8092",
        notes: "sfdsdfsdf"
    },

    {
        _id: "5sdf6s65f55afdsdf2022",
        user: { _id: "5sdf6s65f55afcccd2001", email: "patient1@patients.com"},
        value: 410,
        preMed: "yes",
        dateTime: "2020-01-24T19:04:28.8092",
        notes: "sfdsdfsdf"
    }
];

export function getReadings(){
    return readings;
}

export function getReading(id){
    return readings.find(r => r.id === id);
}

export function saveReading(reading) {
    let readingInDb = readings.find(r => r.mid === reading.mid) || {};
    readingInDb.value = reading.value;
    readingInDb.user = usersAPI.users.find(u => u._id === reading.userId);
    readingInDb.dateTime = reading.dateTime;
    readingInDb.notes = reading.notes;
  
    if (!readingInDb._id) {
      readingInDb._id = Date.now();
      readings.push(readingInDb);
    }
  
    return readingInDb;
  }
  
  export function deletereading(id) {
    let readingInDb = readings.find(r => r._id === id);
    readings.splice(readings.indexOf(readingInDb), 1);
    return readingInDb;
  }
  