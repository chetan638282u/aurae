import reviews from '../../data/reviews'
import ReviewCard from './ReviewCard'

export default function ReviewsSection() {
  return (
    <section id="reviews" className="relative z-10 py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="section-heading">Kind Words</h2>
          <p className="section-subheading mt-4">
            Hear from those who have made AURAE part of their daily ritual.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {reviews.map((review, i) => (
            <ReviewCard key={review.id} review={review} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
