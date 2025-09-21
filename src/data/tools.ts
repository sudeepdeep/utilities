/* eslint-disable no-useless-escape */
import {
  Binary,
  Braces,
  Browser,
  Calculator,
  CalenderClock,
  Clock,
  Code,
  Coin,
  Confetti,
  Copy,
  CreditCard,
  Dice,
  Dollar,
  Emoji,
  FileText,
  GitCommit,
  Globe,
  Grid,
  Hash,
  Heart,
  Image,
  Key,
  Link,
  Lock,
  Loop,
  Mail,
  MessageSquare,
  Monitor,
  Network,
  Paintbrush,
  Palette,
  Phone,
  Port,
  QrCode,
  Quote,
  Regex,
  Ruler,
  Shield,
  Terminal,
  Type,
  Undo,
  User,
  Wifi,
} from "../assets/icons/icons.tsx";
import type { Tool } from "../types/index.js";

export const tools: Tool[] = [
  // Regular Utils
  {
    id: "currency-converter",
    name: "Currency Converter",
    description: "Convert between different currencies with real-time rates",
    category: "regular",
    icon: Dollar,
    code: `// Currency Converter
function convertCurrency(amount, fromCurrency, toCurrency, rates) {
  if (fromCurrency === toCurrency) return amount;
  
  // Convert to USD first, then to target currency
  const usdAmount = fromCurrency === 'USD' ? amount : amount / rates[fromCurrency];
  const convertedAmount = toCurrency === 'USD' ? usdAmount : usdAmount * rates[toCurrency];
  
  return Math.round(convertedAmount * 100) / 100;
}

// Sample usage with mock rates
const exchangeRates = {
  USD: 1,
  EUR: 0.85,
  GBP: 0.73,
  JPY: 110,
  INR: 74.5
};

const result = convertCurrency(100, 'USD', 'EUR', exchangeRates);
console.log(\`100 USD = \${result} EUR\`);`,
    inputs: [
      {
        name: "amount",
        type: "number",
        placeholder: "Enter amount",
        defaultValue: 100,
      },
      {
        name: "fromCurrency",
        type: "select",
        options: ["USD", "EUR", "GBP", "JPY", "INR"],
        defaultValue: "USD",
      },
      {
        name: "toCurrency",
        type: "select",
        options: ["USD", "EUR", "GBP", "JPY", "INR"],
        defaultValue: "EUR",
      },
    ],
  },
  {
    id: "password-generator",
    name: "Password Generator",
    description: "Generate secure passwords with customizable options",
    category: "regular",
    icon: Lock,
    code: `// Password Generator
function generatePassword(length = 12, includeSymbols = true, includeNumbers = true) {
  const lowercase = 'abcdefghijklmnopqrstuvwxyz';
  const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const numbers = '0123456789';
  const symbols = '!@#$%^&*()_+-=[]{}|;:,.<>?';
  
  let charset = lowercase + uppercase;
  if (includeNumbers) charset += numbers;
  if (includeSymbols) charset += symbols;
  
  let password = '';
  for (let i = 0; i < length; i++) {
    password += charset.charAt(Math.floor(Math.random() * charset.length));
  }
  
  return password;
}

const password = generatePassword(16, true, true);
console.log('Generated password:', password);`,
    inputs: [
      {
        name: "length",
        type: "number",
        placeholder: "Password length",
        defaultValue: 12,
      },
      {
        name: "includeSymbols",
        type: "select",
        options: ["true", "false"],
        defaultValue: "true",
      },
      {
        name: "includeNumbers",
        type: "select",
        options: ["true", "false"],
        defaultValue: "true",
      },
    ],
  },
  {
    id: "qr-code-generator",
    name: "QR Code Generator",
    description: "Generate QR codes for text, URLs, and data",
    category: "regular",
    icon: QrCode,
    code: `// QR Code Generator (Simulation)
function generateQRCode(text, size = 200) {
  // This is a simulation - in a real app you'd use a QR code library
  const qrData = {
    text: text,
    size: size,
    url: \`https://api.qrserver.com/v1/create-qr-code/?size=\${size}x\${size}&data=\${encodeURIComponent(text)}\`,
    format: 'PNG',
    errorCorrection: 'M'
  };
  
  // Generate ASCII art representation (simplified)
  const createAsciiQR = (data) => {
    const size = 15;
    let qr = '';
    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        // Simple pattern based on text hash
        const hash = data.split('').reduce((a, b) => {
          a = ((a << 5) - a) + b.charCodeAt(0);
          return a & a;
        }, 0);
        qr += Math.abs(hash + i + j) % 2 ? '██' : '  ';
      }
      qr += '\\n';
    }
    return qr;
  };
  
  return {
    ...qrData,
    asciiArt: createAsciiQR(text)
  };
}

const qrCode = generateQRCode('Hello, World!', 200);
console.log('QR Code URL:', qrCode.url);
console.log('ASCII representation:');
console.log(qrCode.asciiArt);`,
    inputs: [
      {
        name: "text",
        type: "text",
        placeholder: "Enter text or URL",
        defaultValue: "Hello, World!",
      },
      {
        name: "size",
        type: "number",
        placeholder: "QR code size",
        defaultValue: 200,
      },
    ],
  },
  {
    id: "timezone-converter",
    name: "Timezone Converter",
    description: "Convert time between different timezones",
    category: "regular",
    icon: Clock,
    code: `// Fixed Timezone Converter
function convertTimezone(time, fromTimezone, toTimezone) {
  // Timezone offsets from UTC (accounting for standard time, not DST)
  const timezones = {
    'UTC': 0,
    'GMT': 0,
    'EST': -5,  // Eastern Standard Time
    'CST': -6,  // Central Standard Time  
    'MST': -7,  // Mountain Standard Time
    'PST': -8,  // Pacific Standard Time
    'CET': 1,   // Central European Time
    'JST': 9,   // Japan Standard Time
    'IST': 5.5, // India Standard Time
    'AEST': 10, // Australian Eastern Standard Time
    'BST': 1,   // British Summer Time
    'CEST': 2   // Central European Summer Time
  };
  
  if (!timezones.hasOwnProperty(fromTimezone) || !timezones.hasOwnProperty(toTimezone)) {
    return { error: 'Unsupported timezone' };
  }
  
  // Parse the time (assumes HH:MM format)
  const [hours, minutes] = time.split(':').map(Number);
  
  if (isNaN(hours) || isNaN(minutes) || hours < 0 || hours > 23 || minutes < 0 || minutes > 59) {
    return { error: 'Invalid time format. Use HH:MM (24-hour format)' };
  }
  
  // Create a date object for today with the specified time
  const today = new Date();
  const inputDate = new Date(today.getFullYear(), today.getMonth(), today.getDate(), hours, minutes);
  
  // Convert to UTC first
  const fromOffset = timezones[fromTimezone];
  const utcTime = new Date(inputDate.getTime() - (fromOffset * 60 * 60 * 1000));
  
  // Then convert to target timezone
  const toOffset = timezones[toTimezone];
  const convertedTime = new Date(utcTime.getTime() + (toOffset * 60 * 60 * 1000));
  
  // Format the output
  const formatTime = (date) => {
    return date.toTimeString().slice(0, 8); // HH:MM:SS format
  };
  
  const offsetDiff = toOffset - fromOffset;
  
  return {
    originalTime: time fromTimezone,
    convertedTime: formatTime(convertedTime) toTimezone,
    date: convertedTime.toLocaleDateString(),
    offsetDifference: offsetDiff >= 0 ? '+' : ''+ offsetDiff +'hours',
    utcTime: formatTime(utcTime)+ 'UTC',
    isValid: true
  };
}

// Enhanced version with current time
function getCurrentTimeIn(timezone) {
  const now = new Date();
  const utcTime = new Date(now.getTime() + (now.getTimezoneOffset() * 60000));
  
  const timezones = {
    'UTC': 0, 'GMT': 0, 'EST': -5, 'CST': -6, 'MST': -7, 'PST': -8,
    'CET': 1, 'JST': 9, 'IST': 5.5, 'AEST': 10, 'BST': 1, 'CEST': 2
  };
  
  if (!timezones.hasOwnProperty(timezone)) {
    return { error: 'Unsupported timezone' };
  }
  
  const offset = timezones[timezone];
  const targetTime = new Date(utcTime.getTime() + (offset * 60 * 60 * 1000));
  
  return {
    timezone: timezone,
    time: targetTime.toTimeString().slice(0, 8),
    date: targetTime.toLocaleDateString(),
    fullDateTime: targetTime.toLocaleString()
  };
}

// Examples
const result1 = convertTimezone('14:30', 'EST', 'PST');
const result2 = convertTimezone('09:15', 'IST', 'UTC');
const currentUTC = getCurrentTimeIn('UTC');
const currentJST = getCurrentTimeIn('JST');

console.log('Conversion 1:');
console.log('Original:', result1.originalTime);
console.log('Converted:', result1.convertedTime);
console.log('UTC equivalent:', result1.utcTime);
console.log('Offset difference:', result1.offsetDifference);

console.log('\nConversion 2:');
console.log('Original:', result2.originalTime);
console.log('Converted:', result2.convertedTime);

console.log('\nCurrent Times:');
console.log('UTC:', currentUTC.time);
console.log('Japan:', currentJST.time)`,
    inputs: [
      {
        name: "time",
        type: "text",
        placeholder: "Enter time (HH:MM)",
        defaultValue: "14:30",
      },
      {
        name: "fromTimezone",
        type: "select",
        options: [
          "UTC",
          "EST",
          "PST",
          "GMT",
          "CET",
          "JST",
          "IST",
          "CST",
          "MST",
          "AEST",
        ],
        defaultValue: "EST",
      },
      {
        name: "toTimezone",
        type: "select",
        options: [
          "UTC",
          "EST",
          "PST",
          "GMT",
          "CET",
          "JST",
          "IST",
          "CST",
          "MST",
          "AEST",
        ],
        defaultValue: "PST",
      },
    ],
  },
  {
    id: "base64-encoder",
    name: "Base64 Encoder/Decoder",
    description: "Encode and decode Base64 strings",
    category: "regular",
    icon: FileText,
    code: `// Base64 Encoder/Decoder
function encodeBase64(text) {
  return btoa(text);
}

function decodeBase64(base64) {
  try {
    return atob(base64);
  } catch (error) {
    return 'Invalid Base64 string';
  }
}

// Example usage
const originalText = 'Hello, World!';
const encoded = encodeBase64(originalText);
const decoded = decodeBase64(encoded);

console.log('Original:', originalText);
console.log('Encoded:', encoded);
console.log('Decoded:', decoded);`,
    inputs: [
      {
        name: "text",
        type: "text",
        placeholder: "Enter text to encode/decode",
        defaultValue: "Hello, World!",
      },
      {
        name: "operation",
        type: "select",
        options: ["encode", "decode"],
        defaultValue: "encode",
      },
    ],
  },
  {
    id: "unit-converter",
    name: "Unit Converter",
    description: "Convert between different units of measurement",
    category: "regular",
    icon: Ruler,
    code: `// Unit Converter
const conversions = {
  length: {
    meter: 1,
    kilometer: 0.001,
    centimeter: 100,
    inch: 39.3701,
    foot: 3.28084,
    yard: 1.09361
  },
  weight: {
    kilogram: 1,
    gram: 1000,
    pound: 2.20462,
    ounce: 35.274
  },
  temperature: {
    celsius: (c) => ({ celsius: c, fahrenheit: c * 9/5 + 32, kelvin: c + 273.15 }),
    fahrenheit: (f) => ({ celsius: (f - 32) * 5/9, fahrenheit: f, kelvin: (f - 32) * 5/9 + 273.15 }),
    kelvin: (k) => ({ celsius: k - 273.15, fahrenheit: (k - 273.15) * 9/5 + 32, kelvin: k })
  }
};

function convertUnit(value, fromUnit, toUnit, type) {
  if (type === 'temperature') {
    return conversions.temperature[fromUnit](value)[toUnit];
  }
  
  const baseValue = value / conversions[type][fromUnit];
  return baseValue * conversions[type][toUnit];
}

const result = convertUnit(100, 'meter', 'foot', 'length');
console.log(\`100 meters = \${result.toFixed(2)} feet\`);`,
    inputs: [
      {
        name: "value",
        type: "number",
        placeholder: "Enter value",
        defaultValue: 100,
      },
      {
        name: "type",
        type: "select",
        options: ["length", "weight", "temperature"],
        defaultValue: "length",
      },
      {
        name: "fromUnit",
        type: "text",
        placeholder: "From unit",
        defaultValue: "meter",
      },
      {
        name: "toUnit",
        type: "text",
        placeholder: "To unit",
        defaultValue: "foot",
      },
    ],
  },
  {
    id: "bmi-calculator",
    name: "BMI Calculator",
    description: "Calculate Body Mass Index and health category",
    category: "regular",
    icon: Heart,
    code: `// BMI Calculator
function calculateBMI(weight, height, unit = 'metric') {
  let bmi;
  
  if (unit === 'imperial') {
    // weight in pounds, height in inches
    bmi = (weight / (height * height)) * 703;
  } else {
    // weight in kg, height in meters
    bmi = weight / (height * height);
  }
  
  let category;
  if (bmi < 18.5) category = 'Underweight';
  else if (bmi < 25) category = 'Normal weight';
  else if (bmi < 30) category = 'Overweight';
  else category = 'Obese';
  
  return {
    bmi: Math.round(bmi * 10) / 10,
    category: category
  };
}

const result = calculateBMI(70, 1.75, 'metric');
console.log(\`BMI: \${result.bmi} - \${result.category}\`);`,
    inputs: [
      {
        name: "weight",
        type: "number",
        placeholder: "Weight (kg or lbs)",
        defaultValue: 70,
      },
      {
        name: "height",
        type: "number",
        placeholder: "Height (m or inches)",
        defaultValue: 1.75,
      },
      {
        name: "unit",
        type: "select",
        options: ["metric", "imperial"],
        defaultValue: "metric",
      },
    ],
  },
  {
    id: "url-shortener",
    name: "URL Shortener",
    description: "Create short URLs and expand them back to original URLs",
    category: "regular",
    icon: Link,
    code: `// URL Shortener
function createShortUrl(originalUrl, customAlias = '') {
  // Simple URL shortener simulation
  const baseUrl = 'https://short.ly/';
  const shortCode = customAlias || Math.random().toString(36).substring(2, 8);
  
  // Store mapping (in real app, this would be in a database)
  const urlMapping = {
    shortCode: shortCode,
    originalUrl: originalUrl,
    shortUrl: baseUrl + shortCode,
    createdAt: new Date().toISOString(),
    clicks: 0
  };
  
  return urlMapping;
}

function expandShortUrl(shortUrl) {
  // Extract short code from URL
  const shortCode = shortUrl.split('/').pop();
  
  // Mock database lookup
  const mockDatabase = {
    'abc123': 'https://www.example.com',
    'xyz789': 'https://www.google.com',
    'def456': 'https://www.github.com'
  };
  
  const originalUrl = mockDatabase[shortCode];
  
  if (originalUrl) {
    return {
      shortCode: shortCode,
      originalUrl: originalUrl,
      found: true
    };
  } else {
    return {
      shortCode: shortCode,
      originalUrl: null,
      found: false,
      error: 'Short URL not found'
    };
  }
}

// Example usage
const shortUrlData = createShortUrl('https://www.example.com/very/long/url/path', 'mylink');
console.log('Short URL created:', shortUrlData.shortUrl);
console.log('Original URL:', shortUrlData.originalUrl);

const expanded = expandShortUrl('https://short.ly/abc123');
console.log('Expanded URL:', expanded.originalUrl);`,
    inputs: [
      {
        name: "originalUrl",
        type: "text",
        placeholder: "Enter URL to shorten",
        defaultValue: "https://www.example.com/very/long/url/path",
      },
      {
        name: "customAlias",
        type: "text",
        placeholder: "Custom alias (optional)",
        defaultValue: "",
      },
    ],
  },

  // Creative Tools
  {
    id: "color-palette-generator",
    name: "Color Palette Generator",
    description: "Generate harmonious color palettes",
    category: "creative",
    icon: Palette,
    code: `// Color Palette Generator
function generateColorPalette(baseColor, count = 5) {
  const hexToHsl = (hex) => {
    const r = parseInt(hex.slice(1, 3), 16) / 255;
    const g = parseInt(hex.slice(3, 5), 16) / 255;
    const b = parseInt(hex.slice(5, 7), 16) / 255;
    
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;
    
    if (max === min) {
      h = s = 0;
    } else {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
      }
      h /= 6;
    }
    
    return [h * 360, s * 100, l * 100];
  };
  
  const hslToHex = (h, s, l) => {
    l /= 100;
    const a = s * Math.min(l, 1 - l) / 100;
    const f = n => {
      const k = (n + h / 30) % 12;
      const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
      return Math.round(255 * color).toString(16).padStart(2, '0');
    };
    return \`#\${f(0)}\${f(8)}\${f(4)}\`;
  };
  
  const [h, s, l] = hexToHsl(baseColor);
  const palette = [];
  
  for (let i = 0; i < count; i++) {
    const newH = (h + (i * 360 / count)) % 360;
    const newS = Math.max(20, s - (i * 10));
    const newL = Math.max(20, Math.min(80, l + (i * 15) - 30));
    palette.push(hslToHex(newH, newS, newL));
  }
  
  return palette;
}

const palette = generateColorPalette('#3B82F6', 5);
console.log('Generated palette:', palette);`,
    inputs: [
      {
        name: "baseColor",
        type: "text",
        placeholder: "Base color (hex)",
        defaultValue: "#3B82F6",
      },
      {
        name: "count",
        type: "number",
        placeholder: "Number of colors",
        defaultValue: 5,
      },
    ],
  },
  {
    id: "lorem-ipsum-generator",
    name: "Lorem Ipsum Generator",
    description: "Generate placeholder text for designs",
    category: "creative",
    icon: Type,
    code: `// Lorem Ipsum Generator
function generateLoremIpsum(wordCount = 50) {
  const words = [
    'lorem', 'ipsum', 'dolor', 'sit', 'amet', 'consectetur', 'adipiscing', 'elit',
    'sed', 'do', 'eiusmod', 'tempor', 'incididunt', 'ut', 'labore', 'et', 'dolore',
    'magna', 'aliqua', 'enim', 'ad', 'minim', 'veniam', 'quis', 'nostrud',
    'exercitation', 'ullamco', 'laboris', 'nisi', 'aliquip', 'ex', 'ea', 'commodo',
    'consequat', 'duis', 'aute', 'irure', 'in', 'reprehenderit', 'voluptate',
    'velit', 'esse', 'cillum', 'fugiat', 'nulla', 'pariatur', 'excepteur', 'sint',
    'occaecat', 'cupidatat', 'non', 'proident', 'sunt', 'culpa', 'qui', 'officia',
    'deserunt', 'mollit', 'anim', 'id', 'est', 'laborum'
  ];
  
  let result = [];
  for (let i = 0; i < wordCount; i++) {
    result.push(words[Math.floor(Math.random() * words.length)]);
  }
  
  // Capitalize first word and add periods
  let text = result.join(' ');
  text = text.charAt(0).toUpperCase() + text.slice(1);
  
  // Add periods every 10-15 words
  const sentences = [];
  const textWords = text.split(' ');
  let currentSentence = [];
  
  for (let i = 0; i < textWords.length; i++) {
    currentSentence.push(textWords[i]);
    if (currentSentence.length >= 10 + Math.floor(Math.random() * 6)) {
      sentences.push(currentSentence.join(' ') + '.');
      currentSentence = [];
    }
  }
  
  if (currentSentence.length > 0) {
    sentences.push(currentSentence.join(' ') + '.');
  }
  
  return sentences.join(' ');
}

const lorem = generateLoremIpsum(30);
console.log(lorem);`,
    inputs: [
      {
        name: "wordCount",
        type: "number",
        placeholder: "Number of words",
        defaultValue: 50,
      },
    ],
  },
  {
    id: "css-gradient-generator",
    name: "CSS Gradient Generator",
    description: "Generate CSS gradient code",
    category: "creative",
    icon: Paintbrush,
    code: `// CSS Gradient Generator
function generateGradient(color1, color2, direction = 'to right', type = 'linear') {
  const directions = {
    'to right': 'to right',
    'to left': 'to left',
    'to bottom': 'to bottom',
    'to top': 'to top',
    'to bottom right': 'to bottom right',
    'to bottom left': 'to bottom left',
    'to top right': 'to top right',
    'to top left': 'to top left'
  };
  
  let gradient;
  
  if (type === 'linear') {
    gradient = \`linear-gradient(\${directions[direction]}, \${color1}, \${color2})\`;
  } else if (type === 'radial') {
    gradient = \`radial-gradient(circle, \${color1}, \${color2})\`;
  }
  
  const css = \`background: \${gradient};\`;
  
  return {
    css: css,
    preview: gradient
  };
}

const result = generateGradient('#FF6B6B', '#4ECDC4', 'to right', 'linear');
console.log('CSS:', result.css);
console.log('Preview:', result.preview);`,
    inputs: [
      {
        name: "color1",
        type: "text",
        placeholder: "First color",
        defaultValue: "#FF6B6B",
      },
      {
        name: "color2",
        type: "text",
        placeholder: "Second color",
        defaultValue: "#4ECDC4",
      },
      {
        name: "direction",
        type: "select",
        options: ["to right", "to left", "to bottom", "to top"],
        defaultValue: "to right",
      },
      {
        name: "type",
        type: "select",
        options: ["linear", "radial"],
        defaultValue: "linear",
      },
    ],
  },

  // Developer Tools
  {
    id: "json-formatter",
    name: "JSON Formatter",
    description: "Format and validate JSON data",
    category: "developer",
    icon: Code,
    code: `// JSON Formatter
function formatJSON(jsonString, indent = 2) {
  try {
    const parsed = JSON.parse(jsonString);
    return {
      formatted: JSON.stringify(parsed, null, indent),
      valid: true,
      error: null
    };
  } catch (error) {
    return {
      formatted: null,
      valid: false,
      error: error.message
    };
  }
}

function minifyJSON(jsonString) {
  try {
    const parsed = JSON.parse(jsonString);
    return {
      minified: JSON.stringify(parsed),
      valid: true,
      error: null
    };
  } catch (error) {
    return {
      minified: null,
      valid: false,
      error: error.message
    };
  }
}

const sampleJSON = '{"name":"John","age":30,"city":"New York"}';
const formatted = formatJSON(sampleJSON, 2);
console.log('Formatted JSON:', formatted.formatted);`,
    inputs: [
      {
        name: "jsonString",
        type: "textarea",
        placeholder: "Enter JSON to format",
        defaultValue: '{"name":"John","age":30,"city":"New York"}',
      },
      {
        name: "indent",
        type: "number",
        placeholder: "Indentation spaces",
        defaultValue: 2,
      },
    ],
  },
  {
    id: "hash-generator",
    name: "Hash Generator",
    description: "Generate various hash values for text",
    category: "developer",
    icon: Hash,
    code: `// Hash Generator (Simple hash functions)
function simpleHash(str) {
  let hash = 0;
  if (str.length === 0) return hash;
  
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  
  return Math.abs(hash).toString(16);
}

function djb2Hash(str) {
  let hash = 5381;
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) + hash) + str.charCodeAt(i);
  }
  return Math.abs(hash).toString(16);
}

function sdbmHash(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + (hash << 6) + (hash << 16) - hash;
  }
  return Math.abs(hash).toString(16);
}

const text = 'Hello, World!';
console.log('Simple Hash:', simpleHash(text));
console.log('DJB2 Hash:', djb2Hash(text));
console.log('SDBM Hash:', sdbmHash(text));`,
    inputs: [
      {
        name: "text",
        type: "text",
        placeholder: "Enter text to hash",
        defaultValue: "Hello, World!",
      },
    ],
  },
  {
    id: "commit-message-generator",
    name: "Commit Message",
    description: "Generate conventional commit messages",
    category: "developer",
    icon: GitCommit,
    code: `// Commit Message Generator
function generateCommitMessage(type, scope, description, breaking = false) {
  const types = {
    feat: 'A new feature',
    fix: 'A bug fix',
    docs: 'Documentation only changes',
    style: 'Changes that do not affect the meaning of the code',
    refactor: 'A code change that neither fixes a bug nor adds a feature',
    perf: 'A code change that improves performance',
    test: 'Adding missing tests or correcting existing tests',
    chore: 'Changes to the build process or auxiliary tools'
  };
  
  let message = type;
  
  if (scope) {
    message += \`(\${scope})\`;
  }
  
  if (breaking) {
    message += '!';
  }
  
  message += \`: \${description}\`;
  
  return {
    message: message,
    type: types[type] || 'Unknown type',
    conventional: true
  };
}

const commit = generateCommitMessage('feat', 'auth', 'add user authentication', false);
console.log('Commit message:', commit.message);
console.log('Type description:', commit.type);`,
    inputs: [
      {
        name: "type",
        type: "select",
        options: [
          "feat",
          "fix",
          "docs",
          "style",
          "refactor",
          "perf",
          "test",
          "chore",
        ],
        defaultValue: "feat",
      },
      {
        name: "scope",
        type: "text",
        placeholder: "Scope (optional)",
        defaultValue: "",
      },
      {
        name: "description",
        type: "text",
        placeholder: "Description",
        defaultValue: "add new feature",
      },
      {
        name: "breaking",
        type: "select",
        options: ["false", "true"],
        defaultValue: "false",
      },
    ],
  },
  {
    id: "text-encryptor",
    name: "Text Encrypt/Decrypt",
    description:
      "Encrypt and decrypt text using Base64 and simple cipher methods",
    category: "developer",
    icon: Shield,
    code: `// Text Encrypt/Decrypt
function encryptText(text, method = 'base64') {
  switch (method) {
    case 'base64':
      return btoa(text);
    
    case 'caesar':
      // Caesar cipher with shift of 3
      return text.split('').map(char => {
        if (char.match(/[a-z]/i)) {
          const code = char.charCodeAt(0);
          const base = code >= 65 && code <= 90 ? 65 : 97;
          return String.fromCharCode(((code - base + 3) % 26) + base);
        }
        return char;
      }).join('');
    
    case 'reverse':
      return text.split('').reverse().join('');
    
    case 'rot13':
      return text.replace(/[a-zA-Z]/g, function(c) {
        return String.fromCharCode((c <= 'Z' ? 90 : 122) >= (c = c.charCodeAt(0) + 13) ? c : c - 26);
      });
    
    default:
      return btoa(text);
  }
}

function decryptText(encryptedText, method = 'base64') {
  try {
    switch (method) {
      case 'base64':
        return atob(encryptedText);
      
      case 'caesar':
        // Caesar cipher with shift of -3 (reverse)
        return encryptedText.split('').map(char => {
          if (char.match(/[a-z]/i)) {
            const code = char.charCodeAt(0);
            const base = code >= 65 && code <= 90 ? 65 : 97;
            return String.fromCharCode(((code - base - 3 + 26) % 26) + base);
          }
          return char;
        }).join('');
      
      case 'reverse':
        return encryptedText.split('').reverse().join('');
      
      case 'rot13':
        // ROT13 is its own inverse
        return encryptedText.replace(/[a-zA-Z]/g, function(c) {
          return String.fromCharCode((c <= 'Z' ? 90 : 122) >= (c = c.charCodeAt(0) + 13) ? c : c - 26);
        });
      
      default:
        return atob(encryptedText);
    }
  } catch (error) {
    return 'Error: Invalid encrypted text or method';
  }
}

// Example usage
const originalText = 'Hello, World! This is a secret message.';
const encrypted = encryptText(originalText, 'base64');
const decrypted = decryptText(encrypted, 'base64');

console.log('Original:', originalText);
console.log('Encrypted:', encrypted);
console.log('Decrypted:', decrypted);`,
    inputs: [
      {
        name: "text",
        type: "textarea",
        placeholder: "Enter text to encrypt/decrypt",
        defaultValue: "Hello, World! This is a secret message.",
      },
      {
        name: "method",
        type: "select",
        options: ["base64", "caesar", "reverse", "rot13"],
        defaultValue: "base64",
      },
      {
        name: "operation",
        type: "select",
        options: ["encrypt", "decrypt"],
        defaultValue: "encrypt",
      },
    ],
  },

  // New Developer Utilities
  {
    id: "regex-tester",
    name: "Regex Tester",
    description: "Test and validate regular expressions with sample text",
    category: "regex",
    icon: Regex,
    code: `// Regex Tester
function testRegex(pattern, text, flags = 'g') {
  try {
    const regex = new RegExp(pattern, flags);
    const matches = [];
    let match;
    
    if (flags.includes('g')) {
      while ((match = regex.exec(text)) !== null) {
        matches.push({
          match: match[0],
          index: match.index,
          groups: match.slice(1),
          namedGroups: match.groups || {}
        });
        
        // Prevent infinite loop on zero-length matches
        if (match.index === regex.lastIndex) {
          regex.lastIndex++;
        }
      }
    } else {
      match = regex.exec(text);
      if (match) {
        matches.push({
          match: match[0],
          index: match.index,
          groups: match.slice(1),
          namedGroups: match.groups || {}
        });
      }
    }
    
    return {
      isValid: true,
      matches: matches,
      matchCount: matches.length,
      pattern: pattern,
      flags: flags
    };
  } catch (error) {
    return {
      isValid: false,
      error: error.message,
      matches: [],
      matchCount: 0
    };
  }
}

// Example usage
const pattern = '\\b\\w+@\\w+\\.\\w+\\b';
const text = 'Contact us at john@example.com or support@company.org';
const result = testRegex(pattern, text, 'gi');

console.log('Pattern:', result.pattern);
console.log('Valid:', result.isValid);
console.log('Matches found:', result.matchCount);
result.matches.forEach((match, i) => {
  console.log(\`Match \${i + 1}: "\${match.match}" at position \${match.index}\`);
});`,
    inputs: [
      {
        name: "pattern",
        type: "text",
        placeholder: "Enter regex pattern",
        defaultValue: "\\b\\w+@\\w+\\.\\w+\\b",
      },
      {
        name: "text",
        type: "textarea",
        placeholder: "Enter test text",
        defaultValue: "Contact us at john@example.com or support@company.org",
      },
      {
        name: "flags",
        type: "text",
        placeholder: "Regex flags (g, i, m, etc.)",
        defaultValue: "gi",
      },
    ],
  },
  // Collection of Regex Validator Functions for CodeInStock

  // 1. Email Validator
  {
    id: "email-regex-validator",
    name: "Email Validator",
    description: "Validate email addresses using regex patterns",
    category: "regex",
    icon: Mail,
    code: `// Email Validator
function validateEmail(email) {
  // Comprehensive email regex pattern
  const emailPattern = /^[a-zA-Z0-9.!#$%&'*+/=?^_\`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  
  const result = {
    email: email,
    isValid: emailPattern.test(email),
    pattern: emailPattern.toString()
  };
  
  // Additional checks
  if (result.isValid) {
    const parts = email.split('@');
    result.localPart = parts[0];
    result.domain = parts[1];
    result.hasValidLength = email.length <= 254;
    result.localPartLength = parts[0].length <= 64;
  }
  
  return result;
}

// Test multiple emails
function validateMultipleEmails(emails) {
  return emails.map(email => validateEmail(email.trim()));
}

// Examples
const testEmails = [
  'user@example.com',
  'test.email+tag@domain.co.uk',
  'invalid-email',
  'user@',
  'toolong' + 'a'.repeat(250) + '@example.com'
];

console.log('Email Validation Results:');
testEmails.forEach(email => {
  const result = validateEmail(email);
  console.log(\`\${email}: \${result.isValid ? '✓ Valid' : '✗ Invalid'}\`);
});`,
    inputs: [
      {
        name: "email",
        type: "text",
        placeholder: "Enter email to validate",
        defaultValue: "user@example.com",
      },
    ],
  },

  // 2. Phone Number Validator
  {
    id: "phone-regex-validator",
    name: "Phone Number Validator",
    description: "Validate various phone number formats",
    category: "regex",
    icon: Phone,
    code: `// Phone Number Validator
function validatePhone(phone, format = 'us') {
  const patterns = {
    us: {
      pattern: /^(\+1\s?)?(\([0-9]{3}\)|[0-9]{3})[\s\-]?[0-9]{3}[\s\-]?[0-9]{4}$/,
      description: 'US format: (123) 456-7890, 123-456-7890, +1 123 456 7890'
    },
    international: {
      pattern: /^\+[1-9]\d{1,14}$/,
      description: 'International format: +1234567890'
    },
    uk: {
      pattern: /^(\+44\s?)?(\(0\)|0)?[1-9]\d{8,9}$/,
      description: 'UK format: +44 20 7123 4567, 020 7123 4567'
    },
    india: {
      pattern: /^(\+91[\s\-]?)?[6-9]\d{9}$/,
      description: 'India format: +91 98765 43210, 9876543210'
    }
  };
  
  const selectedPattern = patterns[format] || patterns.us;
  const isValid = selectedPattern.pattern.test(phone);
  
  let cleanedNumber = '';
  if (isValid) {
    cleanedNumber = phone.replace(/[\s\-\(\)\+]/g, '');
  }
  
  return {
    phone: phone,
    isValid: isValid,
    format: format,
    pattern: selectedPattern.pattern.toString(),
    description: selectedPattern.description,
    cleanedNumber: cleanedNumber
  };
}

// Examples
const testPhones = [
  { number: '(555) 123-4567', format: 'us' },
  { number: '+1 555 123 4567', format: 'us' },
  { number: '+919876543210', format: 'india' },
  { number: '+44 20 7123 4567', format: 'uk' },
  { number: '555-123-4567', format: 'us' },
  { number: 'invalid-phone', format: 'us' }
];

console.log('Phone Validation Results:');
testPhones.forEach(test => {
  const result = validatePhone(test.number, test.format);
  console.log(\`\${test.number} (\${test.format}): \${result.isValid ? '✓ Valid' : '✗ Invalid'}\`);
});`,
    inputs: [
      {
        name: "phone",
        type: "text",
        placeholder: "Enter phone number",
        defaultValue: "(555) 123-4567",
      },
      {
        name: "format",
        type: "select",
        options: ["us", "international", "uk", "india"],
        defaultValue: "us",
      },
    ],
  },

  // 3. URL Validator
  {
    id: "url-regex-validator",
    name: "URL Validator",
    description: "Validate URLs and extract components",
    category: "regex",
    icon: Link,
    code: `// URL Validator
function validateURL(url) {
  const urlPattern = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?(\?[;&a-z\d%_.~+=-]*)?(#[-a-z\d_]*)?$/i;
  const fullUrlPattern = /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/;
  
  const isBasicValid = urlPattern.test(url);
  const isFullValid = fullUrlPattern.test(url);
  
  let components = {};
  
  if (isBasicValid) {
    try {
      const urlObj = new URL(url.startsWith('http') ? url : 'https://' + url);
      components = {
        protocol: urlObj.protocol,
        hostname: urlObj.hostname,
        port: urlObj.port,
        pathname: urlObj.pathname,
        search: urlObj.search,
        hash: urlObj.hash,
        origin: urlObj.origin
      };
    } catch (e) {
      // Fallback parsing
      const match = url.match(/^(https?:\/\/)?(([^:\/?#]*)(?::([0-9]+))?)([\/]{0,1}[^?#]*)(\?[^#]*|)(#.*|)$/);
      if (match) {
        components = {
          protocol: match[1] || '',
          hostname: match[3] || '',
          port: match[4] || '',
          pathname: match[5] || '',
          search: match[6] || '',
          hash: match[7] || ''
        };
      }
    }
  }
  
  return {
    url: url,
    isValid: isBasicValid,
    isFullyValid: isFullValid,
    components: components,
    hasProtocol: url.startsWith('http'),
    isSecure: url.startsWith('https')
  };
}

// Examples
const testUrls = [
  'https://www.example.com',
  'http://subdomain.example.co.uk/path?param=value#section',
  'example.com',
  'ftp://files.example.com',
  'https://localhost:3000/api/users',
  'invalid-url',
  'www.google.com/search?q=test'
];

console.log('URL Validation Results:');
testUrls.forEach(url => {
  const result = validateURL(url);
  console.log(\`\${url}: \${result.isValid ? '✓ Valid' : '✗ Invalid'}\`);
  if (result.isValid && result.components.hostname) {
    console.log(\`  Host: \${result.components.hostname}\`);
  }
});`,
    inputs: [
      {
        name: "url",
        type: "text",
        placeholder: "Enter URL to validate",
        defaultValue: "https://www.example.com",
      },
    ],
  },

  // 4. Password Strength Validator
  {
    id: "password-regex-validator",
    name: "Password Validator",
    description: "Validate password strength with multiple criteria",
    category: "regex",
    icon: Lock,
    code: `// Password Strength Validator
function validatePassword(password, requirements = {}) {
  const defaultRequirements = {
    minLength: 8,
    maxLength: 128,
    requireUppercase: true,
    requireLowercase: true,
    requireNumbers: true,
    requireSpecialChars: true,
    noCommonPasswords: true
  };
  
  const reqs = { ...defaultRequirements, ...requirements };
  
  const patterns = {
    uppercase: /[A-Z]/,
    lowercase: /[a-z]/,
    numbers: /[0-9]/,
    specialChars: /[!@#$%^&*(),.?":{}|<>]/,
    noSpaces: /^\S*$/,
    noSequential: /^(?!.*(?:abc|bcd|cde|def|efg|fgh|ghi|hij|ijk|jkl|klm|lmn|mno|nop|opq|pqr|qrs|rst|stu|tuv|uvw|vwx|wxy|xyz|012|123|234|345|456|567|678|789))/i,
    noRepeating: /^(?!.*(.).*\x01{2,})/
  };
  
  const commonPasswords = [
    'password', '123456', 'password123', 'admin', 'qwerty',
    'letmein', 'welcome', '123456789', 'password1'
  ];
  
  const checks = {
    length: password.length >= reqs.minLength && password.length <= reqs.maxLength,
    uppercase: !reqs.requireUppercase || patterns.uppercase.test(password),
    lowercase: !reqs.requireLowercase || patterns.lowercase.test(password),
    numbers: !reqs.requireNumbers || patterns.numbers.test(password),
    specialChars: !reqs.requireSpecialChars || patterns.specialChars.test(password),
    noSpaces: patterns.noSpaces.test(password),
    noSequential: patterns.noSequential.test(password),
    noRepeating: patterns.noRepeating.test(password),
    notCommon: !reqs.noCommonPasswords || !commonPasswords.includes(password.toLowerCase())
  };
  
  const passedChecks = Object.values(checks).filter(Boolean).length;
  const totalChecks = Object.keys(checks).length;
  const score = Math.round((passedChecks / totalChecks) * 100);
  
  let strength = 'Very Weak';
  if (score >= 80) strength = 'Strong';
  else if (score >= 60) strength = 'Medium';
  else if (score >= 40) strength = 'Weak';
  
  return {
    password: '*'.repeat(password.length),
    isValid: Object.values(checks).every(Boolean),
    strength: strength,
    score: score,
    checks: checks,
    requirements: reqs,
    feedback: generatePasswordFeedback(checks, reqs)
  };
}

function generatePasswordFeedback(checks, reqs) {
  const feedback = [];
  
  if (!checks.length) feedback.push(\`Must be \${reqs.minLength}-\${reqs.maxLength} characters long\`);
  if (!checks.uppercase && reqs.requireUppercase) feedback.push('Add uppercase letters');
  if (!checks.lowercase && reqs.requireLowercase) feedback.push('Add lowercase letters');
  if (!checks.numbers && reqs.requireNumbers) feedback.push('Add numbers');
  if (!checks.specialChars && reqs.requireSpecialChars) feedback.push('Add special characters');
  if (!checks.noSpaces) feedback.push('Remove spaces');
  if (!checks.noSequential) feedback.push('Avoid sequential characters');
  if (!checks.noRepeating) feedback.push('Avoid repeating characters');
  if (!checks.notCommon) feedback.push('Avoid common passwords');
  
  return feedback;
}

// Examples
const testPasswords = [
  'Password123!',
  'password',
  'StrongP@ssw0rd!',
  '12345678',
  'MySecureP@ss2024'
];

console.log('Password Validation Results:');
testPasswords.forEach(pwd => {
  const result = validatePassword(pwd);
  console.log(\`Password: \${result.password} - \${result.strength} (\${result.score}%)\`);
  if (!result.isValid) {
    console.log('  Issues:', result.feedback.join(', '));
  }
});`,
    inputs: [
      {
        name: "password",
        type: "password",
        placeholder: "Enter password to validate",
        defaultValue: "Password123!",
      },
      {
        name: "minLength",
        type: "number",
        placeholder: "Minimum length",
        defaultValue: 8,
      },
    ],
  },

  // 5. Credit Card Validator
  {
    id: "credit-card-regex-validator",
    name: "Credit Card Validator",
    description: "Validate credit card numbers and identify card types",
    category: "regex",
    icon: CreditCard,
    code: `// Credit Card Validator
function validateCreditCard(cardNumber) {
  // Remove spaces and hyphens
  const cleanNumber = cardNumber.replace(/[\s\-]/g, '');
  
  const cardTypes = {
    visa: {
      pattern: /^4[0-9]{12}(?:[0-9]{3})?$/,
      name: 'Visa'
    },
    mastercard: {
      pattern: /^5[1-5][0-9]{14}$/,
      name: 'Mastercard'
    },
    amex: {
      pattern: /^3[47][0-9]{13}$/,
      name: 'American Express'
    },
    discover: {
      pattern: /^6(?:011|5[0-9]{2})[0-9]{12}$/,
      name: 'Discover'
    },
    diners: {
      pattern: /^3[0689][0-9]{11}$/,
      name: 'Diners Club'
    },
    jcb: {
      pattern: /^(?:2131|1800|35\d{3})\d{11}$/,
      name: 'JCB'
    }
  };
  
  // Identify card type
  let cardType = 'Unknown';
  for (const [key, type] of Object.entries(cardTypes)) {
    if (type.pattern.test(cleanNumber)) {
      cardType = type.name;
      break;
    }
  }
  
  // Luhn algorithm validation
  function luhnCheck(num) {
    let sum = 0;
    let alternate = false;
    
    for (let i = num.length - 1; i >= 0; i--) {
      let digit = parseInt(num.charAt(i), 10);
      
      if (alternate) {
        digit *= 2;
        if (digit > 9) {
          digit = (digit % 10) + 1;
        }
      }
      
      sum += digit;
      alternate = !alternate;
    }
    
    return sum % 10 === 0;
  }
  
  const isValidFormat = /^[0-9]{13,19}$/.test(cleanNumber);
  const passesLuhn = isValidFormat ? luhnCheck(cleanNumber) : false;
  
  return {
    originalNumber: cardNumber,
    cleanNumber: cleanNumber,
    cardType: cardType,
    isValidFormat: isValidFormat,
    passesLuhn: passesLuhn,
    isValid: isValidFormat && passesLuhn,
    maskedNumber: cleanNumber ? cleanNumber.replace(/.(?=.{4})/g, '*') : '',
    length: cleanNumber.length
  };
}

// Examples
const testCards = [
  '4532 1234 5678 9012', // Valid Visa
  '5555 5555 5555 4444', // Valid Mastercard
  '3782 822463 10005',   // Valid Amex
  '6011 1111 1111 1117', // Valid Discover
  '1234 5678 9012 3456', // Invalid
  '4532123456789013'     // Invalid (fails Luhn)
];

console.log('Credit Card Validation Results:');
testCards.forEach(card => {
  const result = validateCreditCard(card);
  console.log(\`\${result.maskedNumber} (\${result.cardType}): \${result.isValid ? '✓ Valid' : '✗ Invalid'}\`);
  if (!result.isValid) {
    if (!result.isValidFormat) console.log('  - Invalid format');
    if (!result.passesLuhn) console.log('  - Fails Luhn check');
  }
});`,
    inputs: [
      {
        name: "cardNumber",
        type: "text",
        placeholder: "Enter credit card number",
        defaultValue: "4532 1234 5678 9012",
      },
    ],
  },
  {
    id: "api-key-generator",
    name: "API Key Generator",
    description: "Generate secure API keys and tokens",
    category: "developer",
    icon: Key,
    code: `// API Key Generator
function generateApiKey(length = 32, format = 'hex') {
  const charset = {
    hex: '0123456789abcdef',
    base64: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/',
    alphanumeric: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789',
    uuid: '0123456789abcdef'
  };
  
  if (format === 'uuid') {
    // Generate UUID v4
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      const r = Math.random() * 16 | 0;
      const v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }
  
  const chars = charset[format] || charset.hex;
  let result = '';
  
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  
  // Add prefix based on format
  const prefixes = {
    hex: 'sk_',
    base64: 'pk_',
    alphanumeric: 'api_',
    uuid: ''
  };
  
  return (prefixes[format] || '') + result;
}

function generateJWT(payload = {}, secret = 'your-secret-key') {
  // Simple JWT simulation (not for production use)
  const header = {
    alg: 'HS256',
    typ: 'JWT'
  };
  
  const defaultPayload = {
    sub: '1234567890',
    name: 'John Doe',
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + (60 * 60) // 1 hour
  };
  
  const finalPayload = { ...defaultPayload, ...payload };
  
  const base64Header = btoa(JSON.stringify(header));
  const base64Payload = btoa(JSON.stringify(finalPayload));
  
  // Simple signature simulation
  const signature = btoa(secret + base64Header + base64Payload).substring(0, 43);
  
  return \`\${base64Header}.\${base64Payload}.\${signature}\`;
}

// Generate different types of keys
console.log('Hex API Key:', generateApiKey(32, 'hex'));
console.log('Base64 API Key:', generateApiKey(24, 'base64'));
console.log('UUID:', generateApiKey(0, 'uuid'));
console.log('JWT Token:', generateJWT({ role: 'admin' }));`,
    inputs: [
      {
        name: "length",
        type: "number",
        placeholder: "Key length",
        defaultValue: 32,
      },
      {
        name: "format",
        type: "select",
        options: ["hex", "base64", "alphanumeric", "uuid"],
        defaultValue: "hex",
      },
    ],
  },
  {
    id: "binary-converter",
    name: "Binary/Hex Converter",
    description: "Convert between binary, decimal, and hexadecimal",
    category: "developer",
    icon: Binary,
    code: `// Binary/Hex Converter
function convertNumber(value, fromBase, toBase) {
  try {
    // Convert input to decimal first
    let decimal;
    
    switch (fromBase) {
      case 'binary':
        decimal = parseInt(value, 2);
        break;
      case 'decimal':
        decimal = parseInt(value, 10);
        break;
      case 'hex':
        decimal = parseInt(value, 16);
        break;
      case 'octal':
        decimal = parseInt(value, 8);
        break;
      default:
        throw new Error('Invalid source base');
    }
    
    if (isNaN(decimal)) {
      throw new Error('Invalid input for the specified base');
    }
    
    // Convert decimal to target base
    let result;
    switch (toBase) {
      case 'binary':
        result = decimal.toString(2);
        break;
      case 'decimal':
        result = decimal.toString(10);
        break;
      case 'hex':
        result = decimal.toString(16).toUpperCase();
        break;
      case 'octal':
        result = decimal.toString(8);
        break;
      default:
        throw new Error('Invalid target base');
    }
    
    return {
      success: true,
      original: value,
      fromBase: fromBase,
      toBase: toBase,
      result: result,
      decimal: decimal
    };
  } catch (error) {
    return {
      success: false,
      error: error.message,
      original: value
    };
  }
}

function convertAllBases(value, fromBase) {
  const bases = ['binary', 'decimal', 'hex', 'octal'];
  const results = {};
  
  bases.forEach(base => {
    if (base !== fromBase) {
      const conversion = convertNumber(value, fromBase, base);
      results[base] = conversion.success ? conversion.result : 'Error';
    }
  });
  
  return results;
}

// Example conversions
const input = '255';
const fromBase = 'decimal';

console.log(\`Converting \${input} from \${fromBase}:\`);
const allConversions = convertAllBases(input, fromBase);

Object.entries(allConversions).forEach(([base, result]) => {
  console.log(\`\${base.charAt(0).toUpperCase() + base.slice(1)}: \${result}\`);
});

// Individual conversion
const binaryResult = convertNumber('11111111', 'binary', 'decimal');
console.log(\`Binary 11111111 = Decimal \${binaryResult.result}\`);`,
    inputs: [
      {
        name: "value",
        type: "text",
        placeholder: "Enter number to convert",
        defaultValue: "255",
      },
      {
        name: "fromBase",
        type: "select",
        options: ["binary", "decimal", "hex", "octal"],
        defaultValue: "decimal",
      },
      {
        name: "toBase",
        type: "select",
        options: ["binary", "decimal", "hex", "octal"],
        defaultValue: "binary",
      },
    ],
  },
  {
    id: "code-formatter",
    name: "Code Formatter",
    description: "Format and beautify code (JSON, CSS, HTML)",
    category: "developer",
    icon: Braces,
    code: `// Code Formatter
function formatCode(code, language) {
  try {
    switch (language.toLowerCase()) {
      case 'json':
        return formatJSON(code);
      case 'css':
        return formatCSS(code);
      case 'html':
        return formatHTML(code);
      case 'javascript':
      case 'js':
        return formatJavaScript(code);
      default:
        return { success: false, error: 'Unsupported language' };
    }
  } catch (error) {
    return { success: false, error: error.message };
  }
}

function formatJSON(jsonString) {
  try {
    const parsed = JSON.parse(jsonString);
    return {
      success: true,
      formatted: JSON.stringify(parsed, null, 2),
      minified: JSON.stringify(parsed)
    };
  } catch (error) {
    return { success: false, error: 'Invalid JSON: ' + error.message };
  }
}

function formatCSS(css) {
  // Simple CSS formatter
  let formatted = css
    .replace(/\\s*{\\s*/g, ' {\\n  ')
    .replace(/;\\s*/g, ';\\n  ')
    .replace(/}\\s*/g, '\\n}\\n\\n')
    .replace(/,\\s*/g, ',\\n')
    .trim();
  
  return {
    success: true,
    formatted: formatted,
    minified: css.replace(/\\s+/g, ' ').replace(/;\\s*}/g, '}').trim()
  };
}

function formatHTML(html) {
  // Simple HTML formatter
  let formatted = html
    .replace(/></g, '>\\n<')
    .replace(/^\\s+|\\s+$/gm, '');
  
  // Add indentation
  const lines = formatted.split('\\n');
  let indent = 0;
  const indentedLines = lines.map(line => {
    if (line.includes('</') && !line.includes('</'+ line.split('</')[1].split('>')[0] + '>')) {
      indent--;
    }
    const indentedLine = '  '.repeat(Math.max(0, indent)) + line.trim();
    if (line.includes('<') && !line.includes('</') && !line.includes('/>')) {
      indent++;
    }
    return indentedLine;
  });
  
  return {
    success: true,
    formatted: indentedLines.join('\\n'),
    minified: html.replace(/\\s+/g, ' ').trim()
  };
}

function formatJavaScript(js) {
  // Simple JavaScript formatter
  let formatted = js
    .replace(/;/g, ';\\n')
    .replace(/{/g, ' {\\n  ')
    .replace(/}/g, '\\n}\\n')
    .replace(/,/g, ',\\n  ')
    .trim();
  
  return {
    success: true,
    formatted: formatted,
    minified: js.replace(/\\s+/g, ' ').trim()
  };
}

// Example usage
const sampleJSON = '{"name":"John","age":30,"city":"New York","hobbies":["reading","coding"]}';
const result = formatCode(sampleJSON, 'json');

if (result.success) {
  console.log('Formatted JSON:');
  console.log(result.formatted);
  console.log('Minified JSON:');
  console.log(result.minified);
} else {
  console.log('Error:', result.error);
}`,
    inputs: [
      {
        name: "code",
        type: "textarea",
        placeholder: "Enter code to format",
        defaultValue: '{"name":"John","age":30,"city":"New York"}',
      },
      {
        name: "language",
        type: "select",
        options: ["json", "css", "html", "javascript"],
        defaultValue: "json",
      },
    ],
  },
  {
    id: "url-validator",
    name: "URL Validator",
    description: "Validate and analyze URLs",
    category: "developer",
    icon: Network,
    code: `// URL Validator
function validateURL(url) {
  try {
    const urlObj = new URL(url);
    
    return {
      isValid: true,
      protocol: urlObj.protocol,
      hostname: urlObj.hostname,
      port: urlObj.port || (urlObj.protocol === 'https:' ? '443' : '80'),
      pathname: urlObj.pathname,
      search: urlObj.search,
      hash: urlObj.hash,
      origin: urlObj.origin,
      isSecure: urlObj.protocol === 'https:',
      domain: urlObj.hostname.replace('www.', ''),
      subdomain: urlObj.hostname.split('.').length > 2 ? urlObj.hostname.split('.')[0] : null
    };
  } catch (error) {
    return {
      isValid: false,
      error: error.message
    };
  }
}

function analyzeURL(url) {
  const validation = validateURL(url);
  
  if (!validation.isValid) {
    return validation;
  }
  
  const analysis = {
    ...validation,
    urlLength: url.length,
    hasParameters: validation.search.length > 0,
    parameterCount: validation.search ? validation.search.split('&').length : 0,
    hasFragment: validation.hash.length > 0,
    pathDepth: validation.pathname.split('/').filter(p => p).length,
    isLocalhost: validation.hostname === 'localhost' || validation.hostname === '127.0.0.1',
    isIP: /^\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}$/.test(validation.hostname)
  };
  
  return analysis;
}

// Example usage
const testURL = 'https://www.example.com:8080/path/to/page?param1=value1&param2=value2#section';
const result = analyzeURL(testURL);

console.log('URL Analysis:');
console.log('Valid:', result.isValid);
console.log('Protocol:', result.protocol);
console.log('Domain:', result.domain);
console.log('Is Secure:', result.isSecure);
console.log('Has Parameters:', result.hasParameters);
console.log('Path Depth:', result.pathDepth);`,
    inputs: [
      {
        name: "url",
        type: "text",
        placeholder: "Enter URL to validate",
        defaultValue: "https://www.example.com/path?param=value",
      },
    ],
  },
  {
    id: "image-optimizer",
    name: "Image URL Generator",
    description: "Generate optimized image URLs and placeholders",
    category: "developer",
    icon: Image,
    code: `// Image URL Generator & Optimizer
function generateImageURL(width, height, category = 'nature', format = 'jpg') {
  const services = {
    unsplash: \`https://source.unsplash.com/\${width}x\${height}/?\${category}\`,
    picsum: \`https://picsum.photos/\${width}/\${height}\`,
    placeholder: \`https://via.placeholder.com/\${width}x\${height}/cccccc/969696?text=\${width}x\${height}\`,
    dummyimage: \`https://dummyimage.com/\${width}x\${height}/cccccc/969696&text=\${width}x\${height}\`
  };
  
  return services;
}

function generatePlaceholderSVG(width, height, text = '', bgColor = '#cccccc', textColor = '#666666') {
  const displayText = text || \`\${width}×\${height}\`;
  
  const svg = \`<svg width="\${width}" height="\${height}" xmlns="http://www.w3.org/2000/svg">
    <rect width="100%" height="100%" fill="\${bgColor}"/>
    <text x="50%" y="50%" font-family="Arial, sans-serif" font-size="14" fill="\${textColor}" text-anchor="middle" dy=".3em">\${displayText}</text>
  </svg>\`;
  
  return {
    svg: svg,
    dataURL: \`data:image/svg+xml;base64,\${btoa(svg)}\`,
    width: width,
    height: height
  };
}

function calculateImageSize(originalWidth, originalHeight, maxWidth, maxHeight, maintainAspect = true) {
  if (!maintainAspect) {
    return { width: maxWidth, height: maxHeight };
  }
  
  const aspectRatio = originalWidth / originalHeight;
  
  let newWidth = maxWidth;
  let newHeight = maxHeight;
  
  if (maxWidth / maxHeight > aspectRatio) {
    newWidth = maxHeight * aspectRatio;
  } else {
    newHeight = maxWidth / aspectRatio;
  }
  
  return {
    width: Math.round(newWidth),
    height: Math.round(newHeight),
    aspectRatio: aspectRatio,
    scale: newWidth / originalWidth
  };
}

// Example usage
const imageURLs = generateImageURL(800, 600, 'technology');
console.log('Image URLs:');
Object.entries(imageURLs).forEach(([service, url]) => {
  console.log(\`\${service}: \${url}\`);
});

const placeholder = generatePlaceholderSVG(300, 200, 'Loading...', '#f0f0f0', '#999999');
console.log('Placeholder SVG Data URL:', placeholder.dataURL);

const resized = calculateImageSize(1920, 1080, 800, 600);
console.log('Resized dimensions:', \`\${resized.width}x\${resized.height}\`);`,
    inputs: [
      {
        name: "width",
        type: "number",
        placeholder: "Image width",
        defaultValue: 800,
      },
      {
        name: "height",
        type: "number",
        placeholder: "Image height",
        defaultValue: 600,
      },
      {
        name: "category",
        type: "select",
        options: ["nature", "technology", "people", "architecture", "abstract"],
        defaultValue: "nature",
      },
    ],
  },
  {
    id: "advanced-calculator",
    name: "Advanced Calculator",
    description: "Scientific calculator with advanced mathematical functions",
    category: "regular",
    icon: Calculator,
    code: `// Advanced Calculator
class AdvancedCalculator {
  constructor() {
    this.memory = 0;
    this.history = [];
  }
  
  // Basic operations
  add(a, b) { return a + b; }
  subtract(a, b) { return a - b; }
  multiply(a, b) { return a * b; }
  divide(a, b) { return b !== 0 ? a / b : 'Error: Division by zero'; }
  
  // Advanced operations
  power(base, exponent) { return Math.pow(base, exponent); }
  sqrt(n) { return Math.sqrt(n); }
  cbrt(n) { return Math.cbrt(n); }
  factorial(n) {
    if (n < 0) return 'Error: Negative number';
    if (n === 0 || n === 1) return 1;
    let result = 1;
    for (let i = 2; i <= n; i++) {
      result *= i;
    }
    return result;
  }
  
  // Trigonometric functions (in radians)
  sin(x) { return Math.sin(x); }
  cos(x) { return Math.cos(x); }
  tan(x) { return Math.tan(x); }
  asin(x) { return Math.asin(x); }
  acos(x) { return Math.acos(x); }
  atan(x) { return Math.atan(x); }
  
  // Logarithmic functions
  log(x) { return Math.log(x); }
  log10(x) { return Math.log10(x); }
  log2(x) { return Math.log2(x); }
  
  // Utility functions
  toRadians(degrees) { return degrees * (Math.PI / 180); }
  toDegrees(radians) { return radians * (180 / Math.PI); }
  
  // Memory operations
  memoryStore(value) { this.memory = value; }
  memoryRecall() { return this.memory; }
  memoryClear() { this.memory = 0; }
  memoryAdd(value) { this.memory += value; }
  
  // Expression evaluator (basic)
  evaluate(expression) {
    try {
      // Replace common math functions
      let expr = expression
        .replace(/sin\\(/g, 'Math.sin(')
        .replace(/cos\\(/g, 'Math.cos(')
        .replace(/tan\\(/g, 'Math.tan(')
        .replace(/sqrt\\(/g, 'Math.sqrt(')
        .replace(/log\\(/g, 'Math.log(')
        .replace(/pi/g, 'Math.PI')
        .replace(/e/g, 'Math.E');
      
      const result = Function(\`"use strict"; return (\${expr})\`)();
      
      this.history.push({
        expression: expression,
        result: result,
        timestamp: new Date().toISOString()
      });
      
      return result;
    } catch (error) {
      return 'Error: Invalid expression';
    }
  }
  
  getHistory() {
    return this.history;
  }
  
  clearHistory() {
    this.history = [];
  }
}

// Example usage
const calc = new AdvancedCalculator();

console.log('Basic Operations:');
console.log('5 + 3 =', calc.add(5, 3));
console.log('10 - 4 =', calc.subtract(10, 4));
console.log('6 * 7 =', calc.multiply(6, 7));
console.log('15 / 3 =', calc.divide(15, 3));

console.log('\\nAdvanced Operations:');
console.log('2^8 =', calc.power(2, 8));
console.log('√64 =', calc.sqrt(64));
console.log('5! =', calc.factorial(5));

console.log('\\nTrigonometry (in radians):');
console.log('sin(π/2) =', calc.sin(Math.PI/2));
console.log('cos(0) =', calc.cos(0));

console.log('\\nExpression evaluation:');
console.log('2 + 3 * 4 =', calc.evaluate('2 + 3 * 4'));`,
    inputs: [
      {
        name: "expression",
        type: "text",
        placeholder: "Enter mathematical expression",
        defaultValue: "2 + 3 * 4",
      },
    ],
  },

  // Fun & Quirky
  {
    id: "random-quote-generator",
    name: "Random Quote Generator",
    description: "Generate inspirational quotes",
    category: "fun",
    icon: Quote,
    code: `// Random Quote Generator
function generateRandomQuote() {
  const quotes = [
    { text: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
    { text: "Innovation distinguishes between a leader and a follower.", author: "Steve Jobs" },
    { text: "Life is what happens to you while you're busy making other plans.", author: "John Lennon" },
    { text: "The future belongs to those who believe in the beauty of their dreams.", author: "Eleanor Roosevelt" },
    { text: "It is during our darkest moments that we must focus to see the light.", author: "Aristotle" },
    { text: "The only impossible journey is the one you never begin.", author: "Tony Robbins" },
    { text: "Success is not final, failure is not fatal: it is the courage to continue that counts.", author: "Winston Churchill" },
    { text: "The way to get started is to quit talking and begin doing.", author: "Walt Disney" },
    { text: "Don't let yesterday take up too much of today.", author: "Will Rogers" },
    { text: "You learn more from failure than from success.", author: "Unknown" }
  ];
  
  const randomIndex = Math.floor(Math.random() * quotes.length);
  return quotes[randomIndex];
}

const quote = generateRandomQuote();
console.log(\`"\${quote.text}" - \${quote.author}\`);`,
    inputs: [],
  },
  {
    id: "text-sentiment-analyzer",
    name: "Text Sentiment Analyzer",
    description: "Analyze the sentiment of text (basic implementation)",
    category: "fun",
    icon: MessageSquare,
    code: `// Simple Text Sentiment Analyzer
function analyzeSentiment(text) {
  const positiveWords = [
    'good', 'great', 'excellent', 'amazing', 'wonderful', 'fantastic', 'awesome',
    'love', 'like', 'happy', 'joy', 'pleased', 'satisfied', 'perfect', 'best',
    'brilliant', 'outstanding', 'superb', 'marvelous', 'delighted'
  ];
  
  const negativeWords = [
    'bad', 'terrible', 'awful', 'horrible', 'hate', 'dislike', 'sad', 'angry',
    'disappointed', 'frustrated', 'annoyed', 'upset', 'worst', 'disgusting',
    'pathetic', 'useless', 'boring', 'dull', 'poor', 'inferior'
  ];
  
  const words = text.toLowerCase().split(/\\W+/);
  let positiveCount = 0;
  let negativeCount = 0;
  
  words.forEach(word => {
    if (positiveWords.includes(word)) {
      positiveCount++;
    } else if (negativeWords.includes(word)) {
      negativeCount++;
    }
  });
  
  const totalSentimentWords = positiveCount + negativeCount;
  let sentiment = 'neutral';
  let score = 0;
  
  if (totalSentimentWords > 0) {
    score = (positiveCount - negativeCount) / totalSentimentWords;
    
    if (score > 0.1) {
      sentiment = 'positive';
    } else if (score < -0.1) {
      sentiment = 'negative';
    }
  }
  
  return {
    sentiment: sentiment,
    score: Math.round(score * 100) / 100,
    positiveWords: positiveCount,
    negativeWords: negativeCount,
    confidence: Math.abs(score)
  };
}

const result = analyzeSentiment('I love this amazing product! It works great and makes me happy.');
console.log('Sentiment:', result.sentiment);
console.log('Score:', result.score);
console.log('Confidence:', result.confidence);`,
    inputs: [
      {
        name: "text",
        type: "textarea",
        placeholder: "Enter text to analyze",
        defaultValue:
          "I love this amazing product! It works great and makes me happy.",
      },
    ],
  },

  // Forms
  {
    id: "login-form",
    name: "Login Form",
    description: "Interactive login form with validation",
    category: "forms",
    icon: User,
    code: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login Form</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 20px;
        }
        
        .login-container {
            background: white;
            padding: 40px;
            border-radius: 10px;
            box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
            width: 100%;
            max-width: 400px;
        }
        
        .login-header {
            text-align: center;
            margin-bottom: 30px;
        }
        
        .login-header h2 {
            color: #333;
            margin-bottom: 10px;
        }
        
        .login-header p {
            color: #666;
            font-size: 14px;
        }
        
        .form-group {
            margin-bottom: 20px;
        }
        
        .form-group label {
            display: block;
            margin-bottom: 5px;
            color: #333;
            font-weight: 500;
        }
        
        .form-group input {
            width: 100%;
            padding: 12px;
            border: 2px solid #e1e1e1;
            border-radius: 5px;
            font-size: 16px;
            transition: border-color 0.3s;
        }
        
        .form-group input:focus {
            outline: none;
            border-color: #667eea;
        }
        
        .form-group input.error {
            border-color: #e74c3c;
        }
        
        .error-message {
            color: #e74c3c;
            font-size: 12px;
            margin-top: 5px;
            display: none;
        }
        
        .login-btn {
            width: 100%;
            padding: 12px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            border: none;
            border-radius: 5px;
            font-size: 16px;
            cursor: pointer;
            transition: transform 0.2s;
        }
        
        .login-btn:hover {
            transform: translateY(-2px);
        }
        
        .login-btn:disabled {
            opacity: 0.6;
            cursor: not-allowed;
            transform: none;
        }
        
        .forgot-password {
            text-align: center;
            margin-top: 20px;
        }
        
        .forgot-password a {
            color: #667eea;
            text-decoration: none;
            font-size: 14px;
        }
        
        .success-message {
            background: #d4edda;
            color: #155724;
            padding: 10px;
            border-radius: 5px;
            margin-bottom: 20px;
            display: none;
        }
    </style>
</head>
<body>
    <div class="login-container">
        <div class="login-header">
            <h2>Welcome Back</h2>
            <p>Please sign in to your account</p>
        </div>
        
        <div class="success-message" id="successMessage">
            Login successful! Welcome back.
        </div>
        
        <form id="loginForm">
            <div class="form-group">
                <label for="email">Email Address</label>
                <input type="email" id="email" name="email" required>
                <div class="error-message" id="emailError">Please enter a valid email address</div>
            </div>
            
            <div class="form-group">
                <label for="password">Password</label>
                <input type="password" id="password" name="password" required>
                <div class="error-message" id="passwordError">Password must be at least 6 characters</div>
            </div>
            
            <button type="submit" class="login-btn" id="loginBtn">Sign In</button>
        </form>
        
        <div class="forgot-password">
            <a href="#" onclick="alert('Password reset functionality would be implemented here')">Forgot your password?</a>
        </div>
    </div>

    <script>
        document.getElementById('loginForm').addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = document.getElementById('email');
            const password = document.getElementById('password');
            const loginBtn = document.getElementById('loginBtn');
            const successMessage = document.getElementById('successMessage');
            
            // Reset previous errors
            clearErrors();
            
            let isValid = true;
            
            // Email validation
            if (!email.value || !isValidEmail(email.value)) {
                showError('email', 'emailError');
                isValid = false;
            }
            
            // Password validation
            if (!password.value || password.value.length < 6) {
                showError('password', 'passwordError');
                isValid = false;
            }
            
            if (isValid) {
                // Simulate login process
                loginBtn.disabled = true;
                loginBtn.textContent = 'Signing In...';
                
                setTimeout(() => {
                    successMessage.style.display = 'block';
                    loginBtn.disabled = false;
                    loginBtn.textContent = 'Sign In';
                    
                    // In a real app, you would redirect or update the UI
                    console.log('Login successful:', {
                        email: email.value,
                        timestamp: new Date().toISOString()
                    });
                }, 1500);
            }
        });
        
        function isValidEmail(email) {
            const emailRegex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
            return emailRegex.test(email);
        }
        
        function showError(inputId, errorId) {
            document.getElementById(inputId).classList.add('error');
            document.getElementById(errorId).style.display = 'block';
        }
        
        function clearErrors() {
            const inputs = document.querySelectorAll('input');
            const errors = document.querySelectorAll('.error-message');
            
            inputs.forEach(input => input.classList.remove('error'));
            errors.forEach(error => error.style.display = 'none');
        }
        
        // Clear error on input
        document.querySelectorAll('input').forEach(input => {
            input.addEventListener('input', function() {
                this.classList.remove('error');
                const errorId = this.id + 'Error';
                document.getElementById(errorId).style.display = 'none';
            });
        });
    </script>
