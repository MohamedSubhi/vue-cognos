import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    folders: []
  },
  mutations: {
    getFolders: (state, folders) => {
      state.folders = folders
    }
  },
  actions: {
    getFolders: async (context) => {
      let folders = await fetch(
        "http://localhost:56665/api/content/getFolderList",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ searchPath: "/content/*" })
        }
      )
      
      folders = await folders.json()
      folders = folders.map(folder => {
        return { name: folder.name, children: [], parent: folder.parent };
      })
      
      context.commit('getFolders', folders)
    }
  }
})
