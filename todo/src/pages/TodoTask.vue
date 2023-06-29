<template>
    <v-sheet width="500" class="mx-auto">
        <v-form>
            <v-text-field label="Title"></v-text-field>
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