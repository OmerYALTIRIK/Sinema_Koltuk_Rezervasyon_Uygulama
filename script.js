const container = document.querySelector(".container");
const count = document.getElementById("count");
const amount = document.getElementById("amount");
const select = document.getElementById("movie");
const seats = document.querySelectorAll(".row .seat:not(.reserved)"); // tüm koltukları seçer ve reserved class'ı olanları hariç tutar.

getFromLocalStorage();
calculateTotal();

container.addEventListener("click", function (e) {
  // e = event yani hangi elemente tıkladığımızı görmek için aşağıda e.target kullanacağız ondan e parametresini fonka verdik.
  // console.log(e.target); // hangi elemente tıkladığımızı gösterir.
  if (e.target.classList.contains("seat") && !e.target.classList.contains("reserved")) {
    e.target.classList.toggle("selected"); // tıklanan elementte selected classı varsa kaldır yoksa ekle.
    calculateTotal();
  }
});

select.addEventListener("change", function (e) {
  calculateTotal();
});

function calculateTotal() {
  const selectedSeats = document.querySelectorAll(".row .seat.selected"); // seçili elementleri alır.

  const selectedSeatsArray = [];
  const seatsArr = [];

  selectedSeats.forEach(function (seat) {
    selectedSeatsArray.push(seat);
  });

  seats.forEach(function (seat) {
    seatsArr.push(seat);
  });

  let selectedSeatIndexs = selectedSeatsArray.map(function (seat) {
    return seatsArr.indexOf(seat);
  });

  let selectedSeatCount = selectedSeats.length; // seçili elementlerin sayısını alır.
  count.innerText = selectedSeatCount; // seçili elementlerin sayısını count id'li elemente yazdırır.
  amount.innerText = selectedSeatCount * select.value; // seçili elementlerin sayısını ve select elementindeki value değerini çarpar ve amount id'li elemente yazdırır.

  saveToLocalStorage(selectedSeatIndexs);
}

function getFromLocalStorage() {
  const selectedSeats = JSON.parse(localStorage.getItem("selectedSeats"));
  const selectedMovieIndex = localStorage.getItem("selectedMovieIndex");

  if (selectedSeats !== null && selectedSeats.length > 0) {
    seats.forEach(function (seat, index) {
      if (selectedSeats.indexOf(index) > -1) {
        seat.classList.add("selected");
      }
    });
  }

  if (selectedMovieIndex !== null) {
    select.selectedIndex = selectedMovieIndex;
  }
}

function saveToLocalStorage(indexs) {
  localStorage.setItem("selectedSeats", JSON.stringify(indexs));
  localStorage.setItem("selectedMovieIndex", select.selectedIndex);
}
