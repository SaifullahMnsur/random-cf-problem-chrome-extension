// popup.js

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
const extensionVersion = "1.5.0";

let selectedTags = new Set();

// Check if running as a Chrome extension
const isChromeExtension = typeof chrome !== 'undefined' && chrome.runtime && chrome.tabs;

// Function to open a problem URL based on context
function openProblem(url) {
    if (isChromeExtension) {
        chrome.tabs.create({ url });
    } else {
        window.open(url, '_blank');
    }
}

// Function to populate dropdown options
function updateDropdownOptions() {
    const dropdown = document.getElementById('tag-dropdown');
    if (!dropdown) {
        console.error('Tag dropdown element not found');
        return;
    }
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

// Function to update selected tags UI
function updateSelectedTags() {
    const selectedTagsDiv = document.getElementById('selected-tags');
    if (!selectedTagsDiv) {
        console.error('Selected tags div not found');
        return;
    }
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

// Function to round rating to nearest 100
function roundToHundred(value) {
    return Math.round(value / 100) * 100;
}

// Fetch problems from Codeforces API
async function fetchProblems(minRating, maxRating, tags, exactMatch, unratedOnly) {
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
                if (unratedOnly) {
                    return rating === 0; // Only unrated problems
                } else {
                    const withinRating = rating >= minRating && rating <= maxRating;
                    if (!withinRating) return false;

                    if (tags.length === 0) return true;

                    if (exactMatch) {
                        return problem.tags.length === tags.length &&
                            problem.tags.every(tag => tags.includes(tag));
                    } else {
                        return problem.tags.some(tag => tags.includes(tag));
                    }
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

// Initialize the popup when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const dropdown = document.getElementById('tag-dropdown');
    if (!dropdown) {
        console.error('Tag dropdown element not found');
        return;
    }

    const minRatingInput = document.getElementById('minRating');
    const maxRatingInput = document.getElementById('maxRating');
    const unratedCheckbox = document.getElementById('unrated-only');

    if (!minRatingInput || !maxRatingInput || !unratedCheckbox) {
        console.error('Required input elements not found');
        return;
    }

    // Populate dropdown and display version
    updateDropdownOptions();

    // Display version
    const versionDiv = document.createElement('div');
    versionDiv.style.fontSize = '10px';
    versionDiv.style.color = 'var(--label-color)';
    versionDiv.style.textAlign = 'right';
    versionDiv.textContent = `v${extensionVersion}`;
    document.body.appendChild(versionDiv);

    // Handle tag selection
    dropdown.addEventListener('change', (e) => {
        const tag = e.target.value;
        if (tag && !selectedTags.has(tag)) {
            selectedTags.add(tag);
            updateSelectedTags();
            updateDropdownOptions();
            dropdown.value = '';
        }
    });

    // Handle unrated checkbox
    unratedCheckbox.addEventListener('change', () => {
        const isChecked = unratedCheckbox.checked;
        minRatingInput.disabled = isChecked;
        maxRatingInput.disabled = isChecked;
    });

    // Enforce rating increments of 100
    [minRatingInput, maxRatingInput].forEach(input => {
        input.addEventListener('input', (e) => {
            if (!unratedCheckbox.checked) {
                const value = parseInt(e.target.value) || 800;
                e.target.value = roundToHundred(value);
            }
        });
    });

    // Handle "Get Problem" button click
    const generateButton = document.getElementById('generate');
    if (!generateButton) {
        console.error('Generate button not found');
        return;
    }

    generateButton.addEventListener('click', async () => {
        const minRating = unratedCheckbox.checked ? 0 : parseInt(minRatingInput.value);
        const maxRating = unratedCheckbox.checked ? 0 : parseInt(maxRatingInput.value);
        const tagsArray = Array.from(selectedTags);
        const exactMatch = document.getElementById('exact-match').checked;
        const unratedOnly = unratedCheckbox.checked;
        
        const resultDiv = document.getElementById('result');
        if (!resultDiv) {
            console.error('Result div not found');
            return;
        }
        resultDiv.innerHTML = 'Loading...';

        try {
            const problems = await fetchProblems(minRating, maxRating, tagsArray, exactMatch, unratedOnly);
            if (problems.length === 0) {
                resultDiv.innerHTML = 'No problems found with these criteria.';
                return;
            }
            
            const randomProblem = problems[Math.floor(Math.random() * problems.length)];
            const problemUrl = `https://codeforces.com/problemset/problem/${randomProblem.contestId}/${randomProblem.index}`;
            
            resultDiv.innerHTML = `
                <a href="${problemUrl}" target="_blank">
                    ${randomProblem.contestId}${randomProblem.index} - ${randomProblem.name} (${randomProblem.rating || 'Unrated'})
                </a>
            `;
            
            openProblem(problemUrl);
        } catch (error) {
            console.error('Fetch error details:', error);
            resultDiv.innerHTML = `Error fetching problems: ${error.message}. Please try again.`;
        }
    });
});