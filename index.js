// implement your API here
const express = require('express')
const Users = require('./data/db.js')
const server = express();

server.use(express.json());

// server.post('/api/users' , (req, res) => {
//     const userInfo = req.body;
//     !userInfo.name || !userInfo.bio
//     ? res.status(400).json({errorMessage: "Please provide name and bio for the user."})
//     :
//     Users.add(userInfo)
//         .then(user => {
//             res.status(201).json(user);
//         })
//         .catch(err => {
//             res.status(500).json({message: 'error adding user'})
//         })
// })

// POST /api/users
server.post("/api/users", (req, res) => {
    const { name, bio } = req.body;
    if (!name || !bio) {
        res.status(400).json({ message: "Please provide name and bio." });
    } else {
    Users.insert(req.body)
        .then(user => {
        res.status(201).json(user);
        })
        .catch(() => {
        res.status(500).json({
            message: "There was an error while saving the user."
        });
        });
    }
});
// Get ALL users
server.get('/api/users', (req, res) => {
    Users.find()
        .then(user => {
            res.status(200).json(user)
        })
        .catch( err => {
            res.status(500).json({ error: "The users information could not be retrieved." })
        })
})

// Get Users by ID
server.get('/api/users/:id', (req, res) => {
    const id = req.params.id;
    Users.findById(id)
        .then(user => {
            if(user.length === 0){
                res.status(404).json({ message: "The user with the specified ID does not exist." })
            } else {
                res.status(200).json(user)
            }
        })
        .catch(err => {
            res.status(500).json({ error: "The users information could not be retrieved." })
        })
})


// DELETE Users by ID
server.delete('/api/users/:id', (req, res)=>{
    const id = req.params.id;
    
    Users.remove(id)
        .then(user => {
            if(user) {
                res.status(200).json({message: `User with id: ${id} was deleted`})
            } else {
                res.status(404).json({ message: "The user with the specified ID does not exist." })
            }
        })
        .catch( err => {
            res.status(500).json({error: "The user could not be removed"})
        })
})

// PUT or update, by ID
server.put('/api/users/:id', (req, res) => {
    const id = req.params.id;
    const changes = req.body;
    if (!id || !changes) {
    res
        .status(400)
        .json({ errorMessage: 'Please provide name and bio for the user.' });
    } else {
    Users.update(id, changes)
        .then(user => {
        if (user) {
            res.status(200).json(user);
        } else {
            res
            .status(404)
            .json({
                message: 'The user with the specified ID does not exist.',
            });
        }
        })
        .catch(() => {
        res.status(500).json({
            errorMessage: 'The user information could not be modified.',
        });
        });
    }
});

const port = 5000;
server.listen(port, () => console.log('\napi runnning\n'));