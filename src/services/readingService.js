import http from "./httpService";

const apiEndpoint = "/readings";

export function getReadings() {
  return http.get(apiEndpoint);
}

export function getReading(readingId) {
  return http.get(apiEndpoint + "/" + readingId);
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
