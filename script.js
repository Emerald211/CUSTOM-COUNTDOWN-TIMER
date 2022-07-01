const inputContainer = document.querySelector("#input-container");
const countdownForm = document.querySelector("#countdownForm");
const dateEl = document.querySelector("#date-picker");
const countdownEl = document.querySelector("#countdown");
const countdownTitleDom = document.querySelector('#countdown-title');
const countDownBtn = document.querySelector("#countdown-button");
const timeEl = document.querySelectorAll('span');
const completeEl = document.querySelector("#complete");
const completeElInfo = document.querySelector("#complete-info");
const completeBtn = document.querySelector("#complete-button");

let countdownTitle = '';
let countdownDate = '';
let countdownValue = Date;
let countdownActive;
let saveCountdown;

const seconds = 1000;
const minute = seconds * 60;
const hour = minute * 60;
const day = hour * 24;

const today = new Date().toISOString().split('T')[0];

dateEl.setAttribute('min', today)




countdownForm.addEventListener('submit', function updateCountdown(e) {
    e.preventDefault();
    countdownTitle = e.srcElement[0].value;
    countdownDate = e.srcElement[1].value;

    saveCountdown = {
        title: countdownTitle,
        date: countdownDate
    }

    console.log(saveCountdown);

    localStorage.setItem("countdown", JSON.stringify(saveCountdown))



    if (countdownDate === '') {
        alert('Pls Select a Date')
    } else {
        countdownValue = new Date(countdownDate).getTime();

       
    
        const updateDOM = () => {
            countdownActive = setInterval(() => {
                const now = new Date().getTime();
                const distance = countdownValue - now;
            
           
                
                const days = Math.floor(distance / day);
                const hours = Math.floor((distance % day) / hour)
                const minutes = Math.floor((distance % hour) / minute)
                const secondss = Math.floor((distance % minute) / seconds)

                inputContainer.hidden = true;

                // if countdown ends
                if (distance < 0) {
                    countdownEl.hidden = true;
                    clearInterval(countdownActive);
                    completeElInfo.textContent = `${countdownTitle} finished on ${countdownDate}`
                    completeEl.hidden = false;
                } else {

                    // update dom value
                    countdownTitleDom.textContent = `${countdownTitle}`;
                    timeEl[0].textContent = `${days}`;
                    timeEl[1].textContent = `${hours}`;
                    timeEl[2].textContent = `${minutes}`;
                    timeEl[3].textContent = `${secondss}`

                    completeEl.hidden = true;
                    countdownEl.hidden = false;
                }
            
                
               
            }, seconds);
        }
        
    
        
        updateDOM();
        
    }
});

countDownBtn.addEventListener('click', reset = () => {
    countdownEl.hidden = true;
    inputContainer.hidden = false;

    clearInterval(countdownActive);

    countdownTitle = '';
    countdownDate = '';
    localStorage.removeItem('countdown');
});

completeBtn.addEventListener('click', reset = () => {
    countdownEl.hidden = true;
    inputContainer.hidden = false;

    completeEl.hidden = true;

    clearInterval(countdownActive);

    countdownTitle = '';
    countdownDate = '';
    localStorage.removeItem('countdown');
});

function restoreData() {
    if (localStorage.getItem('countdown')) {
        inputContainer.hidden = true;
        saveCountdown = JSON.parse(localStorage.getItem('countdown'));

        countdownTitle = saveCountdown.title;
        countdownDate = saveCountdown.date;
        countdownValue = new Date(countdownDate).getTime();


        countdownActive = setInterval(() => {
            const now = new Date().getTime();
            const distance = countdownValue - now;
        
       
            
            const days = Math.floor(distance / day);
            const hours = Math.floor((distance % day) / hour)
            const minutes = Math.floor((distance % hour) / minute)
            const secondss = Math.floor((distance % minute) / seconds)

            inputContainer.hidden = true;

            // if countdown ends
            if (distance < 0) {
                countdownEl.hidden = true;
                clearInterval(countdownActive);
                completeElInfo.textContent = `${countdownTitle} finished on ${countdownDate}`
                completeEl.hidden = false;
            } else {

                // update dom value
                countdownTitleDom.textContent = `${countdownTitle}`;
                timeEl[0].textContent = `${days}`;
                timeEl[1].textContent = `${hours}`;
                timeEl[2].textContent = `${minutes}`;
                timeEl[3].textContent = `${secondss}`

                completeEl.hidden = true;
                countdownEl.hidden = false;
            }
        
            
           
        }, seconds);


        

    }
}


restoreData();