document.addEventListener('DOMContentLoaded', () => {
  const chatButton = document.getElementById('chat-button');
  const chatBox = document.getElementById('chat-box');
  const chatClose = document.getElementById('chat-close');
  const chatMessages = document.getElementById('chat-messages');
  const chatInput = document.getElementById('chat-input');
  const chatSend = document.getElementById('chat-send');

  let isBotTyping = false;

  // Initialize chat box visibility
  chatBox.style.display = 'none';

  // Event Listeners
  chatButton.addEventListener('click', toggleChatBox);
  chatClose.addEventListener('click', closeChatBox);
  chatSend.addEventListener('click', handleSendMessage);
  chatInput.addEventListener('keypress', handleKeyPress);

  function toggleChatBox() {
    chatBox.style.display = 'flex';
    chatInput.focus();
  }

  function closeChatBox() {
    chatBox.style.display = 'none';
  }

  function handleKeyPress(event) {
    if (event.key === 'Enter' && !isBotTyping) {
      handleSendMessage();
    }
  }

  function handleSendMessage() {
    const message = chatInput.value.trim();
    if (!message) return;

    displayMessage('user', message);
    chatInput.value = '';
    respondToMessage(message);
  }

  function respondToMessage(message) {
    isBotTyping = true;
    showTypingIndicator();

    setTimeout(() => {
      removeTypingIndicator();
      const botReply = getChatbotResponse(message);
      displayMessage('bot', botReply);
      isBotTyping = false;
    }, 1200);
  }

  function displayMessage(sender, message) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('chat-message', sender);
    messageElement.innerHTML = `<strong>${sender === 'user' ? 'You' : 'Bot'}:</strong> ${message}`;
    chatMessages.appendChild(messageElement);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  function showTypingIndicator() {
    const typingElement = document.createElement('div');
    typingElement.id = 'typing-indicator';
    typingElement.classList.add('chat-message', 'bot');
    typingElement.innerHTML = '<em>Bot is typing...</em>';
    chatMessages.appendChild(typingElement);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  function removeTypingIndicator() {
    const typingElement = document.getElementById('typing-indicator');
    if (typingElement) typingElement.remove();
  }

  function getChatbotResponse(message) {
    const normalized = message.toLowerCase();

    const responses = [
      {
        keywords: [/book/, /flight/],
        response: 'You can book flights on our <a href="aeroplane.html">Flight Booking</a> page.'
      },
      {
        keywords: [/hotel/, /price/],
        response: 'Please check our <a href="hotel.html">Hotel Booking</a> page for more details.'
      },
      {
        keywords: [/contact/],
        response: 'You can reach us by email: travelix4you@gmail.com .'
      },
      {
        keywords: [/^(hi|hello|hey)\b/],
        response: 'Hello! Welcome to our travel booking website. How may I assist you today?'
      },
      {
        keywords: [/go/, /london/],
        response: 'Yes, you can travel to London. Please check our booking page for more details.'
      },
      {
        keywords: [/go/, /amesterdam/],
        response: 'Yes, you can travel to Amsterdam. Please check our booking page for more details.'
      },
      {
        keywords: [/go/, /dubai/],
        response: 'Yes, you can travel to London. Please check our booking page for more details.'
      },
      {
        keywords: [/go/, /kerala/],
        response: 'Yes, you can travel to Kerala. Please check our booking page for more details.'
      },
      {
        keywords: [/go/, /dubai/],
        response: 'Yes, you can travel to DUbai. Please check our booking page for more details.'
      },
      {
        keywords: [/go/, /tokyo/],
        response: 'Yes, you can travel to Tokyo. Please check our booking page for more details.'
      },
      {
        keywords: [/go/, /africa/],
        response: 'Yes, you can travel to South Africa. Please check our booking page for more details.'
      },
      {
        keywords: [/^(discount|offer)\b/],
        response: 'Please play our <a href="quiz.html">Travel Quiz</a> to get discount.'
      },
    ];

    for (let item of responses) {
      if (item.keywords.every(regex => regex.test(normalized))) {
        return item.response;
      }
    }

    return 'I\'m not sure how to help with that. Please feel free to write to us, E-mail: travelix4you@gmail.com';
  }
});
