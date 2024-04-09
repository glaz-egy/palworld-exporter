const USERNAME = process.env.USERNAME;
const PASSWORD = process.env.PASSWORD;

export function generateHeader() {
  const text = "Basic " + btoa(`${USERNAME}:${PASSWORD}`);

  const header = {
    Accept: "application/json",
    Authorization: text,
  };

  return header;
}