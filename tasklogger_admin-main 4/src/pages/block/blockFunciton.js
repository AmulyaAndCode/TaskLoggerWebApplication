const roomNumberGenerator = (roomsRange) => {
  let arrayRange = roomsRange.split(",");
  let rooms = arrayRange.map((e) => {
    if (e.includes("-")) {
      const rangeArr = e.split("-").map(Number);
      const arrLen = rangeArr[1] - rangeArr[0] + 1;
      return Array.from({ length: arrLen }, (_, k) => k + rangeArr[0]);
    } else return parseInt(e);
  });
  return [...new Set(rooms.flat())]; //flatten the nested array and 'Set' to remove duplicates
};

const numberToRange = (roomNumbersArr) => {
  let range = [];
  let count = 0;
  let temp = [];
  roomNumbersArr.forEach((n, i) => {
    if (count === 0) {
      temp.push(n);
      count++;
      return;
    }
    if (roomNumbersArr[i - 1] + 1 === n) {
      temp.push(n);
      if (i + 1 === roomNumbersArr.length) {
        range.push(temp);
      }
    } else {
      count = 0;
      range.push(temp);
      if (i + 1 === roomNumbersArr.length) {
        range.push([n]);
      } else {
        temp = [n];
      }
    }
  });
  let rangeString = "";
  let seperator = "";
  range.forEach((a, i) => {
    if (i !== 0) {
      seperator = ",";
    }
    if (a.length === 1) {
      rangeString = rangeString + seperator + a[0];
    } else {
      rangeString = rangeString + seperator + a[0] + "-" + a[a.length - 1];
    }
  });
  return rangeString;
};
export { roomNumberGenerator, numberToRange };
