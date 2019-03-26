const router = require('express').Router();
const workoutController = require('../../controllers/workoutController');

// matches with '/api/workouts'
router
  .route('/')
  .get(workoutController.findAll)
  .post(workoutController.create);

router
  .route('/exercises/:exercise_name')
  .get(workoutController.findByExercise);

router
  .route('/muscle_groups/:muscle_group')
  .get(workoutController.findByMuscleGroup);

router
  .route('/:id')
  .get(workoutController.findById)
  .put(workoutController.update)
  .delete(workoutController.delete);

module.exports = router;
