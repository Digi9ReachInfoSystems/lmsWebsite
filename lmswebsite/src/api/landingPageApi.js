import api from '../config/axiosConfig';

/**
 * Function to fetch all necessary data for the landing page
 * @returns {Promise<Object>} - Object containing all responses from the APIs
 */
export const fetchLandingPageData = async () => {
  const apiEndpoints = {
    banners: '/banners',
    courses: '/courses/allcourses',
    stats: '/stats/statistics',
    benefits: '/benefits/',
    singleCoursePerClass: '/courses/singleCoursePerClass',
    chooseUs: '/chooseUs/getData',
    experienceTeachers: '/teachers/experience/greater',
    testimonials: '/testimonials/',
    faqs: '/faqs/all',
  };

  try {
    const [
      bannersResponse,
      coursesResponse,
      statsResponse,
      benefitsResponse,
      singleCoursePerClassResponse,
      chooseUsResponse,
      experienceTeachersResponse,
      testimonialsResponse,
      faqsResponse,
    ] = await Promise.all([
      api.get(apiEndpoints.banners),
      api.get(apiEndpoints.courses),
      api.get(apiEndpoints.stats),
      api.get(apiEndpoints.benefits),
      api.get(apiEndpoints.singleCoursePerClass),
      api.get(apiEndpoints.chooseUs),
      api.get(apiEndpoints.experienceTeachers),
      api.get(apiEndpoints.testimonials),
      api.get(apiEndpoints.faqs),
    ]);

     // Logging each response to the //console
     //console.log('Banners:', bannersResponse.data);
     //console.log('Courses:', coursesResponse.data);
     //console.log('Stats:', statsResponse.data);
     //console.log('Benefits:', benefitsResponse.data);
     //console.log('Single Course Per Class:', singleCoursePerClassResponse.data);
     //console.log('Why Choose Us:', chooseUsResponse.data);
     //console.log('Experienced Teachers:', experienceTeachersResponse.data);
     //console.log('Testimonials:', testimonialsResponse.data);
     //console.log('FAQs:', faqsResponse.data);

    // Returning all responses as a single object
    return {
      banners: bannersResponse.data,
      courses: coursesResponse.data,
      stats: statsResponse.data,
      benefits: benefitsResponse.data,
      singleCoursePerClass: singleCoursePerClassResponse.data,
      chooseUs: chooseUsResponse.data,
      experienceTeachers: experienceTeachersResponse.data,
      testimonials: testimonialsResponse.data,
      faqs: faqsResponse.data,
    };
  } catch (error) {
    //console.error('Error fetching landing page data:', error);
    throw error; // You can handle the error as needed
  }
};
