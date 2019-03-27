YUI().use('calendar', 'datatype-date', 'cssbutton', function (Y) {

  var calendar = new Y.Calendar({
    contentBox: "#mycalendar",
    showPrevMonth: true,
    showNextMonth: true,
    date: new Date()
  }).render();

  var dt = Y.DataType.Date;

  calendar.on("selectionChange", function (ev) {
    $("#workout-name").empty();
    $("#exercise-div").empty();

    var newDate = ev.newSelection[0];

    var formatDate = new Date(newDate);

    var year = formatDate.getFullYear(newDate);
    var month = formatDate.getMonth(newDate) + 1;
    var day = formatDate.getDate(newDate);

    if (month < 10) {
      var month = "0" + month
    }

    if (day < 10) {
      var day = "0" + day
    }

    var theDate = year + "-" + month + "-" + day;

    Y.one("#selecteddate").setHTML(theDate);

    $.ajax({
      url: "api/users/status",
      method: "GET"
    }).then(function (userResult) {

      let activeUser = userResult.id;
      console.log(activeUser);
    


    $.ajax({
      url: "api/users/status",
      method: "GET"
    }).then(function (userResult) {
      let activeUser = userResult.id;
      console.log(activeUser);

    


    $.ajax({
      url: "api/workouts",
      method: "GET"
    }).then(function (results) {

        for (let i = 0; i < results.length; i++) {
          let userWorkoutId = results[i].UserId;
          
          if (results[i].date === theDate && activeUser === userWorkoutId) {


            let workoutName = results[i].name;
            $("#workout-name").append(`
            <h5>${workoutName}</h5>
            `);

          let dbData = results[i];
          
          dbData.exercises.forEach(exercise => {
           let exerciseName = exercise.specific_exercise;

            $("#exercise-div").append(`
            <br>
            <p>${exerciseName}</p>
            `)

            exercise.sets.forEach(set => {

              let repsCount = set.reps;

              let weightCount = set.weight;

              $("#exercise-div").append(`
              <p>Reps: ${repsCount} reps x ${weightCount} lbs</p>
              `)

            })
          });
        } 
       } 
      });
  
  });

    Y.one("#togglePrevMonth").on('click', function (ev) {
      ev.preventDefault();
      calendar.set('showPrevMonth', !(calendar.get("showPrevMonth")));
    });

    Y.one("#toggleNextMonth").on('click', function (ev) {
      ev.preventDefault();
      calendar.set('showNextMonth', !(calendar.get("showNextMonth")));
    });

  })
});
})