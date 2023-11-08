// app.js
const  openai  = require('openai');
const readline = require('readline');
require("dotenv").config();

const apiKey =  process.env.OPENAI_API_KEY; // Replace with your OpenAI API key
const openai1 = new openai({ key: apiKey });

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const getUserPrompt = () => {
  rl.question('Enter a prompt for the AI to respond to: ', (prompt) => {
    if (prompt) {
      generateResponse(prompt);
    } else {
      console.log('Please enter a prompt.');
      getUserPrompt();
    }
  });
};

const generateResponse = async (prompt) => {
  try {
    const response = await openai1.completions.create({
      model: 'text-davinci-002',
      prompt,
      max_tokens: 50, // Adjust as needed
    });

    const aiResponse = response.choices[0].text;
    console.log('AI Response:', aiResponse);
    getUserPrompt();
  } catch (error) {
    console.error('Error:', error.message);
    getUserPrompt();
  }
};

// Start the CLI app
getUserPrompt();
