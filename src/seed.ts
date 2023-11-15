import { models, sequelize } from "./db/index";
import { EXERCISE_DIFFICULTY } from "./utils/enums";

const { Exercise, BodyPart } = models;

const seedDB = async () => {
  await sequelize.sync({ force: true });

  await BodyPart.bulkCreate(
    [
      {
        name: "chest",
      },
      {
        name: "back",
      },
      {
        name: "shoulders",
      },
      {
        name: "biceps",
      },
      {
        name: "triceps",
      },
      {
        name: "abdominals",
      },
      {
        name: "lower back",
      },
      {
        name: "quad dominant",
      },
      {
        name: "hip dominant",
      },
    ] as any[],
    { returning: true }
  );

  /*await Exercise.bulkCreate([
    {
      name: "bench press",
      difficulty: EXERCISE_DIFFICULTY.MEDIUM,
      muscle: "pectoralis",
      instructions:
        "Lie flat on a bench with your feet on the ground.     Grip the barbell slightly wider than shoulder-width apart.     Lower the barbell to your chest.     Push the barbell back up to the starting position.",
      bodyPartID: 1,
      createdByUser: 1,
    },
    {
      name: "dumbell press",
      difficulty: EXERCISE_DIFFICULTY.EASY,
      muscle: "pectoralis",
      instructions:
        "Lie on a bench with a dumbbell in each hand.     Hold the dumbbells at shoulder height.     Push the dumbbells up until your arms are fully extended.     Lower them back to shoulder height.",
      bodyPartID: 1,
      createdByUser: 1,
    },
    {
      name: "parallel bar dip",
      difficulty: EXERCISE_DIFFICULTY.HARD,
      muscle: "pectoralis",
      instructions:
        "Stand between parallel bars.     Grip the bars with your palms facing each other.     Lower your body by bending your arms.     Push your body back up to the starting position.",
      bodyPartID: 1,
      createdByUser: 1,
    },
    {
      name: "push-up",
      difficulty: EXERCISE_DIFFICULTY.MEDIUM,
      muscle: "pectoralis",
      instructions:
        "Start in a plank position with hands beneath your shoulders.     Lower your body by bending your arms.     Push your body back up to the starting position.",
      bodyPartID: 1,
      createdByUser: 1,
    },
    {
      name: "deadlift",
      difficulty: EXERCISE_DIFFICULTY.HARD,
      muscle: "latissimus dorsi",
      instructions:
        "Stand with feet hip-width apart and a barbell in front of you.     Bend at your hips and knees to grasp the barbell.     Lift the bar by straightening your hips and standing up.     Lower the bar back to the ground with control.",
      bodyPartID: 2,
      createdByUser: 1,
    },
    {
      name: "pull-up",
      difficulty: EXERCISE_DIFFICULTY.MEDIUM,
      muscle: "latissimus dorsi",
      instructions:
        "Hang from a horizontal bar with palms facing away from you.     Pull your body up until your chin is above the bar.     Lower your body back down with control.",
      bodyPartID: 2,
      createdByUser: 1,
    },
    {
      name: "barbell row",
      difficulty: EXERCISE_DIFFICULTY.EASY,
      muscle: "latissimus dorsi",
      instructions:
        "Bend at your hips and knees to pick up a barbell.     Keep your back straight and pull the barbell to your lower chest.     Lower the barbell back to the ground.",
      bodyPartID: 2,
      createdByUser: 1,
    },
    {
      name: "military press",
      difficulty: EXERCISE_DIFFICULTY.MEDIUM,
      muscle: "deltoids",
      instructions:
        "Stand with a barbell on your shoulders.     Press the barbell overhead until your arms are fully extended.     Lower the barbell back to your shoulders.",
      bodyPartID: 3,
      createdByUser: 1,
    },
    {
      name: "lateral raises",
      difficulty: EXERCISE_DIFFICULTY.EASY,
      muscle: "deltoids",
      instructions:
        "Hold a dumbbell in each hand by your sides.     Lift the dumbbells out to your sides until shoulder level.     Lower them back to your sides.",
      bodyPartID: 3,
      createdByUser: 1,
    },
    {
      name: "curls",
      difficulty: EXERCISE_DIFFICULTY.EASY,
      muscle: "biceps brachii",
      instructions:
        "Hold a dumbbell in each hand by your sides with palms facing forward.     Bend your elbows to curl the dumbbells towards your shoulders.     Lower the dumbbells back to your sides.",
      bodyPartID: 4,
      createdByUser: 1,
    },
    {
      name: "barbell curls",
      difficulty: EXERCISE_DIFFICULTY.EASY,
      muscle: "biceps brachii",
      instructions:
        "Hold a barbell with both hands in front of your thighs.     Bend your elbows to curl the barbell towards your shoulders.     Lower the barbell back to your thighs.",
      bodyPartID: 4,
      createdByUser: 1,
    },
    {
      name: "push-down",
      difficulty: EXERCISE_DIFFICULTY.EASY,
      muscle: "triceps brachii",
      instructions:
        "Attach a rope handle to a high pulley at a cable machine.     Hold the rope with both hands and press it down towards your thighs.     Return the rope to the starting position.",
      bodyPartID: 5,
      createdByUser: 1,
    },
    {
      name: "triceps dip",
      difficulty: EXERCISE_DIFFICULTY.EASY,
      muscle: "triceps brachii",
      instructions:
        "Place your hands on parallel bars or a sturdy surface.     Lower your body by bending your arms.     Push your body back up to the starting position.",
      bodyPartID: 5,
      createdByUser: 1,
    },
    {
      name: "sit-up",
      difficulty: EXERCISE_DIFFICULTY.MEDIUM,
      muscle: "rectus abdomanis",
      instructions:
        "Lie on your back with your knees bent and feet flat on the ground.     Cross your arms over your chest or place your hands behind your head.     Lift your upper body off the ground by contracting your abdominal muscles.",
      bodyPartID: 6,
      createdByUser: 1,
    },
    {
      name: "leg raise",
      difficulty: EXERCISE_DIFFICULTY.MEDIUM,
      muscle: "rectus abdomanis",
      instructions:
        "Lie on your back with your legs straight.     Lift your legs off the ground by contracting your abdominal muscles.     Lower your legs back down.",
      bodyPartID: 6,
      createdByUser: 1,
    },
    {
      name: "bird dogs",
      difficulty: EXERCISE_DIFFICULTY.EASY,
      muscle: "Multifidus",
      instructions:
        "Start on your hands and knees.     Extend your right arm and left leg simultaneously.     Return to the starting position and repeat on the opposite side.",
      bodyPartID: 7,
      createdByUser: 1,
    },
    {
      name: "back arch",
      difficulty: EXERCISE_DIFFICULTY.EASY,
      muscle: "Multifidus",
      instructions:
        "Lie face down with your arms and legs extended.     Lift your chest and legs off the ground, arching your back.     Hold for a moment, then lower to the ground.",
      bodyPartID: 7,
      createdByUser: 1,
    },
    {
      name: "squat",
      difficulty: EXERCISE_DIFFICULTY.HARD,
      muscle: "glutes",
      instructions:
        "Stand with your feet shoulder-width apart.     Bend your knees and hips to lower your body.     Keep your back straight and chest up.     Stand back up.",
      bodyPartID: 8,
      createdByUser: 1,
    },
    {
      name: "leg press",
      difficulty: EXERCISE_DIFFICULTY.EASY,
      muscle: "glutes",
      instructions:
        "Sit in a leg press machine with your feet shoulder-width apart.     Push the platform away from you by extending your legs.     Return the platform to the starting position.",
      bodyPartID: 8,
      createdByUser: 1,
    },
    {
      name: "romanian deadlift",
      difficulty: EXERCISE_DIFFICULTY.EASY,
      muscle: "hamstrings",
      instructions:
        "Stand with your feet hip-width apart and a barbell in front of you.     Bend at your hips to lower the barbell while keeping your back straight.     Stand back up by extending your hips.",
      bodyPartID: 9,
      createdByUser: 1,
    },
    {
      name: "Bench Hip Thrust",
      difficulty: EXERCISE_DIFFICULTY.EASY,
      muscle: "hamstrings",
      instructions:
        "Sit on the floor with your upper back against a bench.     Roll a barbell or place a weight plate over your hips.     Bend your knees and place your feet flat on the ground.     Lift your hips off the ground by thrusting them upward, squeezing your glutes.",
      bodyPartID: 9,
      createdByUser: 1,
    },
  ]);
  */
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
