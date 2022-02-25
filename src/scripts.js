//----------------- Imports--------------------
import fetchAPI from './apiCalls';
import domUpdates from './domUpdates';
import User from '../src/user';
import Hydration from '../src/Hydration';
import UserRepository from './UserRepository';
import Sleep from '../src/Sleep';
import './css/styles.css';


//----------------- Global Vars ------------------
let userData = null;
let hydrationData = null;
let sleepData = null;
let activityData = null;
let userRepo = null;
let user = null;
let hydration = null;
let sleep = null;
const fetchUserData = fetchAPI.getUserData();
const fetchHydrationData = fetchAPI.getHydrationData();
const fetchSleepData = fetchAPI.getSleepData();
const fetchActivityData = fetchAPI.getActivityData();

//---------------- Functions --------------------
const renderPage = () => {
  Promise.all([fetchUserData, fetchHydrationData, fetchSleepData, fetchActivityData])
    .then(values => {
      userData = values[0].userData;
      hydrationData = values[1].hydrationData;
      sleepData = values[2].sleepData;
      activityData = values[3].activityData;
        generatePageUser(userData);
    });
};

const getRandomID = array => {
  const randomIndex = array[Math.floor(Math.random() * array.length)];
  return randomIndex;
};

const generatePageUser = (userData) => {
  generateNewUser(userData, hydrationData, sleepData, activityData);
  generateNewUserRepo(userData, user);
  generateNewHydration(user.id, hydrationData, user.date);
  generateNewSleep(user.id, sleepData);
  user.generateFormattedFriends(user.friends, userData);
  displayCurrentUser(user, hydration, userRepo);
};

const generateNewUser = (userData, hydrationData) => {
  const getRandomUser = getRandomID(userData);
  const newUser = new User(getRandomUser, hydrationData, sleepData, activityData);
  newUser.findUserHydration(hydrationData)
  newUser.returnCurrentDate();
  newUser.returnLastWeek();
  return user = newUser;
};

const generateNewUserRepo = (userData, user) => {
  userRepo = new UserRepository(userData, user);
  return userRepo = userRepo;
};

const generateNewHydration = () => {
  const newHydration = new Hydration(user.id, hydrationData, user.date);
  newHydration.findUserID(hydrationData);
  newHydration.calculateOuncesPerDayOverWeek();
  return hydration = newHydration;
};

const generateNewSleep = () => {
  const newSleep = new Sleep(user.id, sleepData);
  newSleep.findUserID(sleepData);
  newSleep.getUserAverageHoursSleptPerDayTotal();
  newSleep.getUserAverageQualitySleptPerDay();
  newSleep.getHoursSleptPerDay('2020/01/20');
  newSleep.getQualitySleptPerDay('2020/01/20');
  newSleep.getAllUserSleepQuality();
  newSleep.calculateHrsSleptPerDayOverWeek('2019/06/15');
  newSleep.calculateQualSleepPerDayOverWeek('2019/06/15');
  return sleep = newSleep;
};

const displayCurrentUser = (user, hydration, userRepo) => {
  domUpdates.displayUserName(user);
  domUpdates.displayUserInfo(user, userRepo);
  domUpdates.displayHydrationInfo(user, hydration);
  domUpdates.displaySleepInfo(sleep);
  domUpdates.displayActivityInfo();
};


//---------------- Scripts ------------------------

window.onload = (event) => (event, renderPage());
