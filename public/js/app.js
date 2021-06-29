console.log('Client Side javascript');

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');


weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const address = search.value;
    messageOne.innerText = 'Loading...';
    messageTwo.innerText = '';

    fetch(`/weather?address=${address}`).then((response) => {
    response.json().then((data) => {
        if(data.error){
            messageOne.innerText = data.error;
           
        }
        else{
            messageOne.innerText = data.location;
            messageTwo.innerText = data.forecast;
        }
       
    })
})

})