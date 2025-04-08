import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import TableOfContents from "../components/TableofContents";

const AboutUsPage: React.FC = () => {
  return (
    <>
      <Header />
      <div className="container py-5" style={{ marginTop: "80px" }}>
        <div className="row">
          {/* Left Sidebar: Table of Contents */}
          <div className="col-md-3 mb-4 border-end">
            <div className="sticky-toc">
              <div className="toc-wrapper">
                <TableOfContents />
              </div>
            </div>
          </div>
          {/* Right Content */}
          <div className="col-md-9 text-start">
            <h1 className="fw-bold">About Us</h1>
            <br />
            <p>
              CineNiche is a premium movie streaming service dedicated to
              bringing you a carefully curated selection of cult classics,
              international cinema, indie films, and niche documentaries. We are
              passionate about showcasing unique stories and providing our
              viewers with content that isn't available on mainstream platforms.
            </p>
            <br />
            <h2 className="fw-bold">Our Story</h2>
            <p>
              Founded in 2025, CineNiche was built on a passion for discovering
              and sharing hidden gems from around the world. Our team of film
              enthusiasts works tirelessly to source movies that inspire,
              entertain, and challenge the conventional.
            </p>
            <br />
            <h2 className="fw-bold">Our Mission</h2>
            <p>
              We believe in celebrating diverse voices and stories. Our mission
              is to provide a platform where niche content can shine, connecting
              audiences with films that matter.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AboutUsPage;
