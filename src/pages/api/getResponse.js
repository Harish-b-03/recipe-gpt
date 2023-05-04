const { Configuration, OpenAIApi } = require("openai");

export default async function handler(req, res) {
    const request = req.body;
    const configuration = new Configuration({
        apiKey: request.key,
    });

    const openai = new OpenAIApi(configuration);
    const prompt = `Get me some recipes only with ingredients: ${request.data}, with its cooking procedure and a Story with it.`;
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
