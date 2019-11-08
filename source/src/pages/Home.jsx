import React from "react";
import Header from "../components/Header";
import Banner from "../components/Banner";
import Footer from "../components/Footer";
import Page1 from "../components/Page1";
import Page2 from "../components/Page2";
import Page3 from "../components/Page3";

class Home extends React.PureComponent {
  render() {
    return (
      <React.Fragment>
        <Header />
        <Banner />
        <Page1 />
        <Page2 />
        <Page3 />
        <Footer />
      </React.Fragment>
    );
  }
}

export default Home;
