const db = require('../models');

module.exports = {
  findAll: function(req, res) {
    db.Workouts.findAll({
      include: [db.Users]
    })
      .then(dbWorkouts => res.json(dbWorkouts))
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  findById: function(req, res) {
    db.Workouts.findById(req.params.id, {
      include: [db.Users]
    })
      .then(dbWorkouts => res.json(dbWorkouts))
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  findByExercise: function(req, res) {
    console.log(req.params.exercise_name);
    db.Workouts.findAll()
      .then(dbWorkouts => {
        const filteredWorkouts = dbWorkouts.filter(({UserId, exercises}) => {
          return (
            UserId === req.user.id 
            && 
            exercises.some(exercise => exercise.exercise_name.includes(req.params.exercise_name))
          )
        })
        res.json(dbWorkouts)
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  findByMuscleGroup: function (req, res) {
    console.log(req.params.muscle_group);
    db.Workouts.findAll()
      .then(dbWorkouts => {
        const filteredWorkouts = dbWorkouts.filter(({ UserId, exercises }) => {
          return (
            UserId === req.user.id
            &&
            exercises.some(exercise => exercise.muscle_group.includes(req.params.exercise_name))
          )
        })
        res.json(dbWorkouts)
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  create: function(req, res) {

    if (!req.user) {
      console.log("no user present");
      return res.status(404).json({error: "You need to be logged in!"});
    }

    db.Workouts.create({...req.body, UserId: req.user.id})
      .then(dbWorkouts => res.json(dbWorkouts))
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  update: function(req,res) {
    db.Workouts.update(req.body, {where: {id: req.params.id}})
      .then(dbWorkouts => res.json(dbWorkouts))
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  delete: function(req,res) {
    db.Workouts.destroy({where: {id: req.params.id}})
      .then(dbWorkouts => res.json(dbWorkouts))
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  }
}