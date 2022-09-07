import { models, sequelize } from "./db/index";
import { EXERCISE_DIFFICULTY } from "./utils/enums";

const { Exercise, Program } = models;

const seedDB = async () => {
  await sequelize.sync({ force: true });

  await Program.bulkCreate(
    [
      {
        name: "BACK",
      },
      {
        name: "LEGS",
      },
      {
        name: "ARMS",
      },
    ] as any[],
    { returning: true }
  );

  await Exercise.bulkCreate([
    {
      name: "Barbell Deadlift",
      difficulty: EXERCISE_DIFFICULTY.EASY,
      muscle: "back",
      instuctions:
        "Squat down and grasp a barbell with your hands roughly shoulder-width apart. Keep your chest up, pull your shoulders back and look straight ahead as you lift the bar. Focus on taking the weight back onto your heels and keep the bar as close as possible to your body at all times. Lift to thigh level, pause, then return under control to the start position.",
      programID: 1,
    },
    {
      name: "Pull-Up",
      difficulty: EXERCISE_DIFFICULTY.EASY,
      muscle: "back",
      instuctions:
        "How: Grab the handles of the pull-up station with your palms facing away from you and your arms fully extended. Your hands should be around shoulder-width apart. Squeeze your shoulder blades together, exhale and drive your elbows towards your hips to bring your chin above the bar. Lower under control back to the start position.",
      programID: 1,
    },
    {
      name: "Chest-supported Dumbbell Row",
      difficulty: EXERCISE_DIFFICULTY.MEDIUM,
      muscle: "back",
      instuctions:
        "Lie face down on the bench with your feet other side to keep you stable. Hang the dumbbells beneath you using a neutral grip. Keep your head up and bring your shoulder blades together as you row the weights towards your chest. Lower to the starting position under control.",
      programID: 1,
    },
    {
      name: "Back squat",
      difficulty: EXERCISE_DIFFICULTY.MEDIUM,
      muscle: "glutes, hamstrings",
      instuctions:
        "Load a barbell on your traps and stand with your feet shoulder-width apart. Your gaze should be ahead, your chest should be proud, and your toes should be pointed slightly out. Sit back into your hips, bend your knees, and drop down toward the floor. Ensure that your knees move slightly out, and do not collapse in. Lower until your thighs are parallel to the ground — or as far down as your mobility allows — then push back up to the starting position.",
      programID: 2,
    },
    {
      name: "Front squat",
      difficulty: EXERCISE_DIFFICULTY.HARD,
      muscle: "quads",
      instuctions:
        "Load a barbell onto the front of your shoulders, hooking your fingers in an underhand grip on either side of your shoulders to support it. Push your elbows up and keep your gaze ahead. Sit back into your hips, bend your knees, and lower down toward the floor. Ensure that your knees track out and your chest stays proud, resisting the pull to fall forward. Lower until your thighs are parallel to the ground — or as far down as your mobility allows — then push back up to the starting position. ",
      programID: 2,
    },
    {
      name: "Incline Bicep Curl",
      difficulty: EXERCISE_DIFFICULTY.HARD,
      muscle: "biceps",
      instuctions:
        "Beware: this position isolates the biceps and prevents other muscles from sharing the load. You can work the entire muscle by turning your wrists out slightly and keeping your elbows pointed towards the floor throughout the rep, a range of motion not available in other arm exercises",
      programID: 3,
    },
  ]);
};

seedDB()
  .then(() => {
    console.log("DB seed done");
    process.exit(0);
  })
  .catch((err) => {
    console.error("error in seed, check your data and model \n \n", err);
    process.exit(1);
  });
