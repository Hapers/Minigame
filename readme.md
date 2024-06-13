# Konfiguracja połączenia z MongoDB

Ten przewodnik zawiera instrukcje dotyczące uzyskania niezbędnych informacji do połączenia z bazą danych MongoDB oraz konfiguracji aplikacji do jej używania.

## Instrukcje dotyczące uzyskania informacji o połączeniu z MongoDB

### Connection String

1. Przejdź do swojego klastra i kliknij przycisk "Connect".
2. Postępuj zgodnie z instrukcjami, aby dodać swój adres IP do listy dozwolonych i wybierz metodę połączenia.
3. Wybierz opcję "Connect Your Application" i skopiuj podany connection string.
4. Zamień `<username>`, `<password>` i `<dbname>` w connection string na swoją nazwę użytkownika, hasło i nazwę bazy danych MongoDB.

### Nazwa Bazy Danych

Zdecyduj o nazwie bazy danych, której będziesz używać. Powinna ona być utworzona lub określona jako część konfiguracji MongoDB.

A następnie należy wstawić dane zamiast danych z pliku .env
```python
# Zamień te wartości na swoje faktyczne connection string i nazwę bazy danych
CONNECTION_STRING = 'your_CONNECTION_STRING'
DATASET_NAME = 'your_DB_name'

# Nazwy kolekcji (możesz je zmienić, jeśli potrzebujesz)
COLLECTION_aimTrainer = 'aimTrainer'
COLLECTION_simonSays = 'simonSays'
COLLECTION_stratagemHero = 'stratagemHero'
COLLECTION_typingGame = 'typingGame'
```