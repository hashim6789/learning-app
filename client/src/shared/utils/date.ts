export function formatTo12HourTime(dateString: string) {
  const date = new Date(dateString);

  let hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? "PM" : "AM";

  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  const formattedMinutes = minutes < 10 ? "0" + minutes : minutes;

  const formattedTime = hours + ":" + formattedMinutes + " " + ampm;
  return formattedTime;
}

// const isoDate = "2025-02-22T09:09:49.239Z";
// const formattedTime = formatTo12HourTime(isoDate);
// console.log(formattedTime); // Output: "2:40 PM"
