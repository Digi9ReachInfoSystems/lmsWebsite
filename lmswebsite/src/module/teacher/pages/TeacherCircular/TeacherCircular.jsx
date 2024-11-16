
import React, { useState, useEffect } from "react";
import { AiOutlineFileAdd } from "react-icons/ai";
import { FaSearch } from "react-icons/fa";
import { getAllCircularNotificationsApi } from "../../../../api/circularNotificationApi";
import { Link } from "react-router-dom";
import DashboardTable from "../../components/DashboardTable/DashboardTable";
import ImageViewer from "../../components/ImageViewer/ImageViewer";
import FormModel from "../../components/FormModel/FormModel";
import {TeacherCircularWrap} from './TeacherCircular.styles'
import { getQuizzesByTeacher } from "../../../../api/quizApi";

export default function TeacherCircular() {
 
    const [searchInput, setSearchInput] = useState(""); // Initialize searchInput with an empty string
    const [filterData, setFilterData] = useState([]);
    const [originalData, setOriginalData] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [children, setChildren] = useState(null);
  
    const columns = [
      "Title",
      "Description",
      "Image",
      "Action",
    ];
  
    const openModal = () => {
  
      setIsModalOpen(true);
    };
  
    const closeModal = () => {
      setIsModalOpen(false);
      setSelectedImage(null);
      window.location.reload();
    };
  
    // Fetch data on component mount
    useEffect(() => {
      const apiCaller = async () => {
    
        const data = await getAllCircularNotificationsApi();
        if (data) {
          const dataFilter = data.circularNotifications.map((circular) => ({
            "Title": circular.circularName,
            "Description": circular.content,
            "Image": (
              <img
                src={circular.image}
                alt="Circular Image"
                className="circular-image-box"
              />
  
            ),
            "Action": (<button
              className="circular-image-btn"
              onClick={() => {
                setSelectedImage(circular.image);
                setChildren(<ImageViewer image={circular.image} />)
                openModal();
              }}
              
            >
  
              view image
            </button>),
          }));
          setOriginalData(dataFilter);
          setFilterData(dataFilter); // Set initial table data
        }
      };
      apiCaller();
    }, []);
  
    // Filter data based on searchInput for "Batch Name"
    useEffect(() => {
      if (searchInput) {
        const filtered = originalData.filter((item) =>
          item["Title"].toLowerCase().includes(searchInput.toLowerCase())
        );
        setFilterData(filtered);
      } else {
        setFilterData(originalData); // Reset to original data if search is empty
      }
    }, [searchInput, originalData]);
  
  
  
    return (
      <TeacherCircularWrap className="content-area">
        <div className="area-row ar-one">
          <div className="circular-batches_nav">
            <h2 className="circular-batch_title">Created Circulars</h2>
            <div className="circular-search">
              <form>
                <div className="input-group">
                  <span className="input-icon">
                    <FaSearch />
                  </span>
                  <input
                    type="text"
                    className="input-control"
                    placeholder="Search by Circular Name"
                    value={searchInput} // Controlled input
                    onChange={(e) => setSearchInput(e.target.value)} // Update searchInput state on change
                  />
                </div>
              </form>
            </div>
            {/* <button
              onClick={() => {
                setChildren(<CreateCircular closeModal={closeModal} />);
                openModal();
              }}
              className="circular-batch_btn"
            >
              <AiOutlineFileAdd className="circular-batch_icon" />
              <span>Create Circular</span>
            </button> */}
          </div>
        </div>
        <div className="area-row ar-two"></div>
        <div className="area-row ar-three">
          {filterData.length > 0 ? (
            <DashboardTable columns={columns} data={filterData} />
          ) : (
            <p>No results found</p>
          )}
          {
            isModalOpen
              ? <FormModel isOpen={isModalOpen} onClose={closeModal} children={children} />
              : null
          }
        </div>
      </TeacherCircularWrap>
    );
  }