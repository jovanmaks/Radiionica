
<template>
    <base-layout page-title="" page-default-back-link="/admin">
        <template v-slot:content>

            <TaskMeny />

        </template>
    </base-layout>
</template>

<script lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useStore } from 'vuex';
import TaskMeny from '@/components/menys/TasksMenuComponent.vue';

import { IonMenu } from '@ionic/vue';

export default {
    components: {
        TaskMeny,
    },
    setup() {

        return {  }
    }
}
</script>

<style lang="scss" scoped></style>