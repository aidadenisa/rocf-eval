// This is just an example,
// so you can safely delete all default props below

export default {
  //Login Page
  login_registerLink: "You don't have an account? Register here!",
  login_loginBtn: "Login",
  login_fieldEmptyAlert: 'Please fill both email and password. Thank you!',
  login_errorAlert: "There has been an error logging you in. Please try again!",

  //Register Page
  register_name: 'Name',
  register_loginLink: "You already have an account? Login here!",
  register_registerBtn: "Create new account",
  register_passMismatchAlert: 'The passwords do not match. Please insert them again!',
  register_missingInfoAlert: 'Please fill in all the data needed. Thank you!',
  register_errorAlert: "There has been an error creating your account. Please try again!",

  //Dashboard:
  dashboard_greeting: "Good Day",
  dashboard_doctorTitle: "Dr.",
  dashboard_previousROCF: "Previous ROCF Evaluations",
  dashboard_noROCF: "There are no ROCFs evaluations yet.",
  dashboard_rocfInProgressAlert: "We are analysing a ROCF... It should be ready in a few minutes!",
  dashboard_rocfReady1Alert: "The ROCF for patient",
  dashboard_rocfReady2Alert: "is ready!",

  //NewROCF: 
  newRocf_evaluate: "Evaluate new ROCF",
  newRocf_takePhoto: "Take a photo of the drawing",

  //ROCF Card: 
  rocfCard_patient: 'Patient',

  //Patient Code Page
  patientCode_subtitle: "New ROCF Evaluation",
  patientCode_title: "Please provide the patient's code",
  patientCode_scanButton: "Scan Image",

  //Camera Page
  camera_title: "Take a photo of the patient’s drawing",
  camera_subtitle: "New ROCF Evaluation",
  camera_info: "Take a picture with the drawing of the patient in the center of the camera preview. You don't need to photograph also the Rey-Osterrieth model.",
  camera_takePictureBtn: "Take a picture",

  //Adjust Image Page
  adjustImage_subtitle: 'Adjust photo by zooming or dragging',
  adjustImage_title: 'Do you want to use this photo?',
  adjustImage_takePhotoBtn: " Yes, use this photo",

  //Set Points Page
  setPoints_title: 'Set the 5 reference points',
  setPoints_info: 'You need to indicate on the drawing which are the 5 external points, starting with the corner of the outer rectangle on the top left, then moving clockwise to the corner of the rectangle on the top right, following with the top corner of the rhomb, then the bottom right corner of the outer rectangle, and then the bottom left corner of the outer rectangle. The points are also represened in the model present in the page.',
  setPoints_reset: 'Reset points',
  setPoints_undo: 'Undo',
  setPoints_extract: 'Extract Drawing',
  setPoints_fewPoints1: 'There are only',
  setPoints_fewPoints2: 'points set. You should set 5 points!',
  setPoints_manyPoints: "You should set only 5 points!",

  //Threshold Page
  threshold_subtitle: 'New ROCF Evaluation',
  threshold_title: 'Move the threshold to better extract the drawing',
  threshold_info: 'The algorithm needs to use a pure black and white drawing in order to identify and score the patterns. You can move the thresholds to see how the drawing changes and choose the best version. The more clear the lines, the better. <br><br> If you do not see your drawing anymore, you probably set the points in a wrong order. Go back to set the 5 reference points again.',
  threshold_lessDetails: 'Less details',
  threshold_moreDetails: 'More details',
  threshold_darker: 'Darker',
  threshold_lighter: 'Lighter',
  threshold_analyseBtn: 'Analyse the drawing',

  //ROCF Result Page
  rocfResult_title: 'ROCF Patterns evaluation',
  rocfResult_patientCode: 'Patient Code',
  rocfResult_score: 'Score',
  rocfResult_diagnosis: 'Diagnosis',
  rocfResult_prediction: 'Prediction',
  rocfResult_changeDiagBtn: 'Change Diagnosis',
  rocfResult_chooseDiagBtn: 'Choose diagnosis',
  rocfResult_normal: 'Normal',
  rocfResult_mci: 'MCI',
  rocfResult_dementia: 'Dementia',
  rocfResult_backToPredBtn: 'Back to predictions',
  rocfResult_patterns: 'Patterns',
  rocfResult_saveRevisionBtn: 'Save revision',
  rocfResult_adjustRegion: 'Adjust pattern region',
  rocfResult_changeRegion: 'Change region of pattern',
  rocfResult_saveRegion: 'Save new region',
  rocfResult_saved: "The ROCF evaluation was saved successfully!",

  //ROCF PATTERN
  rocfPattern_pattern: 'Pattern',
  rocfPattern_patternIs: 'The pattern is',
  rocfPattern_score: 'Score',

  //Subpage Heading
  subpageHeading_dialogTitle: 'More information',

  //Main Layout (Sidebar Menu)
  mainLayout_about: 'About the app',
  mainLayout_logout: 'Logout',

  //LangSwitch
  langSwitch_change: 'Change to',
}