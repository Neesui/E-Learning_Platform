import React from 'react'

const FeedbackSection = () => {
  return (
    <>
      {/* Feedback Section */}
      <section className="py-12">
        <h2 className="text-[5vh] font-bold text-center mb-6">What Our Students Say</h2>
        <div className="flex justify-around">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="testimonial-card w-[55vh] space-x-8 p-4 shadow-lg bg-pink-200">
              <div className="flex items-center">
                <img
                  src="https://www.svgrepo.com/show/382097/female-avatar-girl-face-woman-user-9.svg"
                  alt="Avatar"
                  className="w-12 h-12 object-cover"
                />
                <div className="ml-4">
                  <h3 className="font-bold">Nisha Chaudhary</h3>
                  <p className="text-sm text-gray-500">Web developer</p>
                </div>
              </div>
              <p className="mt-4 text-sm">
                I was from a non-tech background but I was able to pick up all the concepts of React. I would highly recommend this front-end course to others.
              </p>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}

export default FeedbackSection
