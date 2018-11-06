import React, { Component } from "react";

class speechContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            notimessage: ''
        };
        this.recognition= null;
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        this.synth = window.speechSynthesis;
     

        if (navigator.userAgent.indexOf('Chrome') != - 1) {
               this.utterance = new SpeechSynthesisUtterance();
            this.recognition = new SpeechRecognition();
            this.recognition.start();
         }

    }
    componentWillMount() {
        if(this.recognition!==null){
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
    }
    whatYouSpeak(obj) {
        let last = obj.length - 1;
        let text = obj[last][0].transcript;
         let  notitext = `You mean to say : ${text} `;
         this.setState({notimessage: notitext});
        this.utterance.text = notitext;
        this.synth.speak(this.utterance);
    } 


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



