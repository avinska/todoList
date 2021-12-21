exports.getDate = function() {
  const today = new Date(); //new Date(); same thing with new Audio(), buat nambahin today's date
  const options = {
    weekday: "long",
    day: "numeric",
    month: "long"
  }
  const day = today.toLocaleDateString("en-US", options);
  return day;
}


exports.getNumber = function() {
  const today = new Date(); //new Date(); same thing with new Audio(), buat nambahin today's date
  const options = {
    weekday: "long",
    day: "numeric",
    month: "long"
  }
  const day = today.toLocaleDateString("en-US", options);
  return day;
}
