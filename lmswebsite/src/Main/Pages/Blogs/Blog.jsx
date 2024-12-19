import React, { useState } from "react";
import {
  BlogContainer,
  Header,
  Section,
  Image,
  Quote,
  Paragraph,
  SubHeading,
  IconContainer,
  Icon,
} from "./Blog.style";
import image1 from "../../assets/blog1.jpg";
import image2 from "../../assets/blog2.jpg";
import image3 from "../../assets/blog3.jpg";
import image4 from "../../assets/blog4.jpg";
import image5 from "../../assets/blog5.jpg";
import { CiHeart } from "react-icons/ci";
import { IoMdShare } from "react-icons/io";
import NavBar from "../NavBar/navbar";
import Footer from "../Footer/Footer";

const Blog = () => {
  const [expandedSection, setExpandedSection] = useState(null);

  const handleCardClick = (index) => {
    setExpandedSection(expandedSection === index ? null : index); // Toggle between expand and collapse
  };

  return (
    <div>
        <NavBar/>
    <BlogContainer>
      <Header>
        <h1><b>BLOG</b></h1>
        <nav>
          <a href="/">Home Page</a>
        </nav>
      </Header>

      {[image1, image2, image3, image4, image5].map((image, index) => (
        <Section
          key={index}
          onClick={() => handleCardClick(index)} 
          isExpanded={expandedSection === index}
        >
          <Image src={image} alt={`Blog ${index + 1}`} />
          
          {/* Icons below the image */}
          <IconContainer>
            <Icon ><CiHeart /></Icon>
            <Icon><IoMdShare /></Icon>
          </IconContainer>

          {index === 0 && (
            <>
              <Quote>“In every walk with nature, one receives far more than he seeks.”</Quote>
              <Paragraph>
                Nature has a way of calming the soul and refreshing the mind. Whether it's a walk in the park or hiking in the mountains, there's always something beautiful to discover.
              </Paragraph>
            </>
          )}
          {index === 1 && (
            <>
            <SubHeading>Lifestyle : A Path to Clarity</SubHeading>
             <Quote>“In every walk with nature, one receives far more than he seeks.”</Quote>
              
              <Paragraph>
                Living with less is not about having nothing;
              </Paragraph>
            </>
          )}
          {index === 2 && (
            <>
              <Paragraph>
                From the latest in tech to ancient wisdom, balancing the new and the old creates a harmony in life. Learn to adapt while preserving tradition.
              </Paragraph>
            </>
          )}
          {index === 3 && (
            <>
              <SubHeading>Creative Pursuits: Finding Joy in Art</SubHeading>
              <Quote>“Creativity takes courage.” – Henri Matisse</Quote>
              <Paragraph>
                Art, music, and writing are not just hobbies but expressions of our innermost selves. Embrace creativity and watch your world expand.
              </Paragraph>
            </>
          )}
          {index === 4 && (
            <>
              <SubHeading>Health and Wellness: A Holistic Approach</SubHeading>
              <Paragraph>
                Staying healthy is not just about eating right; it's a blend of physical activity, mental health, and maintaining strong social connections.
              </Paragraph>
              <Paragraph>
                Explore the benefits of mindfulness, the importance of regular exercise, and how relationships shape our wellbeing.
              </Paragraph>
            </>
          )}
        </Section>
      ))}
    </BlogContainer>
    <Footer/>
    </div>
  );
};

export default Blog;

