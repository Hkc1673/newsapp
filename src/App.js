import "./App.css";
import React, { useLayoutEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { apiRequest } from "./store/actions";
import { Input, DatePicker, Card, Menu, Dropdown, Button } from "antd";
import "antd/dist/antd.css";

const { Meta } = Card;

function App() {
  const { articles } = useSelector((state) => state);
  const dispatch = useDispatch();

  const today = new Date().toISOString().slice(0, 10);
  console.log("newDAte::", today);

  const [query, setQuery] = useState("tesla");
  const [from, setFrom] = useState(today);
  const [sortBy, setSortBy] = useState("publishedAt");

  useLayoutEffect(() => {
    getTable();
  }, []);

  const getTable = () => {
    dispatch(apiRequest(query, from, sortBy));
  };

  function onChangeText(e) {
    setQuery(e.target.value);
  }

  function onChangeDate(value, dateString) {
    setFrom(dateString);
  }

  function onSubmit(e) {
    e.preventDefault();
    if (query && from) {
      getTable();
    } else {
      alert("Enter search text and date");
    }
  }
  function handleMenuClick(e) {
    setSortBy(e.item.props.children[1]);
  }

  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="1">publishedAt</Menu.Item>
      <Menu.Item key="2">popularity</Menu.Item>
      <Menu.Item key="3">relevancy</Menu.Item>
    </Menu>
  );

  console.log("articles:", articles);
  return (
    <div className="App">
      <h1>NEWS APP</h1>
      <div className="site-input-group-wrapper">
        <form onSubmit={onSubmit} className="form">
          <div>
            <Input.Group compact>
              <Input
                style={{ width: "50%" }}
                defaultValue="Enter Search Text....."
                onChange={onChangeText}
                allowClear
              />
              <DatePicker
                style={{ width: "50%" }}
                onChange={onChangeDate}
                allowClear
              />
            </Input.Group>
          </div>
          <div>
            <Dropdown overlay={menu}>
              <Button>Sort By</Button>
            </Dropdown>
          </div>
          <div>
            <button type="submit">Search</button>
          </div>
        </form>
      </div>
      <div className="card">
        {articles !== null && articles !== undefined ? (
          articles.map(({title, urlToImage, url, description, author }) => (
            <div>
                <Card
                  style={{ width: 300 }}
                  hoverable="true"
                  cover={<img alt="news image" src={urlToImage} />}
                >
                  <Meta
                    title={
                      <a href={url} target="_blank">
                        {title}
                      </a>
                    }
                    description={description}
                  />
                </Card>
            </div>
          ))
        ) : (
          <h3>Veri yok</h3>
        )}
      </div>
    </div>
  );
}

export default React.memo(App);
