<template>
    <v-snackbar
        v-model="snackbar"
        :color="color"
        :multi-line="mode === 'multi-line'"
        :timeout="timeout"
        :vertical="mode === 'vertical'"
        >
        {{ text }}
        <v-btn
            dark
            flat
            @click="snackbar = false"
        >
            Close
        </v-btn>
    </v-snackbar>    
</template>
<script>
import eventBus from '../../eventBus';
  export default {
    data () {
      return {
        snackbar: false,
        color: '',
        mode: '',
        timeout: 2000,
        text: 'The Report has been deleted'
      }
    },
    created() {
        eventBus.$on('showSnackbar', data => {
            this.snackbar = true
            this.color = data
        })
    }
  }
</script>