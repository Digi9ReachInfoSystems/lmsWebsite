// src/components/admin/Blog/Blog.jsx

import React, { useState, useEffect } from "react";
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
import { CiHeart } from "react-icons/ci";
import { IoMdShare } from "react-icons/io";
import NavBar from "../NavBar/navbar";
import Footer from "../Footer/Footer";
import { getAllBlogs } from "../../../api/blogApi"; // Adjust the path accordingly
import { Spin, Alert, Tag } from "antd"; // Ant Design components for loading, error handling, and tags
import moment from "moment"; // For date formatting

const Blog = () => {
  const [blogs, setBlogs] = useState([]); // State to store fetched blogs
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  // Fetch blogs from the API when the component mounts
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const blogData = await getAllBlogs();
        if (blogData.success && Array.isArray(blogData.data)) {
          setBlogs(blogData.data);
        } else {
          setError("Invalid blog data format received.");
        }
      } catch (err) {
        //console.error("Error fetching blogs:", err);
        setError(
          "Failed to fetch blogs: " +
            (err.error || "An unexpected error occurred.")
        );
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  // Handle section (blog) click to expand/collapse (optional feature)
  const [expandedSection, setExpandedSection] = useState(null);

  const handleCardClick = (id) => {
    setExpandedSection(expandedSection === id ? null : id); // Toggle between expand and collapse
  };

  return (
    <div>
      <NavBar />
      <BlogContainer>
        <Header>
          <h1>
            <b>BLOG</b>
          </h1>
          <nav>
            <a href="/">Home Page</a>
          </nav>
        </Header>

        {/* Loading State */}
        {loading ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "60vh",
            }}
          >
            <Spin size="large" tip="Loading Blogs..." />
          </div>
        ) : error ? (
          /* Error State */
          <Alert
            message="Error"
            description={error}
            type="error"
            showIcon
            style={{ margin: "20px" }}
          />
        ) : blogs.length === 0 ? (
          /* No Blogs Available */
          <Alert
            message="No Blogs Available"
            type="info"
            showIcon
            style={{ margin: "20px" }}
          />
        ) : (
          /* Render Blogs Dynamically */
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              // justifyContent: "space-between",
            }}
          >
            {blogs.map((blog, index) => {
              const blogId = blog._id?.$oid || blog._id || index;
              const isExpanded = expandedSection === blogId;

              return (
                <Section
                  key={blogId}
                  onClick={() => handleCardClick(blogId)}
                  isExpanded={isExpanded}
                >
                  <Image src={blog.image} alt={blog.title} />
                  
                  {/* Icons below the image */}
                  <IconContainer>
                    <Icon>
                      {/* <CiHeart /> */}
                    </Icon>
                    <Icon>
                      {/* <IoMdShare /> */}
                    </Icon>
                  </IconContainer>

                  {/* Blog Title */}
                  <SubHeading>{blog.title}</SubHeading>

                  {/* Author and Date */}
                  <Paragraph>
                    <strong>By:</strong> {blog.author} |{" "}
                   
                  </Paragraph>
<Paragraph> {moment(blog.createdAt.$date).format("MMMM Do, YYYY")}</Paragraph>
                  {/* Tags */}
                  <Paragraph>
                    {blog.tags.map((tag, idx) => (
                      <Tag color="blue" key={idx}>
                        {tag}
                      </Tag>
                    ))}
                  </Paragraph>

                  {/* Description */}
                  <Paragraph>{blog.description}</Paragraph>
                </Section>
              );
            })}
          </div>
        )}
      </BlogContainer>
      <Footer />
    </div>
  );
};

export default Blog;
