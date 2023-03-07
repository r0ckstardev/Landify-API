import { EmbedBuilder, WebhookClient } from "discord.js";

const wh = new WebhookClient({ url: process.env.WEBHOOK_URL || "https://discord.com/api/webhooks/1081654136648519750/4b9BriBbDQDZDzA3lZhhcGA3EhrGpjG-ejrhCnDtDpgKnxhZ-QzudWl8kfFlHVkQ009a" });

export async function logger(req, res, next) {
    // wh.edit({
    //     name: 'Landify',
    //     avatar: 'https://cdn.discordapp.com/attachments/1070382362195664897/1081444388053450782/HlRKb2gX.png',
    //     channel: '1081442961021218837',
    // })
    let {password, email, ...a}=req.body
    var incomingIP = req.ip.split(':').pop();
    const logEmbed = new EmbedBuilder()
    .setColor(0x2C2F33)
    .setTitle(`Request Recieved.`)
    .addFields(
        { name: "Request type:", value: `\`\`\`${req.method}\`\`\``, inline: true },
        { name: "Request endpoint", value: `\`\`\`${req.url}\`\`\``, inline: true },
        { name: "Request IP Adress", value: `\`\`\`${incomingIP}\`\`\``, inline: true }
    )
    .setDescription(`\`\`\`json\n${JSON.stringify(a, null, 2)}\`\`\``)

    wh.send({ embeds: [logEmbed] })
    next()
} 

