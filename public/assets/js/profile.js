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
    })
  };
  printUser();

  function printWorkout() {
    $.ajax({
      url: "api/users/status",
      method: "GET"
    }).then(function (userResult) {
      let activeUser = userResult.id;

      $.ajax({
        url: "api/workouts",
        method: "GET"
      }).then(function (results) {
        let workoutDates = [];
        for (let i = 0; i < results.length; i++) {
          if (results[i].UserId === activeUser) {

            let resDateWorkout = results[i].date;
            let formatWorkout = new Date(resDateWorkout);
            let workoutDay = formatWorkout.getDate(resDateWorkout) + 1;
            workoutDates.push(workoutDay);
          }
        };
        let mostRecent = Math.max(...workoutDates);
        let mostRecentDate = "2019-03-" + mostRecent;
        for (let i = 0; i < results.length; i++) {
          if (results[i].UserId === activeUser) {
            if (results[i].date === mostRecentDate) {

              $(".dateDiv").append(mostRecentDate);
              $(".name").append(results[i].name);
              let exercises = results[i].exercises;
              exercises.forEach(exercise => {
                $(".center-div").append(`
                <p>${exercise.muscle_group}</p>
                `)
              });
              $(".center-div").append(`
              <p>${results[i].exercises[0].specific_exercise}</p>
              `)
              let sets = results[i].exercises[0].sets
              sets.forEach(set => {
                $(".center-div").append(`
                <p>${set.reps} reps x ${set.weight} lbs</p>
                `)
              });
            };
          };
        }
      });
    });
  }
  printWorkout();
});