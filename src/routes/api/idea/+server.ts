import { json } from '@sveltejs/kit';

export async function POST() {
	try {
		// Create a varied, creative prompt using multiple techniques
		const randomElements = getRandomPromptElements();
		
		const prompt = `Create a simple game idea for a beginner game jam.

GAME TYPE: ${randomElements.gameType}
THEME: ${randomElements.theme}
SETTING: ${randomElements.setting}

Turn these three elements into a single sentence game idea. Start with "A [game type] where you..." or "An [game type] where you..." and keep it simple and clear. Use normal words, no fancy language.`;

		const response = await fetch('https://ai.hackclub.com/chat/completions', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				messages: [
					{ 
						role: 'system', 
						content: 'You are a practical game designer. Respond with ONLY a single sentence game idea. Use simple, plain language. One basic mechanic only. No fancy words, no poetry, no flowery descriptions.' 
					},
					{ role: 'user', content: prompt }
				]
			})
		});

		if (!response.ok) {
			throw new Error(`AI API request failed: ${response.status}`);
		}

		const data = await response.json();
		let idea = data.choices[0]?.message?.content?.trim();

		if (!idea) {
			throw new Error('No idea generated from AI response');
		}

		// Clean up the response - remove any thinking tags or extra formatting
		idea = idea.replace(/<think>[\s\S]*?<\/think>/g, '').trim();
		idea = idea.replace(/^["']/g, '').replace(/["']$/g, '').trim();

		return json({ idea });

	} catch (error) {
		console.error('Error generating game idea:', error);
		return json({ error: 'Failed to generate game idea' }, { status: 500 });
	}
}

function getRandomPromptElements() {
	const gameTypes = [
		"puzzle game", "arcade game", "platformer", "racing game", "rhythm game", 
		"physics game", "strategy game", "tower defense", "stealth game", "adventure game",
		"simulation", "management game", "survival game", "exploration game", "maze game",
		"matching game", "building game", "collecting game", "jumping game", "flying game",
		"shooting game", "defense game", "escape game", "rescue game", "cooking game",
		"drawing game", "music game", "word game", "memory game", "reaction game",
		"sorting game", "stacking game", "rolling game", "sliding game", "rotating game",
		"growing game", "shrinking game", "merging game", "splitting game", "timing game"
	];

	const themes = [
		"animals", "space", "underwater", "robots", "magic", "pirates", "ninjas", "knights",
		"zombies", "aliens", "dinosaurs", "dragons", "ghosts", "monsters", "superheroes", "wizards",
		"cats", "dogs", "birds", "fish", "insects", "plants", "flowers", "trees",
		"food", "candy", "pizza", "ice cream", "vegetables", "fruits", "cooking", "baking",
		"music", "dancing", "art", "painting", "drawing", "colors", "shapes", "patterns",
		"weather", "seasons", "rain", "snow", "sun", "clouds", "storms", "rainbows",
		"vehicles", "cars", "trains", "planes", "boats", "rockets", "bicycles", "trucks",
		"sports", "soccer", "basketball", "tennis", "golf", "baseball", "swimming", "running",
		"school", "library", "playground", "home", "garden", "park", "beach", "mountain",
		"friendship", "family", "helping", "sharing", "learning", "growing", "exploring", "discovering"
	];

	const settings = [
		"forest", "castle", "spaceship", "underwater city", "desert", "mountain", "cave", "laboratory",
		"school", "playground", "park", "beach", "farm", "circus", "carnival", "zoo",
		"kitchen", "bakery", "restaurant", "garden", "greenhouse", "library", "museum", "theater",
		"factory", "workshop", "garage", "basement", "attic", "treehouse", "island", "village",
		"city", "town", "neighborhood", "street", "alley", "rooftop", "bridge", "tower",
		"maze", "dungeon", "temple", "pyramid", "ruins", "volcano", "glacier", "jungle",
		"swamp", "meadow", "valley", "hill", "cliff", "river", "lake", "pond",
		"space station", "alien planet", "moon base", "asteroid", "comet", "black hole", "nebula", "galaxy",
		"pirate ship", "treasure island", "haunted house", "magic realm", "fairy tale land", "dreamworld", "candy land", "toy store"
	];

	const randomChoice = (array: any[]) => array[Math.floor(Math.random() * array.length)];

	return {
		gameType: randomChoice(gameTypes),
		theme: randomChoice(themes),
		setting: randomChoice(settings)
	};
}
