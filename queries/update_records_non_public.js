db.getCollection('records').update({}, {
    '$set': 
        {
            'public': false
        }
}, {
    'multi': true
})