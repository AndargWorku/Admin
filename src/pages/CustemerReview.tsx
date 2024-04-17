import React, { useState, ChangeEvent, DragEvent } from 'react';
import '../styles/review.css';

interface Review {
  id: string;
  name: string;
  comment: string;
  rating: string;
  photo: string;
}

const ReviewPage: React.FC = () => {
  // Initial reviews data
  const initialReviews: Review[] = [
    { id: '1', name: 'John Doe', comment: 'Great product!', rating: '★★★★★', photo: 'https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg?cs=srgb&dl=pexels-nitin-khajotia-1516680.jpg&fm=jpg' },
    { id: '2', name: 'Jane Smith', comment: 'Not bad, but could be better.', rating: '★★★☆☆', photo: 'https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg?cs=srgb&dl=pexels-nitin-khajotia-1516680.jpg&fm=jpg' },
    { id: '3', name: 'Alice Johnson', comment: 'Excellent service!', rating: '★★★★☆', photo: 'https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg?cs=srgb&dl=pexels-nitin-khajotia-1516680.jpg&fm=jpg' },
    { id: '4', name: 'Bob Williams', comment: 'Product was damaged upon arrival.', rating: '★★☆☆☆', photo: 'https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg?cs=srgb&dl=pexels-nitin-khajotia-1516680.jpg&fm=jpg' },
    { id: '5', name: 'Eva Davis', comment: 'Fast shipping, good quality.', rating: '★★★★★', photo: 'https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg?cs=srgb&dl=pexels-nitin-khajotia-1516680.jpg&fm=jpg' },
  
  { id: '6', name: 'John Doe', comment: 'Great product!', rating: '★★★★★', photo: 'https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg?cs=srgb&dl=pexels-nitin-khajotia-1516680.jpg&fm=jpg' },
  { id: '7', name: 'Jane Smith', comment: 'Not bad, but could be better.', rating: '★★★☆☆', photo: 'https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg?cs=srgb&dl=pexels-nitin-khajotia-1516680.jpg&fm=jpg' },
  { id: '8', name: 'Alice Johnson', comment: 'Excellent service!', rating: '★★★★☆', photo: 'https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg?cs=srgb&dl=pexels-nitin-khajotia-1516680.jpg&fm=jpg' },
  { id: '9', name: 'Bob Williams', comment: 'Product was damaged upon arrival.', rating: '★★☆☆☆', photo: 'https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg?cs=srgb&dl=pexels-nitin-khajotia-1516680.jpg&fm=jpg' },
  { id: '10', name: 'Eva Davis', comment: 'Fast shipping, good quality.', rating: '★★★★★', photo: 'https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg?cs=srgb&dl=pexels-nitin-khajotia-1516680.jpg&fm=jpg' },
  { id: '11', name: 'John Doe', comment: 'Great product!', rating: '★★★★★', photo: 'https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg?cs=srgb&dl=pexels-nitin-khajotia-1516680.jpg&fm=jpg' },
  { id: '12', name: 'Jane Smith', comment: 'Not bad, but could be better.', rating: '★★★☆☆', photo: 'https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg?cs=srgb&dl=pexels-nitin-khajotia-1516680.jpg&fm=jpg' },
  { id: '13', name: 'Alice Johnson', comment: 'Excellent service!', rating: '★★★★☆', photo: 'https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg?cs=srgb&dl=pexels-nitin-khajotia-1516680.jpg&fm=jpg' },
  { id: '14', name: 'Bob Williams', comment: 'Product was damaged upon arrival.', rating: '★★☆☆☆', photo: 'https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg?cs=srgb&dl=pexels-nitin-khajotia-1516680.jpg&fm=jpg' },
  { id: '15', name: 'Eva Davis', comment: 'Fast shipping, good quality.', rating: '★★★★★', photo: 'https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg?cs=srgb&dl=pexels-nitin-khajotia-1516680.jpg&fm=jpg' },
    // ... (your existing reviews)
  ];

  // State variables
  const [reviews, setReviews] = useState<Review[]>(initialReviews);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [confirmModalOpen, setConfirmModalOpen] = useState<boolean>(false);

  const [searchTerm, setSearchTerm] = useState<string>('');
  const [newReview, setNewReview] = useState<Review>({
    id: '0',
    name: '',
    comment: '',
    rating: '★★★☆☆',
    photo: '',
  });
  const [reviewToDelete, setReviewToDelete] = useState<string | null>(null);

  // Drag and drop state
  const [dragOver, setDragOver] = useState<boolean>(false);

  // Pagination state
  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState<number>(1);

  // Filtered and paginated reviews based on search term
  const filteredReviews = reviews.filter((review) => {
    const searchFields = [review.name, review.comment, review.rating];
    return searchFields.some((field) => field.toLowerCase().includes(searchTerm.toLowerCase()));
  });

  const totalPages = Math.ceil(filteredReviews.length / itemsPerPage);
  const paginatedReviews = filteredReviews.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Event handlers
  const handleAddReview = () => {
    setReviews([...reviews, newReview]);
    setModalOpen(false);
    setNewReview({
      id: '0',
      name: '',
      comment: '',
      rating: '★★★☆☆',
      photo: '',
    });
  };

  const handleEditReview = (id: string) => {
    const reviewToEdit = reviews.find((review) => review.id === id);
    if (reviewToEdit) {
      setNewReview({ ...reviewToEdit });
      setModalOpen(true);
    }
  };

  const handleDeleteReview = (id: string) => {
    setReviewToDelete(id);
    setConfirmModalOpen(true);
  };

  const confirmDelete = () => {
    if (reviewToDelete !== null) {
      const updatedReviews = reviews.filter((review) => review.id !== reviewToDelete);
      setReviews(updatedReviews);
      setReviewToDelete(null);
      setConfirmModalOpen(false);
    }
  };

  const cancelDelete = () => {
    setReviewToDelete(null);
    setConfirmModalOpen(false);
  };

  const handleFileDrop = (e: DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setDragOver(false);

    const file = e.dataTransfer.files[0];

    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setNewReview({ ...newReview, photo: reader.result as string });
      };
    }
  };

  const handleFileInput = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setNewReview({ ...newReview, photo: reader.result as string });
      };
    }
  };

  return (
    <div className="container mx-auto mt-8 block with-shadow">
      <h1 className="text-lg font-semibold mb-4">Customer Reviews</h1>

      <button
        className="add__review font-bold py-2 px-4 mb-4 rounded"
        onClick={() => setModalOpen(true)}
      >
        Add Review
      </button>
      <div className="mb-4 flex justify-end gap-2">
        <label>Search:</label>
        <input
          type="text"
          placeholder="Search reviews..."
          className="form-input mt-1  w-48 border rounded-md"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <table className="w-full">
        <thead>
          <tr className='bg-gray-100'>
            <th className="text-left">ID</th>
            <th className="text-left">Photo</th>
            <th className="text-left">Name</th>
            <th className="text-left">Comment</th>
            <th className="text-left">Rating</th>
            <th className="text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {paginatedReviews.map((review) => (
            <tr key={review.id}>
              <td>{review.id}</td>
              <td>
                {review.photo && (
                  <img src={review.photo} alt={`Review by ${review.name}`} className="w-16 h-16 rounded-md m-1 object-cover" />
                )}
              </td>
              <td>{review.name}</td>
              <td>{review.comment}</td>
              <td>
                <div className="flex">
                  {review.rating.split('').map((char, index) => (
                    <span key={index} className="text-yellow-500">{char}</span>
                  ))}
                </div>
              </td>
              <td>
                <button
                  className="text-indigo-900 hover:underline mr-2"
                  onClick={() => handleEditReview(review.id)}
                >
                  Edit
                </button>
                <button
                  className="text-pink-500 hover:underline"
                  onClick={() => handleDeleteReview(review.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mt-4 flex justify-center">
        <button
          className="bg-indigo-950 hover:m-2  text-white font-bold py-2 px-4 rounded"
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <div>
          Page {currentPage} of {totalPages}
        </div>
        <button
          className="bg-pink-500  text-white font-bold py-2 px-4 rounded"
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>

      {modalOpen && (
                 <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                 <div className="bg-white p-8 rounded-lg">
                   <h2 className="text-2xl font-bold mb-4">{newReview.id ? 'Edit' : 'Add'} Review</h2>
                   <label className="block mb-4">
                     Name:
                     <input
                       type="text"
                       className="form-input mt-1 block w-full"
                       value={newReview.name}
                       onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
                     />
                   </label>
                   <label className="block mb-4">
                     Comment:
                     <textarea
                       className="form-input mt-1 block w-full"
                       value={newReview.comment}
                       onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                     />
                   </label>
                   <label className="block mb-4">
                     Rating:
                     <select
                       className="form-select mt-1 block w-full"
                       value={newReview.rating}
                       onChange={(e) => setNewReview({ ...newReview, rating: e.target.value })}
                     >
                       <option value="★★★★★">★★★★★</option>
                       <option value="★★★★☆">★★★★☆</option>
                       <option value="★★★☆☆">★★★☆☆</option>
                       <option value="★★☆☆☆">★★☆☆☆</option>
                       <option value="★☆☆☆☆">★☆☆☆☆</option>
                     </select>
                   </label>
                   <div className="mb-4">
                     <label
                       className={`cursor-pointer inline-block px-4 py-2 border rounded-md ${
                         dragOver ? 'border-pink-500' : 'border-gray-300'
                       } ${
                         newReview.photo ? 'bg-green-100 hover:bg-green-200' : 'bg-gray-100 hover:bg-gray-200'
                       }`}
                       onDragOver={(e) => {
                         e.preventDefault();
                         setDragOver(true);
                       }}
                       onDragLeave={() => setDragOver(false)}
                       onDrop={(e) => handleFileDrop(e)}
                     >
                       {newReview.photo ? 'Change Photo' : 'Drag & Drop or Click to Upload Photo'}
                     </label>
                     <input
                       type="file"
                       accept="image/*"
                       className="hidden"
                       onChange={handleFileInput}
                     />
                   </div>
                   <div className="flex justify-end">
                     <button
                       className="bg-pink-500 hover:bg-pink-700 text-white font-bold py-2 px-4 mr-2 rounded"
                       onClick={handleAddReview}
                     >
                       {newReview.id ? 'Save' : 'Add'}
                     </button>
                     <button
                       className="bg-indigo-950 hover:bg-indigo-800 text-white font-bold py-2 px-4 rounded"
                       onClick={() => setModalOpen(false)}
                     >
                       Cancel
                     </button>
                   </div>
                 </div>
               </div>     
      )}

      {confirmModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          
          <div className="bg-white p-8 rounded-lg">
            <p className="text-lg mb-4">Are you sure you want to delete this review?</p>
            <div className="flex justify-end">
              <button
                className="bg-pink-500 hover:bg-pink-700 text-white font-bold py-2 px-4 mr-2 rounded"
                onClick={confirmDelete}
              >
                Yes
              </button>
              <button
                className="bg-indigo-950 hover:bg-indigo-800 text-white font-bold py-2 px-4 rounded"
                onClick={cancelDelete}
              >
                No
              </button>
            </div>
          </div>
          {/* ... (existing confirm modal code) */}
        </div>
      )}
    </div>
  );
};

