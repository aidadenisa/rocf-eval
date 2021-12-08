import { createStore } from 'vuex'

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */

export default async function(/* { ssrContext } */) {
  const Store = createStore({
    state: { 
      image: '',
      points: [],
      patientCode: ''
    },
    mutations: {
      newImage(state, newImage) {
        state.image = newImage;
      },
      newPoints(state, newPoints) {
        state.points = newPoints;
      },
      newPatientCode(state, newCode) {
        state.patientCode = newCode;
      }
    },
    
    actions: {
      fetchImage({ commit }, newImage) {
        console.log("i received a new image")
        if (newImage) {
          console.log("good, commit")

          commit("newImage", newImage);
        } else {
          console.log("not good, delete")
          commit("newImage", '');
        }
      },
      fetchPoints({ commit }, newPoints) {
        console.log("i received new points")
        if (newPoints) {
          console.log("good, commit")

          commit("newPoints", newPoints);
        } else {
          console.log("not good, delete")
          commit("newPoints", []);
        }
      },
      fetchPatientCode({ commit }, code) {
        console.log("i received code")
        if (code) {
          console.log("good, commit")

          commit("newPatientCode", code);
        } else {
          console.log("not good, delete")
          commit("newPatientCode", '');
        }
      },
    }
                             
  });

  return Store;
}