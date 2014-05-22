db.dropDatabase();

var tasks = [
    {
        "id": 0,
        "done": false,
        "priority": 8,
        "name": "Take out trash",
        "category": ""
    },
    {
        "id": 1,
        "done": true,
        "priority": 5,
        "name": "Half-gallon of milk from store",
        "category": ""
    },
    {
        "id": 2,
        "done": false,
        "priority": 2,
        "name": "Pick up John from airport",
        "category": ""
    },
    {
        "id": 3,
        "done": true,
        "priority": 3,
        "name": "Really wordy task that just wraps text to see what it looks like",
        "category": ""
    },
    {
        "id": 4,
        "done": false,
        "priority": 10,
        "name": "Pack suitcase for trip to LEGO Land",
        "category": ""
    },
    {
        "id": 5,
        "done": false,
        "priority": 2,
        "name": "Get that one thing done that needed doing",
        "category": ""
    }
];

db.tododb.save(tasks);