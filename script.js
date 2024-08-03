const wheel = document.getElementById("wheel");
const spinBtn = document.getElementById("spin-btn");
const finalValue = document.getElementById("final-value");
// Object that stores values of minimum and maximum angle for a value
const rotationValues = [
  { minDegree: 0, maxDegree: 45, value: "$20 Stocks Voucher" },
  { minDegree: 45, maxDegree: 90, value: "Tiger Merch Pack" },
  { minDegree: 91, maxDegree: 136, value: "$50 USD Tesla SHARES" },
  { minDegree: 137, maxDegree: 181, value: "$50  Stocks Voucher" },
  { minDegree: 182, maxDegree: 227, value: "$10  Stocks Voucher" },
  { minDegree: 228, maxDegree: 273, value: "$20  Stocks Voucher" },
  { minDegree: 274, maxDegree: 319, value: "Tiger Merch Pack" },
  { minDegree: 319, maxDegree: 360, value: "$10  Stocks Voucher" },
];
// Size of each piece
const data = [45, 45, 45, 45, 45, 45, 45, 45];
// Background color for each piece
var pieColors = [
  "#fff",
  "#EEED09",
  "#fff",
  "#EEED09",
  "#fff",
  "#EEED09",
  "#fff",
  "#EEED09",
];
// Create chart
let myChart = new Chart(wheel, {
  // Plugin for displaying text on pie chart
  plugins: [ChartDataLabels],
  // Chart Type Pie
  type: "pie",
  data: {
    // Labels(values which are to be displayed on chart)
    labels: [
      "$20  Stocks Voucher",
      "Tiger Merch Pack",
      "$50 USD Tesla SHARES ",
      "$50  Stocks Voucher",
      "$10  Stocks Voucher",
      "$20  Stocks Voucher",
      "Tiger Merch Pack",
      "$10  Stocks Voucher",
    ],
    // Settings for dataset/pie
    datasets: [
      {
        backgroundColor: pieColors,
        data: data,
      },
    ],
  },
  options: {
    // Responsive chart
    responsive: true,
    animation: { duration: 0 },
    plugins: {
      // Hide tooltip and legend
      tooltip: false,
      legend: {
        display: false,
      },
      // Display labels inside pie chart
      datalabels: {
        color: "#000",
        formatter: (_, context) => context.chart.data.labels[context.dataIndex],
        font: { size: 16 },
      },
    },
  },
});
// Display value based on the randomAngle
const valueGenerator = (angleValue) => {
  for (let i of rotationValues) {
    // If the angleValue is between min and max then display it
    if (angleValue >= i.minDegree && angleValue <= i.maxDegree) {
      finalValue.innerHTML = `<p>You won: ${i.value}</p>`;
      spinBtn.disabled = false;
      break;
    }
  }
};

// Spinner count
let count = 0;
// 100 rotations for animation and last rotation for result
let resultValue = 101;
// Start spinning
spinBtn.addEventListener("click", () => {
  spinBtn.disabled = true;
  // Empty final value
  finalValue.innerHTML = `<p>Good Luck!</p>`;
  // Generate random degrees to stop at
  let randomDegree = Math.floor(Math.random() * (355 - 0 + 1) + 0);
  // Interval for rotation animation
  let rotationInterval = window.setInterval(() => {
    // Set rotation for piechart
    /*
    Initially to make the piechart rotate faster we set resultValue to 101 so it rotates 101 degrees at a time and this reduces by 1 with every count. Eventually on last rotation we rotate by 1 degree at a time.
    */
    myChart.options.rotation = myChart.options.rotation + resultValue;
    // Update chart with new value;
    myChart.update();
    // If rotation > 360 reset it back to 0
    if (myChart.options.rotation >= 360) {
      count += 1;
      resultValue -= 5;
      myChart.options.rotation = 0;
    } else if (count > 15 && myChart.options.rotation == randomDegree) {
      valueGenerator(randomDegree);
      clearInterval(rotationInterval);
      count = 0;
      resultValue = 101;
      // Adjust the wheel's rotation to align with the winning segment
      let finalRotation = 360 - (randomDegree % 360);
      myChart.options.rotation = finalRotation;
      myChart.update();
    }
  }, 10);
});
