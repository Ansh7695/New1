document.addEventListener('DOMContentLoaded', () => {
    const recipesDiv = document.getElementById('recipes');
    const recipes = JSON.parse(localStorage.getItem('recipes')) || [];

    const displayRecipes = () => {
        recipesDiv.innerHTML = '';
        recipes.forEach((recipe, index) => {
            const recipeCard = document.createElement('div');
            recipeCard.className = 'recipe-card';
            recipeCard.innerHTML = `
                <h3>${recipe.name}</h3>
                <h4>Ingredients:</h4>
                <p>${recipe.ingredients.replace(/\n/g, '<br>')}</p>
                <h4>Instructions:</h4>
                <p>${recipe.instructions.replace(/\n/g, '<br>')}</p>
                <button class="delete-btn" data-index="${index}"><i class="fas fa-trash-alt"></i> Delete</button>
            `;
            recipesDiv.appendChild(recipeCard);
        });
    };

    const deleteRecipe = (index) => {
        recipes.splice(index, 1);
        localStorage.setItem('recipes', JSON.stringify(recipes));
        displayRecipes();
    };

    if (recipesDiv) {
        displayRecipes();
    }

    const form = document.getElementById('recipe-form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = form.name.value;
            const ingredients = form.ingredients.value;
            const instructions = form.instructions.value;
            const newRecipe = { name, ingredients, instructions };
            recipes.push(newRecipe);
            localStorage.setItem('recipes', JSON.stringify(recipes));
            form.reset();
            displayRecipes();
            window.location.href = 'index.html';
        });
    }

    recipesDiv.addEventListener('click', (e) => {
        if (e.target.classList.contains('delete-btn') || e.target.closest('.delete-btn')) {
            const index = e.target.closest('.delete-btn').dataset.index;
            deleteRecipe(index);
        }
    });
});