</body>
</html>`,
    inputs: [],
  },
  {
    id: "contact-form",
    name: "Contact Form",
    description: "Professional contact form with validation",
    category: "forms",
    icon: Mail,
    code: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Contact Form</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: linear-gradient(135deg, #74b9ff 0%, #0984e3 100%);
            min-height: 100vh;
            padding: 20px;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .contact-container {
            background: white;
            padding: 40px;
            border-radius: 15px;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
            width: 100%;
            max-width: 600px;
        }
        
        .contact-header {
            text-align: center;
            margin-bottom: 30px;
        }
        
        .contact-header h2 {
            color: #333;
            margin-bottom: 10px;
            font-size: 28px;
        }
        
        .contact-header p {
            color: #666;
            font-size: 16px;
        }
        
        .form-row {
            display: flex;
            gap: 20px;
            margin-bottom: 20px;
        }
        
        .form-group {
            flex: 1;
            margin-bottom: 20px;
        }
        
        .form-group label {
            display: block;
            margin-bottom: 8px;
            color: #333;
            font-weight: 500;
        }
        
        .form-group input,
        .form-group select,
        .form-group textarea {
            width: 100%;
            padding: 12px;
            border: 2px solid #e1e1e1;
            border-radius: 8px;
            font-size: 16px;
            transition: border-color 0.3s;
            font-family: inherit;
        }
        
        .form-group textarea {
            resize: vertical;
            min-height: 120px;
        }
        
        .form-group input:focus,
        .form-group select:focus,
        .form-group textarea:focus {
            outline: none;
            border-color: #74b9ff;
        }
        
        .form-group input.error,
        .form-group select.error,
        .form-group textarea.error {
            border-color: #e74c3c;
        }
        
        .error-message {
            color: #e74c3c;
            font-size: 12px;
            margin-top: 5px;
            display: none;
        }
        
        .submit-btn {
            width: 100%;
            padding: 15px;
            background: linear-gradient(135deg, #74b9ff 0%, #0984e3 100%);
            color: white;
            border: none;
            border-radius: 8px;
            font-size: 16px;
            font-weight: 600;
            cursor: pointer;
            transition: transform 0.2s;
        }
        
        .submit-btn:hover {
            transform: translateY(-2px);
        }
        
        .submit-btn:disabled {
            opacity: 0.6;
            cursor: not-allowed;
            transform: none;
        }
        
        .success-message {
            background: #d4edda;
            color: #155724;
            padding: 15px;
            border-radius: 8px;
            margin-bottom: 20px;
            display: none;
        }
        
        @media (max-width: 768px) {
            .form-row {
                flex-direction: column;
                gap: 0;
            }
            
            .contact-container {
                padding: 30px 20px;
            }
        }
    </style>
</head>
<body>
    <div class="contact-container">
        <div class="contact-header">
            <h2>Get In Touch</h2>
            <p>We'd love to hear from you. Send us a message and we'll respond as soon as possible.</p>
        </div>
        
        <div class="success-message" id="successMessage">
            Thank you for your message! We'll get back to you soon.
        </div>
        
        <form id="contactForm">
            <div class="form-row">
                <div class="form-group">
                    <label for="firstName">First Name *</label>
                    <input type="text" id="firstName" name="firstName" required>
                    <div class="error-message" id="firstNameError">First name is required</div>
                </div>
                
                <div class="form-group">
                    <label for="lastName">Last Name *</label>
                    <input type="text" id="lastName" name="lastName" required>
                    <div class="error-message" id="lastNameError">Last name is required</div>
                </div>
            </div>
            
            <div class="form-row">
                <div class="form-group">
                    <label for="email">Email Address *</label>
                    <input type="email" id="email" name="email" required>
                    <div class="error-message" id="emailError">Please enter a valid email address</div>
                </div>
                
                <div class="form-group">
                    <label for="phone">Phone Number</label>
                    <input type="tel" id="phone" name="phone">
                    <div class="error-message" id="phoneError">Please enter a valid phone number</div>
                </div>
            </div>
            
            <div class="form-group">
                <label for="subject">Subject *</label>
                <select id="subject" name="subject" required>
                    <option value="">Select a subject</option>
                    <option value="general">General Inquiry</option>
                    <option value="support">Technical Support</option>
                    <option value="sales">Sales Question</option>
                    <option value="feedback">Feedback</option>
                    <option value="other">Other</option>
                </select>
                <div class="error-message" id="subjectError">Please select a subject</div>
            </div>
            
            <div class="form-group">
                <label for="message">Message *</label>
                <textarea id="message" name="message" placeholder="Tell us how we can help you..." required></textarea>
                <div class="error-message" id="messageError">Please enter your message</div>
            </div>
            
            <button type="submit" class="submit-btn" id="submitBtn">Send Message</button>
        </form>
    </div>

    <script>
        document.getElementById('contactForm').addEventListener('submit', function(e) {
            e.preventDefault();
            
            const firstName = document.getElementById('firstName');
            const lastName = document.getElementById('lastName');
            const email = document.getElementById('email');
            const phone = document.getElementById('phone');
            const subject = document.getElementById('subject');
            const message = document.getElementById('message');
            const submitBtn = document.getElementById('submitBtn');
            const successMessage = document.getElementById('successMessage');
            
            // Reset previous errors
            clearErrors();
            
            let isValid = true;
            
            // First name validation
            if (!firstName.value.trim()) {
                showError('firstName', 'firstNameError');
                isValid = false;
            }
            
            // Last name validation
            if (!lastName.value.trim()) {
                showError('lastName', 'lastNameError');
                isValid = false;
            }
            
            // Email validation
            if (!email.value || !isValidEmail(email.value)) {
                showError('email', 'emailError');
                isValid = false;
            }
            
            // Phone validation (optional but if provided, should be valid)
            if (phone.value && !isValidPhone(phone.value)) {
                showError('phone', 'phoneError');
                isValid = false;
            }
            
            // Subject validation
            if (!subject.value) {
                showError('subject', 'subjectError');
                isValid = false;
            }
            
            // Message validation
            if (!message.value.trim()) {
                showError('message', 'messageError');
                isValid = false;
            }
            
            if (isValid) {
                // Simulate form submission
                submitBtn.disabled = true;
                submitBtn.textContent = 'Sending...';
                
                setTimeout(() => {
                    successMessage.style.display = 'block';
                    submitBtn.disabled = false;
                    submitBtn.textContent = 'Send Message';
                    
                    // Reset form
                    document.getElementById('contactForm').reset();
                    
                    // In a real app, you would send the data to a server
                    console.log('Form submitted:', {
                        firstName: firstName.value,
                        lastName: lastName.value,
                        email: email.value,
                        phone: phone.value,
                        subject: subject.value,
                        message: message.value,
                        timestamp: new Date().toISOString()
                    });
                }, 2000);
            }
        });
        
        function isValidEmail(email) {
            const emailRegex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
            return emailRegex.test(email);
        }
        
        function isValidPhone(phone) {
            const phoneRegex = /^[\\+]?[1-9][\\d\\s\\-\\(\\)]{7,15}$/;
            return phoneRegex.test(phone.replace(/\\s/g, ''));
        }
        
        function showError(inputId, errorId) {
            document.getElementById(inputId).classList.add('error');
            document.getElementById(errorId).style.display = 'block';
        }
        
        function clearErrors() {
            const inputs = document.querySelectorAll('input, select, textarea');
            const errors = document.querySelectorAll('.error-message');
            
            inputs.forEach(input => input.classList.remove('error'));
            errors.forEach(error => error.style.display = 'none');
        }
        
        // Clear error on input
        document.querySelectorAll('input, select, textarea').forEach(input => {
            input.addEventListener('input', function() {
                this.classList.remove('error');
                const errorId = this.id + 'Error';
                const errorElement = document.getElementById(errorId);
                if (errorElement) {
                    errorElement.style.display = 'none';
                }
            });
        });
    </script>
</body>
</html>`,
    inputs: [],
  },

  {
    id: "payment-form",
    name: "Payment Form",
    description: "Secure payment form with card details",
    category: "forms",
    icon: FileText,
    code: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Payment Form</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 20px;
        }
        
        .payment-container {
            background: white;
            padding: 2rem;
            border-radius: 12px;
            box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
            width: 100%;
            max-width: 500px;
        }
        
        .form-title {
            font-size: 1.875rem;
            font-weight: 700;
            color: #1f2937;
            margin: 0 0 0.5rem 0;
            text-align: center;
        }
        
        .form-subtitle {
            color: #6b7280;
            text-align: center;
            margin: 0 0 2rem 0;
        }
        
        .order-summary {
            background: #f8fafc;
            padding: 1.5rem;
            border-radius: 8px;
            margin-bottom: 2rem;
        }
        
        .order-summary h3 {
            margin: 0 0 1rem 0;
            color: #1f2937;
            font-size: 1.125rem;
        }
        
        .summary-row {
            display: flex;
            justify-content: space-between;
            margin-bottom: 0.5rem;
        }
        
        .summary-row.total {
            font-weight: 700;
            font-size: 1.125rem;
            border-top: 2px solid #e2e8f0;
            padding-top: 0.5rem;
            margin-top: 1rem;
            margin-bottom: 0;
        }
        
        .form-section {
            margin-bottom: 2rem;
        }
        
        .form-section h3 {
            margin: 0 0 1rem 0;
            color: #1f2937;
            font-size: 1.125rem;
            border-bottom: 2px solid #f1f5f9;
            padding-bottom: 0.5rem;
        }
        
        .form-row {
            display: flex;
            gap: 1rem;
        }
        
        .form-group {
            margin-bottom: 1.5rem;
        }
        
        .form-group.half {
            flex: 1;
        }
        
        .form-group.quarter {
            flex: 0.5;
        }
        
        .form-group label {
            display: block;
            font-weight: 500;
            color: #374151;
            margin-bottom: 0.5rem;
        }
        
        .form-group input {
            width: 100%;
            padding: 0.75rem;
            border: 2px solid #e5e7eb;
            border-radius: 8px;
            font-size: 1rem;
            transition: border-color 0.2s;
        }
        
        .form-group input:focus {
            outline: none;
            border-color: #667eea;
            box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
        }
        
        .form-group input.error {
            border-color: #ef4444;
        }
        
        .error-message {
            color: #ef4444;
            font-size: 0.875rem;
            margin-top: 0.25rem;
            display: none;
        }
        
        .security-note {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 0.5rem;
            margin-bottom: 2rem;
            padding: 1rem;
            background: #f0f9ff;
            border-radius: 8px;
            color: #0369a1;
            font-size: 0.875rem;
        }
        
        .security-icon {
            font-size: 1rem;
        }
        
        .submit-btn {
            width: 100%;
            background: linear-gradient(135deg, #059669 0%, #047857 100%);
            color: white;
            padding: 1rem;
            border: none;
            border-radius: 8px;
            font-size: 1.125rem;
            font-weight: 700;
            cursor: pointer;
            transition: transform 0.2s;
        }
        
        .submit-btn:hover {
            transform: translateY(-1px);
        }
        
        .submit-btn:disabled {
            opacity: 0.6;
            cursor: not-allowed;
            transform: none;
        }
        
        .success-message {
            background: #d1fae5;
            color: #065f46;
            padding: 1rem;
            border-radius: 8px;
            margin-bottom: 1rem;
            display: none;
        }
        
        @media (max-width: 768px) {
            .form-row {
                flex-direction: column;
                gap: 0;
            }
            
            .payment-container {
                padding: 1.5rem;
            }
        }
    </style>
</head>
<body>
    <div class="payment-container">
        <h2 class="form-title">Payment Details</h2>
        <p class="form-subtitle">Complete your purchase securely</p>
        
        <div class="order-summary">
            <h3>Order Summary</h3>
            <div class="summary-row">
                <span>Subtotal:</span>
                <span>$99.99</span>
            </div>
            <div class="summary-row">
                <span>Tax:</span>
                <span>$8.00</span>
            </div>
            <div class="summary-row total">
                <span>Total:</span>
                <span>$107.99</span>
            </div>
        </div>
        
        <div class="success-message" id="successMessage">
            Payment processed successfully! Thank you for your purchase.
        </div>
        
        <form id="paymentForm" class="payment-form">
            <div class="form-section">
                <h3>Card Information</h3>
                
                <div class="form-group">
                    <label for="cardNumber">Card Number</label>
                    <input 
                        type="text" 
                        id="cardNumber" 
                        name="cardNumber" 
                        required 
                        placeholder="1234 5678 9012 3456"
                        maxlength="19"
                    >
                    <div class="error-message" id="cardNumberError">Please enter a valid card number</div>
                </div>
                
                <div class="form-row">
                    <div class="form-group half">
                        <label for="expiryDate">Expiry Date</label>
                        <input 
                            type="text" 
                            id="expiryDate" 
                            name="expiryDate" 
                            required 
                            placeholder="MM/YY"
                            maxlength="5"
                        >
                        <div class="error-message" id="expiryDateError">Please enter a valid expiry date</div>
                    </div>
                    <div class="form-group half">
                        <label for="cvv">CVV</label>
                        <input 
                            type="text" 
                            id="cvv" 
                            name="cvv" 
                            required 
                            placeholder="123"
                            maxlength="4"
                        >
                        <div class="error-message" id="cvvError">Please enter a valid CVV</div>
                    </div>
                </div>
            </div>
            
            <div class="form-section">
                <h3>Billing Address</h3>
                
                <div class="form-group">
                    <label for="billingAddress">Street Address</label>
                    <input 
                        type="text" 
                        id="billingAddress" 
                        name="billingAddress" 
                        required 
                        placeholder="123 Main Street"
                    >
                    <div class="error-message" id="billingAddressError">Please enter your street address</div>
                </div>
                
                <div class="form-row">
                    <div class="form-group half">
                        <label for="billingCity">City</label>
                        <input 
                            type="text" 
                            id="billingCity" 
                            name="billingCity" 
                            required 
                            placeholder="New York"
                        >
                        <div class="error-message" id="billingCityError">Please enter your city</div>
                    </div>
                    <div class="form-group quarter">
                        <label for="billingState">State</label>
                        <input 
                            type="text" 
                            id="billingState" 
                            name="billingState" 
                            required 
                            placeholder="NY"
                            maxlength="2"
                        >
                        <div class="error-message" id="billingStateError">Please enter your state</div>
                    </div>
                    <div class="form-group quarter">
                        <label for="billingZip">ZIP Code</label>
                        <input 
                            type="text" 
                            id="billingZip" 
                            name="billingZip" 
                            required 
                            placeholder="10001"
                        >
                        <div class="error-message" id="billingZipError">Please enter your ZIP code</div>
                    </div>
                </div>
            </div>
            
            <div class="security-note">
                <div class="security-icon">🔒</div>
                <span>Your payment information is encrypted and secure</span>
            </div>
            
            <button type="submit" class="submit-btn" id="submitBtn">Complete Payment - $107.99</button>
        </form>
    </div>

    <script>
        // Format card number with spaces
        function formatCardNumber(input) {
            let value = input.value.replace(/\\s/g, '').replace(/\\D/g, '');
            let formattedValue = value.replace(/(\\d{4})/g, '$1 ').trim();
            if (formattedValue.length > 19) {
                formattedValue = formattedValue.substring(0, 19);
            }
            input.value = formattedValue;
        }

        // Format expiry date as MM/YY
        function formatExpiryDate(input) {
            let value = input.value.replace(/\\D/g, '');
            if (value.length >= 2) {
                value = value.substring(0, 2) + '/' + value.substring(2, 4);
            }
            input.value = value;
        }

        // Format CVV (numbers only)
        function formatCVV(input) {
            input.value = input.value.replace(/\\D/g, '');
        }

        // Format ZIP code (numbers only)
        function formatZip(input) {
            input.value = input.value.replace(/\\D/g, '');
        }

        // Validate card number (basic Luhn algorithm)
        function isValidCardNumber(cardNumber) {
            const num = cardNumber.replace(/\\s/g, '');
            if (num.length < 13 || num.length > 19) return false;
            
            let sum = 0;
            let isEven = false;
            
            for (let i = num.length - 1; i >= 0; i--) {
                let digit = parseInt(num.charAt(i));
                
                if (isEven) {
                    digit *= 2;
                    if (digit > 9) {
                        digit -= 9;
                    }
                }
                
                sum += digit;
                isEven = !isEven;
            }
            
            return sum % 10 === 0;
        }

        // Validate expiry date
        function isValidExpiryDate(expiryDate) {
            const match = expiryDate.match(/^(\\d{2})\\/(\\d{2})$/);
            if (!match) return false;
            
            const month = parseInt(match[1]);
            const year = parseInt('20' + match[2]);
            const now = new Date();
            const currentYear = now.getFullYear();
            const currentMonth = now.getMonth() + 1;
            
            if (month < 1 || month > 12) return false;
            if (year < currentYear || (year === currentYear && month < currentMonth)) return false;
            
            return true;
        }

        // Show error function
        function showError(inputId, errorId) {
            document.getElementById(inputId).classList.add('error');
            document.getElementById(errorId).style.display = 'block';
        }

        // Clear errors function
        function clearErrors() {
            const inputs = document.querySelectorAll('input');
            const errors = document.querySelectorAll('.error-message');
            
            inputs.forEach(input => input.classList.remove('error'));
            errors.forEach(error => error.style.display = 'none');
        }

        // Add event listeners
        document.addEventListener('DOMContentLoaded', function() {
            const cardNumberInput = document.getElementById('cardNumber');
            const expiryInput = document.getElementById('expiryDate');
            const cvvInput = document.getElementById('cvv');
            const zipInput = document.getElementById('billingZip');
            const paymentForm = document.getElementById('paymentForm');

            // Format inputs
            cardNumberInput.addEventListener('input', (e) => formatCardNumber(e.target));
            expiryInput.addEventListener('input', (e) => formatExpiryDate(e.target));
            cvvInput.addEventListener('input', (e) => formatCVV(e.target));
            zipInput.addEventListener('input', (e) => formatZip(e.target));

            // Clear errors on input
            document.querySelectorAll('input').forEach(input => {
                input.addEventListener('input', function() {
                    this.classList.remove('error');
                    const errorId = this.id + 'Error';
                    const errorElement = document.getElementById(errorId);
                    if (errorElement) {
                        errorElement.style.display = 'none';
                    }
                });
            });

            // Form submission
            paymentForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                const cardNumber = document.getElementById('cardNumber');
                const expiryDate = document.getElementById('expiryDate');
                const cvv = document.getElementById('cvv');
                const billingAddress = document.getElementById('billingAddress');
                const billingCity = document.getElementById('billingCity');
                const billingState = document.getElementById('billingState');
                const billingZip = document.getElementById('billingZip');
                const submitBtn = document.getElementById('submitBtn');
                const successMessage = document.getElementById('successMessage');
                
                clearErrors();
                let isValid = true;
                
                // Card number validation
                if (!cardNumber.value || !isValidCardNumber(cardNumber.value)) {
                    showError('cardNumber', 'cardNumberError');
                    isValid = false;
                }
                
                // Expiry date validation
                if (!expiryDate.value || !isValidExpiryDate(expiryDate.value)) {
                    showError('expiryDate', 'expiryDateError');
                    isValid = false;
                }
                
                // CVV validation
                if (!cvv.value || cvv.value.length < 3) {
                    showError('cvv', 'cvvError');
                    isValid = false;
                }
                
                // Billing address validation
                if (!billingAddress.value.trim()) {
                    showError('billingAddress', 'billingAddressError');
                    isValid = false;
                }
                
                if (!billingCity.value.trim()) {
                    showError('billingCity', 'billingCityError');
                    isValid = false;
                }
                
                if (!billingState.value.trim()) {
                    showError('billingState', 'billingStateError');
                    isValid = false;
                }
                
                if (!billingZip.value.trim()) {
                    showError('billingZip', 'billingZipError');
                    isValid = false;
                }
                
                if (isValid) {
                    submitBtn.disabled = true;
                    submitBtn.textContent = 'Processing...';
                    
                    setTimeout(() => {
                        successMessage.style.display = 'block';
                        submitBtn.disabled = false;
                        submitBtn.textContent = 'Complete Payment - $107.99';
                        
                        // Log masked payment data
                        console.log('Payment processed:', {
                            cardNumber: cardNumber.value.replace(/\\d(?=\\d{4})/g, '*'),
                            expiryDate: expiryDate.value,
                            billingAddress: billingAddress.value,
                            billingCity: billingCity.value,
                            billingState: billingState.value,
                            billingZip: billingZip.value,
                            timestamp: new Date().toISOString()
                        });
                    }, 2000);
                }
            });
        });
    </script>
