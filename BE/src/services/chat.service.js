const Chat = require('../models/Chat');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const { GEMINI_API_KEY } = require('../config/env');
const logger = require('../utils/logger');

let genAI = null;
const GEMINI_MODEL = process.env.GEMINI_MODEL || 'gemini-1.5-flash';

const getGenAI = () => {
  if (!genAI && GEMINI_API_KEY) {
    console.log('Gemini key exists:', true);
    console.log('Gemini key prefix:', `${GEMINI_API_KEY.substring(0, 8)}...`);
    genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
  }

  if (!GEMINI_API_KEY) {
    logger.warn('Gemini API key not configured or missing. Using fallback response.');
  }

  return genAI;
};

/**
 * Create a new chat conversation
 */
const createChat = async (userId, { title, topic } = {}) => {
  const chat = await Chat.create({
    userId,
    title: title || `Chat - ${new Date().toLocaleDateString()}`,
    topic: topic || 'general',
    messages: [],
  });
  return chat;
};

/**
 * Get all conversations for user
 */
const getUserChats = async (userId, { page = 1, limit = 10 } = {}) => {
  const skip = (page - 1) * limit;

  const [chats, total] = await Promise.all([
    Chat.find({ userId }).sort({ createdAt: -1 }).skip(skip).limit(Number(limit)).select('-messages'),
    Chat.countDocuments({ userId }),
  ]);

  return {
    chats,
    pagination: {
      total,
      page: Number(page),
      limit: Number(limit),
      totalPages: Math.ceil(total / limit),
    },
  };
};

/**
 * Get single chat with all messages
 */
const getChatById = async (chatId, userId) => {
  const chat = await Chat.findById(chatId);

  if (!chat) {
    const error = new Error('Chat not found');
    error.statusCode = 404;
    throw error;
  }

  if (chat.userId.toString() !== userId.toString()) {
    const error = new Error('Access denied. This chat belongs to another user.');
    error.statusCode = 403;
    throw error;
  }

  return chat;
};

/**
 * Send message and get AI response
 */
const sendMessage = async (chatId, userId, userMessage, options = {}) => {
  const chat = await getChatById(chatId, userId);

  chat.messages.push({
    sender: 'USER',
    text: userMessage,
  });

  const aiResponse = await generateAIResponse(userMessage, chat.messages, chat.topic, options);

  chat.messages.push({
    sender: 'AI',
    text: aiResponse,
  });

  if (chat.messages.length === 2) {
    const title = userMessage.substring(0, 50) + (userMessage.length > 50 ? '...' : '');
    chat.title = title;
  }

  await chat.save();
  return {
    userMessage: chat.messages[chat.messages.length - 2],
    aiMessage: chat.messages[chat.messages.length - 1],
  };
};

/**
 * Generate AI response using Gemini API
 */
