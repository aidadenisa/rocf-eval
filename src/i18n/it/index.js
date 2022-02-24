export default {
  //Login Page
  login_registerLink: "Non hai un account? Registrati qui!",
  login_loginBtn: "Login",
  login_fieldEmptyAlert: 'Inserisci la tua email e password. Grazie!',
  login_errorAlert: "Abbiamo riscontrato un errore durante il login. Prova di nuovo.",


  //Register Page
  register_name: 'Nome e Cognome',
  register_loginLink: "Hai già un account? Accedi qui!",
  register_registerBtn: "Crea nuovo account",
  register_passMismatchAlert: 'Le password non corrispondono. Prova a inserirle di nuovo.',
  register_missingInfoAlert: 'Assicurati di aver inserito tutti i dati richiesti. Grazie!',
  register_errorAlert: "Abbiamo riscontrato un errore durante la creazione dell'account. Prova di nuovo.",


  //Dashboard:
  dashboard_greeting: "Buongiorno",
  dashboard_doctorTitle: "Dott.",
  dashboard_previousROCF: "Valutazioni ROCF precedenti",
  dashboard_noROCF: "Non sono presenti ancora valutazioni ROCF.",
  dashboard_rocfInProgressAlert: "Stiamo analizzando la ROCF... Potrebbe richiedere alcuni minuti.",
  dashboard_rocfReady1Alert: "La ROCF per il paziente",
  dashboard_rocfReady2Alert: "è pronta.",

  //NewROCF: 
  newRocf_evaluate: "Valuta una nuova ROCF",
  newRocf_takePhoto: "Fai una foto al disegno",

  //ROCF Card: 
  rocfCard_patient: 'Paziente',

  //Patient Code Page
  patientCode_subtitle: "Nuova valutazione ROCF",
  patientCode_title: "Prego inserire il codice del paziente",
  patientCode_scanButton: "Fai la foto",

  //Camera Page
  camera_title: "Fai una foto al disegno del paziente",
  camera_subtitle: "Nuova valutazione ROCF",
  camera_info: "Fai una foto al disegno del paziente, posizionandolo al centro. Non è necessario fotografare anche il modello Rey-Osterrieth.",
  camera_takePictureBtn: "Fai la foto",

  //Adjust Image Page
  adjustImage_subtitle: 'Regola la foto spostando e zommando con le dita',
  adjustImage_title: 'Vuoi usare questa foto?',
  adjustImage_takePhotoBtn: "Si, usa questa foto",

  //Set Points Page
  setPoints_title: 'Tocca i 5 punti di riferimento sulla foto',
  setPoints_info: "Devi indicare sul disegno quali sono i 5 punti esterni, partendo dall'angolo in alto a sinistra del rettangolo esterno e poi procedendo in senso orario all'angolo in alto a destra, poi sul vertice superiore del rombo, poi l'angolo destro del rettangolo esterno e infine l'angolo sinistro. I punti sono anche riportati nel modello presente nella pagina.",
  setPoints_reset: 'Ripristina',
  setPoints_undo: 'Undo',
  setPoints_extract: 'Estrai disegno',
  setPoints_fewPoints1: 'Ci sono solo',
  setPoints_fewPoints2: 'punti impostati. Sono necessari 5 punti.',
  setPoints_manyPoints: "Devi impostare solo 5 punti.",

  //Threshold Page
  threshold_subtitle: 'Nuova valutazione ROCF',
  threshold_title: "Modifica gli indicatori per migliorare l'estrazione del disegno",
  threshold_info: "L'algoritmo necessita di un disegno in bianco e nero per identificare il punteggio e i pattern. Puoi muovere gli indicatori per migliorare l'estrazione del disegno. Più le linee sono definite meglio è. <br><br> Se non vedi più il disegno, probabilmente i punti di riferimento non sono stati inseriti nell'ordine corretto. Torna indietro per inserire nuovamente i 5 punti di riferimento.",
  threshold_lessDetails: 'Meno dettagli',
  threshold_moreDetails: 'Più dettagli',
  threshold_darker: 'Più scuro',
  threshold_lighter: 'Più chiaro',
  threshold_analyseBtn: 'Analizza il disegno',

  //ROCF Result Page
  rocfResult_title: 'Valutazione dei pattern del ROCF',
  rocfResult_patientCode: 'Codice Paziente',
  rocfResult_score: 'Punteggio',
  rocfResult_diagnosis: 'Diagnosi',
  rocfResult_prediction: 'Predizione',
  rocfResult_changeDiagBtn: 'Modifica la diagnosi',
  rocfResult_chooseDiagBtn: 'Seleziona la diagnosi',
  rocfResult_normal: 'Normale',
  rocfResult_mci: 'MCI',
  rocfResult_dementia: 'Demenza',
  rocfResult_backToPredBtn: 'Torna alle predizioni',
  rocfResult_patterns: 'Pattern',
  rocfResult_saveRevisionBtn: 'Salva revisione',
  rocfResult_adjustRegion: "Correggi l'area del pattern",
  rocfResult_changeRegion: "Cambia l'area",
  rocfResult_saveRegion: 'Salva la nuova area',
  rocfResult_saved: "La valutazione ROCF è stata salvata correttamente.",
  rocfResult_newROI: "Definisci nuova area",

  //ROCF PATTERN
  rocfPattern_pattern: 'Pattern',
  rocfPattern_patternIs: 'Il pattern è',
  rocfPattern_score: 'Punteggio',

  //Subpage Heading
  subpageHeading_dialogTitle: 'Più informazioni',

  //Main Layout (Sidebar Menu)
  mainLayout_about: "Info sull'app",
  mainLayout_logout: 'Logout',

  //LangSwitch
  langSwitch_change: 'Go to',
}