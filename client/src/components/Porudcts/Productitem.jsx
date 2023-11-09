
import { addProduct } from "../../redux/cartSlice";
import { useDispatch } from "react-redux";
import { message } from "antd";
const ProductItem = ({ item }) => {

  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(addProduct({ ...item, quantity: 1 }));
        message.success("Ürün Sepete Eklendi.")
  };


  return (
    
    <div
      className="product-item border hover:shadow-lg cursor-pointer transition-all select-none"
      style={{backgroundColor:"white",borderRadius:"10px"}}
      onClick={handleClick}

    >
      <div className="product-img">
        <img
          src={item.img}
          alt=""
          className="h-28 object-cover w-full "
          style={{objectFit:"contain"}}
        />
      </div>
      <div className="product-info flex flex-col p-3">
        <span className="font-bold"><strong>{item.title}</strong></span>
        <span style={{color:"red"}}><strong>{item.price}₺ </strong></span>
      </div>
    </div>
  );
};
export default ProductItem;