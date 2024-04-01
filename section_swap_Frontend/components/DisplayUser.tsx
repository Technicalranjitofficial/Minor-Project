import React from 'react';

const DisplayUser = ({
  senderName,
  matchedUserName,
  matchedUserEmail,

  currentAllotedSection,
  currentLookingForSections,

}:{
    senderName:string,matchedUserName:string;matchedUserEmail:string;currentAllotedSection:number;currentLookingForSections:number[];
}) => {
  return (
    <div className="font-sans  p-8 bg-gray-900  border-2 rounded-[5px]">
      <h1 className="text-3xl font-bold mb-4">Hey {senderName},</h1>
      <p className="text-lg mb-4">Congratulations! You have found a match for Section Swapping:</p>

      <div className="bg-slate-800 border rounded p-4 mt-4">
        <h2 className="text-xl font-semibold mb-2">Details:</h2>
        <h3 className="text-lg mb-1"><span className='font-bold text-cyan-600' >Name:</span> {matchedUserName}</h3>
        <h3 className="text-lg mb-1"><span className='font-bold text-cyan-600' >Email:</span> {matchedUserEmail}</h3>
       

        <h2 className="text-xl font-semibold mb-2">Swapping Section Details:</h2>
        <div className="mb-4">
          <h3 className="text-lg font-semibold">Your Details:</h3>
          <p className="text-lg mb-1"><span className='font-bold text-cyan-600' >Alloted Section:</span> {currentAllotedSection}</p>
          <p className="text-lg"><span className='font-bold text-cyan-600' >Looking For Sections:</span> {currentLookingForSections.join(", ")}</p>
        </div>
        <div>
          <h3 className="text-lg font-semibold">Matched User Details:</h3>
        <p>Detailed Information has been sent to your mail, Check your mail</p>
        <p> If you are facing any issue then contact us: <span className='text-cyan-600 font-bold'>21053420@kiit.ac.in</span> </p>
        </div>
      </div>
    </div>
  );
};

export default DisplayUser;
