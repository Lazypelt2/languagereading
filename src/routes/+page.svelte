<script>
	console.log("Component loaded");
	let text = '';
	let targetLanguage = '';
  	let cefrLevel = '';
	let file;
	let summary = '';
	let questions = [];
	
	function handleFileChange(event) {
		file = event.target.files[0]; // Assign the first selected file to `file`
	}

	async function handleSubmit() {
		console.log("hi!");
		const formData = new FormData();
		formData.append('text', text);
		formData.append('targetLanguage', targetLanguage);
    	formData.append('cefrLevel', cefrLevel);

		if (file) formData.append('file', file);

		let prompt = 	
				`You are helping a ${targetLanguage} language student at a ${cefrLevel} level. You will briefly summarize the following text in a couple of sentences in English so they can judge their reading comprehension. You will also generate three questions about the text's content. Respond only with the summary and questions.
				Respond in the following format:
				<div>
					SUMMARY(replace this)
				</div>
				<div>
					<ol>
						<li>Q1(replace this)</li>
						<li>Q2(replace this)</li>
						<li>Q3(replace this)</li>
					</ol>
				</div>
				Here is the text: ${text}`;

		
		const response = await fetch("https://api.llmcloud.app/v1/chat/completions", {
			method: "POST",
			headers: {
			"Authorization": `Bearer c96134c7-c3c8-44f7-a56c-1a38eade2b87`,
			"Content-Type": "application/json"
			},
			body: JSON.stringify({
			"model": "Meta-Llama-3-8B-Instruct",
			"messages": [
				{"role": "user", "content": prompt},
			],
			})
		});
  
		const result = await response.json();
		summary = result.choices[0].message.content;
	}
  </script>
  
  <main>
	<div class="container">
	  <h1>Reading Practice Helper</h1>
	  <p class="description">
		Welcome to the Reading Practice Helper! Enter text or upload a document
		to receive a concise summary and targeted practice questions. This tool is designed
		to aid language learners in understanding and engaging with text content.
	  </p>
	  <textarea bind:value={text} placeholder="Enter text here or upload a file below." rows="4"></textarea>
	  <input type="file" on:change={handleFileChange} accept=".txt,.pdf" />
	
	  <input type="text" bind:value={targetLanguage} placeholder="Enter your target language (e.g., Spanish)" />
	  <input type="text" bind:value={cefrLevel} placeholder="Enter your CEFR level (e.g., B1)" />

	  <button on:click={handleSubmit}>Analyze</button>
  
	  {#if summary}
		{@html summary}
	  {/if}
	</div>
  </main>
  
  