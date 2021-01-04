// Watson API
import dotenv from 'dotenv';
const result = dotenv.config();
import AssistantV2 from 'ibm-watson/assistant/v2.js';
import { IamAuthenticator } from 'ibm-watson/auth/index.js';

const authenticator = new IamAuthenticator({
    apikey: process.env.WATSON_ASSISTANT_APIKEY,
});

const assistant = new AssistantV2({
    version: '2020-09-24',
    authenticator: authenticator,
    serviceUrl: process.env.WATSON_ASSISTANT_URL,
    disableSslVerification: true,
});

// Firebase
// const firebase = require("firebase");
// const firebaseConfig = {
//     apiKey: "",
//     authDomain: "chatbotdiscord-b2ac8.firebaseapp.com",
//     projectId: "chatbotdiscord-b2ac8",
//     storageBucket: "chatbotdiscord-b2ac8.appspot.com",
//     messagingSenderId: "961853271431",
//     appId: "1:961853271431:web:89193a54f6136ca6433722",
//     measurementId: "G-EZ00747WLB"
// };
// const firebaseapp = firebase.initializeApp(firebaseConfig);
// const db = firebaseapp.firestore();

// Discord
import { Client, MessageEmbed } from 'discord.js';
import { CommandHandler } from './handlers/command-handler.js';

// Create an instance of a Discord client
const client = new Client();

const commandHandler = new CommandHandler();

commandHandler.init();

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
    
});

var sessionId = "";
var sessionMessage = "";
var idMessage = "";
// Depend on times-out of session id which was provided
var timeCheckSession = new Date();

