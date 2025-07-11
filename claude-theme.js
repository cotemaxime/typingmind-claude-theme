(() => {
  'use strict';

  const CONFIG = {
    colors: {
      primary: '#D97706',
      secondary: '#F59E0B',
      background: '#FAFAFA',
      sidebar: '#FFFFFF',
      surface: '#FFFFFF',
      text: '#111827',
      textSecondary: '#6B7280',
      border: '#E5E7EB',
      hover: '#F3F4F6',
      userMessage: '#F0F9FF',
      assistantMessage: '#FFFFFF',
      codeBackground: '#F9FAFB',
      codeBorder: '#E5E7EB',
      orange: '#D97706',
      lightOrange: '#FED7AA'
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
    body: 'body',
    sidebar: '[data-element-id="nav-container"]',
    mainContent: '[data-element-id="main-content-area"]',
    newChatButton: 'button[class*="bg-orange"], button[class*="bg-amber"]',
    chatItem: 'div[class*="cursor-pointer"][class*="hover:"]',
    messageContainer: 'div[class*="message"], div[class*="chat-message"]',
    userMessage: 'div[class*="user"], div[class*="human"]',
    assistantMessage: 'div[class*="assistant"], div[class*="ai"]',
    codeBlock: 'pre, code',
    inputArea: 'textarea, input[type="text"]',
    sendButton: 'button[class*="send"], button[type="submit"]'
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

      /* New Chat Button - Orange accent */
      button[class*="bg-orange"], button[class*="bg-amber"], button[class*="new-chat"] {
        background-color: ${CONFIG.colors.orange} !important;
        color: white !important;
        border: none !important;
        border-radius: ${CONFIG.spacing.borderRadius} !important;
        padding: 8px 16px !important;
        font-weight: 500 !important;
        transition: all 0.2s ease !important;
      }

      button[class*="bg-orange"]:hover, button[class*="bg-amber"]:hover, button[class*="new-chat"]:hover {
        background-color: #B45309 !important;
        transform: translateY(-1px) !important;
      }

      /* Chat history items */
      nav div[class*="cursor-pointer"], div[class*="chat-item"] {
        background-color: transparent !important;
        color: ${CONFIG.colors.textSecondary} !important;
        border-radius: ${CONFIG.spacing.borderRadius} !important;
        margin: 2px 0 !important;
        padding: 8px 12px !important;
        transition: all 0.2s ease !important;
      }

      nav div[class*="cursor-pointer"]:hover, div[class*="chat-item"]:hover {
        background-color: ${CONFIG.colors.hover} !important;
        color: ${CONFIG.colors.text} !important;
      }

      /* Active chat item */
      nav div[class*="cursor-pointer"][class*="bg-"], div[class*="chat-item"][class*="bg-"] {
        background-color: ${CONFIG.colors.lightOrange} !important;
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

      /* Message containers */
      div[class*="message"], div[class*="chat-message"] {
        background-color: transparent !important;
        border: none !important;
        margin: ${CONFIG.spacing.margin} 0 !important;
        padding: ${CONFIG.spacing.padding} !important;
      }

      /* User messages - light blue background */
      div[class*="user"], div[class*="human"], div[data-message-author="user"] {
        background-color: ${CONFIG.colors.userMessage} !important;
        color: ${CONFIG.colors.text} !important;
        border-radius: ${CONFIG.spacing.borderRadius} !important;
        padding: ${CONFIG.spacing.padding} !important;
        border: 1px solid ${CONFIG.colors.border} !important;
      }

      /* Assistant messages - white background */
      div[class*="assistant"], div[class*="ai"], div[data-message-author="assistant"] {
        background-color: ${CONFIG.colors.assistantMessage} !important;
        color: ${CONFIG.colors.text} !important;
        border-radius: ${CONFIG.spacing.borderRadius} !important;
        padding: ${CONFIG.spacing.padding} !important;
        border: 1px solid ${CONFIG.colors.border} !important;
      }

      /* Message text */
      div[class*="message"] p, div[class*="chat-message"] p {
        color: ${CONFIG.colors.text} !important;
        line-height: 1.6 !important;
      }
    `;
    injectCSS(mainContentCSS);
  }

  function applyCodeBlockStyles() {
    const codeBlockCSS = `
      /* Code blocks */
      pre {
        background-color: ${CONFIG.colors.codeBackground} !important;
        border: 1px solid ${CONFIG.colors.codeBorder} !important;
        border-radius: ${CONFIG.spacing.borderRadius} !important;
        padding: ${CONFIG.spacing.padding} !important;
        overflow-x: auto !important;
        font-family: ${CONFIG.fonts.mono} !important;
      }

      pre code {
        background-color: transparent !important;
        color: ${CONFIG.colors.text} !important;
        font-family: ${CONFIG.fonts.mono} !important;
        padding: 0 !important;
      }

      /* Inline code */
      code {
        background-color: ${CONFIG.colors.codeBackground} !important;
        color: ${CONFIG.colors.text} !important;
        padding: 2px 4px !important;
        border-radius: 4px !important;
        font-family: ${CONFIG.fonts.mono} !important;
        border: 1px solid ${CONFIG.colors.codeBorder} !important;
      }

      /* Syntax highlighting for light theme */
      .hljs {
        background-color: ${CONFIG.colors.codeBackground} !important;
        color: ${CONFIG.colors.text} !important;
      }
    `;
    injectCSS(codeBlockCSS);
  }

  function applyInputAreaStyles() {
    const inputAreaCSS = `
      /* Input areas */
      textarea, input[type="text"] {
        background-color: ${CONFIG.colors.surface} !important;
        border: 1px solid ${CONFIG.colors.border} !important;
        border-radius: ${CONFIG.spacing.borderRadius} !important;
        color: ${CONFIG.colors.text} !important;
        padding: ${CONFIG.spacing.padding} !important;
        font-family: ${CONFIG.fonts.primary} !important;
      }

      textarea:focus, input[type="text"]:focus {
        border-color: ${CONFIG.colors.orange} !important;
        outline: none !important;
        box-shadow: 0 0 0 2px ${CONFIG.colors.orange}20 !important;
      }

      /* Send button */
      button[class*="send"], button[type="submit"] {
        background-color: ${CONFIG.colors.orange} !important;
        color: white !important;
        border: none !important;
        border-radius: ${CONFIG.spacing.borderRadius} !important;
        padding: 8px 16px !important;
        transition: all 0.2s ease !important;
        font-weight: 500 !important;
      }

      button[class*="send"]:hover, button[type="submit"]:hover {
        background-color: #B45309 !important;
      }

      button[class*="send"]:disabled, button[type="submit"]:disabled {
        background-color: ${CONFIG.colors.textSecondary} !important;
        cursor: not-allowed !important;
      }
    `;
    injectCSS(inputAreaCSS);
  }

  function applyGlobalStyles() {
    const globalCSS = `
      /* Force light mode */
      body {
        background-color: ${CONFIG.colors.background} !important;
        color: ${CONFIG.colors.text} !important;
        font-family: ${CONFIG.fonts.primary} !important;
      }

      /* Override dark mode classes */
      .dark {
        background-color: ${CONFIG.colors.background} !important;
        color: ${CONFIG.colors.text} !important;
      }

      /* Scrollbar styling */
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
        background-color: ${CONFIG.colors.textSecondary} !important;
      }

      /* Typography */
      h1, h2, h3, h4, h5, h6 {
        color: ${CONFIG.colors.text} !important;
      }

      /* Links */
      a {
        color: ${CONFIG.colors.orange} !important;
      }

      a:hover {
        color: #B45309 !important;
      }

      /* Form elements */
      button {
        font-family: ${CONFIG.fonts.primary} !important;
      }

      input, textarea {
        font-family: ${CONFIG.fonts.primary} !important;
      }

      /* Highlight */
      .highlight {
        background-color: ${CONFIG.colors.lightOrange} !important;
        padding: 2px 4px !important;
        border-radius: 4px !important;
      }

      /* Override any dark mode variables */
      :root {
        --main-dark-color: ${CONFIG.colors.background} !important;
      }
    `;
    injectCSS(globalCSS);
  }

  function styleElements() {
    // Force light mode by removing dark class
    document.documentElement.classList.remove('dark');
    document.body.classList.remove('dark');
    
    // Apply all styles
    applyGlobalStyles();
    applySidebarStyles();
    applyMainContentStyles();
    applyCodeBlockStyles();
    applyInputAreaStyles();
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
    console.log('Initializing Claude Light Theme...');
    
    styleElements();
    observeChanges();
    
    // Force light mode periodically
    setInterval(() => {
      document.documentElement.classList.remove('dark');
      document.body.classList.remove('dark');
    }, 1000);
    
    console.log('Claude Light Theme initialized successfully!');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initTheme);
  } else {
    initTheme();
  }

  setTimeout(initTheme, 1000);
})();