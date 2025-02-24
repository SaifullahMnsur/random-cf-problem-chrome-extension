// List of available tags
const availableTags = [
    "2-sat", "binary search", "bitmasks", "brute force", "chinese remainder theorem",
    "combinatorics", "constructive algorithms", "data structures", "dfs and similar",
    "divide and conquer", "dp", "dsu", "expression parsing", "fft", "flows",
    "games", "geometry", "graph matchings", "graphs", "greedy", "hashing",
    "implementation", "interactive", "math", "matrices", "meet-in-the-middle",
    "number theory", "probabilities", "schedules", "shortest paths", "sortings",
    "string suffix structures", "strings", "ternary search", "trees", "two pointers"
];

const apiUrl = 'https://codeforces.com/api/problemset.problems';

let selectedTags = new Set();

// Populate dropdown and handle tag selection
document.addEventListener('DOMContentLoaded', () => {
    const dropdown = document.getElementById('tag-dropdown');
    updateDropdownOptions();

    dropdown.addEventListener('change', (e) => {
        const tag = e.target.value;
        if (tag && !selectedTags.has(tag)) {
            selectedTags.add(tag);
            updateSelectedTags();
            updateDropdownOptions();
            dropdown.value = ''; // Reset dropdown
        }
    });
});

function updateDropdownOptions() {
    const dropdown = document.getElementById('tag-dropdown');
    dropdown.innerHTML = '<option value="">Select a tag</option>';
    availableTags
        .filter(tag => !selectedTags.has(tag))
        .forEach(tag => {
            const option = document.createElement('option');
            option.value = tag;
            option.textContent = tag;
            dropdown.appendChild(option);
        });
}

function updateSelectedTags() {
    const selectedTagsDiv = document.getElementById('selected-tags');
    selectedTagsDiv.innerHTML = '';
    selectedTags.forEach(tag => {
        const chip = document.createElement('span');
        chip.className = 'tag-chip';
        chip.innerHTML = `${tag} <span class="remove-tag" data-tag="${tag}">×</span>`;
        selectedTagsDiv.appendChild(chip);
    });

    document.querySelectorAll('.remove-tag').forEach(button => {
        button.addEventListener('click', (e) => {
            const tag = e.target.dataset.tag;
            selectedTags.delete(tag);
            updateSelectedTags();
            updateDropdownOptions();
        });
    });
}

document.getElementById('generate').addEventListener('click', async () => {
    const minRating = parseInt(document.getElementById('minRating').value);
    const maxRating = parseInt(document.getElementById('maxRating').value);
    const tagsArray = Array.from(selectedTags);
    const exactMatch = document.getElementById('exact-match').checked;
    
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = 'Loading...';

    try {
        const problems = await fetchProblems(minRating, maxRating, tagsArray, exactMatch);
        if (problems.length === 0) {
            resultDiv.innerHTML = 'No problems found with these criteria.';
            return;
        }
        
        const randomProblem = problems[Math.floor(Math.random() * problems.length)];
        const problemUrl = `https://codeforces.com/problemset/problem/${randomProblem.contestId}/${randomProblem.index}`;
        
        // Display the problem link
        resultDiv.innerHTML = `
            <a href="${problemUrl}" target="_blank">
                ${randomProblem.contestId}${randomProblem.index} - ${randomProblem.name} (${randomProblem.rating || 'Unrated'})
            </a>
        `;
        
        // Open the problem in a new tab
        chrome.tabs.create({ url: problemUrl });
    } catch (error) {
        console.error('Fetch error details:', error);
        resultDiv.innerHTML = `Error fetching problems: ${error.message}. Please try again.`;
    }
});

async function fetchProblems(minRating, maxRating, tags, exactMatch) {
    try {
        const url = tags.length > 0 
            ? `${apiUrl}?tags=${tags.join(';')}`
            : apiUrl;
        
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        if (data.status !== "OK") {
            throw new Error(`API error: ${data.comment}`);
        }

        const problems = data.result.problems
            .filter(problem => {
                const rating = problem.rating || 0;
                const withinRating = rating >= minRating && rating <= maxRating;
                if (!withinRating) return false;

                if (tags.length === 0) return true;

                if (exactMatch) {
                    return problem.tags.length === tags.length &&
                        problem.tags.every(tag => tags.includes(tag));
                } else {
                    return problem.tags.some(tag => tags.includes(tag));
                }
            });

        return problems.map(problem => ({
            contestId: problem.contestId,
            index: problem.index,
            name: problem.name,
            rating: problem.rating || 0,
            link: `https://codeforces.com/problemset/problem/${problem.contestId}/${problem.index}`
        }));
    } catch (error) {
        console.error('Error fetching problems:', error);
        throw error;
    }
}