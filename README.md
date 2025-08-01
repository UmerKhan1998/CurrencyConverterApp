# Currency Converter - TA Solutions Technical Test

A modern, responsive currency converter application built with React, Next.js, and TypeScript. Features real-time exchange rates, conversion history, and a mobile-first design.

## 🚀 Features

- **Real-time Currency Conversion**: Uses FreeCurrencyAPI for up-to-date exchange rates
- **Mobile-First Design**: Optimized for mobile devices with responsive layout
- **Conversion History**: Persistent storage of conversion history (up to 20 records)
- **Dynamic Currency Support**: Automatically fetches all supported currencies from the API
- **TypeScript**: Full type safety for both frontend and backend
- **Loading States**: Visual feedback during API requests
- **Currency Swap**: Quick swap between from/to currencies
- **Secure API**: API key handled securely on the server side

## 🛠️ Tech Stack

### Frontend
- **React 19** with functional components and hooks
- **Next.js 15** with App Router
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **shadcn/ui** for UI components
- **Lucide React** for icons

### Backend
- **Next.js API Routes** with TypeScript
- **FreeCurrencyAPI** for exchange rates
- **Server-side API key management**

## 📱 Screenshots

The application features a clean, modern interface with:
- Gradient background design
- Card-based layout
- Responsive grid system
- Mobile-optimized controls
- Persistent conversion history

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn package manager

### Installation

1. **Clone the repository**
   \`\`\`bash
   git clone <repository-url>
   cd currency-converter
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   npm install
   # or
   yarn install
   \`\`\`

3. **Run the development server**
   \`\`\`bash
   npm run dev
   # or
   yarn dev
   \`\`\`

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🔧 Configuration

The application uses the FreeCurrencyAPI with the provided API key. The key is securely stored in the server-side API routes and not exposed to the client.

### API Endpoints

- \`GET /api/currencies\` - Fetches all available currencies
- \`POST /api/convert\` - Performs currency conversion

## 📖 Usage

1. **Select Currencies**: Choose source and target currencies from the dropdowns
2. **Enter Amount**: Input the amount you want to convert
3. **Convert**: Click the "Convert" button to get real-time exchange rates
4. **View History**: All conversions are automatically saved and displayed below
5. **Swap Currencies**: Use the swap button to quickly reverse the conversion direction

## 🏗️ Project Structure

\`\`\`
currency-converter/
├── app/
│   ├── api/
│   │   ├── currencies/
│   │   │   └── route.ts          # Currencies API endpoint
│   │   └── convert/
│   │       └── route.ts          # Conversion API endpoint
│   ├── globals.css               # Global styles
│   ├── layout.tsx               # Root layout
│   └── page.tsx                 # Main application component
├── components/
│   └── ui/                      # shadcn/ui components
├── lib/
│   └── utils.ts                 # Utility functions
├── package.json
├── tailwind.config.ts
├── tsconfig.json
└── README.md
\`\`\`

## 🎨 Design Features

- **Mobile-First**: Responsive design that works perfectly on all devices
- **Modern UI**: Clean, professional interface with gradient backgrounds
- **Accessibility**: Proper ARIA labels and semantic HTML
- **Loading States**: Visual feedback during API calls
- **Error Handling**: Graceful error handling and user feedback

## 🔒 Security

- API key is stored server-side only
- Input validation on both client and server
- Secure API endpoints with proper error handling
- No sensitive data exposed to the client

## 📊 API Integration

The application integrates with FreeCurrencyAPI:

- **Base URL**: https://api.freecurrencyapi.com/v1
- **Endpoints Used**:
  - \`/currencies\` - Get all available currencies
  - \`/latest\` - Get latest exchange rates
- **Authentication**: API key authentication

## 💾 Data Persistence

Conversion history is stored in the browser's localStorage:
- Automatically saves each conversion
- Persists across browser sessions
- Maintains up to 20 recent conversions
- Includes timestamp and conversion details

## 🚀 Deployment

### Vercel (Recommended)

1. **Push to GitHub**
   \`\`\`bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   \`\`\`

2. **Deploy to Vercel**
   - Connect your GitHub repository to Vercel
   - Vercel will automatically detect Next.js and deploy
   - No additional configuration needed

### Other Platforms

The application can be deployed to any platform that supports Next.js:
- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## 🧪 Testing

To test the application:

1. **Currency Loading**: Verify all currencies load in dropdowns
2. **Conversion**: Test conversion between different currency pairs
3. **History**: Confirm conversions are saved and displayed
4. **Mobile**: Test responsive design on various screen sizes
5. **Error Handling**: Test with invalid inputs

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (\`git checkout -b feature/amazing-feature\`)
3. Commit your changes (\`git commit -m 'Add amazing feature'\`)
4. Push to the branch (\`git push origin feature/amazing-feature\`)
5. Open a Pull Request

## 📝 Requirements Fulfilled

✅ **React with TypeScript**: Functional components with hooks  
✅ **Currency API Integration**: FreeCurrencyAPI with backend proxy  
✅ **Dynamic Currency Support**: All supported currencies loaded dynamically  
✅ **Mobile-First Design**: Responsive, mobile-optimized interface  
✅ **Loading States**: Visual feedback for all API requests  
✅ **Conversion History**: Persistent storage with timestamps  
✅ **Backend API**: Node.js/TypeScript API routes  
✅ **Secure API Key**: Server-side API key management  
✅ **Bootstrap Alternative**: Modern UI with Tailwind CSS and shadcn/ui  

## 📄 License

This project is created for the TA Solutions technical test.

## 👨‍💻 Author

Created as part of the TA Solutions React/Node.js technical assessment.

---

**Live Demo**: [Deploy to Vercel](https://currency-converter-app-sigma-one.vercel.app/)  
**API Documentation**: [FreeCurrencyAPI Docs](https://freecurrencyapi.com/docs/)
