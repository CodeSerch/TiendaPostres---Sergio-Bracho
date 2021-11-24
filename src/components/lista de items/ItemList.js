import { useEffect, useState, useContext, useParams } from "react";
import { promises } from "../lista de items/promises";
import Item from "./Item";
import "../styles/styles.css";

import { CartContext } from "../../context/cartContext";

import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
import firebaseConfig from "../../firebaseConfig";

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const productosCol = collection(db, 'productos');
    

const Promises = () => {
    const [items, setItems] = useState([]);
  useEffect(() => {
    //const productoSnapshot = getDocs(productosCol);
    getDocs(productosCol).then((querySnapshot) => {
      if (querySnapshot.size === 0) {
        console.log("no results")
      }
      setItems(querySnapshot.docs.map(doc => doc.data())).then(()=>{
      })
    }).catch((error) => {
      console.log("error searching  ", error);
    }).finally(() => {
      console.log("then finally");
    });
  }, []);

    return (
        <div style={{ fontFamily: "Paytone One" }}>
        <div class="itemList" style={{display:"flex", justifyContent:"center",marginBottom:"50px",marginTop:"10px", flexWrap:"wrap"}}>
                {items.map((items) => (
                    <Item key={items.id} {...items} />
                ))}
            </div>
        </div>
    )
};

export default Promises;