client.on('message', async msg => {
    const guildTag = msg.channel.type === 'text' ? `[${msg.guild.name}]` : '[DM]';
    const channelTag = msg.channel.type === 'text' ? `[#${msg.channel.name}]` : '';
    console.log(`${guildTag}${channelTag} ${msg.author.tag}: ${msg.content}`);

    if ((!msg.author.client)) {
        return;
    } else {
        // Handle message content to action music content
        await commandHandler.handle(msg);

        // Condition message content of member is not BOT && ... 
        if ((msg.member.id !== "784631751456063530") && !msg.content.startsWith(".") && (sessionMessage.length > 0)) {
            // Set session id to get message
            assistant.message({
                assistantId: process.env.WATSON_ASSISTANT_ID,
                sessionId: sessionId,
                input: {
                    'message_type': 'text',
                    'text': msg.content.toLowerCase(),
                }
            })
                .then(res => {

                    console.log(JSON.stringify(res.result, null, 2));
                    //  Trường hợp chưa tranning
                    if ((res.result.output.intents.length === 0) && (res.result.output.entities.length === 0)) {
                        msg.reply(res.result.output.generic[0].text);
                    }

                    // Bắt đầu hội thoại
                    if ((res.result.output.entities.length === 0 && res.result.output.intents[0].intent.includes("action")) && (res.result.output.intents[0].confidence > 0.4)) {

                        // Hiển thị avatar
                        if (res.result.output.intents[0].intent.includes("action_43896_intent_46723")) {
                            msg.channel.send(msg.author.displayAvatarURL());
                        }
                        msg.reply(res.result.output.generic[0].text);
                        // --up wukong Trang bị ngộ không
                        if (res.result.output.intents[0].intent.includes("action_9108_intent_16763")) {
                            msg.channel.send("- Trang bị khởi đầu ", { files: ["./image/wukong/Wukong-Startup.png"] });
                            msg.channel.send("- Tỉ lệ thắng cao ", { files: ["./image/wukong/Wukong-HighWinRate.png"] });
                            msg.channel.send("- Khi team không Tanker ", { files: ["./image/wukong/Wukong-TeamNoTanker.png"] });
                            msg.channel.send("- Tỉ lệ thắng cao ", { files: ["./image/wukong/Wukong-ApEnemyOverDame.png"] });
                        }
                        // --up amumu Trang bị amumu
                        if (res.result.output.intents[0].intent.includes("action_49162_intent_49743")) {
                            msg.channel.send("- Trang bị khởi đầu ", { files: ["./image/amumu/Amumu-Startup.png"] });
                            msg.channel.send("- Tỉ lệ thắng cao ", { files: ["./image/amumu/Amumu-HighWinRate.png"] });
                            msg.channel.send("- Khi AD team địch quá mạnh ", { files: ["./image/amumu/Amumu-AdEnemyOverDame- 1.png"] });
                            msg.channel.send("- Khi AD Sát thủ team địch mạnh ", { files: ["./image/amumu/Amumu-AdSatThuOverDame.png"] });
                        }
                        // --up singled Trang bị singled
                        if (res.result.output.intents[0].intent.includes("action_9275_intent_48519")) {
                            msg.channel.send("- Trang bị khởi đầu ", { files: ["./image/singled/Singled-Startup.png"] });
                            msg.channel.send("- Khi đi đường Baron ", { files: ["./image/singled/Singled-3Ron.png"] });
                            msg.channel.send("- Khi AP Tanker team địch mạnh ", { files: ["./image/singled/Singled-ApTankEnemyOverDame.png"] });
                            msg.channel.send("- Khi AD Sát thủ team địch mạnh ", { files: ["./image/singled/Singled-AdSathuOverDame.png"] });
                        }
                        // --up nami Trang bị nami
                        if (res.result.output.intents[0].intent.includes("action_28194_intent_48421")) {
                            msg.channel.send("- Trang bị khởi đầu ", { files: ["./image/nami/Nami-Startup.png"] });
                            msg.channel.send("- Tỉ lệ thắng cao ", { files: ["./image/nami/Nami-HighWinRate.png"] });
                            msg.channel.send("- Khi AD Sát thủ team địch mạnh ", { files: ["./image/nami/Nami-AdSathuOverDame.png"] });
                            msg.channel.send("- Khi AP team địch mạnh ", { files: ["./image/nami/Nami-ApEnemyOverDame.png"] });
                        }
                        // --up sona Trang bị sona
                        if (res.result.output.intents[0].intent.includes("action_39743_intent_2078")) {
                            msg.channel.send("- Trang bị khởi đầu ", { files: ["./image/sona/Sona-Startup.png"] });
                            msg.channel.send("- Tỉ lệ thắng cao ", { files: ["./image/sona/Sona-HighWinRate.png"] });
                            msg.channel.send("- Khi AD Sát thủ team địch mạnh ", { files: ["./image/sona/Sona-AdSathuOverDame.png"] });
                            msg.channel.send("- Khi AP team địch mạnh ", { files: ["./image/sona/Sona-ApEnemyOverDame.png"] });
                        }
                        // --up mundo Trang bị mundo
                        if (res.result.output.intents[0].intent.includes("action_34728_intent_11980")) {
                            msg.channel.send("- Trang bị khởi đầu ", { files: ["./image/mundo/Mundo-Startup.png"] });
                            msg.channel.send("- Tỉ lệ thắng cao ", { files: ["./image/mundo/Mundo-HighWinRate.png"] });
                            msg.channel.send("- Khi AD Sát thủ team địch mạnh ", { files: ["./image/mundo/Mundo-Jungle.png"] });
                            msg.channel.send("- Khi AP team địch mạnh ", { files: ["./image/mundo/Mundo-ApEnemyOverDame.png"] });
                        }

                        // counter amumu
                        if (res.result.output.intents[0].intent.includes("action_23843_intent_24024")) {
                            msg.channel.send("👇👇👇👇", { files: ["./image/amumu/counter_amumu.png"] });
                        }
                        // counter mundo
                        if (res.result.output.intents[0].intent.includes("action_31090_intent_21613")) {
                            msg.channel.send("👇👇👇", { files: ["./image/mundo/counter_mundo.png"] });
                        }
                        // counter nami
                        if (res.result.output.intents[0].intent.includes("action_38136_intent_49785")) {
                            msg.channel.send("👇👇👇", { files: ["./image/nami/counter_nami.png"] });
                        }
                        // counter singled
                        if (res.result.output.intents[0].intent.includes("action_38926_intent_34929")) {
                            msg.channel.send("👇👇👇👇", { files: ["./image/singled/counter_singled.png"] });
                        }
                        // counter sona
                        if (res.result.output.intents[0].intent.includes("action_46425_intent_36344")) {
                            msg.channel.send("👇👇👇", { files: ["./image/sona/counter_sona.png"] });
                        }
                        // counter wukong
                        if (res.result.output.intents[0].intent.includes("action_44360_intent_28303")) {
                            msg.channel.send("👇👇👇👇", { files: ["./image/wukong/counter_wukong.png"] });
                        }

                        // Amumu win
                        if (res.result.output.intents[0].intent.includes("action_24322_intent_11088")) {
                            msg.channel.send("👇👇👇👇", { files: ["./image/amumu/Loi The.png"] });
                        }
                        // Mundo win
                        if (res.result.output.intents[0].intent.includes("action_36960_intent_26501")) {
                            msg.channel.send("👇👇👇👇", { files: ["./image/mundo/Loi The.png"] });
                        }
                        // Nami win
                        if (res.result.output.intents[0].intent.includes("action_22896_intent_25570")) {
                            msg.channel.send("👇👇👇👇", { files: ["./image/nami/Loi The.png"] });
                        }
                        // Singled win
                        if (res.result.output.intents[0].intent.includes("action_17456_intent_27562")) {
                            msg.channel.send("👇👇👇👇", { files: ["./image/singled/Loi The.png"] });
                        }    
                        // Sona win
                        if (res.result.output.intents[0].intent.includes("action_9807_intent_26115")) {
                            msg.channel.send("👇👇👇👇", { files: ["./image/sona/Loi The.png"] });
                        }
                        // Wukong win
                        if (res.result.output.intents[0].intent.includes("action_4014_intent_34350")) {
                            msg.channel.send("👇👇👇👇", { files: ["./image/wukong/Loi The.png"] });
                        }
                    }

                    // Khi hội thoại có sự lựa chọn
                    if ((res.result.output.entities[0].entity.includes("action") && res.result.output.intents.length === 0)) {
                        msg.reply(res.result.output.generic[0].text);
                    }
                    // Set default idMessage when bot replied
                    idMessage = 1;
                })
                .catch(err => {
                    console.log(err);
                });
        }

        if (msg.content.replace(/\s/g, '').toLowerCase() === "createsession") {
            msg.reply("🕤 Waiting ....");
            assistant.createSession({
                assistantId: process.env.WATSON_ASSISTANT_ID,
            })
                .then(res => {
                    console.log(JSON.stringify(res.result, null, 2));
                    if (res.result.session_id != null) {
                        sessionId = res.result.session_id;
                        sessionMessage = "SUCCESS";
                        timeCheckSession = timeCheckSession.getMinutes();
                        if(timeCheckSession < 55){

                        }
                        console.log(timeCheckSession);
                        msg.reply(" ✅-SUCCESS");
                    }
                })
                .catch(err => {
                    console.log(err);
                    msg.reply("Creating session id failed 😥 I'm sorry.");
                });
        }

        if (msg.content.replace(/\s/g, '').toLowerCase() === "guide") {
            const embed = new MessageEmbed()
                // Set the title of the field
                .setTitle('Hướng dẫn sử dụng')
                // Set the color of the embed
                .setColor(418484)
                // Set the main content of the embed
                .setDescription('🎵 🎶 🎵\n- ".play <url>": Play\n- ".<stop,pause,resume,seek,skip,list>": Handle\n- "create session": 👇Use function below👇\n- "--up <champion_name>": Xem cách lên trang bị\n- "counter <champion_name>" or "--ct <champion_name": Xem tướng khắc chế\n- "my avatar": Lấy avatar của bạn');
            msg.channel.send(embed);
        }

        if (idMessage === "1") {
            msg.channel.send("- Hãy ra lệnh cho tôi 😜😜");
            idMessage = "";
        }
    }
});

client.login(process.env.TOKEN);

// Mundo amumu