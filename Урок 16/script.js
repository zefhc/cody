"use strict"

const telegram_bot_token = '8254727494:AAFMm5jPC9uUnapJLvHHORRQUiPSrx2VUm4';
const telegram_chat_id = '-1003777803894';
const api = `https://api.telegram.org/bot${telegram_bot_token}/sendMessage`;

async function sendEmailTelegram(event) {
    event.preventDefault()

    const form = event.target;
    const formBtn = document.querySelector('.form_button')
    const formSendResult = document.querySelector('.form_send_result')
    formSendResult.textContent = '';

    const  {name, phone, problem} = Object.fromEntries(new FormData(form).entries())
    const text = `Заявка от ${name}!\nТелефон: ${phone}\nКраткое описание проблемы: ${problem}`

    try  {
        formBtn.textContent = 'Отправка...'
        const respone = await fetch(api, {
            method: 'POST',
            headers:{
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({
                chat_id: telegram_chat_id,
                text,
            })
        });

        if (respone.ok){
            formSendResult.textContent = 'Спасибо за ашу заявку, мы связжемся с вами в ближайшее время.'
            form.reset()
        }
        else{
            throw new Error(respone.statusText)
        }
    }
    catch (error){
        console.error(error)
        formSendResult.textContent = 'Анкета не отправлена! Попробуйте позже.'
        formSendResult.style.color = 'red'
    }
    finally{
        formBtn.textContent = 'Отправить'
    }    
}