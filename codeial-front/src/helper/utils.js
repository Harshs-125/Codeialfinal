import moment from 'moment';
export function getFormBody(params) {
    let formBody = [];
  
    for (let property in params) {
      let encodedKey = encodeURIComponent(property); // 'user name' => 'user%20name'
      let encodedValue = encodeURIComponent(params[property]); // aakash 123 => aakash%2020123
  
      formBody.push(encodedKey + '=' + encodedValue);
    }
  
    return formBody.join('&'); // 'username=aakash&password=123213'
  }
  export function toDate(unix_timestamp) {
    let date = new Date(unix_timestamp * 1000);
    let currentDate = new Date();
    const timeDiff = currentDate.getTime() - date.getTime();
  
    if (timeDiff <= (24 * 60 * 60 * 1000)) {
      //Today
      return moment(date).format('h:mm a');
    } else if (timeDiff <= (48 * 60 * 60 * 1000)) {
      // Yesterday
      return "Yesterday"
    }else if(timeDiff <=  (168 * 60 * 60 * 1000)) {
      // Less than week
      return moment(date).format('dddd')
    } else {
      return moment(date).format("DD/MM/YYYY")
    }
  }
