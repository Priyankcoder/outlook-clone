export async function fetchData(id?: string) {
  let url = "https://flipkart-email-mock.vercel.app/";
  if (id) {
    url += `?id=${id}`;
  }
  const response = await fetch(url);
  const emailListData = await response.json();
  console.log({ url, emailListData });
  return emailListData;
}

export function readFromLocalStorage(key: string) {
  try {
    const serializedData = localStorage.getItem(key);
    if (serializedData === null) {
      return undefined;
    }
    return JSON.parse(serializedData);
  } catch (error) {
    console.error("Error reading from local storage:", error);
    return undefined;
  }
}

export function writeToLocalStorage(key, data) {
  try {
    const serializedData = JSON.stringify(data);
    localStorage.setItem(key, serializedData);
  } catch (error) {
    console.error("Error writing to local storage:", error);
  }
}

export function addEmailIdToLocalStorage(key, data) {
  try {
    const dataInLocalStorage = readFromLocalStorage(key) || {};
    const serializedData = JSON.stringify({
      ...dataInLocalStorage,
      [data]: data
    });
    console.log("serialiszedData", serializedData);
    localStorage.setItem(key, serializedData);
  } catch (error) {
    console.error("Error writing to local storage:", error);
  }
}

export function deleteEmailIdFromLocalStorage(key, data) {
  try {
    const dataInLocalStorage = readFromLocalStorage(key) || {};
    delete dataInLocalStorage[data];
    console.log("dataInLocalStorage", dataInLocalStorage);
    const serializedData = JSON.stringify({
      ...dataInLocalStorage
    });
    console.log("serialiszedData", serializedData);
    localStorage.setItem(key, serializedData);
  } catch (error) {
    console.error("Error writing to local storage:", error);
  }
}

export function transformToArray(obj) {
  return Object.keys(obj);
}

export function formatDate(epoch, format) {
  const dateObj = new Date(epoch);

  const padZero = (num) => (num < 10 ? "0" + num : num);
  const getMeridiem = (hours) => (hours >= 12 ? "PM" : "AM");
  const get12Hour = (hours) => (hours % 12 === 0 ? 12 : hours % 12);

  const formats = {
    YYYY: dateObj.getFullYear(),
    MM: padZero(dateObj.getMonth() + 1),
    DD: padZero(dateObj.getDate()),
    hh: padZero(get12Hour(dateObj.getHours())),
    mm: padZero(dateObj.getMinutes()),
    ss: padZero(dateObj.getSeconds()),
    A: getMeridiem(dateObj.getHours())
  };

  return format.replace(/(YYYY|MM|DD|hh|mm|ss|A)/g, (match) => formats[match]);
}
