db.getCollection('images').update({
    '_id': {
        '$nin': db.getCollection('images').aggregate([
            {'$lookup': {
                        'from': 'records',
                        'localField': 'record',
                        'foreignField': '_id',
                        'as': 'info'
            }},
            {'$unwind': '$info'},
            {'$match': {'info' : {'$ne': null}}},
            {'$project': {'_id' : 1}}
        ]).map(function(el) { return el._id })
    }
}, {
    '$set': 
        {
            'orphan': true
        }
}, {
    'multi': true
})