const utils = {
  getDiagnosisFromScore: (score) => {
    if(score < 15) {
      return 'Dementia';
    }
    else if (score >= 15 && score < 30) {
      return 'MCI';
    }
    else if (score >= 30) {
      return 'Normal';
    }
    return '';
  },
  hasHistory () { 
    return window.history.length > 2;
  }
};

export default utils;