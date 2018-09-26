const express = require('express');
const router = express.Router();
const db = require('../data/helpers/notesDb');

router.get('/', (req,res) => {
        const request = db.get();

        request.then(response => {
        res.status(200).json(response);
        })

        .catch(error => {
        res.status(500).json({error: "Failed to retrieve notes"});
        })
});

router.get('/:id', (req,res)=>{
        const id = req.params.id;

        const request = db.getById(id);

        request.then(response => {
        console.log(response);
        let response1 = response[0];

        if(response1.length==0) {
                res.status(404).json({ error: "The note with the specified Id does not exist." });
        }
        else {
                console.log(response1);
                res.status(200).json(response1);
        }
        })

        .catch(error => {
        res.status(500).json({error: "Failed to retrieve the note."});
        })
});

router.get('/search/:search', (req, res) => {
        const search = req.params.search;
        console.log(search);
        const request = db.getByTitle(search);

        request.then(response => {
        console.log(response);

        if(response.length==0) {
                res.status(404).json({ error: "Notes with the specified search words do not exist." });
        }
        else {
                console.log(response);
                res.status(200).json(response);
        }
        })

        .catch(error => {
        res.status(500).json({error: "Failed to retrieve the notes."});
        })


});

router.post('/', (req,res)=> {
        const title = req.body.title;
        const content = req.body.content;

         console.log(title);
        const note = {title, content};

        if(!title || !content){
                res.status(400).json({error: "Failed to save note to the database. Please provide title and content for the note."});
        }

else{

        const request = db.insert(note);

        request.then(response => {
                res.status(201).json(response);
        })

        .catch(error => {
        res.status(500).json({error: "Failed to save note to the database" });
        })

        }
});

router.put('/:id', (req, res) => {
        const id = req.params.id;

        const title = req.body.title;
        const content = req.body.content;

        console.log(id);
        console.log(req.body);

        if(!title || !content){
        res.status(400).json({error: "Failed to update note to the database. Please provide title and content for the note."});
        }

        else{
        const note = {title, content};

        const request= db.update(id, note);

        request.then(response => {
        response = note;

        res.status(200).json(response);
        })

        .catch(error => {
        res.status(500).json({error: "Failed to update the note"});
        })

        }
});


router.delete('/:id', (req, res) => {
        const {id} = req.params;

        const request = db.remove(id);

        request.then(response => {
        res.status(200).json(response);
        })

        .catch(error => {
        res.status(500).json({error: "Failed to delete note"});
        })

});

module.exports = router;