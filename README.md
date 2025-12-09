# Dictionary Web App

A fully functional dictionary web app powered by the [Dictionary API](https://dictionaryapi.dev/). Users can search for words, listen to pronunciations, and customize their interface with color themes and font options. Built with React, Chakra UI, and Vite, and deployed to GitHub Pages.

## Features

* **Word Search**: Search for words using the input field and receive definitions, synonyms, and other information from the [Dictionary API](https://dictionaryapi.dev/).
* **Pronunciation**: Listen to the pronunciation of a word when available.
* **Form Validation**: Display a validation message when attempting to submit an empty search query.
* **Customizable Interface**: Switch between different font styles (serif, sans-serif, monospace) and color themes (light or dark).
* **Responsive Layout**: Optimized for various screen sizes with a responsive design.
* **Interactive States**: Hover and focus states for all interactive elements, ensuring a smooth user experience.
* **Bonus**: Automatically detect and apply the user's preferred color scheme (light or dark mode) using `prefers-color-scheme` in CSS.

## Built With

* **React** – A JavaScript library for building user interfaces.
* **Chakra UI** – A simple, modular, and accessible component library for React.
* **Vite** – A fast build tool and development server.
* **GitHub Pages** – Deployed using GitHub Pages for static hosting.

## Installation

1. Clone this repository to your local machine:

   ```bash
   git clone https://github.com/npkorintus/dictionary-web-app.git
   ```

2. Navigate to the project folder:

   ```bash
   cd dictionary-web-app
   ```

3. Install the dependencies:

   ```bash
   npm install
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

5. Open your browser and visit [http://localhost:3000](http://localhost:3000) to view the app.

## Usage

* Enter a word in the search input to fetch its definition from the Dictionary API.
* Click on the play icon to hear the word's pronunciation (if available).
* Use the settings menu to change the font style and theme of the app.
* The interface automatically adjusts for optimal viewing based on your device's screen size.
* Enjoy seamless accessibility with hover and focus states for all interactive elements.

## Screenshots
**Desktop Design**
![Desktop design](/design/desktop-preview.jpg)

**Mobile Design**
![Mobile design](/design/mobile-preview.jpg)

## Contributing

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Commit your changes (`git commit -am 'Add new feature'`).
4. Push to the branch (`git push origin feature-branch`).
5. Open a pull request.

## License

This project is licensed under the MIT License – see the [LICENSE](LICENSE) file for details.
