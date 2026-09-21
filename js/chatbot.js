/* NeoFlow Academy — chatbot public (widget @n8n/chat)
 * Ne contient aucun secret : seule l'URL publique du webhook n8n est référencée.
 * Le workflow n8n correspondant est "NeoFlow Academy - Chatbot Site" (assistant PUBLIC, sans accès aux outils privés).
 */
(function () {
  'use strict';
  var CHAT_VERSION = '1.38.7';
  var WEBHOOK = 'https://n8n.neoflowacademy.com/webhook/29dfea5e-4d0b-4234-8592-36ad5af1fa08/chat';
  var lang = (document.documentElement.lang || 'fr').slice(0, 2) === 'en' ? 'en' : 'fr';

  var texts = {
    fr: {
      title: 'NeoFlow Academy',
      subtitle: 'Posez-moi vos questions sur les formations.',
      footer: 'Assistant virtuel — ne partagez pas d’informations sensibles.',
      inputPlaceholder: 'Votre message…',
      welcome: 'Bonjour ! Je suis l’assistant de NeoFlow Academy. Une question sur les formations, ou un message à transmettre à Regis ?'
    },
    en: {
      title: 'NeoFlow Academy',
      subtitle: 'Ask me about the training programs.',
      footer: 'Virtual assistant — please do not share sensitive information.',
      inputPlaceholder: 'Your message…',
      welcome: 'Hello! I am the NeoFlow Academy assistant. Any question about the programs, or a message to pass on to Regis?'
    }
  }[lang];

  var style = document.createElement('style');
  style.textContent =
    ':root{' +
    '--chat--color-primary:#a3121f;--chat--color-primary-shade-50:#c81a2a;--chat--color-primary-shade-100:#e15951;' +
    '--chat--color-secondary:#c9a44c;--chat--color-secondary-shade-50:#c9a44c;' +
    '--chat--color-white:#f2f0ec;--chat--color-light:#1e1c1a;--chat--color-light-shade-50:#2f2b27;--chat--color-light-shade-100:#2f2b27;' +
    '--chat--color-medium:#2f2b27;--chat--color-dark:#0f0f10;--chat--color-disabled:#6b665e;--chat--color-typing:#f2f0ec;' +
    '--chat--font-family:"Inter","Work Sans",-apple-system,BlinkMacSystemFont,sans-serif;' +
    '--chat--toggle--background:#a3121f;--chat--toggle--hover--background:#c81a2a;--chat--toggle--active--background:#c81a2a;--chat--toggle--color:#f2f0ec;' +
    '--chat--window--width:380px;--chat--window--height:560px;--chat--border-radius:3px;' +
    '--chat--header--background:#0f0f10;--chat--header--color:#f2f0ec;' +
    '--chat--message--bot--background:#1e1c1a;--chat--message--bot--color:#f2f0ec;' +
    '--chat--message--user--background:#a3121f;--chat--message--user--color:#f2f0ec;' +
    '--chat--body--background:#0f0f10;--chat--footer--background:#1e1c1a;--chat--footer--color:#f2f0ec;' +
    '--chat--input--background:#0f0f10;--chat--input--text-color:#f2f0ec;--chat--input--border:1px solid #2f2b27;--chat--input--send--button--color:#e15951;' +
    '--chat--header--border-bottom:1px solid #2f2b27;--chat--message--bot--border:1px solid #2f2b27;' +
    '}';
  document.head.appendChild(style);

  var link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = 'https://cdn.jsdelivr.net/npm/@n8n/chat@' + CHAT_VERSION + '/dist/style.css';
  document.head.appendChild(link);

  import('https://cdn.jsdelivr.net/npm/@n8n/chat@' + CHAT_VERSION + '/dist/chat.bundle.es.js')
    .then(function (mod) {
      var i18n = {};
      i18n[lang] = {
        title: texts.title,
        subtitle: texts.subtitle,
        footer: texts.footer,
        getStarted: lang === 'en' ? 'New conversation' : 'Nouvelle conversation',
        inputPlaceholder: texts.inputPlaceholder,
        closeButtonTooltip: lang === 'en' ? 'Close' : 'Fermer'
      };
      mod.createChat({
        webhookUrl: WEBHOOK,
        mode: 'window',
        showWelcomeScreen: false,
        loadPreviousSession: false,
        chatInputKey: 'chatInput',
        chatSessionKey: 'sessionId',
        defaultLanguage: lang,
        initialMessages: [texts.welcome],
        i18n: i18n
      });
    })
    .catch(function () { /* le site reste utilisable sans le chatbot */ });
})();
