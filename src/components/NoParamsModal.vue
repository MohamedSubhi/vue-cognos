<template>
  <v-layout row justify-center>
    <v-dialog v-model="dialog" persistent max-width="600px">
      <template v-slot:activator="{ on }">
        <v-btn color="success" v-on="on" dark>Send per Email</v-btn>
      </template>
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
                    <v-text-field label="Email*" required v-model="email"></v-text-field>
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
          <v-btn color="blue darken-1" flat @click="dialog = false">Close</v-btn>
          <v-btn color="blue darken-1" flat @click="send()">Send</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
  export default {
    props: {
        searchPath: ""
    },
    data: () => ({
        radioGroup: "PDF",
        dialog: false,
        title: "",
        email: ""
    }),
    methods: {
        send() {
            const params = JSON.stringify({
                searchPath: this.searchPath,
                betreff: this.title,
                email: this.email,
                doc_type: this.radioGroup});

            fetch('http://localhost:56665/api/RunAndEmail/sendReportNoPrams', {
                method: 'POST',
                headers: {
                "Content-Type": "application/json"
                },
                body: params
            }).then(()=>{this.dialog = false;});
        }
    }
  }
</script>