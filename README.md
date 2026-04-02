# Weather App

A responsive, full-stack weather application built with Node.js, Express, HTML, CSS, and JavaScript. Search for weather data from any city worldwide with a clean, mobile-friendly interface.

![Weather App](https://img.shields.io/badge/Status-Complete-success)
![Responsive](https://img.shields.io/badge/Responsive-Mobile%20%26%20Desktop-blue)

## Features

- **Real-time Weather Data**: Get current weather information for any city
- **Responsive Design**: Works perfectly on mobile, tablet, and desktop devices
- **Modern UI**: Clean, gradient-based design with smooth animations
- **Comprehensive Data**: Temperature, humidity, wind speed, pressure, visibility, sunrise/sunset times
- **User-Friendly**: Example cities for quick testing, keyboard support
- **Error Handling**: Clear error messages for invalid cities or API issues
- **Optional Geolocation**: Can detect user's current location (if browser permits)

## Screenshots

### Desktop View
![Desktop](screenshots/desktop.png)

### Mobile View
![Mobile](screenshots/mobile.png)

## Tech Stack

- **Backend**: Node.js, Express.js
- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **API**: OpenWeatherMap API (free tier)
- **Styling**: Custom CSS with mobile-first responsive design
- **Fonts**: Google Fonts (Poppins)

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- OpenWeatherMap API key (free)

## Installation & Setup

### 1. Clone or Download

```bash
# If you have git
git clone <repository-url>
cd weather-app

# Or extract the zip file and navigate to the folder
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

1. Copy the example environment file:
   ```bash
   cp .env.example .env
   ```

2. Edit `.env` and add your OpenWeatherMap API key:
   ```
   WEATHER_API_KEY=your_actual_api_key_here
   PORT=3000
   ```

### 4. Get Your OpenWeatherMap API Key (Free!)

1. Go to [OpenWeatherMap](https://openweathermap.org/api)
2. Sign up for a free account
3. Navigate to your API keys page
4. Copy your default API key (or generate a new one)
5. Paste it into your `.env` file

Note: The free tier allows 60 API calls per minute and includes current weather data.

### 5. Run the Application

**Development mode (with auto-reload):**
```bash
npm run dev
```

**Production mode:**
```bash
npm start
```

### 6. Access the App

Open your browser and navigate to:
```
http://localhost:3000
```

The app will be running on port 3000 by default (configurable via `.env`).

## Project Structure

```
weather-app/
├── server.js           # Express server and API routes
├── package.json        # Dependencies and scripts
├── .env.example        # Environment variable template
├── .env                # Your actual API key (create this)
├── README.md           # This file
└── public/             # Frontend static files
    ├── index.html      # Main HTML structure
    ├── style.css       # Responsive styles (mobile-first)
    └── script.js       # Frontend JavaScript logic
```

## Usage

1. **Search by City**: Type a city name in the search box and press Enter or click the search button
2. **Try Examples**: Click on the example city names for quick searches
3. **View Details**: See temperature, conditions, and all weather metrics in the dashboard
4. **Mobile Usage**: Fully responsive - works great on phones and tablets

## API Endpoints

- `GET /api/weather?city={city_name}` - Get weather by city name
- `GET /api/weather?lat={lat}&lon={lon}` - Get weather by coordinates
- `GET /` - Serves the frontend

### Example API Call

```javascript
fetch('/api/weather?city=London')
  .then(res => res.json())
  .then(data => console.log(data));
```

## Responsive Breakpoints

- **Mobile Small**: < 480px (320px - 480px)
- **Mobile Medium**: 481px - 767px
- **Tablet**: 768px - 1023px
- **Desktop**: 1024px - 1439px
- **Large Desktop**: ≥ 1440px

## Customization

### Change Colors

Edit the CSS variables in `public/style.css`:

```css
:root {
  --primary-color: #4a90e2;
  --secondary-color: #6c5ce7;
  --background-gradient-start: #667eea;
  --background-gradient-end: #764ba2;
}
```

### Change Fonts

1. Update the Google Fonts link in `public/index.html`
2. Update `font-family` in `public/style.css`

### Add More Weather Metrics

1. Add data elements to the HTML
2. Update the backend response in `server.js`
3. Add grid items in the CSS

## Troubleshooting

### "Weather API key not configured"
- Make sure you've created a `.env` file
- Verify your API key is correctly set
- Restart the server after updating `.env`

### "City not found" error
- Check your spelling
- Use the full city name (include state/country if needed)
- Some small towns may not be in the database

### Server won't start
- Run `npm install` to ensure all dependencies are installed
- Check if port 3000 is already in use (change PORT in `.env`)
- Verify Node.js version with `node --version`

###Permission errors on port
On some systems you may need to use a port > 1024. Set PORT in `.env` to fix this.

## Browser Compatibility

- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge 80+
- Mobile Safari (iOS 12+)
- Chrome Mobile (Android 8+)

## License

MIT

## Credits

- Weather data provided by [OpenWeatherMap](https://openweathermap.org/)
- Icons from [OpenWeatherMap Icons](https://openweathermap.org/weather-conditions)
- Fonts from [Google Fonts](https://fonts.google.com/)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## Future Enhancements

- [ ] 5-day forecast
- [ ] Save favorite cities
- [ ] Temperature unit toggle (°C/°F)
- [ ] Weather map view
- [ ] Historical weather data
- [ ] Multiple location comparison
- [ ] Dark mode toggle
- [ ] PWA support for offline usage

---

Built with ❤️ using Node.js and modern web technologies
# WheatherApp
