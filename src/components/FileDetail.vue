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
            <v-radio-group v-model="radioGroup" row>
                <div class="body-1 font-weight-bold text-md-left">Output: </div>
                <v-radio
                label="PDF"
                value="pdf"
                ></v-radio>
                <v-radio
                label="Excel"
                value="excel"
                ></v-radio>
            </v-radio-group>
            </v-card-text>
            <v-divider></v-divider>
            <v-btn color="success">Send per Email</v-btn>
        </v-card>
        </v-scroll-y-transition>
    </v-flex>
</template>

<script>
export default {
    props: {
        selected: null
    },
    data: () => ({
        radioGroup: "pdf",
    })
};
</script>