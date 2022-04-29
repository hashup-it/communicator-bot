'use strict'

const botBuilder = require('claudia-bot-builder')
const telegramTemplate = botBuilder.telegramTemplate

const Actions = {
  Website: 'Website',
  Whitepaper: 'Whitepaper',
  Menu: 'Menu',
  Airdrop: 'Airdrop',
  InfoSoon: 'InfoSoon',
  Twitter: 'Twitter',
}

const Reactions = {
  [Actions.Menu]: () => new telegramTemplate.Text(`Menu:`)
      .addReplyKeyboard([
        ['/website', '/whitepaper', '/twitter'],
        ['/listing', '/airdrop', '/ICO', '/IDO'],
      ], true, true)
      .get(),
  [Actions.Website]: () => new telegramTemplate.Text(`Visit our website:`).addInlineKeyboard([
    [{ text: 'Open HashUp.IT', url: 'https://hashup.it/' }]
  ]).get(),
  [Actions.Whitepaper]: () => new telegramTemplate.Text('Read our Whitepaper:').addInlineKeyboard([
    [{ text: 'Open Whitepaper', url: 'https://hashup.it/documents/whitepapers/whitepaper-en.pdf' }]
  ]).get(),
  [Actions.Airdrop]: () => `Unfortunately you didn't catch the last airdrop 😦 But the next one will be here soon!`,
  [Actions.InfoSoon]: () => `Official information will be announced soon, stay tuned!`,
  [Actions.Twitter]: () => new telegramTemplate.Text(`Follow us on Twitter!`).addInlineKeyboard([
    [{ text: 'Link here', url: 'https://twitter.com/HashUp_it' }]
  ]).get()
}

const api = botBuilder(response => {
  console.warn(response)
  const message = response.text.toLowerCase();

  if (message.startsWith('/menu'))
    return Reactions[Actions.Menu]();
  else if (message.startsWith('/website'))
    return Reactions[Actions.Website]();
  else if (message.startsWith('/whitepaper'))
    return Reactions[Actions.Whitepaper]();
  else if (message.startsWith('/airdrop'))
    return Reactions[Actions.Airdrop]();
  else if (message.startsWith('/listing') || message.startsWith('/ico') || message.startsWith('/ido'))
    return Reactions[Actions.InfoSoon]();
  else if (message.startsWith('/twitter'))
    return Reactions[Actions.Twitter]();
})

module.exports = api;
