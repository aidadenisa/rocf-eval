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
  getLabelFromScore(score) {
    let result = 'unknown';
    switch(score) {
      case 0: {
        result = 'omitted';
        break;
      }
      case 1: {
        result = 'distorted';
        break;
      }
      case 2: {
        result = 'misplaced';
        break;
      }
      case 3: {
        result = 'correct';
        break;
      }
      default: {
        result = 'unknown';
      }
    }
    return result;
  },
  hasHistory () { 
    return window.history.length > 2;
  },
  sum(array) {
    let sum = 0;
    if(!array.length) return sum;
    for (let i = array.length; i--;) {
      sum+=array[i];
    }
    return sum;
  }
};

export default utils;