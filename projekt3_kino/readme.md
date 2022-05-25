# Projekt Kino
Aplikacja pozwala na zarządzanie personelem, magazynem produktów, salami kinowymi, biletami, filmami oraz generowaniem rapotów.

## Funkcjonalności
1. Kino - dane kino
2. Sala kinowa - lista miejsc wraz z statusem (wolny, zajęty).
3. Pracownicy - lista pracowników
4. Magazyn produktów - lista produktow na magazynie
5. Menu - przekąski w menu 
6. Filmy - lista filmów
7. Bilety - rezerwacja

- raport zamowień we wskazanym okresie czasu
- raport przychodów we wskazanym okresie czasu

## Modele danych

Kino
- nazwa
- adres
- telefon
- nip
- email

Sala
- nazwa
- iloscMiejsc
- status (wolny, zajęty, niedostępny)

Pracownik
- imie
- nazwisko
- stanowisko

Produkt
- nazwa
- cena
- ilosc

Filmy
- tytul
- gatunek
- produkcja
- rokPremiery
- rezyser
- czasTrwania (minuty)
- odLat

Bilet
- numer
- ulga

## Autor
- [@Dezmerek](https://www.github.com/Dezmerek)

