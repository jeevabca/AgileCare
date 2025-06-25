import {RootStackParamList} from '../types/DiabieticTypes';

type CardItem = {
  color: string;
  name: string;
  screen: keyof RootStackParamList;
  icon: any;
};

export const COLOR = {
  PRIMARY_COLOR: '#ffc6fb',
  PLACEHOLDER: 'grey',
  BLACK: 'black',
  HEADER: '#fea9f4',
  INPUT_FIELD: '#fff4fe',
  PINK: '#d722bb',
  WHITE: 'white',
};

export const CARDCOLOR: Record<string, CardItem> = {
  FIRST: {
    color: '#fea9f4',
    name: 'Diabetic Prediction',
    screen: 'DiabietsScreen',
    icon: require('../assets/diabeticicon.png'),
  },
  SECOND: {
    color: '#ffdab9',
    name: 'Body Mass Index',
    screen: 'BmiScreen',
    icon: require('../assets/bmi.png'),
  },
  THIRD: {
    color: '#ffcbcb',
    name: 'Ideal Body Weight',
    screen: 'BodyWeightScreen',
    icon: require('../assets/idealbw.png'),
  },
  FOURTH: {
    color: '#b9ffbb',
    name: 'Basal Metabolic',
    screen: 'BasalScreen',
    icon: require('../assets/basel.png'),
  },
  FIVTH: {
    color: '#b9fffb',
    name: 'Daily Water Intake',
    screen: 'WaterIntakeScreen',
    icon: require('../assets/water.png'),
  },
  SIXTH: {
    color: '#c0ffdd',
    name: 'Calories Burned',
    screen: 'CaloriesBurnedScreen',
    icon: require('../assets/col.png'),
  },
  SEVENTH: {
    color: '#b8ecff',
    name: 'Lean Body Mass',
    screen: 'LeanBodyMassScreen',
    icon: require('../assets/ideal.png'),
  },
  EIGHTH: {
    color: '#c7d8ff',
    name: 'Body Frame Size',
    screen: 'BodyFrameScreen',
    icon: require('../assets/bodyframe.png'),
  },
  NINTH: {
    color: '#f5cbff',
    name: 'Daily Calories Intake',
    screen: 'CalorieIntakeScreen',
    icon: require('../assets/kcal.png'),
  },
  TENTH: {
    color: '#c2cdff',
    name: 'Chest To Hip Ratio',
    screen: 'ChestToHipScreen',
    icon: require('../assets/chesthip.png'),
  },
  ELEVENTH: {
    color: '#feeab9',
    name: 'Waist To Height Ratio',
    screen: 'WaistToHeightScreen',
    icon: require('../assets/waist.png'),
  },
  TWELVETH: {
    color: '#decbff',
    name: 'Waist To Hip Ratio',
    screen: 'WaistToHipScreen',
    icon: require('../assets/waisttohip.png'),
  },
};

const API_URL = 'http://129.159.228.242/';

export const ENDPOINT = {
  DIABIETIC_PREDIC: API_URL + 'diabetes-api/diabetes_prediction',
};

export const CHART = [
  {
    AGEGROUP: 'Under 17',
    RECOMBMI: '15 - 20',
    OVERWEIGHT: '21+',
    OBESE: '26+',
    EXTREMOBESE: '34+',
  },
  {
    AGEGROUP: 'Under 35',
    RECOMBMI: '18 - 24',
    OVERWEIGHT: '25+',
    OBESE: '30+',
    EXTREMOBESE: '40+',
  },
  {
    AGEGROUP: '35 and Over',
    RECOMBMI: '19 - 26',
    OVERWEIGHT: '27+',
    OBESE: '30+',
    EXTREMOBESE: '40+',
  },
];
