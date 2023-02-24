const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: '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',
});

const openai = new OpenAIApi(configuration);

export default async function getResponse(ingredients){
    
    const prompt = `Get me some recipes with ingredients: ${ingredients} and a Story with it.`

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
    return choices;
}
