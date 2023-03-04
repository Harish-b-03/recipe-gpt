import type { NextApiRequest, NextApiResponse } from 'next'

type data = {
  ingredients: string
}


const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: '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',
});

const openai = new OpenAIApi(configuration);

export default async function handler(
  // ingredients
  req: NextApiRequest,
  res: NextApiResponse<data>
  ){
    
    const prompt = `Get me some recipes only with ingredients: ${req.body}, with its cooking procedure and a Story with it.`
    console.log(prompt)
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: prompt,
      temperature: 0,
      max_tokens: 3000,
      top_p: 1,
      frequency_penalty: 0.4,
      presence_penalty: 0,
    });
    var choices = response.data;
    return res.status(200).json(choices);
}