export default ReviewPage;





// import React, { useState, ChangeEvent, DragEvent } from 'react';
// import '../styles/review.css';

// interface Review {
//   id: string;
//   name: string;
//   comment: string;
//   rating: string;
//   photo: string;
// }

// const ReviewPage: React.FC = () => {
//   // Initial reviews data
//   const initialReviews: Review[] = [
//     { id: '1', name: 'John Doe', comment: 'Great product!', rating: '★★★★★', photo: 'https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg?cs=srgb&dl=pexels-nitin-khajotia-1516680.jpg&fm=jpg' },
//     { id: '2', name: 'Jane Smith', comment: 'Not bad, but could be better.', rating: '★★★☆☆', photo: 'https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg?cs=srgb&dl=pexels-nitin-khajotia-1516680.jpg&fm=jpg' },
//     { id: '3', name: 'Alice Johnson', comment: 'Excellent service!', rating: '★★★★☆', photo: 'https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg?cs=srgb&dl=pexels-nitin-khajotia-1516680.jpg&fm=jpg' },
//     { id: '4', name: 'Bob Williams', comment: 'Product was damaged upon arrival.', rating: '★★☆☆☆', photo: 'https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg?cs=srgb&dl=pexels-nitin-khajotia-1516680.jpg&fm=jpg' },
//     { id: '5', name: 'Eva Davis', comment: 'Fast shipping, good quality.', rating: '★★★★★', photo: 'https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg?cs=srgb&dl=pexels-nitin-khajotia-1516680.jpg&fm=jpg' },
  
