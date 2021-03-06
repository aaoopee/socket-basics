
var name = getQueryVariable('name') || 'Anonymous';
var room = getQueryVariable('room') || 'Global';

var socket = io();

console.log(name+' wants to join '+room);

jQuery('.room-title').text(room);

socket.on('connect', function() {
    console.log('Connected to Socket.io server!');

    socket.emit('joinRoom', {
        name: name,
        room: room
    });
});

socket.on('message', function(message) {
    var momentTimestamp = moment.utc(message.timestamp);
    var $messages = jQuery('.messages');
    var $message = jQuery('<li class="list-group-item"></li>');

    console.log('New message received from '+name+': '+message.text);

    $message.append('<p><strong>'+message.name+' '+momentTimestamp.local().format('HH:mm')+'</strong></p>');
    $message.append('<p>'+message.text+'</p>');
    $messages.append($message);
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
