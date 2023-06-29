<template>
    <v-sheet width="500" class="mx-auto">
        <v-form class="pa-10">
            <v-text-field label="First name"></v-text-field>
            <v-text-field type="date" label="Expected completion date"></v-text-field>
            <v-textarea label="Description"></v-textarea>
            <v-btn color="success">Create</v-btn>
        </v-form>
    </v-sheet>
</template>

<script>
export default {
    name: 'TodoTask'
}
</script>