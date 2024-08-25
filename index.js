let express = require("express");
let app = express();
let cors = require("cors");
app.use(cors());
let port = 3000;
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

let activities = [
  { activityId: 1, type: "Running", duration: 30, caloriesBurned: 300 },
  { activityId: 2, type: "Swimming", duration: 45, caloriesBurned: 400 },
  { activityId: 3, type: "Cycling", duration: 60, caloriesBurned: 500 },
];

//1
function addNewActivity(activities, newActivity) {
  activities.push(newActivity);
  return activities;
}
app.get("/activities/add", (req, res) => {
  let activityId = parseInt(req.query.activityId);
  let type = req.query.type;
  let duration = parseInt(req.query.duration);
  let caloriesBurned = parseInt(req.query.caloriesBurned);
  let newActivity = { 'activityId': activityId, 'type': type, 'duration': duration, 'caloriesBurned': caloriesBurned }
  result = addNewActivity(activities, newActivity);
  res.send(result);
});
//activities/add?activityId=4&type=Walking&duration=20&caloriesBurned=150

//2
function sortActivitiesByDuration(activitie1, activitie2) {
  return activitie1.duration - activitie2.duration;
}
app.get('/activities/sort-by-duration',(req, res) => {
  let result = activities.slice();
  result.sort(sortActivitiesByDuration);
  res.json(result);
});
//activities/sort-by-duration

//3
function filterActivitiesArrayType(activities, type) {
  return activities.type === type;
}
app.get('/activities/filter-by-type', (req, res) => {
  let type = req.query.type;
  let result = activities.filter(activities => filterActivitiesArrayType(activities, type));
  res.json(result);
});
//activities/filter-by-type?type=Running

//4
function calculateTotalCaloriesBurned(activities){
  let totalCaloriesBurned = 0;
  for(let i = 0; i < activities.length; i++) {
    totalCaloriesBurned += activities[i].caloriesBurned;
  }
  return totalCaloriesBurned;
}
app.get('/activities/total-calories', (req, res) => {
  let result = calculateTotalCaloriesBurned(activities);
  res.json({ totalCaloriesBurned: result });
});
//activities/total-calories

//5
function updateDurationOfActivity(activities, activityId, duration) {
  for(let i = 0; i < activities.length; i++) {
    if(activities[i].activityId === activityId) {
      activities[i].duration = duration;
      break;
    }
  }
  return activities;
}
app.get('/activities/update-duration', (req, res) => {
  let activityId = parseInt(req.query.activityId);
  let duration = parseInt(req.query.duration);
  let result = updateDurationOfActivity(activities, activityId, duration);
  res.json(result);
});
//activities/update-duration?activityId=1&duration=35

//6
function filterActivityByID(activity, activityId) {
  return activity.activityId !== activityId;
}
app.get('/activities/delete', (req, res) => {
  let activityId = parseInt(req.query.activityId);
  let result = activities.filter(activity => filterActivityByID(activity, activityId));
  res.json(result);
});
//activities/delete?activityId=2

//7
function filterActivityByType(activity, type) {
  return activity.type !== type;
}
app.get('/activities/delete-by-type', (req, res) => {
  let type = req.query.type;
  activities = activities.filter(activity => filterActivityByType(activity, type));
  res.json(activities);
});

//activities/delete-by-type?type=Running