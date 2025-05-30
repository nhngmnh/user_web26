import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import axios from 'axios';

const Product = () => {
  const navigate = useNavigate();
  const { backendurl,search} = useContext(AppContext);
  // Load từ localStorage
  const getLocal = (key, defaultValue) => localStorage.getItem(key) || defaultValue;
  const [showFilterTime, setShowFilterTime] = useState(false);
  const [showFilterPrice, setShowFilterPrice] = useState(false);
  const [showFilterCategory, setShowFilterCategory] = useState(false);
  const [showFilterBrand, setShowFilterBrand] = useState(false);
  const [showBsl,setShowBsl]=useState(false);
  const [filterPro, setFilterPro] = useState([]);
  const [sortFlag, setSortFlag] = useState(0);
  const [category, setCategory] = useState(getLocal('category', ''));
  const [brand, setBrand] = useState(getLocal('brand', ''));
  const [sortOrder,setSortOrder]=useState('');
  const [maxPrice,setMaxPrice]=useState(null);
  const [minPrice,setMinPrice]=useState(null);
  const handleClearFilter = async ()=>{
    try {
      localStorage.removeItem('category'); setCategory('');
      setShowFilterCategory(false);
      localStorage.removeItem('brand'); setBrand(''); setShowFilterBrand(false);
      setShowBsl(false);
      setMaxPrice(null); setMinPrice(null);setShowFilterPrice(false);
      setSortOrder(''); setShowFilterTime(false);
    } catch (error) {
      toast.error("Can't clear filter !")
    }
  }
  

  
  // Lưu vào localStorage khi thay đổi
  useEffect(() => {
    localStorage.setItem('category', category);
    localStorage.setItem('brand', brand);
  }, [search, category, brand, sortOrder, minPrice, maxPrice,showBsl,showFilterBrand,showFilterCategory]);

  // Lấy sản phẩm
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${backendurl}/api/product/get-products`, {
          params: { query: search, category, brand, minPrice, maxPrice }
        });
        let fproducts = res.data.products;

        // Sort ngay sau khi fetch
        if (sortOrder !== "") {
          fproducts = [...fproducts].sort((a, b) =>
            sortOrder === "desc"
              ? new Date(b.release_date) - new Date(a.release_date)
              : new Date(a.release_date) - new Date(b.release_date)
          );
        }
  
        setFilterPro(fproducts);
      } catch (error) {
        console.error("Lỗi khi tải sản phẩm:", error);
      }
    };
    fetchData();
  }, [search, category, brand, minPrice, maxPrice, backendurl,sortOrder]);


  const handleCategoryChange = (newCategory) => {
    setCategory(prev => (prev === newCategory ? '' : newCategory));
    setShowFilterCategory(false);
  };

  const handleBrandChange = (newBrand) => {
    setBrand(prev => (prev === newBrand ? '' : newBrand));
    setShowFilterBrand(false);
  };

  const handleTimeChange = (newTime) => {
    setSortOrder(prev => (prev === newTime ? '' : newTime));
    setSortFlag(prev => 1-prev);
    setShowFilterTime(false);
  };
  return (
    <div className='flex flex-col'>
      <div className='flex flex-col sm:flex-row gap-5'>
        {/* Category filter */}
        <div>
          <button className={`py-1 w-36 px-3 border rounded text-sm ${showFilterCategory || category ? 'bg-primary text-white' : ''}`}
                  onClick={() => setShowFilterCategory(prev => !prev)}>
            {category ? `Category: ${category}` : 'Select category'}
          </button>
          {showFilterCategory && (
            <div className='flex flex-col gap-2 text-sm mt-1'>
              {['Laptop', 'Smartphone', 'Tablet', 'PcPrinter', 'Smartwatch', 'Accessory'].map(cat => (
                <p key={cat} onClick={() => handleCategoryChange(cat)}
                   className={`w-36 pl-3 py-1.5 border rounded cursor-pointer hover:bg-primary hover:text-white ${category === cat ? "bg-indigo-200 text-black" : ""}`}>
                  {cat}
                </p>
              ))}
            </div>
          )}
        </div>

        {/* Brand filter */}
        <div>
          <button className={`py-1 w-36 px-3 border rounded text-sm ${showFilterBrand || brand ? 'bg-primary text-white' : ''}`}
                  onClick={() => setShowFilterBrand(prev => !prev)}>
            {brand ? `Brand: ${brand}` : 'Select brand'}
          </button>
          {showFilterBrand && (
            <div className='flex flex-col gap-2 text-sm mt-1'>
              {['DELL', 'Apple', 'ASUS', 'Oppo', 'ACER', 'HP'].map(br => (
                <p key={br} onClick={() => handleBrandChange(br)}
                   className={`w-36 pl-3 py-1.5 border rounded cursor-pointer hover:bg-primary hover:text-white ${brand === br ? "bg-indigo-200 text-black" : ""}`}>
                  {br}
                </p>
              ))}
            </div>
          )}
        </div>

        {/* Time sort */}
        <div>
          <button className={`py-1 w-36 px-3 border rounded text-sm ${showFilterTime || sortOrder? 'bg-primary text-white' : ''}`}
                  onClick={() => setShowFilterTime(prev => !prev)}>
            {sortOrder ? `Time: ${sortOrder}` : 'Sort by time'}
          </button>
          {showFilterTime && (
            <div className='flex flex-col gap-2 text-sm mt-1'>
              {['asc', 'desc'].map(time => (
                <p key={time} onClick={() => handleTimeChange(time)}
                   className={`w-36 pl-3 py-1.5 border rounded cursor-pointer hover:bg-primary hover:text-white ${sortOrder === time ? "bg-indigo-200 text-black" : ""}`}>
                  {time === 'asc' ? 'Newest' : 'Oldest'}
                </p>
              ))}
            </div>
          )}
        </div>

        {/* Price filter */}
        <div>
          <button className={`py-1 w-36 px-3 border rounded text-sm ${showFilterPrice || (maxPrice || minPrice) ? 'bg-primary text-white' : ''}`}
                  onClick={() => setShowFilterPrice(prev => !prev)}>
            {minPrice || maxPrice ? <span className='bg-primary'>Price: [{minPrice || 0} - {maxPrice || '∞'}]</span> : 'Filter price'}
          </button>
          {showFilterPrice && (
            <div className='flex flex-col gap-2 text-sm mt-2 p-3 border rounded'>
              <input type='number' placeholder='Min Price' className='border p-1 rounded'
                     value={minPrice} onChange={(e) => setMinPrice(e.target.value)} />
              <input type='number' placeholder='Max Price' className='border p-1 rounded'
                     value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} />
            </div>
          )}
        </div>
        <div>
          <button className={`py-1 w-36 px-3 border rounded text-sm ${showBsl ? 'bg-primary text-white' : ''}`}
                  onClick={() => {setShowBsl(prev => !prev)}}>
            {showBsl ? <span className='bg-primary'>Best seller</span> : 'Best seller'}
          </button>
        </div>
        <div>
          <button className='py-1 w-36 px-3 border rounded text-sm hover:bg-green-500 cursor-pointer'
                  onClick={() => handleClearFilter()}>
                    Clear filter
          </button>
        </div>
      </div>

      {/* Product Grid */}
      <div className='w-full grid grid-cols-auto gap-4 gap-y-6 mt-6'>
        {filterPro.map(item => ( (!showBsl || item.bestseller) &&
                  <div key={item._id}
               onClick={() => navigate(`/detail/${item._id}`, { replace: true })}
               className='border border-gray-300 p-4 rounded hover:shadow cursor-pointer'>
            <img src={item.image_url} alt={item.name} className='w-full h-40 object-contain mb-2'/>
            <p className='font-semibold'>{item.name}</p>
            <p>{item.available ?<span className='text-sm text-green-400'>Available</span>  :<span className='text-gray-400 text-sm'>Not available</span>}</p>
            <p className='text-sm text-gray-600'>{item.brand}</p>
            <p className='text-red-600 font-bold mt-4'>{item.price} ₫ <span className='text-purple-600 text-xs'>{item.bestseller?'- best seller':''}</span></p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Product;