  document.addEventListener('DOMContentLoaded', () => {
    const apiURL = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false';
    let cryptoData = [];

    function fetchDataWithThen() {
        fetch(apiURL)
            .then(response => response.json())
            .then(data => {
                cryptoData = data;
                renderTable(cryptoData);
            })
            .catch(error => console.error('Error fetching data with then:', error));
    }


    async function fetchDataWithAsync() {
        try {
            const response = await fetch(apiURL);
            const data = await response.json();
            cryptoData = data;
            renderTable(cryptoData);
        } catch (error) {
            console.error('Error fetching data with async/await:', error);
        }
    }

    function renderTable(data) {
        const tableBody = document.querySelector('#cryptoTable tbody');
        tableBody.innerHTML = '';
        data.forEach(crypto => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td><img src="${crypto.image}" alt="${crypto.name}" width="30"></td>
                <td>${crypto.name}</td>
                <td>${crypto.symbol}</td>
                <td>${crypto.current_price}</td>
                <td>${crypto.total_volume}</td>
            `;
            tableBody.appendChild(row);
        });
    }

    document.querySelector('#searchButton').addEventListener('click', () => {
        const searchInput = document.querySelector('#searchInput').value.toLowerCase();
        const filteredData = cryptoData.filter(crypto =>
            crypto.name.toLowerCase().includes(searchInput) || crypto.symbol.toLowerCase().includes(searchInput)
        );
        renderTable(filteredData);
    });

    document.querySelector('#sortMarketCapButton').addEventListener('click', () => {
        const sortedData = [...cryptoData].sort((a, b) => b.market_cap - a.market_cap);
        renderTable(sortedData);
    });

  
    document.querySelector('#sortPercentageChangeButton').addEventListener('click', () => {
        const sortedData = [...cryptoData].sort((a, b) => b.price_change_percentage_24h - a.price_change_percentage_24h);
        renderTable(sortedData);
    });

   
    fetchDataWithAsync(); 
});