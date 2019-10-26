const router = require('express').Router();
// const Debugger = require('../../../services/Debugger');
const Logger = require('../../../services/Logger');
const PostService = require('../../../services/blog/Post');
const APIResponse = require('../../../models/api-models');
const PostsSecurityService = require('../../../services/security/PostsSecurity');
const RatingService = require('../../../services/blog/Rating');


router.post('/:postId', (req, res) => {
  Logger.catch(async () => {
    await PostsSecurityService.onlyLoggedInUser(req);
    const { user } = req.session;
    const { postId } = req.params;
    const { rating } = req.body;
    const post = await PostService.get(postId);
    if (!post) {
      throw APIResponse.throwError.NotFound();
    }
    const ratingObject = await RatingService.rating(post, user, rating);
    if (user.dirty) {
      delete user.dirty;
      return req.session.save(
        () => res.send(new APIResponse().setData({ rating: ratingObject, user }))
      );
    }
    return res.send(new APIResponse().setData({ rating: ratingObject, user }));
  }, { req, res });
});

module.exports = router;
