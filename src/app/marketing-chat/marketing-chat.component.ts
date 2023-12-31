import { Component, OnInit, ElementRef } from '@angular/core';
import { Configuration, OpenAIApi, } from 'openai';
import { environment } from '../environments/environment';
import { gptModels } from '../models/constants';
import { ChatWithBot, ResponseModel, ResponseModelTurbo, message } from '../models/gpt-response';
import { frasesChiquito_1 } from '../../assets/data/arrayFrasesChiquito_1';

@Component({
  selector: 'app-marketing-chat',
  templateUrl: './marketing-chat.component.html',
  styleUrls: ['./marketing-chat.component.css']
})
export class MarketingChatComponent {


  chatConversation: ChatWithBot[] = [];
  response!: ResponseModel | undefined;
  responseTurbo!: any;
  gptModels = gptModels;
  promptText = '';
  roleSystem: string = 'system';
  roleUser: string = 'user'
  arrayFrasesChiquito = frasesChiquito_1;
  promptTextModificado = ',como experto en marketing, añade a tu respuesta, combinaciones de las palabras de la siguiente frase:'
  showSpinner = false;
  messages: string[] = [];
  temperature: number = 0;
  isRecording: boolean = false;
  mensaje: SpeechSynthesisUtterance | null = null;
  myButton = document.getElementById('myButton');


  constructor(private elementRef: ElementRef) {
    this.mensaje = new SpeechSynthesisUtterance();
  }

  ngOnInit(): void {
  }

  fraseAleatoria(array: string[]) {
    const indice = Math.floor(Math.random() * array.length);
    return array[indice];
  }

  checkResponse() {
    this.pushChatContent(this.promptText, 'Fistro pecador', 'person');
    this.invokeGPT();
    this.promptText = '';
  }

  pushChatContent(content: string, person: string, cssClass: string) {
    const chatToPush: ChatWithBot = { person: person, response: content, cssClass: cssClass };
    this.chatConversation.unshift(chatToPush);
  }

  /* INICIO MODIFICADO PARA gpt-3.5-turbo */

  pushChatContentTurbo(content: string, person: any, cssClass: string) {
    const chatToPush = { response: content, person: person, cssClass: cssClass };
    this.chatConversation.unshift(chatToPush);
  }

  checkResponseTurbo() {
    this.pushChatContentTurbo(this.promptText, 'Fistro pecador', 'person');
    this.invokeGPT();
    this.promptText = '';
  }
  /*  FIN MODIFICADO PARA gpt-3.5-turbo */

  getText(data: string) {
    /* console.log(data); */
    return data.split('\n').filter(f => f.length > 0);

  }

  async invokeGPT() {

    if (this.promptText.length < 2)
      return;
    try {
      this.response = undefined;
      let configuration = new Configuration({ apiKey: environment.apiKey });
      let openai = new OpenAIApi(configuration);

      this.showSpinner = true;
      let apiResponse = await openai.createChatCompletion(
        {
          model: 'gpt-3.5-turbo',
          messages: [
            { 'role': 'system', content: "eres un experto en marketing online con humor" },
            { 'role': 'user', content: this.promptText + this.promptTextModificado }
          ]
          ,
          temperature: 1
        }
      )

      this.response = apiResponse.data as ResponseModel;
      this.responseTurbo = this.response.choices;
      console.log("**AUDIO: ",this.responseTurbo[0].message.content);
      this.hablar(this.responseTurbo[0].message.content);
    
      this.pushChatContent(this.responseTurbo[0].message.content, 'ChiquiTronic', 'bot');
      /* this.myButton?.blur(); */
      this.hablar(this.responseTurbo[0].message.content);
      this.showSpinner = false;


    } catch (error: any) {
      this.showSpinner = false;
      // Consider adjusting the error handling logic for your use case
      if (error.response) {
        console.error(error.response.status, error.response.data);
        this.pushChatContent("Madre mía ¡¡ los cien caballos de bonanza se me han escapao ¡¡", 'ChiquiTronic', 'bot');

      } else {
        console.error(`Error with OpenAI API request: ${error.message}`);

      }
    }
  }

  rabbitState: string = '';

  startAnimation() {
    this.rabbitState = 'running';
    setTimeout(() => {
      this.rabbitState = 'love';
      setTimeout(() => {
        this.rabbitState = '';
      }, 500);
    }, 2000);
  }

  hablar(texto: string): void {
    const sintesis = window.speechSynthesis;
    this.mensaje = new SpeechSynthesisUtterance(texto);
    this.mensaje.lang = 'es-ES';
    sintesis.speak(this.mensaje);
  }

  pausarHablar(): void {
    const sintesis = window.speechSynthesis;
    if (sintesis.speaking && !sintesis.paused) {
      sintesis.pause();
    }
  }

  reanudarHablar(): void {
    const sintesis = window.speechSynthesis;
    if (sintesis.speaking && sintesis.paused) {
      sintesis.resume();
    }
  }

  cancelarHablar(): void {
    const sintesis = window.speechSynthesis;
    sintesis.cancel();
    this.mensaje = null; // Limpia el mensaje almacenado.
  }

  escuchar(): void {
    this.promptText = '';
    console.log("*** Activado escuchar() ***");
    const reconocimiento = new (window as any).webkitSpeechRecognition();
    reconocimiento.lang = 'es-ES';
    let timeout: ReturnType<typeof setTimeout>;

    reconocimiento.onresult = (event: any) => {
      clearTimeout(timeout);
      this.promptText = event.results[0][0].transcript;
      timeout = setTimeout(() => {
        /* reconocimiento.stop(); */
        reconocimiento.stop();
      }, 2000);

      console.log("***", this.promptText);
      console.log("*** FIN escuchar() ***");

      this.checkResponse();
    };
    reconocimiento.start();
  }
}

