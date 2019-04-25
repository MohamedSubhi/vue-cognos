<template>
  <v-container>
    <v-card>
      <v-card-title class="indigo white--text headline">Directory</v-card-title>
      <v-layout justify-space-between pa-3>
        <v-flex xs5>
          <v-treeview
            :items="items"
            :active.sync="active"
            :load-children="fetchSubFolder"
            :open.sync="open"
            activatable
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
        <v-flex d-flex text-xs-center>
          <v-scroll-y-transition mode="out-in">
            <div
              v-if="!selected"
              class="title grey--text text--lighten-1 font-weight-light"
              style="align-self: center;"
            >Select a Report</div>
            <v-card v-else :key="selected.name" class="pt-4 mx-auto" flat max-width="400">
              <v-card-text>
                <h3 class="headline mb-2">{{ selected.name }}</h3>
                <div class="blue--text mb-2">{{ selected.parent }}</div>
                <div class="blue--text subheading font-weight-bold">{{ selected.name }}</div>
              </v-card-text>
              <v-divider></v-divider>
              <!-- <v-layout tag="v-card-text" text-xs-left wrap>
                <v-flex tag="strong" xs5 text-xs-right mr-3 mb-2>Company:</v-flex>
                <v-flex>{{ selected.company.name }}</v-flex>
                <v-flex tag="strong" xs5 text-xs-right mr-3 mb-2>Website:</v-flex>
                <v-flex>
                  <a :href="`//${selected.website}`" target="_blank">{{ selected.website }}</a>
                </v-flex>
                <v-flex tag="strong" xs5 text-xs-right mr-3 mb-2>Phone:</v-flex>
                <v-flex>{{ selected.phone }}</v-flex>
              </v-layout> -->
            </v-card>
          </v-scroll-y-transition>
        </v-flex>
      </v-layout>
    </v-card>
  </v-container>
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
    tree: [],
    items: []
  }),
  computed: {
      selected () {
        if (!this.active.length) return undefined

        const id = this.active[0]
        console.log(this.active)
        // return this.items.find(report => {return report.name === id})
        return { name: "test", parent: "pdf" }
      }
    },
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
      let searchPath = item.parent + "/folder[@name='" + item.name + "']";

      const folders = await fetch(
        "http://localhost:56665/api/Login/getSubFoldersList",
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
            if (child.format === "PDF")
              return { name: child.name, file: "pdf", searchPath: searchPath };
            else return { name: child.name, file: "xls" , searchPath: searchPath };
          }
        })
      );
    }
  }
};
</script>

<style>
</style>
