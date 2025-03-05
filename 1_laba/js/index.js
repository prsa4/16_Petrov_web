const COUNTRIES = [
    "Австрия", "Албания", "Андорра", "Беларусь", "Бельгия", "Болгария", "Босния и Герцеговина", 
    "Ватикан", "Великобритания", "Венгрия", "Германия", "Греция", "Дания", "Ирландия", "Исландия", 
    "Испания", "Италия", "Кипр", "Латвия", "Литва", "Лихтенштейн", "Люксембург", "Мальта", 
    "Молдова", "Монако", "Нидерланды", "Норвегия", "Польша", "Португалия", "Россия", "Румыния", 
    "Сан-Марино", "Северная Македония", "Сербия", "Словакия", "Словения", "Украина", "Финляндия", 
    "Франция", "Хорватия", "Черногория", "Чехия", "Швейцария", "Швеция", "Эстония"
];
document.getElementById('startGameButton').addEventListener('click', () => {
    let remainingCountries = [...COUNTRIES];
    let guessedCountries = [];

    alert("Назови все страны Европы");

    while (remainingCountries.length > 0) {
        const userAnswer = prompt(`Осталось стран: ${remainingCountries.length}\nВведите название страны:`);

        if (userAnswer === null || userAnswer.toLowerCase() === "выход") {
            alert(`Игра завершена. Вы угадали ${guessedCountries.length} из ${COUNTRIES.length} стран.`);
            break;
        }

        const normalizedAnswer = userAnswer.trim().toLowerCase();
        const matchingCountry = remainingCountries.find(country => country.toLowerCase() === normalizedAnswer);

        if (matchingCountry) {
            guessedCountries.push(matchingCountry);
            remainingCountries = remainingCountries.filter(country => country !== matchingCountry);
        } else if (guessedCountries.some(country => country.toLowerCase() === normalizedAnswer)) {
            alert(`Вы уже назвали ${userAnswer}.`);
        } else {
            alert(`Неправильно! ${userAnswer} — это не страна Европы.`);
        }
    }

    if (remainingCountries.length === 0) {
        alert("Вы назвали все страны Европы!");
    }
});
