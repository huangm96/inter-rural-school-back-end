const express = require('express');

const Schools = require('./school-model.js');
const restricted = require("../auth/restricted-middleware.js");
const router = express.Router();

router.get('/', (req, res) => {
    Schools.getSchools()
        .then(schools => {
            res.status(200).json(schools);
            console.log(schools)
        })
        .catch(err => {
            res.status(500).json({error: 'Could not get schools from server'});
        });
});

router.get('/:schoolid', (req, res) => {
    const {schoolid} = req.params;
    Schools.findBySchoolId(schoolid)
    .then(school => {
        if (school) {
            res.status(200).json(school)
        } else {
            res.status(404).json({message: "School with this id does not exist"})
        }

    })
    .catch(err => {
        res.status(500).json({error: "Error getting school from database"})
    })
})

router.post('/', (req, res) => {
    const schoolInfo = req.body;
  
    Schools.addSchool(schoolInfo)
        .then(schoolid => {
            Schools.findBySchoolId(schoolid[0]).then(school => {
            res.status(201).json(school);
            }).catch(err => {
            res
              .status(500)
              .json(err, { message: "School with this id does not exist" });
        })
      
    })
    .catch (err => {
      res.status(500).json(err,{ message: 'Failed to create new school' });
    });
});

router.put('/:schoolid', (req, res) => {
    const { schoolid } = req.params;
    const changes = req.body;

    Schools.findBySchoolId(schoolid)
    .then(school => {
        if (school) {
            Schools.updateSchool(changes, schoolid)
            .then(updatedSchool => {
                res.status(200).json(updatedSchool)
            })
        } else {
            res.status(404).json({message: 'This school does not exist'})
        }
    })
    .catch (err => {
        res.status(500).json({message: 'Error updating school in database'})
    })
});

router.delete('/:schoolid', (req, res) => {
    const { schoolid } = req.params;

    Schools.removeSchool(schoolid)
    .then(deleted => {
        if (deleted) {
            res.json({removed: deleted})
        } else {
            res.status(404).json({message: 'This school does not exist'})
        }
    })
    .catch (err => {
        res.status(500).json({message: 'Failed to delete school from database'})
    })
})


module.exports = router;