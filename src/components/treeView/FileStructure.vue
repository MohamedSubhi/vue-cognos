<template>
  <v-treeview
    :items="items"
    :active.sync="active"
    :load-children="getTreeFolders"
    :open.sync="open"
    activatable
    return-object
    active-class="primary--text"
    class="grey lighten-5 file__structure"
    item-key="name"
    open-on-click
    transition
  >
    <template v-slot:prepend="{ item, open }">
      <v-icon v-if="!item.file">{{ open ? 'mdi-folder-open' : 'mdi-folder' }}</v-icon>
      <v-icon v-else>{{ files[item.file] }}</v-icon>
    </template>
  </v-treeview>
</template>

<script>
export default {
  data: () => ({
    open: [],
    active: [],
    files: {
      html: "mdi-language-html5",
      pdf: "mdi-file-pdf",
      txt: "mdi-file-document-outline",
      xls: "mdi-file-excel"
    },
    selected: null
  }),
  computed: {
    items() {
      return this.$store.state.folders
    }
  },
  watch: {
    active() {
      if (this.active.length)
        fetch("http://localhost:56665/api/content/getFolderList", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            searchPath: this.active[0].searchPath + "//report"
          })
        })
          .then(res => res.json())
          .then(json => {
            this.$emit("childToParent", json[0]);
            return (this.selected = json[0]);
          });
    }
  },
  mounted() {
    this.$store.dispatch("getFolders")
  },
  methods: {
    async getTreeFolders(item) {
      let searchPath = item.parent + "/folder[@name='" + item.name + "']";

      const folders = await fetch(
        "http://localhost:56665/api/content/getFolderList",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ searchPath: searchPath + "/*" })
        }
      );
      const json = await folders.json();
      item.children.push(
        ...json.map(child => {
          if (child.usage === "folder") {
            return { name: child.name, children: [], parent: child.parent };
          } else {
            if (child.format === "PDF")
              return {
                name: child.name,
                file: "pdf",
                searchPath: child.searchPath
              };
            else if (child.format === "html")
              return {
                name: child.name,
                file: "html",
                searchPath: child.searchPath
              };
            else{
              return {
                name: child.name,
                file: "xls",
                searchPath: child.searchPath
              };
            }
          }
        })
      );
    }
  }
};
</script>

<style>
.file__structure {
  height: -webkit-fill-available;
  overflow: scroll;
}
</style>
