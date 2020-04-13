const express = require('express');
var moment = require("moment");

const Issues = require('./issue-model.js');
const schools = require("../schools/school-model");

const Comments = require('../comments/comment-model.js');
const restricted = require("../auth/restricted-middleware.js");
const router = express.Router();

router.post('/', (req, res) => {

    var issue = req.body
    issue.date = moment().format();
    
    Issues.createIssue(issue)
    .then(issue => {
        res.status(201).json(issue);
    })
    .catch (err => {
      res.status(500).json({ message: 'Failed to create new school issue' });
    });
});

router.get('/', (req, res) => {
    Issues.getAllIssues()
        .then(issues => {
            res.status(200).json(issues);
        })
        .catch(err => {
            res.status(500).json({error: 'Could not get issues from server'});
        });
});

router.get('/:id', (req, res) => {
    const {id} = req.params;
    Issues.getAnIssues(id)
    .then(issues => {
        if (issues) {
            res.status(201).json(issues)
        } else {
            res.status(404).json({message: "Issue with this id does not exist"})
        }

    })
    .catch(err => {
        res.status(500).json({error: "Error getting issues from database"})
    })
})
router.get("/school/:id", (req, res) => {
    const { id } = req.params;
  schools.findBySchoolId(id)
    .then((school) => {
        if (school) {
         console.log(school)
        Issues.getIssuesbySchool(id)
          .then((issues) => {
            if (issues) {
              res.status(201).json(issues);
            } else {
              res
                .status(404)
                .json({ message: "Issue with this id does not exist" });
            }
          })
          .catch((err) => {
            res
              .status(500)
              .json({ error: "Error getting issues from database" });
          });
      } else {
        res.status(404).json({ message: "School with this id does not exist" });
      }
    })
    .catch((err) => {
      res.status(500).json({ error: "Error getting school from database" });
    });
  
});
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const changes = req.body;
    Issues.editIssue(changes, id)
    .then(issue => {
      if (issue) {
          res.status(200).json(issue);
      } else {
        res.status(404).json({ message: 'This issue does not exist' })
      }
    })
    .catch(err => {
        console.log(err)
      res.status(500).json({ message: 'Failed to get issue from database' });
    });
});

router.delete('/:id', (req, res) => {
    const { id } = req.params;
    console.log(id);

    Issues.removeIssue(id)
    .then(deleted => {
        console.log(deleted)
        if (deleted) {
            res.status(200).json(deleted);
      } else {
        res.status(404).json({ message: 'This user does not exist' })
      }
    })
    .catch (err => {
        console.log(err)
        res.status(500).json({message: 'Failed to delete issue from database'})
    })
})

module.exports = router;