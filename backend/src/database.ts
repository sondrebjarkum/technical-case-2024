// Mock DB

const users = [
    {
        id: 1,
        name: 'John Doe',
        email: 'john@doe.com'
    },
    {
        id: 2,
        name: 'Jane Doe',
        email: 'jane@doe.com'
    }
]

const activities = [
    {
        id: 1,
        name: 'Running',
        userId: 1
    },
    {
        id: 2,
        name: 'Cycling',
        userId: 1
    },
    {
        id: 3,
        name: 'Swimming',
        userId: 2
    }
]

class Database {
    public getUsers() {
        return users
    }

    public getActivities() {
        return activities
    }
}

export const db = new Database()

