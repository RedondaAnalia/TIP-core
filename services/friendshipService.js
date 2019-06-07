const rp = require('request-promise');


exports.newSocialUser = (mail) =>{
    const options = {
        method: 'POST',
        uri: process.env.FRIEND_URL+ "user",
        body: {
            mail: mail
        },
        json: true, // Automatically stringifies the body to JSON
        headers: {
             'content-type': 'application/json'
        }
    };

    return rp(options)
};

exports.createRelationship = (amail, bmail) =>{
    const options = {
        method: 'POST',
        uri: "process.env.FRIEND_URL"+ "relationship",
        body: {
            aMail: amail,
            bMail: bmail
        },
        json: true, // Automatically stringifies the body to JSON
        headers: {
            'content-type': 'application/json'
        }
    };

    return rp(options)
};

exports.friends = (mail) =>{
    const options = {
        method: 'GET',
        uri: "process.env.FRIEND_URL"+ "user",
        params: {
            email: mail
        },
        headers: {
            'content-type': 'application/json'
        }
    };

    return rp(options)
};