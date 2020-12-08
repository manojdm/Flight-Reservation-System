import Footer from "./Components/Footer";
import Header from "./Components/Header";
import Index from "./screens/index";
import FlightDetails from './screens/FlightDetails'
import PassengersScreen  from './screens/PassengersScreen'
import {BrowserRouter as Router , Route} from 'react-router-dom'
import Login from "./screens/Login";
import Register from "./screens/Register";
import BillingAddress from './screens/BillingAddress';
import PaymentMethod from './screens/PaymentMethod'
import PlaceOrder from './screens/PlaceOrder'
import OrderScreen from './screens/OrderScreen'
import Profile from "./screens/Profile";
import Admin from "./screens/Admin";
import AllFlights from './screens/AllFlights'
import AllOrders from './screens/AllOrders'
import AllUsers from './screens/AllUsers'
import UserEdit from "./screens/UserEdit";
import FlightEdit from "./screens/FlightEdit";
import CreateFlight from "./screens/CreateFlight";

function App() {
  return (
    <>
  <Router>  
    <Header />
        <Route path='/admin/flight/add/new' component={CreateFlight} exact/>
        <Route path='/admin/flight/:id' component={FlightEdit} exact />
        <Route path='/admin/users' exact component={AllUsers} />  
        <Route path='/admin/user/:id' component={UserEdit} />
        <Route path='/admin/flights' exact component={AllFlights} />  
        <Route path='/admin/orders' exact component={AllOrders} />    
        <Route path='/admin' exact component={Admin} />
        <Route path='/user/profile' exact component={Profile} />
        <Route path='/order/:id' component={OrderScreen} />
        <Route path='/placeorder' component={PlaceOrder} />
        <Route path='/payment' component={PaymentMethod} />
        <Route path='/billing' component={BillingAddress} />
        <Route path='/register' component={Register} />
        <Route path='/login' component={Login} />
        <Route path='/' exact component={Index} />
        <Route path='/flight/:id' exact component={FlightDetails} />
        <Route path='/flight/:id/proceed' component={PassengersScreen} />
      </Router>
    <Footer />
    </>
  );
}

export default App;
