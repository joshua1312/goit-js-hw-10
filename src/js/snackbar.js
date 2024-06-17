import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";


const formEl = document.querySelector('.form');
const inptElemMs = formEl.querySelector('input[name="delay"]');

formEl.addEventListener('submit', e => {
    e.preventDefault();

    const delayValue = inptElemMs.value;
   
    const state = formEl.querySelector("input[name='state']:checked")?.value;
    
    new Promise((resolve, reject) => setTimeout(() => {
        state === "fulfilled" ? resolve(delayValue) : reject(delayValue);
    }, delayValue))
       
        .then(delay => {
            iziToast.success({
                title: 'OK',
                titleColor: '#fff',
                message: `✅ Fulfilled promise in ${delay} ms`,
                messageColor: '#fff',
                backgroundColor: '#59a10d',
                position: "topRight",
                theme: 'dark'
            });
        })
        
        .catch(delay => {
            iziToast.error({
                title: 'Error',
                titleColor: '#fff',
                message: `❌ Rejected promise in ${delay} ms`,
                messageColor: '#fff',
                backgroundColor: '#ef4040',
                position: "topRight",
                theme: 'dark'
            });
        });
});