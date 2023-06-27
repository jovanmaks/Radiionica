<template>
    <base-layout page-title="" page-default-back-link="/admin">
        <template v-slot:content>
            <TaskCardComponent
              v-for="note in notes"
              :key="note.id"
              :note="note"
              :computeCardColor="computeCardColor"
              @archive-note="archiveNote"
              @set-open="setOpen"
              @set-open-edit="setOpenEdit"
            />
        </template>
    </base-layout>
</template>

<script lang="ts">
import { ref , onMounted, computed } from 'vue';
import { useStore } from 'vuex';
import TaskCardComponent from '@/components/reusable/TaskCardComponent.vue';

export default {
    components: {
        TaskCardComponent,
    },
    setup() {
        const store = useStore();

        const notes = computed(() => store.state.tasks.notes);

        onMounted(() => {
            store.dispatch('tasks/fetchNotes');
        });

        const archiveNote = (noteId) => {
          store.dispatch('tasks/archiveNote', noteId);
        };

        const setOpen = (note) => {
          // This function is probably related to local component state and doesn't need to be moved to the store
        };

        const setOpenEdit = (note) => {
          // This function is probably related to local component state and doesn't need to be moved to the store
        };

        const computeCardColor = (note) => {
          // This function is probably related to local component state and doesn't need to be moved to the store
        };

        return { notes, archiveNote, setOpen, setOpenEdit, computeCardColor }
    }
}
</script>

<style lang="scss" scoped></style>



