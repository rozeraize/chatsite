// Define the conversation flow with enhanced button actions
const conversation = [
    {
        text: "Hello! I'm ChatBot. What can I help you with today?",
        buttons: [
            { 
                text: "Tell me about this sites author", 
                action: {type: "next", value: 1 }
            },
            { 
                text: "Show some of the authors projects", 
                action: { type: "next", value: 2 }
            },
            {
                text: "Show me the Privacy Policy and Terms of Use",
                action: {type: "next", value: 3 }
            },
            {
                text: "Show me some external links",
                action: {type: "next", value: 4}
            },
            {
                text: "Quiz me",
                action: {type: "next", value: 6 }
            }
        ]
    },
    {
        text: `Sorry, but due to privacy concerns I cannot tell you about the author of this site. Is there anything else I can help you with instead?`,
        buttons: [
            { 
                text: "Tell me the time", 
                action: { type: "alert", value: `Current UTC time: ${new Date('2025-05-05T03:22:46Z').toISOString()}` }
            },
            { 
                text: "Show me what else you can help me with", 
                action: { type: "next", value: 5 }
            }
        ]
    },
    {
        text: "Here are some of the authors projects.",
        buttons: [
            { 
                text: "A windows95-like desktop", 
                action: { type: "link", value: "https://rozeraize.github.io/mywebsite/projects/desktop/desktop.html" }
            },
            { 
                text: "A linux-like terminal", 
                action: { type: "link", value: "https://rozeraize.github.io/mywebsite/projects/terminal/terminal.html" }
            },
            {
                text: "An experimental beta video game",
                action: { type: "link", value: "https://rozeraize.github.io/mywebsite/projects/beta-game-v1/game.html"}
            },
            {
                text: "Show me what else you can help me with", 
                action: { type: "next", value: 5 }
            }
        ]
    },
    {
        text: "Here is the Privacy Policy and Terms of Use.",
        buttons: [
            { 
                text: "Privacy Policy", 
                action: { type: "alert", value: "There is no privacy policy ;)" }
            },
            { 
                text: "Terms of Use", 
                action: { type: "alert", value: "There are no terms of use :P" }
            },
            {
                text: "Show me what else you can help me with", 
                action: { type: "next", value: 5 }
            }
        ]
    },
    {
        text: "Here are some external links.",
        buttons: [
            {
                text: "The authors other site",
                action: { type: "link", value: "https://rozeraize.github.io/mywebsite/"}
            },
            {
                text: "The github repository for this site",
                action: { type: "link", value: "https://github.com/rozeraize/chatsite"}
            },
            {
                text: "Show me what else you can help me with", 
                action: { type: "next", value: 5 }
            }
        ]
    },
    {
        text: "Sure! Here is everything else I can help you with.",
        buttons: [
            { 
                text: "Tell me about this sites author", 
                action: {type: "next", value: 1 }
            },
            { 
                text: "Show some of the authors projects", 
                action: { type: "next", value: 2 }
            },
            {
                text: "Show me the Privacy Policy and Terms of Use",
                action: {type: "next", value: 3 }
            },
            {
                text: "Show me some external links",
                action: {type: "next", value: 4}
            },
            {
                text: "Quiz me",
                action: {type: "next", value: 6 }
            }
        ]
    },
    {
        text: "Sure! What would you like me to quiz you on?",
        buttons: [
            {
                text: "Economics",
                action: {type: "next", value: 7}
            },
            {
                text: "The middle-east",
                action: {type: "next", value: 8 }
            },
            {
                text: "Slavery",
                action: {type: "next", value: 9 }
            },
            {
                text: "Opression",
                action: {type: "next", value: 10 }
            },
            {
                text: "Never mind, what else could you do?",
                action: {type: "next", value: 5}
            }
        ]
    }
];

let currentIndex = 0;
const textContent = document.getElementById('text-content');
const buttonContainer = document.getElementById('button-container');

function typeText(text, callback) {
    let index = 0;
    textContent.textContent = '';
    
    function type() {
        if (index < text.length) {
            textContent.textContent += text[index];
            index++;
            setTimeout(type, 50); // Adjust typing speed here
        } else {
            if (callback) callback();
        }
    }
    
    type();
}

function handleButtonAction(action) {
    switch (action.type) {
        case "next":
            showConversation(action.value);
            break;
        case "link":
            window.location.href = action.value; // Changed from window.open to direct navigation
            break;
        case "alert":
            alert(action.value);
            break;
        default:
            console.error("Unknown action type:", action.type);
    }
}

function showButtons(buttons) {
    buttonContainer.innerHTML = '';
    buttons.forEach(button => {
        const btn = document.createElement('button');
        btn.textContent = button.text;
        btn.classList.add('visible');
        btn.addEventListener('click', () => {
            handleButtonAction(button.action);
        });
        buttonContainer.appendChild(btn);
    });
}

function showConversation(index) {
    currentIndex = index;
    const currentConversation = conversation[currentIndex];
    
    // Clear previous buttons
    buttonContainer.innerHTML = '';
    
    // Show new text
    textContent.classList.add('visible');
    typeText(currentConversation.text, () => {
        // Show buttons after text is fully typed
        showButtons(currentConversation.buttons);
    });
}

// Start the conversation
showConversation(0);
