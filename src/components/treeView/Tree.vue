<template>
  <v-container>
    <v-card>
      <v-card-title class="indigo white--text headline">Directory</v-card-title>
      <v-layout justify-space-between pa-3>
        <v-flex xs5>
          <FileStructure v-on:childToParent="onChildClick"/>
        </v-flex>
        <v-flex d-flex text-xs-center>
          <FileDetail :selected="selected"/>
        </v-flex>
      </v-layout>
    </v-card>
    <SnackBar />
  </v-container>
</template>

<script>
import FileDetail from "./FileDetail";
import FileStructure from "./FileStructure";
import SnackBar from "../modals/SnackBar";

export default {
  components: {
    FileDetail,
    FileStructure,
    SnackBar
  },
  data: () => ({
    selected: null
  }),
  methods: {
    onChildClick(value) {
      this.selected = value;
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
