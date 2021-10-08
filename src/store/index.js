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
      image: ''
    },
    mutations: {
      newImage(state, newImage) {
        state.image = newImage;
      },
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
    }
                             
  });

  return Store;
}