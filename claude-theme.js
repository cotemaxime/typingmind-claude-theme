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
      /* Sidebar container - target exact classes from inspector */
      [data-element-id="nav-container"],
      nav[data-element-id="side-bar-background"],
      .jsx-7078ffb922cb3c38 {
        background-color: ${CONFIG.colors.sidebar} !important;
        border-right: 1px solid ${CONFIG.colors.border} !important;
        color: ${CONFIG.colors.text} !important;
      }

      /* New Chat Button - exact selector from inspector */
      button[data-element-id="new-chat-button-in-side-bar"],
      button[class*="bg-blue-600"] {
        background-color: ${CONFIG.colors.orange} !important;
        color: white !important;
        border: none !important;
        border-radius: ${CONFIG.spacing.borderRadius} !important;
        padding: 8px 16px !important;
        font-weight: 500 !important;
        transition: all 0.2s ease !important;
      }

      button[data-element-id="new-chat-button-in-side-bar"]:hover,
      button[class*="bg-blue-600"]:hover {
        background-color: #B45309 !important;
        transform: translateY(-1px) !important;
      }

      /* Sidebar beginning part */
      div[data-element-id="sidebar-beginning-part"] {
        background-color: ${CONFIG.colors.sidebar} !important;
      }

      /* Chat history items */
      nav div[class*="cursor-pointer"],
      div[class*="jsx-"] div[class*="cursor-pointer"],
      div[role="button"] {
        background-color: transparent !important;
        color: ${CONFIG.colors.textSecondary} !important;
        border-radius: ${CONFIG.spacing.borderRadius} !important;
        margin: 2px 0 !important;
        padding: 8px 12px !important;
        transition: all 0.2s ease !important;
      }

      nav div[class*="cursor-pointer"]:hover,
      div[class*="jsx-"] div[class*="cursor-pointer"]:hover,
      div[role="button"]:hover {
        background-color: ${CONFIG.colors.hover} !important;
        color: ${CONFIG.colors.text} !important;
      }

      /* Active/selected chat item */
      nav div[class*="cursor-pointer"][class*="bg-"],
      div[class*="jsx-"] div[class*="bg-"] {
        background-color: ${CONFIG.colors.lightOrange} !important;
        color: ${CONFIG.colors.text} !important;
      }
    `;
    injectCSS(sidebarCSS);
  }

  function applyMainContentStyles() {
    const mainContentCSS = `
      /* Main content area - target the actual main content */
      [data-element-id="main-content-area"],
      div[class*="jsx-"][class*="flex-1"],
      div[class*="jsx-"][class*="pl-"],
      main,
      div[class*="jsx-"][class*="overflow-y-auto"] {
        background-color: ${CONFIG.colors.background} !important;
        color: ${CONFIG.colors.text} !important;
        font-family: ${CONFIG.fonts.primary} !important;
      }

      /* Message containers */
      div[class*="jsx-"] div[class*="message"],
      div[class*="jsx-"] div[class*="chat"],
      div[class*="jsx-"] div[class*="flex"][class*="gap-"] {
        background-color: transparent !important;
        border: none !important;
        margin: ${CONFIG.spacing.margin} 0 !important;
        padding: ${CONFIG.spacing.padding} !important;
      }

      /* User messages - light blue background */
      div[class*="jsx-"] div[class*="user"],
      div[class*="jsx-"] div[class*="human"],
      div[data-message-author="user"],
      div[class*="jsx-"] div:has([data-message-author="user"]) {
        background-color: ${CONFIG.colors.userMessage} !important;
        color: ${CONFIG.colors.text} !important;
        border-radius: ${CONFIG.spacing.borderRadius} !important;
        padding: ${CONFIG.spacing.padding} !important;
        border: 1px solid ${CONFIG.colors.border} !important;
      }

      /* Assistant messages - white background */
      div[class*="jsx-"] div[class*="assistant"],
      div[class*="jsx-"] div[class*="ai"],
      div[data-message-author="assistant"],
      div[class*="jsx-"] div:has([data-message-author="assistant"]) {
        background-color: ${CONFIG.colors.assistantMessage} !important;
        color: ${CONFIG.colors.text} !important;
        border-radius: ${CONFIG.spacing.borderRadius} !important;
        padding: ${CONFIG.spacing.padding} !important;
        border: 1px solid ${CONFIG.colors.border} !important;
      }

      /* Message text */
      div[class*="jsx-"] p,
      div[class*="jsx-"] span,
      div[class*="jsx-"] div[class*="text-"] {
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
      /* CRITICAL: Override CSS variables that control dark mode */
      :root {
        --main-dark-color: ${CONFIG.colors.background} !important;
        --sidebar-color: ${CONFIG.colors.sidebar} !important;
        --sidebar-menu-color: ${CONFIG.colors.sidebar} !important;
        --workspace-color: ${CONFIG.colors.sidebar} !important;
        --popup-color: ${CONFIG.colors.sidebar} !important;
        --text-color: ${CONFIG.colors.text} !important;
        --border-color: ${CONFIG.colors.border} !important;
      }

      /* Force light mode on body */
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

      /* Target the specific jsx class from inspector */
      .jsx-7078ffb922cb3c38 {
        background-color: ${CONFIG.colors.sidebar} !important;
      }

      /* Force background on elements using CSS variables */
      div[class*="bg-[color:--sidebar-color]"],
      div[class*="bg-[--workspace-color]"],
      nav[class*="bg-[color:--sidebar-color]"] {
        background-color: ${CONFIG.colors.sidebar} !important;
      }

      /* Chat space background */
      div[class*="dark:bg-[--main-dark-color]"],
      div[data-element-id="chat-space-background"] {
        background-color: ${CONFIG.colors.background} !important;
      }

      /* Main content area */
      div[data-element-id="main-content-area"] {
        background-color: ${CONFIG.colors.background} !important;
      }

      /* Sidebar specific */
      nav[data-element-id="side-bar-background"] {
        background-color: ${CONFIG.colors.sidebar} !important;
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
    `;
    injectCSS(globalCSS);
  }

  function styleElements() {
    // Force light mode by removing dark class
    document.documentElement.classList.remove('dark');
    document.body.classList.remove('dark');
    
    // Also remove dark class from any jsx elements
    const allElements = document.querySelectorAll('*');
    allElements.forEach(element => {
      if (element.classList.contains('dark')) {
        element.classList.remove('dark');
      }
    });
    
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
    
    // Override CSS variables immediately
    const root = document.documentElement;
    root.style.setProperty('--main-dark-color', CONFIG.colors.background);
    root.style.setProperty('--sidebar-color', CONFIG.colors.sidebar);
    root.style.setProperty('--sidebar-menu-color', CONFIG.colors.sidebar);
    root.style.setProperty('--workspace-color', CONFIG.colors.sidebar);
    root.style.setProperty('--popup-color', CONFIG.colors.sidebar);
    
    styleElements();
    observeChanges();
    
    // Force light mode periodically and aggressively
    setInterval(() => {
      document.documentElement.classList.remove('dark');
      document.body.classList.remove('dark');
      
      // Force CSS variables again
      root.style.setProperty('--main-dark-color', CONFIG.colors.background);
      root.style.setProperty('--sidebar-color', CONFIG.colors.sidebar);
      root.style.setProperty('--sidebar-menu-color', CONFIG.colors.sidebar);
      root.style.setProperty('--workspace-color', CONFIG.colors.sidebar);
      
      // Force background colors on key elements
      const sidebar = document.querySelector('[data-element-id="nav-container"]');
      if (sidebar) {
        sidebar.style.backgroundColor = CONFIG.colors.sidebar;
      }
      
      const sidebarBg = document.querySelector('[data-element-id="side-bar-background"]');
      if (sidebarBg) {
        sidebarBg.style.backgroundColor = CONFIG.colors.sidebar;
      }
      
      const mainContent = document.querySelector('[data-element-id="main-content-area"]');
      if (mainContent) {
        mainContent.style.backgroundColor = CONFIG.colors.background;
      }
      
      const chatSpace = document.querySelector('[data-element-id="chat-space-background"]');
      if (chatSpace) {
        chatSpace.style.backgroundColor = CONFIG.colors.background;
      }
      
      // Force jsx elements
      const jsxElements = document.querySelectorAll('.jsx-7078ffb922cb3c38');
      jsxElements.forEach(element => {
        element.style.backgroundColor = CONFIG.colors.sidebar;
      });
    }, 500);
    
    console.log('Claude Light Theme initialized successfully!');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initTheme);
  } else {
    initTheme();
  }

  setTimeout(initTheme, 1000);
})();
