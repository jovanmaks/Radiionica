<template>
    <div>
        <h1>{{ pageRoute }}</h1>
        <div v-for="item in items" :key="item.id">
            <!-- Display your item here -->
        </div>
    </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { supabase } from '../supabase'; // import your Supabase client

export default {
    props: ['pageRoute'], // receive the pageRoute prop
    setup(props) {
        const items = ref([]);
        
        onMounted(async () => {
            // Fetch data from Supabase
            const { data, error } = await supabase
                .from('Magacin')
                .select('*')
                .eq('materijal', props.pageRoute);
            
            if (error) {
                console.error(error);
            } else {
                items.value = data;
            }
        });

        return { items };
    }
};
</script>
