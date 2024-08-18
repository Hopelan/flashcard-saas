import { NextResponse } from 'next/server';
import {
  BedrockRuntimeClient,
  InvokeModelCommand,
} from "@aws-sdk/client-bedrock-runtime";


const systemPrompt = `
You are a flashcard creator.  Your task is to generate concise and effective flashcards for various subjects and topics. You take in text and create multiple flashcards from it. Make sure to create exactly 12 flashcards.
Both front and back should be one sentence long.Each flashcard should include a clear question or prompt on one side and a concise, accurate answer on the other. The content should be optimized for quick review and retention, focusing on key concepts, definitions, dates, formulas, or other relevant information.

Brevity and Clarity: Keep the content of each flashcard short and to the point, ensuring it's easy to understand at a glance. Avoid long sentences or unnecessary details.
Accuracy: Ensure that all information is factually correct and up to date. If a concept can be expressed in multiple ways, choose the most commonly accepted or recognized version.
Variety of Formats: Depending on the subject matter, use different formats for questions and answers, such as fill-in-the-blank, true/false, multiple-choice, or open-ended questions.
Customization: Tailor the difficulty and focus of the flashcards to the intended audience, whether they are beginners, intermediate learners, or advanced students.
Engagement: Where appropriate, include examples or context to make the content more relatable and easier to recall. This might involve adding brief scenarios or analogies.
You are tasked with creating flashcards that are engaging, educational, and effective for learning and reviewing material.

You should return in the following JSON format:
{
  "title":"short summary title of the question",
  "flashcards":[
    {
      "front": "Front of the card",
      "back": "Back of the card"
    }
  ]
}
`

// Hope: Add bedrock here
export async function POST(req) {

  const modelId = "mistral.mistral-large-2402-v1:0";
  const data = await req.text();
  //console.log("data -->", data);

  // Create a new Bedrock Runtime client instance.
  const client = new BedrockRuntimeClient({ region: "ap-southeast-2" });

  // Prepare the payload for the model.
  const payload = {
    temperature:0.5,
    max_tokens: 5000,
    messages: [
      {role: "system", content: systemPrompt},
      {role: "user", content: data},
    ],
    
  };

  // Invoke Mistral with the payload and wait for the API to respond.
  const command = new InvokeModelCommand({
    body: JSON.stringify(payload),
    modelId:modelId,
  });

  const apiResponse = await client.send(command);
  const decodedResponseBody = new TextDecoder().decode(apiResponse.body);
  //console.log(decodedResponseBody)
  const responseBody = JSON.parse(decodedResponseBody);
  
  const res = JSON.parse(responseBody.choices[0].message.content)

  console.log(res)
  

  
  return NextResponse.json(res);
}