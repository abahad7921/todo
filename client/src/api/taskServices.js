import axios from 'axios'

export async function getTasks(){
    const tasks = await axios.get('http://localhost:5000/api/tasks')
    return tasks.data
}

export async function updateTask(task,id){

    const response = await axios.put(`http://localhost:5000/api/tasks/${id}`, task,{
        headers:'Application/json'
    }).catch(error => console.warn(error))

    return response
}

export async function createTask(task){

    const response = await axios.post('http://localhost:5000/api/tasks', task , {
        headers: 'Application/json'
    }).catch(error => console.warn(error))

    return response
}