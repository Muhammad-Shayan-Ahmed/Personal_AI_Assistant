const btn = document.querySelector('#btn');
const content = document.querySelector('#content');
const voice = document.querySelector('#voice');

function speech(text) {
    const text_speech = new SpeechSynthesisUtterance(text)
    text_speech.rate = 1
    text_speech.pitch = 1
    text_speech.volume = 1
    text_speech.lang = "hi-GB"
    window.speechSynthesis.speak(text_speech)
}

function wish_me(){
    const day = new Date()
    const hours = day.getHours()
    if(hours >= 0 && hours < 12){
        speech("Good Morning Sir")
    }
    else if (hours >=12 && hours < 16){
        speech("Good Afternoon Sir")
    }else{
        speech("Good Evening Sir")
    }
}

window.addEventListener("load", () => {
    wish_me()
})

const speech_recog = window.SpeechRecognition || window.webkitSpeechRecognition
const recognition = new speech_recog()
recognition.onresult = (event) => {

    const currentIndex = event.resultIndex
    const transcript = event.results[currentIndex][0].transcript
    content.innerText = transcript
    takeCommand(transcript.toLowerCase())
}

btn.addEventListener("click", () => {
    recognition.start()
    btn.style.display = "none"
    voice.style.display = "block"
})

function takeCommand(message){
    btn.style.display = "flex"
    voice.style.display = "none"

    if(message.includes("hello") || message.includes ("hey")){
        speech("hello sir! how can i help you?")
    }
    else if(message.includes("who are you?")){
        speech("I am virtual assistant, created by sir muhammad shayan ahmed")
    }
    else if(message.includes("how are you?")){
        speech("I am fine, tell me how can i help you")
    }
    else if(message.includes("open youtube")){
        speech("opening youtube")
        window.open("https://www.youtube.com/")
    }
    else if(message.includes("open google")){
        speech("opening google")
        window.open("https://www.google.com/")
    }
    else if(message.includes("open facebook")){
        speech("opening facebook")
        window.open("https://www.facebook.com/")
    }
    else if(message.includes("open instagram")){
        speech("opening instagram")
        window.open("https://www.instagram.com/")
    }
    else if(message.includes("open linkedin")){
        speech("opening LinkedIn")
        window.open("https://www.linkedin.com/feed/")
    }
    else if(message.includes("open whatsapp")){
        speech("opening whatsapp")
        window.open("WhatsApp://")
    }
    else if(message.includes("open calculator")){
        speech("opening calculator")
        window.open("calculator://")
    }
    else if(message.includes("time")){
        const time = new Date().toLocaleString(undefined, {hour: "numeric", minute: "numeric"})
        speech(`${time} ho rahy hain`)
    }
    else if(message.includes("date")){
        const date = new Date().toLocaleString(undefined, {day: "numeric", month: "short", year: "numeric"})
        speech(`${date}`)
    }
    else{
        const finaltext = "this is what i found on internet regarding" + message.replace("shifra", "") || message.replace("shipra", "");
        speech(finaltext)
        window.open(`https://www.google.com/search?q= ${message.replace("shipra", "")}`)
    }
};