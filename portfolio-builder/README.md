# Portfolio Builder

A modern, responsive React application that allows users to create a personalized portfolio by uploading a profile picture, adding their name, and customizing the background color.

## Features

- **Profile Picture Upload**: Drag & drop or click to upload images with preview
- **Name Input**: Real-time name editing with live preview
- **Background Color Customization**: Predefined color palette + custom color picker
- **Live Preview**: Real-time preview of the portfolio card
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Modern UI/UX**: Clean, minimalistic design with smooth animations

## Tech Stack

- **React 18** with TypeScript
- **Custom CSS** with utility classes for styling
- **Context API** with useReducer for state management
- **FileReader API** for image handling
- **Custom Hooks** for reusable logic

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- pnpm (recommended) or npm

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd portfolio-builder
```

1. Install dependencies:

```bash
# Using pnpm (recommended)
pnpm install

# Or using npm
npm install

# Or using yarn
yarn install
```

1. Start the development server:

```bash
# Using pnpm
pnpm start

# Or using npm
npm start

# Or using yarn
yarn start
```

1. Open [http://localhost:3005](http://localhost:3005) to view it in the browser.

## Project Structure

```text
src/
├── components/
│   ├── ProfilePictureUpload.tsx    # Image upload with drag & drop
│   ├── NameInput.tsx               # Name input field
│   ├── BackgroundColorPicker.tsx   # Color selection component
│   └── PortfolioPreview.tsx        # Live preview component
├── context/
│   └── PortfolioContext.tsx        # State management with Context API
├── App.tsx                         # Main application component
├── index.tsx                       # Application entry point
└── index.css                       # Global styles with custom CSS utilities
```

## Key Features Explained

### 1. Profile Picture Upload

- Supports drag & drop functionality
- File validation (image types only, 5MB limit)
- Real-time preview with loading states
- Remove functionality with confirmation

### 2. State Management

- Uses React Context API with useReducer
- Centralized state for all portfolio data
- Type-safe with TypeScript interfaces
- Optimized re-renders with proper state structure

### 3. Background Color Customization

- 10 predefined color options
- Custom color picker with hex input
- Real-time preview updates
- Accessible color selection

### 4. Live Preview

- Real-time updates as user makes changes
- Responsive design that works on all screen sizes
- Status indicators for completion tracking
- Beautiful card-based layout

## Available Scripts

- `pnpm start` - Runs the app in development mode
- `pnpm build` - Builds the app for production
- `pnpm test` - Launches the test runner
- `pnpm eject` - Ejects from Create React App (one-way operation)

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is open source and available under the [MIT License](LICENSE).

## Demo

The application provides a complete portfolio building experience with:

- Intuitive drag & drop image upload
- Real-time name editing
- Beautiful color customization
- Live preview of changes
- Modern, accessible design

Perfect for showcasing React skills, TypeScript usage, and modern UI/UX design principles!
