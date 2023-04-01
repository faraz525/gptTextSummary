chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.type === 'fetchChatGptResponse') {
      //prePrompt = 'Imagine you are a detective investigating a case, and your task is to find the key information in a complex legal document. Your goal is to explain what the document is about and what it means in a way that a middle schooler would understand. Your mission is to highlight the most important details and to identify any legal jargon that may be confusing. What are the key takeaways from this document, and why are they important? Summarize the information in easy to digest bullet points.'
      const { apiKey, prompt } = request;
      const prePrompt = `Please summarize the following piece of writing into bullet points:
      -------------------------------------------------------------
      ${prompt}
      
      Please provide the bullet points in the following format:
      - [Bullet point 1]
      - [Bullet point 2]
      - [Bullet point 3]
      ...
      
      Additionally, please provide a brief summary of the main point or message of the writing:
      [Insert summary here]
      
      If text-davinci-003 is unable to generate a summary in the format described above, please provide a brief reason:
      [Insert reason here]
      -------------------------------------------------------------`;
      
      console.log("I am in the background.js :" + prompt)
      fetch('https://api.openai.com/v1/engines/text-davinci-003/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          prompt: prePrompt,
          max_tokens: 1000,
          temperature: 0.8
        })
      })
        .then(response => {
          console.log('API response:', response);
          if (response.ok) {
            return response.json();
          } else {
            throw new Error('Error: Unable to get response from ChatGPT');
          }
        })
        .then(data => sendResponse({ success: true, data }))
        .catch(error => sendResponse({ success: false, error: error.message }));
  
      return true;
    }
  });
  