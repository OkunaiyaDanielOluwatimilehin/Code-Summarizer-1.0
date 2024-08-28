document.addEventListener("DOMContentLoaded", function() {
    // Typewriter effect
    const text = "CODE SUMMARIZER 1.0";
    const typewriterElement = document.getElementById('typewriter');
    let index = 0;

    function type() {
        if (index < text.length) {
            typewriterElement.textContent += text.charAt(index);
            index++;
            setTimeout(type, 100); // Adjust the speed by changing the timeout value
        }
    }

    type();

    // Event listener for the 'Summarize' button
    const submitButton = document.getElementById("submitButton");
    if (submitButton) {
        submitButton.addEventListener("click", function() {
            const inputCode = document.getElementById("inputBox").value;
            const outputBox = document.getElementById("outputBox");

            if (inputCode.trim() === "") {
                outputBox.value = "Please enter some code.";
                return;
            }

            outputBox.value = "Processing...";

            fetch('https://api.openai.com/v1/engines/text-davinci-003/completions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 
                },
                body: JSON.stringify({
                    prompt: `Summarize the following code:\n${inputCode}`,
                    max_tokens: 50
                })
            })
            .then(response => response.json())
            .then(data => {
                outputBox.value = data.choices[0].text.trim();
            })
            .catch(error => {
                console.error('Error:', error);
                outputBox.value = "An error occurred. Please try again.";
            });
        });
    } else {
        console.error('Submit button not found');
    }
});
