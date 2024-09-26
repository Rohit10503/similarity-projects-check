import React, { useEffect, useState } from "react";
import "./home.css"
import { useNavigate } from "react-router-dom";



import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
        </div>
    );
}

CustomTabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}



const Home = () => {

    // Material ui Starts
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    // Material ui Ends

    const auth = JSON.parse(sessionStorage.getItem("user"))
    const navigate = useNavigate()
    const [prjIdea, setPrjIdea] = useState("null")
    const [prjRes, setPrjRes] = useState([])


    const goToMangeSelf = () => {

        navigate("/self_group")
    }

    const goToViewGroup = () => {
        navigate("/view_groups")
    }

    useEffect(() => {
        // This will run whenever prjRes changes
        console.log(prjRes);
    }, [prjRes]);

    const getPrjValid = async () => {
        let result = await fetch(`https://5000-rohit10503-similaritypr-gom2oz9u3hc.ws-us116.gitpod.io/similarity`, {
            method: "POST",
            body: JSON.stringify({ sentence: prjIdea }),
            headers: {
                "Content-Type": "application/json"

            }

        })
        result = await result.json()
        console.log(result)
        setPrjRes(result)
        console.log(prjRes)
    }
    return <>

        <div className="box">
            <div className="upper">
                <div className="upper-left box">
                    <div className="pro_img">
                        <img src="https://img.freepik.com/premium-vector/man-avatar-profile-picture-vector-illustration_268834-538.jpg" alt="Profile_Logo" />
                    </div>
                    <div className="user_name">
                        <h1 className="Title is-size-3">Name: {auth.name}</h1>
                    </div>
                    <div className="uin">
                        <h1 className="Title is-size-4">UIN: {auth.uin}</h1>
                    </div>
                    <div className="user_email">
                        <h1 className="Title is-size-4">Email: {auth.email}</h1>
                    </div>
                    <div className="user_school">
                        <h1 className="Title is-size-4">College: Rizvi College Of Engineering</h1>
                    </div>

                    <div className="buttons button_field">
                        <button class="button is-warning  " onClick={goToMangeSelf}>Manage My Groups</button>
                        <button class="button is-warning" onClick={goToViewGroup}>View & join group</button>
                    </div>
                </div>
                <div className="upper-right ">
                    <h1 className="Title is-size-2">"Uncover Uniqueness: Seamlessly Check Abstract Similarities"</h1>
                    <br />
                    <p className="Title is-size-5">Enter your project abstract and title below to discover how closely your work aligns with past projects. </p>
                </div>
                
            </div>
            <div className="middle box">
                <textarea class="textarea" placeholder="e.g. Give your project idea here" onChange={(e) => { setPrjIdea(e.target.value) }}></textarea>
                <div ><button class="button is-warning  " onClick={getPrjValid}>Click here</button></div>


            </div>
            <div className="lower">
                {/* Yaha par result hai */}
                <Box sx={{ width: '100%' }}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                            {

                                prjRes.map((item, index) => (
                                    <Tab
                                    key={index}
                                    label={`${(item.score*100).toFixed(2) } %`}
                                    {...a11yProps(index)} 
                                />
                                ))} 
                            
                        </Tabs>
                    </Box>
                    {prjRes.map((item, index) => (
                        <CustomTabPanel value={value} index={index} key={index}>
                            <h4>{item.sentence}</h4>
                        </CustomTabPanel>
                    ))}
                    

                </Box>

            </div>

        </div>


    </>
}
export default Home;

