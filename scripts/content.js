window.addEventListener('load', () => {
    document.getElementById('submitText').addEventListener('click', () => {
      console.log("got submit notification")

      const loadingSpinner = document.getElementById('loadingSpinner');
      const userText = document.getElementById('userText').value;
      const responseText = document.getElementById('responseText');

      if(!userText.trim()) return;
  
      const apiKey = 'INSERT KEY HERE';
      const prompt = userText;
      loadingSpinner.style.display = 'block';
      responseText.style.display = 'none';
      chrome.runtime.sendMessage(
        {
          type: 'fetchChatGptResponse',
          apiKey,
          prompt
        },
        data => {
            console.log('Data received from background:', data);
            loadingSpinner.style.display = 'none';
            responseText.style.display = 'block';
            if (data.success) {
              const chatGptResponse = data.data.choices[0].text;
              responseText.textContent = chatGptResponse;
            } else {
              responseText.textContent = data.error;
            }
          }          
      );
    });
  });
  

 