//   { id: '6', name: 'John Doe', comment: 'Great product!', rating: '★★★★★', photo: 'https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg?cs=srgb&dl=pexels-nitin-khajotia-1516680.jpg&fm=jpg' },
//   { id: '7', name: 'Jane Smith', comment: 'Not bad, but could be better.', rating: '★★★☆☆', photo: 'https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg?cs=srgb&dl=pexels-nitin-khajotia-1516680.jpg&fm=jpg' },
//   { id: '8', name: 'Alice Johnson', comment: 'Excellent service!', rating: '★★★★☆', photo: 'https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg?cs=srgb&dl=pexels-nitin-khajotia-1516680.jpg&fm=jpg' },
//   { id: '9', name: 'Bob Williams', comment: 'Product was damaged upon arrival.', rating: '★★☆☆☆', photo: 'https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg?cs=srgb&dl=pexels-nitin-khajotia-1516680.jpg&fm=jpg' },
//   { id: '10', name: 'Eva Davis', comment: 'Fast shipping, good quality.', rating: '★★★★★', photo: 'https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg?cs=srgb&dl=pexels-nitin-khajotia-1516680.jpg&fm=jpg' },
//   { id: '11', name: 'John Doe', comment: 'Great product!', rating: '★★★★★', photo: 'https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg?cs=srgb&dl=pexels-nitin-khajotia-1516680.jpg&fm=jpg' },
//   { id: '12', name: 'Jane Smith', comment: 'Not bad, but could be better.', rating: '★★★☆☆', photo: 'https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg?cs=srgb&dl=pexels-nitin-khajotia-1516680.jpg&fm=jpg' },
//   { id: '13', name: 'Alice Johnson', comment: 'Excellent service!', rating: '★★★★☆', photo: 'https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg?cs=srgb&dl=pexels-nitin-khajotia-1516680.jpg&fm=jpg' },
//   { id: '14', name: 'Bob Williams', comment: 'Product was damaged upon arrival.', rating: '★★☆☆☆', photo: 'https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg?cs=srgb&dl=pexels-nitin-khajotia-1516680.jpg&fm=jpg' },
//   { id: '15', name: 'Eva Davis', comment: 'Fast shipping, good quality.', rating: '★★★★★', photo: 'https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg?cs=srgb&dl=pexels-nitin-khajotia-1516680.jpg&fm=jpg' },
// ];


//   // State variables
//   const [reviews, setReviews] = useState<Review[]>(initialReviews);
//   const [modalOpen, setModalOpen] = useState<boolean>(false);
//   const [confirmModalOpen, setConfirmModalOpen] = useState<boolean>(false);

//   const [searchTerm, setSearchTerm] = useState<string>('');
//   const [newReview, setNewReview] = useState<Review>({
//     id: '0',
//     name: '',
//     comment: '',
//     rating: '★★★☆☆',
//     photo: '',
//   });
//   const [reviewToDelete, setReviewToDelete] = useState<string | null>(null);

//   // Drag and drop state
//   const [dragOver, setDragOver] = useState<boolean>(false);

//   // Event handlers

//   // Add or edit a review
//   const handleAddReview = () => {
//     setReviews([...reviews, newReview]);
//     setModalOpen(false);
//     setNewReview({
//       id: '0',
//       name: '',
//       comment: '',
//       rating: '★★★☆☆',
//       photo: '',
//     });
//   };
// // for search
// const filteredReviews = reviews.filter((review) => {
//   const searchFields = [review.name, review.comment, review.rating];
//   return searchFields.some((field) => field.toLowerCase().includes(searchTerm.toLowerCase()));
// });
// // for pagination system

// const itemsPerPage = 5; // Number of items to display per page
// const [currentPage, setCurrentPage] = useState<number>(1);
// // Calculate total number of pages based on itemsPerPage
// const totalPages = Math.ceil(filteredReviews.length / itemsPerPage);

// // Filtered reviews based on search term and pagination
// const paginatedReviews = filteredReviews.slice(
//   (currentPage - 1) * itemsPerPage,
//   currentPage * itemsPerPage
// );

//   // Edit an existing review
//   const handleEditReview = (id: string) => {
//     const reviewToEdit = reviews.find((review) => review.id === id);
//     if (reviewToEdit) {
//       setNewReview({ ...reviewToEdit });
//       setModalOpen(true);
//     }
//   };

//   // Delete an existing review
//   const handleDeleteReview = (id: string) => {
//     setReviewToDelete(id);
//     setConfirmModalOpen(true);
//   };

//   // Confirm the deletion of a review
//   const confirmDelete = () => {
//     if (reviewToDelete !== null) {
//       const updatedReviews = reviews.filter((review) => review.id !== reviewToDelete);
//       setReviews(updatedReviews);
//       setReviewToDelete(null);
//       setConfirmModalOpen(false);
//     }
//   };

//   // Cancel the deletion of a review
//   const cancelDelete = () => {
//     setReviewToDelete(null);
//     setConfirmModalOpen(false);
//   };

//   // Handle file drop for photo upload
//   const handleFileDrop = (e: DragEvent<HTMLLabelElement>) => {
//     e.preventDefault();
//     setDragOver(false); // Reset dragOver state

//     const file = e.dataTransfer.files[0];

//     if (file) {
//       const reader = new FileReader();
//       reader.readAsDataURL(file);
//       reader.onload = () => {
//         setNewReview({ ...newReview, photo: reader.result as string });
//       };
//     }
//   };

//   // Handle file input for photo upload
//   const handleFileInput = (e: ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];

//     if (file) {
//       const reader = new FileReader();
//       reader.readAsDataURL(file);
//       reader.onload = () => {
//         setNewReview({ ...newReview, photo: reader.result as string });
//       };
//     }
//   };

