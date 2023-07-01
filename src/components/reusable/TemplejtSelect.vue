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
import { ref } from 'vue';

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
    },
    setup(props, { emit }) {
        const actionSheetButtonsRef = ref([{
            text: 'Cancel',
            role: 'cancel',
            data: {
                action: 'cancel',
            },
        }]);

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
