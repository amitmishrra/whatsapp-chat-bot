const { Configuration, OpenAIApi } = require("openai");
const qrcode = require('qrcode-terminal');
const { Client } = require('whatsapp-web.js');
const configuration = new Configuration({
  apiKey: "YOUR_API_KEY",
});
const openai = new OpenAIApi(configuration);
const answer = '';

const client = new Client();

client.on('qr', qr => {
    qrcode.generate(qr, {small: true});
});

client.on('ready', () => {
    console.log('Client is ready!');
});

client.on('message', msg => {

    if(msg.body.toLocaleLowerCase == 'hello' || msg.body.toLocaleLowerCase == 'hi' || msg.body.toLocaleLowerCase == 'hey') {
        msg.reply('Please send your question!');
    }
    else{
        openai.createCompletion({
            model: "text-davinci-003",
            prompt: `I am a highly intelligent question answering bot. If you ask me a question that is rooted in truth, I will give you the answer. If you ask me a question that is nonsense, trickery, or has no clear answer, I will respond with \"Unknown\".\n\nQ: What is human life expectancy in the United States?\nA: Human life expectancy in the United States is 78 years.\n\nQ: Who was president of the United States in 1955?\nA: Dwight D. Eisenhower was president of the United States in 1955.\n\nQ: Which party did he belong to?\nA: He belonged to the Republican Party.\n\nQ: What is the square root of banana?\nA: Unknown\n\nQ: How does a telescope work?\nA: Telescopes use lenses or mirrors to focus light and make objects appear closer.\n\nQ: Where were the 1992 Olympics held?\nA: The 1992 Olympics were held in Barcelona, Spain.\n\nQ: How many squigs are in a bonk?\nA: Unknown\n\nQ: ${msg.body}\nA:`,
            temperature: 0,
            max_tokens: 100,
            top_p: 1,
            frequency_penalty: 0.0,
            presence_penalty: 0.0,
            stop: ["\n"],
          }).then((response) => {
              if(response.data.choices[0].text == 'Unknown'){
                msg.reply('Sorry! I don\'t know the answer to that question!');
              }else{
                msg.reply(response.data.choices[0].text);
              }
          });
    }
});

client.initialize();


    /*                                                                                                            
                                              ██████                                    
                                            ██      ██                                  
                                          ██          ██                                
                                          ██      ██  ██                                
                                          ██        ░░░░██                              
                                            ██      ████                                
                              ██              ██  ██                                    
                            ██  ██        ████    ██                                    
                            ██    ████████          ██                                  
                            ██                        ██                                
                              ██              ██      ██                                
                              ██    ██      ██        ██                                
                                ██    ████████      ██                                  
                                ██                  ██                                  
                                  ████          ████                                    
                                      ██████████           
                                      
                                      
                            -------- by 4m17m15hr4 ---------

*/
