<template>
    <base-layout page-title="Пројекти" page-default-back-link="/tabs">
        <template v-slot:content>
            <ion-content class="content">

                <ion-refresher slot="fixed" @ionRefresh="loadData">
                    <ion-refresher-content></ion-refresher-content>
                </ion-refresher>

                <!--  Kartice-->
                <div v-for="(item, index) in combinedData" :key="index">
                    <ion-card :color="computeCardColor(item)">
                        <!-- <ion-card :color="computeCardColor()(item)"> -->

                        <ion-card-header>
                            <ion-card-title>Пројекат: {{ item.ime_projekta }}</ion-card-title>
                            <ion-card-subtitle>Инвеститор: {{ item.investitor }}</ion-card-subtitle>
                            <ion-card-subtitle>Локација: {{ item.lokacija }}</ion-card-subtitle>
                            <ion-card-subtitle>Предаја: {{ item.rok_predaja }}</ion-card-subtitle>
                            <!-- <ion-card-subtitle v-if="isSpecialUser">Цијена: {{ item.cijena_projekta }}</ion-card-subtitle> -->
                            <ion-card-subtitle> Cena: {{ item.cijena_projekta }}</ion-card-subtitle>
                        </ion-card-header>
                    </ion-card>
                </div>

            </ion-content>
        </template>
    </base-layout>
</template>
  
<script lang="js">

import { trash, share, cube, home, heart, pin, analytics, build, chatbubble, people, alertCircle, close, checkmark } from "ionicons/icons";
import { ref, computed, nextTick, onMounted, watch } from 'vue';
import { supabase } from '@/supabase';
import { useRoute } from "vue-router";


