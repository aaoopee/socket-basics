
var name = getQueryVariable('name');
var room = getQueryVariable('room');

var socket = io();

console.log(name+' wants to join '+room);

socket.on('connect', function() {
    console.log('Connected to Socket.io server!');
});

socket.on('message', function(message) {
    var momentTimestamp = moment.utc(message.timestamp);

    console.log('New message received: '+message.text);
    jQuery('.messages').append('<p><strong>'+momentTimestamp.local().format('HH:mm')+'</strong> '+message.text+'</p>');
});

// Handles submitting of new message
var $form = jQuery('#message-form');

$form.on('submit', function(event) {
    event.preventDefault();
    socket.emit('message', {
        text: $form.find('input[name=message]').val()
    });
    $form.find('input[name=message]').val("");
});
