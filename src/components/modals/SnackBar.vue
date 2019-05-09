<template>
    <v-snackbar
        v-model="snackbar"
        :color="color"
        :multi-line="mode === 'multi-line'"
        :timeout="timeout"
        top
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
        timeout: 3000,
        text: ''
      }
    },
    created() {
        eventBus.$on('showSnackbar', data => {
            this.snackbar = true
            this.color = data.type
            this.text = data.text
        })
    }
  }
</script>