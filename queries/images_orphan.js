db.getCollection('images').find({
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
})