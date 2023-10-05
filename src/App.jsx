/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './shared/Header/Header';
import BookList from './components/Book/BookList';
import Profile from './components/Profile/Profile';
import Signin from './pages/Auth/Signin';
import Signup from './pages/Auth/Signup';
import EmailVerification from './components/Verification/EmailVerification';
import BookDetails from './components/Book/BookDetails';
import Cart from './components/Cart/Cart';
import PasswordReset from './pages/Auth/PasswordReset';
import { CartItemCountProvider } from './context/CartItemCountContext';
import CheckoutForm from './pages/Payment/CheckoutForm';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import PaymentSuccess from './pages/Payment/PaymentSuccess';
import Favorite from './components/Favorite/Favorite';
import MyAccount from './components/Profile/MyAccount';
import PageNotFound from './shared/404/PageNotFound';

// Load Stripe API key
const stripe_key = import.meta.env.VITE_STRIPE_API_KEY;
const stripePromise = loadStripe(`${stripe_key}`);

function App() {
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const apiBaseDomain = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    setIsLoading(true);
    fetch(`${apiBaseDomain}/books/list`)
      .then((response) => response.json())
      .then((bookInfo) => {
        setBooks(bookInfo.data.books);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching book data:', error);
        setIsLoading(false);
      });
  }, []);

  return (
    <CartItemCountProvider>
      <div>
        <Header setSearchResults={setSearchResults} />

        <div className='container mx-auto p-4'>
          <Routes>
            {/* Route related to book searching and browsing */}
            <Route
              path='/'
              element={
                <BookList
                  books={searchResults.length > 0 ? searchResults : books}
                  isLoading={isLoading}
                />
              }
            />
            <Route path='/book/:productId' element={<BookDetails />} />

            {/* Route related to authentication */}
            <Route path='/signup' element={<Signup />} />
            <Route path='/signin' element={<Signin />} />
            <Route
              path='/verify-email/:token'
              element={<EmailVerification />}
            />

            {/* Route related to user profile */}
            <Route path='/profile' element={<Profile />} />
            <Route path='/wishlists' element={<Favorite />} />
            <Route path='/order' element={<MyAccount />} />
            <Route path='/cart' element={<Cart />} />
            <Route path='/forget-password' element={<PasswordReset />} />

            {/* Route for placing an order */}
            <Route path='/place-order' element={<CheckoutFormWrapper />} />
            <Route path='/payment-success' element={<PaymentSuccess />} />

            {/* Route for handle page not found */}
            <Route path='*' element={<PageNotFound />} />
          </Routes>
        </div>
      </div>
    </CartItemCountProvider>
  );
}

// Wrapper component for the route that includes Stripe elements
function CheckoutFormWrapper() {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm />
    </Elements>
  );
}

export default App;
