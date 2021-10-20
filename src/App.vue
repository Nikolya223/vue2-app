<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
          transition="scale-transition"
          width="40"
        />

        <v-img
          alt="Vuetify Name"
          class="shrink mt-1 hidden-sm-and-down"
          contain
          min-width="100"
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-name-dark.png"
          width="100"
        />
      </div>

      <v-spacer></v-spacer>

      <v-btn
        href="https://github.com/vuetifyjs/vuetify/releases/latest"
        target="_blank"
        text
      >
        <span class="mr-2">Latest Release</span>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
       
        <v-container>
            <v-responsive height="10vh"></v-responsive>
            <Tags :items="tags1.items" :align="tags1.align" />
            
            <v-responsive height="50vh"></v-responsive>
            
            <Tags :items="tags2.items" :align="tags2.align" />
            <v-responsive height="50vh"></v-responsive>
        </v-container>
      
    </v-main>
  </v-app>
</template>

<script>
import Tags from './components/Tags';

export default {
  name: 'App',

  components: {
    Tags,
  },

  data: () => ({
    tags1: {
        items: [],
        align: 'left'  
    },  
    tags2: {
        items: [],
        align: 'justify'  
    },   
    //
  }),
  
  mounted() {
    let icons = ['mdi-backup-restore', 'mdi-bell', 'mdi-star', false];  
    for (let i = 1; i < 40; i++) {
        this.tags1.items.push({
            label: 'tag ' + i,
            icon: icons.sort(() => 0.5 - Math.random())[0]
        })
    }
    
    for (let i = 1; i < 6; i++) {
        this.tags2.items.push({
            label: 'tag ' + i,
            icon: icons.sort(() => 0.5 - Math.random())[0]
        })
    }
      
      
  }
};
</script>
 