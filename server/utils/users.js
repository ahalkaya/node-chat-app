class Users {
    constructor () {
        this.users = [];
    }

    addUser (id, name, room) {
        let user = {id, name, room};
        this.users.push(user);
        return user;
    }

    removeUser (id) {
        let user = this.getUserById (id);

        if (user) {
            this.users = this.users.filter((user) => user.id !== id);
        }

        return user;
    }

    getUserById (id) {
        return this.users.filter((user) => user.id === id)[0];
    } 

    getUserByName (name) {
        return this.users.filter((user) => user.name.toLowerCase() === name.toLowerCase())[0];
    } 

    getUserList (room) {
        let users = this.users.filter((user) => user.room === room);
        let namesArr = users.map((user) => user.name);

        return namesArr;
    }

    getRoomList () {
        let roomsArr = this.users.map((user) => user.room);
        let rooms = roomsArr.filter((room, index, arr) => arr.indexOf(room) === index);

        return rooms;
    }
}

module.exports = {Users};
