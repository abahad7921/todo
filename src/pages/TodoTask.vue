<template>
    <v-sheet class="mx-auto">
        <v-container class="container">
            <v-form ref="form" class="pa-10">
                <v-row>
                    <v-col cols="12" sm="12" lg="12" md="12" xsm="12">
                        <v-text-field label="Title" v-model="name" :rules="nameRules">
                        </v-text-field></v-col>
                    <v-col cols="12" sm="12" lg="12" md="12" xsm="12">
                        <v-text-field type="date" v-model="date" label="Expected completion date" :rules="dateRules">
                        </v-text-field></v-col>
                    <v-col cols="12" sm="12" lg="12" md="12" xsm="12">
                        <v-textarea v-model="desc" label="Description" :rules="descRules">
                        </v-textarea></v-col>
                    <v-col cols="12" sm="12" lg="12" md="12" xsm="12">
                        <v-btn type="submit" @click="validate" color="success">Create</v-btn>
                    </v-col>
                </v-row>
            </v-form>
        </v-container>
    </v-sheet>
</template>

<script>
export default {
    name: 'TodoTask',
    data() {
        return {
            valid: false,
            name: '',
            date: '',
            desc: '',
            nameRules: [
                value => {
                    if (value)
                        return true

                    return "name cant be blank"
                }
            ],
            descRules: [
                value => {
                    if (value)
                        return true

                    return "description can not be left blank"
                },
                value => {
                    if (value.length < 50)
                        return "please write valid description"

                    return true
                }
            ],
            dateRules: [
                value => {
                    if (value)
                        return true

                    return "please select the date of completion for task"
                }
            ]
        }
    },
    methods: {
        async validate() {
            console.log("inside the validate method")

            const ans = await this.$refs.form.validate()
            console.log(ans.valid)

            if (ans.valid) {
                this.$store.dispatch('addTodoMutation',
                    {
                        name: this.name,
                        completionDate: this.date,
                        description: this.desc
                    })
            }
        }
    }
}
</script>

<style>
.container{
    display: flex;
    justify-content: center;
}
</style>