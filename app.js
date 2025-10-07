const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
const fs = require('fs');

const validateData = require('./validation/validateData.js');
const app = express();
const PORT = process.env.PORT || 3000;

// Set up Handlebars with custom helpers
const hbs = exphbs.create({
    extname: '.hbs',
    defaultLayout: 'main',
    layoutsDir: path.join(__dirname, 'views/layouts'),
    partialsDir: path.join(__dirname, 'views/partials'),
    helpers: {
        splitParagraphs: function (text) {
            if (typeof text === 'string') {
                return text.split(/\n\s*\n/);
            }
            return [];
        }
    }
});

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Navigation Data for Sidebar and Mobile Overlay
const homeNav = {
    navTitle: "More Articles",
    navLinks: [
        { title: "Connections", path: "#" },
        { title: "Calculus", path: "#" },
        { title: "Artificial Intelligence", path: "#" },
        { title: "LLM", path: "#" },
        { title: "Graphics", path: "#" }
    ]
};

const articleNav = {
    navTitle: "Chapters",
    navLinks: [
        { title: "Origin", path: "/origin" },
        { title: "Internet Service Providers", path: "/internet_service" },
        { title: "Public WI-FI", path: "/public_wifi" },
        { title: "Hall of Fame", path: "/hall_of_fame" }
    ]
};

// ROUTES - Function to handle rendering of all dynamic article pages
function renderArticlePage(req, res, pageName) {
    const dataPath = path.join(__dirname, 'data', `${pageName}.json`);

    if (!fs.existsSync(dataPath)) {
        return res.status(404).send('Page not found.');
    }

    try {
        const pageData = require(dataPath);
        
        if (validateData(pageData)) {
            // Combine all data into a single object
            const combinedData = {
                ...pageData, // The content of the article page
                ...articleNav // The navigation data for the sidebar
            };
            res.render('pages/articles', combinedData);
        } else {
            res.status(500).send(`Invalid data structure for ${pageName}.`);
        }
    } catch (error) {
        console.error(`Error loading or parsing data for ${pageName}:`, error);
        res.status(500).send('Internal server error.');
    }
}

// Homepage route
app.get('/', (req, res) => {
    const homeData = require('./data/home.json');
    // Combine all data into a single object
    const combinedData = {
        ...homeData, // The content of the home page
        ...homeNav // The navigation data for the sidebar
    };
    res.render('pages/home', combinedData);
});

// Dynamic route handler for all article pages
app.get('/:pageName', (req, res) => {
    const pageName = req.params.pageName;
    renderArticlePage(req, res, pageName);
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});