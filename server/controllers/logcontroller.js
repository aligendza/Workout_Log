let express = require('express');
let router = express.Router();
let validateSession = require('../middleware/validate-session');
const Log = require('../db').import('../models/log');


/*  -------  PRACTICE ROUTE  ---------  */

router.get('/practice', validateSession, function(req, res)
{
    res.send('This is a practice route!')
});


/*  -------  POST LOG ROUTE  ---------  */
//http://localhost:3000/log/
router.post('/', validateSession, (req, res) => {
    const logEntry = {
        description: req.body.log.description,
        definition: req.body.log.definition,
        result: req.body.log.result,
        owner_id: req.user.id
    }
    
    Log.create(logEntry)
        .then(log => res.status(200).json(log))
        .catch(err => res.status(500).json({ error: err }))
});

/*  -------  GET ALL LOG ENTRIES  ---------  */
//http://localhost:3000/log/
// router.get('/', (req, res) => {
//     Log.findAll()
//         .then(logs => res.status(200).json(logs))
//         .catch(err => res.status(500).json({ error: err }))
// });

/*  -------  GET ALL LOG ENTRIES BY USER ROUTE  ---------  */

router.get('/', validateSession, (req, res) => {
    let userid = req.user.id
    Log.findAll({
        where: { owner_id: userid }
    })
        .then(logs => res.status(200).json(logs))
        .catch(err => res.status(500).json({ error: err }))
});

/*  -------  GET ALL LOG ENTRIES BY ID ROUTE  ---------  */

router.get('/:id', validateSession, (req, res) => {
    let id = req.params.id
    Log.findOne({
        where: { id: id }
    })
        .then(logs => res.status(200).json(logs))
        .catch(err => res.status(500).json({ error: err }))
});


/*  -------  UPDATE LOG ENTRY ROUTE  ---------  */

router.put('/:logId', validateSession, function (req, res) {
    const updateLogEntry = {
        description: req.body.log.description,
        definition: req.body.log.definition,
        result: req.body.log.result
    };

    const query = { where: { id: req.params.logId, owner_id: req.user.id } };

    Log.update(updateLogEntry, query)
        .then((logs) => res.status(200).json(logs))
        .catch((err) => res.status(500).json({ error: err}))
});

/*  -------  DELETE LOG ENTRY ROUTE  ---------  */
//http://localhost:3000/log/id
router.delete('/:id', validateSession, function (req, res) {
 const query = { where: { id: req.params.id, owner_id: req.user.id }};

    Log.destroy(query)
        .then(() => res.status(200).json({ message: 'Log Entry Removed'}))
        .catch((err) => res.status(500).json({ error: err}))

});

module.exports = router;
