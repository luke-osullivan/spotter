$(document).ready(function () {
  function printUser() {
    $.ajax({
      url: "api/users/status",
      method: "GET"
    }).then(function (response) {
      var userInfo =

        `<h6>Name: ${response.full_name}</h6>
      <h6>Email: ${response.email}</h6>
      <h6>Age: ${response.age}</h6>
      <h6>From: ${response.where_from}</h6>
      <h6>Bio: ${response.bio}</h6>`;

      $(".userInfo").append(userInfo);

      // var userPicture =

      // `<img src="${response.picture} height="50" width="50">`
      // ;


    })
  };
  printUser();

  function printWorkout() {
    
    $.ajax({
      url: "api/users/status",
      method: "GET"
    }).done(function (userResult) {
      //console.log(userResult.id);
      let activeUser = userResult.id;
      console.log(activeUser);

      $.ajax({
        url: "api/workouts",
        method: "GET"
      }).done(function (results) {
       console.log(results);

        results.forEach(resDates => {

      if (resDates.UserId === activeUser) {
        console.log(resDates);
       let workoutDates = [];
        let userArray = [];
        let workoutArray = [];

          let resDateWorkout = resDates.date;
          let formatWorkout = new Date(resDateWorkout);
          let workoutDay = formatWorkout.getDate(resDateWorkout) + 1;
        // console.log(workoutDay);
          workoutDates.push(workoutDay);
       // console.log(workoutDates);
          //console.log(resDates.UserId);
          let userNum = resDates.UserId;
         //console.log(userNum);
          userArray.push(userNum);
          console.log(userArray);
       // console.log(resDates.date);
        var mostRecent = Math.max(...workoutDates);
        workoutArray.push(mostRecent);
        console.log(workoutArray);
       // if (mostRecent > 9) {
        // console.log(mostRecent);
          let mostRecentDate = "2019-03-" + mostRecent;
          console.log(resDates.date);

          if (mostRecentDate === resDates.date) {
            console.log(mostRecentDate);
            console.log(resDates.name);
            $(".dateDiv").append(mostRecentDate);
            $(".name").append(resDates.name);
          }

        for (let i = resDates.exercises.length - 1; i < resDates.exercises.length; i++) {
        //  console.log(resDates.exercises[i]);
         // console.log(resDates.date)
          console.log(resDates.exercises[i].specific_exercise);
          $(".center-div").append(`
          <p>${resDates.exercises[i].specific_exercise}</p>
          `)
          console.log(resDates.exercises[i].sets);
          sets = resDates.exercises[i].sets;
          sets.forEach(set => {
            $(".center-div").append(`
            <p>${set.reps} reps x ${set.weight} lbs
            `)
          })
 
        };
    
     // };
      };
    }); 

      });
    });
  }
  printWorkout();
});
  