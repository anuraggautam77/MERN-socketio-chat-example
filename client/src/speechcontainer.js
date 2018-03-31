import React, { Component } from "react";

class speechContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            notimessage: ''
        };

        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        this.synth = window.speechSynthesis;
        this.utterance = new SpeechSynthesisUtterance();

        if (navigator.userAgent.indexOf('Chrome') != - 1) {
            this.recognition = new SpeechRecognition();
            this.recognition.start();
        }

    }
    componentWillMount() {

        this.recognition.addEventListener('speechstart', () => {
            console.log('Speech has been detected.');
        });

        this.recognition.addEventListener('result', (e) => {
            console.log('Result has been detected.');
            console.log(e.results);
            this.whatYouSpeak(e.results);
        });

        this.utterance.addEventListener('start', function() {
            console.log('started');
        });

        this.utterance.addEventListener('end', () => {
            console.log("endded");
            this.recognition.start();
        });




    }
    whatYouSpeak(obj) {

        let last = obj.length - 1;
        let text = obj[last][0].transcript;

         let  notitext = `You mean to say : ${text} `;
         this.setState({notimessage: notitext});

        this.utterance.text = notitext;
        this.synth.speak(this.utterance);




    }
    /*
     this.recognition.addEventListener('result', (e) => {
     console.log('Result has been detected.');
     console.log(e.results);
     let last = e.results.length - 1;
     let text = e.results[last][0].transcript;
     let  notitext = `You meant to Say : ${text} `
     this.setState({notimessage: notitext})
     
     
     
     
     
     
     
     utterance.addEventListener('start', function() {
     console.log('started');
     });
     
     utterance.addEventListener('end', () => {
     console.log("endded");
     this.recognition.start();
     });
     
     
     }); */


    render() {

        if (this.state.notimessage !== '') {
            return (
                    <div>
                        <div className="speech-container alert alert-danger" role="alert">{this.state.notimessage}</div>
                    </div>
                    );
        }
        else {
            return '';
        }


    }
}

export default speechContainer;