//   return (
//     <div className="container mx-auto mt-8 block with-shadow">
//       {/* Header */}
//       <h1 className="text-lg font-semibold mb-4">Customer Reviews</h1>

//       {/* Add Review Button */}
//       <button
//         className="add__review font-bold py-2 px-4 mb-4 rounded"
//         onClick={() => setModalOpen(true)}
//       >
//         Add Review
//       </button>
//       <div className="mb-4 flex justify-end gap-2 ">
//         <label>search:</label>
//         <input
//           type="text"
//           placeholder="Search reviews..."
//           className="form-input mt-1  w-48 border rounded-md"
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//         />
//       </div>

//       {/* Reviews Table */}
//       <table className="w-full">
//         <thead>
//           <tr className='bg-gray-100'>
//             <th className="text-left">ID</th>
//             <th className="text-left">Photo</th>
//             <th className="text-left">Name</th>
//             <th className="text-left">Comment</th>
//             <th className="text-left">Rating</th>
//             <th className="text-left">Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {paginatedReviews.map((review) => (
//             <tr key={review.id}>
//               <td>{review.id}</td>
//               <td>
//                 {review.photo && (
//                   <img src={review.photo} alt={`Review by ${review.name}`} className="w-16 h-16 rounded-md m-1 object-cover" />
//                 )}
//               </td>
//               <td>{review.name}</td>
//               <td>{review.comment}</td>
//               <td>
//                 <div className="flex">
//                   {review.rating.split('').map((char, index) => (
//                     <span key={index} className="text-yellow-500">{char}</span>
//                   ))}
//                 </div>
//               </td>
//               <td>
//                 <button
//                   className="text-indigo-900 hover:underline mr-2"
//                   onClick={() => handleEditReview(review.id)}
//                 >
//                   Edit
//                 </button>
//                 <button
//                   className="text-pink-500 hover:underline"
//                   onClick={() => handleDeleteReview(review.id)}
//                 >
//                   Delete
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       {/* Pagination */}
//       <div className="mt-4 flex justify-center">
//         <button
//           className="bg-indigo-950 h-9 hover:m-2 rounded text-white font-bold py-2 px-4 "
//           onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
//           disabled={currentPage === 1}
//         >
//           Previous
//         </button>
//         <div>
//           Page {currentPage} of {totalPages}
//         </div>
//         <button
//           className="bg-pink-500 h-9 hover:m-2 text-white font-bold py-2 px-4 rounded"
//           onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
//           disabled={currentPage === totalPages}
//         >
//           Next
//         </button>
//       </div>


//       {/* Add/Edit Review Modal */}
//       {modalOpen && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
//           <div className="bg-white p-8 rounded-lg">
//             <h2 className="text-2xl font-bold mb-4">{newReview.id ? 'Edit' : 'Add'} Review</h2>
//             <label className="block mb-4">
//               Name:
//               <input
//                 type="text"
//                 className="form-input mt-1 block w-full"
//                 value={newReview.name}
//                 onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
//               />
//             </label>
//             <label className="block mb-4">
//               Comment:
//               <textarea
//                 className="form-input mt-1 block w-full"
//                 value={newReview.comment}
//                 onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
//               />
//             </label>
//             <label className="block mb-4">
//               Rating:
//               <select
//                 className="form-select mt-1 block w-full"
//                 value={newReview.rating}
//                 onChange={(e) => setNewReview({ ...newReview, rating: e.target.value })}
//               >
//                 <option value="★★★★★">★★★★★</option>
//                 <option value="★★★★☆">★★★★☆</option>
//                 <option value="★★★☆☆">★★★☆☆</option>
//                 <option value="★★☆☆☆">★★☆☆☆</option>
//                 <option value="★☆☆☆☆">★☆☆☆☆</option>
//               </select>
//             </label>
//             <div className="mb-4">
//               <label
//                 className={`cursor-pointer inline-block px-4 py-2 border rounded-md ${
//                   dragOver ? 'border-pink-500' : 'border-gray-300'
//                 } ${
//                   newReview.photo ? 'bg-green-100 hover:bg-green-200' : 'bg-gray-100 hover:bg-gray-200'
//                 }`}
//                 onDragOver={(e) => {
//                   e.preventDefault();
//                   setDragOver(true);
//                 }}
//                 onDragLeave={() => setDragOver(false)}
//                 onDrop={(e) => handleFileDrop(e)}
//               >
//                 {newReview.photo ? 'Change Photo' : 'Drag & Drop or Click to Upload Photo'}
//               </label>
//               <input
//                 type="file"
//                 accept="image/*"
//                 className="hidden"
//                 onChange={handleFileInput}
//               />
//             </div>
//             <div className="flex justify-end">
//               <button
//                 className="bg-pink-500 hover:bg-pink-700 text-white font-bold py-2 px-4 mr-2 rounded"
//                 onClick={handleAddReview}
//               >
//                 {newReview.id ? 'Save' : 'Add'}
//               </button>
//               <button
//                 className="bg-indigo-950 hover:bg-indigo-800 text-white font-bold py-2 px-4 rounded"
//                 onClick={() => setModalOpen(false)}
//               >
//                 Cancel
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Confirm Delete Modal */}
//       {confirmModalOpen && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
//           <div className="bg-white p-8 rounded-lg">
//             <p className="text-lg mb-4">Are you sure you want to delete this review?</p>
//             <div className="flex justify-end">
//               <button
//                 className="bg-pink-500 hover:bg-pink-700 text-white font-bold py-2 px-4 mr-2 rounded"
//                 onClick={confirmDelete}
//               >
//                 Yes
//               </button>
//               <button
//                 className="bg-indigo-950 hover:bg-indigo-800 text-white font-bold py-2 px-4 rounded"
//                 onClick={cancelDelete}
//               >
//                 No
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ReviewPage;


// // src/components/ReviewPage.tsx

// // import React, { useState, ChangeEvent } from 'react';
// // import '../styles/review.css';

// // interface Review {
// //   id: string;
// //   name: string;
// //   comment: string;
// //   rating: string; // Rating represented as a string of star icons
// //   photo: string;
// // }

