const handleSignin = (req, res, db, bcrypt) => {
    const{email, password} = req.body;
    if (!email || !password) {
        return res.status(400).json('please enter details');
    }
    db.select('email', 'hash').from('login')
        .where('email', '=', req.body.email)
        .then(data => {
            const isValid = bcrypt.compareSync(req.body.password, data[0].hash);
            if (isValid) {
                return db.select('*').from('users')
                    .where('email', '=', req.body.email)
                    .then(user => {
                        res.json(user[0]);
                    })
                    .catch(err => {
                        res.status(400).json('user not found');
                    })
            }
            else {
                res.status(400).json('wrong email or password');
            }
        })
        .catch(err => res.status(400).json('wrong email or password'));
}

module.exports = {
    handleSignin: handleSignin
}