setup() {

    const data = ref([]);
    const sendata = ref([]);
    const combinedData = ref([]);

    const modalRef = ref(null);
    const inputRef = ref(null);

    const allUsers = ref([]);
    const selectedUserIDs = ref([]);
    const currentUserID = ref(null);
    const currentUserEmail = ref(null);
    const selectedImeProjekta = ref(null);

    const isOpenRef = ref(false);
    const isOpenPrioriteti = ref(false);
    const isOpenRefSaradnici = ref(false);
    const isOpenRefBiljeske = ref(false);

    const actionSheetButtonsRef = ref([]);
    // const usernew = ref(supabase.auth.getUser())
    const usernew = ref(null);
    // const userEmail = ref(supabase.auth.getUser()?.email);
    const userEmail = ref(supabase.auth.getUser());

    const setOpenPrioriteti = (state, item = null) => {
        console.log('setOpen', state, item);
        actionSheetButtonsRef.value = actionSheetButtons(item);
        isOpenPrioriteti.value = state;
    };

    const route = useRoute();
    const newNote = ref('');
    const allowedUsers = ref(["jovanmaks92@gmail.com"]);
    const projekti = ref([]);


    const updateNotePriority = async (itemId, levelOne, levelTwo, levelThree) => {
        const { data, error } = await supabase
            .from('Projekti')
            .update({
                levelOne: levelOne,
                levelTwo: levelTwo,
                levelThree: levelThree
            })
            .eq('id', itemId);

        if (error) {
            console.error(error);
        } else {
            console.log(`Note ${itemId} priority updated successfully`);
            const item = projekti.value.find(n => n.id === itemId);
            if (item) {
                item.levelOne = levelOne;
                item.levelTwo = levelTwo;
                item.levelThree = levelThree;
            }
            await loadData();  // Reload the data here
        }
    };

    const isSpecialUser = computed(() => {
        return currentUserEmail.value === 'jovanmaks92@gmail.com'
    });

    // const isSuperUser = 

    const isUserAllowed = (currentUserEmail) => {
        console.log('userEmail', userEmail);
        console.log('evo ga email', currentUserEmail.value);
        console.log('evo ga id', currentUserID.value);
        return allowedUsers.value.includes(currentUserEmail);
    };

    const setOpen = (state) => { isOpenRef.value = state; };
    const setOpenSaradnici = (state) => { isOpenRefSaradnici.value = state; };
    const setOpenBiljeske = (state) => { isOpenRefBiljeske.value = state; };


    const shareClicked = (ime_projekta) => {
        selectedImeProjekta.value = ime_projekta;
        setOpen(true);
    };

    const saradniciClicked = (ime_projekta) => {
        selectedImeProjekta.value = ime_projekta;
        setOpenSaradnici(true);
    };

    const biljeskeClicked = (ime_projekta) => {
        selectedImeProjekta.value = ime_projekta;

        console.log(`selectedImeProjekta.value is ${selectedImeProjekta.value}`);
        console.log('data.value is', data.value);
        console.log('currentProjectNotes.value is', currentProjectNotes.value);

        setOpenBiljeske(true);
    };

    const loadData = async (event = null) => {
        try {
            const { data: fetchedData, error } = await supabase
                .from('Projekti')
                .select('*');

            if (error) {
                throw error;
            }

            data.value = fetchedData;
            // combineDatasets();

        } catch (error) {
            console.error('Error loading data:', error);
        } finally {
            if (event) {
                event.target.complete();
            }
        }
    };


    const loadSensitive = async (event = null) => {
        try {
            const { data: fetchedData, error } = await supabase
                .from('sensitiveData')
                .select('*');

            if (error) {
                throw error;
            }

            sendata.value = fetchedData;

        } catch (error) {
            console.error('Error loading sensitive data:', error);
            sendata.value = [];  // Set to empty when an error occurs
        } finally {
            if (event) {
                event.target.complete();
            }
        }
    };


    const combineDatasets = () => {
        combinedData.value = data.value.map(item => {
            const sensitiveItem = sendata.value.find(sItem => sItem.projekti_id === item.id);
            return {
                ...item,
                cijena_projekta: sensitiveItem ? sensitiveItem.cijena_projekta : null
            }
        });
    };

    const fetchNotes = async () => {
        const { data, error } = await supabase
            .from('Projekti')
            .select('id, levelOne, levelTwo, levelThree')
        // .order('id');

        if (error) {
            console.error(error);
            return;
        }
        projekti.value = data;
        // isDataLoaded.value = true;
        console.log(data);
    };


    onMounted(async () => {

        usernew.value = supabase.auth.getUser()
        console.log('evo ga usernew za projekte', usernew.value);

        try {
            const { data: users, error } = await supabase
                .from('profiles')
                .select('*')

            if (error) throw error;

            allUsers.value = users.map(user => ({ ...user, selected: false }));

            fetchNotes();


            await Promise.all([loadData(), loadSensitive()]);
            combineDatasets();
            console.log('ajdeeeee', combinedData.value);
        } catch (error) {
            console.log('Error: ', error)
        }
    });


    watch(
        () => route.fullPath,
        async () => {
            usernew.value = supabase.auth.getUser();
            const { data, error } = await supabase.from("sensitiveData").select("*");
            if (error) {
                console.error("Error fetching notes:", error);
            } else {
                sendata.value = data;
                // noteCount.value = data.length;
            }

            console.log("sa mounteda", usernew.value);
        }
    );

    const fetchUsers = async () => {
        const { data: users, error } = await supabase
            .from('profiles')
            .select('*')
        // .neq('id', currentUserID)

        allUsers.value = users;

        if (error) console.log('Error: ', error)
        else {
            allUsers.value = users;
        }
    };


    const confirmChanges = async (ime_projekta) => {

        ime_projekta = selectedImeProjekta.value;

        try {
            // Fetch the project from the database
            const { data: project, error } = await supabase
                .from('Projekti')
                .select('saradnici')
                .eq('ime_projekta', ime_projekta);

            if (error) throw error;

            // If the project doesn't exist, there's nothing to do
            if (!project || project.length === 0) return;

            // Ensure saradnici field is an array
            if (!Array.isArray(project[0].saradnici)) project[0].saradnici = [];

            const existingIDs = project[0].saradnici;

            // Check for each selected ID
            for (const userID of selectedUserIDs.value) {
                // If the selected ID is not in the 'saradnici' field, add it
                if (!existingIDs.includes(userID)) {
                    existingIDs.push(userID);
                }
            }

            // Update the 'saradnici' field in the database
            const { error: updateError } = await supabase
                .from('Projekti')
                .update({ saradnici: existingIDs })
                .eq('ime_projekta', ime_projekta);

            if (updateError) throw updateError;

            console.log('selectedUserIDs.value in confirmChanges:', selectedUserIDs.value);
            // Clear the selected IDs
            selectedUserIDs.value = [];

        } catch (error) {
            console.error("Error updating saradnici:", error);
        }

        setOpen(false);
    };

    const confirmChangesBiljeska = async (ime_projekta) => {
        setOpenBiljeske(false);
    };

    const confirmChangesSaradnici = async (ime_projekta) => {
        setOpenBiljeske(false);
    };

    const toggleUser = (userId, isChecked) => {
        // console.log(`toggleUser called with userId=${userId} and isChecked=${isChecked}`);
        nextTick(() => {
            if (isChecked && !selectedUserIDs.value.includes(userId)) {
                selectedUserIDs.value.push(userId);
            } else if (!isChecked && selectedUserIDs.value.includes(userId)) {
                selectedUserIDs.value = selectedUserIDs.value.filter(id => id !== userId);
            }
        });
    };

    loadData();
    fetchUsers();

    const removeUserFromProject = async (userId) => {
        const currentProject = data.value.find(item => item.ime_projekta === selectedImeProjekta.value);
        if (!currentProject || !Array.isArray(currentProject.saradnici)) return;
        currentProject.saradnici = currentProject.saradnici.filter(id => id !== userId);

        try {
            const { error } = await supabase
                .from('Projekti')
                .update({ saradnici: currentProject.saradnici })
                .eq('ime_projekta', selectedImeProjekta.value);

            if (error) throw error;

            // Reload the data from the database
            await loadData();
        } catch (error) {
            console.error("Error updating saradnici:", error);
        }
    };

    const currentProjectNotes = computed(() => {
        // Find the current project in the data array
        const currentProject = data.value.find(item => item.ime_projekta === selectedImeProjekta.value);
        // If the project was not found or the biljeske field is not an array, return an empty array
        if (!currentProject || !Array.isArray(currentProject.biljeske)) return [];
        // Return the array of notes
        return currentProject.biljeske;
    });

    const currentProjectUsers = computed(() => {
        // Find the current project in the data array
        const currentProject = data.value.find(item => item.ime_projekta === selectedImeProjekta.value);
        // If the project was not found or the saradnici field is not an array, return an empty array
        if (!currentProject || !Array.isArray(currentProject.saradnici)) return [];
        // Return the array of users whose IDs are in the 'saradnici' field of the current project
        return allUsers.value.filter(user => currentProject.saradnici.includes(user.id));
    });



    const cancel = () => {
        IonModal.dismiss(null, "cancel", modalRef);
    };

    const confirm = () => {
        const name = inputRef.value.value;
        IonModal.dismiss(name, "confirm", modalRef);
    };

    return {
        data, loadData, removeItem, setOpenPrioriteti, close, checkmark,
        people, chatbubble, share, trash, alertCircle, actionSheetButtons, actionSheetButtonsRef,
        cancel, confirm, confirmChanges, confirmChangesBiljeska, confirmChangesSaradnici, addBiljeska,
        modalRef, inputRef, isOpenRef, isOpenRefSaradnici, isOpenRefBiljeske, isOpenPrioriteti,
        setOpen, setOpenSaradnici, setOpenBiljeske, computeCardColor,
        allUsers, currentProjectUsers, selectedUserIDs, currentUserID, currentUserEmail, selectedImeProjekta,
        toggleUser, shareClicked, saradniciClicked, biljeskeClicked,
        newNote, currentProjectNotes, removeNote, removeUserFromProject, usernew, userEmail, isSpecialUser, isUserAllowed, combinedData, sendata
    };
},
  };

</script>
  
  