// // const ReviewPage: React.FC = () => {
// //   const initialReviews: Review[] = [
// //     { id: '1', name: 'John Doe', comment: 'Great product!', rating: '★★★★★', photo: 'https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg?cs=srgb&dl=pexels-nitin-khajotia-1516680.jpg&fm=jpg' },
// //     { id: '2', name: 'Jane Smith', comment: 'Not bad, but could be better.', rating: '★★★☆☆', photo: 'https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg?cs=srgb&dl=pexels-nitin-khajotia-1516680.jpg&fm=jpg' },
// //     { id: '3', name: 'Alice Johnson', comment: 'Excellent service!', rating: '★★★★☆', photo: 'https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg?cs=srgb&dl=pexels-nitin-khajotia-1516680.jpg&fm=jpg' },
// //     { id: '4', name: 'Bob Williams', comment: 'Product was damaged upon arrival.', rating: '★★☆☆☆', photo: 'https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg?cs=srgb&dl=pexels-nitin-khajotia-1516680.jpg&fm=jpg' },
// //     { id: '5', name: 'Eva Davis', comment: 'Fast shipping, good quality.', rating: '★★★★★', photo: 'https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg?cs=srgb&dl=pexels-nitin-khajotia-1516680.jpg&fm=jpg' },
// //   ];

// //   const [reviews, setReviews] = useState<Review[]>(initialReviews);
// //   const [modalOpen, setModalOpen] = useState<boolean>(false);
// //   const [confirmModalOpen, setConfirmModalOpen] = useState<boolean>(false);
// //   const [newReview, setNewReview] = useState<Review>({
// //     id: '0',
// //     name: '',
// //     comment: '',
// //     rating: '★★★☆☆',
// //     photo: '',
// //   });
// //   const [reviewToDelete, setReviewToDelete] = useState<string | null>(null);
// //   const [dragOver, setDragOver] = useState<boolean>(false);

// //   const handleAddReview = () => {
// //     setReviews([...reviews, newReview]);
// //     setModalOpen(false);
// //     setNewReview({
// //       id: '0',
// //       name: '',
// //       comment: '',
// //       rating: '★★★☆☆',
// //       photo: '',
// //     });
// //   };

// //   const handleEditReview = (id: string) => {
// //     const reviewToEdit = reviews.find((review) => review.id === id);
// //     if (reviewToEdit) {
// //       setNewReview({ ...reviewToEdit });
// //       setModalOpen(true);
// //     }
// //   };

// //   const handleDeleteReview = (id: string) => {
// //     setReviewToDelete(id);
// //     setConfirmModalOpen(true);
// //   };

// //   const confirmDelete = () => {
// //     if (reviewToDelete !== null) {
// //       const updatedReviews = reviews.filter((review) => review.id !== reviewToDelete);
// //       setReviews(updatedReviews);
// //       setReviewToDelete(null);
// //       setConfirmModalOpen(false);
// //     }
// //   };

// //   const cancelDelete = () => {
// //     setReviewToDelete(null);
// //     setConfirmModalOpen(false);
// //   };

// //   const handleFileDrop = (e: React.DragEvent<HTMLInputElement>) => {
// //     e.preventDefault();
// //     const file = e.dataTransfer.files[0];

// //     if (file) {
// //       const reader = new FileReader();
// //       reader.readAsDataURL(file);
// //       reader.onload = () => {
// //         setNewReview({ ...newReview, photo: reader.result as string });
// //       };
// //     }

// //     setDragOver(false);
// //   };

// //   const handleFileInput = (e: ChangeEvent<HTMLInputElement>) => {
// //     const file = e.target.files?.[0];

// //     if (file) {
// //       const reader = new FileReader();
// //       reader.readAsDataURL(file);
// //       reader.onload = () => {
// //         setNewReview({ ...newReview, photo: reader.result as string });
// //       };
// //     }
// //   };

// //   return (
// //     <div className="container mx-auto mt-8 block with-shadow">
// //       <h1 className="text-lg font-semibold mb-4">Customer Reviews</h1>

// //       <button
// //         className="add__review font-bold py-2 px-4 mb-4 rounded"
// //         onClick={() => setModalOpen(true)}
// //       >
// //         Add Review
// //       </button>

// //       <table className="w-full">
// //         <thead>
// //           <tr className='bg-gray-300'>
// //             <th className="text-left">ID</th>
// //             <th className="text-left">Photo</th>
// //             <th className="text-left">Name</th>
// //             <th className="text-left">Comment</th>
// //             <th className="text-left">Rating</th>
// //             <th className="text-left">Actions</th>
// //           </tr>
// //         </thead>
// //         <tbody>
// //           {reviews.map((review) => (
// //             <tr key={review.id}>
// //               <td>{review.id}</td>
// //               <td>
// //                 {review.photo && (
// //                   <img src={review.photo} alt={`Review by ${review.name}`} className="w-20 h-20 object-cover" />
// //                 )}
// //               </td>
// //               <td>{review.name}</td>
// //               <td>{review.comment}</td>
// //               <td>
// //                 <div className="flex">
// //                   {review.rating.split('').map((char, index) => (
// //                     <span key={index} className="text-yellow-500">{char}</span>
// //                   ))}
// //                 </div>
// //               </td>
// //               <td>
// //                 <button
// //                   className=" text-indigo-900 hover:underline mr-2"
// //                   onClick={() => handleEditReview(review.id)}
// //                 >
// //                   Edit
// //                 </button>
// //                 <button
// //                   className="text-pink-500 hover:underline"
// //                   onClick={() => handleDeleteReview(review.id)}
// //                 >
// //                   Delete
// //                 </button>
// //               </td>
// //             </tr>
// //           ))}
// //         </tbody>
// //       </table>

