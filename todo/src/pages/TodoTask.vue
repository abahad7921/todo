<template>
    <v-sheet width="500" class="mx-auto">
        <v-form ref="form" class="pa-10">
            <v-text-field label="Title" v-model="name" :rules="nameRules"></v-text-field>
            <v-text-field type="date" v-model="date" label="Expected completion date" :rules="dateRules"></v-text-field>
            <v-textarea v-model="desc" label="Description" :rules="descRules"></v-textarea>
            <v-btn type="submit" @click="validate" color="success">Create</v-btn>
        </v-form>
    </v-sheet>
</template>

<script>
export default {
    name: 'TodoTask',
    data(){
        return {
            valid: false,
            name: '',
            date: '',
            desc: '',
            nameRules : [
                value => {
                    if(value)
                        return true

                    return "name cant be blank"
                }
            ],
            descRules : [
                value => {
                    if(value)
                        return true

                    return "description can not be left blank"
                },
                value => {
                    if(value.length < 50)
                        return "please write valid description"

                    return true
                }
            ],
            dateRules : [
                value => {
                    if(value)
                        return true

                    return "please select the date of completion for task"
                }
            ]
        }
    },
    methods: {
        async validate(){
            console.log("inside the validate method")

            const ans = await this.$refs.form.validate()
            console.log(ans.valid)

            if(ans.valid){
                this.$store.dispatch('addTodoMutation',{name: this.name,completionDate: this.date, descriptionL: this.desc})
            }
        }
    }
}
</script>