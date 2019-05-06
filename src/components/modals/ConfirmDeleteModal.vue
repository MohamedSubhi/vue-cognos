<template>
  <div>
    <v-btn flat icon class="card__header-btn" @click.stop="dialog = true"><v-icon color="red">delete</v-icon></v-btn>

    <v-dialog
      v-model="dialog"
      max-width="290"
    >
      <v-card>
        <v-card-title class="headline">Delete Seleted?</v-card-title>

        <v-card-text>
          Are you sure you want to delete the selected report?
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
            color="green darken-1"
            flat="flat"
            @click="dialog = false"
          >
            Cancel
          </v-btn>

          <v-btn
            color="red darken-1"
            flat="flat"
            @click="deleteReport()"
          >
            Delete
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import eventBus from '../../eventBus'
  export default {
    props: {
        searchPath: null
    },
    data () {
    return {
        dialog: false
    }
    },
    methods: {
        deleteReport(){
          fetch("http://localhost:56665/api/Login/deleteReport", {
              method: "DELETE",
              headers: {
              "Content-Type": "application/json"
              },
              body: JSON.stringify({
                searchPath: this.searchPath
              })
          }).then(res => {
              if (res.status === 200) {
                this.dialog = false
                eventBus.$emit('showSnackbar')
              }
          });
        }
    }
  }
</script>