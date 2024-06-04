document.getElementById('logout').addEventListener('click', function() {

    fetch('/logout', {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        window.location.href = '/login';
    })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
    });
});

document.addEventListener('DOMContentLoaded', function() {
    fetch('/check_login')
            .then(response => response.text())
            .then(data => {
                console.log(data)
                if (data === '0') {
                    window.location.href = '/login';
                }else{
                    fetch('/get_userInfo')
                    .then(response => response.json())
                    .then(data => {
                        
                        console.log(data.username, data.email)
                        document.getElementById('name-field').innerHTML = data.username
                        document.getElementById('mail-field').innerHTML = data.email
                    })
                    .catch((error) => {
                        console.error('Error getting the response:', error);
                    });
                }
            })
            .catch((error) => {
                console.error('Error getting the response:', error);
            });
    });

