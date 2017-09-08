const expect = require('expect');

const {Users} = require('./users');

describe('Users', () => {
    let users;

    beforeEach(() => {
        users = new Users();
        users.users = [{
            id: '1',
            name: 'User 1',
            room: 'Node devs'
        }, {
            id: '2',
            name: 'User 2',
            room: 'JS devs'
        }, {
            id: '3',
            name: 'User 3',
            room: 'Node devs'
        }];
    });

    it('should add new user', () => {
        let users = new Users();
        let user = {
            id: '123',
            name: 'Alihan',
            room: 'The office fans'
        };
        let resUser = users.addUser(user.id, user.name, user.room);

        expect(users.users).toEqual([user]);
    });

    it('should remove a user', () => {
        let userId = '1';
        let user = users.removeUser(userId);

        expect(user.id).toBe(userId);
        expect(users.users.length).toBe(2);
    });

    it('should not remove a user', () => {
        let userId = '99';
        let user = users.removeUser(userId);

        expect(user).toNotExist();
        expect(users.users.length).toBe(3);
    });

    it('should find user', () => {
        let userId = '2';
        let user = users.getUser(userId);
        expect(user.id).toBe(userId);
    });

    it('should not find user', () => {
        let userId = '99';
        let user = users.getUser(userId);

        expect(user).toNotExist();
    });

    it('should return names for Node devs', () => {
        let userList = users.getUserList('Node devs');
        
        expect(userList).toEqual(['User 1', 'User 3']);
    });
    
    it('should return names for JS devs', () => {
        let userList = users.getUserList('JS devs');
        
        expect(userList).toEqual(['User 2']);
    });
});