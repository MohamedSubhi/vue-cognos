<template>
  <div>
    <v-layout row justify-center>
      <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
        <template v-slot:activator="{ on }">
          <v-btn flat icon class="card__header-btn" @click.stop="dialog = true">
            <v-icon color="green">file_copy</v-icon>
          </v-btn>
        </template>
        <v-card>
          <v-toolbar dark color="primary">
            <v-btn icon dark @click="dialog = false">
              <v-icon>close</v-icon>
            </v-btn>
            <v-toolbar-title>Copy Report</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-items>
              <v-btn dark flat @click="dialog = false"><v-icon left>save</v-icon>Save</v-btn>
            </v-toolbar-items>
          </v-toolbar>
          <v-list three-line subheader>
            <v-subheader>Copy to: </v-subheader>
          </v-list>
          <v-divider></v-divider>
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
        </v-card>
      </v-dialog>
    </v-layout>
  </div>
</template>

<script>
export default {
  props: {
    searchPath: null
  },
  data() {
    return {
      dialog: false,
      notifications: false,
      sound: true,
      widgets: false,
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
    };
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
    }
    }
};
</script>