import { OPENAI_API_KEY } from "@env";

export async function executeMessage(message) {
  console.log(OPENAI_API_KEY);
  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        messages: [
          { "role": "user", "content": message }
        ],
        model: "gpt-3.5-turbo-1106",
        response_format: { "type": "json_object" }
      }),
    });

    const responseBody = await response.text();
    console.log(responseBody);
    const jsonResponse = JSON.parse(responseBody);
    // Check if the response object has a 'choices' property
    if (!jsonResponse.choices) {
      throw new Error('Invalid response from ChatGPT API');
    }
    return jsonResponse.choices[0].message.content;
  } catch (error) {
    console.error(error);
    return '';
  }
}