const express = require('express')
const mongodb = require('mongodb')

const router = express.Router()

router.get('/', async (req,res) => {
    const tasks = await loadTaskCollection()
    res.send(await tasks.find({}).toArray())
})

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

router.put('/:id', async (req,res) => {
    const {id} = req.params
    const {name, status, completionDate, description} = req.body

    try{
        const tasks = await loadTaskCollection()
        const result = await tasks.updateOne(
            {_id: new mongodb.ObjectId(id)},
            {$set: {name,status,completionDate,description}}
        )

        if (result.matchedCount === 0) {
            res.status(404).json({ error: 'Document not found' });
          } else {
            res.json({ message: 'Document updated successfully' });
          }
    }catch(error){
        res.status(500).json({error: 'error updating the task'})
    }
})

router.delete('/:id',async  (req,res) => {
    const tasks = await loadTaskCollection()
    await tasks.deleteOne({_id: new mongodb.ObjectId(req.params.id)})
    res.status(200).send()
})

async function loadTaskCollection(){
    const client = await mongodb.MongoClient.connect
    (process.env.Mongo_URL, {
     useNewUrlParser: true
    })
 
    return client.db('todo-vue').collection('tasks')
 }
module.exports = router