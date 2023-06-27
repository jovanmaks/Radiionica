<template>
  <ion-action-sheet :is-open="show" header="Приоритети" :buttons="actionSheetButtonsRef"
    @didDismiss="didDismiss"></ion-action-sheet>
</template>

<script>
import { IonActionSheet } from '@ionic/vue';
import { ref, watch } from 'vue';
import { useStore } from 'vuex';

export default {
  name: 'PriorityControl',
  components: {
    IonActionSheet
  },
  props: {
    note: {
      type: Object,
      required: true
    },
    show: {
      type: Boolean,
      required: true
    },
  },
  setup(props, { emit }) {
    const store = useStore();
    const actionSheetButtonsRef = ref([]);

    watch(() => props.show, (newVal) => {
      if (newVal) {
        actionSheetButtonsRef.value = actionSheetButtons();
      }
    });

    const didDismiss = () => {
      emit('didDismiss');
    };

    const actionSheetButtons = () => [
      {
        text: 'Хитно',
        handler: () => {
          store.dispatch('notes/updateNotePriority', {
            noteId: props.note.id,
            levelOne: true,
            levelTwo: false,
            levelThree: false
          });
        },
      },
      {
        text: 'Важно',
        handler: () => {
          store.dispatch('notes/updateNotePriority', {
            noteId: props.note.id,
            levelOne: false,
            levelTwo: true,
            levelThree: false
          });
        },
      },
      {
        text: 'Регуларно',
        handler: () => {
          store.dispatch('notes/updateNotePriority', {
            noteId: props.note.id,
            levelOne: false,
            levelTwo: false,
            levelThree: true
          });
        },
      },
      {
        text: 'Откажи',
        role: 'cancel',
        data: {
          action: 'cancel',
        },
      },
    ];

    return {
      actionSheetButtonsRef,
      didDismiss
    }
  }
};
</script>
