import React, { useContext, useState } from 'react';
import { assets } from '../../assets/assets'; // Correct path
import { toast } from 'react-toastify';
import axios from 'axios';
import { AdminContext } from '../../context/AdminContext';

const AddDoctor = () => {
  const [docImg, setDocImg] = useState(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [experience, setExperience] = useState('1 Year');
  const [fees, setFees] = useState('');
  const [about, setAbout] = useState('');
  const [speciality, setSpeciality] = useState('General physician');
  const [degree, setDegree] = useState('');
  const [address1, setAddress1] = useState('');
  const [address2, setAddress2] = useState('');

  const { backendUrl, aToken } = useContext(AdminContext);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (!docImg) return toast.error('Image Not Selected');

    const formData = new FormData();
    formData.append('image', docImg);
    formData.append('name', name);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('experience', experience);
    formData.append('fees', Number(fees));
    formData.append('about', about);
    formData.append('speciality', speciality);
    formData.append('degree', degree);
    formData.append('address', JSON.stringify({ line1: address1, line2: address2 }));

    try {
      const { data } = await axios.post(`${backendUrl}/api/admin/add-doctor`, formData, {
        headers: { aToken }
      });
      if (data.success) {
        toast.success(data.message);
        setDocImg(null);
        setName('');
        setEmail('');
        setPassword('');
        setExperience('1 Year');
        setFees('');
        setAbout('');
        setSpeciality('General physician');
        setDegree('');
        setAddress1('');
        setAddress2('');
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || err.message);
    }
  };

  return (
    <form onSubmit={onSubmitHandler} className='m-5 w-full'>
      <p className='mb-3 text-lg font-medium'>Add Doctor</p>
      <div className='bg-white px-8 py-8 border rounded w-full max-w-4xl max-h-[80vh] overflow-y-scroll'>
        <div className='flex items-center gap-4 mb-8 text-gray-500'>
          <label htmlFor="doc-img">
            <img
              className='w-16 bg-gray-100 rounded-full cursor-pointer'
              src={docImg ? URL.createObjectURL(docImg) : assets.upload_icon}
              alt="upload"
            />
          </label>
          <input id="doc-img" type="file" hidden onChange={e => setDocImg(e.target.files[0])} />
          <p>Upload doctor picture</p>
        </div>

        {/* Name, Email, Password, Experience, Fees */}
        <div className='flex flex-col lg:flex-row gap-10 text-gray-600'>
          <div className='w-full lg:flex-1 flex flex-col gap-4'>
            <input value={name} onChange={e => setName(e.target.value)} placeholder="Name" className='border px-3 py-2 rounded' required />
            <input value={email} onChange={e => setEmail(e.target.value)} type="email" placeholder="Email" className='border px-3 py-2 rounded' required />
            <input value={password} onChange={e => setPassword(e.target.value)} type="password" placeholder="Password" className='border px-3 py-2 rounded' required />
            <select value={experience} onChange={e => setExperience(e.target.value)} className='border px-2 py-2 rounded'>
              {['1 Year','2 Year','3 Year','4 Year','5 Year','6 Year','8 Year','9 Year','10 Year'].map(exp => <option key={exp} value={exp}>{exp}</option>)}
            </select>
            <input value={fees} onChange={e => setFees(e.target.value)} type="number" placeholder="Fees" className='border px-3 py-2 rounded' required />
          </div>

          <div className='w-full lg:flex-1 flex flex-col gap-4'>
            <select value={speciality} onChange={e => setSpeciality(e.target.value)} className='border px-2 py-2 rounded'>
              {['General physician','Gynecologist','Dermatologist','Pediatricians','Neurologist','Gastroenterologist'].map(sp => <option key={sp} value={sp}>{sp}</option>)}
            </select>
            <input value={degree} onChange={e => setDegree(e.target.value)} placeholder="Degree" className='border px-3 py-2 rounded' required />
            <input value={address1} onChange={e => setAddress1(e.target.value)} placeholder="Address Line 1" className='border px-3 py-2 rounded' required />
            <input value={address2} onChange={e => setAddress2(e.target.value)} placeholder="Address Line 2" className='border px-3 py-2 rounded' required />
          </div>
        </div>

        <textarea value={about} onChange={e => setAbout(e.target.value)} placeholder="About Doctor" rows={5} className='w-full px-4 py-2 border rounded mt-4'></textarea>

        <button type='submit' className='bg-primary px-10 py-3 mt-4 text-white rounded-full'>Add Doctor</button>
      </div>
    </form>
  );
};

export default AddDoctor;