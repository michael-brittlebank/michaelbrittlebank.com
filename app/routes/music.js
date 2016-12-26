const /* packages */
    express = require('express'),
    router = express.Router(),
/* controllers */
    musicController = require('../controllers/music');

router.route('/:pageTitle')
    .get(musicController.getMusicPost);

router.route('/')
    .get(musicController.getMusicPage);

module.exports = router;
