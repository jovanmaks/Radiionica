<template>
  <ion-action-sheet :is-open="show" header="Приоритети" :buttons="actionSheetButtonsRef"
    @didDismiss="didDismiss"></ion-action-sheet>
</template>

<script>
import { IonActionSheet } from '@ionic/vue';
import { ref, watch } from 'vue';

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
    const actionSheetButtonsRef = ref([]);

    watch(() => props.show, (newVal) => {
      if (newVal) {
        actionSheetButtonsRef.value = actionSheetButtons();
      }
    })

    const didDismiss = () => {
      emit('didDismiss');
    };

    const actionSheetButtons = () => [
      // buttons definitions as before...
    ];

    return {
      actionSheetButtonsRef,
      didDismiss
    }
  }
};
</script>
