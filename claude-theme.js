/**
 * Claude AI Theme for TypingMind
 * A clean, minimalist theme inspired by Claude AI's interface
 * Light mode optimized with potential for dark mode expansion
 */

(function() {
    'use strict';

    // Configuration
    const CONFIG = {
        colors: {
            // Main colors
            primary: '#ff6b35',        // Claude's signature orange
            primaryHover: '#e55a2b',   // Darker orange for hover
            primaryLight: '#ff6b3520', // Light orange for backgrounds
            
            // Backgrounds
            mainBg: '#ffffff',         // Pure white main background
            sidebarBg: '#f8f9fa',      // Light gray sidebar
            workspaceBg: '#f0f2f5',    // Slightly darker for workspace
            cardBg: '#ffffff',         // White for cards/containers
            
            // Text colors
            textPrimary: '#1a1a1a',    // Dark text
            textSecondary: '#6b7280',  // Gray text
            textMuted: '#9ca3af',      // Muted text
            
            // Borders and dividers
            border: '#e5e7eb',         // Light gray border
            borderHover: '#d1d5db',    // Slightly darker border
            
            // Status colors
            success: '#10b981',
            error: '#ef4444',
            warning: '#f59e0b',
            info: '#3b82f6',
        },
        
        typography: {
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
            fontSize: {
                xs: '0.75rem',
                sm: '0.875rem',
                base: '1rem',
                lg: '1.125rem',
                xl: '1.25rem',
                '2xl': '1.5rem',
            },
            fontWeight: {
                normal: '400',
                medium: '500',
                semibold: '600',
                bold: '700',
            },
        },
        
        spacing: {
            xs: '0.25rem',
            sm: '0.5rem',
            md: '1rem',
            lg: '1.5rem',
            xl: '2rem',
            '2xl': '3rem',
        },
        
        borderRadius: {
            sm: '0.375rem',
            md: '0.5rem',
            lg: '0.75rem',
            xl: '1rem',
            '2xl': '1.5rem',
        },
        
        shadows: {
            sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
            md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
            lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        },
    };

    // Selectors for different TypingMind elements
    const SELECTORS = {
        // Main structure
        body: 'body',
        mainContainer: '#__next',
        customTheme: '.custom-theme',
        
        // Sidebar and navigation
        sidebarBackground: '[data-element-id="side-bar-background"]',
        sidebarBeginning: '[data-element-id="sidebar-beginning-part"]',
        workspaceBar: '[data-element-id="workspace-bar"]',
        navContainer: '[data-element-id="nav-container"]',
        
        // Buttons and interactive elements
        newChatButton: '[data-element-id="new-chat-button-in-side-bar"]',
        workspaceTabChat: '[data-element-id="workspace-tab-chat"]',
        workspaceTabAgents: '[data-element-id="workspace-tab-agents"]',
        workspaceTabPrompts: '[data-element-id="workspace-tab-prompts"]',
        workspaceTabPlugins: '[data-element-id="workspace-tab-plugins"]',
        workspaceTabModels: '[data-element-id="workspace-tab-models"]',
        workspaceTabTeams: '[data-element-id="workspace-tab-teams"]',
        workspaceTabSettings: '[data-element-id="workspace-tab-settings"]',
        userProfileButton: '[data-element-id="workspace-profile-button"]',
        userProfileImage: '[data-element-id="user-profile-image"]',
        
        // Chat and messages
        chatContainer: '[data-element-id="chat-container"]',
        messageUser: '[data-element-id="message-user"]',
        messageAssistant: '[data-element-id="message-assistant"]',
        messageContainer: '[data-element-id="message-container"]',
        
        // Input area
        inputContainer: '[data-element-id="input-container"]',
        inputTextarea: '[data-element-id="input-textarea"]',
        sendButton: '[data-element-id="send-button"]',
        
        // Common elements
        button: 'button',
        input: 'input',
        textarea: 'textarea',
        select: 'select',
        
        // Generic classes
        card: '.card',
        modal: '.modal',
        dropdown: '.dropdown',
        tooltip: '.tooltip',
    };

    // Utility functions
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    function safe(fn) {
        return function(...args) {
            try {
                return fn.apply(this, args);
            } catch (error) {
                console.error('Claude Theme Error:', error);
                return null;
            }
        };
    }

    function escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    function injectStyles(styles) {
        const styleSheet = document.createElement('style');
        styleSheet.type = 'text/css';
        styleSheet.id = 'claude-ai-theme-styles';
        styleSheet.textContent = styles;
        
        // Remove existing theme styles
        const existingStyles = document.getElementById('claude-ai-theme-styles');
        if (existingStyles) {
            existingStyles.remove();
        }
        
        document.head.appendChild(styleSheet);
    }

    // Main theme styles
    function generateThemeStyles() {
        return `
            /* Claude AI Theme - Root Variables */
            :root {
                --claude-primary: ${CONFIG.colors.primary};
                --claude-primary-hover: ${CONFIG.colors.primaryHover};
                --claude-primary-light: ${CONFIG.colors.primaryLight};
                --claude-main-bg: ${CONFIG.colors.mainBg};
                --claude-sidebar-bg: ${CONFIG.colors.sidebarBg};
                --claude-workspace-bg: ${CONFIG.colors.workspaceBg};
                --claude-card-bg: ${CONFIG.colors.cardBg};
                --claude-text-primary: ${CONFIG.colors.textPrimary};
                --claude-text-secondary: ${CONFIG.colors.textSecondary};
                --claude-text-muted: ${CONFIG.colors.textMuted};
                --claude-border: ${CONFIG.colors.border};
                --claude-border-hover: ${CONFIG.colors.borderHover};
                --claude-shadow-sm: ${CONFIG.shadows.sm};
                --claude-shadow-md: ${CONFIG.shadows.md};
                --claude-shadow-lg: ${CONFIG.shadows.lg};
                --claude-radius-sm: ${CONFIG.borderRadius.sm};
                --claude-radius-md: ${CONFIG.borderRadius.md};
                --claude-radius-lg: ${CONFIG.borderRadius.lg};
                --claude-radius-xl: ${CONFIG.borderRadius.xl};
                --claude-font-family: ${CONFIG.typography.fontFamily};
            }

            /* Override dark mode for light theme */
            body.dark {
                --main-dark-color: var(--claude-main-bg) !important;
                --sidebar-color: var(--claude-sidebar-bg) !important;
                --sidebar-menu-color: var(--claude-workspace-bg) !important;
                --workspace-color: var(--claude-workspace-bg) !important;
                --popup-color: var(--claude-card-bg) !important;
                --main-dark-popup-color: var(--claude-card-bg) !important;
            }

            /* Main body styling */
            body {
                background-color: var(--claude-main-bg) !important;
                color: var(--claude-text-primary) !important;
                font-family: var(--claude-font-family) !important;
                --sidebar-color: var(--claude-sidebar-bg) !important;
                --sidebar-menu-color: var(--claude-workspace-bg) !important;
                --workspace-color: var(--claude-workspace-bg) !important;
                --popup-color: var(--claude-card-bg) !important;
                --main-dark-color: var(--claude-main-bg) !important;
                --main-dark-popup-color: var(--claude-card-bg) !important;
            }

            /* Sidebar styling */
            ${SELECTORS.sidebarBackground} {
                background-color: var(--claude-sidebar-bg) !important;
                border-right: 1px solid var(--claude-border) !important;
            }

            ${SELECTORS.sidebarBeginning} {
                background-color: var(--claude-workspace-bg) !important;
                border-radius: var(--claude-radius-lg) !important;
                margin: ${CONFIG.spacing.sm} !important;
            }

            ${SELECTORS.workspaceBar} {
                background-color: var(--claude-workspace-bg) !important;
            }

            /* New Chat Button */
            ${SELECTORS.newChatButton} {
                background-color: var(--claude-primary) !important;
                color: white !important;
                border: none !important;
                border-radius: var(--claude-radius-lg) !important;
                font-weight: ${CONFIG.typography.fontWeight.medium} !important;
                box-shadow: var(--claude-shadow-sm) !important;
                transition: all 0.2s ease !important;
            }

            ${SELECTORS.newChatButton}:hover {
                background-color: var(--claude-primary-hover) !important;
                box-shadow: var(--claude-shadow-md) !important;
                transform: translateY(-1px) !important;
            }

            ${SELECTORS.newChatButton}:active {
                transform: translateY(0) !important;
                box-shadow: var(--claude-shadow-sm) !important;
            }

            /* Workspace Tab Styling */
            ${SELECTORS.workspaceTabChat} span,
            ${SELECTORS.workspaceTabAgents} span,
            ${SELECTORS.workspaceTabPrompts} span,
            ${SELECTORS.workspaceTabPlugins} span,
            ${SELECTORS.workspaceTabModels} span,
            ${SELECTORS.workspaceTabTeams} span,
            ${SELECTORS.workspaceTabSettings} span {
                color: var(--claude-text-secondary) !important;
                border-radius: var(--claude-radius-md) !important;
                transition: all 0.2s ease !important;
            }

            ${SELECTORS.workspaceTabChat} span:hover,
            ${SELECTORS.workspaceTabAgents} span:hover,
            ${SELECTORS.workspaceTabPrompts} span:hover,
            ${SELECTORS.workspaceTabPlugins} span:hover,
            ${SELECTORS.workspaceTabModels} span:hover,
            ${SELECTORS.workspaceTabTeams} span:hover,
            ${SELECTORS.workspaceTabSettings} span:hover {
                background-color: var(--claude-primary-light) !important;
                color: var(--claude-text-primary) !important;
            }

            /* Active workspace tab */
            ${SELECTORS.workspaceTabChat} span.bg-white\\/20,
            ${SELECTORS.workspaceTabChat} span.text-white {
                background-color: var(--claude-primary) !important;
                color: white !important;
            }

            /* User Profile Button */
            ${SELECTORS.userProfileButton} {
                border-radius: var(--claude-radius-lg) !important;
                transition: all 0.2s ease !important;
            }

            ${SELECTORS.userProfileButton}:hover {
                background-color: var(--claude-primary-light) !important;
            }

            ${SELECTORS.userProfileImage} {
                border-radius: var(--claude-radius-md) !important;
                border: 2px solid var(--claude-border) !important;
            }

            /* Chat Container */
            ${SELECTORS.chatContainer} {
                background-color: var(--claude-main-bg) !important;
                color: var(--claude-text-primary) !important;
            }

            /* Message Containers */
            ${SELECTORS.messageUser} {
                background-color: var(--claude-primary-light) !important;
                border-radius: var(--claude-radius-lg) !important;
                border: 1px solid var(--claude-border) !important;
                padding: ${CONFIG.spacing.md} !important;
                margin: ${CONFIG.spacing.sm} 0 !important;
            }

            ${SELECTORS.messageAssistant} {
                background-color: var(--claude-card-bg) !important;
                border-radius: var(--claude-radius-lg) !important;
                border: 1px solid var(--claude-border) !important;
                padding: ${CONFIG.spacing.md} !important;
                margin: ${CONFIG.spacing.sm} 0 !important;
                box-shadow: var(--claude-shadow-sm) !important;
            }

            /* Input Area */
            ${SELECTORS.inputContainer} {
                background-color: var(--claude-card-bg) !important;
                border-radius: var(--claude-radius-lg) !important;
                border: 1px solid var(--claude-border) !important;
                box-shadow: var(--claude-shadow-sm) !important;
            }

            ${SELECTORS.inputTextarea} {
                background-color: transparent !important;
                border: none !important;
                color: var(--claude-text-primary) !important;
                font-family: var(--claude-font-family) !important;
                border-radius: var(--claude-radius-md) !important;
            }

            ${SELECTORS.inputTextarea}:focus {
                outline: none !important;
                box-shadow: 0 0 0 2px var(--claude-primary-light) !important;
            }

            ${SELECTORS.sendButton} {
                background-color: var(--claude-primary) !important;
                color: white !important;
                border: none !important;
                border-radius: var(--claude-radius-md) !important;
                transition: all 0.2s ease !important;
            }

            ${SELECTORS.sendButton}:hover {
                background-color: var(--claude-primary-hover) !important;
                box-shadow: var(--claude-shadow-md) !important;
            }

            /* Generic button styling */
            button:not([class*="workspace-tab"]):not([data-element-id*="workspace-tab"]) {
                border-radius: var(--claude-radius-md) !important;
                transition: all 0.2s ease !important;
                font-family: var(--claude-font-family) !important;
            }

            button:not([class*="workspace-tab"]):not([data-element-id*="workspace-tab"]):hover {
                transform: translateY(-1px) !important;
                box-shadow: var(--claude-shadow-sm) !important;
            }

            /* Form elements */
            input, textarea, select {
                background-color: var(--claude-card-bg) !important;
                border: 1px solid var(--claude-border) !important;
                border-radius: var(--claude-radius-md) !important;
                color: var(--claude-text-primary) !important;
                font-family: var(--claude-font-family) !important;
                transition: all 0.2s ease !important;
            }

            input:focus, textarea:focus, select:focus {
                outline: none !important;
                border-color: var(--claude-primary) !important;
                box-shadow: 0 0 0 2px var(--claude-primary-light) !important;
            }

            /* Code blocks */
            code {
                background-color: var(--claude-sidebar-bg) !important;
                border: 1px solid var(--claude-border) !important;
                border-radius: var(--claude-radius-sm) !important;
                padding: ${CONFIG.spacing.xs} ${CONFIG.spacing.sm} !important;
                font-family: 'SF Mono', 'Monaco', 'Inconsolata', 'Roboto Mono', monospace !important;
                color: var(--claude-text-primary) !important;
            }

            pre {
                background-color: var(--claude-sidebar-bg) !important;
                border: 1px solid var(--claude-border) !important;
                border-radius: var(--claude-radius-md) !important;
                padding: ${CONFIG.spacing.md} !important;
                overflow-x: auto !important;
                font-family: 'SF Mono', 'Monaco', 'Inconsolata', 'Roboto Mono', monospace !important;
            }

            /* Modals and dropdowns */
            .modal, .dropdown, .tooltip {
                background-color: var(--claude-card-bg) !important;
                border: 1px solid var(--claude-border) !important;
                border-radius: var(--claude-radius-lg) !important;
                box-shadow: var(--claude-shadow-lg) !important;
                color: var(--claude-text-primary) !important;
            }

            /* Scrollbar styling */
            ::-webkit-scrollbar {
                width: 8px !important;
                height: 8px !important;
            }

            ::-webkit-scrollbar-track {
                background: var(--claude-sidebar-bg) !important;
                border-radius: var(--claude-radius-sm) !important;
            }

            ::-webkit-scrollbar-thumb {
                background: var(--claude-border) !important;
                border-radius: var(--claude-radius-sm) !important;
            }

            ::-webkit-scrollbar-thumb:hover {
                background: var(--claude-border-hover) !important;
            }

            /* Typography improvements */
            h1, h2, h3, h4, h5, h6 {
                color: var(--claude-text-primary) !important;
                font-family: var(--claude-font-family) !important;
                font-weight: ${CONFIG.typography.fontWeight.semibold} !important;
            }

            p {
                color: var(--claude-text-primary) !important;
                font-family: var(--claude-font-family) !important;
                line-height: 1.6 !important;
            }

            /* Links */
            a {
                color: var(--claude-primary) !important;
                text-decoration: none !important;
                transition: all 0.2s ease !important;
            }

            a:hover {
                color: var(--claude-primary-hover) !important;
                text-decoration: underline !important;
            }

            /* Cards and containers */
            .card, [class*="card"] {
                background-color: var(--claude-card-bg) !important;
                border: 1px solid var(--claude-border) !important;
                border-radius: var(--claude-radius-lg) !important;
                box-shadow: var(--claude-shadow-sm) !important;
                transition: all 0.2s ease !important;
            }

            .card:hover, [class*="card"]:hover {
                box-shadow: var(--claude-shadow-md) !important;
                transform: translateY(-1px) !important;
            }

            /* Fix for dark mode classes */
            .dark .bg-gray-800 {
                background-color: var(--claude-sidebar-bg) !important;
            }

            .dark .text-white {
                color: var(--claude-text-primary) !important;
            }

            .dark .bg-white {
                background-color: var(--claude-card-bg) !important;
            }

            /* Animation improvements */
            * {
                transition: background-color 0.2s ease, color 0.2s ease, border-color 0.2s ease !important;
            }

            /* Focus improvements for accessibility */
            button:focus-visible, input:focus-visible, textarea:focus-visible, select:focus-visible {
                outline: 2px solid var(--claude-primary) !important;
                outline-offset: 2px !important;
            }
        `;
    }

    // Initialize theme
    function initTheme() {
        console.log('🎨 Initializing Claude AI Theme...');
        
        // Inject main styles
        injectStyles(generateThemeStyles());
        
        // Set up mutation observer for dynamic content
        const observer = new MutationObserver(debounce(safe(() => {
            // Re-apply styles to new elements if needed
            applyDynamicStyles();
        }), 100));
        
        observer.observe(document.body, {
            childList: true,
            subtree: true,
            attributes: true,
            attributeFilter: ['class', 'data-element-id']
        });
        
        // Apply initial dynamic styles
        applyDynamicStyles();
        
        console.log('✅ Claude AI Theme initialized successfully!');
    }

    // Apply dynamic styles to elements that might be added later
    function applyDynamicStyles() {
        // Force light mode by removing dark class
        document.body.classList.remove('dark');
        
        // Apply custom styles to specific elements that might need special handling
        const elements = document.querySelectorAll('[class*="bg-gray-800"], [class*="text-white"]');
        elements.forEach(element => {
            if (element.classList.contains('bg-gray-800')) {
                element.style.backgroundColor = 'var(--claude-sidebar-bg)';
            }
            if (element.classList.contains('text-white')) {
                element.style.color = 'var(--claude-text-primary)';
            }
        });
    }

    // Debounced resize handler
    const handleResize = debounce(safe(() => {
        // Handle any resize-specific styling if needed
        applyDynamicStyles();
    }), 250);

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initTheme);
    } else {
        initTheme();
    }

    // Handle window resize
    window.addEventListener('resize', handleResize);

    // Cleanup function (for development)
    window.cleanupClaudeTheme = function() {
        const styleSheet = document.getElementById('claude-ai-theme-styles');
        if (styleSheet) {
            styleSheet.remove();
        }
        window.removeEventListener('resize', handleResize);
        console.log('🧹 Claude AI Theme cleaned up');
    };

    // Export for debugging
    window.claudeTheme = {
        CONFIG,
        SELECTORS,
        initTheme,
        applyDynamicStyles,
        generateThemeStyles,
    };

})();
