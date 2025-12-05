import Review from "../models/reviewModel.js";
import Course from "../models/courseModel.js";

// ===================== CREATE REVIEW =====================
export const createReview = async (req, res) => {
  try {
    const { courseId, rating, ratingText } = req.body;
    const userId = req.userId; // from auth middleware

    if (!rating) {
      return res.status(400).json({ message: "Rating is required" });
    }

    // Check if course exists
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(400).json({ message: "Course is not found" });
    }

    // Check if user already reviewed this course
    const alreadyReviewed = await Review.findOne({ course: courseId, user: userId });
    if (alreadyReviewed) {
      return res.status(400).json({ message: "You already reviewed this course" });
    }

    // Create new review
    const newReview = await Review.create({
      course: courseId,
      user: userId,
      rating,
      ratingText: ratingText || ""
    });
    await newReview.save();
    
    await course.reviews.push(newReview._id);
    await course.save();
    return res.status(201).json(newReview);
    // const allReviews = await Review.find({ course: courseId });

    // const avgRating =
    //   allReviews.reduce((acc, item) => acc + item.rating, 0) /
    //   allReviews.length;

    // course.rating = avgRating;
    // await course.save();

    // res.status(201).json({
    //   message: "Review added successfully",
    //   review: newReview,
    // });

  } catch (error) {
    
    return res.status(500).json({ message: "Failed to create review ", error });
  }
};


// ===================== GET REVIEWS =====================
export const getReviews = async (req, res) => {
  try {
    

    const review = await Review.find({  })
      .populate("user course" ) // return user data
      .sort({ reviewedAt: -1 }); // latest first

    res.status(200).json({
      message: "Reviews fetched successfully",
      review,
    });

  } catch (error) {
   
    res.status(500).json({ message: "failed to get review", error });
  }
};
