// AI Chat JavaScript - Handles all interactions

// DOM Elements
const chatInput = document.getElementById('chatInput');
const sendBtn = document.getElementById('sendBtn');
const chatMessages = document.getElementById('chatMessages');
const typingIndicator = document.getElementById('typingIndicator');
const inputWrapper = document.getElementById('inputWrapper');
const attachBtn = document.getElementById('attachBtn');
const emojiBtn = document.getElementById('emojiBtn');

// State
let isAITyping = false;

// Initialize
function init() {
    setupEventListeners();
    addWelcomeAnimation();
}

// Event Listeners
function setupEventListeners() {
    // Send message on button click
    sendBtn.addEventListener('click', handleSendMessage);

    // Send message on Enter key
    chatInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    });

    // Input focus effects
    chatInput.addEventListener('focus', handleInputFocus);
    chatInput.addEventListener('blur', handleInputBlur);

    // Input animation on typing
    chatInput.addEventListener('input', handleInputAnimation);

    // Quirky button interactions
    attachBtn.addEventListener('click', handleAttach);
    emojiBtn.addEventListener('click', handleEmoji);

    // Prevent default drag and drop
    chatInput.addEventListener('dragover', (e) => e.preventDefault());
    chatInput.addEventListener('drop', (e) => e.preventDefault());
}

// Handle Send Message
function handleSendMessage() {
    const message = chatInput.value.trim();

    if (message === '' || isAITyping) return;

    // Add user message
    addMessage(message, 'user');

    // Clear input
    chatInput.value = '';
    chatInput.style.height = 'auto';

    // Simulate AI response
    setTimeout(() => {
        showTypingIndicator();
        setTimeout(() => {
            hideTypingIndicator();
            addAIResponse(message);
        }, 1500 + Math.random() * 1000);
    }, 500);
}

// Add Message to Chat
function addMessage(text, sender) {
    // Remove welcome message if it exists
    const welcomeMessage = chatMessages.querySelector('.welcome-message');
    if (welcomeMessage) {
        welcomeMessage.style.animation = 'fadeOut 0.3s ease';
        setTimeout(() => welcomeMessage.remove(), 300);
    }

    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}`;
    messageDiv.innerHTML = `
        <div class="message-content">
            ${escapeHtml(text)}
        </div>
    `;

    chatMessages.appendChild(messageDiv);
    scrollToBottom();
}

// Add AI Response
function addAIResponse(userMessage) {
    const responses = [
        "That's an interesting question! Let me think about that...",
        "I understand what you're asking. Here's my perspective...",
        "Great question! Based on what you've shared...",
        "I'd be happy to help with that!",
        "That's a thoughtful point. Let me elaborate...",
        "Absolutely! Here's what I can tell you...",
        "I see where you're coming from. Let's explore this together...",
        "That's fascinating! Here's what I think...",
    ];

    const randomResponse = responses[Math.floor(Math.random() * responses.length)];
    addMessage(randomResponse, 'ai');
}

// Typing Indicator
function showTypingIndicator() {
    isAITyping = true;
    typingIndicator.classList.add('active');
    scrollToBottom();
}

function hideTypingIndicator() {
    isAITyping = false;
    typingIndicator.classList.remove('active');
}

// Input Focus Handlers
function handleInputFocus() {
    inputWrapper.classList.add('focused');
    createSparkles();
}

function handleInputBlur() {
    inputWrapper.classList.remove('focused');
}

// Input Animation
let inputTimeout;
function handleInputAnimation() {
    // Add subtle shake animation
    inputWrapper.style.animation = 'none';
    setTimeout(() => {
        inputWrapper.style.animation = '';
    }, 10);

    // Auto-resize input
    chatInput.style.height = 'auto';
    const newHeight = Math.min(chatInput.scrollHeight, 120);
    chatInput.style.height = newHeight + 'px';

    // Clear previous timeout
    clearTimeout(inputTimeout);

    // Add typing effect
    inputTimeout = setTimeout(() => {
        // Subtle pulse effect
        sendBtn.style.transform = 'scale(1.1)';
        setTimeout(() => {
            sendBtn.style.transform = '';
        }, 200);
    }, 300);
}

// Quirky Button Handlers
function handleAttach() {
    // Simulate file attachment
    const attachAnimation = document.createElement('div');
    attachAnimation.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        padding: 2rem 3rem;
        background: rgba(155, 120, 255, 0.95);
        border-radius: 1rem;
        color: white;
        font-weight: 600;
        font-size: 1.1rem;
        z-index: 1000;
        animation: fadeInUp 0.3s ease, fadeOut 0.3s ease 1.5s;
        pointer-events: none;
    `;
    attachAnimation.textContent = '📎 Attachment feature coming soon!';
    document.body.appendChild(attachAnimation);

    setTimeout(() => attachAnimation.remove(), 1800);

    // Quirky bounce animation
    attachBtn.style.animation = 'buttonBounce 0.6s ease';
    setTimeout(() => {
        attachBtn.style.animation = '';
    }, 600);
}

