import { useEffect, useState } from "react";
import CartTotals from "../components/Cart/CartTotals.jsx";
import Categories from "../components/Categories/Categories.jsx";
import Header from "../components/Header/Header.jsx";

import ProductItem from "../components/Porudcts/Productitem.jsx";
import { PlusOutlined, EditOutlined } from "@ant-design/icons";
import Add from "../components/Porudcts/Add.jsx";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const [search, setSearch] = useState("");
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const getCategories = async () => {
      try {
        const res = await fetch(
          process.env.REACT_APP_SERVER_URL + "/api/categories/get-all"
        );
        const data = await res.json();
        data &&
          setCategories(
            data.map((item) => {
              return { ...item, value: item.title };
            })
          );
      } catch (error) {
        console.log(error);
      }
    };
    getCategories();
  }, []);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await fetch(process.env.REACT_APP_SERVER_URL + "/api/products/get-all");
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.log(error);
      }
    };

    getProducts();
  }, []);
  const backgroundStyle = {
    backgroundImage: `url('images/a.jpg')`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
  };
  return (
    <div style={backgroundStyle}>
      <Header setSearch={setSearch} />
      <div
        className="home px-3 py-1 flex md:flex-row flex-col justify-between gap-15 md:pb-0   h-screen"
        style={{ paddingBottom:"20px" }}
      >
        <div
          className="categories overflow-auto max-h-[calc(100vh_-_100px)] md:pb-15"
          style={{
            background: "#e9e9e9",
            borderTopLeftRadius: "10px",
            borderBottomLeftRadius: "10px",
          }}
        >
          <Categories
            categories={categories}
            setCategories={setCategories}
            setFiltered={setFiltered}
            products={products}
          />
        </div>
        <div
          className="cart-wrapper min-w-[400px]   max-h-[calc(100vh_-_112px)]"
          style={{ backgroundColor: "white",borderRight:"1px solid #E1E3E8"}}
        >
          <CartTotals />
        </div>
        <div
          className="products flex-[8]  max-h-[calc(100vh_-_112px)] overflow-y-auto pb-10 min-h-[500px]"
          style={{ background: "transparent" }}
        >
          <div className="products-wrapper grid grid-cols-card gap-4 " style={{paddingLeft:"40px", paddingTop:"40px"
        }}> 
            {filtered
              .filter((product) => product.title.toLowerCase().includes(search))
              .map((item) => (
                <ProductItem item={item} key={item._id} />
              ))}
            <div
              className="product-item border hover:shadow-lg cursor-pointer transition-all select-none bg-purple-800 flex justify-center items-center hover:opacity-90 min-h-[180px]"
              onClick={() => setIsAddModalOpen(true)}
              style={{backgroundColor:" #EC5562"}}
             
            >
              <PlusOutlined className="text-white md:text-2xl" />
            </div>
            <div
              className="product-item  hover:shadow-lg cursor-pointer transition-all select-none  flex justify-center items-center hover:opacity-90 min-h-[180px]"
              onClick={() => navigate("/products")}
              style={{backgroundColor:"#D60400"}}
            >
              <EditOutlined className="text-white md:text-2xl" />
            </div>
            <Add
              isAddModalOpen={isAddModalOpen}
              setIsAddModalOpen={setIsAddModalOpen}
              categories={categories}
              products={products}
              setProducts={setProducts}
            />
          </div>
        </div>
  
      </div>
    </div>
  );
};

export default HomePage;
