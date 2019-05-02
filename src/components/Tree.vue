<template>
  <v-container>
    <v-card>
      <v-card-title class="indigo white--text headline">Directory</v-card-title>
      <v-layout justify-space-between pa-3>
        <v-flex xs5>
          <v-treeview
            :items="items"
            :active.sync="active"
            :load-children="getTreeFolders"
            :open.sync="open"
            activatable
            return-object
            active-class="primary--text"
            class="grey lighten-5"
            item-key="name"
            open-on-click
            transition
          >
            <template v-slot:prepend="{ item, open }">
              <v-icon v-if="!item.file">{{ open ? 'mdi-folder-open' : 'mdi-folder' }}</v-icon>
              <v-icon v-else>{{ files[item.file] }}</v-icon>
            </template>
          </v-treeview>
        </v-flex>
        <FileDetail :selected="selected"/>
      </v-layout>
    </v-card>
  </v-container>
</template>

<script>
import FileDetail from './FileDetail'
export default {

  components:{
    FileDetail
  },
  data: () => ({
    open: [],
    active: [],
    files: {
      html: "mdi-language-html5",
      pdf: "mdi-file-pdf",
      txt: "mdi-file-document-outline",
      xls: "mdi-file-excel"
    },
    tree: [],
    items: [],
    selected: null
  }),
  watch:{
    active(){
      if(this.active.length)
        fetch(
          "http://localhost:56665/api/Login/getFolderList",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({ searchPath: this.active[0].searchPath  + "//report"})
          }
        ).then(res => res.json()).then(json => this.selected = json[0])
    }
  },
  mounted() {
    this.getFolders();
  },

  methods: {
    async getFolders() {
      const folders = await fetch(
        "http://localhost:56665/api/Login/getFolderList",
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
    async getTreeFolders(item) {
      let searchPath = item.parent + "/folder[@name='" + item.name + "']";

      const folders = await fetch(
        "http://localhost:56665/api/Login/getFolderList",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ searchPath: searchPath  + "/*"})
        }
      );
      const json = await folders.json();
      item.children.push(
        ...json.map(child => {
          if (child.usage === "folder") {
            return { name: child.name, children: [], parent: child.parent };
          } else {
            if(child.format === "PDF")
              return { name: child.name, file: "pdf", searchPath: child.searchPath };
            else if(child.format === "html")
              return { name: child.name, file: "html" , searchPath: child.searchPath };
            else
              return { name: child.name, file: "xls" , searchPath: child.searchPath };
          }
        })
      );
    }
  }

};
</script>

<style>
</style>
