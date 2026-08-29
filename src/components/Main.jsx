import { useState, useEffect } from 'react'
import CheckIcon from "./CheckIcon";
import { FaEye } from "react-icons/fa";
import { RiEyeCloseFill } from "react-icons/ri";
import TextLoop from './TextLoop';
import { ToastContainer, toast } from 'react-toastify';
import CopyIcon from './CopyIcon';
import TrashIcon from './TrashIcon';
import { MotionIcon } from 'motion-icons-react';
import { v4 as uuidv4 } from 'uuid';
import { pass } from 'three/src/nodes/display/PassNode.js';
import { Repeat } from 'lucide-react';

const Main = () => {
    const [visible, setvisible] = useState(true)
    const [form, setform] = useState({ site: "", username: "", password: "" })
    const [passwordArray, setpasswordArray] = useState([])

    const getPasswords = async () => {
        let req = await fetch("http://localhost:3000/")

        let passwords = await req.json()
        console.log(passwords)
        setpasswordArray(passwords)
    }


    useEffect(() => {
        getPasswords()

    }, [])



    const copyText = (text) => {
        toast.success('Copied to clipboard', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            transition: "Bounce",
        });
        navigator.clipboard.writeText(text)
    }

    const showPassword = () => {
        setvisible(!visible)
    }
    const handleChange = (e) => {
        setform({ ...form, [e.target.name]: e.target.value })
    }

    const savePassword = async () => {
        if (form.site.length >= 3 && form.username.length >= 3 && form.password.length >= 5) {


            // if any such id exists in the db, delete it 
            await fetch("http://localhost:3000/", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id: form.id }) })

            setpasswordArray([...passwordArray, { ...form, id: uuidv4() }])
            await fetch("http://localhost:3000/", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...form, id: uuidv4() }) })
            // localStorage.setItem("password", JSON.stringify([...passwordArray, { ...form, id: uuidv4() }]))

            // console.log([...passwordArray, form])
            setform({ site: "", username: "", password: "" })
        }
        else {
            toast.success("Error : Password didn't added", {
                position: "top-center",
                autoClose: 100,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                transition: "Bounce",
            });
        }
    }

    const deletePassword = async (id) => {
        console.log("Deleting password with id", id)
        let c = confirm("Do you really want to delete this password?")
        if (c) {
            setpasswordArray(passwordArray.filter(item => item.id != id))
            await fetch("http://localhost:3000/", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id }) })
            // localStorage.setItem("password", JSON.stringify(passwordArray.filter(item => item.id != id)))
        }
    }

    const editPassword = (id) => {
        console.log("Editing password with id", id)
        setform({...passwordArray.filter(i => i.id === id)[0] , id :id})
        setpasswordArray(passwordArray.filter(item => item.id != id))
    }
    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                transition={"Bounce"}
            />
            <div>
                <div className="container w-90 sm:w-150 md:w-180 mx-auto">
                    <div className='backdrop-blur-sm rounded-2xl bg-white/10 border border-white/20 px-4 py-2 sm:py-4 sm:px-10'>
                        <div className='heading text-2xl flex flex-col items-center justify-center text-white mb-5 sm:mb-15'>
                            <div>
                                <span className='text-3xl font-semibold'>&lt;Pass</span>
                                <span className='text-3xl font-semibold text-purple-700'>OP/&gt;</span>
                            </div>
                            <span className='text-lg'>Your Own Password Manager</span>
                        </div>
                        <div className="main-content">
                            <div className='flex flex-col  gap-2 sm:gap-5'>
                                <input value={form.site} onChange={handleChange} placeholder='Enter Website URL' className='border-white border-2 rounded-2xl text-black px-2 text-[14px] sm:text-lg w-full' type="text" name="site" id="site" />
                                <div className='flex gap-5'>
                                    <input value={form.username} onChange={handleChange} placeholder='Enter Username' className='border-white border-2 rounded-2xl w-[50%] text-black px-2 text-[14px] sm:text-lg' type="text" name="username" id="username" />
                                    <div className="relative w-[50%]">
                                        <input value={form.password} onChange={handleChange} placeholder='Enter password' className='border-white border-2 w-full rounded-2xl  text-black px-2 text-[14px] sm:text-lg' type={visible ? "password" : "text"} name="password" id="password" />
                                        <span className='absolute right-2 top-1.5 cursor-pointer text-md sm:text-xl' onClick={showPassword}>{visible ? <FaEye /> : <RiEyeCloseFill />}</span>
                                    </div>
                                </div>
                                <div className='flex gap-1 items-center mx-auto'>
                                    <button onClick={savePassword} className='text-lg cursor-pointer flex items-center gap-2 bg-violet-700/20 border-2 border-white rounded-full px-2 sm:px-4 py-2 group'><CheckIcon
                                        size={28}
                                        isHovered={true}
                                        className='text-white'
                                    /><span className='text-white hover:font-bold'>Add Password</span></button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='stored w-90 sm:w-150 md:w-180 mx-auto'>

                <div className='backdrop-blur-sm rounded-2xl bg-white/10 border border-white/20 py-2 px-2 sm:px-5'>
                    <TextLoop
                        staticText="Your"
                        rotatingTexts={[
                            "Passwords",
                            "Information"
                        ]}
                        className="text-white text-xl sm:text-3xl"
                        rotatingTextClassName="from-cyan-300 to-violet-500"
                        cursorClassName="bg-cyan-400"
                    />
                    {passwordArray.length === 0 && <div className='text-white text-xl'>No Passwords to Show</div>}
                    {passwordArray.length != 0 &&
                        <table className="table-auto w-full">
                            <thead className='bg-green-300/20 rounded-2xl text-white text-md sm:text-xl'>
                                <tr>
                                    <th className='w-10 wrap-break-word'>Website</th>
                                    <th>Username</th>
                                    <th>Password</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {passwordArray.map((item, index) => {
                                    return (
                                        <tr key={index}>
                                            <td className='text-center w-10 wrap-break-word'><a href={item.site} target='_blank'>{item.site}</a></td>
                                            <td className='text-center'>
                                                <div className='flex items-center justify-center gap-2' onClick={() => { copyText(item.username) }}>
                                                    {item.username}<CopyIcon
                                                        className={"copy cursor-pointer"}
                                                        size={24}
                                                        isHovered={true}
                                                    />
                                                </div>
                                            </td>
                                            <td className='text-center'>
                                                <div className='flex items-center justify-center gap-2' onClick={() => { copyText(item.password) }}>
                                                    {"*".repeat(item.password.length)}<CopyIcon
                                                        className={"copy cursor-pointer"}
                                                        size={24}
                                                        isHovered={true}
                                                    />
                                                </div>
                                            </td>
                                            <td className='text-center flex justify-center gap-4 cursor-pointer items-center'>
                                                <span onClick={() => { editPassword(item.id) }}><MotionIcon
                                                    name="Edit"
                                                    size={24}
                                                    animation="bounce"
                                                    ishovered="true"
                                                /></span>
                                                <span onClick={() => { deletePassword(item.id) }}>
                                                    <TrashIcon
                                                        size={28}
                                                        isHovered={true}
                                                    />
                                                </span>

                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    }
                </div>

            </div>
        </>
    )
}

export default Main









