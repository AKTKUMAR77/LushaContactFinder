import { useState } from 'react'
import axios from "axios"

const App = () => {
  const [linkedinURL,setLinkedinURL] = useState('');
  const [isActive,setActive] = useState(false);
  const [firstName,setFirstName] = useState('');
  const [lastName,setLastName] = useState('');
  const [fullName,setFullName] = useState('');
  const [updateDate,setUpdateDate] = useState('');
  const [title,setTitle] = useState('');
  const [companyName,setCompanyName] = useState('');
  const [phone,setPhone] = useState([]);
  const [email,setEmail] = useState([]);

  const backendURL=import.meta.env.VITE_BACKEND_URL;
  const findContact = async () => {
    try {
      const response = await axios.post(`${backendURL}/api/dummy`, {
        linkedin: linkedinURL
      });
      if(!response) return;
      setFirstName(response.data.results[0].firstName);
      setLastName(response.data.results[0].lastName);
      setFullName(response.data.results[0].fullName);
      setUpdateDate(response.data.results[0].updateDate);
      setTitle(response.data.results[0].jobTitle.title);
      setCompanyName(response.data.results[0].company.name);
      setPhone(prev => [...prev,...response.data.results[0].phones.map(p=>p.number)]);
      setEmail(prev => [...prev,...response.data.results[0].emails.map(p=>p.email)]);
      setActive(true);
      // console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  const resetContact = () => {
    setFirstName('');
    setLastName('');
    setFullName('');
    setUpdateDate('');
    setTitle('');
    setCompanyName('');
    setPhone([]);
    setEmail([]);
    setActive(false);
  }
  const copyDetails = async () => {
    const text = `
Name: ${fullName}
Title: ${title}
Company: ${companyName}
Phone: ${phone.join(", ")}
Email: ${email.join(", ")}
`.trim();

  try {
    await navigator.clipboard.writeText(text);
    // console.log("Contact copied!");
  } catch (error) {
    console.error("Failed to copy:", error);
  }
  }
  return (
    isActive?(
      <div className='flex flex-col min-h-screen justify-center items-center -translate-y-10'>
        <div className='flex flex-row w-fulls p-2 mb-5 border-solid border-3 rounded-2xl md:text-xl border-green-700 bg-pink-100'>
          {/* Left Section */}
          <div>
            <p className="whitespace-nowrap" >First Name</p>
            <p className="whitespace-nowrap" >Last Name</p>
            <p className="whitespace-nowrap" >Full Name</p>
            <p className="whitespace-nowrap" >Update Date</p>
            <p className="whitespace-nowrap" >Title</p>
            <p className="whitespace-nowrap" >Company Name</p>
            <p className="whitespace-nowrap" >Phone</p>
            <p className="whitespace-nowrap" >Email</p>
          </div>
          {/* Right Section */}
          <div className='ml-2'>
            <p className="whitespace-nowrap" >: {firstName}</p>
            <p className="whitespace-nowrap" >: {lastName}</p>
            <p className="whitespace-nowrap" >: {fullName}</p>
            <p className="whitespace-nowrap" >: {updateDate}</p>
            <p className="whitespace-nowrap" >: {title}</p>
            <p className="whitespace-nowrap" >: {companyName}</p>
            <p className="whitespace-nowrap" >: {phone.join(",")}</p>
            <p className="whitespace-nowrap" >: {email.join(",")}</p>
          </div>
        </div>
        <button
          onClick={copyDetails}
          className="w-20px sm:w-30 lg:w-100 rounded-lg bg-blue-400 px-6 py-3 text-white transition hover:bg-blue-700"
        >
          Copy Details
        </button>
        <button
          onClick={resetContact}
          className="w-20px sm:w-30 lg:w-100 rounded-lg bg-red-500 px-6 py-3  mt-2 text-white transition hover:bg-red-700"
        >
          Find Next Contact
        </button>
        
      </div>
    )
    :
    (
      <div className='flex flex-col  min-h-screen justify-center items-center -translate-y-20'>
      <input
        type="text"
        placeholder="Enter LinkedIn profile URL"
        value={linkedinURL}
        onChange={(e) => setLinkedinURL(e.target.value)}
        className="w-20px sm:w-60 lg:w-100 mb-4 rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-red-500"
      />
      <button
        onClick={findContact}
        className="w-20px sm:w-30 lg:w-100 rounded-lg bg-red-500 px-6 py-3 text-white transition hover:bg-red-700"
      >
        Find Contact
      </button>
    </div>
    )
  );
}

export default App