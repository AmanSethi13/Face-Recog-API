const handleProfile= (req, res, db) => {
    let found = false;
    const { id } = req.params;
    db.select('*').from('users').where({
        id: id
    }).then(user => {
        if (user.length) {
            res.send(user[0]);
        }
        else {
            res.status(400).json('Not found');
        }
    }).catch(err => res.status(400).send('User not found'))
}

module.exports={
    handleProfile: handleProfile
}