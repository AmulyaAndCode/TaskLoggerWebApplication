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

export { roomNumberGenerator };