// //       {modalOpen && (
// //         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
// //           <div className="bg-white p-8 rounded-lg">
// //             <h2 className="text-2xl font-bold mb-4">{newReview.id ? 'Edit' : 'Add'} Review</h2>
// //             <label className="block mb-4">
// //               Name:
// //               <input
// //                 type="text"
// //                 className="form-input mt-1 block w-full"
// //                 value={newReview.name}
// //                 onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
// //               />
// //             </label>
// //             <label className="block mb-4">
// //               Comment:
// //               <textarea
// //                 className="form-input mt-1 block w-full"
// //                 value={newReview.comment}
// //                 onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
// //               />
// //             </label>
// //             <label className="block mb-4">
// //               Rating:
// //               <select
// //                 className="form-select mt-1 block w-full"
// //                 value={newReview.rating}
// //                 onChange={(e) => setNewReview({ ...newReview, rating: e.target.value })}
// //               >
// //                 <option value="★★★★★">★★★★★</option>
// //                 <option value="★★★★☆">★★★★☆</option>
// //                 <option value="★★★☆☆">★★★☆☆</option>
// //                 <option value="★★☆☆☆">★★☆☆☆</option>
// //                 <option value="★☆☆☆☆">★☆☆☆☆</option>
// //               </select>
// //             </label>
// //             <div className="mb-4">
// //               <label
// //                 className={`cursor-pointer inline-block px-4 py-2 border rounded-md ${
// //                   dragOver ? 'border-pink-500' : 'border-gray-300'
// //                 } ${
// //                   newReview.photo ? 'bg-green-100 hover:bg-green-200' : 'bg-gray-100 hover:bg-gray-200'
// //                 }`}
// //                 onDragOver={(e) => {
// //                   e.preventDefault();
// //                   setDragOver(true);
// //                 }}
// //                 onDragLeave={() => setDragOver(false)}
// //                 onDrop={(e) => handleFileDrop(e)}
// //               >
// //                 {newReview.photo ? 'Change Photo' : 'Drag & Drop or Click to Upload Photo'}
// //               </label>
// //               <input
// //                 type="file"
// //                 accept="image/*"
// //                 className="hidden"
// //                 onChange={handleFileInput}
// //               />
// //             </div>
// //             <div className="flex justify-end">
// //               <button
// //                 className="bg-pink-500 hover:bg-pink-700 text-white font-bold py-2 px-4 mr-2 rounded"
// //                 onClick={handleAddReview}
// //               >
// //                 {newReview.id ? 'Save' : 'Add'}
// //               </button>
// //               <button
// //                 className=" bg-indigo-950 hover:bg-indigo-800 text-white font-bold py-2 px-4 rounded"
// //                 onClick={() => setModalOpen(false)}
// //               >
// //                 Cancel
// //               </button>
// //             </div>
// //           </div>
// //         </div>
// //       )}

// //       {confirmModalOpen && (
// //         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
// //           <div className="bg-white p-8 rounded-lg">
// //             <p className="text-lg mb-4">Are you sure you want to delete this review?</p>
// //             <div className="flex justify-end">
// //               <button
// //                 className="bg-pink-500 hover:bg-pink-700 text-white font-bold py-2 px-4 mr-2 rounded"
// //                 onClick={confirmDelete}
// //               >
// //                 Yes
// //               </button>
// //               <button
// //                 className="bg-indigo-950 hover:bg-indigo-800 text-white font-bold py-2 px-4 rounded"
// //                 onClick={cancelDelete}
// //               >
// //                 No
// //               </button>
// //             </div>
// //           </div>
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // export default ReviewPage;



// // // src/components/ReviewPage.tsx

// // import React, { useState, ChangeEvent } from 'react';
// // import '../styles/review.css';

// // interface Review {
// //   id: string;
// //   name: string;
// //   comment: string;
// //   rating: string; // Rating represented as a string of star icons
// //   photo: string;
// // }

// // const ReviewPage: React.FC = () => {
// //   const initialReviews: Review[] = [
// //     { id: '1', name: 'John Doe', comment: 'Great product!', rating: '★★★★★', photo: 'https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg?cs=srgb&dl=pexels-nitin-khajotia-1516680.jpg&fm=jpg' },
// //     { id: '2', name: 'Jane Smith', comment: 'Not bad, but could be better.', rating: '★★★☆☆', photo: 'https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg?cs=srgb&dl=pexels-nitin-khajotia-1516680.jpg&fm=jpg' },
// //     { id: '3', name: 'Alice Johnson', comment: 'Excellent service!', rating: '★★★★☆', photo: 'https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg?cs=srgb&dl=pexels-nitin-khajotia-1516680.jpg&fm=jpg' },
// //     { id: '4', name: 'Bob Williams', comment: 'Product was damaged upon arrival.', rating: '★★☆☆☆', photo: 'https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg?cs=srgb&dl=pexels-nitin-khajotia-1516680.jpg&fm=jpg' },
// //     { id: '5', name: 'Eva Davis', comment: 'Fast shipping, good quality.', rating: '★★★★★', photo: 'https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg?cs=srgb&dl=pexels-nitin-khajotia-1516680.jpg&fm=jpg' },
// //   ];

// //   const [reviews, setReviews] = useState<Review[]>(initialReviews);
// //   const [modalOpen, setModalOpen] = useState<boolean>(false);
// //   const [confirmModalOpen, setConfirmModalOpen] = useState<boolean>(false);
// //   const [newReview, setNewReview] = useState<Review>({
// //     id: '0',
// //     name: '',
// //     comment: '',
// //     rating: '★★★☆☆',
// //     photo: '',
// //   });
// //   const [reviewToDelete, setReviewToDelete] = useState<string | null>(null);
// //   const [dragOver, setDragOver] = useState<boolean>(false);

// //   const handleAddReview = () => {
// //     setReviews([...reviews, newReview]);
// //     setModalOpen(false);
// //     setNewReview({
// //       id: '0',
// //       name: '',
// //       comment: '',
// //       rating: '★★★☆☆',
// //       photo: '',
// //     });
// //   };

// //   const handleEditReview = (id: string) => {
// //     const reviewToEdit = reviews.find((review) => review.id === id);
// //     if (reviewToEdit) {
// //       setNewReview({ ...reviewToEdit });
// //       setModalOpen(true);
// //     }
// //   };

// //   const handleDeleteReview = (id: string) => {
// //     setReviewToDelete(id);
// //     setConfirmModalOpen(true);
// //   };

// //   const confirmDelete = () => {
// //     if (reviewToDelete !== null) {
// //       const updatedReviews = reviews.filter((review) => review.id !== reviewToDelete);
// //       setReviews(updatedReviews);
// //       setReviewToDelete(null);
// //       setConfirmModalOpen(false);
// //     }
// //   };

