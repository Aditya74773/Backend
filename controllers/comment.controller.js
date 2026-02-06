const Comment = require('../models/Comment.model');
// create comment controller
const createComment = async (req, res) => {
    try {
        const { textComment, UserId, postId } = req.body;
        //create comment
        const comment = new Comment({
            textComment,
            UserId,
            postId
        });
        await comment.save();
        return res.status(201).json({
            message: 'Comment created successfully',
            comment
        });
}
    catch (err) {
        console.log("err", err.message);
    }   
};
module.exports = {
    createComment
};