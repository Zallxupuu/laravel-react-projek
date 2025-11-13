// import logo from './logo.svg';
import './App.css';
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
    <div className='mx-auto text-center my-32 py-10 px-5 w-1/2 rounded-xl'>
        <h1 className='uppercase font-bold text-xl text-white mb-10 py-3 rounded-xl bg-sky-500 shadow-xl'>form input data</h1>
        <form onSubmit={HandleSubmit} className='bg-sky-500 py-6 rounded-xl shadow-xl mb-10'>
            <input className='block w-1/2 mx-auto px-2 py-2 rounded-lg border-black border-2 mb-3' type='text' name='namaPegawai' placeholder='Masukkan nama Pegawai' value={formData.namaPegawai} onChange={HandleChange} required/>
            <input className='block w-1/2 mx-auto px-2 py-2 rounded-lg border-black border-2 mb-3' type='text' name='alamatPegawai' placeholder='Masukkan alamat Pegawai' value={formData.alamatPegawai} onChange={HandleChange} required/>
            <input className='block w-1/2 mx-auto px-2 py-2 rounded-lg border-black border-2 mb-3' type='text' name='noPegawai' placeholder='Masukkan Nomor Telepon' value={formData.noPegawai} onChange={HandleChange} required/>

            <button type='submit' className='block w-1/2 mx-auto px-2 py-2 rounded-lg border-black border-2 mb-3 bg-zinc-600 text-white font-bold uppercase hover:bg-zinc-500 transition-all delay-100'>Tambah Pegawai</button>
        </form>

        {pegawais.length > 0 ? (
            <table className='w-full text-left text-xl'>
                <thead className=' text-center lowercase bg-sky-500 text-white'>
                    <tr className='border-orange-500 border-b-2'>
                        <th className='border'>Nama</th>
                        <th className='border'>Alamat</th>
                        <th className='border'>Nomor Pegawai</th>
                    </tr>
                </thead>
                <tbody >
                    {pegawais.map((p, index) =>
                        <tr className={index % 2 === 0 ? "bg-white hover:bg-sky-50" : "bg-gray-100 hover:bg-sky-50"}>
                            <td className='px-2 border'>{p.namaPegawai}</td>
                            <td  className='px-2 border'>{p.alamatPegawai}</td>
                            <td  className= 'px-2 border'>{p.noPegawai}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        ):(
            <p className='text-2xl uppercase'>Tidak ada pegawai</p>
        )}
    </div>
  );


}

export default App;

