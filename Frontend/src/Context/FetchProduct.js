import { createContext, useEffect, useState } from 'react';
import axios from 'axios';
import { BaseUrl } from '../Componentes/BaseUrl/base';

export const FetchProduct = createContext(null);

export default function FetchProducttProvider(props) {
  const [eyes, setEyes] = useState([]);
  const [painkiller, setPainkiller] = useState([]);
  const [skinCare, setSkinCare] = useState([]);
  const [haircare, setHaircare] = useState([]);
  const [head, setHead] = useState([]);
  const [depression, setDepression] = useState([]);
  const [internalDiseases, setInternalDiseases] = useState([]);
  const [bones, setBones] = useState([]);
  const [ear, setEar] = useState([]);
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token");
  let getAllItems = async (category, callBack) => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token"); // Always get the fresh token
      if (!token) {
        console.warn('No token found, skipping fetching category:', category);
        return;
      }
      let { data } = await axios.post(
        `${BaseUrl}/products/category`,
        { category }, // body
        { headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' } } // headers
      );
      console.log(data);
      callBack(data.products);
    } catch (error) {
      console.error('Error fetching data:', error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };
  

  useEffect(() => {
    if (!token) return; // don't fetch if there is no token
  
    getAllItems('Ear', setEar);
    getAllItems('Eyes', setEyes);
    getAllItems('Pain killer', setPainkiller);
    getAllItems('Skin care', setSkinCare);
    getAllItems('Haircare', setHaircare);
    getAllItems('Head', setHead);
    getAllItems('Depression and Mental illnesses', setDepression);
    getAllItems('Internal Diseases', setInternalDiseases);
    getAllItems('Bones', setBones);
  }, [token]);
  

  return (
    <FetchProduct.Provider value={{ ear, eyes,
     painkiller, skinCare, haircare, head,
      depression, internalDiseases, bones, loading }}>
      {props.children}
    </FetchProduct.Provider>
  );
}
