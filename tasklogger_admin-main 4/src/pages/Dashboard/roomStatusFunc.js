const roomStatusStyle = (status) => {
  switch (status) {
    case "daily":
      return { border: "3px solid #05c46b", color: "#999999" };
    case "thorough":
      return { background: "#05c46b", color: "#ffffff" };
    default:
      return {
        border: "2px double #cccccc",
        color: "#cccccc",
      };
  }
};
const sortRooms = (roomArr, sortView) => {
  console.log("see room array", roomArr);
  let unAttendedRoom = [];
  let thoroughCleanedRoom = [];
  let dailyCleanedRoom = [];
  let finalArray = [];
  if (sortView) {
    roomArr.forEach((roomObj) => {
      if ("cleaningType" in roomObj) {
        if (roomObj.cleaningType === "daily") {
          dailyCleanedRoom.push(roomObj);
        } else thoroughCleanedRoom.push(roomObj);
      } else unAttendedRoom.push(roomObj);
    });
    finalArray = [unAttendedRoom, dailyCleanedRoom, thoroughCleanedRoom];
  } else finalArray = [roomArr];
  return finalArray;
};
export { roomStatusStyle, sortRooms };
