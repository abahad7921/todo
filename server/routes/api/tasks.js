const express = require('express')
const mongodb = require('mongodb')

const router = express.Router()

//GET
router.get('/', async (req,res) => {
    const tasks = await loadTaskCollection()
    res.send(await tasks.find({}).toArray())
})

//POST
//{id: 1,name:"temp 1", completionDate:"12-01-2023",description:"xcvervebrtbgbbrtgbrtgb"},
router.post('/', async (req,res) => {
    const tasks = await loadTaskCollection()
    await tasks.insertOne({
        name: req.body.name,
        status: "incomplete",
        creationDate: new Date(),
        completionDate: req.body.completionDate,
        description: req.body.description
    })

    res.status(201).send()
})


//DELETE

router.delete('/:id',async  (req,res) => {
    const tasks = await loadTaskCollection()
    await tasks.deleteOne({_id: new mongodb.ObjectId(req.params.id)})
    res.status(200).send()
})

async function loadTaskCollection(){
    const client = await mongodb.MongoClient.connect
    ('mongodb+srv://abahad7921:8utnlFEOKtYPGran@cluster0.tlzzcj5.mongodb.net/?retryWrites=true&w=majority', {
     useNewUrlParser: true
    })
 
    return client.db('todo-vue').collection('tasks')
 }
module.exports = router