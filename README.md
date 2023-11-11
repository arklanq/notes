### Run

```shell
turbo dev
```

Powyższa komenda uruchomi zarówno backend jak i frontend w trybie dev równolegle.

### Side notes

* Starałem się trzymać instrukcji dosyć sztywno, tzn. nie robiłem nic ponad to, co było w instrukcji.

* Nie wiem czy Państwo pracują w `pages directory` czy `app directory`, uznałem, że może pozytywnie Państwa zaskoczę
  jeśli wykonam projekt z wykorzystaniem nowoczesnych technologii i rozwiązań, w tym `app directory`. Z drugiej
  strony `app directory` nadal jest w mojej skromnej opinii bardzo niestabilne, o czym się przekonałem w trakcie pracy
  nad projektem, wystarczy spojrzeć na poniższe punkty tej listy. W sumie nie wiem czy to dobrze, że obrałem taki
  kierunek, pozostawiam do oceny.

* Błąd `Warning: findDOMNode is deprecated in StrictMode.` pojawia się w konsoli w momentach różnych interakcji z
  komponentem `<Button>` biblioteki Tremor-UI. Zdecydowanie za późno się skapnąłem, że ta biblioteka jest na tyle
  żałosna, że takimi błędami strzela, żeby móc ją jeszcze wymienić w trakcie pracy. W każdym razie mój kod działa
  poprawnie.

* Błąd `TypeError: Cannot read properties of null (reading 'removeChild')` występuje w momencie zapisywania
  pliku `.module.scss` i pochodzi on bezpośrednio z Next.js'a, nie ma nic wspólnego z moim kodem:
  https://stackoverflow.com/questions/76903959/nextjs-typeerror-cannot-read-properties-of-null-reading-removechild-when

* Na koniec pracy miałem problem z system cache'owania stron w Next.js `app directory`, który udało mi się rozwiązać,
  aczkolwiek zdecydowanie wydłużyło to czas pracy. Zainteresowanych zapraszam do przejrzenia
  commita `ca3cf2c fix(frontend): next.js page caching issues`.

* W kodzie znajdą Państwo również ukryte żarty i smaczki, a żeby review nie było nudne!
