function hesapla() {
    var dersSayisi = parseInt(document.getElementById("ders-sayisi").value);
    var dersListesi = document.getElementById("ders-listesi");

    // Ders notu ve kredi bölümlerini temizle
    dersListesi.innerHTML = "";

    for (var i = 0; i < dersSayisi; i++) {
        // Ders notu input elementini oluştur
        var dersNotuInput = document.createElement("select");
        dersNotuInput.name = "ders-notu-" + i;
        dersNotuInput.className = "grades";
        dersNotuInput.innerHTML = `
            <option value="AA">AA</option>
            <option value="BA">BA</option>
            <option value="BB">BB</option>
            <option value="CB">CB</option>
            <option value="CC">CC</option>
            <option value="DC">DC</option>
            <option value="DD">DD</option>
            <option value="FF">FF</option>
        `;

        // Kredi input elementini oluştur
        var krediInput = document.createElement("input");
        krediInput.type = "number";
        krediInput.className = "kredi";
        krediInput.min = "1";

        // Ders notu ve kredi bölümlerini ders listesine ekle
        var listItem = document.createElement("li");
        listItem.appendChild(dersNotuInput);
        listItem.appendChild(krediInput);
        dersListesi.appendChild(listItem);
    }
}

// Hesapla butonuna click event listener ekle
document.getElementById("hesapla").addEventListener("click", hesapla);