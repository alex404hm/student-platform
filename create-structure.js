const fs = require('fs');
const path = require('path');

// List of directories to create
const directories = [
    'config',
    'controllers',
    'middlewares',
    'models',
    'routes',
    'services',
    'templates',
    'utils',
    'docs',
    'views',
    'tests',
    'web/html'
];

// List of files to create with some basic content
const files = {
    'config/config.js': `module.exports = {
    MONGODB_URI: process.env.MONGODB_URI || 'mongodb://localhost:27017/app',
    TOKEN_SECRET: process.env.TOKEN_SECRET || 'your-secret-key',
    SESSION_SECRET: process.env.SESSION_SECRET || 'your-session-secret',
    FRONTEND_URL: process.env.FRONTEND_URL || 'http://localhost:3000',
    PORT: process.env.PORT || 3000,
    isProduction: process.env.NODE_ENV === 'production',
};`,
    'config/logger.js': `const winston = require('winston');
const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    transports: [
        new winston.transports.File({ filename: 'error.log', level: 'error' }),
        new winston.transports.File({ filename: 'combined.log' })
    ],
});
if (process.env.NODE_ENV !== 'production') {
    logger.add(new winston.transports.Console({
        format: winston.format.simple(),
    }));
}
module.exports = logger;`,
    'controllers/authController.js': `exports.login = (req, res) => { res.send('Login route'); };`,
    'middlewares/authMiddleware.js': `module.exports = (req, res, next) => { /* Auth logic */ next(); };`,
    'models/User.js': `const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({ username: String, password: String });
module.exports = mongoose.model('User', UserSchema);`,
    'routes/authRoutes.js': `const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
router.post('/login', authController.login);
module.exports = router;`,
    'services/authService.js': `module.exports = { /* Auth business logic */ };`,
    'templates/verifyEmailTemplate.html': `<html><body><h1>Verify your email</h1></body></html>`,
    'utils/generateToken.js': `const jwt = require('jsonwebtoken');
module.exports = (user) => { return jwt.sign({ userId: user._id }, process.env.TOKEN_SECRET); };`,
    'views/404.html': `<html><body><h1>404 Not Found</h1></body></html>`,
    'tests/auth.test.js': `const request = require('supertest'); const app = require('../server');`,
    'web/html/index.html': `<html><body><h1>Welcome to the app</h1></body></html>`,
    'server.js': `require('dotenv').config();
const express = require('express');
const app = express();
app.use(express.json());
app.use(express.static('web'));
const authRoutes = require('./routes/authRoutes');
app.use('/auth', authRoutes);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => { console.log(\`Server running on port \${PORT}\`); });`
};

// Create directories
directories.forEach(dir => {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
        console.log(`Directory created: ${dir}`);
    }
});

// Create files with initial content
Object.keys(files).forEach(filePath => {
    const content = files[filePath];
    fs.writeFileSync(filePath, content);
    console.log(`File created: ${filePath}`);
});

console.log('Project structure created successfully.');