const generateAIResponse = async (userMessage, messageHistory, topic = 'general', options = {}) => {
  const client = getGenAI();

  if (!client) {
    logger.warn('Gemini API key not configured. Using fallback response.');
    return getFallbackResponse(userMessage, topic);
  }

  try {
    const systemPrompt = getSystemPrompt(topic);

    console.log('Gemini key exists:', !!GEMINI_API_KEY);
    console.log('Using Gemini model:', GEMINI_MODEL);
    console.log('Using system prompt for topic:', topic);

    const recentHistory = messageHistory.slice(-10);
    const historyWithoutCurrent =
      recentHistory.length > 0 && recentHistory[recentHistory.length - 1].sender === 'USER'
        ? recentHistory.slice(0, -1)
        : recentHistory;

    const conversationHistory = [
      {
        role: 'system',
        parts: [{ text: systemPrompt }],
      },
      ...historyWithoutCurrent.map((msg) => ({
        role: msg.sender === 'USER' ? 'user' : 'assistant',
        parts: [{ text: msg.text }],
      })),
    ];

    const model = client.getGenerativeModel({ model: GEMINI_MODEL });
    const chat = model.startChat({
      history: conversationHistory,
      generationConfig: {
        maxOutputTokens: 500,
      },
    });

    const prompt = userMessage;

    if (options.stream && typeof options.onChunk === 'function') {
      const resultStream = await chat.sendMessageStream(prompt);
      let fullText = '';

      for await (const chunk of resultStream.stream) {
        const chunkText = chunk.text();
        if (chunkText) {
          fullText += chunkText;
          options.onChunk(chunkText);
        }
      }

      return fullText || 'I understand. Tell me more about this.';
    }

    const result = await chat.sendMessage(prompt);
    const text = result.response.text();

    return text || 'I understand. Tell me more about this.';
  } catch (error) {
    console.error('========== GEMINI ERROR ==========');
    console.error(error);
    console.error('Message:', error?.message);
    console.error('Gemini key exists:', !!GEMINI_API_KEY);
    console.error('Gemini key prefix:', GEMINI_API_KEY ? `${GEMINI_API_KEY.substring(0, 8)}...` : 'missing');

    logger.error('Chat AI service error: %s', error?.message || 'Unknown error');
    logger.error(error);
    return getFallbackResponse(userMessage, topic);
  }
};

/**
 * Get system prompt based on topic
 */
const getSystemPrompt = (topic) => {
  const prompts = {
    fashion: `You are a professional fashion consultant and stylist. Help users with:
- Fashion advice and recommendations
- Outfit styling tips
- Color coordination
- Fabric and material guidance
- Trends and style choices
Be friendly, professional, and provide practical advice. Keep responses concise (under 300 words).`,

    outfit: `You are an expert outfit advisor. Help users with:
- Outfit composition and balance
- Occasion-appropriate dressing
- Style score and feedback
- Improvement suggestions
- Item recommendations
Be enthusiastic and supportive. Keep responses concise (under 300 words).`,

    style: `You are a style coach helping users discover their personal style. Help with:
- Personal style discovery
- Style preferences and inspirations
- Wardrobe planning
- Style evolution
- Confidence building
Be encouraging and personalized. Keep responses concise (under 300 words).`,

    general: `You are a helpful fashion and lifestyle assistant. You can discuss:
- Fashion and style topics
- Clothing recommendations
- Fashion trends
- General lifestyle advice
Be conversational, friendly, and helpful. Keep responses concise (under 300 words).`,
  };

  return prompts[topic] || prompts.general;
};

/**
 * Fallback response when AI unavailable
 */
const getFallbackResponse = (userMessage, topic) => {
  const responses = {
    fashion: 'That sounds interesting! Fashion is all about expressing yourself. Could you tell me more about your style preferences or what kind of advice you\'re looking for?',
    outfit: 'Great question about your outfit! I\'d love to help you style it better. Can you describe the items you\'re thinking of wearing?',
    style: 'Finding your personal style is a journey! What aspects of fashion inspire you the most?',
    general: 'I appreciate that! Feel free to tell me more about what\'s on your mind.',
  };

  return responses[topic] || responses.general;
};

/**
 * Delete chat
 */
const deleteChat = async (chatId, userId) => {
  const chat = await Chat.findById(chatId);

  if (!chat) {
    const error = new Error('Chat not found');
    error.statusCode = 404;
    throw error;
  }

  if (chat.userId.toString() !== userId.toString()) {
    const error = new Error('Access denied.');
    error.statusCode = 403;
    throw error;
  }

  await Chat.findByIdAndDelete(chatId);
  return { message: 'Chat deleted successfully' };
};

/**
 * Clear all messages in chat
 */
const clearChat = async (chatId, userId) => {
  const chat = await getChatById(chatId, userId);
  chat.messages = [];
  await chat.save();
  return chat;
};

module.exports = {
  createChat,
  getUserChats,
  getChatById,
  sendMessage,
  deleteChat,
  clearChat,
};
