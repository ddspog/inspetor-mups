db.getCollection('users').find().snapshot().forEach( function (user) {
    user.mainEmail = user.emails[0].address; 
    db.getCollection('users').save(user); 
});