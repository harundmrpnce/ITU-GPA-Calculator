function hesapla() {
    var dersSayisi = parseInt(document.getElementById("ders-sayisi").value);
    var dersListesi = document.getElementById("ders-listesi");

    dersListesi.innerHTML = "";

    for (var i = 0; i < dersSayisi; i++) {
        createDersItem(i, dersListesi);
    }
}

function createDersItem(index, dersListesi) {
    var listItem = document.createElement("li");    

    var dersNotuInput = document.createElement("select");
    dersNotuInput.name = "ders-notu-" + index;
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

    var krediInput = document.createElement("select");
    krediInput.name = "kredi-" + index;
    krediInput.className = "kredi";
    krediInput.innerHTML = `
        <option value="1">1</option>
        <option value=1.5">1.5</option>
        <option value="2">2</option>
        <option value="2.5">2.5</option>
        <option value="3">3</option>
        <option value="3.5">3.5</option>
        <option value="4">4</option>
        <option value="4.5">4.5</option>
        <option value="5">5</option>
    `;

    var removeButton = document.createElement("button");
    removeButton.innerText = "Remove";
    removeButton.className = "remove-button";
    removeButton.addEventListener("click", function () {
        listItem.remove();
    });

    listItem.appendChild(dersNotuInput);
    listItem.appendChild(krediInput);
    listItem.appendChild(removeButton);
    dersListesi.appendChild(listItem);
}

function dersEkle() {
    var dersListesi = document.getElementById("ders-listesi");
    createDersItem(dersListesi.getElementsByTagName("li").length, dersListesi);
}

document.getElementById("hesapla").addEventListener("click", hesapla);
document.getElementById("ders-ekle").addEventListener("click", dersEkle);