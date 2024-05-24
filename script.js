let allCurrencies = [];

function fetchCurrencyData() {
    document.getElementById('loading-icon').style.display = 'block';
    fetch('https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
        allCurrencies = data;
        displayCurrencies(data);
        document.getElementById('loading-icon').style.display = 'none';
        document.getElementById('success-message').style.display = 'block';
        setTimeout(() => {
            document.getElementById('success-message').style.display = 'none';
        }, 1000);
        })
        .catch(error => {
            console.error('There has been a problem with your fetch operation:', error);
            document.getElementById('loading-icon').style.display = 'none';
        });
}

function displayCurrencies(data) {
    const currencyDataDiv = document.getElementById('currency-data');
    currencyDataDiv.innerHTML = '';

    data.forEach(currency => {
        const currencyDiv = document.createElement('div');
        currencyDiv.textContent = `${currency.cc} - ${currency.rate}`;
        currencyDataDiv.appendChild(currencyDiv);
    });
}

fetchCurrencyData();
setInterval(fetchCurrencyData, 5 * 60 * 1000);
document.getElementById('refresh-button').addEventListener('click', fetchCurrencyData);

document.getElementById('search-input').addEventListener('input', (event) => {
    const searchText = event.target.value.toLowerCase();
    const filteredCurrencies = allCurrencies.filter(currency => currency.cc.toLowerCase().includes(searchText));
    displayCurrencies(filteredCurrencies);
});