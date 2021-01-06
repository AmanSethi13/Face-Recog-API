const Clarifai = require('clarifai');


const app = new Clarifai.App({
    apiKey: 'd1d72012657242b881456957d7d1a914'
});

const HandleApiCall = (req, res) =>{
    app.models.predict(
        {
            id: "a403429f2ddf4b49b307e318f00e528b",
            version: "34ce21a40cc24b6b96ffee54aabff139",
        },
        req.body.input
    )
    .then(data =>{
        res.json(data)
    })
    .catch(err => {
        res.status(400).json('image not found');
    })
}



const imageHandle =(req, res, db)=>{
    const { id } = req.body;
    db('users').where('id', '=', id).increment('entries', 1)
        .returning('entries')
        .then(entries => res.json(entries[0]))
        .catch(err => res.status(400).json('unable to get entries'));
}

module.exports = {
    imageHandle,
    HandleApiCall
}