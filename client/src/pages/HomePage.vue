<template>
    <v-sheet class="mx-auto">
        <v-container class="pa-10 mx-auto">
            <template v-if="showIncomplete">
                <tasks-list :todos="todos" :isComplete="false" @toggleLoadingWheel="toggleLoadingWheel">
                    <template #default>
                        Incomplete tasks
                    </template>
                </tasks-list>
            </template>

            <template v-if="showComplete">
                <tasks-list :todos="completedTasks" :isComplete="true" @toggleLoadingWheel="toggleLoadingWheel">
                    <template #default>
                        Completed tasks
                    </template>
                </tasks-list>
            </template>

            <template v-if="showBoth">
                <tasks-list :todos="todos" :isComplete="false" @toggleLoadingWheel="toggleLoadingWheel">
                    <template #default>
                        Incomplete tasks
                    </template>
                </tasks-list>

                <tasks-list :todos="completedTasks" :isComplete="true" @toggleLoadingWheel="toggleLoadingWheel">
                    <template #default>
                        Completed tasks
                    </template>
                </tasks-list>
            </template>
        </v-container>
        <div class="vld-parent">
            <loading  
                v-model:active="isLoading"
                :can-cancel="false"
                :on-cancel="onCancel"
                :is-full-page="fullPage"
                :loader="loader"></loading>
        </div>
    </v-sheet>
</template>

<script>
import Loading from 'vue-loading-overlay';
    import 'vue-loading-overlay/dist/css/index.css';
import TasksList from '../components/TasksList.vue'
import {mapGetters} from 'vuex'
export default {
    components: { TasksList,Loading},
    data() {
        return {
            showComplete: false,
            showIncomplete: false,
            showBoth: true,
            isLoading: false,
            fullPage: true,
            loader: 'dots'
        }
    },
    computed: {
        ...mapGetters({
            todos: 'incompleteTasks',
            completedTasks: 'completedTasks'
        })
    },
    methods: {
        setComponents(status) {
            if (status === 'incomplete') {
                this.showIncomplete = true
                this.showComplete = false
                this.showBoth = false
            }
            else if (status === 'complete') {
                this.showComplete = true
                this.showBoth = false
                this.showIncomplete = false
            }
            else
            {
                this.showBoth = true
                this.showIncomplete = false
                this.showComplete = false   
            }
        },
        toggleLoadingWheel(){
            console.log("inside toggle loading wheel method")
            this.isLoading = !this.isLoading
        }
    },
    created() {
        this.$watch(
            () => this.$route.query.status,
            (newStatus) => {
                this.setComponents(newStatus)
            }
        )
    }
}
</script>