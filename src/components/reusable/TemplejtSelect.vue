<template>
    <ion-action-sheet 
        :is-open="show" 
        header="" 
        :buttons="actionSheetButtonsRef" 
        @didDismiss="didDismiss">
    </ion-action-sheet>
</template>

<script>
import { IonActionSheet } from '@ionic/vue';
import { ref, computed } from 'vue';


export default {
    name: 'TemplejtSelect',
    components: {
        IonActionSheet
    },
    props: {
        show: {
            type: Boolean,
            required: true
        },
        templejtValues: {
            type: Array,
            required: true
        },
    },
    setup(props, { emit }) {
        const actionSheetButtonsRef = computed(() => [
            ...props.templejtValues.map(value => ({ text: value, data: { action: value } })),
            {
              text: 'Cancel',
              role: 'cancel',
              data: {
                action: 'cancel',
              },
            },
        ]);

        const didDismiss = () => {
            emit('didDismiss');
        };

        return {
            actionSheetButtonsRef,
            didDismiss
        }
    }
};
</script>
