db.getCollection('users').aggregate([
    {
        '$match':
            {
                'profile.group': 
                    {
                        '$ne': 'ufcg'
                    }
            }
    },
    {
        '$lookup':
            {
                'from': 'records',
                'localField': '_id',
                'foreignField': 'owner',
                'as': 'record'
            }
    },
    {
        '$unwind': '$record'
    },
    {
        '$project': 
            {
                'username' : 1,
                'group' : '$profile.group',
                '_id': '$record._id',
                'type': '$record.type',
                'name': '$record.name',
                'position': '$record.position',
                'notes': '$record.notes'
            }
    },
    {
        '$match':
            {
                'position': 
                    {
                        '$exists': false
                    }
            }
    }
])