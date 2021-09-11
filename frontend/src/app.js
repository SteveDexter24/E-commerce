import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import Header from './components/header'
import Footer from './components/footer'
import NewArrivalsScreen from './screens/newArrivalsScreen'
import ProductScreen from './screens/ProductScreen/productScreen'
import LoginScreen from './screens/loginScreen'
import CartScreen from './screens/cartScreen'
import RegisterScreen from './screens/registerScreen'

// Home Screen
import HomeScreen from './screens/homeScreen'

// Search Screen
import SearchScreen from './screens/searchScreen'

// Navbar menu related screens
import MenScreen from './screens/menScreen'
import WomenScreen from './screens/womenScreen'
import KidsScreen from './screens/kidsScreen'
import DiscountedProductScreen from './screens/discountedProductScreen'

// User Profile related screens
import EditProfile from './screens/UpdateUserInfo/editProfile'
import ChangePassword from './screens/UpdateUserInfo/changePassword'
import Settings from './screens/UpdateUserInfo/settings'
import SettingsScreen from './screens/settingsScreen'

// Order related screens
import OrderHistoryScreen from './screens/orderHistoryScreen'
import ShippingScreen from './screens/shippingScreen'
import PaymentScreen from './screens/paymentScreen'
import PlaceOrderScreen from './screens/placeOrderScreen'
import OrderScreen from './screens/orderScreen'

// Admin Actions
import UserListScreen from './screens/Admin/userListScreen'
import EditUserScreen from './screens/Admin/userEditScreen'
import ProductListScreen from './screens/Admin/productListScreen'
import ProductEditScreen from './screens/Admin/productEditScreen'
import CreateProduct from './screens/Admin/newProductScreen'
import OrderListScreen from './screens/Admin/orderListScreen'

import './index.css'

const App = () => {
  return (
    <Router>
      <Header />
      <main className="py-3">
        <Container>
          {/*User authentication routes*/}
          <Route path="/login" exact component={LoginScreen} />
          <Route path="/register" exact component={RegisterScreen} />
          <Route path="/profile" exact component={EditProfile} />
          <Route
            path="/profile/change-password"
            exact
            component={ChangePassword}
          />
          <Route path="/profile/settings" exact component={Settings} />

          {/* Home Page */}
          <Route path="/" exact component={HomeScreen} />

          {/*Men's product*/}
          <Route path="/men" exact component={MenScreen} />
          <Route path="/men/:pageNumber" exact component={MenScreen} />
          <Route
            path="/men/:sort/:category/:color/:priceFrom/:priceTo/:pageNumber"
            exact
            component={MenScreen}
          />
          {/*Woman's product*/}
          <Route path="/women" exact component={WomenScreen} />
          <Route path="/women/:pageNumber" exact component={WomenScreen} />
          <Route
            path="/women/:sort/:category/:color/:priceFrom/:priceTo/:pageNumber"
            exact
            component={WomenScreen}
          />
          {/*Kids's Products*/}
          <Route path="/kids" exact component={KidsScreen} />
          <Route path="/kids/:pageNumber" exact component={KidsScreen} />
          <Route
            path="/kids/:sort/:category/:color/:priceFrom/:priceTo/:pageNumber"
            exact
            component={KidsScreen}
          />

          {/*Discounted Products*/}
          <Route path="/discount" exact component={DiscountedProductScreen} />
          <Route
            path="/discount/:pageNumber"
            exact
            component={DiscountedProductScreen}
          />
          <Route
            path="/discount/:sort/:category/:color/:priceFrom/:priceTo/:pageNumber"
            exact
            component={DiscountedProductScreen}
          />

          {/*Order paths*/}
          <Route path="/orderHistory" exact component={OrderHistoryScreen} />
          <Route path="/product/:id/:menu?" exact component={ProductScreen} />
          <Route path="/cart/:id?" exact component={CartScreen} />
          <Route path="/shipping" exact component={ShippingScreen} />
          <Route path="/payment" exact component={PaymentScreen} />
          <Route path="/placeorder" exact component={PlaceOrderScreen} />
          <Route path="/order/:id" exact component={OrderScreen} />
          <Route path="/settings" exact component={SettingsScreen} />
          <Route path="/new-arrivals" exact component={NewArrivalsScreen} />
          <Route path="/search" exact component={SearchScreen} />
          <Route path="/search/:keyword" exact component={NewArrivalsScreen} />
          <Route path="/page/:pageNumber" exact component={NewArrivalsScreen} />
          <Route
            path="/search/:keyword/page/:pageNumber"
            exact
            component={NewArrivalsScreen}
          />
          {/*Admin actions */}
          <Route path="/admin/userlist" exact component={UserListScreen} />
          <Route
            path="/admin/userlist/search/:keyword"
            exact
            component={UserListScreen}
          />
          <Route
            path="/admin/userlist/search/:keyword/page/:pageNumber"
            exact
            component={UserListScreen}
          />
          <Route
            path="/admin/userlist/search/page/:pageNumber"
            exact
            component={UserListScreen}
          />

          <Route path="/admin/user/:id/edit" exact component={EditUserScreen} />

          {/* Admin Product List Screen  */}
          <Route
            path="/admin/productlist"
            exact
            component={ProductListScreen}
          />
          <Route
            path="/admin/productlist/search/:keyword"
            exact
            component={ProductListScreen}
          />
          <Route
            path="/admin/productlist/search/:keyword/page/:pageNumber"
            exact
            component={ProductListScreen}
          />
          <Route
            path="/admin/productlist/page/:pageNumber"
            exact
            component={ProductListScreen}
          />

          {/* Admin Product List Edit  */}

          <Route
            path="/admin/product/:id/edit"
            exact
            component={ProductEditScreen}
          />

          <Route path="/admin/create-product" exact component={CreateProduct} />
          {/*Admin Order List Screen */}
          <Route path="/admin/orderlist" exact component={OrderListScreen} />
          <Route
            path="/admin/orderlist/search/:keyword"
            exact
            component={OrderListScreen}
          />
          <Route
            path="/admin/orderlist/search/:keyword/page/:pageNumber"
            exact
            component={OrderListScreen}
          />
          <Route
            path="/admin/orderlist/page/:pageNumber"
            exact
            component={OrderListScreen}
          />
        </Container>
      </main>
      <Footer />
    </Router>
  )
}

export default App
