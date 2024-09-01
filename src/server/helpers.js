function dateFormatter(date = new Date()) {//=>YYYY-MM-DD
  const year = date.getFullYear();
  let month = date.getMonth() + 1;
  if (month < 10) {
    month = '0' + month
  }
  let day = date.getDate();
  if (day < 10) {
    day = '0' + day
  }
  return `${year}-${month}-${day}`
}

function generateid(trips) {//1,3
  if (trips.length == 0) {
    return 1
  } else {
    let lastTripId = trips.at(-1).id;
    return lastTripId + 1//4
  }
}

module.exports = { dateFormatter, generateid }