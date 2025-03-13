let keranjang = [];
let totalHarga = 0;

function tambahKeKeranjang(namaProduk, harga) {
    keranjang.push({ nama: namaProduk, harga: harga });
    totalHarga += harga;
    updateKeranjang();
}

function updateKeranjang() {
    let listKeranjang = document.getElementById("keranjang");
    let total = document.getElementById("total");

    listKeranjang.innerHTML = "";
    keranjang.forEach((item, index) => {
        let li = document.createElement("li");
        li.textContent = `${item.nama} - Rp ${item.harga}`;
        listKeranjang.appendChild(li);
    });

    total.textContent = totalHarga;
}
function tambahKeKeranjang(namaProduk, harga) {
    keranjang.push({ nama: namaProduk, harga: harga });
    totalHarga += harga;
    localStorage.setItem("keranjang", JSON.stringify(keranjang));
    localStorage.setItem("totalHarga", totalHarga);
    updateKeranjang();
}
document.addEventListener("DOMContentLoaded", function () {
    if (window.location.pathname.includes("checkout.html")) {
        let checkoutList = document.getElementById("checkout-list");
        let checkoutTotal = document.getElementById("checkout-total");

        let savedCart = JSON.parse(localStorage.getItem("keranjang")) || [];
        let savedTotal = localStorage.getItem("totalHarga") || 0;

        savedCart.forEach((item) => {
            let li = document.createElement("li");
            li.textContent = `${item.nama} - Rp ${item.harga}`;
            checkoutList.appendChild(li);
        });

        checkoutTotal.textContent = savedTotal;
    }
});
document.addEventListener("DOMContentLoaded", function () {
    let paymentForm = document.getElementById("paymentForm");

    if (paymentForm) {
        paymentForm.addEventListener("submit", function (event) {
            event.preventDefault();
            
            let nama = document.getElementById("name").value;
            let alamat = document.getElementById("address").value;
            let metodePembayaran = document.getElementById("payment-method").value;

            if (nama && alamat) {
                alert(`Terima kasih, ${nama}! Pesanan Anda akan dikirim ke ${alamat} dengan metode pembayaran: ${metodePembayaran}`);
                
                // Hapus data keranjang setelah checkout
                localStorage.removeItem("keranjang");
                localStorage.removeItem("totalHarga");

                // Redirect kembali ke halaman utama
                window.location.href = "index.html";
            } else {
                alert("Harap isi semua data!");
            }
        });
    }
});
