var socket = io();

socket.on('connect', function () {
    socket.emit('newUserConnected');
});

socket.on('updateRoomList', function (rooms) {
    // console.log('Active Rooms', rooms);

    var options = {
        data: rooms
    };
    
    jQuery('[name="room"]').easyAutocomplete(options);
});