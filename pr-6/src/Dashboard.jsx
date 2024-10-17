import { onAuthStateChanged } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { auth, db } from '../firebase'; 
import { getDoc, doc, getDocs, collection, addDoc, deleteDoc, updateDoc } from 'firebase/firestore'; 
import './Dash.css'; // Import the CSS file

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [hotelName, setHotelName] = useState("");
  const [location, setLocation] = useState("");
  const [rating, setRating] = useState("");
  const [record, setRecord] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        console.log(currentUser);
        setUser(currentUser);
      } else {
        setUser(null);
      }
    });
  }, []);

  useEffect(() => {
    const fetchUser = async () => {
      if (user) {
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        console.log(userDoc.data());
      }
    };

    fetchUser();
  }, [user]);

  const fetchData = async () => {
    const data = await getDocs(collection(db, "Hotels")); 
    const newData = data.docs.map((item) => ({ docId: item.id, ...item.data() }));
    setRecord(newData);
  };

  useEffect(() => {
    fetchData(); 
  }, []);

  const addData = async () => {
    if (editIndex === null) {
      await addDoc(collection(db, "Hotels"), { hotelName, location, rating });
    } else {
      await updateDoc(doc(db, "Hotels", editIndex), { hotelName, location, rating });
      setEditIndex(null); 
    }
    setHotelName(""); 
    setLocation("");
    setRating(""); 
    fetchData(); 
  };

  const deleteData = async (docId) => {
    await deleteDoc(doc(db, "Hotels", docId));
    fetchData(); 
  };

  const editData = (docId) => {
    const singleData = record.find((item) => item.docId === docId);
    setHotelName(singleData.hotelName);
    setLocation(singleData.location);
    setRating(singleData.rating); 
    setEditIndex(docId);
  };

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-greeting">Hotel Details Dashboard</h1>

      <input type="text" placeholder='Hotel Name' value={hotelName} onChange={(e) => setHotelName(e.target.value)} /> 
      <input type="text" placeholder='Location' value={location} onChange={(e) => setLocation(e.target.value)} /> 
      <input type="text" placeholder='Rating (1-5)' value={rating} onChange={(e) => setRating(e.target.value)} /> 
      <button onClick={addData}>{editIndex === null ? "Add" : "Update"}</button> 

      <ul>
        {record.map((e) => (
          <li key={e.docId}>
            {e.hotelName} - {e.location} (Rating: {e.rating}) 
            <div>
              <button className="edit-button" onClick={() => editData(e.docId)}>Edit</button>
              <button onClick={() => deleteData(e.docId)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