// //   const cancelDelete = () => {
// //     setReviewToDelete(null);
// //     setConfirmModalOpen(false);
// //   };

// //   const handleFileDrop = (e: React.DragEvent<HTMLInputElement>) => {
// //     e.preventDefault();
// //     const file = e.dataTransfer.files[0];

// //     if (file) {
// //       const reader = new FileReader();
// //       reader.readAsDataURL(file);
// //       reader.onload = () => {
// //         setNewReview({ ...newReview, photo: reader.result as string });
// //       };
// //     }

// //     setDragOver(false);
// //   };

// //   const handleFileInput = (e: ChangeEvent<HTMLInputElement>) => {
// //     const file = e.target.files?.[0];

// //     if (file) {
// //       const reader = new FileReader();
// //       reader.readAsDataURL(file);
// //       reader.onload = () => {
// //         setNewReview({ ...newReview, photo: reader.result as string });
// //       };
// //     }
// //   };

// //   return (
// //     <div className="container mx-auto mt-8 block with-shadow">
// //       <h1 className="text-lg font-semibold mb-4">Customer Reviews</h1>

// //       <button
// //         className="add__review font-bold py-2 px-4 mb-4 rounded"
// //         onClick={() => setModalOpen(true)}
// //       >
// //         Add Review
// //       </button>

// //       <table className="w-full">
// //         <thead>
// //           <tr className='bg-gray-300'>
// //             <th className="text-left">ID</th>
// //             <th className="text-left">Photo</th>
// //             <th className="text-left">Name</th>
// //             <th className="text-left">Comment</th>
// //             <th className="text-left">Rating</th>
// //             <th className="text-left">Actions</th>
// //           </tr>
// //         </thead>
// //         <tbody>
// //           {reviews.map((review) => (
// //             <tr key={review.id}>
// //               <td>{review.id}</td>
// //               <td>
// //                 {review.photo && (
// //                   <img src={review.photo} alt={`Review by ${review.name}`} className="w-20 h-20 object-cover" />
// //                 )}
// //               </td>
// //               <td>{review.name}</td>
// //               <td>{review.comment}</td>
// //               <td>
// //                 <div className="flex">
// //                   {review.rating.split('').map((char, index) => (
// //                     <span key={index} className="text-yellow-500">{char}</span>
// //                   ))}
// //                 </div>
// //               </td>
// //               <td>
// //                 <button
// //                   className=" text-indigo-900 hover:underline mr-2"
// //                   onClick={() => handleEditReview(review.id)}
// //                 >
// //                   Edit
// //                 </button>
// //                 <button
// //                   className="text-pink-500 hover:underline"
// //                   onClick={() => handleDeleteReview(review.id)}
// //                 >
// //                   Delete
// //                 </button>
// //               </td>
// //             </tr>
// //           ))}
// //         </tbody>
// //       </table>

// //       {modalOpen && (
// //         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
// //           <div className="bg-white p-8 rounded-lg">
// //             <h2 className="text-2xl font-bold mb-4">{newReview.id ? 'Edit' : 'Add'} Review</h2>
// //             <label className="block mb-4">
// //               Name:
// //               <input
// //                 type="text"
// //                 className="form-input mt-1 block w-full"
// //                 value={newReview.name}
// //                 onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
// //               />
// //             </label>
// //             <label className="block mb-4">
// //               Comment:
// //               <textarea
// //                 className="form-input mt-1 block w-full"
// //                 value={newReview.comment}
// //                 onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
// //               />
// //             </label>
// //             <label className="block mb-4">
// //               Rating:
// //               <select
// //                 className="form-select mt-1 block w-full"
// //                 value={newReview.rating}
// //                 onChange={(e) => setNewReview({ ...newReview, rating: e.target.value })}
// //               >
// //                 <option value="★★★★★">★★★★★</option>
// //                 <option value="★★★★☆">★★★★☆</option>
// //                 <option value="★★★☆☆">★★★☆☆</option>
// //                 <option value="★★☆☆☆">★★☆☆☆</option>
// //                 <option value="★☆☆☆☆">★☆☆☆☆</option>
// //               </select>
// //             </label>
// //             <div className="mb-4">
// //               <label
// //                 className={`cursor-pointer inline-block px-4 py-2 border rounded-md ${
// //                   dragOver ? 'border-pink-500' : 'border-gray-300'
// //                 } ${
// //                   newReview.photo ? 'bg-green-100 hover:bg-green-200' : 'bg-gray-100 hover:bg-gray-200'
// //                 }`}
// //                 onDragOver={(e) => {
// //                   e.preventDefault();
// //                   setDragOver(true);
// //                 }}
// //                 onDragLeave={() => setDragOver(false)}
// //                 onDrop={(e) => handleFileDrop(e)}
// //               >
// //                 {newReview.photo ? 'Change Photo' : 'Drag & Drop or Click to Upload Photo'}
// //               </label>
// //               <input
// //                 type="file"
// //                 accept="image/*"
// //                 className="hidden"
// //                 onChange={handleFileInput}
// //               />
// //             </div>
// //             <div className="flex justify-end">
// //               <button
// //                 className="bg-pink-500 hover:bg-pink-700 text-white font-bold py-2 px-4 mr-2 rounded"
// //                 onClick={handleAddReview}
// //               >
// //                 {newReview.id ? 'Save' : 'Add'}
// //               </button>
// //               <button
// //                 className=" bg-indigo-950 hover:bg-indigo-800 text-white font-bold py-2 px-4 rounded"
// //                 onClick={() => setModalOpen(false)}
// //               >
// //                 Cancel
// //               </button>
// //             </div>
// //           </div>
// //         </div>
// //       )}

// //       {confirmModalOpen && (
// //         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
// //           <div className="bg-white p-8 rounded-lg">
// //             <p className="text-lg mb-4">Are you sure you want to delete this review?</p>
// //             <div className="flex justify-end">
// //               <button
// //                 className="bg-pink-500 hover:bg-pink-700 text-white font-bold py-2 px-4 mr-2 rounded"
// //                 onClick={confirmDelete}
// //               >
// //                 Yes
// //               </button>
// //               <button
// //                 className="bg-indigo-950 hover:bg-indigo-800 text-white font-bold py-2 px-4 rounded"
// //                 onClick={cancelDelete}
// //               >
// //                 No
// //               </button>
// //             </div>
// //           </div>
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // export default ReviewPage;






