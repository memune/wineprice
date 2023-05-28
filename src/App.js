import React, { useState } from "react";
import "./App.css";

const App = () => {
  const [wines, setWines] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [vintage, setVintage] = useState("");
  const [price, setPrice] = useState("");
  const [purchaseLocation, setPurchaseLocation] = useState("");

  const addWine = (wine) => {
    setWines([...wines, wine]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const wineName = e.target.name.value;
    const winePrice = e.target.price.value;

    if (!wineName || !winePrice) {
      // 와인 이름 또는 가격이 입력되지 않은 경우
      alert("와인 이름과 가격은 필수 입력 사항입니다.");
      return;
    }

    addWine({
      id: Date.now(),
      name: wineName,
      vintage: e.target.vintage.value,
      price: winePrice,
      purchaseLocation: e.target.purchaseLocation.value,
    });

    // 입력 필드 초기화
    e.target.name.value = "";
    e.target.vintage.value = "";
    e.target.price.value = "";
    e.target.purchaseLocation.value = "";
  };

  const handleVintageChange = (e) => {
    setVintage(e.target.value);
  };

  const handlePriceChange = (e) => {
    const formattedPrice = e.target.value.replace(/\D/g, "");
    setPrice(formattedPrice);
  };

  const handlePurchaseLocationChange = (e) => {
    setPurchaseLocation(e.target.value);
  };

  const formatVintage = (vintage) => {
    if (!vintage) return "모름";
    return vintage;
  };

  const generateVintageOptions = () => {
    const currentYear = new Date().getFullYear();
    const startYear = currentYear - 100;
    const endYear = currentYear;

    const options = [];

    options.push(
      <option key="unknown" value="">
        모름
      </option>
    );

    for (let year = endYear; year >= startYear; year--) {
      options.push(
        <option key={`year-${year}`} value={year}>
          {year}
        </option>
      );
    }

    return options;
  };

  const formatPriceWithCommas = (price) => {
    if (!price) return "";
    const formattedPrice = price.toString().replace(/\D/g, "");
    const parts = formattedPrice.split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
  };

  const handleDelete = (id) => {
    const updatedWines = wines.filter((wine) => wine.id !== id);
    setWines(updatedWines);
  };


  return (
    <div className="app">
      <h1 className="title">와인얼마</h1>

      <input
        type="text"
        placeholder="Search"
        className="search-input"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <form onSubmit={handleSubmit} className="wine-form">
        <div className="form-group">
          <label htmlFor="name" className="label">
            와인의 이름을 입력하세요
          </label>
          <input type="text" placeholder="Name" name="name" className="input" />
        </div>
        
        <div className="form-group">
          <label htmlFor="price" className="label">
            얼마에 구매하셨나요?(원화)
          </label>
          <input
            type="text"
            placeholder="Price"
            name="price"
            value={formatPriceWithCommas(price)}
            onChange={handlePriceChange}
            className="input"
          />
        </div>

        <div className="form-group">
          <label htmlFor="vintage" className="label">
            빈티지를 알려주세요
          </label>
          <select value={vintage} onChange={handleVintageChange} className="input" name="vintage">
            {generateVintageOptions()}
          </select>
        </div>


        <div className="form-group">
          <label htmlFor="purchaseLocation" className="label">
            어디에서 구매했나요?
          </label>
          <input
            type="text"
            placeholder="Purchase Location"
            name="purchaseLocation"
            value={purchaseLocation}
            onChange={handlePurchaseLocationChange}
            className="input"
          />
        </div>
        <input type="submit" value="등록하기" className="submit-button" />
      </form>

      <table className="wine-table">
        <thead>
          <tr>
            <th className="table-header">와인명</th>
            <th className="table-header">구매 가격</th>
            <th className="table-header">빈티지</th>
            <th className="table-header">구매 장소</th>
            <th className="table-header">삭제</th>
          </tr>
        </thead>
        <tbody>
          {wines
            .filter((wine) => wine.name.toLowerCase().includes(searchTerm.toLowerCase()))
            .map((wine) => (
              <tr key={wine.id}>
                <td className="table-cell">{wine.name}</td>
                <td className="table-cell">{formatPriceWithCommas(wine.price)}</td>
                <td className="table-cell">{formatVintage(wine.vintage)}</td>
                <td className="table-cell">{wine.purchaseLocation}</td>
                <td className="table-cell">
                  <button onClick={() => handleDelete(wine.id)}>Delete</button> {/* 삭제 버튼 */}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default App;
