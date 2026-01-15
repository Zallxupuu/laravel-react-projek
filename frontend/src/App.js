import editLogo from './assets/edit-3-svgrepo-com.svg';
import deleteIcon from './assets/delete-1487-svgrepo-com.svg';
import './App.css';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {Toaster,toast} from 'react-hot-toast';

function App() {
    const [pegawais, setPegawais] = useState([]);
    const [formData, setFormData] = useState({
        namaPegawai: "",
        alamatPegawai: "",
        noPegawai: ""
    });

    const [editId, setEditId] = useState(null);

    useEffect(() => {
        fetchPegawai();
    }, []);

    const fetchPegawai = () => {
        axios.get('http://127.0.0.1:8000/api/pegawais')
            .then((response) => {
                setPegawais(response.data);
            })
            .catch((error) => console.error("Error fetching data:", error));
    };

    const HandleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const HandleSubmit = (e) => {
        e.preventDefault();

        if (editId) {
            axios.put(`http://127.0.0.1:8000/api/pegawais/${editId}`, formData)
                .then(() => {
                    toast.success("Data pegawai berhasil diupdate!");
                    setFormData({ namaPegawai: "", alamatPegawai: "", noPegawai: "" });
                    setEditId(null);
                    fetchPegawai();
                })
                .catch(err => console.log(err));
            return;
        }

        axios.post("http://127.0.0.1:8000/api/pegawais", formData)
            .then(() => {
                toast.success("Data pegawai berhasil ditambahkan!");
                setFormData({ namaPegawai: "", alamatPegawai: "", noPegawai: "" });
                fetchPegawai();
            })
            .catch(err => console.log(err));
    };

    const handleDelete = async (id) => {
        if (window.confirm("Apakah kamu yakin ingin menghapus data ini?")) {
            try {
                await axios.delete(`http://127.0.0.1:8000/api/pegawais/${id}`);
                toast.success("Data berhasil dihapus!");
                fetchPegawai();
            } catch (err) {
                console.error("Error deleting data:", err);
                alert("Gagal menghapus data");
            }
        }
    };

    return (
        <div className="bg-slate-900 min-h-screen py-12">
            <Toaster position="top-right" reverseOrder={false} />
            <div className="max-w-4xl mx-auto p-6">

                {/* Title */}
                <h1 className="text-4xl font-extrabold text-center mb-10 bg-gradient-to-r from-sky-400 to-indigo-400 text-transparent bg-clip-text drop-shadow-lg">
                    Manajemen Pegawai
                </h1>

                {/* FORM */}
                <form
                    onSubmit={HandleSubmit}
                    className="bg-slate-800 p-8 rounded-2xl shadow-xl border border-slate-700 mb-10"
                >
                    <h2 className="text-2xl font-bold text-sky-400 mb-6">Form Pegawai</h2>

                    <div className="grid grid-cols-1 gap-5">
                        <input
                            className="p-3 rounded-xl bg-slate-700 text-white placeholder-gray-400 border border-slate-600 focus:ring-2 focus:ring-sky-400 focus:outline-none transition"
                            type="text"
                            name="namaPegawai"
                            placeholder="Nama Pegawai"
                            value={formData.namaPegawai}
                            onChange={HandleChange}
                            required
                        />

                        <input
                            className="p-3 rounded-xl bg-slate-700 text-white placeholder-gray-400 border border-slate-600 focus:ring-2 focus:ring-sky-400 focus:outline-none transition"
                            type="text"
                            name="alamatPegawai"
                            placeholder="Alamat Pegawai"
                            value={formData.alamatPegawai}
                            onChange={HandleChange}
                            required
                        />

                        <input
                            className="p-3 rounded-xl bg-slate-700 text-white placeholder-gray-400 border border-slate-600 focus:ring-2 focus:ring-sky-400 focus:outline-none transition"
                            type="text"
                            name="noPegawai"
                            placeholder="Nomor Telepon"
                            value={formData.noPegawai}
                            onChange={HandleChange}
                            required
                        />

                        <button
                            type="submit"
                            className="mt-3 bg-gradient-to-r from-orange-500 to-orange-400 text-white font-bold py-3 rounded-xl shadow-lg hover:scale-[1.02] active:scale-95 transition-all"
                        >
                            {editId ? "Update Pegawai" : "Tambah Pegawai"}
                        </button>
                    </div>
                </form>

                {/* TABLE */}
                <div className="bg-slate-800 p-6 rounded-2xl shadow-xl border border-slate-700">
                    <h2 className="text-2xl font-bold text-indigo-400 mb-4">Daftar Pegawai</h2>

                    {pegawais.length > 0 ? (
                        <table className="w-full text-left text-white text-lg">
                            <thead>
                                <tr className="bg-slate-700 text-sky-300 uppercase text-sm">
                                    <th className="p-3">Nama</th>
                                    <th className="p-3">Alamat</th>
                                    <th className="p-3">Nomor</th>
                                    <th className="p-3">Action</th>
                                </tr>
                            </thead>

                            <tbody>
                                {pegawais.map((p, index) => (
                                    <tr
                                        key={p.id}
                                        className={`border-b border-slate-700 hover:bg-slate-700/60 transition ${
                                            index % 2 === 0 ? "bg-slate-800" : "bg-slate-900"
                                        }`}
                                    >
                                        <td className="p-3">{p.namaPegawai}</td>
                                        <td className="p-3">{p.alamatPegawai}</td>
                                        <td className="p-3">{p.noPegawai}</td>

                                        <td className="p-3 flex gap-3">
                                            <button
                                                onClick={() => {
                                                    setEditId(p.id);
                                                    setFormData({
                                                        namaPegawai: p.namaPegawai,
                                                        alamatPegawai: p.alamatPegawai,
                                                        noPegawai: p.noPegawai
                                                    });
                                                }}
                                                className="p-2 bg-yellow-500 rounded-lg hover:bg-yellow-400 shadow-md transition"
                                            >
                                                <img src={editLogo} className="w-5 h-5" alt="edit" />
                                            </button>

                                            <button
                                                onClick={() => handleDelete(p.id)}
                                                className="p-2 bg-red-500 rounded-lg hover:bg-red-400 shadow-md transition"
                                            >
                                                <img src={deleteIcon} className="w-5 h-5" alt="delete" />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <p className="text-gray-400 text-center py-5">Tidak ada data pegawai.</p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default App;
