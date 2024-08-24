// api.js

const apiKey = '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';  // Replace with your actual API key
const endpoint = 'https://api.openai.com/v1/completions';

async function summarizeCode(codeInput) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 seconds timeout

    try {
        const response = await fetch(endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: "text-davinci-003", // or "gpt-3.5-turbo"
                prompt: `Summarize this code:\n\n${codeInput}`,
                max_tokens: 150,
                temperature: 0.5
            }),
            signal: controller.signal
        });

        clearTimeout(timeoutId); // Clear the timeout if the request completes in time

        if (!response.ok) {
            throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        return data.choices[0].text.trim();
    } catch (error) {
        console.error('API request failed:', error);
        alert(`API request failed: ${error.message}`);
        return '';
    }
}
