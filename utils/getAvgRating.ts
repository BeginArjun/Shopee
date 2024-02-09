type ProductReview={
    id: number,
    rating: number,
    review?:string,   
}

export function getAvgRating(reviews:ProductReview[]{
      let sum = 0;
      reviews.map((item)=>{
        sum+=item.rating;
      })
      const sz = reviews.length();
      return sum/sz;
})