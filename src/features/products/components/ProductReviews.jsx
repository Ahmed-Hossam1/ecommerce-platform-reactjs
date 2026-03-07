import React, { useEffect, useState } from 'react';
import { getReviewsByProductId } from '../services/productService';

export default function ProductReviews({ productId }) {
    const [reviews, setReviews] = useState([]);
    const [sortBy, setSortBy] = useState('newest');

    useEffect(() => {
        async function load(id) {
            const review = await getReviewsByProductId(id)
            setReviews(review);
        }
        load(productId);
    }, [productId])

    let sortedReviews = [...reviews];
    if (sortBy === "newest") sortedReviews.sort((a, b) => new Date(b.date) - new Date(a.date))
    if (sortBy === "oldest") sortedReviews.sort((a, b) => new Date(a.date) - new Date(b.date))

    const renderStars = (rating) => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            stars.push(
                <svg
                    key={i}
                    className={`w-4 h-4 ${i <= Math.round(rating)
                        ? "text-amber-400 fill-current"
                        : "text-gray-200 fill-current"
                        }`}
                    viewBox="0 0 20 20"
                >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
            );
        }
        return stars;
    };

    return (
        <div className="mt-12 lg:col-span-2">
            <div className="border-t border-gray-100 pt-10">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900">Customer Reviews</h2>
                        <div className="flex items-center gap-2 mt-2">
                            <div className="flex">{renderStars(4.7)}</div>
                            <span className="text-sm font-medium text-gray-700">4.7 out of 5</span>
                            <span className="text-sm text-gray-400">({reviews.length} reviews)</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        {reviews.length > 0 && (
                            <div className="flex items-center gap-2">
                                <label htmlFor="sort-reviews" className="text-sm text-gray-500 font-medium">Sort by:</label>
                                <select
                                    id="sort-reviews"
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value)}
                                    className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent cursor-pointer"
                                >
                                    <option value="newest">Newest First</option>
                                    <option value="oldest">Oldest First</option>
                                </select>
                            </div>
                        )}
                        <button className="px-6 py-3 bg-white border-2 border-primary-600 text-primary-600 font-semibold rounded-xl hover:bg-primary-50 transition-colors shadow-sm focus:ring-4 focus:ring-primary-100 outline-none">
                            Write a Review
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
                    {/* Reviews List */}
                    <div className="md:col-span-7 lg:col-span-8 flex flex-col gap-6">
                        {sortedReviews?.length > 0 ? (
                            sortedReviews.map((review) => (
                                <div key={review.id} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 bg-primary-100 text-primary-700 rounded-full flex items-center justify-center font-bold text-lg">
                                                {review.user?.charAt(0)}
                                            </div>
                                            <div>
                                                <h4 className="font-semibold text-gray-900">{review.user}</h4>
                                                <div className="flex items-center gap-2 mt-1">
                                                    <div className="flex">{renderStars(review.rating)}</div>
                                                </div>
                                            </div>
                                        </div>
                                        <span className="text-sm text-gray-400">{review.date}</span>
                                    </div>
                                    <p className="text-gray-600 leading-relaxed">
                                        {review.comment}
                                    </p>
                                </div>
                            ))
                        ) : (
                            <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm text-center flex flex-col items-center justify-center min-h-[250px] lg:min-h-[350px]">
                                <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4 border-2 border-dashed border-gray-200">
                                    <svg className="w-8 h-8 text-gray-300" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                    </svg>
                                </div>
                                <h3 className="text-lg font-bold text-gray-900 mb-2">No reviews yet</h3>
                                <p className="text-gray-500 max-w-xs mx-auto">Be the first to review this product and share your experience with others.</p>
                            </div>
                        )}
                    </div>

                    {/* Write a Review Section (UI only) */}
                    <div className="md:col-span-5 lg:col-span-4">
                        <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
                            <h3 className="font-bold text-gray-900 text-lg mb-4">Leave your review</h3>
                            <form className="flex flex-col gap-4" onSubmit={(e) => e.preventDefault()}>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Rating</label>
                                    <div className="flex gap-1 cursor-pointer">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <svg
                                                key={star}
                                                className="w-8 h-8 text-gray-300 hover:text-amber-400 fill-current transition-colors"
                                                viewBox="0 0 20 20"
                                            >
                                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                            </svg>
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="name">Your Name</label>
                                    <input
                                        type="text"
                                        id="name"
                                        placeholder="Enter your name"
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="review">Your Review</label>
                                    <textarea
                                        id="review"
                                        rows="4"
                                        placeholder="What did you like or dislike?"
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all resize-none"
                                    ></textarea>
                                </div>
                                <button
                                    type="button"
                                    className="w-full py-3.5 bg-gray-900 text-white font-semibold rounded-xl hover:bg-gray-800 transition-colors mt-2"
                                >
                                    Submit Review
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
