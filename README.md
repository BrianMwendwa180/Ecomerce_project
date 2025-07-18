# 🛒 Modern E-Commerce App with PayPal & M-Pesa

A complete, modern e-commerce application built with React, TypeScript, and Tailwind CSS, featuring integrated PayPal and M-Pesa payment systems.

![E-Commerce App](https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=1200)

## 🌟 Features

### Core E-Commerce Functionality
- **Product Catalog** - Browse products with high-quality images and detailed information
- **Advanced Search & Filtering** - Search by name, filter by category, price range, and sort options
- **Shopping Cart** - Add, remove, and manage product quantities with real-time updates
- **User Authentication** - Secure login and registration system
- **Responsive Design** - Optimized for mobile, tablet, and desktop devices

### Payment Integration
- **PayPal Integration** - Secure payments using PayPal's official React SDK
- **M-Pesa Integration** - STK Push simulation for Kenyan mobile payments
- **Order Management** - Track payment status and order history
- **Multi-Currency Support** - USD and KES currency handling

### Modern UI/UX
- **Beautiful Design** - Apple-level aesthetics with attention to detail
- **Smooth Animations** - Micro-interactions and hover effects
- **Toast Notifications** - Real-time feedback for user actions
- **Mobile-First Approach** - Optimized for mobile commerce

## 🚀 Live Demo

**Live Site:** [https://illustrious-sunburst-9893cf.netlify.app](https://illustrious-sunburst-9893cf.netlify.app)

## 🛠️ Tech Stack

- **Frontend:** React 18, TypeScript
- **Styling:** Tailwind CSS
- **Build Tool:** Vite
- **State Management:** React Context API
- **Payment Processing:** PayPal SDK, M-Pesa API simulation
- **Icons:** Lucide React
- **Notifications:** React Hot Toast
- **Deployment:** Netlify

## 📦 Installation

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn package manager

### Setup Instructions

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/your-ecommerce-app.git
   cd your-ecommerce-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

## 🔧 Configuration

### PayPal Setup
1. Create a PayPal Developer account at [developer.paypal.com](https://developer.paypal.com)
2. Create a new application to get your Client ID
3. Replace the test client ID in `src/components/PayPalPayment.tsx`:
   ```typescript
   const initialOptions = {
     clientId: "YOUR_PAYPAL_CLIENT_ID", // Replace with your actual client ID
     currency: "USD",
     intent: "capture",
   };
   ```

### M-Pesa Setup (Production)
For production M-Pesa integration:
1. Register with Safaricom's Daraja API
2. Get your Consumer Key and Consumer Secret
3. Implement the backend API endpoints for:
   - STK Push initiation
   - Payment confirmation callbacks
   - Transaction status queries

## 📱 Usage

### Shopping Experience
1. **Browse Products** - View the product catalog with filtering options
2. **Search & Filter** - Use the search bar and filter sidebar to find specific products
3. **Add to Cart** - Click "Add to Cart" on any product
4. **Manage Cart** - View cart, update quantities, or remove items
5. **Checkout** - Proceed to checkout and choose payment method

### Payment Methods

#### PayPal Payment
- Select PayPal as payment method
- Complete payment through PayPal's secure interface
- Receive confirmation upon successful payment

#### M-Pesa Payment
- Select M-Pesa as payment method
- Enter your M-Pesa registered phone number
- Receive STK Push notification on your phone
- Enter M-Pesa PIN to complete payment

## 🏗️ Project Structure

```
src/
├── components/          # React components
│   ├── Header.tsx      # Navigation header
│   ├── ProductCard.tsx # Individual product display
│   ├── ProductGrid.tsx # Product listing grid
│   ├── Cart.tsx        # Shopping cart sidebar
│   ├── Checkout.tsx    # Checkout process
│   ├── PayPalPayment.tsx # PayPal integration
│   ├── MpesaPayment.tsx  # M-Pesa integration
│   ├── AuthModal.tsx   # Authentication modal
│   └── FilterSidebar.tsx # Product filtering
├── context/            # React Context providers
│   ├── CartContext.tsx # Cart state management
│   └── AuthContext.tsx # Authentication state
├── data/              # Static data
│   └── products.ts    # Product catalog
├── types/             # TypeScript type definitions
│   └── index.ts       # Application types
├── App.tsx            # Main application component
├── main.tsx           # Application entry point
└── index.css          # Global styles
```

## 🎨 Customization

### Adding New Products
Edit `src/data/products.ts` to add new products:
```typescript
{
  id: 'unique-id',
  name: 'Product Name',
  price: 99.99,
  image: 'https://example.com/image.jpg',
  description: 'Product description',
  category: 'Category Name',
  stock: 50,
  rating: 4.5,
  reviews: 100
}
```

### Styling
- Modify Tailwind classes in components for styling changes
- Update `tailwind.config.js` for theme customization
- Add custom CSS in `src/index.css` if needed

### Payment Integration
- Update PayPal client ID for production use
- Implement backend APIs for M-Pesa integration
- Add additional payment methods as needed

## 🚀 Deployment

### Netlify (Recommended)
1. Build the project: `npm run build`
2. Deploy the `dist` folder to Netlify
3. Configure environment variables if needed

### Other Platforms
- **Vercel:** Connect your GitHub repository
- **GitHub Pages:** Use `gh-pages` package
- **Firebase Hosting:** Use Firebase CLI

## 🔒 Security Considerations

- Never expose API keys in frontend code
- Implement proper backend validation for payments
- Use HTTPS in production
- Validate all user inputs
- Implement rate limiting for API calls

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Commit your changes: `git commit -m 'Add new feature'`
4. Push to the branch: `git push origin feature/new-feature`
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **PayPal** for their comprehensive payment SDK
- **Safaricom** for M-Pesa API documentation
- **Pexels** for high-quality product images
- **Tailwind CSS** for the utility-first CSS framework
- **React Team** for the amazing framework

## 📞 Support

If you have any questions or need help with setup:

1. Check the [Issues](https://github.com/yourusername/your-ecommerce-app/issues) page
2. Create a new issue with detailed information
3. Contact the maintainer

## 🔄 Changelog

### v1.0.0 (Current)
- Initial release with core e-commerce functionality
- PayPal payment integration
- M-Pesa payment simulation
- Responsive design implementation
- User authentication system
- Product catalog with filtering

---

**Built with ❤️ using React, TypeScript, and modern web technologies**