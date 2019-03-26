module.exports = function (sequelize, DataTypes) {

  const Workouts = sequelize.define("Workouts", {
    date: {
      type: DataTypes.STRING,
      defaultValue: DataTypes.DATE,
      required: true
    },
    name: {
      type: DataTypes.TEXT,
      defaultValue: DataTypes.TEXT,
      required: true

    },

    exercises: {
      type: DataTypes.TEXT,
      get() {
        return JSON.parse(this.getDataValue('exercises'));
      },
      set(value) {
        this.setDataValue('exercises', JSON.stringify(value));
      }
    }
  });

  Workouts.associate = function (models) {

    models.Workouts.belongsTo(models.Users, {
      onDelete: 'CASCADE',
      validate: {
        allowNull: false
      }
    });
  }

  return Workouts;
}