function handleEmoji() {
    // Add random emoji to input
    const emojis = ['😊', '👍', '🎉', '❤️', '🚀', '✨', '🌟', '💡', '🔥', '💪'];
    const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];

    chatInput.value += randomEmoji;
    chatInput.focus();

    // Quirky spin animation
    emojiBtn.style.animation = 'none';
    setTimeout(() => {
        emojiBtn.style.animation = 'buttonBounce 0.6s ease';
    }, 10);

    setTimeout(() => {
        emojiBtn.style.animation = '';
    }, 600);
}

// Create Sparkles Effect
function createSparkles() {
    const sparklesCount = 5;

    for (let i = 0; i < sparklesCount; i++) {
        setTimeout(() => {
            const sparkle = document.createElement('div');
            const x = Math.random() * inputWrapper.offsetWidth;
            const y = Math.random() * inputWrapper.offsetHeight;

            sparkle.style.cssText = `
                position: absolute;
                left: ${x}px;
                top: ${y}px;
                width: 4px;
                height: 4px;
                background: white;
                border-radius: 50%;
                pointer-events: none;
                z-index: 10;
                animation: sparkleFloat 1s ease-out forwards;
            `;

            inputWrapper.appendChild(sparkle);

            setTimeout(() => sparkle.remove(), 1000);
        }, i * 100);
    }

    // Add sparkle animation to CSS dynamically
    if (!document.getElementById('sparkle-animation')) {
        const style = document.createElement('style');
        style.id = 'sparkle-animation';
        style.textContent = `
            @keyframes sparkleFloat {
                0% {
                    transform: translateY(0) scale(0);
                    opacity: 1;
                }
                50% {
                    transform: translateY(-20px) scale(1);
                    opacity: 1;
                }
                100% {
                    transform: translateY(-40px) scale(0);
                    opacity: 0;
                }
            }

            @keyframes fadeOut {
                from {
                    opacity: 1;
                    transform: translateY(0);
                }
                to {
                    opacity: 0;
                    transform: translateY(-20px);
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// Welcome Animation
function addWelcomeAnimation() {
    const welcomeIcon = document.querySelector('.welcome-icon');
    if (welcomeIcon) {
        setTimeout(() => {
            welcomeIcon.style.transform = 'scale(1.1) rotate(5deg)';
            setTimeout(() => {
                welcomeIcon.style.transform = '';
            }, 300);
        }, 500);
    }
}

// Scroll to Bottom
function scrollToBottom() {
    chatMessages.scrollTo({
        top: chatMessages.scrollHeight,
        behavior: 'smooth'
    });
}

// Escape HTML
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Easter Eggs and Fun Interactions
function addEasterEggs() {
    // Konami Code Easter Egg
    let konamiCode = [];
    const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

    document.addEventListener('keydown', (e) => {
        konamiCode.push(e.key);
        konamiCode = konamiCode.slice(-10);

        if (konamiCode.join(',') === konamiSequence.join(',')) {
            triggerRainbowMode();
        }
    });
}

function triggerRainbowMode() {
    document.body.style.animation = 'rainbowBg 3s ease infinite';

    const style = document.createElement('style');
    style.textContent = `
        @keyframes rainbowBg {
            0% { filter: hue-rotate(0deg); }
            100% { filter: hue-rotate(360deg); }
        }
    `;
    document.head.appendChild(style);

    setTimeout(() => {
        document.body.style.animation = '';
        style.remove();
    }, 10000);
}

// Add some fun interactions
chatInput.addEventListener('focus', () => {
    if (Math.random() < 0.1) { // 10% chance
        createSparkles();
    }
});

// Initialize the chat
init();
addEasterEggs();

// Add a subtle parallax effect to the background
document.addEventListener('mousemove', (e) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 20;
    const y = (e.clientY / window.innerHeight - 0.5) * 20;

    const container = document.querySelector('.chat-container');
    if (container) {
        container.style.backgroundPosition = `${x}px ${y}px`;
    }
});
