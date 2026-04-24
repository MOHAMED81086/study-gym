const BASE_GIF_URL = 'https://raw.githubusercontent.com/omercotkd/exercises-gifs/main/assets/';

export const WORKOUT_PLANS = {
  fat_loss: {
    male: [
      { id: 'jumping_jacks', nameKey: 'jumping_jacks', duration: 45, image: `${BASE_GIF_URL}0554.gif` },
      { id: 'high_knees', nameKey: 'high_knees', duration: 40, image: `${BASE_GIF_URL}0524.gif` },
      { id: 'mountain_climbers', nameKey: 'mountain_climbers', duration: 40, image: `${BASE_GIF_URL}0641.gif` },
      { id: 'burpees', nameKey: 'burpees', duration: 40, image: `${BASE_GIF_URL}1327.gif` },
      { id: 'squat_jumps', nameKey: 'squat_jumps', duration: 40, image: `${BASE_GIF_URL}0740.gif` },
      { id: 'bicycle_crunches', nameKey: 'bicycle_crunches', duration: 45, image: `${BASE_GIF_URL}0003.gif` },
      { id: 'leg_raises', nameKey: 'leg_raises', duration: 45, image: `${BASE_GIF_URL}0588.gif` },
      { id: 'plank', nameKey: 'plank', duration: 60, image: `${BASE_GIF_URL}0466.gif` }
    ],
    female: [
      { id: 'jumping_jacks', nameKey: 'jumping_jacks', duration: 45, image: `${BASE_GIF_URL}0554.gif` },
      { id: 'high_knees', nameKey: 'high_knees', duration: 40, image: `${BASE_GIF_URL}0524.gif` },
      { id: 'mountain_climbers', nameKey: 'mountain_climbers', duration: 40, image: `${BASE_GIF_URL}0641.gif` },
      { id: 'burpees', nameKey: 'burpees', duration: 40, image: `${BASE_GIF_URL}1327.gif` },
      { id: 'squat_jumps', nameKey: 'squat_jumps', duration: 40, image: `${BASE_GIF_URL}0740.gif` },
      { id: 'bicycle_crunches', nameKey: 'bicycle_crunches', duration: 45, image: `${BASE_GIF_URL}0003.gif` },
      { id: 'leg_raises', nameKey: 'leg_raises', duration: 45, image: `${BASE_GIF_URL}0588.gif` },
      { id: 'plank', nameKey: 'plank', duration: 60, image: `${BASE_GIF_URL}0466.gif` }
    ]
  },
  strength: {
    male: [
      { id: 'pushups', nameKey: 'pushups', duration: 45, image: `${BASE_GIF_URL}0662.gif` },
      { id: 'bodyweight_squats', nameKey: 'squats', duration: 50, image: `${BASE_GIF_URL}0071.gif` },
      { id: 'lunges', nameKey: 'lunges', duration: 45, image: `${BASE_GIF_URL}0001.gif` },
      { id: 'pushups_wide', nameKey: 'pushups_wide', duration: 45, image: `${BASE_GIF_URL}0663.gif` },
      { id: 'diamond_pushups', nameKey: 'diamond_pushups', duration: 40, image: `${BASE_GIF_URL}0339.gif` },
      { id: 'glute_bridge', nameKey: 'glute_bridge', duration: 50, image: `${BASE_GIF_URL}0432.gif` },
      { id: 'calf_raises', nameKey: 'calf_raises', duration: 45, image: `${BASE_GIF_URL}0157.gif` },
      { id: 'plank', nameKey: 'plank', duration: 60, image: `${BASE_GIF_URL}0466.gif` }
    ],
    female: [
      { id: 'pushups', nameKey: 'pushups', duration: 40, image: `${BASE_GIF_URL}0662.gif` },
      { id: 'bodyweight_squats', nameKey: 'squats', duration: 50, image: `${BASE_GIF_URL}0071.gif` },
      { id: 'lunges', nameKey: 'lunges', duration: 45, image: `${BASE_GIF_URL}0001.gif` },
      { id: 'plank', nameKey: 'plank', duration: 60, image: `${BASE_GIF_URL}0466.gif` },
      { id: 'glute_bridge', nameKey: 'glute_bridge', duration: 50, image: `${BASE_GIF_URL}0432.gif` },
      { id: 'superman', nameKey: 'superman', duration: 45, image: `${BASE_GIF_URL}0806.gif` },
      { id: 'calf_raises', nameKey: 'calf_raises', duration: 45, image: `${BASE_GIF_URL}0157.gif` },
      { id: 'leg_raises', nameKey: 'leg_raises', duration: 45, image: `${BASE_GIF_URL}0588.gif` }
    ]
  },
  therapeutic: {
    male: [
      { id: 'cat_cow', nameKey: 'cat_cow_stretch', duration: 60, image: `${BASE_GIF_URL}0184.gif` },
      { id: 'cobra_stretch', nameKey: 'cobra_stretch', duration: 45, image: `${BASE_GIF_URL}0235.gif` },
      { id: 'childs_pose', nameKey: 'childs_pose', duration: 60, image: `${BASE_GIF_URL}0205.gif` },
      { id: 'superman', nameKey: 'superman', duration: 40, image: `${BASE_GIF_URL}0806.gif` },
      { id: 'glute_bridge', nameKey: 'glute_bridge', duration: 45, image: `${BASE_GIF_URL}0432.gif` },
      { id: 'arm_circles', nameKey: 'arm_circles', duration: 40, image: `${BASE_GIF_URL}0025.gif` },
      { id: 'hip_circles', nameKey: 'hip_circles', duration: 45, image: `${BASE_GIF_URL}0671.gif` },
      { id: 'plank', nameKey: 'plank', duration: 45, image: `${BASE_GIF_URL}0466.gif` }
    ],
    female: [
      { id: 'cat_cow', nameKey: 'cat_cow_stretch', duration: 60, image: `${BASE_GIF_URL}0184.gif` },
      { id: 'cobra_stretch', nameKey: 'cobra_stretch', duration: 45, image: `${BASE_GIF_URL}0235.gif` },
      { id: 'childs_pose', nameKey: 'childs_pose', duration: 60, image: `${BASE_GIF_URL}0205.gif` },
      { id: 'superman', nameKey: 'superman', duration: 40, image: `${BASE_GIF_URL}0806.gif` },
      { id: 'glute_bridge', nameKey: 'glute_bridge', duration: 45, image: `${BASE_GIF_URL}0432.gif` },
      { id: 'arm_circles', nameKey: 'arm_circles', duration: 40, image: `${BASE_GIF_URL}0025.gif` },
      { id: 'hip_circles', nameKey: 'hip_circles', duration: 45, image: `${BASE_GIF_URL}0671.gif` },
      { id: 'plank', nameKey: 'plank', duration: 45, image: `${BASE_GIF_URL}0466.gif` }
    ]
  }
};
