const userRouter = require('express').Router();

userRouter.post("/login", async (req, res) => {
    console.log(req.body.email,req.body.password);

    const user = await User.findOne({
        where: {
            email: req.body.email
        },
        raw: true
    });
    // console.log(user);
    if (!user) return res.status(401).json({
            message: messages.userNotExist
        })
    if (user.password == req.body.password) {
        res.status(200).json({
            message: messages.loginSuccessful,
            token: "33ejfdsjfkadsjfkajdsfk",
            name: user.name,
            email: user.email
        });

    } else {
        res.status(401).json({
            message: messages.unAuthorisedAccess
        });
    }
});

module.exports = userRouter;