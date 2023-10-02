document.getElementById('search').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        document.getElementById('button-addon2').click();
    }
});

document.getElementById('button-addon2').addEventListener('click', function() {
    var search = document.getElementById('search').value;
    fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=' + search)
        .then(response => response.json())
        .then(data => {
            var results = document.getElementById('results');
            var countDiv = document.getElementById('count');
            results.innerHTML = '';
            countDiv.innerHTML = '';
            if (data.meals) {
                var count = 0;
                data.meals.forEach(meal => {
                    count++;
                    var mealDiv = document.createElement('div');
                    mealDiv.classList.add('card', 'mb-3');
                    mealDiv.innerHTML = `
                        <div class="row no-gutters">
                            <div class="col-md-4">
                                <img src="${meal.strMealThumb}" class="card-img" alt="${meal.strMeal}">
                            </div>
                            <div class="col-md-8">
                                <div class="card-body">
                                    <h5 class="card-title">${meal.strMeal}</h5>
                                    <p class="card-text">${meal.strInstructions}</p>
                                </div>
                            </div>
                        </div>
                    `;
                    results.appendChild(mealDiv);
                });
                countDiv.innerHTML = `<p class="text-center">Se encontraron ${count} comidas</p>`;
            } else {
                results.innerHTML = '<p class="text-center">No hay comida, compa</p>';
            }
        });
});