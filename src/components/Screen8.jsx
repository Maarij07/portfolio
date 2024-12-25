import { useState, useEffect } from 'react';

const Screen8 = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch('http://localhost:5001/api/blogs'); // Ensure the correct URL
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log('Fetched blogs:', data); // Debugging output
        setBlogs(data);
      } catch (error) {
        console.error('Error fetching blogs:', error);
        setError('Failed to fetch blogs');
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  // Conditional rendering based on loading and error states
  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (blogs.length === 0) return <p>No blogs available.</p>;

  return (
    <div className='min-h-screen text-center flex flex-col gap-6 py-10'>
      <h1 className='text-4xl font-bold'>Free Repair Guide</h1>
      <p className='font-light px-10'>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem ab eum magnam similique, iste consequatur? Illo voluptate, iure nulla veritatis dignissimos tempora minima obcaecati deleniti quidem molestiae sit? Laudantium, doloribus beatae. Iste, itaque rerum?
      </p>

      {/* Blog Cards Row */}
      <div className='flex justify-center gap-6 mt-6 flex-wrap'>
        {blogs.map((blog) => (
          <div key={blog._id} className='w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-4'>
            <div className='bg-gray-100 rounded-lg p-4 shadow-md'>
              <img 
                src={blog.img} 
                alt={blog.title} 
                className='w-full h-40 object-cover rounded-lg mb-4' 
              />
              <p className='text-gray-500 text-sm'>{new Date(blog.date).toLocaleDateString()}</p>
              <h2 className='font-semibold text-xl my-2'>{blog.title}</h2>
              <p className='text-gray-700'>{blog.author}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Screen8;