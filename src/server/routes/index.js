const router = require('express').Router();
// const path = require('path');
const Debugger = require('../services/Debugger');
const Logger = require('../services/Logger');
// const serverConfig = require('../config');
const PostService = require('../services/blog/Post');
const { buildModel, getModel } = require('../views/ViewUtils');
const getTitleByUrl = require('./CategoryTitleMap');

router.get('*', (req, res) => {
  Logger.catch(async () => {
    Debugger.httpRouting('Routing: ', req.sessionID,
      (req.session && req.session.user) ? req.session.user.name : '');

    // const indexPath = path.resolve(serverConfig.publicFolder, 'index.html');
    // res.sendFile(indexPath);

    let model = getModel();
    if (req.query && req.query.hashtag) {
      const post = await PostService.getByOrder(req.query.hashtag);
      model = buildModel({
        url: req.url,
        title: post.title || model.title,
        description: post.summary || model.description,
        image: post.preview || model.image
      });
    } else {
      const titleByCategory = getTitleByUrl(req.path);
      model = buildModel({
        url: req.url,
        title: titleByCategory ? `${titleByCategory} | ${model.title}` : model.title
      });
    }
    res.render('index', model);
  });
});

module.exports = router;
