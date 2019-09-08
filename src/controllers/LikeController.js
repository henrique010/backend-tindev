const Dev = require('../models/Dev');

module.exports = {
    async store(req, res) {
        const { id } = req.params;
        const { user } = req.headers;

        const loggedDev = await Dev.findById(user);
        const targetDev = await Dev.findById(id);

        if (!targetDev)
            return res.status(400).send({ message: 'Dev not exists' });

        if (targetDev.likes.includes(loggedDev._id)) {
            req.io.to(loggedDev._id).emit('match', targetDev);
            req.io.to(targetDev._id).emit('match', loggedDev);
        }

        loggedDev.likes.push(targetDev._id);
        await loggedDev.save();

        return res.json({ loggedDev });
    }
};