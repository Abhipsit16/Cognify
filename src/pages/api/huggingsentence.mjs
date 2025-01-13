//create an account on www.huggingface.com, click on your profile button, go to access tokens and get the API key starting with hf_...
//create a .env file in the root of your project and add the following line: API_KEY=hf_...

//you can now use the code and also find out the tags
import dotenv from 'dotenv';
import fetch from 'node-fetch';

dotenv.config({ path: '.env.local' });

const HF_API_KEY = process.env.API_KEY; // Replace with your actual API key
const HF_API_URL = 'https://api-inference.huggingface.co/models/sentence-transformers/paraphrase-xlm-r-multilingual-v1';

function orderSentencesBySimilarity(sentences, similarityScores) {
    return sentences.map((sentence, index) => ({
        sentence,
        similarity: similarityScores[index],
    })).sort((a, b) => b.similarity - a.similarity);
}

async function fetchWithRetry(url, options, retries = 5) {
    for (let i = 0; i < retries; i++) {
        try {
            const response = await fetch(url, options);
            if (response.ok) return response;
            console.warn(`Retrying (${i + 1}/${retries})...`);
        } catch (error) {
            console.error(`Retry ${i + 1} failed:`, error);
        }
    }
    throw new Error('Failed to fetch after retries.');
}

async function sentenceSimilarity(sourceSentence, sentences) {
    try {
        const payload = {
            inputs: {
                source_sentence: sourceSentence,
                sentences: sentences,
            },
        };

        const response = await fetchWithRetry(HF_API_URL, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${HF_API_KEY}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        });

        const result = await response.json();
        return result;
    } catch (error) {
        console.error('Error:', error);
        return null;
    }
}

(async () => {
    const sourceSentence = 'That is a happy person';
    const sentences = [
        'That is a happy dog',
        'That is a very happy person',
        'Today is a sunny day',
    ];

    const similarityScores = await sentenceSimilarity(sourceSentence, sentences);
    if (similarityScores == null) {
        console.log("Error in fetching similarity scores");
        return;
    }
    const newOrder = orderSentencesBySimilarity(sentences, similarityScores);
    console.log(newOrder);
})();
