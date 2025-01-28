import React from "react";
import ProfessionalCarousel from "../carousel/Carousel";
import TeacherSection from "../teachers/TeacherSection";
import Cards from "../coursecard/Cards";
import Logo from "../log/Logo";
import Footer from "../footer/Footer";
import RegistrationPage from "./RegistrationPage";
import TeacherAttendancePage from "./Body";
import Dashboard from "./DashBoard";
const Home = () => {
  return (
    <div>
     {/*<ProfessionalCarousel />
      <hr></hr>
      <TeacherSection />
      <Cards />
      <hr />
      <Logo />
      <Footer /> <TeacherAttendancePage/> <RegistrationPage/>*/} 
      
      <Dashboard/>
    </div>
  );
};

export default Home;