// // import React from 'react';

// // interface ReviewProps {
// //   username: string;
// //   joinedDate: string;
// //   reviewDate: string;
// //   reviewText: string;
// // }

// // const CustomerReview: React.FC<ReviewProps> = ({ username, joinedDate, reviewDate, reviewText }) => {
// //   return (
// //     <div>
// //       <p className="text-2xl">Customer reviews </p>
// //     <article className="max-w-xl mx-auto bg-white dark:bg-gray-800 p-6 rounded-md shadow-md">
// //       <div className="flex items-center mb-4">
// //         <img className="w-10 h-10 me-4 rounded-full" 
// //         src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1376&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
// //         <div className="font-medium dark:text-white">
// //           <p>
// //             {username} <time dateTime={joinedDate} className="block text-sm text-gray-500 dark:text-gray-400">
// //               Joined on {joinedDate}
// //             </time>
// //           </p>
// //         </div>
// //       </div>
// //       <div className="flex items-center mb-1 space-x-1 rtl:space-x-reverse">
// //         {[1, 2, 3, 4, 5].map((_, index) => (
// //           <svg
// //             key={index}
// //             className="w-4 h-4 text-yellow-300"
// //             aria-hidden="true"
// //             xmlns="http://www.w3.org/2000/svg"
// //             fill="currentColor"
// //             viewBox="0 0 22 20"
// //           >
// //             <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
// //           </svg>
// //         ))}
// //         <svg
// //           className="w-4 h-4 text-gray-300 dark:text-gray-500"
// //           aria-hidden="true"
// //           xmlns="http://www.w3.org/2000/svg"
// //           fill="currentColor"
// //           viewBox="0 0 22 20"
// //         >
// //           <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
// //         </svg>
// //         <h3 className="ms-2 text-sm font-semibold text-gray-900 dark:text-white">Thinking to buy another one!</h3>
// //       </div>
// //       <footer className="mb-5 text-sm text-gray-500 dark:text-gray-400">
// //         <p>Reviewed in the United Kingdom on <time dateTime={reviewDate}>{reviewDate}</time></p>
// //       </footer>
// //       <p className="mb-2 text-gray-500 dark:text-gray-400">{reviewText}</p>
// //       <p className="mb-3 text-gray-500 dark:text-gray-400">
// //         It is obviously not the same build quality as those very expensive watches. But that is like comparing a Citroën
// //         to a Ferrari. This watch was well under £100! An absolute bargain.
// //       </p>
// //       <a href="#" className="block mb-5 text-sm font-medium text-pink-500 hover:underline dark:text-pink-600">
// //         Read more
// //       </a>
// //       <aside>
// //         <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">19 people found this helpful</p>
// //         <div className="flex items-center mt-3">
// //           <button className="bg-gray-700 text-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-xs px-2 py-1.5 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
// //             Helpful
// //           </button>
// //           <button className="ps-4 text-sm font-medium text-pink-500 hover:underline dark:text-pink-600 border-gray-200 ms-4 border-s md:mb-0 dark:border-gray-600">
// //             Report abuse
// //           </button>
// //         </div>
// //       </aside>
// //     </article>
// //     <article className="max-w-xl mx-auto bg-white dark:bg-gray-800 p-6 rounded-md shadow-md">
// //       <div className="flex items-center mb-4">
// //         <img className="w-10 h-10 me-4 rounded-full" 
// //         src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1376&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
// //         <div className="font-medium dark:text-white">
// //           <p>
// //             {username} <time dateTime={joinedDate} className="block text-sm text-gray-500 dark:text-gray-400">
// //               Joined on {joinedDate}
// //             </time>
// //           </p>
// //         </div>
// //       </div>
// //       <div className="flex items-center mb-1 space-x-1 rtl:space-x-reverse">
// //         {[1, 2, 3, 4, 5].map((_, index) => (
// //           <svg
// //             key={index}
// //             className="w-4 h-4 text-yellow-300"
// //             aria-hidden="true"
// //             xmlns="http://www.w3.org/2000/svg"
// //             fill="currentColor"
// //             viewBox="0 0 22 20"
// //           >
// //             <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
// //           </svg>
// //         ))}
// //         <svg
// //           className="w-4 h-4 text-gray-300 dark:text-gray-500"
// //           aria-hidden="true"
// //           xmlns="http://www.w3.org/2000/svg"
// //           fill="currentColor"
// //           viewBox="0 0 22 20"
// //         >
// //           <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
// //         </svg>
// //         <h3 className="ms-2 text-sm font-semibold text-gray-900 dark:text-white">Thinking to buy another one!</h3>
// //       </div>
// //       <footer className="mb-5 text-sm text-gray-500 dark:text-gray-400">
// //         <p>Reviewed in the United Kingdom on <time dateTime={reviewDate}>{reviewDate}</time></p>
// //       </footer>
// //       <p className="mb-2 text-gray-500 dark:text-gray-400">{reviewText}</p>
// //       <p className="mb-3 text-gray-500 dark:text-gray-400">
// //         It is obviously not the same build quality as those very expensive watches. But that is like comparing a Citroën
// //         to a Ferrari. This watch was well under £100! An absolute bargain.
// //       </p>
// //       <a href="#" className="block mb-5 text-sm font-medium text-pink-500 hover:underline dark:text-pink-600">
// //         Read more
// //       </a>
// //       <aside>
// //         <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">19 people found this helpful</p>
// //         <div className="flex items-center mt-3">
// //           <button className="bg-gray-700 text-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-xs px-2 py-1.5 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
// //             Helpful
// //           </button>
// //           <button className="ps-4 text-sm font-medium text-pink-500 hover:underline dark:text-pink-600 border-gray-200 ms-4 border-s md:mb-0 dark:border-gray-600">
// //             Report abuse
// //           </button>
// //         </div>
// //       </aside>
// //     </article>
   
// //     </div>
// //   );
// // };

// // export default CustomerReview;


