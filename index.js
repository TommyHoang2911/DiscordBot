// Import the native fs module
const fs = require('fs');
// Watson API
const AssistantV2 = require('ibm-watson/assistant/v2');
const { IamAuthenticator } = require('ibm-watson/auth');

const authenticator = new IamAuthenticator({
    apikey: "QcK1rAuqBmJicO8Ykl88mT0k0LF-mF8ZVbJidInHfVx3",
});

const assistant = new AssistantV2({
    version: '2020-09-24',
    authenticator: authenticator,
    serviceUrl: 'https://api.au-syd.assistant.watson.cloud.ibm.com/instances/c5546b41-9d1b-4e41-9d42-08614ed2bcb9',
    disableSslVerification: true,
});
var sessionId = "";
assistant.createSession({
    assistantId: '7b8bb4ee-5a4b-4547-8f3e-30417ec1a060',
})
    .then(res => {
        console.log(JSON.stringify(res.result, null, 2));
        if (res.result.session_id != null) {
            sessionId = res.result.session_id;
        }
    })
    .catch(err => {
        console.log(err);
    });

// Firebase
const firebase = require("firebase");
const firebaseConfig = {
    apiKey: "AIzaSyBoB1PRNVxkU8b9hw7-czGgypyQKNUk4bE",
    authDomain: "chatbotdiscord-b2ac8.firebaseapp.com",
    projectId: "chatbotdiscord-b2ac8",
    storageBucket: "chatbotdiscord-b2ac8.appspot.com",
    messagingSenderId: "961853271431",
    appId: "1:961853271431:web:89193a54f6136ca6433722",
    measurementId: "G-EZ00747WLB"
};

const firebaseapp = firebase.initializeApp(firebaseConfig);

const db = firebaseapp.firestore();

// Discord
const { Client, MessageEmbed, MessageAttachment } = require('discord.js');

// Create an instance of a Discord client
const client = new Client();

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

var idMessage = "";