</body>
</html>`,
    inputs: [],
  },

  // UI Components
  {
    id: "modern-cards",
    name: "Modern Cards",
    description: "Collection of modern card components with different styles",
    category: "components",
    icon: FileText,
    code: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Modern Cards</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            padding: 2rem;
        }
        
        .container {
            max-width: 1200px;
            margin: 0 auto;
        }
        
        h1 {
            text-align: center;
            color: white;
            margin-bottom: 3rem;
            font-size: 2.5rem;
        }
        
        .cards-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 2rem;
            margin-bottom: 3rem;
        }
        
        /* Basic Card */
        .card {
            background: white;
            border-radius: 12px;
            padding: 1.5rem;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            transition: transform 0.2s, box-shadow 0.2s;
        }
        
        .card:hover {
            transform: translateY(-4px);
            box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
        }
        
        .card-title {
            font-size: 1.25rem;
            font-weight: 600;
            margin-bottom: 0.5rem;
            color: #1f2937;
        }
        
        .card-content {
            color: #6b7280;
            line-height: 1.6;
        }
        
        /* Gradient Card */
        .gradient-card {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
        }
        
        .gradient-card .card-title {
            color: white;
        }
        
        .gradient-card .card-content {
            color: rgba(255, 255, 255, 0.9);
        }
        
        /* Image Card */
        .image-card {
            padding: 0;
            overflow: hidden;
        }
        
        .card-image {
            width: 100%;
            height: 200px;
            background: linear-gradient(45deg, #f093fb 0%, #f5576c 100%);
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-size: 3rem;
        }
        
        .image-card-content {
            padding: 1.5rem;
        }
        
        /* Stats Card */
        .stats-card {
            text-align: center;
            background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
            color: white;
        }
        
        .stats-number {
            font-size: 2.5rem;
            font-weight: 700;
            margin-bottom: 0.5rem;
        }
        
        .stats-label {
            font-size: 0.875rem;
            opacity: 0.9;
            text-transform: uppercase;
            letter-spacing: 0.05em;
        }
        
        /* Action Card */
        .action-card {
            border: 2px solid #e5e7eb;
            background: white;
        }
        
        .card-actions {
            margin-top: 1.5rem;
            display: flex;
            gap: 0.75rem;
        }
        
        .btn {
            padding: 0.5rem 1rem;
            border-radius: 6px;
            border: none;
            font-weight: 500;
            cursor: pointer;
            transition: all 0.2s;
        }
        
        .btn-primary {
            background: #3b82f6;
            color: white;
        }
        
        .btn-primary:hover {
            background: #2563eb;
        }
        
        .btn-secondary {
            background: #f3f4f6;
            color: #374151;
        }
        
        .btn-secondary:hover {
            background: #e5e7eb;
        }
        
        /* Profile Card */
        .profile-card {
            text-align: center;
            background: white;
        }
        
        .profile-avatar {
            width: 80px;
            height: 80px;
            border-radius: 50%;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            margin: 0 auto 1rem;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-size: 2rem;
            font-weight: 600;
        }
        
        .profile-name {
            font-size: 1.25rem;
            font-weight: 600;
            margin-bottom: 0.25rem;
            color: #1f2937;
        }
        
        .profile-role {
            color: #6b7280;
            font-size: 0.875rem;
            margin-bottom: 1rem;
        }
        
        .profile-stats {
            display: flex;
            justify-content: space-around;
            padding-top: 1rem;
            border-top: 1px solid #e5e7eb;
        }
        
        .profile-stat {
            text-align: center;
        }
        
        .profile-stat-number {
            font-weight: 600;
            color: #1f2937;
        }
        
        .profile-stat-label {
            font-size: 0.75rem;
            color: #6b7280;
            text-transform: uppercase;
            letter-spacing: 0.05em;
        }
        
        /* Pricing Card */
        .pricing-card {
            background: white;
            border: 2px solid #e5e7eb;
            position: relative;
        }
        
        .pricing-card.featured {
            border-color: #3b82f6;
            transform: scale(1.05);
        }
        
        .pricing-badge {
            position: absolute;
            top: -10px;
            left: 50%;
            transform: translateX(-50%);
            background: #3b82f6;
            color: white;
            padding: 0.25rem 1rem;
            border-radius: 12px;
            font-size: 0.75rem;
            font-weight: 600;
        }
        
        .pricing-plan {
            font-size: 1.125rem;
            font-weight: 600;
            color: #1f2937;
            margin-bottom: 0.5rem;
        }
        
        .pricing-price {
            font-size: 2.5rem;
            font-weight: 700;
            color: #1f2937;
            margin-bottom: 0.25rem;
        }
        
        .pricing-period {
            color: #6b7280;
            font-size: 0.875rem;
            margin-bottom: 1.5rem;
        }
        
        .pricing-features {
            list-style: none;
            margin-bottom: 2rem;
        }
        
        .pricing-features li {
            padding: 0.5rem 0;
            color: #374151;
            position: relative;
            padding-left: 1.5rem;
        }
        
        .pricing-features li:before {
            content: "✓";
            position: absolute;
            left: 0;
            color: #10b981;
            font-weight: 600;
        }
        
        @media (max-width: 768px) {
            .cards-grid {
                grid-template-columns: 1fr;
            }
            
            .pricing-card.featured {
                transform: none;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Modern Card Components</h1>
        
        <div class="cards-grid">
            <!-- Basic Card -->
            <div class="card">
                <h3 class="card-title">Basic Card</h3>
                <p class="card-content">This is a simple card component with clean styling and hover effects. Perfect for displaying basic information or content.</p>
            </div>
            
            <!-- Gradient Card -->
            <div class="card gradient-card">
                <h3 class="card-title">Gradient Card</h3>
                <p class="card-content">A beautiful gradient card that stands out with vibrant colors. Great for highlighting important content or call-to-actions.</p>
            </div>
            
            <!-- Image Card -->
            <div class="card image-card">
                <div class="card-image">🖼️</div>
                <div class="image-card-content">
                    <h3 class="card-title">Image Card</h3>
                    <p class="card-content">Card with image header, perfect for blog posts, products, or media content.</p>
                </div>
            </div>
            
            <!-- Stats Card -->
            <div class="card stats-card">
                <div class="stats-number">1,234</div>
                <div class="stats-label">Total Users</div>
            </div>
            
            <!-- Action Card -->
            <div class="card action-card">
                <h3 class="card-title">Action Card</h3>
                <p class="card-content">This card includes action buttons for user interaction. Perfect for forms or interactive content.</p>
                <div class="card-actions">
                    <button class="btn btn-primary" onclick="alert('Primary action clicked!')">Primary</button>
                    <button class="btn btn-secondary" onclick="alert('Secondary action clicked!')">Secondary</button>
                </div>
            </div>
            
            <!-- Profile Card -->
            <div class="card profile-card">
                <div class="profile-avatar">JD</div>
                <div class="profile-name">John Doe</div>
                <div class="profile-role">Frontend Developer</div>
                <div class="profile-stats">
                    <div class="profile-stat">
                        <div class="profile-stat-number">127</div>
                        <div class="profile-stat-label">Projects</div>
                    </div>
                    <div class="profile-stat">
                        <div class="profile-stat-number">1.2k</div>
                        <div class="profile-stat-label">Followers</div>
                    </div>
                    <div class="profile-stat">
                        <div class="profile-stat-number">89</div>
                        <div class="profile-stat-label">Following</div>
                    </div>
                </div>
            </div>
        </div>
        
        <!-- Pricing Cards -->
        <div class="cards-grid">
            <div class="card pricing-card">
                <div class="pricing-plan">Basic</div>
                <div class="pricing-price">$9</div>
                <div class="pricing-period">per month</div>
                <ul class="pricing-features">
                    <li>5 Projects</li>
                    <li>10GB Storage</li>
                    <li>Email Support</li>
                    <li>Basic Analytics</li>
                </ul>
                <button class="btn btn-secondary" style="width: 100%;">Choose Plan</button>
            </div>
            
            <div class="card pricing-card featured">
                <div class="pricing-badge">Most Popular</div>
                <div class="pricing-plan">Pro</div>
                <div class="pricing-price">$29</div>
                <div class="pricing-period">per month</div>
                <ul class="pricing-features">
                    <li>Unlimited Projects</li>
                    <li>100GB Storage</li>
                    <li>Priority Support</li>
                    <li>Advanced Analytics</li>
                    <li>Team Collaboration</li>
                </ul>
                <button class="btn btn-primary" style="width: 100%;">Choose Plan</button>
            </div>
            
            <div class="card pricing-card">
                <div class="pricing-plan">Enterprise</div>
                <div class="pricing-price">$99</div>
                <div class="pricing-period">per month</div>
                <ul class="pricing-features">
                    <li>Unlimited Everything</li>
                    <li>1TB Storage</li>
                    <li>24/7 Phone Support</li>
                    <li>Custom Analytics</li>
                    <li>Advanced Security</li>
                    <li>API Access</li>
                </ul>
                <button class="btn btn-secondary" style="width: 100%;">Contact Sales</button>
            </div>
        </div>
    </div>
</body>
</html>`,
    inputs: [],
  },
  {
    id: "button-collection",
    name: "Button Collection",
    description: "Various button styles and states for modern web applications",
    category: "components",
    icon: User,
    code: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Button Collection</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            padding: 2rem;
        }
        
        .container {
            max-width: 1200px;
            margin: 0 auto;
        }
        
        h1 {
            text-align: center;
            color: white;
            margin-bottom: 3rem;
            font-size: 2.5rem;
        }
        
        .section {
            background: white;
            border-radius: 12px;
            padding: 2rem;
            margin-bottom: 2rem;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        
        .section-title {
            font-size: 1.5rem;
            font-weight: 600;
            margin-bottom: 1.5rem;
            color: #1f2937;
        }
        
        .button-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
            gap: 1rem;
            margin-bottom: 2rem;
        }
        
        .button-row {
            display: flex;
            flex-wrap: wrap;
            gap: 1rem;
            margin-bottom: 1.5rem;
        }
        
        /* Base Button Styles */
        .btn {
            padding: 0.75rem 1.5rem;
            border: none;
            border-radius: 6px;
            font-size: 0.875rem;
            font-weight: 500;
            cursor: pointer;
            transition: all 0.2s ease;
            text-decoration: none;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            gap: 0.5rem;
            min-width: 120px;
        }
        
        /* Primary Buttons */
        .btn-primary {
            background: #3b82f6;
            color: white;
        }
        
        .btn-primary:hover {
            background: #2563eb;
            transform: translateY(-1px);
        }
        
        .btn-primary:active {
            transform: translateY(0);
        }
        
        /* Secondary Buttons */
        .btn-secondary {
            background: #6b7280;
            color: white;
        }
        
        .btn-secondary:hover {
            background: #4b5563;
            transform: translateY(-1px);
        }
        
        /* Success Buttons */
        .btn-success {
            background: #10b981;
            color: white;
        }
        
        .btn-success:hover {
            background: #059669;
            transform: translateY(-1px);
        }
        
        /* Danger Buttons */
        .btn-danger {
            background: #ef4444;
            color: white;
        }
        
        .btn-danger:hover {
            background: #dc2626;
            transform: translateY(-1px);
        }
        
        /* Warning Buttons */
        .btn-warning {
            background: #f59e0b;
            color: white;
        }
        
        .btn-warning:hover {
            background: #d97706;
            transform: translateY(-1px);
        }
        
        /* Outline Buttons */
        .btn-outline {
            background: transparent;
            border: 2px solid #3b82f6;
            color: #3b82f6;
        }
        
        .btn-outline:hover {
            background: #3b82f6;
            color: white;
        }
        
        .btn-outline-secondary {
            background: transparent;
            border: 2px solid #6b7280;
            color: #6b7280;
        }
        
        .btn-outline-secondary:hover {
            background: #6b7280;
            color: white;
        }
        
        /* Ghost Buttons */
        .btn-ghost {
            background: transparent;
            color: #3b82f6;
        }
        
        .btn-ghost:hover {
            background: rgba(59, 130, 246, 0.1);
        }
        
        /* Gradient Buttons */
        .btn-gradient {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
        }
        
        .btn-gradient:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
        }
        
        .btn-gradient-success {
            background: linear-gradient(135deg, #10b981 0%, #059669 100%);
            color: white;
        }
        
        .btn-gradient-success:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(16, 185, 129, 0.4);
        }
        
        /* Size Variations */
        .btn-sm {
            padding: 0.5rem 1rem;
            font-size: 0.75rem;
            min-width: 80px;
        }
        
        .btn-lg {
            padding: 1rem 2rem;
            font-size: 1rem;
            min-width: 160px;
        }
        
        .btn-xl {
            padding: 1.25rem 2.5rem;
            font-size: 1.125rem;
            min-width: 200px;
        }
        
        /* Rounded Buttons */
        .btn-rounded {
            border-radius: 25px;
        }
        
        /* Icon Buttons */
        .btn-icon {
            width: 40px;
            height: 40px;
            padding: 0;
            border-radius: 50%;
            min-width: auto;
        }
        
        .btn-icon-lg {
            width: 50px;
            height: 50px;
            font-size: 1.25rem;
        }
        
        /* Loading Button */
        .btn-loading {
            position: relative;
            color: transparent;
        }
        
        .btn-loading::after {
            content: "";
            position: absolute;
            width: 16px;
            height: 16px;
            top: 50%;
            left: 50%;
            margin-left: -8px;
            margin-top: -8px;
            border: 2px solid transparent;
            border-top-color: currentColor;
            border-radius: 50%;
            animation: spin 1s linear infinite;
        }
        
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
        
        /* Disabled State */
        .btn:disabled {
            opacity: 0.5;
            cursor: not-allowed;
            transform: none !important;
        }
        
        /* Floating Action Button */
        .fab {
            position: fixed;
            bottom: 2rem;
            right: 2rem;
            width: 56px;
            height: 56px;
            border-radius: 50%;
            background: #3b82f6;
            color: white;
            border: none;
            font-size: 1.5rem;
            cursor: pointer;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            transition: all 0.2s ease;
        }
        
        .fab:hover {
            transform: scale(1.1);
            box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
        }
        
        /* Toggle Button */
        .btn-toggle {
            background: #f3f4f6;
            color: #374151;
        }
        
        .btn-toggle.active {
            background: #3b82f6;
            color: white;
        }
        
        /* Social Buttons */
        .btn-social {
            color: white;
            font-weight: 600;
        }
        
        .btn-facebook { background: #1877f2; }
        .btn-twitter { background: #1da1f2; }
        .btn-github { background: #333; }
        .btn-google { background: #db4437; }
        
        .btn-social:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Button Collection</h1>
        
        <!-- Basic Buttons -->
        <div class="section">
            <h2 class="section-title">Basic Buttons</h2>
            <div class="button-row">
                <button class="btn btn-primary" onclick="alert('Primary clicked!')">Primary</button>
                <button class="btn btn-secondary" onclick="alert('Secondary clicked!')">Secondary</button>
                <button class="btn btn-success" onclick="alert('Success clicked!')">Success</button>
                <button class="btn btn-danger" onclick="alert('Danger clicked!')">Danger</button>
                <button class="btn btn-warning" onclick="alert('Warning clicked!')">Warning</button>
            </div>
        </div>
        
        <!-- Outline Buttons -->
        <div class="section">
            <h2 class="section-title">Outline Buttons</h2>
            <div class="button-row">
                <button class="btn btn-outline">Primary Outline</button>
                <button class="btn btn-outline-secondary">Secondary Outline</button>
                <button class="btn btn-ghost">Ghost Button</button>
            </div>
        </div>
        
        <!-- Gradient Buttons -->
        <div class="section">
            <h2 class="section-title">Gradient Buttons</h2>
            <div class="button-row">
                <button class="btn btn-gradient">Gradient Primary</button>
                <button class="btn btn-gradient-success">Gradient Success</button>
            </div>
        </div>
        
        <!-- Size Variations -->
        <div class="section">
            <h2 class="section-title">Size Variations</h2>
            <div class="button-row">
                <button class="btn btn-primary btn-sm">Small</button>
                <button class="btn btn-primary">Default</button>
                <button class="btn btn-primary btn-lg">Large</button>
                <button class="btn btn-primary btn-xl">Extra Large</button>
            </div>
        </div>
        
        <!-- Rounded Buttons -->
        <div class="section">
            <h2 class="section-title">Rounded Buttons</h2>
            <div class="button-row">
                <button class="btn btn-primary btn-rounded">Rounded Primary</button>
                <button class="btn btn-success btn-rounded">Rounded Success</button>
                <button class="btn btn-outline btn-rounded">Rounded Outline</button>
            </div>
        </div>
        
        <!-- Icon Buttons -->
        <div class="section">
            <h2 class="section-title">Icon Buttons</h2>
            <div class="button-row">
                <button class="btn btn-primary">📧 Email</button>
                <button class="btn btn-success">✓ Save</button>
                <button class="btn btn-danger">🗑️ Delete</button>
                <button class="btn btn-icon btn-primary">+</button>
                <button class="btn btn-icon btn-icon-lg btn-secondary">⚙️</button>
            </div>
        </div>
        
        <!-- Button States -->
        <div class="section">
            <h2 class="section-title">Button States</h2>
            <div class="button-row">
                <button class="btn btn-primary">Normal</button>
                <button class="btn btn-primary btn-loading">Loading</button>
                <button class="btn btn-primary" disabled>Disabled</button>
                <button class="btn btn-toggle" onclick="this.classList.toggle('active')">Toggle</button>
                <button class="btn btn-toggle active" onclick="this.classList.toggle('active')">Active Toggle</button>
            </div>
        </div>
        
        <!-- Social Buttons -->
        <div class="section">
            <h2 class="section-title">Social Buttons</h2>
            <div class="button-row">
                <button class="btn btn-social btn-facebook">📘 Facebook</button>
                <button class="btn btn-social btn-twitter">🐦 Twitter</button>
                <button class="btn btn-social btn-github">🐙 GitHub</button>
                <button class="btn btn-social btn-google">🔍 Google</button>
            </div>
        </div>
    </div>
    
    <!-- Floating Action Button -->
    <button class="fab" onclick="alert('FAB clicked!')">+</button>
    
    <script>
        // Add some interactivity
        document.addEventListener('DOMContentLoaded', function() {
            // Loading button demo
            const loadingBtn = document.querySelector('.btn-loading');
            if (loadingBtn) {
                loadingBtn.addEventListener('click', function() {
                    this.style.color = 'white';
                    setTimeout(() => {
                        this.style.color = 'transparent';
                    }, 2000);
                });
            }
            
            // Toggle buttons
            document.querySelectorAll('.btn-toggle').forEach(btn => {
                btn.addEventListener('click', function() {
                    this.classList.toggle('active');
                });
            });
        });
    </script>
</body>
</html>`,
    inputs: [],
  },
  {
    id: "loading-spinners",
    name: "Loading Spinners",
    description:
      "Collection of animated loading spinners and progress indicators",
    category: "components",
    icon: Clock,
    code: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Loading Spinners</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            padding: 2rem;
        }
        
        .container {
            max-width: 1200px;
            margin: 0 auto;
        }
        
        h1 {
            text-align: center;
            color: white;
            margin-bottom: 3rem;
            font-size: 2.5rem;
        }
        
        .section {
            background: white;
            border-radius: 12px;
            padding: 2rem;
            margin-bottom: 2rem;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        
        .section-title {
            font-size: 1.5rem;
            font-weight: 600;
            margin-bottom: 1.5rem;
            color: #1f2937;
        }
        
        .spinner-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
            gap: 2rem;
            margin-bottom: 2rem;
        }
        
        .spinner-item {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 1rem;
        }
        
        .spinner-label {
            font-size: 0.875rem;
            color: #6b7280;
            text-align: center;
        }
        
        /* Basic Spinner */
        .spinner-basic {
            width: 40px;
            height: 40px;
            border: 4px solid #f3f4f6;
            border-top: 4px solid #3b82f6;
            border-radius: 50%;
            animation: spin 1s linear infinite;
        }
        
        /* Dots Spinner */
        .spinner-dots {
            display: flex;
            gap: 4px;
        }
        
        .spinner-dots div {
            width: 8px;
            height: 8px;
            background: #3b82f6;
            border-radius: 50%;
            animation: dots 1.4s ease-in-out infinite both;
        }
        
        .spinner-dots div:nth-child(1) { animation-delay: -0.32s; }
        .spinner-dots div:nth-child(2) { animation-delay: -0.16s; }
        .spinner-dots div:nth-child(3) { animation-delay: 0s; }
        
        /* Pulse Spinner */
        .spinner-pulse {
            width: 40px;
            height: 40px;
            background: #3b82f6;
            border-radius: 50%;
            animation: pulse 1.5s ease-in-out infinite;
        }
        
        /* Bars Spinner */
        .spinner-bars {
            display: flex;
            gap: 4px;
            align-items: end;
        }
        
        .spinner-bars div {
            width: 6px;
            height: 40px;
            background: #3b82f6;
            animation: bars 1.2s ease-in-out infinite;
        }
        
        .spinner-bars div:nth-child(1) { animation-delay: -1.1s; }
        .spinner-bars div:nth-child(2) { animation-delay: -1.0s; }
        .spinner-bars div:nth-child(3) { animation-delay: -0.9s; }
        .spinner-bars div:nth-child(4) { animation-delay: -0.8s; }
        .spinner-bars div:nth-child(5) { animation-delay: -0.7s; }
        
        /* Ring Spinner */
        .spinner-ring {
            width: 40px;
            height: 40px;
            border: 4px solid transparent;
            border-top: 4px solid #3b82f6;
            border-right: 4px solid #3b82f6;
            border-radius: 50%;
            animation: ring 1s linear infinite;
        }
        
        /* Dual Ring */
        .spinner-dual-ring {
            width: 40px;
            height: 40px;
            border: 4px solid #f3f4f6;
            border-top: 4px solid #3b82f6;
            border-bottom: 4px solid #3b82f6;
            border-radius: 50%;
            animation: dual-ring 1.2s linear infinite;
        }
        
        /* Bounce Spinner */
        .spinner-bounce {
            display: flex;
            gap: 4px;
        }
        
        .spinner-bounce div {
            width: 12px;
            height: 12px;
            background: #3b82f6;
            border-radius: 50%;
            animation: bounce 1.4s ease-in-out infinite both;
        }
        
        .spinner-bounce div:nth-child(1) { animation-delay: -0.32s; }
        .spinner-bounce div:nth-child(2) { animation-delay: -0.16s; }
        .spinner-bounce div:nth-child(3) { animation-delay: 0s; }
        
        /* Grid Spinner */
        .spinner-grid-loader {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 4px;
            width: 40px;
            height: 40px;
        }
        
        .spinner-grid-loader div {
            background: #3b82f6;
            animation: grid 1.2s ease-in-out infinite;
        }
        
        .spinner-grid-loader div:nth-child(1) { animation-delay: 0s; }
        .spinner-grid-loader div:nth-child(2) { animation-delay: -0.4s; }
        .spinner-grid-loader div:nth-child(3) { animation-delay: -0.8s; }
        .spinner-grid-loader div:nth-child(4) { animation-delay: -0.4s; }
        .spinner-grid-loader div:nth-child(5) { animation-delay: -0.8s; }
        .spinner-grid-loader div:nth-child(6) { animation-delay: -1.2s; }
        .spinner-grid-loader div:nth-child(7) { animation-delay: -0.8s; }
        .spinner-grid-loader div:nth-child(8) { animation-delay: -1.2s; }
        .spinner-grid-loader div:nth-child(9) { animation-delay: -1.6s; }
        
        /* Progress Bar */
        .progress-bar {
            width: 200px;
            height: 8px;
            background: #f3f4f6;
            border-radius: 4px;
            overflow: hidden;
        }
        
        .progress-bar-fill {
            height: 100%;
            background: linear-gradient(90deg, #3b82f6, #1d4ed8);
            border-radius: 4px;
            animation: progress 2s ease-in-out infinite;
        }
        
        /* Circular Progress */
        .circular-progress {
            width: 50px;
            height: 50px;
            position: relative;
        }
        
        .circular-progress svg {
            width: 100%;
            height: 100%;
            transform: rotate(-90deg);
        }
        
        .circular-progress circle {
            fill: none;
            stroke-width: 4;
            stroke-linecap: round;
        }
        
        .circular-progress .bg {
            stroke: #f3f4f6;
        }
        
        .circular-progress .progress {
            stroke: #3b82f6;
            stroke-dasharray: 126;
            animation: circular-progress 2s ease-in-out infinite;
        }
        
        /* Skeleton Loader */
        .skeleton {
            width: 200px;
            height: 60px;
            background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
            background-size: 200% 100%;
            animation: skeleton 1.5s ease-in-out infinite;
            border-radius: 8px;
        }
        
        /* Animations */
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
        
        @keyframes dots {
            0%, 80%, 100% { transform: scale(0); }
            40% { transform: scale(1); }
        }
        
        @keyframes pulse {
            0%, 100% { transform: scale(0); opacity: 1; }
            50% { transform: scale(1); opacity: 0.5; }
        }
        
        @keyframes bars {
            0%, 40%, 100% { transform: scaleY(0.4); }
            20% { transform: scaleY(1.0); }
        }
        
        @keyframes ring {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
        
        @keyframes dual-ring {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
        
        @keyframes bounce {
            0%, 80%, 100% { transform: scale(0); }
            40% { transform: scale(1); }
        }
        
        @keyframes grid {
            0%, 70%, 100% { transform: scale3D(1, 1, 1); }
            35% { transform: scale3D(0, 0, 1); }
        }
        
        @keyframes progress {
            0% { transform: translateX(-100%); }
            50% { transform: translateX(0%); }
            100% { transform: translateX(100%); }
        }
        
        @keyframes circular-progress {
            0% { stroke-dashoffset: 126; }
            50% { stroke-dashoffset: 31.5; }
            100% { stroke-dashoffset: 126; }
        }
        
        @keyframes skeleton {
            0% { background-position: -200% 0; }
            100% { background-position: 200% 0; }
        }
        
        /* Size Variations */
        .size-sm .spinner-basic,
        .size-sm .spinner-ring,
        .size-sm .spinner-dual-ring,
        .size-sm .spinner-pulse {
            width: 24px;
            height: 24px;
        }
        
        .size-lg .spinner-basic,
        .size-lg .spinner-ring,
        .size-lg .spinner-dual-ring,
        .size-lg .spinner-pulse {
            width: 60px;
            height: 60px;
        }
        
        /* Color Variations */
        .color-success .spinner-basic { border-top-color: #10b981; }
        .color-success .spinner-ring { border-top-color: #10b981; border-right-color: #10b981; }
        .color-success .spinner-dots div,
        .color-success .spinner-bars div,
        .color-success .spinner-bounce div,
        .color-success .spinner-grid-loader div,
        .color-success .spinner-pulse { background: #10b981; }
        
        .color-warning .spinner-basic { border-top-color: #f59e0b; }
        .color-warning .spinner-ring { border-top-color: #f59e0b; border-right-color: #f59e0b; }
        .color-warning .spinner-dots div,
        .color-warning .spinner-bars div,
        .color-warning .spinner-bounce div,
        .color-warning .spinner-grid-loader div,
        .color-warning .spinner-pulse { background: #f59e0b; }
        
        .color-danger .spinner-basic { border-top-color: #ef4444; }
        .color-danger .spinner-ring { border-top-color: #ef4444; border-right-color: #ef4444; }
        .color-danger .spinner-dots div,
        .color-danger .spinner-bars div,
        .color-danger .spinner-bounce div,
        .color-danger .spinner-grid-loader div,
        .color-danger .spinner-pulse { background: #ef4444; }
    </style>
</head>
<body>
    <div class="container">
        <h1>Loading Spinners & Progress Indicators</h1>
        
        <!-- Basic Spinners -->
        <div class="section">
            <h2 class="section-title">Basic Spinners</h2>
            <div class="spinner-grid">
                <div class="spinner-item">
                    <div class="spinner-basic"></div>
                    <div class="spinner-label">Basic Spinner</div>
                </div>
                
                <div class="spinner-item">
                    <div class="spinner-ring"></div>
                    <div class="spinner-label">Ring Spinner</div>
                </div>
                
                <div class="spinner-item">
                    <div class="spinner-dual-ring"></div>
                    <div class="spinner-label">Dual Ring</div>
                </div>
                
                <div class="spinner-item">
                    <div class="spinner-pulse"></div>
                    <div class="spinner-label">Pulse</div>
                </div>
            </div>
        </div>
        
        <!-- Dot & Bar Spinners -->
        <div class="section">
            <h2 class="section-title">Dot & Bar Animations</h2>
            <div class="spinner-grid">
                <div class="spinner-item">
                    <div class="spinner-dots">
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                    <div class="spinner-label">Dots</div>
                </div>
                
                <div class="spinner-item">
                    <div class="spinner-bounce">
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                    <div class="spinner-label">Bounce</div>
                </div>
                
                <div class="spinner-item">
                    <div class="spinner-bars">
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                    <div class="spinner-label">Bars</div>
                </div>
                
                <div class="spinner-item">
                    <div class="spinner-grid-loader">
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                    <div class="spinner-label">Grid</div>
                </div>
            </div>
        </div>
        
        <!-- Progress Indicators -->
        <div class="section">
            <h2 class="section-title">Progress Indicators</h2>
            <div class="spinner-grid">
                <div class="spinner-item">
                    <div class="progress-bar">
                        <div class="progress-bar-fill"></div>
                    </div>
                    <div class="spinner-label">Progress Bar</div>
                </div>
                
                <div class="spinner-item">
                    <div class="circular-progress">
                        <svg>
                            <circle class="bg" cx="25" cy="25" r="20"></circle>
                            <circle class="progress" cx="25" cy="25" r="20"></circle>
                        </svg>
                    </div>
                    <div class="spinner-label">Circular Progress</div>
                </div>
                
                <div class="spinner-item">
                    <div class="skeleton"></div>
                    <div class="spinner-label">Skeleton Loader</div>
                </div>
            </div>
        </div>
        
        <!-- Size Variations -->
        <div class="section">
            <h2 class="section-title">Size Variations</h2>
            <div class="spinner-grid">
                <div class="spinner-item size-sm">
                    <div class="spinner-basic"></div>
                    <div class="spinner-label">Small</div>
                </div>
                
                <div class="spinner-item">
                    <div class="spinner-basic"></div>
                    <div class="spinner-label">Default</div>
                </div>
                
                <div class="spinner-item size-lg">
                    <div class="spinner-basic"></div>
                    <div class="spinner-label">Large</div>
                </div>
            </div>
        </div>
        
        <!-- Color Variations -->
        <div class="section">
            <h2 class="section-title">Color Variations</h2>
            <div class="spinner-grid">
                <div class="spinner-item">
                    <div class="spinner-basic"></div>
                    <div class="spinner-label">Primary</div>
                </div>
                
                <div class="spinner-item color-success">
                    <div class="spinner-basic"></div>
                    <div class="spinner-label">Success</div>
                </div>
                
                <div class="spinner-item color-warning">
                    <div class="spinner-basic"></div>
                    <div class="spinner-label">Warning</div>
                </div>
                
                <div class="spinner-item color-danger">
                    <div class="spinner-basic"></div>
                    <div class="spinner-label">Danger</div>
                </div>
            </div>
        </div>
    </div>
</body>
</html>`,
    inputs: [],
  },
  {
    id: "data-table",
    name: "Data Table with Filters",
    description:
      "Interactive data table with sorting, filtering, and search functionality",
    category: "components",
    icon: FileText,
    code: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Data Table with Filters</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            padding: 2rem;
        }
        
        .container {
            max-width: 1400px;
            margin: 0 auto;
            background: white;
            border-radius: 12px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            overflow: hidden;
        }
        
        .table-header {
            padding: 2rem;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
        }
        
        .table-title {
            font-size: 2rem;
            font-weight: 700;
            margin-bottom: 0.5rem;
        }
        
        .table-subtitle {
            opacity: 0.9;
            font-size: 1rem;
        }
        
        .table-controls {
            padding: 1.5rem 2rem;
            background: #f8fafc;
            border-bottom: 1px solid #e2e8f0;
            display: flex;
            flex-wrap: wrap;
            gap: 1rem;
            align-items: center;
        }
        
        .search-box {
            flex: 1;
            min-width: 250px;
            position: relative;
        }
        
        .search-input {
            width: 100%;
            padding: 0.75rem 1rem 0.75rem 2.5rem;
            border: 2px solid #e2e8f0;
            border-radius: 8px;
            font-size: 0.875rem;
            transition: border-color 0.2s;
        }
        
        .search-input:focus {
            outline: none;
            border-color: #667eea;
        }
        
        .search-icon {
            position: absolute;
            left: 0.75rem;
            top: 50%;
            transform: translateY(-50%);
            color: #6b7280;
            font-size: 1rem;
        }
        
        .filter-group {
            display: flex;
            gap: 0.5rem;
            align-items: center;
        }
        
        .filter-select {
            padding: 0.5rem 0.75rem;
            border: 2px solid #e2e8f0;
            border-radius: 6px;
            font-size: 0.875rem;
            background: white;
            cursor: pointer;
        }
        
        .filter-select:focus {
            outline: none;
            border-color: #667eea;
        }
        
        .results-info {
            color: #6b7280;
            font-size: 0.875rem;
        }
        
        .table-wrapper {
            overflow-x: auto;
        }
        
        .data-table {
            width: 100%;
            border-collapse: collapse;
            font-size: 0.875rem;
        }
        
        .data-table th {
            background: #f8fafc;
            padding: 1rem;
            text-align: left;
            font-weight: 600;
            color: #374151;
            border-bottom: 2px solid #e2e8f0;
            position: relative;
            cursor: pointer;
            user-select: none;
        }
        
        .data-table th:hover {
            background: #f1f5f9;
        }
        
        .data-table th.sortable::after {
            content: "↕️";
            position: absolute;
            right: 0.5rem;
            opacity: 0.5;
            font-size: 0.75rem;
        }
        
        .data-table th.sort-asc::after {
            content: "↑";
            opacity: 1;
            color: #667eea;
        }
        
        .data-table th.sort-desc::after {
            content: "↓";
            opacity: 1;
            color: #667eea;
        }
        
        .data-table td {
            padding: 1rem;
            border-bottom: 1px solid #e2e8f0;
            color: #374151;
        }
        
        .data-table tbody tr:hover {
            background: #f8fafc;
        }
        
        .status-badge {
            padding: 0.25rem 0.75rem;
            border-radius: 12px;
            font-size: 0.75rem;
            font-weight: 500;
            text-transform: uppercase;
            letter-spacing: 0.05em;
        }
        
        .status-active {
            background: #d1fae5;
            color: #065f46;
        }
        
        .status-inactive {
            background: #fee2e2;
            color: #991b1b;
        }
        
        .status-pending {
            background: #fef3c7;
            color: #92400e;
        }
        
        .avatar {
            width: 32px;
            height: 32px;
            border-radius: 50%;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            display: inline-flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-weight: 600;
            font-size: 0.75rem;
            margin-right: 0.75rem;
        }
        
        .user-info {
            display: flex;
            align-items: center;
        }
        
        .user-details {
            display: flex;
            flex-direction: column;
        }
        
        .user-name {
            font-weight: 500;
            color: #1f2937;
        }
        
        .user-email {
            font-size: 0.75rem;
            color: #6b7280;
        }
        
        .pagination {
            padding: 1.5rem 2rem;
            display: flex;
            justify-content: between;
            align-items: center;
            border-top: 1px solid #e2e8f0;
        }
        
        .pagination-info {
            color: #6b7280;
            font-size: 0.875rem;
        }
        
        .pagination-controls {
            display: flex;
            gap: 0.5rem;
            margin-left: auto;
        }
        
        .pagination-btn {
            padding: 0.5rem 0.75rem;
            border: 1px solid #e2e8f0;
            background: white;
            color: #374151;
            border-radius: 6px;
            cursor: pointer;
            font-size: 0.875rem;
            transition: all 0.2s;
        }
        
        .pagination-btn:hover:not(:disabled) {
            background: #f8fafc;
            border-color: #667eea;
        }
        
        .pagination-btn:disabled {
            opacity: 0.5;
            cursor: not-allowed;
        }
        
        .pagination-btn.active {
            background: #667eea;
            color: white;
            border-color: #667eea;
        }
        
        .no-results {
            text-align: center;
            padding: 3rem;
            color: #6b7280;
        }
        
        .no-results-icon {
            font-size: 3rem;
            margin-bottom: 1rem;
            opacity: 0.5;
        }
        
        @media (max-width: 768px) {
            .table-controls {
                flex-direction: column;
                align-items: stretch;
            }
            
            .search-box {
                min-width: auto;
            }
            
            .filter-group {
                justify-content: space-between;
            }
            
            .pagination {
                flex-direction: column;
                gap: 1rem;
            }
            
            .pagination-controls {
                margin-left: 0;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="table-header">
            <h1 class="table-title">User Management</h1>
            <p class="table-subtitle">Manage and filter your user database with advanced controls</p>
        </div>
        
        <div class="table-controls">
            <div class="search-box">
                <div class="search-icon">🔍</div>
                <input type="text" class="search-input" placeholder="Search users..." id="searchInput">
            </div>
            
            <div class="filter-group">
                <label for="statusFilter">Status:</label>
                <select class="filter-select" id="statusFilter">
                    <option value="">All Status</option>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                    <option value="pending">Pending</option>
                </select>
            </div>
            
            <div class="filter-group">
                <label for="roleFilter">Role:</label>
                <select class="filter-select" id="roleFilter">
                    <option value="">All Roles</option>
                    <option value="admin">Admin</option>
                    <option value="user">User</option>
                    <option value="moderator">Moderator</option>
                </select>
            </div>
            
            <div class="results-info" id="resultsInfo">
                Showing 0 of 0 results
            </div>
        </div>
        
        <div class="table-wrapper">
            <table class="data-table">
                <thead>
                    <tr>
                        <th class="sortable" data-sort="name">User</th>
                        <th class="sortable" data-sort="role">Role</th>
                        <th class="sortable" data-sort="status">Status</th>
                        <th class="sortable" data-sort="joinDate">Join Date</th>
                        <th class="sortable" data-sort="lastActive">Last Active</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody id="tableBody">
                    <!-- Data will be populated by JavaScript -->
                </tbody>
            </table>
            
            <div class="no-results" id="noResults" style="display: none;">
                <div class="no-results-icon">📭</div>
                <h3>No results found</h3>
                <p>Try adjusting your search or filter criteria</p>
            </div>
        </div>
        
        <div class="pagination">
            <div class="pagination-info" id="paginationInfo">
                Showing 1-10 of 50 results
            </div>
            <div class="pagination-controls" id="paginationControls">
                <!-- Pagination buttons will be generated by JavaScript -->
            </div>
        </div>
    </div>

    <script>
        // Sample data
        const userData = [
            { id: 1, name: "John Doe", email: "john@example.com", role: "admin", status: "active", joinDate: "2023-01-15", lastActive: "2024-01-20" },
            { id: 2, name: "Jane Smith", email: "jane@example.com", role: "user", status: "active", joinDate: "2023-02-20", lastActive: "2024-01-19" },
            { id: 3, name: "Mike Johnson", email: "mike@example.com", role: "moderator", status: "inactive", joinDate: "2023-03-10", lastActive: "2024-01-15" },
            { id: 4, name: "Sarah Wilson", email: "sarah@example.com", role: "user", status: "pending", joinDate: "2023-04-05", lastActive: "2024-01-18" },
            { id: 5, name: "David Brown", email: "david@example.com", role: "admin", status: "active", joinDate: "2023-05-12", lastActive: "2024-01-21" },
            { id: 6, name: "Lisa Davis", email: "lisa@example.com", role: "user", status: "active", joinDate: "2023-06-18", lastActive: "2024-01-17" },
            { id: 7, name: "Tom Miller", email: "tom@example.com", role: "moderator", status: "inactive", joinDate: "2023-07-22", lastActive: "2024-01-10" },
            { id: 8, name: "Emma Garcia", email: "emma@example.com", role: "user", status: "pending", joinDate: "2023-08-30", lastActive: "2024-01-16" },
            { id: 9, name: "Chris Lee", email: "chris@example.com", role: "admin", status: "active", joinDate: "2023-09-14", lastActive: "2024-01-22" },
            { id: 10, name: "Anna Taylor", email: "anna@example.com", role: "user", status: "active", joinDate: "2023-10-08", lastActive: "2024-01-14" },
            { id: 11, name: "Mark Anderson", email: "mark@example.com", role: "moderator", status: "active", joinDate: "2023-11-25", lastActive: "2024-01-13" },
            { id: 12, name: "Sophie Clark", email: "sophie@example.com", role: "user", status: "inactive", joinDate: "2023-12-03", lastActive: "2024-01-12" }
        ];

        let filteredData = [...userData];
        let currentSort = { field: null, direction: 'asc' };
        let currentPage = 1;
        const itemsPerPage = 10;

        // Initialize the table
        function init() {
            renderTable();
            setupEventListeners();
        }

        // Setup event listeners
        function setupEventListeners() {
            // Search input
            document.getElementById('searchInput').addEventListener('input', handleSearch);
            
            // Filter selects
            document.getElementById('statusFilter').addEventListener('change', handleFilter);
            document.getElementById('roleFilter').addEventListener('change', handleFilter);
            
            // Sort headers
            document.querySelectorAll('.sortable').forEach(header => {
                header.addEventListener('click', () => handleSort(header.dataset.sort));
            });
        }

        // Handle search
        function handleSearch() {
            const searchTerm = document.getElementById('searchInput').value.toLowerCase();
            applyFilters(searchTerm);
        }

        // Handle filters
        function handleFilter() {
            const searchTerm = document.getElementById('searchInput').value.toLowerCase();
            applyFilters(searchTerm);
        }

        // Apply filters and search
        function applyFilters(searchTerm = '') {
            const statusFilter = document.getElementById('statusFilter').value;
            const roleFilter = document.getElementById('roleFilter').value;
            
            filteredData = userData.filter(user => {
                const matchesSearch = !searchTerm || 
                    user.name.toLowerCase().includes(searchTerm) ||
                    user.email.toLowerCase().includes(searchTerm) ||
                    user.role.toLowerCase().includes(searchTerm);
                
                const matchesStatus = !statusFilter || user.status === statusFilter;
                const matchesRole = !roleFilter || user.role === roleFilter;
                
                return matchesSearch && matchesStatus && matchesRole;
            });
            
            currentPage = 1;
            renderTable();
        }

        // Handle sorting
        function handleSort(field) {
            if (currentSort.field === field) {
                currentSort.direction = currentSort.direction === 'asc' ? 'desc' : 'asc';
            } else {
                currentSort.field = field;
                currentSort.direction = 'asc';
            }
            
            filteredData.sort((a, b) => {
                let aVal = a[field];
                let bVal = b[field];
                
                // Handle date sorting
                if (field === 'joinDate' || field === 'lastActive') {
                    aVal = new Date(aVal);
                    bVal = new Date(bVal);
                }
                
                if (aVal < bVal) return currentSort.direction === 'asc' ? -1 : 1;
                if (aVal > bVal) return currentSort.direction === 'asc' ? 1 : -1;
                return 0;
            });
            
            renderTable();
            updateSortHeaders();
        }

        // Update sort headers
        function updateSortHeaders() {
            document.querySelectorAll('.sortable').forEach(header => {
                header.classList.remove('sort-asc', 'sort-desc');
                if (header.dataset.sort === currentSort.field) {
                    header.classList.add(currentSort.direction === 'asc' ? 'sort-asc' : 'sort-desc');
                }
            });
        }

        // Render table
        function renderTable() {
            const tableBody = document.getElementById('tableBody');
            const noResults = document.getElementById('noResults');
            
            if (filteredData.length === 0) {
                tableBody.innerHTML = '';
                noResults.style.display = 'block';
                updateResultsInfo();
                updatePagination();
                return;
            }
            
            noResults.style.display = 'none';
            
            const startIndex = (currentPage - 1) * itemsPerPage;
            const endIndex = startIndex + itemsPerPage;
            const pageData = filteredData.slice(startIndex, endIndex);
            
            tableBody.innerHTML = pageData.map(user => \`
                <tr>
                    <td>
                        <div class="user-info">
                            <div class="avatar">\${user.name.charAt(0).toUpperCase()}</div>
                            <div class="user-details">
                                <div class="user-name">\${user.name}</div>
                                <div class="user-email">\${user.email}</div>
                            </div>
                        </div>
                    </td>
                    <td>\${user.role.charAt(0).toUpperCase() + user.role.slice(1)}</td>
                    <td>
                        <span class="status-badge status-\${user.status}">
                            \${user.status}
                        </span>
                    </td>
                    <td>\${formatDate(user.joinDate)}</td>
                    <td>\${formatDate(user.lastActive)}</td>
                    <td>
                        <button onclick="editUser(\${user.id})" style="margin-right: 0.5rem; padding: 0.25rem 0.5rem; border: 1px solid #e2e8f0; background: white; border-radius: 4px; cursor: pointer;">Edit</button>
                        <button onclick="deleteUser(\${user.id})" style="padding: 0.25rem 0.5rem; border: 1px solid #ef4444; background: #ef4444; color: white; border-radius: 4px; cursor: pointer;">Delete</button>
                    </td>
                </tr>
            \`).join('');
            
            updateResultsInfo();
            updatePagination();
        }

        // Format date
        function formatDate(dateString) {
            return new Date(dateString).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
            });
        }

        // Update results info
        function updateResultsInfo() {
            const resultsInfo = document.getElementById('resultsInfo');
            const total = filteredData.length;
            
            if (total === 0) {
                resultsInfo.textContent = 'No results found';
                return;
            }
            
            const startIndex = (currentPage - 1) * itemsPerPage + 1;
            const endIndex = Math.min(currentPage * itemsPerPage, total);
            
            resultsInfo.textContent = \`Showing \${startIndex}-\${endIndex} of \${total} results\`;
        }

        // Update pagination
        function updatePagination() {
            const paginationControls = document.getElementById('paginationControls');
            const paginationInfo = document.getElementById('paginationInfo');
            const totalPages = Math.ceil(filteredData.length / itemsPerPage);
            
            if (totalPages <= 1) {
                paginationControls.innerHTML = '';
                paginationInfo.textContent = '';
                return;
            }
            
            let paginationHTML = '';
            
            // Previous button
            paginationHTML += \`
                <button class="pagination-btn" \${currentPage === 1 ? 'disabled' : ''} onclick="changePage(\${currentPage - 1})">
                    Previous
                </button>
            \`;
            
            // Page numbers
            const startPage = Math.max(1, currentPage - 2);
            const endPage = Math.min(totalPages, currentPage + 2);
            
            for (let i = startPage; i <= endPage; i++) {
                paginationHTML += \`
                    <button class="pagination-btn \${i === currentPage ? 'active' : ''}" onclick="changePage(\${i})">
                        \${i}
                    </button>
                \`;
            }
            
            // Next button
            paginationHTML += \`
                <button class="pagination-btn" \${currentPage === totalPages ? 'disabled' : ''} onclick="changePage(\${currentPage + 1})">
                    Next
                </button>
            \`;
            
            paginationControls.innerHTML = paginationHTML;
            
            const startIndex = (currentPage - 1) * itemsPerPage + 1;
            const endIndex = Math.min(currentPage * itemsPerPage, filteredData.length);
            paginationInfo.textContent = \`Showing \${startIndex}-\${endIndex} of \${filteredData.length} results\`;
        }

        // Change page
        function changePage(page) {
            currentPage = page;
            renderTable();
        }

        // User actions (placeholder functions)
        function editUser(userId) {
            alert(\`Edit user with ID: \${userId}\`);
        }

        function deleteUser(userId) {
            if (confirm('Are you sure you want to delete this user?')) {
                alert(\`Delete user with ID: \${userId}\`);
                // In a real app, you would make an API call here
            }
        }

        // Initialize the table when the page loads
        document.addEventListener('DOMContentLoaded', init);
    </script>
</body>
</html>`,
    inputs: [],
  },
  {
    id: "modal-dialogs",
    name: "Modal Dialogs",
    description: "Collection of modal dialogs and popup components",
    category: "components",
    icon: MessageSquare,
    code: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Modal Dialogs</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            padding: 2rem;
        }
        
        .container {
            max-width: 1200px;
            margin: 0 auto;
        }
        
        h1 {
            text-align: center;
            color: white;
            margin-bottom: 3rem;
            font-size: 2.5rem;
        }
        
        .demo-section {
            background: white;
            border-radius: 12px;
            padding: 2rem;
            margin-bottom: 2rem;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        
        .section-title {
            font-size: 1.5rem;
            font-weight: 600;
            margin-bottom: 1.5rem;
            color: #1f2937;
        }
        
        .button-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 1rem;
        }
        
        .demo-btn {
            padding: 0.75rem 1.5rem;
            background: #3b82f6;
            color: white;
            border: none;
            border-radius: 8px;
            font-size: 0.875rem;
            font-weight: 500;
            cursor: pointer;
            transition: all 0.2s;
        }
        
        .demo-btn:hover {
            background: #2563eb;
            transform: translateY(-1px);
        }
        
        .demo-btn.success { background: #10b981; }
        .demo-btn.success:hover { background: #059669; }
        
        .demo-btn.warning { background: #f59e0b; }
        .demo-btn.warning:hover { background: #d97706; }
        
        .demo-btn.danger { background: #ef4444; }
        .demo-btn.danger:hover { background: #dc2626; }
        
        /* Modal Overlay */
        .modal-overlay {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.5);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 1000;
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
        }
        
        .modal-overlay.active {
            opacity: 1;
            visibility: visible;
        }
        
        /* Basic Modal */
        .modal {
            background: white;
            border-radius: 12px;
            padding: 2rem;
            max-width: 500px;
            width: 90%;
            max-height: 90vh;
            overflow-y: auto;
            transform: scale(0.7);
            transition: transform 0.3s ease;
            position: relative;
        }
        
        .modal-overlay.active .modal {
            transform: scale(1);
        }
        
        .modal-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 1.5rem;
            padding-bottom: 1rem;
            border-bottom: 1px solid #e5e7eb;
        }
        
        .modal-title {
            font-size: 1.25rem;
            font-weight: 600;
            color: #1f2937;
        }
        
        .modal-close {
            background: none;
            border: none;
            font-size: 1.5rem;
            cursor: pointer;
            color: #6b7280;
            padding: 0.25rem;
            border-radius: 4px;
            transition: all 0.2s;
        }
        
        .modal-close:hover {
            background: #f3f4f6;
            color: #374151;
        }
        
        .modal-content {
            color: #6b7280;
            line-height: 1.6;
            margin-bottom: 2rem;
        }
        
        .modal-actions {
            display: flex;
            gap: 0.75rem;
            justify-content: flex-end;
        }
        
        .modal-btn {
            padding: 0.5rem 1rem;
            border: none;
            border-radius: 6px;
            font-size: 0.875rem;
            font-weight: 500;
            cursor: pointer;
            transition: all 0.2s;
        }
        
        .modal-btn-primary {
            background: #3b82f6;
            color: white;
        }
        
        .modal-btn-primary:hover {
            background: #2563eb;
        }
        
        .modal-btn-secondary {
            background: #f3f4f6;
            color: #374151;
        }
        
        .modal-btn-secondary:hover {
            background: #e5e7eb;
        }
        
        .modal-btn-danger {
            background: #ef4444;
            color: white;
        }
        
        .modal-btn-danger:hover {
            background: #dc2626;
        }
        
        /* Confirmation Modal */
        .modal-confirmation {
            text-align: center;
            max-width: 400px;
        }
        
        .modal-confirmation .modal-icon {
            font-size: 3rem;
            margin-bottom: 1rem;
        }
        
        .modal-confirmation.warning .modal-icon {
            color: #f59e0b;
        }
        
        .modal-confirmation.danger .modal-icon {
            color: #ef4444;
        }
        
        .modal-confirmation.success .modal-icon {
            color: #10b981;
        }
        
        /* Form Modal */
        .modal-form {
            max-width: 600px;
        }
        
        .form-group {
            margin-bottom: 1.5rem;
        }
        
        .form-label {
            display: block;
            margin-bottom: 0.5rem;
            font-weight: 500;
            color: #374151;
        }
        
        .form-input,
        .form-textarea,
        .form-select {
            width: 100%;
            padding: 0.75rem;
            border: 2px solid #e5e7eb;
            border-radius: 6px;
            font-size: 0.875rem;
            transition: border-color 0.2s;
        }
        
        .form-input:focus,
        .form-textarea:focus,
        .form-select:focus {
            outline: none;
            border-color: #3b82f6;
        }
        
        .form-textarea {
            resize: vertical;
            min-height: 100px;
        }
        
        /* Image Modal */
        .modal-image {
            max-width: 90vw;
            max-height: 90vh;
            padding: 1rem;
        }
        
        .modal-image img {
            width: 100%;
            height: auto;
            border-radius: 8px;
        }
        
        /* Slide-in Modal */
        .modal-slide {
            position: fixed;
            top: 0;
            right: -100%;
            width: 400px;
            height: 100vh;
            background: white;
            box-shadow: -4px 0 15px rgba(0, 0, 0, 0.1);
            transition: right 0.3s ease;
            z-index: 1001;
            overflow-y: auto;
        }
        
        .modal-slide.active {
            right: 0;
        }
        
        @media (max-width: 768px) {
            .modal {
                width: 95%;
                padding: 1.5rem;
            }
            
            .modal-slide {
                width: 100%;
                right: -100%;
            }
            
            .modal-actions {
                flex-direction: column;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Modal Dialog Components</h1>
        
        <!-- Basic Modals -->
        <div class="demo-section">
            <h2 class="section-title">Basic Modals</h2>
            <div class="button-grid">
                <button class="demo-btn" onclick="openModal('basicModal')">Basic Modal</button>
                <button class="demo-btn success" onclick="openModal('successModal')">Success Modal</button>
                <button class="demo-btn warning" onclick="openModal('warningModal')">Warning Modal</button>
                <button class="demo-btn danger" onclick="openModal('dangerModal')">Danger Modal</button>
            </div>
        </div>
        
        <!-- Confirmation Modals -->
        <div class="demo-section">
            <h2 class="section-title">Confirmation Dialogs</h2>
            <div class="button-grid">
                <button class="demo-btn" onclick="openModal('confirmModal')">Confirm Action</button>
                <button class="demo-btn danger" onclick="openModal('deleteModal')">Delete Confirmation</button>
            </div>
        </div>
        
        <!-- Form Modal -->
        <div class="demo-section">
            <h2 class="section-title">Form Modal</h2>
            <div class="button-grid">
                <button class="demo-btn" onclick="openModal('formModal')">Contact Form</button>
                <button class="demo-btn" onclick="openModal('slideModal')">Slide-in Panel</button>
            </div>
        </div>
    </div>
    
    <!-- Basic Modal -->
    <div class="modal-overlay" id="basicModal">
        <div class="modal">
            <div class="modal-header">
                <h3 class="modal-title">Basic Modal</h3>
                <button class="modal-close" onclick="closeModal('basicModal')">&times;</button>
            </div>
            <div class="modal-content">
                <p>This is a basic modal dialog. It can contain any content you need to display to the user. The modal is centered on the screen and has a backdrop overlay.</p>
                <p>You can include text, images, forms, or any other HTML content inside the modal.</p>
            </div>
            <div class="modal-actions">
                <button class="modal-btn modal-btn-secondary" onclick="closeModal('basicModal')">Cancel</button>
                <button class="modal-btn modal-btn-primary" onclick="closeModal('basicModal')">OK</button>
            </div>
        </div>
    </div>
    
    <!-- Success Modal -->
    <div class="modal-overlay" id="successModal">
        <div class="modal modal-confirmation success">
            <div class="modal-icon">✅</div>
            <div class="modal-header">
                <h3 class="modal-title">Success!</h3>
                <button class="modal-close" onclick="closeModal('successModal')">&times;</button>
            </div>
            <div class="modal-content">
                <p>Your action has been completed successfully. All changes have been saved.</p>
            </div>
            <div class="modal-actions">
                <button class="modal-btn modal-btn-primary" onclick="closeModal('successModal')">Great!</button>
            </div>
        </div>
    </div>
    
    <!-- Warning Modal -->
    <div class="modal-overlay" id="warningModal">
        <div class="modal modal-confirmation warning">
            <div class="modal-icon">⚠️</div>
            <div class="modal-header">
                <h3 class="modal-title">Warning</h3>
                <button class="modal-close" onclick="closeModal('warningModal')">&times;</button>
            </div>
            <div class="modal-content">
                <p>Please review your input. Some fields may need your attention before proceeding.</p>
            </div>
            <div class="modal-actions">
                <button class="modal-btn modal-btn-secondary" onclick="closeModal('warningModal')">Review</button>
                <button class="modal-btn modal-btn-primary" onclick="closeModal('warningModal')">Continue</button>
            </div>
        </div>
    </div>
    
    <!-- Danger Modal -->
    <div class="modal-overlay" id="dangerModal">
        <div class="modal modal-confirmation danger">
            <div class="modal-icon">🚨</div>
            <div class="modal-header">
                <h3 class="modal-title">Error</h3>
                <button class="modal-close" onclick="closeModal('dangerModal')">&times;</button>
            </div>
            <div class="modal-content">
                <p>An error occurred while processing your request. Please try again or contact support if the problem persists.</p>
            </div>
            <div class="modal-actions">
                <button class="modal-btn modal-btn-danger" onclick="closeModal('dangerModal')">Close</button>
            </div>
        </div>
    </div>
    
    <!-- Confirmation Modal -->
    <div class="modal-overlay" id="confirmModal">
        <div class="modal modal-confirmation">
            <div class="modal-icon">❓</div>
            <div class="modal-header">
                <h3 class="modal-title">Confirm Action</h3>
                <button class="modal-close" onclick="closeModal('confirmModal')">&times;</button>
            </div>
            <div class="modal-content">
                <p>Are you sure you want to proceed with this action? This operation cannot be undone.</p>
            </div>
            <div class="modal-actions">
                <button class="modal-btn modal-btn-secondary" onclick="closeModal('confirmModal')">Cancel</button>
                <button class="modal-btn modal-btn-primary" onclick="handleConfirm()">Confirm</button>
            </div>
        </div>
    </div>
    
    <!-- Delete Confirmation Modal -->
    <div class="modal-overlay" id="deleteModal">
        <div class="modal modal-confirmation danger">
            <div class="modal-icon">🗑️</div>
            <div class="modal-header">
                <h3 class="modal-title">Delete Item</h3>
                <button class="modal-close" onclick="closeModal('deleteModal')">&times;</button>
            </div>
            <div class="modal-content">
                <p>Are you sure you want to delete this item? This action cannot be undone and all associated data will be permanently removed.</p>
            </div>
            <div class="modal-actions">
                <button class="modal-btn modal-btn-secondary" onclick="closeModal('deleteModal')">Cancel</button>
                <button class="modal-btn modal-btn-danger" onclick="handleDelete()">Delete</button>
            </div>
        </div>
    </div>
    
    <!-- Form Modal -->
    <div class="modal-overlay" id="formModal">
        <div class="modal modal-form">
            <div class="modal-header">
                <h3 class="modal-title">Contact Us</h3>
                <button class="modal-close" onclick="closeModal('formModal')">&times;</button>
            </div>
            <div class="modal-content">
                <form id="contactForm">
                    <div class="form-group">
                        <label class="form-label" for="name">Name</label>
                        <input type="text" class="form-input" id="name" required>
                    </div>
                    <div class="form-group">
                        <label class="form-label" for="email">Email</label>
                        <input type="email" class="form-input" id="email" required>
                    </div>
                    <div class="form-group">
                        <label class="form-label" for="subject">Subject</label>
                        <select class="form-select" id="subject">
                            <option value="">Select a subject</option>
                            <option value="general">General Inquiry</option>
                            <option value="support">Support</option>
                            <option value="feedback">Feedback</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label class="form-label" for="message">Message</label>
                        <textarea class="form-textarea" id="message" required></textarea>
                    </div>
                </form>
            </div>
            <div class="modal-actions">
                <button class="modal-btn modal-btn-secondary" onclick="closeModal('formModal')">Cancel</button>
                <button class="modal-btn modal-btn-primary" onclick="handleFormSubmit()">Send Message</button>
            </div>
        </div>
    </div>
    
    <!-- Slide-in Modal -->
    <div class="modal-overlay" id="slideModal">
        <div class="modal-slide">
            <div style="padding: 2rem;">
                <div class="modal-header">
                    <h3 class="modal-title">Settings Panel</h3>
                    <button class="modal-close" onclick="closeModal('slideModal')">&times;</button>
                </div>
                <div class="modal-content">
                    <div class="form-group">
                        <label class="form-label">Theme</label>
                        <select class="form-select">
                            <option>Light</option>
                            <option>Dark</option>
                            <option>Auto</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label class="form-label">Language</label>
                        <select class="form-select">
                            <option>English</option>
                            <option>Spanish</option>
                            <option>French</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label class="form-label">
                            <input type="checkbox" style="margin-right: 0.5rem;">
                            Enable notifications
                        </label>
                    </div>
                    <div class="form-group">
                        <label class="form-label">
                            <input type="checkbox" style="margin-right: 0.5rem;">
                            Auto-save changes
                        </label>
                    </div>
                </div>
                <div class="modal-actions">
                    <button class="modal-btn modal-btn-secondary" onclick="closeModal('slideModal')">Cancel</button>
                    <button class="modal-btn modal-btn-primary" onclick="closeModal('slideModal')">Save</button>
                </div>
            </div>
        </div>
    </div>

    <script>
        // Modal functions
        function openModal(modalId) {
            const modal = document.getElementById(modalId);
            if (modal) {
                modal.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        }

        function closeModal(modalId) {
            const modal = document.getElementById(modalId);
            if (modal) {
                modal.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        }

        // Close modal when clicking on overlay
        document.querySelectorAll('.modal-overlay').forEach(overlay => {
            overlay.addEventListener('click', (e) => {
                if (e.target === overlay) {
                    overlay.classList.remove('active');
                    document.body.style.overflow = 'auto';
                }
            });
        });

        // Close modal with Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                document.querySelectorAll('.modal-overlay.active').forEach(modal => {
                    modal.classList.remove('active');
                });
                document.body.style.overflow = 'auto';
            }
        });

        // Handle confirmation
        function handleConfirm() {
            alert('Action confirmed!');
            closeModal('confirmModal');
        }

        // Handle delete
        function handleDelete() {
            alert('Item deleted!');
            closeModal('deleteModal');
        }

        // Handle form submit
        function handleFormSubmit() {
            const form = document.getElementById('contactForm');
            if (form.checkValidity()) {
                alert('Message sent successfully!');
                form.reset();
                closeModal('formModal');
            } else {
                alert('Please fill in all required fields.');
            }
        }
    </script>
</body>
</html>`,
    inputs: [],
  },
  {
    id: "navigation-components",
    name: "Navigation Components",
    description:
      "Various navigation components including navbars, breadcrumbs, and tabs",
    category: "components",
    icon: Globe,
    code: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Navigation Components</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background: #f8fafc;
            min-height: 100vh;
        }
        
        .demo-container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 2rem;
        }
        
        .demo-section {
            background: white;
            border-radius: 12px;
            padding: 2rem;
            margin-bottom: 2rem;
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        }
        
        .section-title {
            font-size: 1.5rem;
            font-weight: 600;
            margin-bottom: 1.5rem;
            color: #1f2937;
        }
        
        /* Top Navigation Bar */
        .navbar {
            background: white;
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
            position: sticky;
            top: 0;
            z-index: 100;
        }
        
        .navbar-container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 1rem;
            display: flex;
            align-items: center;
            justify-content: space-between;
            height: 64px;
        }
        
        .navbar-brand {
            font-size: 1.25rem;
            font-weight: 700;
            color: #1f2937;
            text-decoration: none;
        }
        
        .navbar-nav {
            display: flex;
            list-style: none;
            gap: 2rem;
        }
        
        .navbar-nav a {
            color: #6b7280;
            text-decoration: none;
            font-weight: 500;
            transition: color 0.2s;
        }
        
        .navbar-nav a:hover,
        .navbar-nav a.active {
            color: #3b82f6;
        }
        
        .navbar-actions {
            display: flex;
            gap: 1rem;
            align-items: center;
        }
        
        .navbar-btn {
            padding: 0.5rem 1rem;
            border: none;
            border-radius: 6px;
            font-size: 0.875rem;
            font-weight: 500;
            cursor: pointer;
            transition: all 0.2s;
        }
        
        .navbar-btn-primary {
            background: #3b82f6;
            color: white;
        }
        
        .navbar-btn-primary:hover {
            background: #2563eb;
        }
        
        .navbar-btn-ghost {
            background: transparent;
            color: #6b7280;
        }
        
        .navbar-btn-ghost:hover {
            background: #f3f4f6;
        }
        
        .mobile-menu-btn {
            display: none;
            background: none;
            border: none;
            font-size: 1.5rem;
            cursor: pointer;
            color: #6b7280;
        }
        
        /* Breadcrumbs */
        .breadcrumb {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            padding: 1rem 0;
            font-size: 0.875rem;
        }
        
        .breadcrumb-item {
            color: #6b7280;
        }
        
        .breadcrumb-item a {
            color: #3b82f6;
            text-decoration: none;
        }
        
        .breadcrumb-item a:hover {
            text-decoration: underline;
        }
        
        .breadcrumb-item.active {
            color: #1f2937;
            font-weight: 500;
        }
        
        .breadcrumb-separator {
            color: #d1d5db;
        }
        
        /* Tabs */
        .tabs {
            border-bottom: 1px solid #e5e7eb;
        }
        
        .tab-list {
            display: flex;
            list-style: none;
            gap: 2rem;
        }
        
        .tab-item {
            padding: 1rem 0;
            border-bottom: 2px solid transparent;
            cursor: pointer;
            color: #6b7280;
            font-weight: 500;
            transition: all 0.2s;
        }
        
        .tab-item:hover {
            color: #374151;
        }
        
        .tab-item.active {
            color: #3b82f6;
            border-bottom-color: #3b82f6;
        }
        
        .tab-content {
            padding: 2rem 0;
        }
        
        .tab-pane {
            display: none;
        }
        
        .tab-pane.active {
            display: block;
        }
        
        /* Sidebar Navigation */
        .sidebar-nav {
            width: 250px;
            background: white;
            border-right: 1px solid #e5e7eb;
            height: 100vh;
            position: fixed;
            left: 0;
            top: 0;
            padding: 2rem 0;
            overflow-y: auto;
        }
        
        .sidebar-brand {
            padding: 0 1.5rem;
            margin-bottom: 2rem;
        }
        
        .sidebar-brand h3 {
            font-size: 1.25rem;
            font-weight: 700;
            color: #1f2937;
        }
        
        .sidebar-menu {
            list-style: none;
        }
        
        .sidebar-menu-item {
            margin-bottom: 0.25rem;
        }
        
        .sidebar-menu-link {
            display: flex;
            align-items: center;
            padding: 0.75rem 1.5rem;
            color: #6b7280;
            text-decoration: none;
            transition: all 0.2s;
        }
        
        .sidebar-menu-link:hover {
            background: #f3f4f6;
            color: #374151;
        }
        
        .sidebar-menu-link.active {
            background: #eff6ff;
            color: #3b82f6;
            border-right: 3px solid #3b82f6;
        }
        
        .sidebar-menu-icon {
            margin-right: 0.75rem;
            font-size: 1.125rem;
        }
        
        /* Pagination */
        .pagination {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            justify-content: center;
            margin: 2rem 0;
        }
        
        .pagination-btn {
            padding: 0.5rem 0.75rem;
            border: 1px solid #e5e7eb;
            background: white;
            color: #374151;
            border-radius: 6px;
            cursor: pointer;
            font-size: 0.875rem;
            transition: all 0.2s;
            min-width: 40px;
            text-align: center;
        }
        
        .pagination-btn:hover:not(:disabled) {
            background: #f3f4f6;
            border-color: #3b82f6;
        }
        
        .pagination-btn:disabled {
            opacity: 0.5;
            cursor: not-allowed;
        }
        
        .pagination-btn.active {
            background: #3b82f6;
            color: white;
            border-color: #3b82f6;
        }
        
        /* Steps/Stepper */
        .stepper {
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 2rem 0;
        }
        
        .step {
            display: flex;
            align-items: center;
            position: relative;
        }
        
        .step:not(:last-child)::after {
            content: '';
            width: 60px;
            height: 2px;
            background: #e5e7eb;
            margin: 0 1rem;
        }
        
        .step.completed:not(:last-child)::after {
            background: #10b981;
        }
        
        .step-circle {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            background: #e5e7eb;
            color: #6b7280;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: 600;
            font-size: 0.875rem;
        }
        
        .step.active .step-circle {
            background: #3b82f6;
            color: white;
        }
        
        .step.completed .step-circle {
            background: #10b981;
            color: white;
        }
        
        .step-label {
            position: absolute;
            top: 50px;
            left: 50%;
            transform: translateX(-50%);
            font-size: 0.75rem;
            color: #6b7280;
            white-space: nowrap;
        }
        
        .step.active .step-label {
            color: #3b82f6;
            font-weight: 500;
        }
        
        .step.completed .step-label {
            color: #10b981;
        }
        
        @media (max-width: 768px) {
            .navbar-nav {
                display: none;
            }
            
            .mobile-menu-btn {
                display: block;
            }
            
            .stepper {
                flex-direction: column;
                gap: 1rem;
            }
            
            .step:not(:last-child)::after {
                width: 2px;
                height: 40px;
                margin: 1rem 0;
            }
        }
    </style>
</head>
<body>
    <!-- Top Navigation -->
    <nav class="navbar">
        <div class="navbar-container">
            <a href="#" class="navbar-brand">Brand</a>
            <ul class="navbar-nav">
                <li><a href="#" class="active">Home</a></li>
                <li><a href="#">Products</a></li>
                <li><a href="#">Services</a></li>
                <li><a href="#">About</a></li>
                <li><a href="#">Contact</a></li>
            </ul>
            <div class="navbar-actions">
                <button class="navbar-btn navbar-btn-ghost">Login</button>
                <button class="navbar-btn navbar-btn-primary">Sign Up</button>
            </div>
            <button class="mobile-menu-btn">☰</button>
        </div>
    </nav>

    <div class="demo-container">
        <!-- Breadcrumbs -->
        <div class="demo-section">
            <h2 class="section-title">Breadcrumbs</h2>
            <nav class="breadcrumb">
                <div class="breadcrumb-item">
                    <a href="#">Home</a>
                </div>
                <div class="breadcrumb-separator">/</div>
                <div class="breadcrumb-item">
                    <a href="#">Products</a>
                </div>
                <div class="breadcrumb-separator">/</div>
                <div class="breadcrumb-item">
                    <a href="#">Electronics</a>
                </div>
                <div class="breadcrumb-separator">/</div>
                <div class="breadcrumb-item active">Smartphones</div>
            </nav>
        </div>

        <!-- Tabs -->
        <div class="demo-section">
            <h2 class="section-title">Tabs</h2>
            <div class="tabs">
                <ul class="tab-list">
                    <li class="tab-item active" onclick="switchTab(event, 'tab1')">Overview</li>
                    <li class="tab-item" onclick="switchTab(event, 'tab2')">Features</li>
                    <li class="tab-item" onclick="switchTab(event, 'tab3')">Pricing</li>
                    <li class="tab-item" onclick="switchTab(event, 'tab4')">Support</li>
                </ul>
            </div>
            <div class="tab-content">
                <div id="tab1" class="tab-pane active">
                    <h3>Overview</h3>
                    <p>This is the overview tab content. Here you can provide a general introduction to your product or service.</p>
                </div>
                <div id="tab2" class="tab-pane">
                    <h3>Features</h3>
                    <p>This tab contains detailed information about the features and capabilities of your product.</p>
                </div>
                <div id="tab3" class="tab-pane">
                    <h3>Pricing</h3>
                    <p>Here you can display pricing information, plans, and subscription options.</p>
                </div>
                <div id="tab4" class="tab-pane">
                    <h3>Support</h3>
                    <p>This section provides support information, documentation, and contact details.</p>
                </div>
            </div>
        </div>

        <!-- Pagination -->
        <div class="demo-section">
            <h2 class="section-title">Pagination</h2>
            <nav class="pagination">
                <button class="pagination-btn" disabled>Previous</button>
                <button class="pagination-btn active">1</button>
                <button class="pagination-btn">2</button>
                <button class="pagination-btn">3</button>
                <button class="pagination-btn">4</button>
                <button class="pagination-btn">5</button>
                <button class="pagination-btn">Next</button>
            </nav>
        </div>

        <!-- Stepper -->
        <div class="demo-section">
            <h2 class="section-title">Stepper</h2>
            <div class="stepper">
                <div class="step completed">
                    <div class="step-circle">✓</div>
                    <div class="step-label">Account</div>
                </div>
                <div class="step completed">
                    <div class="step-circle">✓</div>
                    <div class="step-label">Profile</div>
                </div>
                <div class="step active">
                    <div class="step-circle">3</div>
                    <div class="step-label">Payment</div>
                </div>
                <div class="step">
                    <div class="step-circle">4</div>
                    <div class="step-label">Confirmation</div>
                </div>
            </div>
        </div>
    </div>

    <script>
        // Tab switching functionality
        function switchTab(event, tabId) {
            // Remove active class from all tabs and panes
            document.querySelectorAll('.tab-item').forEach(tab => {
                tab.classList.remove('active');
            });
            document.querySelectorAll('.tab-pane').forEach(pane => {
                pane.classList.remove('active');
            });
            
            // Add active class to clicked tab and corresponding pane
            event.target.classList.add('active');
            document.getElementById(tabId).classList.add('active');
        }

        // Pagination functionality
        document.querySelectorAll('.pagination-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                if (!this.disabled && !this.textContent.includes('Previous') && !this.textContent.includes('Next')) {
                    document.querySelectorAll('.pagination-btn').forEach(b => b.classList.remove('active'));
                    this.classList.add('active');
                }
            });
        });
    </script>
</body>
</html>`,
    inputs: [],
  },

  // UI Components Category - Add to your tools array

  // UI Components Category - Add to your tools array

  // 1. Masonry Grid Component
  {
    id: "masonry-grid",
    name: "Masonry Grid Layout",
    description: "Create Pinterest-style masonry grid layouts",
    category: "components",
    icon: Grid,
    code: `// Masonry Grid Component
function generateMasonryGrid(items = 12, columns = 3) {
  const gridHTML = \`
    <div class="masonry-container">
      <div class="masonry-grid" id="masonryGrid">
        \${Array.from({ length: items }, (_, i) => \`
          <div class="masonry-item" style="height: \${Math.floor(Math.random() * 200) + 150}px;">
            <div class="item-content">
              <img src="https://picsum.photos/300/\${Math.floor(Math.random() * 300) + 200}?random=\${i}" 
                   alt="Item \${i + 1}" loading="lazy">
              <div class="item-overlay">
                <h3>Item \${i + 1}</h3>
                <p>Beautiful masonry item with random height</p>
              </div>
            </div>
          </div>
        \`).join('')}
      </div>
    </div>
    
    <style>
      .masonry-container {
        max-width: 1200px;
        margin: 0 auto;
        padding: 20px;
      }
      
      .masonry-grid {
        display: grid;
        grid-template-columns: repeat(\${columns}, 1fr);
        grid-gap: 20px;
        grid-auto-rows: 10px;
      }
      
      .masonry-item {
        position: relative;
        border-radius: 12px;
        overflow: hidden;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
        transition: transform 0.3s ease, box-shadow 0.3s ease;
        cursor: pointer;
      }
      
      .masonry-item:hover {
        transform: translateY(-5px);
        box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
      }
      
      .item-content {
        position: relative;
        height: 100%;
        overflow: hidden;
      }
      
      .item-content img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: transform 0.3s ease;
      }
      
      .masonry-item:hover img {
        transform: scale(1.05);
      }
      
      .item-overlay {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        background: linear-gradient(transparent, rgba(0, 0, 0, 0.7));
        color: white;
        padding: 20px;
        transform: translateY(100%);
        transition: transform 0.3s ease;
      }
      
      .masonry-item:hover .item-overlay {
        transform: translateY(0);
      }
      
      .item-overlay h3 {
        margin: 0 0 8px 0;
        font-size: 1.2rem;
        font-weight: 600;
      }
      
      .item-overlay p {
        margin: 0;
        opacity: 0.9;
        font-size: 0.9rem;
      }
      
      @media (max-width: 768px) {
        .masonry-grid {
          grid-template-columns: repeat(2, 1fr);
          grid-gap: 15px;
        }
      }
      
      @media (max-width: 480px) {
        .masonry-grid {
          grid-template-columns: 1fr;
        }
      }
    </style>
  \`;
  
  return gridHTML;
}

// Initialize masonry with dynamic heights
function initializeMasonry() {
  const items = document.querySelectorAll('.masonry-item');
  items.forEach(item => {
    const height = parseInt(item.style.height);
    const rowSpan = Math.ceil((height + 20) / 10);
    item.style.gridRowEnd = \`span \${rowSpan}\`;
  });
}

// Render the masonry grid
const masonryHTML = generateMasonryGrid(15, 3);
document.body.innerHTML = masonryHTML;

// Initialize masonry after DOM is updated
setTimeout(() => {
  initializeMasonry();
  console.log('Masonry grid rendered with responsive design');
}, 100);`,
    inputs: [
      {
        name: "items",
        type: "number",
        placeholder: "Number of items",
        defaultValue: 12,
      },
      {
        name: "columns",
        type: "number",
        placeholder: "Number of columns",
        defaultValue: 3,
      },
    ],
  },

  // 2. Photo Gallery Component
  {
    id: "photo-gallery",
    name: "Photo Gallery",
    description: "Modern photo gallery with lightbox modal",
    category: "components",
    icon: Image,
    code: `// Photo Gallery with Lightbox
function generatePhotoGallery(photoCount = 9) {
  const galleryHTML = \`
    <div class="gallery-container">
      <h2 class="gallery-title">Photo Gallery</h2>
      <div class="gallery-grid">
        \${Array.from({ length: photoCount }, (_, i) => \`
          <div class="gallery-item" onclick="openLightbox(\${i})">
            <img src="https://picsum.photos/400/300?random=\${i}" 
                 alt="Photo \${i + 1}" 
                 loading="lazy">
            <div class="gallery-overlay">
              <div class="overlay-icon">🔍</div>
            </div>
          </div>
        \`).join('')}
      </div>
      
      <!-- Lightbox Modal -->
      <div class="lightbox" id="lightbox" onclick="closeLightbox()">
        <div class="lightbox-content">
          <span class="lightbox-close">&times;</span>
          <img class="lightbox-image" id="lightboxImage" src="">
          <div class="lightbox-nav">
            <button class="nav-btn prev-btn" onclick="event.stopPropagation(); navigatePhoto(-1)">‹</button>
            <button class="nav-btn next-btn" onclick="event.stopPropagation(); navigatePhoto(1)">›</button>
          </div>
          <div class="lightbox-counter" id="lightboxCounter"></div>
        </div>
      </div>
    </div>
    
    <style>
      .gallery-container {
        max-width: 1200px;
        margin: 0 auto;
        padding: 20px;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      }
      
      .gallery-title {
        text-align: center;
        font-size: 2.5rem;
        margin-bottom: 2rem;
        color: #333;
        font-weight: 300;
      }
      
      .gallery-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 20px;
      }
      
      .gallery-item {
        position: relative;
        aspect-ratio: 4/3;
        overflow: hidden;
        border-radius: 12px;
        cursor: pointer;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
        transition: all 0.3s ease;
      }
      
      .gallery-item:hover {
        transform: translateY(-5px);
        box-shadow: 0 8px 30px rgba(0, 0, 0, 0.2);
      }
      
      .gallery-item img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: transform 0.3s ease;
      }
      
      .gallery-item:hover img {
        transform: scale(1.1);
      }
      
      .gallery-overlay {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.5);
        display: flex;
        align-items: center;
        justify-content: center;
        opacity: 0;
        transition: opacity 0.3s ease;
      }
      
      .gallery-item:hover .gallery-overlay {
        opacity: 1;
      }
      
      .overlay-icon {
        font-size: 2rem;
        color: white;
        text-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
      }
      
      .lightbox {
        display: none;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.9);
        z-index: 1000;
        justify-content: center;
        align-items: center;
      }
      
      .lightbox-content {
        position: relative;
        max-width: 90%;
        max-height: 90%;
        text-align: center;
      }
      
      .lightbox-image {
        max-width: 100%;
        max-height: 80vh;
        border-radius: 8px;
        box-shadow: 0 10px 50px rgba(0, 0, 0, 0.5);
      }
      
      .lightbox-close {
        position: absolute;
        top: -40px;
        right: -40px;
        color: white;
        font-size: 2rem;
        cursor: pointer;
        background: rgba(255, 255, 255, 0.2);
        width: 40px;
        height: 40px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: background 0.3s ease;
      }
      
      .lightbox-close:hover {
        background: rgba(255, 255, 255, 0.3);
      }
      
      .lightbox-nav {
        position: absolute;
        top: 50%;
        width: 100%;
        display: flex;
        justify-content: space-between;
        transform: translateY(-50%);
        pointer-events: none;
      }
      
      .nav-btn {
        background: rgba(255, 255, 255, 0.2);
        border: none;
        color: white;
        font-size: 2rem;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        cursor: pointer;
        pointer-events: all;
        transition: background 0.3s ease;
      }
      
      .nav-btn:hover {
        background: rgba(255, 255, 255, 0.3);
      }
      
      .lightbox-counter {
        color: white;
        margin-top: 20px;
        font-size: 1.1rem;
      }
      
      @media (max-width: 768px) {
        .gallery-grid {
          grid-template-columns: repeat(2, 1fr);
          gap: 15px;
        }
        
        .gallery-title {
          font-size: 2rem;
        }
      }
    </style>
  \`;
  
  return galleryHTML;
}

let currentPhotoIndex = 0;
const totalPhotos = 9;

function openLightbox(index) {
  currentPhotoIndex = index;
  const lightbox = document.getElementById('lightbox');
  const lightboxImage = document.getElementById('lightboxImage');
  const counter = document.getElementById('lightboxCounter');
  
  lightboxImage.src = \`https://picsum.photos/800/600?random=\${index}\`;
  counter.textContent = \`\${index + 1} / \${totalPhotos}\`;
  lightbox.style.display = 'flex';
  
  // Prevent body scroll
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  document.getElementById('lightbox').style.display = 'none';
  document.body.style.overflow = 'auto';
}

function navigatePhoto(direction) {
  currentPhotoIndex += direction;
  
  if (currentPhotoIndex < 0) currentPhotoIndex = totalPhotos - 1;
  if (currentPhotoIndex >= totalPhotos) currentPhotoIndex = 0;
  
  const lightboxImage = document.getElementById('lightboxImage');
  const counter = document.getElementById('lightboxCounter');
  
  lightboxImage.src = \`https://picsum.photos/800/600?random=\${currentPhotoIndex}\`;
  counter.textContent = \`\${currentPhotoIndex + 1} / \${totalPhotos}\`;
}

// Keyboard navigation
document.addEventListener('keydown', function(e) {
  const lightbox = document.getElementById('lightbox');
  if (lightbox && lightbox.style.display === 'flex') {
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') navigatePhoto(-1);
    if (e.key === 'ArrowRight') navigatePhoto(1);
  }
});

// Render the gallery
document.body.innerHTML = generatePhotoGallery(9);

console.log('Photo gallery with lightbox functionality rendered');`,
    inputs: [
      {
        name: "photoCount",
        type: "number",
        placeholder: "Number of photos",
        defaultValue: 9,
      },
    ],
  },

  // 3. FIXED - Random Image Generator (for Regular category)
  {
    id: "random-image-generator",
    name: "Random Image Generator",
    description: "Generate placeholder images from multiple sources",
    category: "components",
    icon: Image,
    code: `// Random Image Generator (Fixed)
function generateRandomImage(width = 400, height = 300, category = 'nature') {
  const services = {
    picsum: \`https://picsum.photos/\${width}/\${height}?random=\${Date.now()}\`,
    unsplash: \`https://source.unsplash.com/\${width}x\${height}/?\${category}&\${Date.now()}\`,
    placeholder: \`https://via.placeholder.com/\${width}x\${height}/4A90E2/FFFFFF?text=\${width}x\${height}\`,
    dummyimage: \`https://dummyimage.com/\${width}x\${height}/4A90E2/FFFFFF&text=\${width}x\${height}\`,
    placeholdercom: \`https://placeholder.com/\${width}x\${height}\`,
    loremflickr: \`https://loremflickr.com/\${width}/\${height}/\${category}?\${Date.now()}\`
  };
  
  return services;
}

function generateImagePreview(urls, selectedService = 'picsum') {
  const imageUrl = urls[selectedService] || urls.picsum;
  
  const previewHTML = \`
    <div class="image-generator-preview">
      <div class="preview-container">
        <img 
          src="\${imageUrl}" 
          alt="Generated Image" 
          class="preview-image"
          onload="this.style.opacity=1"
          onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjBmMGYwIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk5OTk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkZhaWxlZCB0byBMb2FkPC90ZXh0Pjwvc3ZnPic"
        >
        <div class="image-info">
          <p><strong>Service:</strong> \${selectedService}</p>
          <p><strong>URL:</strong> <a href="\${imageUrl}" target="_blank">\${imageUrl}</a></p>
        </div>
      </div>
      <div class="url-list">
        <h3>Available Image Sources:</h3>
        \${Object.entries(urls).map(([service, url]) => \`
          <div class="url-item">
            <strong>\${service}:</strong>
            <input type="text" value="\${url}" readonly onclick="this.select()">
            <button onclick="copyToClipboard('\${url}')">Copy</button>
          </div>
        \`).join('')}
      </div>
    </div>
    
    <style>
      .image-generator-preview {
        max-width: 800px;
        margin: 0 auto;
        padding: 20px;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      }
      
      .preview-container {
        text-align: center;
        margin-bottom: 30px;
        padding: 20px;
        border: 2px dashed #ddd;
        border-radius: 12px;
        background: #fafafa;
      }
      
      .preview-image {
        max-width: 100%;
        height: auto;
        border-radius: 8px;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
        opacity: 0;
        transition: opacity 0.3s ease;
      }
      
      .image-info {
        margin-top: 15px;
        text-align: left;
        background: white;
        padding: 15px;
        border-radius: 8px;
        border: 1px solid #e0e0e0;
      }
      
      .image-info p {
        margin: 8px 0;
        word-break: break-all;
      }
      
      .image-info a {
        color: #4A90E2;
        text-decoration: none;
      }
      
      .image-info a:hover {
        text-decoration: underline;
      }
      
      .url-list {
        background: white;
        padding: 20px;
        border-radius: 12px;
        border: 1px solid #e0e0e0;
      }
      
      .url-list h3 {
        margin-top: 0;
        color: #333;
      }
      
      .url-item {
        display: flex;
        align-items: center;
        gap: 10px;
        margin-bottom: 15px;
        padding: 10px;
        background: #f8f9fa;
        border-radius: 6px;
      }
      
      .url-item strong {
        min-width: 100px;
        color: #555;
        text-transform: capitalize;
      }
      
      .url-item input {
        flex: 1;
        padding: 8px;
        border: 1px solid #ddd;
        border-radius: 4px;
        background: white;
        font-family: monospace;
        font-size: 12px;
      }
      
      .url-item button {
        padding: 8px 16px;
        background: #4A90E2;
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        transition: background 0.2s ease;
      }
      
      .url-item button:hover {
        background: #357ABD;
      }
    </style>
  \`;
  
  return previewHTML;
}

function copyToClipboard(text) {
  navigator.clipboard.writeText(text).then(() => {
    // Simple feedback - you could enhance this
    const button = event.target;
    const originalText = button.textContent;
    button.textContent = 'Copied!';
    button.style.background = '#28a745';
    setTimeout(() => {
      button.textContent = originalText;
      button.style.background = '#4A90E2';
    }, 2000);
  }).catch(err => {
    console.error('Failed to copy:', err);
    // Fallback for older browsers
    const textArea = document.createElement('textarea');
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);
  });
}

// Example usage
const width = 400;
const height = 300;
const category = 'technology';

const imageUrls = generateRandomImage(width, height, category);
const previewHTML = generateImagePreview(imageUrls, 'picsum');

document.body.innerHTML = previewHTML;

console.log('Random image generator with multiple sources:');
console.log('Available services:', Object.keys(imageUrls));
console.log('All URLs generated successfully!');`,
    inputs: [
      {
        name: "width",
        type: "number",
        placeholder: "Image width",
        defaultValue: 400,
      },
      {
        name: "height",
        type: "number",
        placeholder: "Image height",
        defaultValue: 300,
      },
      {
        name: "category",
        type: "select",
        options: [
          "nature",
          "technology",
          "city",
          "food",
          "people",
          "abstract",
          "animals",
        ],
        defaultValue: "nature",
      },
    ],
  },

  {
    id: "copy-to-clipboard",
    name: "Copy to Clipboard",
    description: "Copy any text to clipboard with a single click",
    category: "regular",
    icon: Copy, // make sure you import Copy from your icon library
    code: `// Copy to Clipboard Function
function copyToClipboard(text) {
  if (navigator.clipboard && window.isSecureContext) {
    // Modern method
    navigator.clipboard.writeText(text).then(() => {
      console.log('Copied to clipboard:', text);
    }).catch(err => {
      console.error('Failed to copy:', err);
    });
  } else {
    // Fallback method
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    try {
      document.execCommand('copy');
      console.log('Copied to clipboard (fallback):', text);
    } catch (err) {
      console.error('Fallback: Could not copy text:', err);
    }
    document.body.removeChild(textarea);
  }
}

// Example usage
copyToClipboard('Hello World!');`,
    inputs: [
      {
        name: "text",
        type: "text",
        placeholder: "Enter text to copy",
        defaultValue: "Hello World!",
      },
    ],
  },
  {
    id: "detect-os",
    name: "Detect Operating System",
    description: "Detect the operating system of the user's device",
    category: "system",
    icon: Terminal, // import an OS/computer-related icon
    code: `// Detect Operating System
function getOS() {
  const userAgent = window.navigator.userAgent;
  const platform = window.navigator.platform;
  const macosPlatforms = ['Macintosh', 'MacIntel', 'MacPPC', 'Mac68K'];
  const windowsPlatforms = ['Win32', 'Win64', 'Windows', 'WinCE'];
  const iosPlatforms = ['iPhone', 'iPad', 'iPod'];

  if (macosPlatforms.includes(platform)) {
    return 'macOS';
  } else if (iosPlatforms.includes(platform)) {
    return 'iOS';
  } else if (windowsPlatforms.includes(platform)) {
    return 'Windows';
  } else if (/Android/.test(userAgent)) {
    return 'Android';
  } else if (/Linux/.test(platform)) {
    return 'Linux';
  } else {
    return 'Unknown';
  }
}

// Example usage
const os = getOS();
console.log('Operating System:', os);`,
    inputs: [],
  },

  {
    id: "check-internet",
    name: "Check Internet Status",
    description: "Detect if the user is online or offline",
    category: "system",
    icon: Wifi,
    code: `// Internet Status
window.addEventListener("online", () => console.log("Back online ✅"));
window.addEventListener("offline", () => console.log("You are offline ❌"));

console.log("Currently online?", navigator.onLine);`,
    inputs: [],
  },
  {
    id: "uuid-generator",
    name: "UUID Generator",
    description: "Generate a random UUID (v4)",
    category: "regular",
    icon: Key,
    code: `// UUID v4 Generator
function generateUUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

console.log('Generated UUID:', generateUUID());`,
    inputs: [],
  },
  {
    id: "get-public-ip",
    name: "Get Public IP",
    description: "Fetch your public IP address using an API",
    category: "system",
    icon: Globe,
    code: `// Get Public IP
async function getPublicIP() {
  const res = await fetch("https://api.ipify.org?format=json");
  const data = await res.json();
  console.log("Public IP:", data.ip);
  return data.ip;
}

getPublicIP();`,
    inputs: [],
  },

  {
    id: "check-port",
    name: "Check Port Usage",
    description: "Check if a given port is in use (Node.js)",
    category: "system",
    icon: Port,
    code: `// Check if port is in use
const net = require("net");

function checkPort(port, host = "127.0.0.1") {
  return new Promise((resolve) => {
    const server = net.createServer()
      .once("error", () => resolve(false))
      .once("listening", () => {
        server.close();
        resolve(true);
      })
      .listen(port, host);
  });
}

// Example
checkPort(3000).then(inUse => console.log("Port 3000 in use?", inUse));`,
    inputs: [
      {
        name: "port",
        type: "number",
        placeholder: "Port number",
        defaultValue: 3000,
      },
    ],
  },

  {
    id: "detect-browser",
    name: "Detect Browser",
    description: "Get the user's browser name and version",
    category: "system",
    icon: Browser,
    code: `// Detect Browser
function getBrowser() {
  const userAgent = navigator.userAgent;
  if (/Chrome/.test(userAgent) && !/Edge/.test(userAgent)) return "Chrome";
  if (/Safari/.test(userAgent) && !/Chrome/.test(userAgent)) return "Safari";
  if (/Firefox/.test(userAgent)) return "Firefox";
  if (/Edg/.test(userAgent)) return "Edge";
  if (/MSIE|Trident/.test(userAgent)) return "Internet Explorer";
  return "Unknown";
}

console.log("Browser:", getBrowser());`,
    inputs: [],
  },

  {
    id: "get-screen-size",
    name: "Get Screen Size",
    description: "Get the screen width and height of the device",
    category: "system",
    icon: Monitor,
    code: `// Get Screen Size
function getScreenSize() {
  return {
    width: window.innerWidth,
    height: window.innerHeight
  };
}

console.log("Screen Size:", getScreenSize());`,
    inputs: [],
  },
  {
    id: "random-number-generator",
    name: "Random Number Generator",
    description: "Generate a random number with customizable length",
    category: "regular",
    icon: Hash, // use any number-related icon
    code: `// Random Number Generator
function generateRandomNumber(length = 4) {
  const min = Math.pow(10, length - 1);
  const max = Math.pow(10, length) - 1;
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Example usage
console.log("Random (4 digits):", generateRandomNumber()); // default 4
console.log("Random (6 digits):", generateRandomNumber(6));`,
    inputs: [
      {
        name: "length",
        type: "number",
        placeholder: "Number length",
        defaultValue: 4,
      },
    ],
  },
  {
    id: "reverse-string",
    name: "Reverse String",
    description: "Reverse any given string",
    category: "regular",
    icon: Undo,
    code: `// Reverse String
function reverseString(str) {
  return str.split("").reverse().join("");
}

// Example
console.log("Reversed:", reverseString("Hello"));`,
    inputs: [
      {
        name: "text",
        type: "text",
        placeholder: "Enter text",
        defaultValue: "Hello",
      },
    ],
  },
  {
    id: "capitalize-first",
    name: "Capitalize First Letter",
    description: "Capitalize the first letter of a string",
    category: "regular",
    icon: Type,
    code: `// Capitalize First Letter
function capitalizeFirstLetter(str) {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// Example
console.log("Capitalized:", capitalizeFirstLetter("hello world"));`,
    inputs: [
      {
        name: "text",
        type: "text",
        placeholder: "Enter text",
        defaultValue: "hello world",
      },
    ],
  },
  {
    id: "current-datetime",
    name: "Current Date & Time",
    description: "Get the current date and time in readable format",
    category: "regular",
    icon: CalenderClock,
    code: `// Current Date & Time
function getCurrentDateTime() {
  const now = new Date();
  return now.toLocaleString();
}

// Example
console.log("Now:", getCurrentDateTime());`,
    inputs: [],
  },

  {
    id: "shuffle-array",
    name: "Shuffle Array",
    description: "Randomly shuffle elements of an array",
    category: "regular",
    icon: Dice,
    code: `// Shuffle Array
function shuffleArray(arr) {
  return arr
    .map(value => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
}

// Example
console.log("Shuffled:", shuffleArray([1, 2, 3, 4, 5]));`,
    inputs: [
      {
        name: "array",
        type: "text",
        placeholder: "Comma separated values",
        defaultValue: "1,2,3,4,5",
      },
    ],
  },

  {
    id: "word-counter",
    name: "Word Counter",
    description: "Count the number of words in a string",
    category: "regular",
    icon: FileText,
    code: `// Word Counter
function countWords(str) {
  if (!str.trim()) return 0;
  return str.trim().split(/\\s+/).length;
}

// Example
console.log("Word count:", countWords("Hello world, this is JS!"));`,
    inputs: [
      {
        name: "text",
        type: "text",
        placeholder: "Enter text",
        defaultValue: "Hello world, this is JS!",
      },
    ],
  },
  {
    id: "palindrome-checker",
    name: "Palindrome Checker",
    description: "Check if a string is a palindrome",
    category: "regular",
    icon: Loop,
    code: `// Palindrome Checker
function isPalindrome(str) {
  const cleaned = str.toLowerCase().replace(/[^a-z0-9]/g, "");
  return cleaned === cleaned.split("").reverse().join("");
}

// Example
console.log("Is Palindrome?", isPalindrome("Racecar"));`,
    inputs: [
      {
        name: "text",
        type: "text",
        placeholder: "Enter text",
        defaultValue: "Racecar",
      },
    ],
  },

  {
    id: "digital-clock",
    name: "Digital Clock",
    description: "Display a real-time updating digital clock",
    category: "regular",
    icon: Clock,
    code: `// Digital Clock
function startClock() {
  function updateClock() {
    const now = new Date();
    const time = now.toLocaleTimeString();
    console.log("Current Time:", time);
  }
  updateClock();
  return setInterval(updateClock, 1000); // update every second
}

// Example usage
const clock = startClock();

// To stop the clock:
// clearInterval(clock);`,
    inputs: [],
  },

  {
    id: "random-emoji",
    name: "Random Emoji Picker",
    description: "Get a random emoji each time",
    category: "fun",
    icon: Emoji,
    code: `// Random Emoji Picker
function getRandomEmoji() {
  const emojis = ["😀", "😂", "😍", "🤔", "😎", "🥳", "🔥", "🌈", "⚡", "🎉"];
  return emojis[Math.floor(Math.random() * emojis.length)];
}

// Example
console.log("Emoji:", getRandomEmoji());`,
    inputs: [],
  },

  {
    id: "coin-flip",
    name: "Coin Flip",
    description: "Simulate flipping a coin (Heads or Tails)",
    category: "fun",
    icon: Coin,
    code: `// Coin Flip
function flipCoin() {
  const result = Math.random() < 0.5 ? "Heads" : "Tails";
  console.log("Coin Flip Result:", result);
  return result;
}

// Example usage
flipCoin();`,
    inputs: [],
  },

  {
    id: "dice-roller",
    name: "Dice Roller",
    description: "Roll a dice with customizable number of sides",
    category: "fun",
    icon: Dice,
    code: `// Dice Roller
function rollDice(sides = 6) {
  const result = Math.floor(Math.random() * sides) + 1;
  console.log(\`Rolled a \${sides}-sided dice: \${result}\`);
  return result;
}

// Example usage
rollDice();      // default 6-sided dice
rollDice(20);    // 20-sided dice`,
    inputs: [
      {
        name: "sides",
        type: "number",
        placeholder: "Number of sides",
        defaultValue: 6,
      },
    ],
  },

  {
    id: "confetti-generator",
    name: "Confetti Generator",
    description: "Simple confetti effect on the page",
    category: "fun",
    icon: Confetti,
    code: `// Confetti Generator
function launchConfetti() {
  const colors = ["#ff0a54","#ff477e","#ff7096","#ff85a1","#fbb1b9","#f9bec7","#f7cad0"];
  for (let i = 0; i < 100; i++) {
    const confetti = document.createElement("div");
    confetti.style.position = "fixed";
    confetti.style.width = "8px";
    confetti.style.height = "8px";
    confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    confetti.style.left = Math.random() * window.innerWidth + "px";
    confetti.style.top = Math.random() * window.innerHeight + "px";
    confetti.style.opacity = Math.random();
    confetti.style.borderRadius = "50%";
    confetti.style.pointerEvents = "none";
    document.body.appendChild(confetti);
    setTimeout(() => confetti.remove(), 3000);
  }
}

// Example usage
launchConfetti();`,
    inputs: [],
  },
];

export const categories = {
  regular: "Regular Utils",
  creative: "Creative Tools",
  developer: "Developer Tools",
  regex: "Regex",
  system: "System Utils",
  fun: "Fun & Quirky",
  forms: "Forms",
  components: "UI Components",
};
