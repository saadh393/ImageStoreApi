# ImageStore API

A robust Express.js API for managing and serving images with on-the-fly processing capabilities. The API allows you to fetch random images, get specific images by ID, and add new image URLs to the collection.

## Features

- 🖼️ Image processing with Sharp
- 🔄 Real-time cache updates using Chokidar
- ⚡ Dynamic image quality adjustment
- 📁 File-based JSON storage
- 🚀 Express.js REST API

## API Routes

### Property Images

Base URL: `/property`

| Method | Endpoint  | Description        | Query Params         |
| ------ | --------- | ------------------ | -------------------- |
| GET    | `/random` | Get a random image | `q`: Quality (0-100) |
| GET    | `/:id`    | Get image by ID    | `q`: Quality (0-100) |
| POST   | `/`       | Add new image URL  | -                    |

### Request Body for POST

```json
{
  "imageUrl": "https://example.com/image.jpg"
}
```

## Deployment

### Deploy on Vercel

1. Fork this repository
2. Create a new project on Vercel
3. Connect your forked repository
4. Set the following build configuration:
   - Build Command: `npm install`
   - Output Directory: `.`
   - Install Command: `npm install`
   - Framework Preset: `Node.js`

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/saadh393/ImageStoreApi)

### Environment Variables

No environment variables are required for basic setup. The default port is 3000, but Vercel will handle this automatically.

## Contributing

Contributions are welcome! Here's how you can help:

### Areas for Contribution

- 🐛 Bug fixes
- ✨ New features
- 📝 Documentation improvements
- 🧪 Adding tests
- 🎨 UI/UX improvements

### Steps to Contribute

1. Fork the repository
2. Create a new branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Create a Pull Request

Please make sure to update tests as appropriate and follow the existing coding style.

### Development Setup

```sh
git clone https://github.com/yourusername/imagestore.git
cd imagestore
npm install
npm start
```
