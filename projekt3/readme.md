# Projekt BarberShop
Aplikacja pozwala na zarządzanie personelem, produktami, uslugami, platnosciami, zamowieniami i uzytkownikami. Aplikacja umożliwia rezerwacje usług i zamówienie produktów.

## Funkcjonalności
1. Platnosc - lista metod płatności
2. Produkt - lista produktów możliwych do zamówienia
3. Rezerwacja - lista rezerwacji
4. Usluga - lista usług możliwych do rezerwacji
5. Uzytkownik - lista użytkowników
6. Zamowienia - lista zamówień

## Modele danych

Platnosc
- platnoscOnline
- metodaPlatnosci

Rezerwacja
- termin
- terminKoniec
- usluga
- statusRezerwacji
- klient
- pracownik
- uzytkownik

Produkt
- nazwa
- cena
- ilosc

Usluga
- nazwa
- cena
- czas

Uzytkownik
- login
- haslo
- imie
- nazwisko
- jestAdmin
- klient
- pracownik
- email
- numerTelefonu

Zamówienia
- klient
- produkt
- status
- kwota
- dataZamowienia
- uzytkownik

**Przykładowe dane USŁUGI:**
```json
{
    "nazwa": "Strzyżenie",
	"czas": "45 min",
	"cena": 70
}
 ```
 ```json
{
    "nazwa": "Strzyżenie",
	"czas": "45 min",
	"cena": 70
}
 ```
 ```json
{
    "nazwa": "Broda",
	"czas": "30 min",
	"cena": 50
}
 ```
 ```json
{
    "nazwa": "Strzyżenie + broda (combo)",
	"czas": "60 min",
	"cena": 90
}
 ```
 ```json
{
    "nazwa": "Strzyżenie dziecka 5-12 lat",
	"czas": "45 min",
	"cena": 60
}
 ```
 ```json
{
    "nazwa": "Stylizacja włosów)",
	"czas": "15 min",
	"cena": 20
}
 ```
 ```json
{
    "nazwa": "Golenie",
	"czas": "45 min",
	"cena": 70
}
 ```


 **Przykładowe dane PLATNOŚCI:**
```json
{
    "platnoscOnline": true,
	"metodaPlatnosci": "Karta debetowa/kredytowa"
}
 ```
 ```json
{
    "platnoscOnline": true,
	"metodaPlatnosci": "Blik"
}
 ```
 ```json
{
    "platnoscOnline": false,
	"metodaPlatnosci": "Gotowka"
}
 ```


  **Przykładowe dane PLATNOŚCI:**
```json
 {
    "nazwa": "American Crew Finishing Spray lakier do włosów 500 ml",
	"cena": 79,
	"ilosc": 8
}
 ```
 ```json
{
    "nazwa": "American Crew Pomade pomada do stylizacji włosów 85 g",
	"cena": 65,
	"ilosc": 18
}
 ```
 ```json
{
    "nazwa": "American Crew Prep & Prime Tonik do włosow 250 ml",
	"cena": 56,
	"ilosc": 14
}
 ```


  **Przykładowe dane UŻYTKOWNIK:**
 ```json
 {
    "login": "admin",
	"haslo": "admin",
	"imie": "Admin",
	"nazwisko": "Administrator",
	"jestAdmin": true,
	"klient": false,
	"pracownik": true,
	"email": "admin@mail.com",
	"numerTelefonu": "111555999"
}
 ```
  ```json
 {
    "login": "adamNowak",
	"haslo": "adam",
	"imie": "Adam",
	"nazwisko": "Nowak",
	"jestAdmin": false,
	"klient": true,
	"pracownik": false,
	"email": "adamnowak@mail.com",
	"numerTelefonu": "444444111"
}
 ```
   ```json
 {
    "login": "kamilKowalski",
	"haslo": "kamil",
	"imie": "Kamil",
	"nazwisko": "Kowalski",
	"jestAdmin": false,
	"klient": true,
	"pracownik": true,
	"email": "kamilkowalski@mail.com",
	"numerTelefonu": "444555999"
}
 ```


  **Przykładowe dane REZERWACJA:**
   ```json
  {
    "termin": "2022-06-05T11:00:00.000Z",
	"terminKoniec": "2022-06-05T12:00:00.000Z",
	"usluga": "6294db4406612a15321427ea",
	"statusRezerwacji": "wRealizacji",
	"klient": "629545194506d846edb7f4d2",
	"pracownik": "6295455d4506d846edb7f4d5"
}
 ```

  **Przykładowe dane ZAMOWIENIE:**
  ```json
   {
    "klient": "629545194506d846edb7f4d2",
	"produkt": "62952ec807e323a3fc4fba88",
	"status": "zlozone",
	"kwota": 79
}
 ```

## Autor
- [@Dezmerek](https://www.github.com/Dezmerek)

