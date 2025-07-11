/**
 * Claude AI Theme for TypingMind
 * A clean, minimalist theme inpired by Claude AI's interface
 * Light mode optimized with potential for dark mode expansion
 */

(function() {
    'use strict';

    // Configuration
    const CONFIG = {
        colors: {
            // Main colors
            primary: '#d97449',        // Claude's muted signature orange
            primaryHover: '#c4653f',   // Darker muted orange for hover
            primaryLight: '#d9744920', // Light muted orange for backgrounds
            primaryMedium: '#d9744930', // Medium muted orange for buttons
            
            // Light mode backgrounds
            mainBg: '#fdfcfb',         // Claude's warm off-white main background
            sidebarBg: '#f7f5f3',      // Claude's warm beige sidebar
            workspaceBg: '#f0ede8',    // Slightly darker beige for workspace
            cardBg: '#ffffff',         // Pure white for cards/containers
            
            // Light mode text colors
            textPrimary: '#1a1a1a',    // Dark text
            textSecondary: '#6b7280',  // Gray text
            textMuted: '#9ca3af',      // Muted text
            
            // Dark mode backgrounds
            darkMainBg: '#2f2f2f',     // Claude's dark main background (lighter)
            darkSidebarBg: '#171717',  // Claude's dark sidebar (much darker)
            darkWorkspaceBg: '#1a1a1a', // Dark workspace background
            darkCardBg: '#262626',     // Dark card background
            
            // Dark mode text colors
            darkTextPrimary: '#e8e8e8',   // Light text for dark mode
            darkTextSecondary: '#a3a3a3', // Gray text for dark mode
            darkTextMuted: '#737373',     // Muted text for dark mode
            
            // Borders and dividers
            border: '#e5e7eb',         // Light gray border
            borderHover: '#d1d5db',    // Slightly darker border
            darkBorder: '#404040',     // Dark mode border
            darkBorderHover: '#525252', // Dark mode border hover
            
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
        messageUser: '[data-element-id="user-message"]',
        messageAssistant: '[data-element-id="message-assistant"]',
        messageContainer: '[data-element-id="message-container"]',
        
        // Input area
        inputContainer: '[data-element-id="input-container"]',
        inputTextarea: '[data-element-id="input-textarea"]',
        sendButton: '[data-element-id="send-button"]',
        regenerateButton: '[data-element-id="regenerate-button"]',
        searchChatsBar: '[data-element-id="search-chats-bar"]',
        tagSearchPanel: '[data-element-id="tag-search-panel"]',
        customChatItem: '[data-element-id="custom-chat-item"]',
        
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
                --claude-primary-medium: ${CONFIG.colors.primaryMedium};
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
            
            /* Dark Mode Variables */
            .dark {
                --claude-main-bg: ${CONFIG.colors.darkMainBg};
                --claude-sidebar-bg: ${CONFIG.colors.darkSidebarBg};
                --claude-workspace-bg: ${CONFIG.colors.darkWorkspaceBg};
                --claude-card-bg: ${CONFIG.colors.darkCardBg};
                --claude-text-primary: ${CONFIG.colors.darkTextPrimary};
                --claude-text-secondary: ${CONFIG.colors.darkTextSecondary};
                --claude-text-muted: ${CONFIG.colors.darkTextMuted};
                --claude-border: ${CONFIG.colors.darkBorder};
                --claude-border-hover: ${CONFIG.colors.darkBorderHover};
            }

            /* Dark Mode Support - Override TypingMind's dark mode variables */
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
                background-color: var(--claude-sidebar-bg) !important;
                color: var(--claude-text-primary) !important;
                border-radius: var(--claude-radius-lg) !important;
                border: 1px solid var(--claude-border) !important;
                padding: ${CONFIG.spacing.md} !important;
                margin: ${CONFIG.spacing.sm} 0 !important;
            }

            /* User Message Override - Keep sidebar color even with blue classes */
            ${SELECTORS.messageUser}.bg-blue-600,
            ${SELECTORS.messageUser}[class*="bg-blue-600"] {
                background-color: var(--claude-sidebar-bg) !important;
                color: var(--claude-text-primary) !important;
                border-color: var(--claude-border) !important;
            }

            ${SELECTORS.messageUser}.bg-blue-600:hover,
            ${SELECTORS.messageUser}[class*="bg-blue-600"]:hover,
            ${SELECTORS.messageUser}:hover {
                background-color: var(--claude-sidebar-bg) !important;
                color: var(--claude-text-primary) !important;
                border-color: var(--claude-border) !important;
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

            /* Regenerate Button */
            ${SELECTORS.regenerateButton} {
                background-color: var(--claude-primary) !important;
                color: white !important;
                border: none !important;
                border-radius: var(--claude-radius-md) !important;
                padding: ${CONFIG.spacing.sm} ${CONFIG.spacing.md} !important;
                font-weight: var(--claude-font-weight-medium) !important;
                cursor: pointer !important;
                transition: all 0.2s ease !important;
            }

            ${SELECTORS.regenerateButton}:hover {
                background-color: var(--claude-primary-hover) !important;
                box-shadow: var(--claude-shadow-md) !important;
            }

            /* Search Field */
            ${SELECTORS.searchChatsBar} {
                background-color: var(--claude-sidebar-bg) !important;
                color: var(--claude-text-primary) !important;
            }

            ${SELECTORS.searchChatsBar}::placeholder {
                color: var(--claude-text-muted) !important;
            }

            /* Search Field Icons */
            ${SELECTORS.searchChatsBar} + span,
            ${SELECTORS.searchChatsBar} ~ button {
                color: var(--claude-text-muted) !important;
            }

            ${SELECTORS.searchChatsBar} + span svg,
            ${SELECTORS.searchChatsBar} ~ button svg {
                color: var(--claude-text-muted) !important;
            }

            /* Tag Search Panel (Popover) */
            ${SELECTORS.tagSearchPanel} {
                background-color: var(--claude-card-bg) !important;
                border: 1px solid var(--claude-border) !important;
                border-radius: var(--claude-radius-lg) !important;
                box-shadow: var(--claude-shadow-lg) !important;
            }

            /* Tag Search Panel Override - Ensure it stays white even with gray classes */
            ${SELECTORS.tagSearchPanel}.bg-gray-600,
            ${SELECTORS.tagSearchPanel}[class*="bg-gray-600"] {
                background-color: var(--claude-card-bg) !important;
                border: 1px solid var(--claude-border) !important;
            }

            ${SELECTORS.tagSearchPanel} label {
                color: var(--claude-text-primary) !important;
            }

            ${SELECTORS.tagSearchPanel} input {
                background-color: var(--claude-sidebar-bg) !important;
                color: var(--claude-text-primary) !important;
                border: 1px solid var(--claude-border) !important;
                border-radius: var(--claude-radius-md) !important;
            }

            ${SELECTORS.tagSearchPanel} input::placeholder {
                color: var(--claude-text-muted) !important;
            }

            ${SELECTORS.tagSearchPanel} p {
                color: var(--claude-text-secondary) !important;
            }

            /* Tag Search Panel Buttons */
            ${SELECTORS.tagSearchPanel} button {
                border-radius: var(--claude-radius-md) !important;
                font-weight: var(--claude-font-weight-medium) !important;
                transition: all 0.2s ease !important;
            }

            /* Reset button (orange) */
            ${SELECTORS.tagSearchPanel} button:first-child {
                background-color: transparent !important;
                color: var(--claude-primary) !important;
                border: none !important;
            }

            ${SELECTORS.tagSearchPanel} button:first-child:hover {
                background-color: var(--claude-primary-light) !important;
                color: var(--claude-primary-hover) !important;
            }

            /* Cancel button */
            ${SELECTORS.tagSearchPanel} button:nth-child(2) {
                background-color: transparent !important;
                color: var(--claude-text-primary) !important;
                border: 1px solid var(--claude-border) !important;
            }

            ${SELECTORS.tagSearchPanel} button:nth-child(2):hover {
                background-color: var(--claude-sidebar-bg) !important;
                border-color: var(--claude-border-hover) !important;
            }

            /* OK button (primary) */
            ${SELECTORS.tagSearchPanel} button:last-child {
                background-color: var(--claude-primary) !important;
                color: white !important;
                border: none !important;
            }

            ${SELECTORS.tagSearchPanel} button:last-child:hover {
                background-color: var(--claude-primary-hover) !important;
                box-shadow: var(--claude-shadow-md) !important;
            }

            /* Chat Items */
            ${SELECTORS.customChatItem} {
                color: var(--claude-text-primary) !important;
                border-radius: var(--claude-radius-md) !important;
                transition: all 0.2s ease !important;
            }

            ${SELECTORS.customChatItem}:hover {
                background-color: var(--claude-sidebar-bg) !important;
            }

            /* Chat Item Override - Prevent blue button styling from affecting chat items */
            ${SELECTORS.customChatItem}.bg-blue-600,
            ${SELECTORS.customChatItem}[class*="bg-blue-600"] {
                background-color: transparent !important;
                color: var(--claude-text-primary) !important;
                border-color: transparent !important;
            }

            ${SELECTORS.customChatItem}.bg-blue-600:hover,
            ${SELECTORS.customChatItem}[class*="bg-blue-600"]:hover,
            ${SELECTORS.customChatItem}:hover {
                background-color: var(--claude-sidebar-bg) !important;
                color: var(--claude-text-primary) !important;
                border-color: transparent !important;
            }

            ${SELECTORS.customChatItem}:active,
            ${SELECTORS.customChatItem}[data-selected="true"] {
                background-color: var(--claude-primary-light) !important;
            }

            /* Chat Item Buttons */
            ${SELECTORS.customChatItem} button {
                color: var(--claude-text-secondary) !important;
                border-radius: var(--claude-radius-sm) !important;
                transition: all 0.2s ease !important;
            }

            ${SELECTORS.customChatItem} button:hover {
                background-color: var(--claude-primary-light) !important;
                color: var(--claude-text-primary) !important;
            }

            /* Chat Item Checkbox */
            ${SELECTORS.customChatItem} input[type="checkbox"] {
                background-color: var(--claude-card-bg) !important;
                border: 1px solid var(--claude-border) !important;
                border-radius: var(--claude-radius-sm) !important;
                color: var(--claude-primary) !important;
            }

            ${SELECTORS.customChatItem} input[type="checkbox"]:checked {
                background-color: var(--claude-primary) !important;
                border-color: var(--claude-primary) !important;
            }

            ${SELECTORS.customChatItem} input[type="checkbox"]:focus {
                outline: 2px solid var(--claude-primary-light) !important;
                outline-offset: 2px !important;
            }

            /* Global Checkbox Styling */
            input[type="checkbox"] {
                background-color: var(--claude-card-bg) !important;
                border: 1px solid var(--claude-border) !important;
                border-radius: var(--claude-radius-sm) !important;
                color: var(--claude-primary) !important;
            }

            input[type="checkbox"]:checked {
                background-color: var(--claude-primary) !important;
                border-color: var(--claude-primary) !important;
            }

            input[type="checkbox"]:focus {
                outline: 2px solid var(--claude-primary-light) !important;
                outline-offset: 2px !important;
            }

            input[type="checkbox"]:hover {
                border-color: var(--claude-border-hover) !important;
            }

            /* Global Blue Button Override - Exclude specific buttons and user messages */
            button.bg-blue-600:not([data-element-id="new-chat-button-in-side-bar"]):not([data-element-id="regenerate-button"]),
            button[class*="bg-blue-600"]:not([data-element-id="new-chat-button-in-side-bar"]):not([data-element-id="regenerate-button"]),
            .bg-blue-600:not([data-element-id="new-chat-button-in-side-bar"]):not([data-element-id="regenerate-button"]):not([data-element-id="user-message"]) {
                background-color: var(--claude-primary) !important;
                color: white !important;
                border-color: var(--claude-primary) !important;
            }

            button.bg-blue-600:hover:not([data-element-id="new-chat-button-in-side-bar"]):not([data-element-id="regenerate-button"]),
            button[class*="bg-blue-600"]:hover:not([data-element-id="new-chat-button-in-side-bar"]):not([data-element-id="regenerate-button"]),
            .bg-blue-600:hover:not([data-element-id="new-chat-button-in-side-bar"]):not([data-element-id="regenerate-button"]):not([data-element-id="user-message"]),
            button.hover\\:bg-blue-700:hover:not([data-element-id="new-chat-button-in-side-bar"]):not([data-element-id="regenerate-button"]),
            button[class*="hover:bg-blue-700"]:hover:not([data-element-id="new-chat-button-in-side-bar"]):not([data-element-id="regenerate-button"]),
            .hover\\:bg-blue-700:hover:not([data-element-id="new-chat-button-in-side-bar"]):not([data-element-id="regenerate-button"]),
            /* Search action button specific override */
            [data-element-id*="search-action"]:hover {
                background-color: var(--claude-primary-hover) !important;
                border-color: var(--claude-primary-hover) !important;
            }

            button.bg-blue-600:focus:not([data-element-id="new-chat-button-in-side-bar"]):not([data-element-id="regenerate-button"]),
            button[class*="bg-blue-600"]:focus:not([data-element-id="new-chat-button-in-side-bar"]):not([data-element-id="regenerate-button"]),
            .bg-blue-600:focus:not([data-element-id="new-chat-button-in-side-bar"]):not([data-element-id="regenerate-button"]):not([data-element-id="user-message"]),
            button[class*="focus:ring-blue-"]:focus:not([data-element-id="new-chat-button-in-side-bar"]):not([data-element-id="regenerate-button"]),
            .focus\\:ring-blue-500:focus:not([data-element-id="new-chat-button-in-side-bar"]):not([data-element-id="regenerate-button"]) {
                outline: 2px solid var(--claude-primary-light) !important;
                outline-offset: 2px !important;
            }

            /* Global Gray Button Override */
            button.bg-gray-600,
            button[class*="bg-gray-600"],
            .bg-gray-600 {
                background-color: var(--claude-text-secondary) !important;
                color: white !important;
                border-color: var(--claude-text-secondary) !important;
            }

            button.bg-gray-600:hover,
            button[class*="bg-gray-600"]:hover,
            .bg-gray-600:hover,
            button.hover\\:bg-gray-700:hover,
            button[class*="hover:bg-gray-700"]:hover,
            .hover\\:bg-gray-700:hover {
                background-color: var(--claude-text-primary) !important;
                border-color: var(--claude-text-primary) !important;
            }

            button.bg-gray-600:focus,
            button[class*="bg-gray-600"]:focus,
            .bg-gray-600:focus {
                outline: 2px solid var(--claude-text-muted) !important;
                outline-offset: 2px !important;
            }

            /* Global Slate Background Button Override - Only solid backgrounds, exclude buttons with slate hover but no slate bg */
            button.bg-slate-900:not([class*="text-slate"]):not([class*="hover:bg-slate-900/10"]):not([class*="hover:bg-slate-900/20"]):not([class*="hover:bg-slate-900/25"]):not([class*="bg-slate-900/20"]),
            button[class*="bg-slate-900"]:not([class*="text-slate"]):not([class*="hover:bg-slate-900/10"]):not([class*="hover:bg-slate-900/20"]):not([class*="hover:bg-slate-900/25"]):not([class*="bg-slate-900/20"]),
            .bg-slate-900:not([class*="text-slate"]):not([class*="hover:bg-slate-900/10"]):not([class*="hover:bg-slate-900/20"]):not([class*="hover:bg-slate-900/25"]):not([class*="bg-slate-900/20"]) {
                background-color: var(--claude-text-primary) !important;
                color: white !important;
                border-color: var(--claude-text-primary) !important;
            }

            /* Override inline styles for slate buttons */
            button.bg-slate-900[style*="color: var(--claude-text-primary)"],
            button[class*="bg-slate-900"][style*="color: var(--claude-text-primary)"] {
                color: white !important;
            }

            button.bg-slate-900:not([class*="text-slate"]):not([class*="hover:bg-slate-900/10"]):not([class*="hover:bg-slate-900/20"]):not([class*="hover:bg-slate-900/25"]):not([class*="bg-slate-900/20"]):hover,
            button[class*="bg-slate-900"]:not([class*="text-slate"]):not([class*="hover:bg-slate-900/10"]):not([class*="hover:bg-slate-900/20"]):not([class*="hover:bg-slate-900/25"]):not([class*="bg-slate-900/20"]):hover,
            .bg-slate-900:not([class*="text-slate"]):not([class*="hover:bg-slate-900/10"]):not([class*="hover:bg-slate-900/20"]):not([class*="hover:bg-slate-900/25"]):not([class*="bg-slate-900/20"]):hover {
                background-color: var(--claude-text-secondary) !important;
                border-color: var(--claude-text-secondary) !important;
            }

            button.bg-slate-900:not([class*="text-slate"]):not([class*="hover:bg-slate-900/10"]):not([class*="hover:bg-slate-900/20"]):not([class*="hover:bg-slate-900/25"]):not([class*="bg-slate-900/20"]):focus,
            button[class*="bg-slate-900"]:not([class*="text-slate"]):not([class*="hover:bg-slate-900/10"]):not([class*="hover:bg-slate-900/20"]):not([class*="hover:bg-slate-900/25"]):not([class*="bg-slate-900/20"]):focus,
            .bg-slate-900:not([class*="text-slate"]):not([class*="hover:bg-slate-900/10"]):not([class*="hover:bg-slate-900/20"]):not([class*="hover:bg-slate-900/25"]):not([class*="bg-slate-900/20"]):focus {
                outline: 2px solid var(--claude-text-muted) !important;
                outline-offset: 2px !important;
            }

            /* Generic button styling */
            button:not([class*="workspace-tab"]):not([data-element-id*="workspace-tab"]) {
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
                line-height: 1.5 !important;
                white-space: pre-wrap !important;
                word-wrap: break-word !important;
            }

            pre code {
                background-color: transparent !important;
                border: none !important;
                padding: 0 !important;
                line-height: inherit !important;
                font-size: inherit !important;
                white-space: inherit !important;
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
            
            /* Additional Dark Mode Styling */
            .dark .text-gray-900 {
                color: var(--claude-text-primary) !important;
            }
            
            .dark .text-gray-600 {
                color: var(--claude-text-secondary) !important;
            }
            
            .dark .text-gray-400 {
                color: var(--claude-text-muted) !important;
            }
            
            .dark .text-slate-900 {
                color: var(--claude-text-primary) !important;
            }
            
            .dark .text-slate-600 {
                color: var(--claude-text-secondary) !important;
            }
            
            .dark .text-slate-400 {
                color: var(--claude-text-muted) !important;
            }
            
            /* Dark mode borders */
            .dark .border-gray-200,
            .dark .border-gray-300 {
                border-color: var(--claude-border) !important;
            }
            
            .dark .border-slate-200,
            .dark .border-slate-300 {
                border-color: var(--claude-border) !important;
            }
            
            /* Dark mode user messages */
            .dark [data-element-id="user-message"] {
                background-color: var(--claude-workspace-bg) !important;
                color: var(--claude-text-primary) !important;
            }
            
            /* Dark mode workspace tabs */
            .dark [data-element-id*="workspace-tab"] span.bg-white\\/20,
            .dark [data-element-id*="workspace-tab"] span[class*="bg-white/20"],
            .dark [data-element-id="workspace-bar"] button:not([data-element-id*="workspace-profile"]) span.bg-white\\/20,
            .dark [data-element-id="workspace-bar"] button:not([data-element-id*="workspace-profile"]) span[class*="bg-white/20"] {
                background-color: var(--claude-workspace-bg) !important;
                color: var(--claude-primary) !important;
            }
            
            /* Dark mode buttons with dark:bg-white class */
            .dark button[class*="dark:bg-white"] {
                background-color: var(--claude-card-bg) !important;
                color: var(--claude-text-primary) !important;
                border: 1px solid var(--claude-border) !important;
            }
            
            .dark button[class*="dark:bg-white"]:hover {
                background-color: var(--claude-workspace-bg) !important;
                color: var(--claude-text-primary) !important;
                border-color: var(--claude-border-hover) !important;
            }
            
            /* Dark mode buttons with specific dark classes */
            .dark button.dark\\:bg-white {
                background-color: var(--claude-card-bg) !important;
                color: var(--claude-text-primary) !important;
                border: 1px solid var(--claude-border) !important;
            }
            
            .dark button.dark\\:bg-white:hover {
                background-color: var(--claude-workspace-bg) !important;
                color: var(--claude-text-primary) !important;
                border-color: var(--claude-border-hover) !important;
            }
            
            /* Generic dark mode button fix */
            .dark button[class*="dark:text-slate-800"] {
                color: var(--claude-text-primary) !important;
            }
            
            /* Dark mode gray buttons fix */
            .dark button[class*="dark:bg-gray-700"] {
                background-color: var(--claude-card-bg) !important;
                color: var(--claude-text-primary) !important;
                border: 1px solid var(--claude-border) !important;
            }
            
            .dark button[class*="dark:bg-gray-700"]:hover {
                background-color: var(--claude-workspace-bg) !important;
                color: var(--claude-text-primary) !important;
                border-color: var(--claude-border-hover) !important;
            }
            
            .dark button.dark\\:bg-gray-700 {
                background-color: var(--claude-card-bg) !important;
                color: var(--claude-text-primary) !important;
                border: 1px solid var(--claude-border) !important;
            }
            
            .dark button.dark\\:bg-gray-700:hover {
                background-color: var(--claude-workspace-bg) !important;
                color: var(--claude-text-primary) !important;
                border-color: var(--claude-border-hover) !important;
            }
            
            /* Dark mode gray text buttons */
            .dark button[class*="dark:text-gray-200"] {
                color: var(--claude-text-primary) !important;
            }
            
            .dark button[class*="dark:hover:text-white"]:hover {
                color: var(--claude-text-primary) !important;
            }
            
            /* Dark mode buttons with gray hover backgrounds */
            .dark button[class*="dark:hover:bg-gray-600"] {
                background-color: var(--claude-card-bg) !important;
                color: var(--claude-text-primary) !important;
                border: 1px solid var(--claude-border) !important;
            }
            
            .dark button[class*="dark:hover:bg-gray-600"]:hover {
                background-color: var(--claude-workspace-bg) !important;
                color: var(--claude-text-primary) !important;
                border-color: var(--claude-border-hover) !important;
            }
            
            .dark button.dark\\:hover\\:bg-gray-600\\/70 {
                background-color: var(--claude-card-bg) !important;
                color: var(--claude-text-primary) !important;
                border: 1px solid var(--claude-border) !important;
            }
            
            .dark button.dark\\:hover\\:bg-gray-600\\/70:hover {
                background-color: var(--claude-workspace-bg) !important;
                color: var(--claude-text-primary) !important;
                border-color: var(--claude-border-hover) !important;
            }

            /* Workspace Tab Styling - Including KB button and other tabs */
            [data-element-id*="workspace-tab"] span,
            [data-element-id="workspace-bar"] button:not([data-element-id*="workspace-profile"]) span {
                transition: none !important;
            }
            
            /* Immediate color application for chat tab */
            [data-element-id="workspace-tab-chat"] span {
                color: var(--claude-text-primary) !important;
            }
            
            [data-element-id="workspace-tab-chat"] svg {
                color: var(--claude-text-primary) !important;
            }
            
            /* Active workspace tab styling */
            [data-element-id*="workspace-tab"] span.bg-white\\/20,
            [data-element-id*="workspace-tab"] span[class*="bg-white/20"],
            [data-element-id="workspace-bar"] button:not([data-element-id*="workspace-profile"]) span.bg-white\\/20,
            [data-element-id="workspace-bar"] button:not([data-element-id*="workspace-profile"]) span[class*="bg-white/20"] {
                background-color: var(--claude-sidebar-bg) !important;
                color: var(--claude-primary) !important;
            }
            
            /* Inactive workspace tab styling */
            [data-element-id*="workspace-tab"] span.text-white\\/70,
            [data-element-id*="workspace-tab"] span[class*="text-white/70"],
            [data-element-id="workspace-bar"] button:not([data-element-id*="workspace-profile"]) span.text-white\\/70,
            [data-element-id="workspace-bar"] button:not([data-element-id*="workspace-profile"]) span[class*="text-white/70"],
            button span.text-white\\/70,
            button span[class*="text-white/70"] {
                color: var(--claude-text-secondary) !important;
                background-color: transparent !important;
            }
            
            /* Hover state for workspace tabs */
            [data-element-id*="workspace-tab"] span.hover\\:bg-white\\/20:hover,
            [data-element-id*="workspace-tab"] span[class*="hover:bg-white/20"]:hover,
            [data-element-id="workspace-bar"] button:not([data-element-id*="workspace-profile"]) span.hover\\:bg-white\\/20:hover,
            [data-element-id="workspace-bar"] button:not([data-element-id*="workspace-profile"]) span[class*="hover:bg-white/20"]:hover {
                background-color: var(--claude-sidebar-bg) !important;
                color: var(--claude-primary) !important;
            }
            
            /* Keep workspace tab text colors consistent on hover in light mode */
            :not(.dark) [data-element-id*="workspace-tab"] span[class*="hover:bg-white/20"]:hover span,
            :not(.dark) [data-element-id="workspace-bar"] button:not([data-element-id*="workspace-profile"]) span[class*="hover:bg-white/20"]:hover span {
                color: var(--claude-text-primary) !important;
            }
            
            /* Override orange text on hover for workspace tabs - more specific selector */
            :not(.dark) [data-element-id*="workspace-tab"] span:hover,
            :not(.dark) [data-element-id="workspace-bar"] button:not([data-element-id*="workspace-profile"]) span:hover {
                color: var(--claude-text-primary) !important;
            }
            
            /* Even more specific - target the nested span text elements */
            :not(.dark) [data-element-id*="workspace-tab"] span:hover span[class*="font-"],
            :not(.dark) [data-element-id="workspace-bar"] button:not([data-element-id*="workspace-profile"]) span:hover span[class*="font-"] {
                color: var(--claude-text-primary) !important;
            }
            
            /* SVG icons in workspace tabs */
            [data-element-id*="workspace-tab"] svg,
            [data-element-id="workspace-bar"] button:not([data-element-id*="workspace-profile"]) svg {
                transition: all 0.2s ease !important;
            }
            
            /* Active tab SVG fill */
            [data-element-id*="workspace-tab"] span.bg-white\\/20 svg,
            [data-element-id*="workspace-tab"] span[class*="bg-white/20"] svg,
            [data-element-id="workspace-bar"] button:not([data-element-id*="workspace-profile"]) span.bg-white\\/20 svg,
            [data-element-id="workspace-bar"] button:not([data-element-id*="workspace-profile"]) span[class*="bg-white/20"] svg {
                color: var(--claude-primary) !important;
            }
            
            /* Inactive tab SVG fill */
            [data-element-id*="workspace-tab"] span.text-white\\/70 svg,
            [data-element-id*="workspace-tab"] span[class*="text-white/70"] svg,
            [data-element-id="workspace-bar"] button:not([data-element-id*="workspace-profile"]) span.text-white\\/70 svg,
            [data-element-id="workspace-bar"] button:not([data-element-id*="workspace-profile"]) span[class*="text-white/70"] svg {
                color: var(--claude-text-secondary) !important;
            }
            
            /* Fix KB button text staying orange when inactive - target nested spans */
            [data-element-id*="workspace-tab"] span.text-white\\/70 span,
            [data-element-id*="workspace-tab"] span[class*="text-white/70"] span,
            [data-element-id="workspace-bar"] button:not([data-element-id*="workspace-profile"]) span.text-white\\/70 span,
            [data-element-id="workspace-bar"] button:not([data-element-id*="workspace-profile"]) span[class*="text-white/70"] span,
            button span.text-white\\/70 span,
            button span[class*="text-white/70"] span {
                color: var(--claude-text-secondary) !important;
            }
            
            /* Fix chat description text in light mode sidebar */
            :not(.dark) [data-element-id*="chat-"] div.text-white\\/70,
            :not(.dark) [data-element-id*="chat-"] div[class*="text-white/70"],
            :not(.dark) [data-element-id*="chat-"] span.text-white\\/70,
            :not(.dark) [data-element-id*="chat-"] span[class*="text-white/70"],
            :not(.dark) .text-white\\/70.text-xs,
            :not(.dark) [class*="text-white/70"].text-xs {
                color: var(--claude-text-secondary) !important;
            }
            
            /* Fix blue text buttons to use orange like hyperlinks */
            button.text-blue-500,
            button[class*="text-blue-500"] {
                color: var(--claude-primary) !important;
            }
            
            button.text-blue-500:hover,
            button[class*="text-blue-500"]:hover {
                color: var(--claude-primary-hover) !important;
            }
            
            /* Fix black background elements to use white text */
            .bg-black,
            [class*="bg-black"] {
                background-color: var(--claude-text-primary) !important;
                color: white !important;
            }
            
            .bg-black[style*="color"],
            [class*="bg-black"][style*="color"] {
                color: white !important;
            }
            
            /* Dark mode fix for black background elements */
            .dark .bg-black,
            .dark [class*="bg-black"] {
                background-color: #000000 !important;
                color: white !important;
            }
            
            .dark .bg-black[style*="color"],
            .dark [class*="bg-black"][style*="color"] {
                color: white !important;
            }
            
            /* Fix tags with dark backgrounds to use white text */
            button[style*="background-color"][class*="text-white"] {
                color: white !important;
            }
            
            button[style*="background-color"][style*="color: var(--claude-text-primary)"][class*="text-white"] {
                color: white !important;
            }
            
            /* Fix create character buttons - main button and arrow */
            [data-element-id="create-chatacter"] {
                background-color: var(--claude-primary) !important;
                color: white !important;
                border-color: var(--claude-primary) !important;
            }
            
            /* Main create character button (with text) */
            [data-element-id="create-chatacter"]:not([class*="rounded-l-none"]) {
                padding: 0.625rem 1rem !important;
                border-top-right-radius: 0 !important;
                border-bottom-right-radius: 0 !important;
            }
            
            /* Arrow button (dropdown) */
            [data-element-id="create-chatacter"][class*="rounded-l-none"] {
                padding: 0.625rem !important;
                border-top-left-radius: 0 !important;
                border-bottom-left-radius: 0 !important;
                border-top-right-radius: var(--claude-radius-xl) !important;
                border-bottom-right-radius: var(--claude-radius-xl) !important;
                border-left-color: rgba(255, 255, 255, 0.3) !important;
            }
            
            /* Dark mode specific fixes */
            .dark [data-element-id="create-chatacter"] {
                background-color: var(--claude-primary) !important;
                color: white !important;
                border-color: var(--claude-primary) !important;
            }
            
            .dark [data-element-id="create-chatacter"]:not([class*="rounded-l-none"]) {
                padding: 0.625rem 1rem !important;
                border-top-right-radius: 0 !important;
                border-bottom-right-radius: 0 !important;
            }
            
            .dark [data-element-id="create-chatacter"][class*="rounded-l-none"] {
                padding: 0.625rem !important;
                border-top-left-radius: 0 !important;
                border-bottom-left-radius: 0 !important;
                border-top-right-radius: var(--claude-radius-xl) !important;
                border-bottom-right-radius: var(--claude-radius-xl) !important;
                border-left-color: rgba(255, 255, 255, 0.3) !important;
            }
            
            .dark [data-element-id="create-chatacter"]:hover {
                background-color: var(--claude-primary-hover) !important;
                border-color: var(--claude-primary-hover) !important;
            }
            
            [data-element-id="create-chatacter"]:hover {
                background-color: var(--claude-primary-hover) !important;
                border-color: var(--claude-primary-hover) !important;
            }
            
            [data-element-id="create-chatacter"] span,
            [data-element-id="create-chatacter"] svg {
                color: white !important;
            }

            /* New Chat Button Styling - Muted orange with bright hover */
            [data-element-id="new-chat-button-in-side-bar"] {
                background-color: var(--claude-primary) !important;
                color: var(--claude-text-primary) !important;
                border: 1px solid var(--claude-primary) !important;
            }
            
            [data-element-id="new-chat-button-in-side-bar"] span {
                color: var(--claude-text-primary) !important;
            }
            
            [data-element-id="new-chat-button-in-side-bar"] svg {
                color: var(--claude-text-primary) !important;
            }
            
            [data-element-id="new-chat-button-in-side-bar"]:hover {
                background-color: var(--claude-primary) !important;
                color: white !important;
                border-color: var(--claude-primary) !important;
            }
            
            [data-element-id="new-chat-button-in-side-bar"]:hover span {
                color: white !important;
            }
            
            [data-element-id="new-chat-button-in-side-bar"]:hover svg {
                color: white !important;
            }
            
            /* Regenerate Button Styling - Muted orange with bright hover */
            [data-element-id="regenerate-button"] {
                background-color: var(--claude-primary) !important;
                color: var(--claude-text-primary) !important;
                border: 1px solid var(--claude-primary) !important;
            }
            
            /* User message specific override to maintain sidebar color */
            [data-element-id="user-message"] {
                background-color: var(--claude-sidebar-bg) !important;
                color: var(--claude-text-primary) !important;
            }
            
            [data-element-id="regenerate-button"] span {
                color: var(--claude-text-primary) !important;
            }
            
            [data-element-id="regenerate-button"] svg {
                color: var(--claude-text-primary) !important;
            }
            
            [data-element-id="regenerate-button"]:hover {
                background-color: var(--claude-primary) !important;
                color: white !important;
                border-color: var(--claude-primary) !important;
            }
            
            [data-element-id="regenerate-button"]:hover span {
                color: white !important;
            }
            
            [data-element-id="regenerate-button"]:hover svg {
                color: white !important;
            }
            
            /* Send Button and More Options Button Styling */
            [data-element-id="send-button"] {
                background-color: var(--claude-primary) !important;
                color: white !important;
                border-color: var(--claude-primary) !important;
                border-top-right-radius: 0 !important;
                border-bottom-right-radius: 0 !important;
            }
            
            [data-element-id="send-button"]:hover {
                background-color: var(--claude-primary-hover) !important;
                border-color: var(--claude-primary-hover) !important;
            }
            
            [data-element-id="more-options-button"] {
                background-color: var(--claude-primary) !important;
                color: white !important;
                border-color: var(--claude-primary) !important;
                border-left-color: rgba(255, 255, 255, 0.3) !important;
                border-top-left-radius: 0 !important;
                border-bottom-left-radius: 0 !important;
                border-top-right-radius: var(--claude-radius-md) !important;
                border-bottom-right-radius: var(--claude-radius-md) !important;
                margin-left: -1px !important;
            }
            
            [data-element-id="more-options-button"]:hover {
                background-color: var(--claude-primary-hover) !important;
                border-color: var(--claude-primary-hover) !important;
                border-left-color: rgba(255, 255, 255, 0.3) !important;
            }
            
            [data-element-id="more-options-button"] svg {
                color: white !important;
            }
            
            /* OpenAI Model Icons Fix */
            .bg-\\[\\#0d0d0d\\] {
                color: white !important;
            }
            
            .bg-\\[\\#0d0d0d\\] svg {
                color: white !important;
            }
            

            /* Account Popover Menu Styling */
            [data-headlessui-state="open"] div[style*="background: url"] {
                background: var(--claude-workspace-bg) !important;
                color: var(--claude-text-primary) !important;
            }
            
            /* Text colors in account popover */
            [data-headlessui-state="open"] div[style*="background: url"] .text-white\\/80,
            [data-headlessui-state="open"] div[style*="background: url"] .text-white\\/50 {
                color: var(--claude-text-primary) !important;
            }
            
            /* Button styling in account popover */
            [data-headlessui-state="open"] div[style*="background: url"] button {
                background-color: var(--claude-primary-light) !important;
                color: var(--claude-text-primary) !important;
            }
            
            [data-headlessui-state="open"] div[style*="background: url"] button:hover {
                background-color: var(--claude-primary) !important;
                color: white !important;
            }
            
            /* Links in account popover */
            [data-headlessui-state="open"] div[style*="background: url"] a {
                background-color: var(--claude-primary-light) !important;
                color: var(--claude-text-primary) !important;
            }
            
            [data-headlessui-state="open"] div[style*="background: url"] a:hover {
                background-color: var(--claude-primary) !important;
                color: white !important;
            }
            
            /* Border styling in account popover */
            [data-headlessui-state="open"] div[style*="background: url"] hr {
                border-color: var(--claude-border) !important;
            }

            /* Animation improvements - Removed all color transitions to prevent flashing */
            * {
                transition: none !important;
            }
            
            /* Only allow non-color transitions for specific elements */
            button:not([data-element-id*="workspace-tab"]):not([class*="workspace-tab"]) {
                transition: transform 0.2s ease, box-shadow 0.2s ease !important;
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
        // Don't force light mode anymore - let user choose
        // document.body.classList.remove('dark');
        
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
