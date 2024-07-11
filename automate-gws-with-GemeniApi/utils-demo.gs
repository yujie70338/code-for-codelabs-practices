const properties = PropertiesService.getScriptProperties().getProperties();
const geminiApiKey = properties['GOOGLE_API_KEY'];
const geminiEndpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.0-pro-latest:generateContent?key=${geminiApiKey}`;
const geminiProVisionEndpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.0-pro-vision-latest:generateContent?key=${geminiApiKey}`;


function callGemini(prompt, temperature=0) {
  const payload = {
    "contents": [
      {
        "parts": [
          {
            "text": prompt
          },
        ]
      }
    ], 
    "generationConfig":  {
      "temperature": temperature,
    },
  };

  const options = { 
    'method' : 'post',
    'contentType': 'application/json',
    'payload': JSON.stringify(payload)
  };

  const response = UrlFetchApp.fetch(geminiEndpoint, options);
  const data = JSON.parse(response);
  const content = data["candidates"][0]["content"]["parts"][0]["text"];
  return content;
}

function testGemini() {
  const prompt = "The best thing since sliced bread is";
  const output = callGemini(prompt);
  console.log(prompt, output);
}

function callGeminiProVision(prompt, image, temperature=0) {
  const imageData = Utilities.base64Encode(image.getAs('image/png').getBytes());

  const payload = {
    "contents": [
      {
        "parts": [
          {
            "text": prompt
          },
          {
            "inlineData": {
              "mimeType": "image/png",
              "data": imageData
            }
          }          
        ]
      }
    ], 
    "generationConfig":  {
      "temperature": temperature,
    },
  };

  const options = { 
    'method' : 'post',
    'contentType': 'application/json',
    'payload': JSON.stringify(payload)
  };

  const response = UrlFetchApp.fetch(geminiProVisionEndpoint, options);
  const data = JSON.parse(response);
  const content = data["candidates"][0]["content"]["parts"][0]["text"];
  return content;
}

function testGeminiVision() {
  const prompt = "Provide a fun fact about this object.";
  const image = UrlFetchApp.fetch('https://storage.googleapis.com/generativeai-downloads/images/instrument.jpg').getBlob();
  const output = callGeminiProVision(prompt, image);
  console.log(prompt, output);
}

function callGeminiWithTools(prompt, tools, temperature=0) {
  const payload = {
    "contents": [
      {
        "parts": [
          {
            "text": prompt
          },
        ]
      }
    ], 
    "tools" : tools,
    "generationConfig":  {
      "temperature": temperature,
    },    
  };

  const options = { 
    'method' : 'post',
    'contentType': 'application/json',
    'payload': JSON.stringify(payload)
  };

  const response = UrlFetchApp.fetch(geminiEndpoint, options);
  const data = JSON.parse(response);
  const content = data["candidates"][0]["content"]["parts"][0]["functionCall"];
  return content;
}

function testGeminiTools() {
  const prompt = "Tell me how many days there are left in this month.";
  const tools = {
    "function_declarations": [
      {
        "name": "datetime",
        "description": "Returns the current date and time as a formatted string.",
        "parameters": {
          "type": "string"
        }
      }
    ]
  };
  const output = callGeminiWithTools(prompt, tools);
  console.log(prompt, output);
}
