<template>
    <v-sheet class="mx-auto">
        <v-container class="container">
            <v-form ref="form" class="pa-10">
                <v-row>
                    <v-col cols="12" sm="12" lg="12" md="12" xsm="12">
                        <v-text-field label="Title" v-model="name" :rules="nameRules" prepend-inner-icon="mdi-rename-box">
                        </v-text-field></v-col>
                    <v-col cols="12" sm="12" lg="12" md="12" xsm="12">
                        <v-text-field type="date" v-model="date" label="Expected completion date" :rules="dateRules"
                            prepend-inner-icon="mdi-calendar">
                        </v-text-field></v-col>
                    <v-col cols="12" sm="12" lg="12" md="12" xsm="12">
                        <v-textarea v-model="desc" label="Description" :rules="descRules"
                            prepend-inner-icon="mdi-grease-pencil">
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
import { createTask, getTasks,updateTask } from './../api/taskServices'
import { mapGetters } from 'vuex'
export default {
    name: 'TodoTask',
    props: ['id'],
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

                if (this.id != undefined) {
                    console.log("inside edit task method")
                    const task = this.$store.state.incompleteTasks[this.id]
                    console.log(task._id)
                    const newTask = {
                        name: this.name,
                        status: 'incomplete',
                        completionDate: this.date,
                        description: task.description
                    }
                    console.log(task, newTask)
                    // this.enabelLoadingWheel()
                    try {
                        const response = await updateTask(newTask, task._id)
                        console.log(response)

                        if (response.status === 200) {
                            const tasks = await getTasks()
                            const completedTasks = tasks.filter(task => task.status === 'complete')
                            const inCompleteTasks = tasks.filter(task => task.status === 'incomplete')

                            this.$store.commit('setIncompleteTasks', inCompleteTasks)
                            this.$store.commit('setCompleteTasks', completedTasks)
                        }
                    } catch (error) {
                        console.warn(error)
                    }
                }
                else {
                    console.log('inside else block')
                    const task = {
                        name: this.name,
                        completionDate: this.date,
                        description: this.desc
                    }
                    try {
                        const response = await createTask(task)

                        console.log(response)

                        if (response.status === 201) {
                            const tasks = await getTasks()

                            const completedTasks = tasks.filter(task => task.status === 'complete')
                            const inCompleteTasks = tasks.filter(task => task.status === 'incomplete')

                            this.$store.commit('setIncompleteTasks', inCompleteTasks)
                            this.$store.commit('setCompleteTasks', completedTasks)

                            this.$refs.form.reset()

                            console.log("completed")
                        }
                    }
                    catch (error) {
                        console.log(error)
                    }
                }
            }
        },
        setTask(id) {
            console.log(id)
            console.log(this.incompleteTasks)
            //get the task from the store
            const task = this.incompleteTasks[id]
            console.log(task)
            this.name = task.name
            const dateString = task.completionDate;
            const parts = dateString.split("-");
            const formattedDate = `${parts[2]}-${parts[1]}-${parts[0]}`;
            this.date = formattedDate
            this.desc = task.description
        }
    },
    computed: {
        ...mapGetters({
            incompleteTasks: 'incompleteTasks'
        })
    },
    created() {
        console.log(this.id)

        if (this.id != undefined) {
            this.setTask(this.id)
        }
    },
    watch: {
        id(newId) {
            this.setTask(newId)
        },
        date(newDate) {
            console.log(newDate)
        }
    }
}
</script>

<style>
.container {
    display: flex;
    justify-content: center;
}
</style>