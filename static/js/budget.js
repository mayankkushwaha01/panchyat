document.addEventListener('DOMContentLoaded', function() {
    // Budget Category Chart
    const categoryCtx = document.getElementById('budgetCategoryChart').getContext('2d');
    const categoryChart = new Chart(categoryCtx, {
        type: 'pie',
        data: {
            labels: budgetCategories.map(category => category.name),
            datasets: [{
                data: budgetCategories.map(category => category.amount),
                backgroundColor: [
                    'rgba(255, 99, 132, 0.7)',
                    'rgba(54, 162, 235, 0.7)',
                    'rgba(255, 206, 86, 0.7)',
                    'rgba(75, 192, 192, 0.7)',
                    'rgba(153, 102, 255, 0.7)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'right',
                }
            }
        }
    });
    
    // Quarterly Expenditure Chart
    const quarterlyCtx = document.getElementById('quarterlyExpenditureChart').getContext('2d');
    const quarterlyChart = new Chart(quarterlyCtx, {
        type: 'bar',
        data: {
            labels: ['Q1 (Apr-Jun)', 'Q2 (Jul-Sep)', 'Q3 (Oct-Dec)', 'Q4 (Jan-Mar)'],
            datasets: [
                {
                    label: 'Allocated',
                    data: [2500000, 2500000, 2500000, 2500000],
                    backgroundColor: 'rgba(54, 162, 235, 0.5)',
                    borderColor: 'rgba(54, 162, 235, 1)',
                    borderWidth: 1
                },
                {
                    label: 'Spent',
                    data: [2300000, 2100000, 1800000, 300000],
                    backgroundColor: 'rgba(255, 99, 132, 0.5)',
                    borderColor: 'rgba(255, 99, 132, 1)',
                    borderWidth: 1
                }
            ]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: function(value) {
                            return '₹' + value.toLocaleString();
                        }
                    }
                }
            }
        }
    });
});