client.on('message', msg => {

    assistant.message({
        assistantId: '7b8bb4ee-5a4b-4547-8f3e-30417ec1a060',
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
                // msg.reply("Error + "+ res.result.output.generic[0].text);
            }

            // Bắt đầu hội thoại
            if ((res.result.output.entities.length === 0 && res.result.output.intents[0].intent.includes("action"))) {

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
                    idMessage = "1";
                }
                // --up amumu Trang bị amumu
                if (res.result.output.intents[0].intent.includes("action_49162_intent_49743")) {
                    msg.channel.send("- Trang bị khởi đầu ", { files: ["./image/amumu/Amumu-Startup.png"] });
                    msg.channel.send("- Tỉ lệ thắng cao ", { files: ["./image/amumu/Amumu-HighWinRate.png"] });
                    msg.channel.send("- Khi AD team địch quá mạnh ", { files: ["./image/amumu/AdEnemyOverDame- 1.png"] });
                    msg.channel.send("- Khi AD Sát thủ team địch mạnh ", { files: ["./image/amumu/Amumu-AdSatThuOverDame.png"] });
                    idMessage = "1";
                }
                // --up singled Trang bị singled
                if (res.result.output.intents[0].intent.includes("action_9275_intent_48519")) {
                    msg.channel.send("- Trang bị khởi đầu ", { files: ["./image/singled/Singled-Startup.png"] });
                    msg.channel.send("- Khi đi đường Baron ", { files: ["./image/singled/Singled-3Ron.png"] });
                    msg.channel.send("- Khi AP Tanker team địch mạnh ", { files: ["./image/singled/Singled-ApTankEnemyOverDame.png"] });
                    msg.channel.send("- Khi AD Sát thủ team địch mạnh ", { files: ["./image/singled/Singled-AdSathuOverDame.png"] });
                    idMessage = "1";
                }
                // --up nami Trang bị nami
                if (res.result.output.intents[0].intent.includes("action_28194_intent_48421")) {
                    msg.channel.send("- Trang bị khởi đầu ", { files: ["./image/nami/Nami-Startup.png"] });
                    msg.channel.send("- Tỉ lệ thắng cao ", { files: ["./image/nami/Nami-HighWinRate.png"] });
                    msg.channel.send("- Khi AD Sát thủ team địch mạnh ", { files: ["./image/nami/Nami-AdSathuOverDame.png"] });
                    msg.channel.send("- Khi AP team địch mạnh ", { files: ["./image/nami/Nami-ApEnemyOverDame.png"] });
                    idMessage = "1";
                }
                // --up sona Trang bị sona
                if (res.result.output.intents[0].intent.includes("action_39743_intent_2078")) {
                    msg.channel.send("- Trang bị khởi đầu ", { files: ["./image/sona/Sona-Startup.png"] });
                    msg.channel.send("- Tỉ lệ thắng cao ", { files: ["./image/sona/Sona-HighWinRate.png"] });
                    msg.channel.send("- Khi AD Sát thủ team địch mạnh ", { files: ["./image/sona/Sona-AdSathuOverDame.png"] });
                    msg.channel.send("- Khi AP team địch mạnh ", { files: ["./image/sona/Sona-ApEnemyOverDame.png"] });
                    idMessage = "1";
                }
                // --up mundo Trang bị mundo
                if (res.result.output.intents[0].intent.includes("action_34728_intent_11980")) {
                    msg.channel.send("- Trang bị khởi đầu ", { files: ["./image/mundo/Mundo-Startup.png"] });
                    msg.channel.send("- Tỉ lệ thắng cao ", { files: ["./image/mundo/Mundo-HighWinRate.png"] });
                    msg.channel.send("- Khi AD Sát thủ team địch mạnh ", { files: ["./image/mundo/Mundo-Jungle~.png"] });
                    msg.channel.send("- Khi AP team địch mạnh ", { files: ["./image/mundo/Mundo-ApEnemyOverDame.png"] });
                    idMessage = "1";
                }

                // counter amumu
                if (res.result.output.intents[0].intent.includes("action_23843_intent_24024")) {
                    msg.channel.send("👇👇👇👇", { files: ["./image/amumu/counter_amumu.png"] });
                    idMessage = "1";
                }
                // counter mundo
                if (res.result.output.intents[0].intent.includes("action_31090_intent_21613")) {
                    msg.channel.send("👇👇👇", { files: ["./image/mundo/counter_mundo.png"] });
                    idMessage = "1";
                }
                // counter nami
                if (res.result.output.intents[0].intent.includes("action_38136_intent_49785")) {
                    msg.channel.send("👇👇👇", { files: ["./image/nami/counter_nami.png"] });
                    idMessage = "1";
                }
                // counter singled
                if (res.result.output.intents[0].intent.includes("action_38926_intent_34929")) {
                    msg.channel.send("👇👇👇👇", { files: ["./image/singled/counter_singled.png"] });
                    idMessage = "1";
                }
                // counter sona
                if (res.result.output.intents[0].intent.includes("action_46425_intent_36344")) {
                    msg.channel.send("👇👇👇", { files: ["./image/sona/counter_sona.png"] });
                    idMessage = "1";
                }
                // counter wukong
                if (res.result.output.intents[0].intent.includes("action_44360_intent_28303")) {
                    msg.channel.send("👇👇👇👇", { files: ["./image/wukong/counter_wukong.png"] });
                    idMessage = "1";
                }
            }

            // Khi hội thoại có sự lựa chọn
            if ((res.result.output.entities[0].entity.includes("action") && res.result.output.intents.length === 0)) {
                msg.reply(res.result.output.generic[0].text);
            }
        })
        .catch(err => {
            console.log(err);
        });

    if (idMessage === "1") {
        msg.reply("- Hãy đặt câu hỏi cho tôi 😜😜");
        idMessage = "";
    }

});

client.on('guildMemberAdd', member => {
    // Send the message to a designated channel on a server:
    const channel = member.guild.channels.cache.find(ch => ch.name === 'member-log');
    // Do nothing if the channel wasn't found on this server
    if (!channel) return;
    // Send the message, mentioning the member
    channel.send(`Welcome to the server, ${member}`);
});


client.login('Nzg0NjMxNzUxNDU2MDYzNTMw.X8sHQw._Z5K85nNxSbA3-CB1gZqvPS-kME');