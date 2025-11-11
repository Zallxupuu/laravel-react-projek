// import logo from './logo.svg';
// import './App.css';
import axios from 'axios';
import React, {useEffect,useState} from 'react';

function App() {
const[pegawais,setPegawais] = useState([]);
const[formData,setFormData] = useState({ namaPegawai:"",alamatPegawai:"",noPegawai:""});

useEffect(()=> {
    fetchPegawai();
},[]);

const fetchPegawai = ()=> {
    axios.get('http://127.0.0.1:8000/api/pegawais')
    .then((response) => setPegawais(response.data))
    .catch((error) => console.error("Error fetching data:", error))
};

const HandleChange = (e) => {
    setFormData({...formData,[e.target.name]: e.target.value});
};

const HandleSubmit = (e) =>{
    e.preventDefault();
    axios.post("http://127.0.0.1:8000/api/pegawais", formData)
    .then( () => {
        alert("Data pegawai berhasil ditambahkan!")
        setFormData({namaPegawai:"", alamatPegawai:"", noPegawai:""})
        fetchPegawai();
    })

    .catch((error) => console.error("Error adding data:", error))
}

  return (
    <div style={{  padding:20, fontFamily:"Arial" }}>
        <h1>Daftar Pegawai</h1>
        <form onSubmit={HandleSubmit} style={{ marginBottom:20 }}>
            <input type='text' name='namaPegawai' placeholder='Masukkan namaPegawai' value={formData.namaPegawai} onChange={HandleChange} required/>
            <input type='text' name='alamatPegawai' placeholder='Masukkan alamatPegawai' value={formData.alamatPegawai} onChange={HandleChange} required/>
            <input type='text' name='noPegawai' placeholder='Masukkan NomorTelpon' value={formData.noPegawai} onChange={HandleChange} required/>

            <button type='submit'>Tambah Pegawai</button>
        </form>

        {pegawais.length > 0 ? (
            <ul>
                {pegawais.map((p) => (
                    <li key={p.id}>
                        <b>{p.namaPegawai}</b> - {p.alamatPegawai} -{p.noPegawai}
                    </li>
                ))}
            </ul>
        ):(
            <p>Tidak ada pegawai</p>
        )}
    </div>
  );


}

export default App;

