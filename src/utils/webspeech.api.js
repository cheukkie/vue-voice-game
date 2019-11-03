export const webSpeechApi = options => {
    
    // webSpeech API is supported
    const recognition = new webkitSpeechRecognition();

    //PROPERTIES
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.maxAlternatives = 3;
    recognition.lang = 'nl-NL';

    //ORDER OF EVENTS WHEN RECOGNITION IS STARTED

    //1. on start
    recognition.onstart = event => {
        console.log(`onstart: ${event}`);
    };
    //2. on audio start
    recognition.onaudiostart = event => {
        console.log(`audiostart: ${event}`);
    };
    //3. on sound start
    recognition.onsoundstart = event => {
        console.log(`onsoundstart: ${event}`);
    };
    //4. on speech start
    recognition.onspeechstart = event => {
        console.log(`onspeechstart: ${event}`);
    };
    //5. on speech end
    recognition.onspeechend = event => {
        console.log(`onspeechend: ${event}`);
    };
    //6. on sound end
    recognition.onsoundend = event => {
        console.log(`onsoundend: ${event}`);
    };
    //7. on audio end
    recognition.onaudioend = event => {
        console.log(`audioend: ${event}`);
    };
    //8. on end
    recognition.onend = event => {
        console.log(`onend: ${event}`);
    };

    //EVENTLISTENERS
    recognition.onerror = event => {
        ////https://wicg.github.io/speech-api/#speechreco-error
        console.log(`error: ${event.error}`);
    };
    recognition.onnomatch = event => {
        console.log(`nomatch: ${event}`);
    };
    recognition.onresult = event => {
        //console.log( e.results[0].length );
        const altArray = [];
        for (let i = 0; i < event.results[0].length; i++) {
            const element = event.results[0][i].transcript;
            altArray.push(element);
        }
        console.log(`Alternatives: ${altArray}`);
        console.log(`result: ${event.results[0][0].transcript}`);
    };

    return recognition;
    
}