
var name = getQueryVariable('name') || 'Anonymous';
var room = getQueryVariable('room');

var socket = io();

console.log(name+' wants to join '+room);

socket.on('connect', function() {
    console.log('Connected to Socket.io server!');
});

socket.on('message', function(message) {
    var momentTimestamp = moment.utc(message.timestamp);
    var $message = jQuery('.messages');

    console.log('New message received from '+name+': '+message.text);
    $message.append('<p><strong>'+message.name+' '+momentTimestamp.local().format('HH:mm')+'</strong></p>');
    $message.append('<p>'+message.text+'</p>');
});

// Handles submitting of new message
var $form = jQuery('#message-form');

$form.on('submit', function(event) {
    event.preventDefault();
    socket.emit('message', {
        name: name,
        text: $form.find('input[name=message]').val()
    });
    $form.find('input[name=message]').val("");
});
