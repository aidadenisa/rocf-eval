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
};

export default utils;