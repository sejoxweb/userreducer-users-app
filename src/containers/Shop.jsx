import { Avatar, Button, Card, List, Select, Space, Typography } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
const { Title } = Typography;
const { Meta } = Card;
const Shop = () => {
  const [shopItems, setShopItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [cartItems, setCartItems] = useState([]);
  const [isShowCart, setIsShowCart] = useState(false);
  const [eachItemAddedCount, setEachItemAddedCount] = useState({});

  console.log("selectedCategory>>>", selectedCategory);
  console.log("categories>>>", categories);
  console.log("shopItems>>>>", shopItems);
  console.log("cartItems", cartItems);

  console.log("eachItemAddedCount>>>", eachItemAddedCount);

  useEffect(() => {
    const fetchData = async function () {
      const response = await axios.get("http://localhost:3004/shopitems");
      setShopItems(response.data);
      //console.log(response.data);
      const categoriesList = response.data.map((item) => {
        return {
          label: item.category,
          value: item.category,
        };
      });
      categoriesList.push({
        label: "All",
        value: "All",
      });
      setCategories(categoriesList);
    };

    fetchData();
  }, []);

  const handleChange = (value) => {
    setSelectedCategory(value);
  };

  const handlePlus = (id) => {
    setEachItemAddedCount((prev) => {
      const temp = { ...prev };
      temp[id] = temp[id] ? temp[id] + 1 : 1;
      return temp;
    });
  };

  const handleRemove = (id) => {
    if (id) {
      setCartItems((prev) => prev.filter((item) => item.id !== id));
    } else {
      setCartItems([]);
    }

    setEachItemAddedCount((prev) => {
      const temp = { ...prev };
      delete temp[id];
      return temp;
    });
  };

  const handleMinus = (id) => {
    if (eachItemAddedCount[id] === 1) {
      handleRemove(id);
    } else {
      setEachItemAddedCount((prev) => {
        return { ...prev, [id]: prev[id] ? prev[id] - 1 : 0 };
      });
    }
  };

  const handleAddToCart = (item) => {
    if (!eachItemAddedCount[item.id]) {
      setCartItems((prev) => [...prev, item]);
      handlePlus(item.id);
    }
  };

  const filteredShopItems =
    selectedCategory === "All"
      ? shopItems
      : shopItems.filter((el) => el.category === selectedCategory);

  return (
    <div>
      <Space wrap>
        {categories.length > 0 && (
          <Select
            defaultValue="All"
            style={{
              width: 120,
            }}
            onChange={handleChange}
            options={categories}
          />
        )}
        <Button onClick={() => setIsShowCart((prev) => !prev)}>
          View Cart ({cartItems.length})
        </Button>
      </Space>
      {isShowCart ? (
        <div className="w-full">
          {cartItems.length === 0 ? (
            "No items added to cart"
          ) : (
            <>
              {cartItems.length > 1 && (
                <Button onClick={() => handleRemove()}>remove all</Button>
              )}
              {cartItems.map((item, i) => (
                <div key={i} className="flex flex-row space-x-4 m-4 ">
                  <Avatar src={item.product_image} />
                  <div>{item.name}</div>
                  <div>
                    <Button onClick={() => handlePlus(item.id)}>+</Button>{" "}
                    {eachItemAddedCount[item.id]}
                    <Button onClick={() => handleMinus(item.id)}>-</Button>
                  </div>
                  <div>
                    {item.price}
                    <Button onClick={() => handleRemove(item.id)}>
                      remove
                    </Button>
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
      ) : (
        <ul className="list-none">
          {filteredShopItems.length > 0 &&
            filteredShopItems.map((el, i) => {
              return (
                <li key={i}>
                  <Title level={3}>{el.category}</Title>
                  <List
                    grid={{
                      gutter: 16,
                      column: 4,
                    }}
                    dataSource={el.products}
                    renderItem={(item) => (
                      <List.Item>
                        <Card
                          cover={<img alt="example" src={item.product_image} />}
                          actions={[
                            <span key="price"> ${item.price}</span>,
                            <Button
                              key="addtocart"
                              className="mr-4"
                              onClick={() => handleAddToCart(item)}
                            >
                              Add to Cart
                            </Button>,
                          ]}
                        >
                          <Meta
                            title={item.name}
                            description={item.description}
                          />
                        </Card>
                      </List.Item>
                    )}
                  />
                </li>
              );
            })}
        </ul>
      )}
      <div></div>
    </div>
  );
};

export default Shop;
