function searchHotels() {
    const destination = document.getElementById("destination").value;
    const checkin = document.getElementById("checkin").value;
    const checkout = document.getElementById("checkout").value;
    const guests = document.getElementById("guests").value;

    const hotelList = document.getElementById("hotel-list");
    hotelList.innerHTML = ""; // Clear previous results

    if (!checkin || !checkout) {
        alert("Please select both check-in and check-out dates.");
        return;
    }

    const hotels = generateFakeHotels(destination);

    if (hotels.length === 0) {
        hotelList.innerHTML = "<p>No hotels found for the selected destination.</p>";
        return;
    }

    hotels.forEach(hotel => {
        const hotelCard = document.createElement("div");
        hotelCard.classList.add("hotel-card");

        hotelCard.innerHTML = `
        <div class="hotel-card-content">
            <div class="hotel-info">
                <h2>${hotel.name}</h2>
                <p>${hotel.description}</p>
                <p><strong>Price:</strong> $${hotel.pricePerNight} per night</p>
                <button onclick="bookHotel('${hotel.name}')">Book Now</button>
            </div>
            <div class="hotel-image">
                <img src="${hotel.image}" alt="${hotel.name}">
            </div>
        </div>
    `;
     

        hotelList.appendChild(hotelCard);
    });
}

function generateFakeHotels(destination) {
    const hotelData = {
        kerala: [
            { name: "Old Harbour Hotel", description: "A serene retreat in the lush backwaters.", pricePerNight: 120, image:"photos/forte-kochi.jpg" },
            { name: "Kumarakom Lake Resort", description: "Experience traditional Kerala hospitality.", pricePerNight: 90, image:"photos/kumarakom-lake-resort.jpg"}
        ],
        london: [
            { name: "The Savoy", description: "Luxury stay in the heart of London.", pricePerNight: 200, image:"photos/savoy.jpg"},
            { name: "Boutique Hotels", description: "Cozy and convenient near the river.", pricePerNight: 150, image:"photos/boutique.jpg"}
        ],
        tokyo: [
            { name: "Park Haytt", description: "Modern amenities in downtown Tokyo.", pricePerNight: 180, image:"photos/park-hyatt.jpg"},
            { name: "Andaz Hotel", description: "Traditional stay with a modern touch.", pricePerNight: 140, image:"photos/andaz.jpg" }
        ],
        dubai: [
            { name: "Atlantis The Palm", description: "Experience luxury in the desert.", pricePerNight: 250, image:"photos/atlantis.jpg"},
            { name: "Burj Al Arab", description: "Breathtaking views of Dubai’s skyline.", pricePerNight: 300, image:"photos/burj-al-arab.jpg"}
        ],
        "south-africa": [
            { name: "Mount Nelson Hotel", description: "Stay close to nature and wildlife.", pricePerNight: 160, image:"photos/mountnelson.jpg"},
            { name: "Singita Lodges", description: "Relax by the scenic South African coast.", pricePerNight: 130, image:"photos/singita.jpg" }
        ],
        amsterdam: [
            { name: "Amstel Hotel", description: "Charming views and cozy vibes.", pricePerNight: 170, image:"photos/amstel-hotel.jpg"},
            { name: "Conservatorium", description: "Classic Dutch style and comfort.", pricePerNight: 150, image:"photos/conservatorium.jpg" }
        ]
    };

    return hotelData[destination] || [];
}

function bookHotel(hotelName) {
    alert(`You have selected to book: ${hotelName}. Booking functionality coming soon!`);
}
