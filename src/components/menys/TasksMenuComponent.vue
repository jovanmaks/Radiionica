    <template>
        <ion-menu content-id="main-content" menu-id="sideMenu-task" side="start">
            <ion-header>
                <ion-toolbar>
                    <ion-segment :scrollable="true" value="all">
                        <ion-segment-button value="person" @click="setSortType('person')" size="small">
                            <ion-icon :icon="person" size="small"></ion-icon>
                        </ion-segment-button>
                        <ion-segment-button value="time" @click="setSortType('time')" size="small">
                            <ion-icon :icon="time" size="small"></ion-icon>
                        </ion-segment-button>
                        <ion-segment-button value="levelOne" @click="setSortType('levelOne')" size="small">
                            <ion-icon :icon="alertCircle" size="small" color="danger"></ion-icon>
                        </ion-segment-button>
                        <ion-segment-button value="levelTwo" @click="setSortType('levelTwo')" size="small">
                            <ion-icon :icon="alertCircle" size="small" color="warning"></ion-icon>
                        </ion-segment-button>
                        <ion-segment-button value="levelThree" @click="setSortType('levelThree')" size="small">
                            <ion-icon :icon="alertCircle" size="small" color="success"></ion-icon>
                        </ion-segment-button>
                    </ion-segment>
                    <!-- <ion-title>Menu Content</ion-title> -->
                    <ion-buttons slot="end" fill="clear">
                        <ion-button @click="showArchivedNotes" size="large" fill="clear">
                            <ion-icon :icon="archiveOutline"></ion-icon>
                        </ion-button>
                        <ion-button @click="showUnarchivedNotes" size="large" fill="clear">
                            <ion-icon :icon="documentAttachOutline"></ion-icon>
                        </ion-button>
                    </ion-buttons>
                </ion-toolbar>
            </ion-header>


            <ion-footer>
                <ion-toolbar>
                    <ion-grid>
                        <ion-row>
                            <ion-col style="display: flex; justify-content: center; align-items: center;">
                                <ion-button @click="openAddNoteModal" size="small" expand="full">
                                    <ion-icon :icon="add"></ion-icon>
                                </ion-button>
                            </ion-col>
                        </ion-row>
                    </ion-grid>
                </ion-toolbar>
            </ion-footer>

            <ion-content class="ion-padding">

                <TaskCardComponent v-for="note in displayNotes" :key="note.id" :note="note" :computeCardColor="computeCardColor"
                    @archive-note="archiveNote" @delete-note="deleteNote" @alert-clicked="showPriorityControl"
                    @return-note="returnNote" />


                <priority-control :note="selectedNote" :show="showPriority" @update-priority="updateNotePriority"
                    @didDismiss="hidePriorityControl"></priority-control>

                <!-- <AddNoteModalComponent :isOpen.sync="isOpenRef" :newNote.sync="newNote" :user="user" /> -->
                <!-- <AddNoteModalComponent :isOpen.sync="isOpen" :newNote.sync="newNote" :user="user" /> -->
                <!-- <AddNoteModalComponent v-model:isOpen="isOpen" v-model:newNote="newNote" :user="user" /> -->
                
                
                <AddNoteModalComponent v-model:isOpen="isOpen" />


            </ion-content>
        </ion-menu>
    </template>
        
    <script lang="ts">
    import { useStore } from 'vuex';
    import { defineComponent } from 'vue';
    import { ref, onMounted, computed } from 'vue';

    import TaskCardComponent from '@/components/reusable/TaskCardComponent.vue';
    import PriorityControl from '@/components/reusable/PriorityControl.vue';
    import AddNoteModalComponent from '@/components/reusable/AddNoteModalComponent.vue';


    import {
        IonButton,
        IonContent,
        IonHeader,
        IonMenu,
        IonToolbar,
        IonSegment,
        IonSegmentButton,
        IonFooter,
        IonGrid,
        IonRow,
        IonCol,
    } from '@ionic/vue';
    import {
        documentText, archiveOutline, add,
        documentAttachOutline, person, time, alertCircle
    } from 'ionicons/icons';


    export default defineComponent({
        components: {
            TaskCardComponent,
            PriorityControl,
            AddNoteModalComponent,

            IonSegment,
            IonSegmentButton,
            IonButton,
            IonContent,
            IonHeader,
            IonFooter,
            IonGrid,
            IonRow,
            IonCol,
            IonMenu,
            IonToolbar,
        },
        setup() {
            const store = useStore();
            const selectedNote = ref(null);
            const showPriority = ref(false);
            const notes = computed(() => store.state.notes.notes);
            const archivedNotes = computed(() => store.getters['notes/archivedNotes']);
            const unarchivedNotes = computed(() => store.getters['notes/unarchivedNotes']);
            const sortType = ref('')


            const isOpen = ref(false);


            interface Note {
                homescreen: string;
                kreator: string;
                id: number;
                isHomescreenArchived: boolean;
                levelOne: boolean;
                levelTwo: boolean;
                levelThree: boolean;
                // Add other note properties here
            }

            const displayArchivedNotes = ref(false);

            const displayNotes = computed(() => {
                let notesToDisplay = displayArchivedNotes.value ? archivedNotes.value : unarchivedNotes.value;
                switch (sortType.value) {
                    case 'person':
                        notesToDisplay.sort((a: Note, b: Note) => a.kreator.localeCompare(b.kreator));
                        break;
                    case 'time':
                        notesToDisplay.sort((a: Note, b: Note) => a.id - b.id);
                        break;
                    case 'levelOne':
                        notesToDisplay = notesToDisplay.filter((note: Note) => note.levelOne);
                        break;
                    case 'levelTwo':
                        notesToDisplay = notesToDisplay.filter((note: Note) => note.levelTwo);
                        break;
                    case 'levelThree':
                        notesToDisplay = notesToDisplay.filter((note: Note) => note.levelThree);
                        break;
                    default:
                        break;
                }
                return notesToDisplay;
            });

            const openAddNoteModal = () => {
                isOpen.value = true;
            }

            const setSortType = (type: string) => {
                sortType.value = type;
            };

            onMounted(async () => {
                await store.dispatch('notes/fetchNotes');
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

            const deleteNote = (noteId: string | number) => {
                store.dispatch('notes/deleteNote', noteId);
            };

            const showArchivedNotes = () => {
                displayArchivedNotes.value = true;
            };

            const showUnarchivedNotes = () => {
                displayArchivedNotes.value = false;
            };

            const returnNote = (noteId: string | number) => {
                store.dispatch('notes/returnNote', noteId);
                console.log('returnNote');
            };



            return {
                documentText, notes, archiveNote, computeCardColor, deleteNote,
                selectedNote, showPriority, showPriorityControl, hidePriorityControl,
                showArchivedNotes, showUnarchivedNotes, archivedNotes,
                unarchivedNotes, displayNotes,
                archiveOutline, documentAttachOutline, returnNote, person, time, alertCircle,
                setSortType, add,   isOpen,  openAddNoteModal,
            }
        }
    });
    </script>
    <!-- 
    <style scoped>
    .button-container {
        display: flex;
        flex-direction: column;
        align-items: flex-end;
    }
    </style> -->

