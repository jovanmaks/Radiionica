<template>
    <div class="input-button-container">
        <!-- Textual Input Fields -->
        <ion-item>
            <ion-input :value="modelValue.deklaracija" @input="$emit('update:modelValue', {...modelValue, deklaracija: $event.target.value})" placeholder="Naziv"></ion-input>
        </ion-item>

        <ion-grid>
            <ion-row>
                <ion-col>
                    <ion-item>
                        <ion-input :value="modelValue.localText_1_label" @input="$emit('update:modelValue', {...modelValue, localText_1_label: $event.target.value})" placeholder="Ime"></ion-input>
                    </ion-item>
                    <ion-item>
                        <ion-input :value="modelValue.localText_2_label" @input="$emit('update:modelValue', {...modelValue, localText_2_label: $event.target.value})" placeholder="Ime"></ion-input>
                    </ion-item>
                    <ion-item>
                        <ion-input :value="modelValue.localNum_1_label" @input="$emit('update:modelValue', {...modelValue, localNum_1_label: $event.target.value})" placeholder="Ime"></ion-input>
                    </ion-item>
                    <ion-item>
                        <ion-input :value="modelValue.localNum_2_label" @input="$emit('update:modelValue', {...modelValue, localNum_2_label: $event.target.value})" placeholder="Ime"></ion-input>
                    </ion-item>
                    <ion-item>
                        <ion-input :value="modelValue.localKolicina" @input="$emit('update:modelValue', {...modelValue, localKolicina: parseFloat($event.target.value)})" type="number" placeholder="Kolicina"></ion-input>
                    </ion-item>
                    <ion-item>
                        <ion-input :value="modelValue.localSwitch_1_label" @input="$emit('update:modelValue', {...modelValue, localSwitch_1_label: $event.target.value})" placeholder="Overa"></ion-input>
                        <ion-toggle :value="modelValue.localSwitch_1" @input="$emit('update:modelValue', {...modelValue, localSwitch_1: $event.target.value})"></ion-toggle>
                    </ion-item>
                </ion-col>
                <ion-col>
                    <ion-item>
                        <ion-input :value="modelValue.localText_1" @input="$emit('update:modelValue', {...modelValue, localText_1: $event.target.value})" placeholder="Sadrzaj"></ion-input>
                    </ion-item>
                    <ion-item>
                        <ion-input :value="modelValue.localText_2" @input="$emit('update:modelValue', {...modelValue, localText_2: $event.target.value})" placeholder="Sadrzaj"></ion-input>
                    </ion-item>
                    <ion-item>
                        <ion-input :value="modelValue.localNum_1" @input="$emit('update:modelValue', {...modelValue, localNum_1: parseFloat($event.target.value)})" type="number" placeholder="Broj"></ion-input>
                    </ion-item>
                    <ion-item>
                        <ion-input :value="modelValue.localNum_2" @input="$emit('update:modelValue', {...modelValue, localNum_2: parseFloat($event.target.value)})" type="number" placeholder="Broj"></ion-input>
                    </ion-item>
                    <ion-item>
                        <ion-input :value="modelValue.localKolicina_notifikacija" @input="$emit('update:modelValue', {...modelValue, localKolicina_notifikacija: parseFloat($event.target.value)})" type="number" placeholder="Alarm na"></ion-input>
                        <ion-toggle :value="modelValue.localKolicina_isNotified" @input="$emit('update:modelValue', {...modelValue, localKolicina_isNotified: $event.target.value})"></ion-toggle>
                    </ion-item>
                    <ion-item>
                        <ion-input :value="modelValue.localSwitch_2_label" @input="$emit('update:modelValue', {...modelValue, localSwitch_2_label: $event.target.value})" placeholder="Overa"></ion-input>
                        <ion-toggle :value="modelValue.localSwitch_2" @input="$emit('update:modelValue', {...modelValue, localSwitch_2: $event.target.value})"></ion-toggle>
                    </ion-item>
                </ion-col>
            </ion-row>
        </ion-grid>

        <ion-item>
            <ion-input :value="modelValue.localCena" @input="$emit('update:modelValue', {...modelValue, localCena: parseFloat($event.target.value)})" type="number" placeholder="Cena"></ion-input>
        </ion-item>

        <ion-item>
            <ion-datetime :value="modelValue.localDatetimeInput" @input="$emit('update:modelValue', {...modelValue, localDatetimeInput: $event.target.value})" placeholder="Select Date"></ion-datetime>
        </ion-item>
        <ion-item>
            <ion-toggle :value="modelValue.localDatetime_isNotified" @input="$emit('update:modelValue', {...modelValue, localDatetime_isNotified: $event.target.value})">Notifikacija</ion-toggle>
        </ion-item>

        <ion-button expand="full" @click="$emit('save')">Sacuvaj templejt</ion-button>
      
    </div>
</template>

<script>
export default {
    props: {
        modelValue: {
            type: Object,
            required: true
        }
    },
};
</script>

<style scoped>
.input-button-container {
    max-width: 500px;
    margin: 0 auto;
    padding: 1em;
}

ion-item {
    --padding-start: 0;
    --inner-padding-end: 0;
    --inner-padding-start: 0;
    --padding-end: 0;
}

ion-button {
    margin-top: 1em;
}
</style>


  