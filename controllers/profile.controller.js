//create controller for profile
const Profile = require('../models/Profile.model');
// create profile controller

const createProfile = async (req, res) => {
    try {
        const { userId, headLine, summary,experiences, skills=[] , education} = req.body;
            

        // ceate new profile
        const profile = new Profile({
            userId,
            headLine,
            summary,
            skills
        
        });
        //save profile
        await profile.save();

        profile.experiences.push(experiences);
        profile.education.push(education);
        await profile.save();

        return res.status(201).json({
            message: 'Profile created successfully',
            profile
        });
    }
    catch (err) {
        console.log("err", err.message);
    }
};
module.exports = {
    createProfile
};
