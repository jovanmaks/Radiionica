<template>
    <base-layout page-title="" page-default-back-link="/admin">
        <template v-slot:content>

            <TaskCardComponent v-for="note in notes" :key="note.id" :note="note" :computeCardColor="computeCardColor"
                @archive-note="archiveNote" @alert-clicked="showPriorityControl" />

            <priority-control :note="selectedNote" :show="showPriority" @update-priority="updateNotePriority"
                @didDismiss="hidePriorityControl"></priority-control>

        </template>
    </base-layout>
</template>

<script lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useStore } from 'vuex';
import TaskCardComponent from '@/components/reusable/TaskCardComponent.vue';
import PriorityControl from '@/components/reusable/PriorityControl.vue';

export default {
    components: {
        TaskCardComponent,
        PriorityControl,
    },
    setup() {
        const store = useStore();
        const selectedNote = ref(null);
        const showPriority = ref(false);

        const notes = computed(() => store.state.notes.notes);

        onMounted(() => {
            store.dispatch('notes/fetchNotes');
        });

        const archiveNote = (noteId: string | number) => {
            store.dispatch('notes/archiveNote', noteId);
        };

        const computeCardColor = (note: { levelOne: boolean; levelTwo: boolean; levelThree: boolean; }) => {
            if (note.levelOne) return 'danger';
            if (note.levelTwo) return 'warning';
            if (note.levelThree) return 'success';
            return '';
        };

        const showPriorityControl = (note: any) => {
            selectedNote.value = note;
            showPriority.value = true;

            console.log('trigger');
        };

        const hidePriorityControl = () => {
            showPriority.value = false;
        };


        return { notes, archiveNote, computeCardColor, selectedNote, showPriority, showPriorityControl, hidePriorityControl }
    }
}
</script>

<style lang="scss" scoped></style>



