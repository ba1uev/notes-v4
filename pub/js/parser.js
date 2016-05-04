// function parse_to_client(data){
//   var arr = [],
//     map = [];
//   data.campaigns.items.forEach((item, i) => {
//     var user = item.user;
//     var flights = item.flights_list.items;
//     arr.push({
//       user: user,
//       flights: flights
//     });
//   });
//   arr.forEach((item, i) => {
//     let userId = item.user.id;
//     let index = map.indexOf(userId);
//     if (index === -1) {
//       map.push(userId);
//     } else {
//       arr[index].flights = arr[index].flights.concat(arr[i].flights);
//       arr.splice(i,1);
//     }
//   });
// }
//
// parse_to_client(atd_data_new);





// function checker(user, array, flights){
//   if (array.length){
//     console.log('аутпут не пустой');
//     array.forEach((item, i) => {
//       console.log('item.user.id = ',item.user.id);
//       console.log('user.id = ',user.id);
//       if (item.user.id === user.id) {
//         console.log('юзер уже есть в аутпуте');
//         debugger;
//         array[i].flights.concat(flights);
//       } else {
//         console.log('пушим новый объект юзера');
//         array.push({
//           user: user,
//           flights: flights
//         });
//       }
//     });
//     console.dir(array);
//   } else {
//     console.log('аутпут пустой');
//     array.push({
//       user: user,
//       flights: flights
//     })
//     console.dir(array);
//   }
//   return array
// }
//
// function parser_client(data){
//   var result = [];
//   data.campaigns.items.forEach((c, i) => {
//     console.log('============================', i);
//     let user = c.user;
//     let flights = c.flights_list.items;
//
//     result.concat(checker(user, result, flights));
//     // console.dir(result);
//     console.log('============================');
//   });
//   console.log('все!');
//   return result
// }



// console.dir(parser_client(atd_data_new));



function parser_campaign(data){
  var result = [];
  data.campaigns.items.forEach((c,i) => {
    result.push({
      campaign: c,
      flights: c.flights_list.items
    })
  });
  return result
}
