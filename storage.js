// Shared storage for demo mode
const contactMessages = [];

// Helper to add message
function addMessage(msg) {
  contactMessages.unshift(msg); // Add to front
  // Keep only last 100 messages
  if (contactMessages.length > 100) {
    contactMessages.pop();
  }
}

// Helper to update message status
function updateMessageStatus(id, status) {
  for (let i = 0; i < contactMessages.length; i++) {
    if (contactMessages[i]._id === id) {
      contactMessages[i].status = status;
      return contactMessages[i];
    }
  }
  return null;
}

// Helper to get all messages
function getMessages() {
  return contactMessages;
}

module.exports = {
  contactMessages,
  addMessage,
  updateMessageStatus,
  getMessages
};
