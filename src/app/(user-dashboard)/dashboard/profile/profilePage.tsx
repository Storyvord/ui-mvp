// // pages/profile.tsx
// import React from 'react';
// import { useRouter } from 'next/router';
// import Image from 'next/image';

// const ProfilePage: React.FC = () => {
//   const router = useRouter();
//   const { name, yoe, minRatePerDay, maxRatePerDay, location, profile_pic, preferred_because } = router.query;

//   return (
//     <div className="min-h-screen bg-gray-100 p-6">
//       <div className="bg-white rounded-xl shadow-lg p-6 max-w-4xl mx-auto">
//         <div className="flex flex-col items-center">
//           <Image
//             className="w-32 h-32 rounded-full border-4 border-gray-200 object-cover mb-4"
//             src={profile_pic as string}
//             alt={`${name}'s Profile Picture`}
//           />
//           <h1 className="text-3xl font-semibold mb-2">{name}</h1>
//         </div>
//         <div className="mt-6 px-6">
//           <p className="text-gray-700 text-lg">Years of Experience: {yoe}</p>
//           <p className="text-gray-700 text-lg">Rate Per Day: ${minRatePerDay} - ${maxRatePerDay}</p>
//           <p className="text-gray-700 text-lg">Location: {location}</p>
//           <p className="text-gray-700 text-lg mt-4">Preferred Because: {preferred_because}</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProfilePage;
