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

    const [value, setValue] = useState(0);  // Material UI tab state
    const [prjIdea, setPrjIdea] = useState(null);  // Initialize with null instead of string "null"
    const [prjRes, setPrjRes] = useState([]);
    const [department, setDepartment] = useState("");
    const auth = JSON.parse(sessionStorage.getItem("user"));
    const navigate = useNavigate();


    const handleChange = (event, newValue) => {
        setValue(newValue);
    };



    const goToMangeSelf = () => {

        navigate("/self_group")
    }

    const goToViewGroup = () => {
        navigate("/view_groups")
    }



    // Assign department based on UIN
    useEffect(() => {
        if (auth && auth.uin) {
            if (auth.uin.includes("P")) setDepartment("computer");
            else if (auth.uin.includes("M")) setDepartment("mechanical");
            else if (auth.uin.includes("C")) setDepartment("civil");
            else if (auth.uin.includes("E")) setDepartment("electronic");
            else {
                alert("Department could not be determined.");
            }
        } else {
            alert("User not authenticated or UIN is missing.");
        }
    }, [auth]);


    const getPrjValid = async () => {
<<<<<<< HEAD
=======
        let result = await fetch(`https://5000-rohit10503-similaritypr-76vivuscr1y.ws-us117.gitpod.io/similarity`, {
            method: "POST",
            body: JSON.stringify({ sentence: prjIdea }),
            headers: {
                "Content-Type": "application/json"
>>>>>>> a2b40c441fbfc9f0e18e08e6b44acdcd5e455133

        if (!prjIdea || !prjIdea.trim()) {
            alert("Please enter a project idea.");
            return;
        }


        try {
            const response = await fetch(
                `https://5000-rohit10503-similaritypr-76vivuscr1y.ws-us117.gitpod.io/similarity`,
                {
                    method: "POST",
                    body: JSON.stringify({ sentence: prjIdea, branch: department }),
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            if (!response.ok) {
                alert("Failed to fetch data from the server.");
                return;
            }

            const data = await response.json();
            setPrjRes(data);  // Set the results from the API
            console.log(prjRes,department)
        } catch (error) {
            console.error("Error fetching data:", error);
            alert("There was an error while fetching the data.");
        }


        
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
                                        label={`${(item.score * 100).toFixed(2)} %`}
                                        {...a11yProps(index)}
                                    />
                                ))}

                        </Tabs>
                    </Box>
                    {prjRes.map((item, index) => (
                        <CustomTabPanel value={value} index={index} key={index}>
                            <h4>{item.id } ----  { item.sentence}</h4>
                        </CustomTabPanel>
                    ))}


                </Box>

            </div>

        </div>


    </>
}
export default Home;



