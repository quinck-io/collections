const fs = require('fs')

const successIcons = [':unicorn:', ':man_dancing:', ':ghost:', ':dancer:', ':scream_cat:']
const failureIcons = [':fire:', 'dizzy_face', ':man_facepalming:', ':poop:', ':skull:']

/**
 * Get a random success message
 * @param {string} author
 * @returns {string[]}
 */
const successMessages = author => [
    `:champagne::champagne:Congrats **${author}**, you made it. :sunglasses::champagne::champagne:`,
    `:moyai::moyai:Mah man **${author}**, you made it. :women_with_bunny_ears_partying::moyai::moyai:`,
    `:burrito::burrito:**${author}**, you did well. :women_with_bunny_ears_partying::burrito::burrito:`,
    `:pig::pig: **${author}** You son of a bitch, you did it. :women_with_bunny_ears_partying::pig::pig:`,
    `:ferris_wheel::ferris_wheel:**${author}** You're great.:ferris_wheel::ferris_wheel: `,
]

/**
 * Get a random failures message
 * @param {string} author
 * @returns {string[]}
 */
const failureMessages = author => [
    `:fire::fire:* **${author}**, You're an idiot!*:fire::fire:`,
    `:bomb::bomb:*${author}*, How could this happen?:bomb::bomb:`,
    `:pouting_cat: :pouting_cat: *${author}*, What the hell are you doing?:pouting_cat: :pouting_cat:`,
    `:face_vomiting::face_vomiting:*${author}*, This commit made my mom cry!:face_vomiting::face_vomiting:`,
    `:facepalm::facepalm:${author}, Come on, at least offer a coffee before making such a commit!:facepalm::facepalm:`,
]

/**
 * Get a random status icon and message
 * @param {string[]} icons
 * @param {string[]} messages
 * @returns {{statusIcon: string, statusMessage: string}}
 */
const getStatusInfo = (icons, messages) => ({
    statusIcon: icons[Math.floor(Math.random() * icons.length)],
    statusMessage: messages[Math.floor(Math.random() * messages.length)],
})

async function sendDiscordWebhook(webhookUrl, status, projectName, color, refName, event) {
    const { statusIcon, statusMessage } =
        status === 'success'
            ? getStatusInfo(successIcons, successMessages(event.head_commit.author.name))
            : getStatusInfo(failureIcons, failureMessages(event.head_commit.author.name))

    const embedDescription = `
${statusIcon} Status: *${status.toUpperCase()}*

SonarResult: TBD

${statusMessage}
`

    const footerText = `
Commit: ${event.head_commit.timestamp}
Message: ${event.head_commit.message}
Hash: ${event.head_commit.id.slice(0, 7)}
`

    const embed = {
        title: `${projectName}/${refName}`,
        url: `${process.env.GITHUB_SERVER_URL}/${process.env.GITHUB_REPOSITORY}/actions/runs/${process.env.GITHUB_RUN_ID}`,
        description: embedDescription,
        footer: {
            text: footerText,
        },
    }

    if (color) embed.color = parseInt(color)

    const body = JSON.stringify({
        username: 'GitHub Actions',
        embeds: [embed],
    })

    await fetch(webhookUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: body,
    })
}

const nameOf = obj => Object.keys(obj)[0]
const required = obj => {
    const name = nameOf(obj)
    if (!obj[name]) {
        throw new Error(`Required parameter ${name} is not set.`)
    }
    return obj[name]
}

const webhookUrl = process.env.INPUT_WEBHOOKURL
const status = process.env.INPUT_STATUS
const projectName = process.env.INPUT_PROJECTNAME
const color = process.env.INPUT_COLOR
const eventPath = process.env.GITHUB_EVENT_PATH

required({ webhookUrl })
required({ status })
required({ projectName })
required({ eventPath })

if (eventPath) {
    const refName = process.env.GITHUB_REF_NAME
    const event = JSON.parse(fs.readFileSync(eventPath, 'utf8'))

    sendDiscordWebhook(webhookUrl, status, projectName, color, refName, event)
} else {
    console.log('GITHUB_EVENT_PATH environment variable is not set.')
}