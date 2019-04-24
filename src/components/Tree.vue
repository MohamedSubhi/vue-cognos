<template>
  <v-container>
    <v-treeview
      v-model="tree"
      :open.sync="open"
      :items="items"
      :load-children="fetchSubFolder"
      activatable
      item-key="name"
      open-on-click
    >
      <template v-slot:prepend="{ item, open }">
        <v-icon v-if="!item.file">{{ open ? 'mdi-folder-open' : 'mdi-folder' }}</v-icon>
        <v-icon v-else>{{ files[item.file] }}</v-icon>
      </template>
    </v-treeview>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    open: [],
    files: {
      html: "mdi-language-html5",
      pdf: "mdi-file-pdf",
      txt: "mdi-file-document-outline",
      xls: "mdi-file-excel"
    },
    tree: [],
    items: []
  }),
  mounted() {
    this.getFolders();
  },
  methods: {
    async getFolders() {
      const folders = await fetch(
        "http://localhost:56665/api/Login/getSubFoldersList",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ searchPath: "/content/*" })
        }
      );
      const json = await folders.json();
      this.items = json.map(folder => {
        return { name: folder.name, children: [], parent: folder.parent };
      });
    },
    async fetchSubFolder(item) {
      let searchPath = item.parent + "/folder[@name='" + item.name + "']/*";

      const folders = await fetch(
        "http://localhost:56665/api/Login/getSubFoldersList",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ searchPath: searchPath })
        }
      );
      const json = await folders.json();
      item.children.push(
        ...json.map(child => {
          if (child.usage === "folder") {
            return { name: child.name, children: [], parent: child.parent };
          } else {
            if (child.format === "PDF") return { name: child.name, file: "pdf" };
            else return { name: child.name, file: "xls" };
          }
        })
      );
    }
  }
};
</script>

<style>
</style>
