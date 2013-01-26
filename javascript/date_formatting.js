// JLO format = "YYYYMMDDHHMMSS"

function format_date(d) {
  var new_date = new Date(d);
  var year = new_date.getFullYear();
  var month = parseInt(new_date.getMonth()) + 1;
  if(month < 10) {
    month = "0" + month
  }
  var day = parseInt(new_date.getDate());
  if(day < 10) {
    day = "0" + day;
  }
  var hours = new_date.getHours();
  if(hours < 10) {
    hours = "0" + hours;
  }
  var minutes = new_date.getMinutes();
  if(minutes < 10) {
    minutes = "0" + minutes;
  }
  var seconds = new_date.getSeconds();
  if(seconds < 10) {
    seconds = "0" + seconds;
  }
  return year + month + day + hours + minutes + seconds;
}

