<template>
  <v-layout row justify-center>
    <v-dialog v-model="dialog" persistent max-width="600px">
      <template v-slot:activator="{ on }">
        <v-btn color="success" v-on="on" dark>Send per Email<v-icon right>email</v-icon></v-btn>
      </template>
      <v-form ref="form">
        <v-card>
          <v-card-title>
            <span class="headline">Report Options</span>
          </v-card-title>
          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                  <v-flex xs12>
                      <v-text-field label="Title" v-model="title"></v-text-field>
                  </v-flex>
                  <v-flex xs12>
                      <v-text-field label="Email*" prepend-inner-icon="email" v-model="email" :rules="[inputRules.required, inputRules.email]"></v-text-field>
                  </v-flex>
                  <v-radio-group v-model="radioGroup" row>
                      <div class="body-1 font-weight-bold text-md-left">Output: </div>
                      <v-radio
                      label="PDF"
                      value="PDF"
                      ></v-radio>
                      <v-radio
                      label="Excel"
                      value="spreadsheetML"
                      ></v-radio>
                  </v-radio-group>
              </v-layout>
            </v-container>
            <small>*indicates required field</small>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="orange" class="white--text" @click="dialog = false">Close<v-icon right>close</v-icon></v-btn>
            <v-btn color="green"  class="white--text" @click="send()">Send<v-icon right>send</v-icon></v-btn>
          </v-card-actions>
        </v-card>
      </v-form>
    </v-dialog>
  </v-layout>
</template>

<script>
import eventBus from '../../eventBus'
  export default {
    props: {
        searchPath: null
    },
    data: () => ({
        radioGroup: "PDF",
        dialog: false,
        title: "",
        email: "",
        inputRules: {
          required: value => !!value || 'Required.',
          email: value => {
            const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            return pattern.test(value) || 'Invalid e-mail.'
          }
        }
    }),
    methods: {
      send() {
        if (this.$refs.form.validate()) {
          const params = JSON.stringify({
            searchPath: this.searchPath,
            betreff: this.title,
            email: this.email,
            doc_type: this.radioGroup
          });

          fetch('http://localhost:56665/api/RunAndEmail/sendReportNoPrams', {
              method: 'POST',
              headers: {
              "Content-Type": "application/json"
              },
              body: params
          }).then( res =>{
              if (res.status === 200)
                eventBus.$emit('showSnackbar', {text: 'Your Report is in wait list', type: 'success'})
              else
                res.text().then(message => eventBus.$emit('showSnackbar', {text: message, type: 'error'}))
            });
            this.dialog = false;
            eventBus.$emit('showSnackbar', {text: 'Your Request has been sent', type: 'success'})
        }
      }
    }
  }
</script>