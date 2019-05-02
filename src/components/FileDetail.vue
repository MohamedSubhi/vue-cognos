<template>
    <v-flex d-flex text-xs-center>
        <v-scroll-y-transition mode="out-in">
        <div
            v-if="!selected"
            class="title grey--text text--lighten-1 font-weight-light"
            style="align-self: center;"
        >Select a Report</div>
        <v-card v-else :key="selected.name" class="pt-4 mx-auto" flat max-width="800">
            <v-card-text>
                <h3 class="headline mb-2 blue--text">{{ selected.name }}</h3>
                <div class="body-1 font-weight-bold text-md-left">Search path: <span class="caption">{{ selected.searchPath }}</span></div>
                <div class="body-1 font-weight-bold text-md-left">Creation time: <span class="caption">{{ selected.creationTime }}</span></div>
                <div class="body-1 font-weight-bold text-md-left">Modification time: <span class="caption">{{ selected.modificationTime }}</span></div>
                <div class="body-1 font-weight-bold text-md-left">Description: <span class="caption">{{ selected.description }}</span></div>
                <div class="body-1 font-weight-bold text-md-left">Contact Email: <span class="caption">{{ selected.contactEmail }}</span></div>
            </v-card-text>
            <v-divider></v-divider>
            <NoParamsModal :searchPath="selected.searchPath"/>
        </v-card>
        </v-scroll-y-transition>
    </v-flex>
</template>

<script>
import NoParamsModal from './NoParamsModal';

export default {
    components: {
        NoParamsModal
    },
    props: {
        selected: null
    }
};
</script>