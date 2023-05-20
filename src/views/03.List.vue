<template>
    <div>
      <h1>{{ $route.params.name }}</h1>
      <!-- you can iterate over the list for the specific item -->
      <div v-for="item in items" :key="item.id">
        <!-- display your item here -->
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        items: [] // Initialize your items list here
      }
    },
    created() {
      const name = this.$route.params.name;
      // Fetch data from Supabase for the specific 'name' here and populate the items list
      // For example:
      // supabase
      //   .from(name)
      //   .select("*")
      //   .then((data) => {
      //     this.items = data;
      //   });
    }
  }
  </script>
  