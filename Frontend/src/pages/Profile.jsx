import React, { useState, useEffect } from "react";
import { Edit, Navigation, Save } from "lucide-react";
import useIsMobile from "../hooks/useIsMobile";
import NavBar from "../components/NavBar";
import MainLayout from "../components/MainLayout";
import InitialsIcon from "../components/InitialsIcon";
import { profileViewApi, profileEditApi } from "../utility/api"; 
const Profile = () => {
  const { isMobile } = useIsMobile();
  const [isEditing, setIsEditing] = useState(false);
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });


  // Fetch profile data 
  const fetchProfileData = async () => {
    try {
      const response = await profileViewApi(
        userInfo.name,
        userInfo.email,
        userInfo.phone,
        userInfo.address
      );

      // Check if the response contains valid data
      if (response) {
        setUserInfo({
          name: response.userName || "",
          email: response.emailId || "",
          phone: response.phoneNo || "",
          address: response.address || "",
        });
      } else {
        console.error("No data received from the API");
      }
    } catch (error) {
      console.error("Error fetching profile data:", error);
    }
  };

  useEffect(() => {
    fetchProfileData();
  }, []);

  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  const handleSaveClick = async () => {
    try {
      await profileEditApi(userInfo.name, userInfo.phone, userInfo.address);
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating profile data:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserInfo({
      ...userInfo,
      [name]: value,
    });
  };

  // Extract first and last name from the full name
  const [firstName, lastName] = userInfo.name.split(" ");

  return (
    <MainLayout title="Recipeze" NavBar={NavBar} className="max-w-screen mx-0 lg:mx-44 md:mx-24 sm:mx-3">
      <div className="min-w-[90vw] sm:min-w-[80vw] md:max-w-[70vw] py-5 px-4 sm:px-6 lg:px-8 mx-auto sm:mx-1">
        <div>
          <div className="profile-card bg-transparent rounded-lg shadow-md overflow-hidden">
            <div className="flex flex-col md:flex-row">
              {/* Left Side - Profile Image, Name, Edit Button */}
              <div className="bg-transparent text-black text-center p-6 md:w-1/3 lg:w-[25vw]">
                <InitialsIcon firstName={firstName} lastName={lastName} />
                {isEditing ? (
                  <input
                    type="text"
                    name="name"
                    value={userInfo.name}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded text-sm sm:text-base text-center"
                  />
                ) : (
                  <h5 className="text-xl sm:text-2xl text-gray-800 font-semibold">
                    {userInfo.name}
                  </h5>
                )}
                <div
                  onClick={isEditing ? handleSaveClick : handleEditClick}
                  className="cursor-pointer w-auto mt-4 mx-auto text-black flex items-center justify-center"
                >
                  {isEditing ? (
                    <>
                      <Save size={24} className="mr-2" />
                      <span className="text-xl">Save</span>
                    </>
                  ) : (
                    <>
                      <Edit size={24} className="mr-2" />
                      <span className="text-xl">Edit</span>
                    </>
                  )}
                </div>
              </div>

              {/* Right Side - Information */}
              <div className="p-6 md:w-2/3 w-full">
                <h6 className="text-xl sm:text-2xl font-semibold mb-4">
                  Information
                </h6>
                <hr className="my-2" />
                <div className="space-y-4">
                  <div>
                    <h6 className="font-semibold text-sm sm:text-base md:text-lg lg:text-xl">
                      Email
                    </h6>
                    <p className="text-gray-600 text-sm sm:text-base md:text-lg lg:text-xl">
                      {userInfo.email}
                    </p>
                  </div>
                  <div>
                    <h6 className="font-semibold text-sm sm:text-base md:text-lg lg:text-xl">
                      Phone
                    </h6>
                    {isEditing ? (
                      <input
                        type="text"
                        name="phone"
                        value={userInfo.phone}
                        onChange={handleInputChange}
                        className="w-full md:w-[30vw] p-2 border rounded text-sm sm:text-base"
                      />
                    ) : (
                      <p className="text-gray-600 text-sm sm:text-base md:text-lg lg:text-xl">
                        {userInfo.phone}
                      </p>
                    )}
                  </div>
                  <div>
                    <h6 className="font-semibold text-sm sm:text-base md:text-lg lg:text-xl">
                      Address
                    </h6>
                    {isEditing ? (
                      <input
                        type="text"
                        name="address"
                        value={userInfo.address}
                        onChange={handleInputChange}
                        className="w-full md:w-[30vw] p-2 border rounded text-sm sm:text-base"
                      />
                    ) : (
                      <p className="text-gray-600 text-sm sm:text-base md:text-lg lg:text-xl">
                        {userInfo.address}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobile && (
        <div className="fixed bottom-0 left-0 right-0 z-50">
          <Navigation />
        </div>
      )}
    </MainLayout>
  );
};

export default Profile;