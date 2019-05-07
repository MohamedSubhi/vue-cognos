<template>
  <v-scroll-y-transition mode="out-in">
    <div
      v-if="!selected"
      class="title grey--text text--lighten-1 font-weight-light"
      style="align-self: center;"
    >Select a Report</div>
    <v-card v-else :key="selected.name" class="pt-4 mx-auto" flat max-width="800">
      <v-card-text>
        <div class="card__header">
          <h3 class="headline mb-2 blue--text card__header-text">{{ selected.name }}</h3>
          <v-btn flat icon class="card__header-btn"><v-icon color="green">file_copy</v-icon></v-btn>
          <v-btn flat icon class="card__header-btn"><v-icon color="orange">fas fa-cut</v-icon></v-btn>
          <ConfirmDeleteModal :searchPath="selected.searchPath" class="card__header-btn"/>
        </div>
        <div class="body-1 font-weight-bold text-md-left">
          Search path:
          <span class="caption">{{ selected.searchPath }}</span>
        </div>
        <div class="body-1 font-weight-bold text-md-left">
          Creation time:
          <span class="caption">{{ selected.creationTime }}</span>
        </div>
        <div class="body-1 font-weight-bold text-md-left">
          Modification time:
          <span class="caption">{{ selected.modificationTime }}</span>
        </div>
        <div class="body-1 font-weight-bold text-md-left">
          Description:
          <span class="caption">{{ selected.description }}</span>
        </div>
        <div class="body-1 font-weight-bold text-md-left">
          Contact Email:
          <span class="caption">{{ selected.contactEmail }}</span>
        </div>
      </v-card-text>
      <v-divider></v-divider>
      <NoParamsModal :searchPath="selected.searchPath"/>
    </v-card>
  </v-scroll-y-transition>
</template>

<script>
import NoParamsModal from "../modals/NoParamsModal";
import ConfirmDeleteModal from "../modals/ConfirmDeleteModal";

export default {
  components: {
    NoParamsModal,
    ConfirmDeleteModal
  },
  props: {
    selected: null
  }
};
</script>

<style>
.card__header{
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 25px;
}
.card__header-text{
  flex-grow: 1;
  margin-bottom: 0px !important;
}
.card__header-btn{
  margin: 0px !important;
}
</style>
