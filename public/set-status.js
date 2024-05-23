document.getElementById('send').addEventListener('click', function (event) {
    event.preventDefault();
    const statusText = 'set from server'
    const statusEmoji = ':neutral_face:'
    const statusExpiration = 0
    set_status(statusText, statusEmoji, statusExpiration);
    
//    const statusText = document.getElementById('statusText').value;
//    const statusEmoji = document.getElementById('statusEmoji').value;
//    const statusExpiration = document.getElementById('statusExpiration').value;
});


function set_status(statusText, statusEmoji, statusExpiration){


    fetch('/set-status', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            statusText: statusText,
            statusEmoji: statusEmoji,
            statusExpiration: statusExpiration
        })
    })
    .then(response => response.text())
    .then(data => {
        //alert(data);
        console.log(data)
    })
    .catch((error) => {
        console.error('Error:', error);
        alert('エラーが発生しました');
    });
}
