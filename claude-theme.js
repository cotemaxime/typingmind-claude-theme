(() => {
  'use strict';

  const CONFIG = {
    colors: {
      primary: '#FF6B35',
      background: '#1F1F1F',
      sidebar: '#2F2F2F',
      surface: '#343434',
      text: '#FFFFFF',
      textSecondary: '#B0B0B0',
      border: '#404040',
      hover: '#3A3A3A',
      userMessage: '#2F2F2F',
      assistantMessage: '#1F1F1F',
      codeBackground: '#0D1117',
      codeBorder: '#30363D'
    },
    fonts: {
      primary: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      mono: 'ui-monospace, SFMono-Regular, "SF Mono", Menlo, Monaco, Consolas, monospace'
    },
    spacing: {
      borderRadius: '8px',
      padding: '12px',
      margin: '8px'
    }
  };

  const SELECTORS = {
    sidebar: '[data-element-id="sidebar"]',
    newChatButton: '[data-element-id="new-chat-button"]',
    chatHistory: '[data-element-id="chat-history"]',
    chatItem: '[data-element-id="chat-item"]',
    messageContainer: '[data-element-id="message-container"]',
    userMessage: '[data-element-id="user-message"]',
    assistantMessage: '[data-element-id="assistant-message"]',
    codeBlock: '[data-element-id="code-block"]',
    inputArea: '[data-element-id="input-area"]',
    sendButton: '[data-element-id="send-button"]',
    mainContent: '[data-element-id="main-content"]',
    messageText: '[data-element-id="message-text"]'
  };

  function injectCSS(css) {
    const style = document.createElement('style');
    style.textContent = css;
    document.head.appendChild(style);
  }

  function applySidebarStyles() {
    const sidebarCSS = `
      ${SELECTORS.sidebar} {
        background-color: ${CONFIG.colors.sidebar} !important;
        border-right: 1px solid ${CONFIG.colors.border} !important;
        color: ${CONFIG.colors.text} !important;
      }

      ${SELECTORS.newChatButton} {
        background-color: ${CONFIG.colors.primary} !important;
        color: white !important;
        border: none !important;
        border-radius: ${CONFIG.spacing.borderRadius} !important;
        padding: ${CONFIG.spacing.padding} !important;
        font-weight: 500 !important;
        transition: all 0.2s ease !important;
      }

      ${SELECTORS.newChatButton}:hover {
        background-color: #E85A2B !important;
        transform: translateY(-1px) !important;
      }

      ${SELECTORS.chatHistory} {
        background-color: transparent !important;
      }

      ${SELECTORS.chatItem} {
        background-color: transparent !important;
        color: ${CONFIG.colors.textSecondary} !important;
        border-radius: ${CONFIG.spacing.borderRadius} !important;
        margin: 4px 0 !important;
        padding: 8px 12px !important;
        transition: all 0.2s ease !important;
      }

      ${SELECTORS.chatItem}:hover {
        background-color: ${CONFIG.colors.hover} !important;
        color: ${CONFIG.colors.text} !important;
      }

      ${SELECTORS.chatItem}[data-selected="true"] {
        background-color: ${CONFIG.colors.surface} !important;
        color: ${CONFIG.colors.text} !important;
      }
    `;
    injectCSS(sidebarCSS);
  }

  function applyMainContentStyles() {
    const mainContentCSS = `
      ${SELECTORS.mainContent} {
        background-color: ${CONFIG.colors.background} !important;
        color: ${CONFIG.colors.text} !important;
        font-family: ${CONFIG.fonts.primary} !important;
      }

      ${SELECTORS.messageContainer} {
        background-color: transparent !important;
        border: none !important;
        margin: ${CONFIG.spacing.margin} 0 !important;
        padding: ${CONFIG.spacing.padding} !important;
      }

      ${SELECTORS.userMessage} {
        background-color: ${CONFIG.colors.userMessage} !important;
        color: ${CONFIG.colors.text} !important;
        border-radius: ${CONFIG.spacing.borderRadius} !important;
        padding: ${CONFIG.spacing.padding} !important;
        margin-left: auto !important;
        max-width: 80% !important;
        border: 1px solid ${CONFIG.colors.border} !important;
      }

      ${SELECTORS.assistantMessage} {
        background-color: ${CONFIG.colors.assistantMessage} !important;
        color: ${CONFIG.colors.text} !important;
        border-radius: ${CONFIG.spacing.borderRadius} !important;
        padding: ${CONFIG.spacing.padding} !important;
        margin-right: auto !important;
        max-width: 80% !important;
        border: 1px solid ${CONFIG.colors.border} !important;
      }

      ${SELECTORS.messageText} {
        color: ${CONFIG.colors.text} !important;
        line-height: 1.6 !important;
      }
    `;
    injectCSS(mainContentCSS);
  }

  function applyCodeBlockStyles() {
    const codeBlockCSS = `
      ${SELECTORS.codeBlock} {
        background-color: ${CONFIG.colors.codeBackground} !important;
        border: 1px solid ${CONFIG.colors.codeBorder} !important;
        border-radius: ${CONFIG.spacing.borderRadius} !important;
        padding: ${CONFIG.spacing.padding} !important;
        font-family: ${CONFIG.fonts.mono} !important;
        overflow-x: auto !important;
      }

      ${SELECTORS.codeBlock} code {
        background-color: transparent !important;
        color: #E6EDF3 !important;
        font-family: ${CONFIG.fonts.mono} !important;
      }

      pre {
        background-color: ${CONFIG.colors.codeBackground} !important;
        border: 1px solid ${CONFIG.colors.codeBorder} !important;
        border-radius: ${CONFIG.spacing.borderRadius} !important;
        padding: ${CONFIG.spacing.padding} !important;
        overflow-x: auto !important;
      }

      code {
        background-color: ${CONFIG.colors.surface} !important;
        color: ${CONFIG.colors.text} !important;
        padding: 2px 4px !important;
        border-radius: 4px !important;
        font-family: ${CONFIG.fonts.mono} !important;
      }
    `;
    injectCSS(codeBlockCSS);
  }

  function applyInputAreaStyles() {
    const inputAreaCSS = `
      ${SELECTORS.inputArea} {
        background-color: ${CONFIG.colors.surface} !important;
        border: 1px solid ${CONFIG.colors.border} !important;
        border-radius: ${CONFIG.spacing.borderRadius} !important;
        color: ${CONFIG.colors.text} !important;
        padding: ${CONFIG.spacing.padding} !important;
        font-family: ${CONFIG.fonts.primary} !important;
      }

      ${SELECTORS.inputArea}:focus {
        border-color: ${CONFIG.colors.primary} !important;
        outline: none !important;
        box-shadow: 0 0 0 2px ${CONFIG.colors.primary}20 !important;
      }

      ${SELECTORS.sendButton} {
        background-color: ${CONFIG.colors.primary} !important;
        color: white !important;
        border: none !important;
        border-radius: ${CONFIG.spacing.borderRadius} !important;
        padding: ${CONFIG.spacing.padding} !important;
        transition: all 0.2s ease !important;
      }

      ${SELECTORS.sendButton}:hover {
        background-color: #E85A2B !important;
      }

      ${SELECTORS.sendButton}:disabled {
        background-color: ${CONFIG.colors.textSecondary} !important;
        cursor: not-allowed !important;
      }
    `;
    injectCSS(inputAreaCSS);
  }

  function applyGlobalStyles() {
    const globalCSS = `
      body {
        background-color: ${CONFIG.colors.background} !important;
        color: ${CONFIG.colors.text} !important;
        font-family: ${CONFIG.fonts.primary} !important;
      }

      * {
        scrollbar-width: thin !important;
        scrollbar-color: ${CONFIG.colors.border} transparent !important;
      }

      *::-webkit-scrollbar {
        width: 8px !important;
        height: 8px !important;
      }

      *::-webkit-scrollbar-track {
        background: transparent !important;
      }

      *::-webkit-scrollbar-thumb {
        background-color: ${CONFIG.colors.border} !important;
        border-radius: 4px !important;
      }

      *::-webkit-scrollbar-thumb:hover {
        background-color: ${CONFIG.colors.hover} !important;
      }

      h1, h2, h3, h4, h5, h6 {
        color: ${CONFIG.colors.text} !important;
      }

      a {
        color: ${CONFIG.colors.primary} !important;
      }

      a:hover {
        color: #E85A2B !important;
      }

      button {
        font-family: ${CONFIG.fonts.primary} !important;
      }

      input, textarea {
        font-family: ${CONFIG.fonts.primary} !important;
      }

      .highlight {
        background-color: ${CONFIG.colors.primary}20 !important;
        padding: 2px 4px !important;
        border-radius: 4px !important;
      }
    `;
    injectCSS(globalCSS);
  }

  function styleElements() {
    const allElements = document.querySelectorAll('*');
    allElements.forEach(element => {
      if (element.dataset.elementId) {
        switch (element.dataset.elementId) {
          case 'sidebar':
          case 'new-chat-button':
          case 'chat-history':
          case 'chat-item':
            applySidebarStyles();
            break;
          case 'main-content':
          case 'message-container':
          case 'user-message':
          case 'assistant-message':
          case 'message-text':
            applyMainContentStyles();
            break;
          case 'code-block':
            applyCodeBlockStyles();
            break;
          case 'input-area':
          case 'send-button':
            applyInputAreaStyles();
            break;
        }
      }
    });
  }

  function observeChanges() {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'childList') {
          mutation.addedNodes.forEach((node) => {
            if (node.nodeType === Node.ELEMENT_NODE) {
              styleElements();
            }
          });
        }
      });
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
  }

  function initTheme() {
    console.log('Initializing Claude Theme...');
    
    applyGlobalStyles();
    applySidebarStyles();
    applyMainContentStyles();
    applyCodeBlockStyles();
    applyInputAreaStyles();
    
    styleElements();
    observeChanges();
    
    console.log('Claude Theme initialized successfully!');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initTheme);
  } else {
    initTheme();
  }

  setTimeout(initTheme, 1000);
})();