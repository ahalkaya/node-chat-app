const expect = require('expect');

let {
    generateMessage,
    generateLocationMessage
} = require('./message');

describe('generateMessage', () => {
    it('should generate correct message object', () => {
        let from = 'Alihan';
        let text = 'Hi there';
        let message = generateMessage(from, text);

        expect(message.createdAt).toBeA('number');
        expect(message).toInclude({
            from,
            text
        });
    });
});

describe('generateLocationMessage', () => {
    it('should generate correct location object', () => {
        let from = 'User';
        let latitude = 40.123;
        let longitude = -34.456;
        let url = 'https://www.google.com/maps?q=40.123,-34.456';
        let locationMessage = generateLocationMessage(from, latitude, longitude);

        expect(locationMessage.createdAt).toBeA('number');
        expect(locationMessage).toInclude({
            from,
            url
        });
    });
});