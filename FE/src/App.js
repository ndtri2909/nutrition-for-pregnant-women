import { Route, Routes } from 'react-router-dom';
import { settingRoutes } from './routers/route';
import { useEffect } from 'react';
import "./assets/styles/main.scss"
import Header from './components/global/Header';
import Footer from './components/global/Footer';
import { productCartState } from './recoil/atom/productState';
import { useSetRecoilState } from 'recoil';
import { ToastContainer } from 'react-toastify';
import HomepageLayout from './components/Layout/HompageLayout';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const setProductCarts = useSetRecoilState(productCartState);
  const data = JSON.parse(localStorage.getItem('cartProducts'));
  useEffect(() => {
    const products = data?.length ? data : [];
    setProductCarts(products)
  }, [])

  return (
    <>
      <Header />
      <Routes>
        {settingRoutes.map((route, index) => {
          const Page = route.compoent
          const Layout = HomepageLayout
          return <Route key={index} path={route.path} element={
            <Layout>
              <Page />
            </Layout>} />
        })}
      </Routes>
      <Footer />
      <ToastContainer
        position="bottom-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
}

export default App;
