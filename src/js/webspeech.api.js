export default webSpeechApi = () => { // eslint-disable-line
  // webSpeech API is supported
    const recognition = new webkitSpeechRecognition(); // eslint-disable-line

  // PROPERTIES
  recognition.continuous = false;
  recognition.interimResults = false;
  recognition.maxAlternatives = 3;
  recognition.lang = 'nl-NL';

  // ORDER OF EVENTS WHEN RECOGNITION IS STARTED

  // 1. on start
  recognition.onstart = (event) => {
        console.log(`onstart: ${event}`); // eslint-disable-line
  };
  // 2. on audio start
  recognition.onaudiostart = (event) => {
        console.log(`audiostart: ${event}`); // eslint-disable-line
  };
  // 3. on sound start
  recognition.onsoundstart = (event) => {
        console.log(`onsoundstart: ${event}`); // eslint-disable-line
  };
  // 4. on speech start
  recognition.onspeechstart = (event) => {
        console.log(`onspeechstart: ${event}`); // eslint-disable-line
  };
  // 5. on speech end
  recognition.onspeechend = (event) => {
        console.log(`onspeechend: ${event}`); // eslint-disable-line
  };
  // 6. on sound end
  recognition.onsoundend = (event) => {
        console.log(`onsoundend: ${event}`); // eslint-disable-line
  };
  // 7. on audio end
  recognition.onaudioend = (event) => {
        console.log(`audioend: ${event}`); // eslint-disable-line
  };
  // 8. on end
  recognition.onend = (event) => {
        console.log(`onend: ${event}`); // eslint-disable-line
  };

  // EVENTLISTENERS
  recognition.onerror = (event) => {
    // //https://wicg.github.io/speech-api/#speechreco-error
        console.log(`error: ${event.error}`); // eslint-disable-line
  };
  recognition.onnomatch = (event) => {
        console.log(`nomatch: ${event}`); // eslint-disable-line
  };
  recognition.onresult = (event) => {
    // console.log( e.results[0].length );
    const altArray = [];
    for (let i = 0; i < event.results[0].length; i + 1) {
      const element = event.results[0][i].transcript;
      altArray.push(element);
    }
        console.log(`Alternatives: ${altArray}`); // eslint-disable-line
        console.log(`result: ${event.results[0][0].transcript}`); // eslint-disable-line
  };

  return recognition;
};
